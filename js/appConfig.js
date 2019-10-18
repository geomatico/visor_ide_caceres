/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
    pages: [{
        name: "home",
        path: "/",
        component: require('@mapstore/product/pages/Maps')
    }, {
        name: "maps",
        path: "/maps",
        component: require('@mapstore/product/pages/Maps')
    }, {
        name: "mapviewer",
        path: "/viewer/:mapType/:mapId",
        component: require('@mapstore/product/pages/MapViewer')
    }, {
        name: "mapviewer",
        path: "/viewer/:mapId",
        component: require('@mapstore/product/pages/MapViewer')
    }, {
        name: "manager",
        path: "/manager",
        component: require('@mapstore/product/pages/Manager')
    }, {
        name: "manager",
        path: "/manager/:tool",
        component: require('@mapstore/product/pages/Manager')
    }, {
        name: "dashboard",
        path: "/dashboard",
        component: require('@mapstore/product/pages/Dashboard')
    }, {
        name: "dashboard",
        path: "/dashboard/:did",
        component: require('@mapstore/product/pages/Dashboard')
    }, {
        name: "rulesmanager",
        path: "/rules-manager",
        component: require('@mapstore/product/pages/RulesManager')
    }],
    initialState: {
        defaultState: {
            mousePosition: {enabled: false},
            controls: {
                help: {
                    enabled: false
                },
                details: {
                    enabled: false
                },
                print: {
                    enabled: false
                },
                toolbar: {
                    active: null,
                    expanded: false
                },
                drawer: {
                    enabled: false,
                    menu: "1"
                },
                RefreshLayers: {
                    enabled: false,
                    options: {
                        bbox: true,
                        search: true,
                        title: false,
                        dimensions: false
                    }
                },
                cookie: {
                    enabled: false,
                    seeMore: false
                }
            }
        },
        mobile: {
            mapInfo: {enabled: true, infoFormat: 'application/json' },
            mousePosition: {enabled: true, crs: "EPSG:4326", showCenter: true}
        }
    },
    appEpics: {},
    storeOpts: {
        persist: {
            whitelist: ['security']
        }
    }
};
