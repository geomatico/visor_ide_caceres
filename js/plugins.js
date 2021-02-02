/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

 /**
  * Please, keep them sorted alphabetically
 */
module.exports = {
    plugins: {
        // product plugins
        AboutPlugin: require('@mapstore/product/plugins/About'),
        AttributionPlugin: require('@mapstore/product/plugins/Attribution'),
        ExamplesPlugin: require('@mapstore/product/plugins/Examples'),
        HeaderPlugin: require('@mapstore/product/plugins/Header'),
        HomeDescriptionPlugin: require('@mapstore/product/plugins/HomeDescription'),
        MapTypePlugin: require('@mapstore/product/plugins/MapType'),
        NavMenu: require('@mapstore/product/plugins/NavMenu'),
        // framework plugins
        AddGroupPlugin: require('@mapstore/plugins/AddGroup').default,
        AnnotationsPlugin: require('@mapstore/plugins/Annotations'),
        AutoMapUpdatePlugin: require('@mapstore/plugins/AutoMapUpdate'),
        BackgroundSelectorPlugin: require('./plugins/BackgroundSelector'),
        BackgroundSwitcherPlugin: require('@mapstore/plugins/BackgroundSwitcher'),
        BurgerMenuPlugin: require('@mapstore/plugins/BurgerMenu'),
        ContentTabs: require('@mapstore/plugins/ContentTabs'),
        CookiePlugin: require('@mapstore/plugins/Cookie'),
        CreateNewMapPlugin: require('@mapstore/plugins/CreateNewMap'),
        DetailsPlugin: require('@mapstore/plugins/Details'),
        DrawerMenuPlugin: require('@mapstore/plugins/DrawerMenu'),
        ExpanderPlugin: require('@mapstore/plugins/Expander'),
        FeatureEditorPlugin: require('@mapstore/plugins/FeatureEditor'),
        FloatingLegendPlugin: require('@mapstore/plugins/FloatingLegend'),
        FullScreenPlugin: require('@mapstore/plugins/FullScreen'),
        GoFull: require('@mapstore/plugins/GoFull'),
        GridContainerPlugin: require('@mapstore/plugins/GridContainer'),
        GroupManagerPlugin: require('@mapstore/plugins/manager/GroupManager'),
        HomePlugin: require('@mapstore/plugins/Home'),
        IdentifyPlugin: require('@mapstore/plugins/Identify'),
        LanguagePlugin: require('@mapstore/plugins/Language'),
        LocatePlugin: require('@mapstore/plugins/Locate'),
        LoginPlugin: require('@mapstore/plugins/Login'),
        ManagerMenuPlugin: require('@mapstore/plugins/manager/ManagerMenu'),
        ManagerPlugin: require('@mapstore/plugins/manager/Manager'),
        MapExportPlugin: require('@mapstore/plugins/MapExport'),
        MapFooterPlugin: require('@mapstore/plugins/MapFooter'),
        MapImportPlugin: require('@mapstore/plugins/MapImport'),
        MapLoadingPlugin: require('@mapstore/plugins/MapLoading'),
        MapPlugin: require('@mapstore/plugins/Map'),
        MapSearchPlugin: require('@mapstore/plugins/MapSearch'),
        MapsPlugin: require('@mapstore/plugins/Maps'),
        MeasurePlugin: require('@mapstore/plugins/Measure'),
        MetadataExplorerPlugin: require('@mapstore/plugins/MetadataExplorer'),
        MousePositionPlugin: require('@mapstore/plugins/MousePosition'),
        NotificationsPlugin: require('@mapstore/plugins/Notifications'),
        OmniBarPlugin: require('@mapstore/plugins/OmniBar'),
        PrintPlugin: require('./plugins/Print'),
        QueryPanelPlugin: require('@mapstore/plugins/QueryPanel'),
        RedirectPlugin: require('@mapstore/plugins/Redirect'),
        RedoPlugin: require('@mapstore/plugins/History'),
        RulesDataGridPlugin: require('@mapstore/plugins/RulesDataGrid'),
        RulesEditorPlugin: require('@mapstore/plugins/RulesEditor'),
        RulesManagerFooter: require('@mapstore/plugins/RulesManagerFooter'),
        SaveAsPlugin: require('@mapstore/plugins/SaveAs'),
        SavePlugin: require('@mapstore/plugins/Save'),
        ScaleBoxPlugin: require('@mapstore/plugins/ScaleBox'),
        ScrollTopPlugin: require('@mapstore/plugins/ScrollTop'),
        SearchPlugin: require('./plugins/Search'),
        SearchServicesConfigPlugin: require('@mapstore/plugins/SearchServicesConfig'),
        SettingsPlugin: require('@mapstore/plugins/Settings'),
        StyleEditorPlugin: require('@mapstore/plugins/StyleEditor'),
        TOCPlugin: require('@mapstore/plugins/TOC'),
        ToolbarPlugin: require('@mapstore/plugins/Toolbar'),
        UndoPlugin: require('@mapstore/plugins/History'),
        UserManagerPlugin: require('@mapstore/plugins/manager/UserManager'),
        VersionPlugin: require('@mapstore/plugins/Version'),
        ZoomAllPlugin: require('@mapstore/plugins/ZoomAll'),
        ZoomInPlugin: require('@mapstore/plugins/ZoomIn'),
        ZoomOutPlugin: require('@mapstore/plugins/ZoomOut')
    },
    requires: {
        ReactSwipe: require('react-swipeable-views').default,
        SwipeHeader: require('@mapstore/components/data/identify/SwipeHeader')
    }
};
