const Discord = require('discord.js');

module.exports = client => {
	console.log(`El ${client.user.username} esta en la casa!`);
	client.user.setActivity('Barry White', { type: 'LISTENING' });
};