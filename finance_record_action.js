var finutils = new FinanceUtils();
var mailbox = finutils.getFinanceMailbox(email.recipients);
var frombox = email.origemail.toLowerCase();
gs.info("Frombox: " + frombox);
// gs.info('Mailbox info: ' + mailbox);

var user = getUser();
if(mailbox && mailbox != '') {
	// check if you need to include the "from" mailbox
	if(user.user_name != 'guest')
		current.description = email.body_text;
	else
		current.description = "Email received from: " + frombox + '\n\n' + email.body_text;
	current.x_fru_lift_commerc_requested_by = gs.getUserID();
	current.contact_type = "email";
	current.short_description = email.subject;
	current.u_source_mailbox = mailbox;
	current.u_from_mailbox = frombox;
	current.u_ticket_type = finutils.getTicketType(mailbox);
	current.insert();
}

function getUser() {
	var usergr = new GlideRecord('sys_user');
	usergr.get(gs.getUserID());
	return usergr;
}
