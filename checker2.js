var links = [];
var utils = require('utils');
var fs = require('fs');
var casper = require('casper').create({
	remoteScripts: [
		'https://code.jquery.com/jquery-1.10.1.min.js'
	]
});

var userpassfile = casper.cli.get('userpassfile');
if (!userpassfile) {
	utils.dump('Please specify a --userpassfile.');
	casper.exit();
}
var userpass = fs.read(userpassfile);
userpass = userpass.trim().split("\n");
if (typeof userpass !== "object" || userpass.length !== 2) {
	utils.dump("Your userpassfile doesn't have a username on the first line and a password on the next line with no additional lines.");
	casper.exit();
}

function getLinks() {
    var links = document.querySelectorAll('h3.r a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}

casper.start('https://secure.ally.com/allyWebClient/login.do', function() {
	this.fill('#noautocomplete', { userNamePvtEncrypt: userpass[0] }, true);
});

casper.then(function() {
	this.fill('#noautocomplete', { passwordPvtBlock: userpass[1] }, true);
});

casper.then(function() {
	//this.capture('loggedin.png');
	/*
	this.captureSelector('1.png', '#contentWrap');
	this.captureSelector('2.png', '#contentWrap>div.center');
	this.captureSelector('3.png', '#contentWrap>div.center>table');
	this.captureSelector('4.png', '#contentWrap>div.center>table:last-of-type');
	this.captureSelector('5.png', '#contentWrap>div.center>table:last-of-type>tbody');
	this.captureSelector('6.png', '#contentWrap>div.center>table:last-of-type>tbody a');
	this.captureSelector('7.png', '#contentWrap>div.center>table:last-of-type>tbody a:first-of-type');
	*/
	//this.captureSelector('7.png', ':content');
	//Open Bill Account
	this.click('#contentWrap>div.center>table:last-of-type>tbody a:first-of-type');
	//this.evaluate(function(){
	//	$('#contentWrap>div.right>ul>li>a:contains("Download account activity")').click();
	//});
});

casper.then(function() {
	this.capture('bill.png');
});

/*
casper.then(function() {
    // aggregate results for the 'phantomjs' search
    links = links.concat(this.evaluate(getLinks));
});

*/
/*
casper.run(function() {
    // echo results in some pretty fashion
    //this.echo(links.length + ' links found:');
    //this.echo(' - ' + links.join('\n - ')).exit();
});
*/
casper.run();
