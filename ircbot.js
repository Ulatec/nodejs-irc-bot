var channel = "";
var admins = [];
var config = {
	channels: [channel],
	server: "irc.swiftirc.net",
	botName: ""
};
var delayedSeconds = 9;
var bracketURL = "http://niceme.me/";
var matchesToday = "";
var postponedMatches= "";
var castersTwitter = "";
var playerTwit = "";

var cooldown = 30

var irc = require("irc");
var net = require("net");


var bannedPhrases = [
	"ヽ༼ຈل͜ຈ༽ﾉ RAISE YOUR JAEDONGERS ヽ༼ຈل͜ຈ༽ﾉ",
	"UNMOD LOOKNOHANDS HES",
	"BAN ME",
	"",
]
var fs = require('fs');
var ls = require('localStorage');

/////////////////
//ADMIN SECTION//
/////////////////
var refreshAdmins = function(){
	fs.readFile('admins.txt', function (err, data) {
		if (err) throw err;
		data = data.toString();
		data = data.split(", ");
		console.log(data)
		admins = data;
	});
}
var removeAdmin = function(admin){
	adminPos = admins.indexOf(admin);
	admins.splice(adminPos, 1);
	rebuildAdmins(admins);
}
var rebuildAdmins = function(array){
	fs.truncate('admins.txt', 0, function(err){
		if (err) throw err;
		console.log("removed");
	});
	for(i = 0; i< array.length; i++){
		fs.appendFile('admins.txt',   array[i] + ", " , function (err) {
		if (err) throw err;
		//console.log(admin + ' was added to the admins list!');

	});
	}
	refreshAdmins();
	
}

var addAdmin = function(admin){
	admins.push(admin)
	rebuildAdmins(admins);
}
refreshAdmins();
///////END///////
//ADMIN SECTION//
/////////////////
var initinfo = function(){
	console.log("BOT INFO:");
	console.log("Chat Channel: "+ channel);
	console.log("Bot Name: "+ config.botName);
	console.log("");
	console.log("Admins: " + admins.toString());
}
initinfo();




function botTalk(data){
	bot.say(channel,data);
}


function listAdmins(){
	bot.say(channel, "Admins: " + admins.toString());
}


// Create the bot name
var bot = new irc.Client(config.server, config.botName, {
	channels: config.channels
});



//////////////
// COMMANDS //
//////////////
bot.addListener("message", function(from, to, text, message) {
	var isAdmin = false;
	if(admins.indexOf(from) >= 0 || admins.indexOf(from.toLowerCase()) >= 0){
		isAdmin = true;
	}
	var args = text.split(" ");
	console.log(args);
	//bot.say(channel, admins[0]);
	//console.log(admins[0]);
	if(isAdmin){
		if(args[0].toLowerCase() == "!addAdmin".toLowerCase() ){
			addAdmin(args[1]);
		}
		else if(args[0].toLowerCase() == "!addAdmin".toLowerCase() ){
			addAdmin(args[1]);
		}
		if(args[0].toLowerCase() == "!removeAdmin".toLowerCase()){
			removeAdmin(args[1]);
		}
		
	}
	if(bannedPhrases.indexOf(text) >= 0){
		chatban(from);
	}
	
	
});


///////////
//BRACKET//
///////////
var bracket = function(){
		if(ls.getItem("bracketCooldown") == null){
			ls.setItem("bracketCooldown", new Date().getTime());
			console.log("first CD");
			bot.say(channel, bracketURL);
		}
		else if(ls.getItem("bracketCooldown") !== null){
			var time = new Date().getTime();
			console.log(ls.getItem("bracketCooldown"));
			console.log(time)
			if(time - (cooldown * 1000) >= ls.getItem("bracketCooldown")){
				bot.say(channel, bracketURL);
				ls.setItem("bracketCooldown", new Date().getTime())
			}
		}
}
///////////
//CHATBAN//
///////////
var chatban = function(name){
	bot.say(channel, "/timeout " + name);
	console.log("/timeout " + name);
};