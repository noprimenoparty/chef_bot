module.exports.run = async (client, message, args) => {
	const sayMessage = args.join(' ');
	message.delete();
	message.channel.send(sayMessage);
};

module.exports.config = {
	name: 'Chef Says',
	description: 'Para escribir como si fuese el bot',
	usage: '!cs',
	accessableby: 'Members',
	aliases: ['cs'],
};