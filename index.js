// Require the necessary discord.js classes
const { Client, Intents, MessageEmbed } = require('discord.js');
const { token } = require('./config.json');

const fetch = require('node-fetch');
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

	var weather = require('openweather-apis');

	weather.setLang('en');
	// English - en, Russian - ru, Italian - it, Spanish - es (or sp),
	// Ukrainian - uk (or ua), German - de, Portuguese - pt,Romanian - ro,
	// Polish - pl, Finnish - fi, Dutch - nl, French - fr, Bulgarian - bg,
	// Swedish - sv (or se), Chinese Tra - zh_tw, Chinese Sim - zh (or zh_cn),
	// Turkish - tr, Croatian - hr, Catalan - ca


	// set city by name
	//weather.setCity('Toronto');

	// 'metric'  'internal'  'imperial'
 	weather.setUnits('metric');

	// check http://openweathermap.org/appid#get for get the APPID
 	weather.setAPPID('');




client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'toronto') {
		weather.setCity('Toronto');

		weather.getTemperature(function(err, temp){
			console.log(temp);
			interaction.reply('The Current temperature in Toronto is: ' + temp + 'C');
		});


	}

	if (commandName === 'montreal') {
		weather.setCity('Montreal');

		weather.getTemperature(function(err, temp){
			console.log(temp);
			interaction.reply('The Current temperature in Montreal is: ' + temp + 'C');
		});
	}
});

// Login to Discord with your client's token
client.login(token);
