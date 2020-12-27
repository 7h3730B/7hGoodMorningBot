const { MessageEmbed } = require('discord.js');
const { repository } = require('../package.json');
const os = require('os');
const si = require('systeminformation');

module.exports.run = async (client, message) => message.channel.send(new MessageEmbed()
	.setTitle('Info about the Bot')
	.addField('Github Repo', repository.url.replace('git+', '').replace('.git', ''))
	.addField('NodeJS Version', process.version)
	.addField('RAM', `${((await si.mem()).used / 1.074e+9).toFixed(0)}GB / ${((await si.mem()).total / 1.074e+9).toFixed(0)}GB`)
	.addField('CPU', `${os.cpus()[0].model.split('@')[0]}: ${Math.round((await si.currentLoad()).currentload)}%`)
)

module.exports.info = {
	aliases: ['i'],
	description: 'Shows you information about the bot!'
}
