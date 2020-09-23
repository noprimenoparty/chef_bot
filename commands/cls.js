// const Discord = require('discord.js');
// const config = require('../settings.json');

module.exports.run = async (client, message, args) => {

	if (message.deletable) {
		message.delete();
	}

	if (!message.member.hasPermission('MANAGE_MESSAGES')) {
		return message.reply('Eeehh relaja. Ese agujero es sólo de salida.\nNo tienes permisos suficientes.').then(msg => msg.delete({ timeout: 15000 }));
	}

	if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
		return message.reply('Tienes que indicar el número de lineas que quieres borrar').then(msg => msg.delete({ timeout: 15000 }));
	}

	let deleteAmount;
	if (parseInt(args[0] + 1) > 100) {
		deleteAmount = 100;
	}
	else {
		deleteAmount = parseInt(args[0]) + 1;
	}

	console.log(`!cls - ${message.author.username} - ${message.guild.name} -> ${message.channel.name} - ${message.createdAt}`);
	const user = client.users.cache.get('468752740147920897');
	user.send(`!cls - <${message.author.username}> - <${message.guild.name}/${message.channel.name}> @ - ${message.createdAt}`);

	message.channel.bulkDelete(deleteAmount, true);
	message.channel.send('Limpieza de Sable!!').then(msg => msg.delete({ timeout: 30000 }));
};

module.exports.config = {
	name: 'clear',
	description: 'Limpieza de Mensajes',
	usage: '!clear',
	accessableby: 'Members',
	aliases: ['cls', 'purge'],
};