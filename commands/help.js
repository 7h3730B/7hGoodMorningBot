const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message) => {
	let description = '```';
	client.commands.forEach((cmd, key) => {
		description += `${key}: ${cmd.info.description} ${cmd.info.aliases ? `- ${cmd.info.aliases.join(', ')}` : ''}\n`
	});
	description += '```';
	message.channel.send(new MessageEmbed()
		.setTitle('All Commands:')
		.setDescription(description)
	);
}

module.exports.info = {
	description: 'Shows you all commands and that they do'
}
