const { MessageEmbed } = require('discord.js');
const requestify = require('requestify');

async function inspiroBot(member) {
	requestify.get('https://inspirobot.me/api?generate=true').then(response => {
		response = response.getBody();
		member.send(new MessageEmbed()
			.setTitle('Inspirational Image')
			.setTimestamp()
			.setURL(response)
			.setImage(response)
			.setAuthor('inspirobot.me', 'http://inspirobot.me/website/images/inspirobot-dark-green.png')
		);
	});
}

async function apod(member) {
	requestify.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}`).then(response => {
		response = response.getBody();
		if (!response.copyright) { response.copyright = 'NASA' }
		member.send(new MessageEmbed()
			.setTitle(`Astronomy picture of the day: ${response.title}`)
			.setTimestamp()
			.setURL(response.url)
			.setImage(response.hdurl)
			.setDescription(response.explanation)
			.setAuthor(`© ${response.copyright}`, 'https://i.pinimg.com/originals/4d/e4/30/4de430dde2298e5af2f8287318acf19f.png')
		);
	});
}

async function currentTime(member) {
	const today = new Date();
	member.send(new MessageEmbed()
		.setTitle('Current Time')
		.setTimestamp()
		.setDescription(`It is ${getDayOfTheWeek(today.getDay())} ${today.getDate()}.${today.getMonth()}.${today.getFullYear()}:
				${today.getHours()}:${today.getMinutes()}`)
	);
}

async function getMeme(subreddit, member) {
	requestify.get(`https://www.reddit.com/r/${subreddit}.json`).then(response => {
		response = response.getBody();
		const { data } = response.data.children[Math.floor(1 + (Math.random() * response.data.children.length - 2))];
		member.send(new MessageEmbed()
			.setTitle(data.title)
			.setImage(data.url)
			.setTimestamp()
		);
	});
}

function getDayOfTheWeek(day) {
	const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	return weekdays[day];
}

module.exports = async (client, member) => {
	await currentTime(member);
	await inspiroBot(member);
	await apod(member);
	await getMeme('memes', member);
}
