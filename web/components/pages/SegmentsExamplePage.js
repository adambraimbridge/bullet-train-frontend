/**
 * Created by niallquinn on 28/05/2019.
 */

import React, {Component} from 'react';
import FeatureFlagsHero from '../animations/FeatureFlagsHero';
import FeatureFlagsAnimation from '../animations/FeatureFlagsAnimation';
import RemoteConfigAnimation from '../animations/RemoteConfigAnimation';
import UserTraitsAnimation from '../animations/UserTraitsAnimation';
import anime from "animejs";

export default class SegmentsExampleView extends Component {
    static displayName = 'SegmentsExamplePage'

    componentDidMount() {

        var logEl = document.querySelector('#increment-shit');

        var battery = {
            height: '2em',
        }

        anime({
            targets: battery,
            height: '20em',
            round: 1,
            easing: 'easeInOutCubic',
            loop: true,
            direction: 'alternate',
            duration: 4000,
            update: function() {
                logEl.innerHTML = JSON.stringify(battery);
            }
        });

    }

    render() {
        const redirect = this.props.location.query.redirect ? `?redirect=${this.props.location.query.redirect}` : '';
        return (
            <div className="features-page">
                <div className="hero hero--features-page ">
                    <div>
                        <div className="row" style={{width: '100%', margin: 0, marginRight: 0}}>
                            <div className="col-md-4 offset-md-1 col-sm-12 mt-5 features-cta">
                                <h1 className="mt-5">Bullet Train features</h1>
                                <p className="">
                                    Bullet Train lets you manage feature flags and remote config across web, mobile and
                                    server side applications. Learn how to use each feature to make your life easier.
                                </p>
                            </div>
                            <div className="col-sm-6 offset-sm-1 col-xs-4 animation-container pr-0">
                                <FeatureFlagsHero/>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="section--blue pb-5">
                    <div className="container-fluid">
                        <div className="container text-center mb-4">
                            <div className="col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                                <h2>Feature Flags</h2>
                                <p>Ship features remotely across multiple environments.</p>
                            </div>
                        </div>
                        <div className="row d-flex">
                            <div className="col-md-3 offset-md-2 align-self-center">
                                <div className="card card--navy card--code">
                                    <div className="card-body">
                                        <p className="code">// Toggle a feature</p>
                                        <p className="code"><span className="code code--green">if </span>(bulletTrain.hasFeature(<span className="code code--red">“coupon”</span>)) {'{'}</p>
                                        <p className="code">myCoolFeature();</p>
                                        <p className="code"> {'}'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7">
                                <FeatureFlagsAnimation/>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section--white mt-5 mb-5">
                    <div className="container-fluid mb-4">
                        <div className="col-lg-8 offset-lg-2 col-xl-6 offset-xl-3 text-center">
                            <h2>Remote Config</h2>
                            <p>Ship features remotely across multiple environments.</p>
                        </div>

                        <div className="row">
                            <div className="col-md-3 offset-md-2 align-self-center">
                                <div className="card card--navy card--code">
                                    <div className="card-body">
                                        <p className="code">// Increase header size</p>
                                        <pre className="battery-log" id="increment-shit"><span className="code code--green">height:2em</span></pre>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <RemoteConfigAnimation/>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="section--blue mt-5">
                    <div className="container">

                        <div className="row pt-5 pb-5">
                            <div className="col-md-4">
                                <h2>User Traits</h2>
                                <p>Store traits against your users without modifying your back-end.</p>
                            </div>
                            <div className="col-md-1 offset-md-2">
                                <img src="/images/features-page/user-traits-steps.svg" className="img-fluid"/>

                            </div>
                            <div className="col-md-5">
                                <div className="card card--navy card--code">
                                    <div className="card-body">
                                        <p className="code">// User traits</p>
                                        <pre><span className="code code--green">
                                        If bulletTrain.identify("user_123456");
                                        </span></pre>
                                        <pre><span className="code code--green">
                                            if !has accepted cookies</span>
                                        </pre>
                                        <pre>
                                            <span className="code code--green">
                                                else show cookie
                                            </span>
                                        </pre>
                                    </div>
                                </div>
                                {/*<img src="/images/features-page/user-traits-illustration-cookies.svg" className="img-fluid"/>*/}
                                <UserTraitsAnimation/>
                                <div className="card card--navy card--code mt-5">
                                    <div className="card-body">
                                        <p className="code">// Example SDK output</p>
                                        <pre className="battery-log" id="increment-shit">
                                  {'{'}
                                                "trait_key":"cookie",<br/>
                                                "trait_value":<span className="code code--green">"accepted”</span>
                                            {'}'}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>



                {/*centred version*/}
                {/*<section className="section--white mt-5 mb-5">*/}
                    {/*<div className="container-fluid mb-4">*/}
                        {/*<div className="col-lg-8 offset-lg-2 col-xl-6 offset-xl-3 text-center">*/}
                            {/*<h2>User Traits</h2>*/}
                            {/*<p>Store traits against your users without modifying your back-end.</p>*/}
                        {/*</div>*/}

                        {/*<div className="row">*/}
                            {/*<div className="col-md-3 offset-md-2 align-self-center">*/}
                                {/*<div className="card card--navy card--code">*/}
                                    {/*<div className="card-body">*/}
                                        {/*<p className="code">// Increase header size</p>*/}
                                        {/*<pre className="battery-log" id="increment-shit"><span className="code code--green">height:2em</span></pre>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            {/*<div className="col-md-6">*/}
                                {/*<UserTraitsAnimation/>*/}
                            {/*</div>*/}
                        {/*</div>*/}

                    {/*</div>*/}
                {/*</section>*/}




                {/*<section className="section--blue pt-5 pb-5">*/}
                    {/*<div className="container">*/}
                        {/*<div className="row d-flex">*/}
                            {/*<div className="col-md-6 align-self-center">*/}
                                {/*<h2>User Traits</h2>*/}
                                {/*<p>Store traits against your users without modifying your back-end.</p>*/}
                            {/*</div>*/}
                            {/*<div className="col-md-6">*/}
                                {/*<img src="/images/user-traits-screenshot.png" className="img-fluid"/>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                    {/*<div className="container">*/}
                        {/*<div className="row d-flex">*/}
                            {/*<div className="col-md-6">*/}
                                {/*<img src="/images/remote-config-screenshot.png" className="img-fluid"/>*/}
                            {/*</div>*/}
                            {/*<div className="col-md-6 align-self-center">*/}
                                {/*<h2>Remote Config</h2>*/}
                                {/*<p>Change the behaviour, appearance and config of your app here without needing to*/}
                                    {/*build.</p>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</section>*/}

                {/*<div className="container app-container text-center mb-4">*/}
                    {/*<div className="col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">*/}
                        {/*<h2>Segments</h2>*/}
                        {/*<p>Create detailed user segments for feature targeting.</p>*/}
                    {/*</div>*/}
                {/*</div>*/}


                {/*<div className="container">*/}
                    {/*<div className="row user-stats mt-3 mb-5">*/}
                        {/*<div className="col-md-2 col-xs-12">*/}
                            {/*<h4>User Traits</h4>*/}
                        {/*</div>*/}
                        {/*<div className="col-md-2 col-xs-6">*/}
                            {/*<p className="user-stats__value m-0">102</p>*/}
                            {/*<p>Page Views</p>*/}
                        {/*</div>*/}
                        {/*<div className="col-md-2 col-xs-6">*/}
                            {/*<p className="user-stats__value m-0">12</p>*/}
                            {/*<p>Log ins</p>*/}
                        {/*</div>*/}
                        {/*<div className="col-md-2 col-xs-6">*/}
                            {/*<p className="user-stats__value m-0">826</p>*/}
                            {/*<p>Seconds on page</p>*/}
                        {/*</div>*/}
                        {/*<div className="col-md-2 col-xs-6">*/}
                            {/*<p className="user-stats__value m-0">2</p>*/}
                            {/*<p>Submitted form</p>*/}
                        {/*</div>*/}
                        {/*<div className="col-md-2 col-xs-6">*/}
                            {/*<p className="user-stats__value m-0">33</p>*/}
                            {/*<p>Years old</p>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</div>*/}

                {/*<div className="container mb-5">*/}
                    {/*<div className="row">*/}
                        {/*<div className="col-md-6 segments-form-example pr-3 pl-3">*/}
                            {/*<FormGroup className="pb-3 pt-5">*/}
                                {/*<Input*/}
                                    {/*inputProps={{*/}
                                        {/*name: 'Age',*/}
                                        {/*className: 'full-width',*/}
                                    {/*}}*/}
                                    {/*className="input-default full-width"*/}
                                    {/*placeholder="Age"*/}
                                    {/*type="number"*/}
                                    {/*name="firstName" id="firstName"*/}
                                {/*/>*/}
                            {/*</FormGroup>*/}

                            {/*<FormGroup className="pb-3">*/}
                                {/*<Input*/}
                                    {/*inputProps={{*/}
                                        {/*name: 'Location',*/}
                                        {/*className: 'full-width',*/}
                                    {/*}}*/}
                                    {/*className="input-default full-width"*/}
                                    {/*placeholder="Location"*/}
                                    {/*type="number"*/}
                                    {/*name="firstName" id="firstName"*/}
                                {/*/>*/}
                            {/*</FormGroup>*/}

                            {/*<Button className="btn-block">Submit</Button>*/}

                        {/*</div>*/}
                        {/*<div className="col-md-6 pl-0">*/}
                            {/*<div className="panel panel__segments-achievements segment-achievements">*/}
                                {/*<div className="panel-heading">*/}
                                    {/*<Row space>*/}
                                        {/*<Row className="flex-1">*/}
                                            {/*<span className="panel-icon"><ion className="icon ion-ios-rocket"/></span>*/}
                                            {/*<h6 className="m-b-0">User Segments</h6>*/}
                                        {/*</Row>*/}
                                    {/*</Row>*/}
                                {/*</div>*/}
                                {/*<div className="panel-content">*/}

                                    {/*<Row>*/}
                                        {/*<span className="panel-icon panel-icon--success">*/}
                                            {/*<ion className="icon ion-ios-checkmark"/>*/}
                                        {/*</span>*/}
                                        {/*<h6 className="segment-achievements__text">Viewed page 4 times</h6>*/}
                                    {/*</Row>*/}

                                    {/*<Row className="mt-3">*/}
                                        {/*<span className="panel-icon panel-icon--disabled">*/}
                                            {/*<ion className="icon ion-ios-checkmark"/>*/}
                                        {/*</span>*/}
                                        {/*<h6 className="segment-achievements__text">Spent 30 seconds on page</h6>*/}
                                    {/*</Row>*/}
                                    {/*<Row className="mt-3">*/}
                                        {/*<span className="panel-icon panel-icon--disabled">*/}
                                            {/*<ion className="icon ion-ios-checkmark"/>*/}
                                        {/*</span>*/}
                                        {/*<h6 className="segment-achievements__text">Is over 30 years old</h6>*/}
                                    {/*</Row>*/}
                                    {/*<Row className="mt-3">*/}
                                      {/*<span className="panel-icon panel-icon--disabled">*/}
                                            {/*<ion className="icon ion-ios-checkmark"/>*/}
                                        {/*</span>*/}
                                        {/*<h6 className="segment-achievements__text">Logged in 5 times</h6>*/}
                                    {/*</Row>*/}
                                    {/*<Row className="mt-3">*/}
                                        {/*<span className="panel-icon panel-icon--disabled">*/}
                                            {/*<ion className="icon ion-ios-checkmark"/>*/}
                                        {/*</span>*/}
                                        {/*<h6 className="segment-achievements__text">Submitted form</h6>*/}
                                    {/*</Row>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</div>*/}

            </div>

        );
    }
}
