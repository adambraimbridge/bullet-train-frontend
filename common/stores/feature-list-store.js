var BaseStore = require('./base/_store');
var data = require('../data/base/_data');


var controller = {

        getFeatures: (projectId, environmentId) => {
            if (!store.model || store.envId != environmentId) { //todo: change logic a bit
                store.loading()
                store.envId = environmentId;

                //todo: cache project flags
                return Promise.all([
                    data.get(`${Project.api}projects/${projectId}/features/?format=json`),
                    data.get(`${Project.api}environments/${environmentId}/featurestates/?format=json`),
                ]).then(([features, environmentFeatures]) => {
                    store.model = {
                        features,
                        keyedEnvironmentFeatures: environmentFeatures.results && _.keyBy(environmentFeatures.results, "feature"),
                    };
                    store.loaded();
                });
            }
        },
        createFlag(projectId, environmentId, flag) {
            store.saving();
            data.post(`${Project.api}projects/${projectId}/features/?format=json`, flag)
                .then((res) => {
                    return Promise.all([
                        data.get(`${Project.api}projects/${projectId}/features/?format=json`),
                        data.get(`${Project.api}environments/${environmentId}/featurestates/?format=json`),
                    ]).then(([features, environmentFeatures]) => {
                        store.model = {
                            features,
                            keyedEnvironmentFeatures: environmentFeatures && _.keyBy(environmentFeatures.results, "feature"),
                        };
                        store.saved();
                    });
                })
        },
        toggleFlag: (index, environments, comment) => {
            const flag = store.model.features[index];
            store.saving();
            return Promise.all(environments.map((e) => {
                if (store.hasFlagInEnvironment(flag.id)) {
                    const environmentFlag = store.model.keyedEnvironmentFeatures[flag.id];
                    return data.put(`${Project.api}environments/${e.api_key}/featurestates/${environmentFlag.id}/`, Object.assign({}, environmentFlag, {enabled: !environmentFlag.enabled}))
                } else {
                    return data.post(`${Project.api}environments/${e.api_key}/featurestates/`, Object.assign({}, {
                        feature: flag.id,
                        enabled: true,
                        comment
                    }))
                }
            }))
                .then((res) => {
                    store.model.keyedEnvironmentFeatures[flag.id] = res[0];
                    store.saved();
                })

        },
        editFlag: (projectId, environmentId, flag, projectFlag, environmentFlag) => {
            let prom;
            store.saving();
            if (environmentFlag) {
                prom = data.put(`${Project.api}environments/${environmentId}/featurestates/${environmentFlag.id}/`, Object.assign({}, environmentFlag, {feature_state_value: flag.initial_value}))
            } else {
                prom = data.post(`${Project.api}environments/${environmentId}/featurestates/`, Object.assign({}, flag, {
                    enabled: false,
                    environment: environmentId,
                    feature
                }))
            }

            prom.then((res) => {
                store.model.keyedEnvironmentFeatures[projectFlag.id] = res;
                store.saved();
            })

        },
        removeFlag: (projectId, flag) => {
            store.saving();
            return data.delete(`${Project.api}projects/${projectId}/features/`, {id: flag.id})
                .then(() => {
                    store.model.features = _.filter(store.model.features, (f) => f.id != flag.id);
                    store.saved();
                })

        }

    },
    store = Object.assign({}, BaseStore, {
        id: 'features',
        getEnvironmentFlags: function () {
            return store.model && store.model.keyedEnvironmentFeatures
        },
        getProjectFlags: function () {
            return store.model && store.model.features
        },
        hasFlagInEnvironment: function (id) {
            return store.model && store.model.keyedEnvironmentFeatures && store.model.keyedEnvironmentFeatures.hasOwnProperty(id)
        },
    });


store.dispatcherIndex = Dispatcher.register(store, function (payload) {
    var action = payload.action; // this is our action from handleViewAction

    switch (action.actionType) {
        case Actions.GET_FEATURES:
            controller.getFeatures(action.projectId, action.environmentId);
            break;
        case Actions.TOGGLE_FLAG:
            controller.toggleFlag(action.index, action.environments, action.comment);
            break;
        case Actions.CREATE_FLAG:
            controller.createFlag(action.projectId, action.environmentId, action.flag);
            break;
        case Actions.EDIT_ENVIRONMENT_FLAG:
            controller.editFlag(action.projectId, action.environmentId, action.flag, action.projectFlag, action.environmentFlag);
            break;
        case Actions.REMOVE_FLAG:
            controller.removeFlag(action.projectId, action.flag);
            break;
        default:
            return;
    }
})
controller.store = store;
module.exports = controller.store;