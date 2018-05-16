var FinanceUtils = Class.create();
FinanceUtils.prototype = {

    initialize: function(){
    },

	isValidEmail: function(recips) {

		var recipsString = recips.toLowerCase();
		var recipsArray = [];
		var emailString = gs.getProperty('finance.emails.otc', '') + ',' + gs.getProperty('finance.emails.ptp', '');
		var emailArray = [];
		var au = new ArrayUtil();
		if(JSUtil.notNil(emailString)) {
			emailArray = emailString.split(',');
			if(JSUtil.notNil(recipsString)) {
				recipsArray = recipsString.split(',');
				for(i = 0; i < recipsArray.length; i++) {
					if(au.contains(emailArray, recipsArray[i].toString())) {
						return true;
					}
				}
			}
		}

		return false;
	},

	getFinanceMailbox: function(recips) {

		var recipsString = recips.toLowerCase();
		var recipsArray = [];
		var emailString = gs.getProperty('finance.emails.otc', '') + ',' + gs.getProperty('finance.emails.ptp', '');
		var emailArray = [];
		var au = new ArrayUtil();
		if(JSUtil.notNil(emailString)) {
			emailArray = emailString.split(',');
			if(JSUtil.notNil(recipsString)) {
				recipsArray = recipsString.split(',');
				for(i = 0; i < recipsArray.length; i++) {
					if(au.contains(emailArray, recipsArray[i].toString())) {
						return recipsArray[i].toString();
					}
				}
			}
		}

		gs.info("Finance App Test: FinanceUtils - getFinanceMailbox - Mailbox Found: None");

		return '';
	},

	getTicketType: function(mailbox) {
		// shared arrayutil
		var au = new ArrayUtil();

		// check for OTC mailbox
		var otcEmailString = gs.getProperty('finance.emails.otc', '');
		var otcEmailArray = [];
		if(JSUtil.notNil(otcEmailString)) {
			otcEmailArray = otcEmailString.split(',');
			if(JSUtil.notNil(mailbox)) {
				if(au.contains(otcEmailArray, mailbox)) {
					return 'order_to_cash';
				}
			}
		}

		// check for PTP mailbox
		var ptpEmailString = gs.getProperty('finance.emails.ptp', '');
		var ptpEmailArray = [];
		if(JSUtil.notNil(ptpEmailString)) {
			ptpEmailArray = ptpEmailString.split(',');
			if(JSUtil.notNil(mailbox)) {
				if(au.contains(ptpEmailArray, mailbox)) {
					return 'purchase_to_pay';
				}
			}
		}

		return 'email';
	},

    type: 'FinanceUtils'
};

// comment for test
