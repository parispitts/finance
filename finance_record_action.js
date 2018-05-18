//***********************************************************
//Assumptions:
//1. assigning current.group the value 'aargon' will route the
//   email to the correct group.
//2. I don't need to change the recipient of the email at all
//3. I can't really test this, so I'll cross my fingers and
//   hope it works/compiles 
//***********************************************************

var finutils = new FinanceUtils();
var mailbox = finutils.getFinanceMailbox(email.recipients);
var frombox = email.origemail.toLowerCase();
var 
gs.info("Frombox: " + frombox); //Is this reading or writing?
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
	route(frombox); //if email needs routing to group, send it there, if not, do nothing
	
	current.insert();
}

function getUser() {
	var usergr = new GlideRecord('sys_user');
	usergr.get(gs.getUserID());
	return usergr;
}

//decided to throw it all in a function.  This will allow
//any changes made in the future to be a bit easier to make.
function route(frombox) {
	switch(frombox) {
		case 'aagron@seatoncorp.com':
			current.group = 'aargon'; //current should be in scope here
			break;
		default:
			
	}
}
