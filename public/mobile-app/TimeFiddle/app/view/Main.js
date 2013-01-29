Ext.define('TimeFiddle.view.Main', {
    extend: 'Ext.NavigationView',
    requires: [
        'Ext.Img',
        'Ext.Label'
    ],
    config: {
        fullscreen: true,
        id: 'nav',
        navigationBar: {
			hidden: true
		},

        items: [
            {
                title: 'TimeFiddle',
                layout: 'vbox',
                items: [
                	{
                		xtype: 'label',
                		html: 'Welcome to<br/><strong>TimeFiddle</strong>',
                		cls: 'welcomeLbl'
                	},
                	{
						xtype: 'button',
						text: 'Log In',
						cls: 'btn logInBtn',
						action: 'login'
					},
					{
						xtype: 'button',
						text: 'Sign Up',
						cls: 'btn signUpBtn',
						ui: 'blueBtn'
					}
				]
            }
        ]
    }
});
