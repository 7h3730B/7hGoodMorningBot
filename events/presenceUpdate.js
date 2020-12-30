const gem = require('../good_morning');
const fs = require('fs');

module.exports.run = async (client, oldMember, newMember) => {
	fs.readFile('./users.json', 'utf8', (err, data) => {
		if (err) {
			console.error('Error reading the users.json files');
		}
		const users = JSON.parse(data);
		if (!users[newMember.member.id] && users[newMember.member.id] !== 0) return;
		if ((oldMember.status === 'offline' || !oldMember.status) && users[newMember.member.id] !== new Date().getDate()) {
			gem(client, newMember.member);
			users[newMember.member.id] = new Date().getDate();
			fs.writeFile('./users.json', JSON.stringify(users), (werr) => {
				if (werr) return console.error('Couldn\'t write to file');
				return;
			});
		}
	});
}
