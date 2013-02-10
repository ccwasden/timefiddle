Ext.define('TimeFiddle.controller.LandingController', {
    extend: 'Ext.app.Controller',
    
    config: {
        control: {
            "landingView button[action='login']": {
                tap: 'loginBtnTap'
            },
            "landingView button[action='signup']": {
                tap: 'signupBtnTap'
            }
        }
    },

    loginBtnTap: function(button, e, options) {
        button.up('navigationview').push({
            xtype: 'loginView'
        });
    },
    
    signupBtnTap: function(button, e, options) {
        button.up('navigationview').push({
            xtype: 'signupView'
        });
    }
});