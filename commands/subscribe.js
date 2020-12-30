const fs = require('fs');

module.exports.run = async (client, message, args) => {
    fs.readFile('./users.json', 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading the users.json files');
        }
        let users = JSON.parse(data);
        if (!users[message.member.id] && users[message.member.id] !== 0) {
            users[message.member.id] = 0;
            message.reply('You subscribed to the service!');
        } else {
            delete users[message.member.id];
            message.reply('You unsubscribed from the service');
        }
        fs.writeFile('./users.json', JSON.stringify(users), (err) => {
            if (err) return console.error('Couldn\'t write to file');
        }); 
    });
}

module.exports.info = {
    description: 'Lets you subscribe/unsubscribe to the service!'
}