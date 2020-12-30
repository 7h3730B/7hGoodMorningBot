const gme = require('../good_morning'); 

module.exports.run = async (client, message) => {
	await gme(client, message.author);
	message.reply('Send you the preview to your dm');
}

module.exports.info = {
	aliases: ['p'],
	description: 'Shows how the preview should look like'
}