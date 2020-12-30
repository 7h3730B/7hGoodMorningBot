const { fsOpenFiles } = require('systeminformation');
const gem = require('../good_morning');
const fs = require('fs');
const { Message } = require('discord.js');

module.exports.run = async (client, oldMember, newMember) => {
    fs.readFile('./users.json', 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading the users.json files');
        }
        let users = JSON.parse(data);
        if (!users[newMember.member.id] && users[newMember.member.id] !== 0) return;
        if ((oldMember.status === 'offline' || !oldMember.status) && users[newMember.member.id] !== new Date().getDate()) {
            gem(client, newMember.member);
            users[newMember.member.id] = new Date().getDate();
            fs.writeFile('./users.json', JSON.stringify(users), (err) => {
                if (err) return console.error('Couldn\'t write to file')
            }); 
        }
    });
}