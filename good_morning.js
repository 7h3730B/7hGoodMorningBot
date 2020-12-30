const { MessageEmbed } = require('discord.js');
const requestify = require('requestify');

inspiroBot = async (message) => {
	requestify.get('https://inspirobot.me/api?generate=true').then(response => {
		response = response.getBody();
		message.channel.send(new MessageEmbed()
			.setTitle('Inspirational Image')
			.setTimestamp()
			.setURL(response)
			.setImage(response)
			.setAuthor("inspirobot.me", "http://inspirobot.me/website/images/inspirobot-dark-green.png")
		);
	});
}

apod = async (message) => {
	requestify.get('https://api.nasa.gov/planetary/apod?api_key=' + process.env.NASA_KEY).then(response => {
		response = response.getBody();
		if (!response['copyright']) { response['copyright'] = 'NASA' }
		message.channel.send(new MessageEmbed()
			.setTitle('Astronomy picture of the day: ' + response['title'])
			.setTimestamp()
			.setURL(response['url'])
			.setImage(response['hdurl'])
			.setDescription(response['explanation'])
			.setAuthor(`© ${response['copyright']}`, 'https://i.pinimg.com/originals/4d/e4/30/4de430dde2298e5af2f8287318acf19f.png')
		);
	});
}

currentTime = async (message) => {
	const today = new Date();
	message.channel.send(new MessageEmbed()
		.setTitle('Current Time')
		.setTimestamp()
		.setDescription(`It is ${getDayOfTheWeek(today.getDay())} ${today.getDate()}.${today.getMonth()}.${today.getFullYear()}:
				${today.getHours()}:${today.getMinutes()}`)
	);
}

getMeme = async (subreddit, message) => {
	requestify.get(`https://www.reddit.com/r/${subreddit}.json`).then(response => {
		response = response.getBody();
		const data = response['data']['children'][Math.floor(1 + (Math.random() * response['data']['children'].length - 2))]['data'];
		message.channel.send(new MessageEmbed()
			.setTitle(data['title'])
			.setImage(data['url'])
			.setTimestamp()
		);
	});
}

function getDayOfTheWeek(day) {
	const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	return weekdays[day];
}

module.exports = async (client, message) => {
	inspiroBot(message);
	apod(message);
	currentTime(message);
	getMeme('memes', message);
}