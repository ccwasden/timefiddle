Ext.define('TimeFiddle.controller.LoginController', {
    extend: 'Ext.app.Controller',
    
    config: {
        control: {
            "loginView button": {
                tap: 'login'
            }
        }
    },

    login: function(button, e, options) {
        //Authenticate here
        button.up('navigationview').push({
            xtype: 'detailsView'
        });
    }
});