Ext.define('TimeFiddle.controller.DetailsViewController', {
    extend: 'Ext.app.Controller',
    
    config: {
        control: {
            "detailsView button[action='back']": {
                tap: 'back'
            }
        }
    },

    back: function(button, e, options) {
        button.up('navigationview').pop();
    }
});