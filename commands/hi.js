// const Discord = require('discord.js');
// const config = require('../settings.json');

module.exports.run = async (client, message, args) => {
	return message.channel.send('Saludos Niños!');
};

module.exports.config = {
	name: 'hi',
	description: '',
	usage: '!hola',
	accessableby: 'Members',
	aliases: ['h', 'hi', 'hola'],
};