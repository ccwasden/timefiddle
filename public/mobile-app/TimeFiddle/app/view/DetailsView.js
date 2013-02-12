Ext.define('TimeFiddle.view.DetailsView', {
    extend: 'Ext.form.Panel',
    
    alias: 'widget.detailsView',

	requires: [
        
    ],
    
    config: {
    	layout: {
			type: 'vbox',
			pack: 'top'
		},
		
		cls: 'noPadding whiteBG',
		
        items: [
            {
                docked: 'top',
				layout : {
					type  : 'hbox',
					pack  : 'center',
					align : 'middle'
				},
                items: [
                	{
                		xtype: 'button',
                		cls: 'backBtn',
                		action: 'back'
                	},
                	{
                		xtype: 'label',
                		html: 'Details',
                		flex: 1,
                		cls: 'navTitle'
                	}
                ],
                cls: 'navBar'
            },
            {
            	scrollable: false,
            	layout : {
					type  : 'vbox',
					pack  : 'top',
					align : 'middle'
				},
            	width: '100%',
            	cls: 'whiteBG',
            	padding: '20px',
            	items: [
            		{
            			xtype: 'label',
            			html: 'Birthday Party',
            			style: 'width: 100%; color: #555; font-size: 120%'
            		},
            		{
            			xtype: 'label',
            			html: 'Hey everyone, we are hosting a birthday party for George, and we would love to have you all there. Help us find the best time.',
            			style: 'width: 100%; color: #555; margin-bottom: 20px'
            		},
					{
						xtype: 'button',
						text: 'Select a time from results',
						cls: 'btn blueBtn'
					}
				]
			},
			{
				layout : {
					type  : 'vbox',
					pack  : 'top',
					align : 'middle'
				},
				flex: 2,
				width: '100%',
            	cls: 'grayBG',
				padding: '20px',
				items: [
					{
						xtype: 'button',
						text: 'Set your availability',
						cls: 'btn whiteBtn textLeft'
					},
					{
						xtype: 'button',
						text: 'View attendees',
						cls: 'btn whiteBtn textLeft'
					},
					{
						xtype: 'button',
						text: 'Edit availability range',
						cls: 'btn whiteBtn textLeft'
					},
					{
						xtype: 'button',
						text: 'View results',
						cls: 'btn whiteBtn textLeft'
					}
				]
			}
        ]
    }

});