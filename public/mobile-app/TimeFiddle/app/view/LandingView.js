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
        items: [
			{
				xtype: 'spacer',
				width: '100%',
				height: '15%'
			},
			{
				xtype: 'label',
				html: 'Welcome to<br/><strong>TimeFiddle</strong>',
				cls: 'welcomeLbl'
			},
			{
				xtype: 'button',
				text: 'Log In',
				cls: 'btn',
				action: 'login',
				bottom: '90px'
			},
			{
				xtype: 'button',
				text: 'Sign Up',
				cls: 'btn',
				action: 'signup',
				ui: 'blueBtn',
				bottom: '40px'
			}
        ]
    }
});
