module.exports.run = async (client, message) => {
	if (message.author.bot) return;
	if (!message.content.startsWith('g!')) return;

	const content = message.content.slice(2);
	const cmdName = content.split(/ +/)[0];

	let cmdc = client.commands.get(cmdName);
	if (!cmdc) cmdc = await client.commands.find(cmd => cmd.info.aliases && cmd.info.aliases.includes(cmdName));
	if (!cmdc) return;

	let args = [];
	const str = content.slice(cmdName.length).trim();

	args = str.split(/ +/);

	cmdc.run(client, message, args);
}
