//Important libs
const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guildId, token } = require("./config.json");


//Command Builder. Will intergrate with discord to allow for bot / command. 
const commands = [
	new SlashCommandBuilder().setName("toronto").setDescription("Toronto Weather"),
	new SlashCommandBuilder().setName("montreal").setDescription("Montreal Weather"),
	new SlashCommandBuilder().setName("weather").setDescription("Replies with user info!").addStringOption((option) => option.setName("city").setDescription("Enter a string")),
	new SlashCommandBuilder().setName("help").setDescription("A command to provide assistance"),
]
	.map((command) => command.toJSON());


const rest = new REST({ version: "9" }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log("Successfully registered application commands."))
	.catch(console.error);
