Ext.define('TimeFiddle.controller.Main', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            nav: '#nav'
        },
        control: {
            'button[action=login]': {
            	tap: 'doLogin'
            }
        }
    },

    doLogin: function() {
        console.log("here!");
    }
});