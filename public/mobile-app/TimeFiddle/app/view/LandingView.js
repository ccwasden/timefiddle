Ext.define('TimeFiddle.view.LandingView', {
    extend: 'Ext.form.Panel',
    
    alias: 'widget.landingView',
    
    requires: [
        'Ext.Img',
        'Ext.Label'
    ],
    
    config: {
        fullscreen: true,
        scrollable: false,
        navigationBar: {
			hidden: true
		},
		layout : {
			type  : 'vbox',
			pack  : 'center',
			align : 'middle'
		},
		padding: '20px',
        items: [
			{
				xtype: 'label',
				html: 'Welcome to<br/><strong>TimeFiddle</strong>',
				cls: 'welcomeLbl'
			},
			{
				xtype: 'spacer'
			},
			{
				xtype: 'button',
				text: 'Log In',
				cls: 'btn grayBtn',
				action: 'login'
			},
			{
				xtype: 'button',
				text: 'Sign Up',
				cls: 'btn blueBtn',
				action: 'signup'
			}
        ]
    }
});
