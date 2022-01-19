// Require the necessary discord.js classes
const { Client, Intents, MessageEmbed } = require("discord.js");
const { token, idAPP } = require("./config.json")


const fetch = require("node-fetch");
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once("ready", () => {
	console.log("Ready!");
	client.user.setPresence({
		activities: [{
			name: "The Weather",
			type: "STREAMING",
			url: "https://www.twitch.tv/alexthesandwich_"
		}],
		status: "idle"
	});

});

var weather = require("openweather-apis");

weather.setLang("en");
// English - en, Russian - ru, Italian - it, Spanish - es (or sp),
// Ukrainian - uk (or ua), German - de, Portuguese - pt,Romanian - ro,
// Polish - pl, Finnish - fi, Dutch - nl, French - fr, Bulgarian - bg,
// Swedish - sv (or se), Chinese Tra - zh_tw, Chinese Sim - zh (or zh_cn),
// Turkish - tr, Croatian - hr, Catalan - ca


// set city by name
//weather.setCity('Toronto');

// 'metric'  'internal'  'imperial'
weather.setUnits("metric");

// check http://openweathermap.org/appid#get for get the idAPP
weather.setAPPID(idAPP);


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName, options } = interaction;

	//Premade command specific to Toronto
	if (commandName === "toronto") {

		weather.setCity("Toronto");
		weather.getTemperature(function (err, temp) {
			console.log(temp);
			interaction.reply("The Current temperature in Toronto is: " + temp + "C");
		});


	}

	//Premade command specific to Montreal
	if (commandName === "montreal") {
		weather.setCity("Montreal");

		weather.getTemperature(function (err, temp) {
			console.log(temp);
			interaction.reply("The Current temperature in Montreal is: " + temp + "C");
		});
	}

	//Weather Command. Gets user input, pharses it through the weathermap API, returns temperature value
	if (commandName === "weather") {
		const string = options.getString("city");

		await interaction.deferReply({
			ephemeral: true,
		})

		//Waits 1 second befor running process
		await new Promise((resolve) => setTimeout(resolve, 1000));

		weather.setCity(string)

		weather.getSmartJSON(function (err, smart) {
			console.log(smart);

			const json = JSON.stringify(smart, null, 2);

			interaction.editReply({
				content: ">**Location:** " + string + "\n" +
				">**Weather:** "+ smart.temp + "C\n" +
				">**Humidity:** "+ smart.humidity + "%\n" +
				">**Pressure:** "+ smart.pressure + "\n" +
				">**Description:** "+ smart.description + "\n" +
				">**Rain:** " + smart.rain,
			})
		});
	}
});

//Replace "token" with your discord bot token
client.login(token);
