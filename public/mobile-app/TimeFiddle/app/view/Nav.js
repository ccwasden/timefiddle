Ext.define('TimeFiddle.view.Nav', {
    extend: 'Ext.navigation.View',

    requires: [
        'TimeFiddle.view.LandingView'
    ],

    config: {
        navigationBar: {
            hidden: true
        },
        items: [
            {
                xtype: 'landingView',
                title: 'TimeFiddle'
            }
        ]
    }

});