// Require the necessary discord.js classes
const { Client, Intents, MessageEmbed } = require('discord.js');
const { token, idAPP } = require('./config.json')


const fetch = require('node-fetch');
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
    client.user.setPresence({
        activities: [{ 
          name: "The Weather",
          type: "STREAMING", 
		  url: "https://www.twitch.tv/alexthesandwich_"
        }],
        status: "idle"
    })

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
 	weather.setAPPID(idAPP);


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName, options } = interaction;

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

	//Weather Command. Gets user input, pharses it through the weathermap API, returns temperature value
	if (commandName === 'weather') {
		const string = options.getString('city');

		await interaction.deferReply({
		  ephemeral: true,
		})

		//Waits 1 second befor running process
		await new Promise((resolve) => setTimeout(resolve, 1000))

		weather.setCity(string)

		weather.getTemperature(function(err, temp){
			console.log(temp)

			if (temp > 20) {
				interaction.editReply({
					content: 'Holy hell its warm in ' + string + ' is: ' + temp + 'C',
				})
			}

			if (temp > 10 && temp < 20) {
				interaction.editReply({
					content: 'Its warm in ' + string + ' is: ' + temp + 'C',
				})
			}

			if (temp > 0 && temp < 10) {
				interaction.editReply({
					content: 'Its cold in ' + string + ' is: ' + temp + 'C',
				})
			}

			if (temp < 0 && temp > -10) {
				interaction.editReply({
					content: 'Its freezing in ' + string + '. Its ' + temp + 'C',
				})
			}

			if (temp < -10) {
				interaction.editReply({
					content: 'Jesus fuck its cold in ' + string + '. Its ' + temp + 'C',
				})
			}
		});
	}
});

// Login to Discord with your client's token
client.login(token);
