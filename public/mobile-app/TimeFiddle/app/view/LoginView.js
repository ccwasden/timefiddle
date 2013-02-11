Ext.define('TimeFiddle.view.LoginView', {
    extend: 'Ext.form.Panel',
    
    alias: 'widget.loginView',

	requires: [
        'Ext.form.FieldSet',
        'Ext.field.Email',
        'Ext.field.Password'
    ],
    
    config: {
        items: [
            {
                xtype: 'fieldset',
                maxWidth: '400px',
                items: [
                    {
                        xtype: 'emailfield',
                        label: 'Email',
                        labelWidth: '35%',
                        placeHolder: 'email@example.com'
                    },
                    {
                        xtype: 'passwordfield',
                        clearIcon: false,
                        label: 'Password',
                        labelWidth: '35%'
                    }
                ]
            },
            {
				xtype: 'button',
				text: 'Log In',
				cls: 'btn',
				action: 'login',
				ui: 'blueBtn',
				style: 'margin-top: 40px'
			}
        ]
    }

});