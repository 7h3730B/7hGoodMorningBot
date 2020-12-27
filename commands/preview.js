const gme = require('../good_morning'); 

module.exports.run = async (client, message) => {
    await gme(client, message);
}

module.exports.info = {
	aliases: ['p'],
	description: 'Shows how the preview should look like'
}