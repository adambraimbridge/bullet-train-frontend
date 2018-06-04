import OrganisationStore from "./organisation-store";

var BaseStore = require('./base/_store');
var data = require('../data/base/_data');

var controller = {
        register: ({email, password, first_name, last_name, organisation_name = "Default Organisation"}, isInvite) => {
            store.saving();
            data.post(`${Project.api}auth/register/`, {
                email,
                password1: password,
                password2: password,
                first_name,
                last_name
            })
                .then((res) => {
                    data.setToken(res.key);
                    if (isInvite) {
                        return controller.onLogin();
                    } else {
                        return data.post(`${Project.api}organisations/?format=json`, {name: organisation_name})
                            .then(()=>controller.onLogin())
                    }
                })
                .catch((e) => API.ajaxHandler(store, e))
        },
        setToken: (token) => {
            store.user = {};
            AsyncStorage.getItem("isDemo",(err,res)=>{
                if(res){
                    store.isDemo = true;
                }
                data.setToken(token);
                return controller.onLogin();
            })
        },
        login: ({email, password}) => {
            store.saving();
            data.post(`${Project.api}auth/login/`, {
                email,
                password
            })
                .then((res) => {
                    const isDemo = email == Project.demoAccount.email;
                    store.isDemo = isDemo;
                    if (isDemo) {
                        AsyncStorage.setItem("isDemo", isDemo);
                    }
                    data.setToken(res.key);
                    return controller.onLogin();
                })
                .catch((e) => API.ajaxHandler(store, e))
        },
        onLogin: (skipCaching) => {
            if (!skipCaching) {
                AsyncStorage.setItem("t", data.token);
            }
            return controller.getOrganisations();
        },
        acceptInvite: (id) => {
            store.saving();
            return data.post(`${Project.api}users/join/${id}/?format=json`)
                .then((res) => {
                    store.savedId = res.id;
                    store.model.organisations.push(res);
                    store.saved();
                })
                .catch((e) => API.ajaxHandler(store, e))

        },
        getOrganisations: () => {
            return data.get(`${Project.api}organisations/?format=json`)
                .then((res) => {
                    controller.setUser({
                        organisations: res.results
                    });
                })
                .catch((e) => API.ajaxHandler(store, e))
        },

        selectOrganisation: (id) => {
            store.organisation = _.find(store.model.organisations, {id});
            store.changed();
        },

        editOrganisation: (name) => {
            data.put(`${Project.api}organisations/${store.organisation.id}/?format=json`, {name})
                .then((res) => {
                    var idx = _.findIndex(store.model.organisations, {id: store.organisation.id});
                    if (idx != -1) {
                        store.model.organisations[idx] = res;
                        store.organisation = res
                    }
                    store.saved();
                });
        },

        createOrganisation: (name) => {
            store.saving();

            data.post(`${Project.api}organisations/?format=json`, {name})
                .then((res) => {
                    store.model.organisations = store.model.organisations.concat([res])
                    store.savedId = res.id;
                    store.saved();
                });
        },

        setUser: function (user) {
            if (!store.model && user) {
                store.model = user;
                store.organisation = user && user.organisations && user.organisations[0];
                store.loaded();
            } else {
                if (!user) {
                    AsyncStorage.clear();
                    data.setToken(null);
                    store.isDemo = false;
                    store.model = user;
                    store.trigger('logout');
                }
            }
        }
    },
    store = Object.assign({}, BaseStore, {
        id: 'account',
        getUser: function () {
            return store.model
        },
        getUserId: function () {
            return store.model && store.model.id
        },
        getOrganisation: function () {
            return store.organisation
        }
    });

store.dispatcherIndex = Dispatcher.register(store, function (payload) {
    var action = payload.action; // this is our action from handleViewAction

    switch (action.actionType) {
        case Actions.SET_USER:
            controller.setUser(action.user);
            break;
        case Actions.SET_TOKEN:
            controller.setToken(action.token);
            break;
        case Actions.SELECT_ORGANISATION:
            controller.selectOrganisation(action.id);
            break;
        case Actions.CREATE_ORGANISATION:
            controller.createOrganisation(action.name);
            break;
        case Actions.ACCEPT_INVITE:
            controller.acceptInvite(action.id);
            break;
        case Actions.DELETE_ORGANISATION:
            controller.createOrganisation(action.name);
            break;
        case Actions.EDIT_ORGANISATION:
            controller.editOrganisation(action.name);
            break;
        case Actions.LOGOUT:
            controller.setUser(null);
            break;
        case Actions.REGISTER:
            controller.register(action.details, action.isInvite);
            break;
        case Actions.LOGIN:
            controller.login(action.details);
            break;
        default:
            return;
    }
});

controller.store = store;
module.exports = controller.store;