const Discord = require('discord.js');
const config = require('../settings.json');

module.exports.run = async (client, message, args) => {
	message.delete();
	const embed = new Discord.MessageEmbed()
		.setColor(0xff0000)
		.setTitle('Estos son los juegos/canales que tenemos activos en este servidor.\nPor favor, pincha en la reacción correspondiente para obtener los accesos:')
		.addField('👑 Fall Guys', 'El juego que saca lo peor de cada uno.')
		.addField('🚀 Among Us', 'No te fies ni de tu sombra.');
	const msgEmbed = await message.channel.send(embed);
	msgEmbed.react('👑');
	msgEmbed.react('🚀');
};

module.exports.config = {
	name: 'games',
	description: 'Listado de Juegos/Canales disponibles en el servidor.',
	usage: '!games',
	accessableby: 'Members',
	aliases: ['games', 'game'],
};