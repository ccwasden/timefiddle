Ext.define('TimeFiddle.view.SignupView', {
    extend: 'Ext.form.Panel',
    
    alias: 'widget.signupView',

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
				text: 'Submit',
				cls: 'btn blueBtn',
				action: 'login',
				style: 'margin-top: 40px'
			}
        ]
    }

});