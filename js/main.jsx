/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = (config = {}, pluginsDef, overrideConfig = cfg => cfg) => {
    const React = require('react');
    const ReactDOM = require('react-dom');
    const {connect} = require('react-redux');
    const LocaleUtils = require('@mapstore/utils/LocaleUtils');

    const startApp = () => {
        const ConfigUtils = require('@mapstore/utils/ConfigUtils');
        const {loadMaps} = require('@mapstore/actions/maps');
        const {loadVersion} = require('@mapstore/actions/version');
        const {versionSelector} = require('@mapstore/selectors/version');
        const {loadAfterThemeSelector} = require('@mapstore/selectors/config');
        const StandardApp = require('@mapstore/components/app/StandardApp');

        const {
            appEpics = {},
            baseEpics,
            appReducers = {},
            baseReducers,
            initialState,
            pages,
            printingEnabled = true,
            storeOpts,
            themeCfg = {},
            mode
        } = config;

        const StandardRouter = connect((state) => ({
            locale: state.locale || {},
            pages,
            themeCfg,
            version: versionSelector(state),
            loadAfterTheme: loadAfterThemeSelector(state)
        }))(require('@mapstore/components/app/StandardRouter'));

        const {updateMapLayoutEpic} = require('@mapstore/epics/maplayout');
        const {setSupportedLocales} = require('@mapstore/epics/localconfig');
        const {readQueryParamsOnMapEpic} = require('@mapstore/epics/share');

        /**
         * appStore data needed to create the store
         * @param {object} baseReducers is used to override all the appReducers
         * @param {object} appReducers is used to extend the appReducers
         * @param {object} baseEpics is used to override all the appEpics
         * @param {object} appEpics is used to extend the appEpics
         * @param {object} initialState is used to initialize the state of the application
        */
        const appStore = require('@mapstore/stores/StandardStore').bind(null,
            initialState,
            baseReducers || {
                maptype: require('@mapstore/reducers/maptype'),
                maps: require('@mapstore/reducers/maps'),
                maplayout: require('@mapstore/reducers/maplayout'),
                version: require('@mapstore/reducers/version'),
                ...appReducers
            },
            baseEpics || {
                updateMapLayoutEpic,
                setSupportedLocales,
                readQueryParamsOnMapEpic,
                ...appEpics
            }
        );

        const initialActions = [
            () => loadMaps(
                ConfigUtils.getDefaults().geoStoreUrl,
                ConfigUtils.getDefaults().initialMapFilter || "*"
            ),
            loadVersion
        ];

        const appConfig = overrideConfig({
            storeOpts,
            appEpics,
            appStore,
            pluginsDef,
            initialActions,
            appComponent: StandardRouter,
            printingEnabled,
            themeCfg,
            mode
        });

        ReactDOM.render(
            <StandardApp {...appConfig}/>,
            document.getElementById('container')
        );
    };

    if (!global.Intl ) {
        // Ensure Intl is loaded, then call the given callback
        LocaleUtils.ensureIntl(startApp);
    } else {
        startApp();
    }
};
