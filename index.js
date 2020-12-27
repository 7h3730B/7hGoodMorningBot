const Discord = require('discord.js');
const fs = require('fs');
const { join } = require('path');
require('dotenv').config();

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

client.commands = new Discord.Collection();

fs.readdir(join(__dirname, '/events/'), (err, files) => {
	if (err) console.error(err);
	files.forEach(file => {
		const event = require(`./events/${file}`);
		client.on(file.split('.')[0], (...args) => event.run(client, ...args));
	});
});

fs.readdir(join(__dirname, '/commands/'), (err, files) => {
	if (err) console.error(err);
	files.forEach(file => {
		const command = require(`./commands/${file}`);
		client.commands.set(file.split('.')[0], command);
	});
});

client.login(process.env.DISCORD_TOKEN);
