const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');
client.commands = new Discord.Collection();

const canvas = require('canvas');
const fs = require('fs');

// -----------------------------------------

require('./util/eventHandler')(client);

client.aliases = new Discord.Collection();

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');
	let fontSize = 80;

	do {
		ctx.font = `${fontSize -= 10}px sans-serif`;
	} while (ctx.measureText(text).width > canvas.width - 300);

	return ctx.font;
};

client.on('guildMemberAdd', async (member) => {
	console.log(`Nuevo usuario:  <${member.user.username}> se ha unido a <${member.guild.name}>".`);

	const user1 = client.users.cache.get('468752740147920897');
	const user2 = client.users.cache.get('308564113431461888');
	user1.send(`Nuevo usuario:  <${member.user.username}> se ha unido a <${member.guild.name}>`);
	user2.send(`Nuevo usuario:  <${member.user.username}> se ha unido a <${member.guild.name}>`);

	const canal = member.guild.channels.cache.find(ch => ch.name === 'bienvenida');
	if (!canal) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./wallpaper.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	ctx.font = '27px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('¡ Bienvenido a Gayolada !', canvas.width / 2.5, canvas.height / 3.5);

	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}`, canvas.width / 2.5, canvas.height / 1.4);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	canal.send(`¡ Bienvenido a Gayolada !, ${member}`, attachment);

	canal.send('!games');
});

client.on('guildMemberRemove', async (member) => {
	console.log(`Baja usuario:  <${member.user.username}> se ha marchado de <${member.guild.name}>".`);

	const user1 = client.users.cache.get('468752740147920897');
	const user2 = client.users.cache.get('308564113431461888');
	user1.send(`Baja usuario:  <${member.user.username}> se ha marchado para no volver de <${member.guild.name}>`);
	user2.send(`Baja usuario:  <${member.user.username}> se ha marchado para no volver de <${member.guild.name}>`);

	const canal = member.guild.channels.cache.find(ch => ch.name === 'bienvenida');
	canal.send(`${member}, coge tus cuchillos y vete`);
});

client.on('message', async (message) => {

	if (message.content === '!help') {
		const embed = new MessageEmbed()
			.setTitle('Ayuda General del Bot')
			.setColor(0xff0000)
			.setDescription('Listado con todas las invocaciones del bot:')
			.addField('!hola', 'Saludo Genérico.')
			.addField('!chef', 'Ayuda del propio Bot Chef.')
			.addField('!games', 'Listado de Juegos/Canales activos en el servidor.')
			.addField('!addrole <game>', 'Añdir Rol necesario para poder acceder al canal del juego correspondiente.')
			.addField('!removerole <game>', 'Eliminar Rol necesario para poder acceder al canal del juego correspondiente.')
			.addField('!roles - EN DESARROLLO -', 'Muestra roles asiganos al usuario.')
			.addField('!cls', 'Elimina los 100 últimos mensajes del canal');
		message.channel.send(embed);
	}

	if (message.content === '!chef') {
		const embed = new MessageEmbed()
			.setTitle('Hoola Chicos!')
			.setColor(0xff0000)
			.setDescription('Seguro que tienen alguna duda existecial, pero aquí os indico los comandos que pueden usar conmigo:')
			.addField('!games', 'Listado de Juegos/Canales activos en el servidor. \n Si tienes el juego y/o quieres participar en el canal, activa el Rol')
			.addField('!addrole / !removerole <game>', 'Añdir o Eliminar el Rol necesario para poder acceder al canal del juego correspondiente.');
		message.channel.send(embed);
	}
});

client.on('messageReactionAdd', async (reaction, user) => {
	if (reaction.message.partial) await reaction.message.fetch();
	if (reaction.partial) await reaction.fetch();

	if (user.bot) return;
	if (!reaction.message.guild) return;

	if (reaction.emoji.name === '👑') {
		await reaction.message.guild.members.cache.get(user.id).roles.add('755449106616418375');
		console.log(`!Add Rol - ${user.username} - <crown>`);
		const user1 = client.users.cache.get('468752740147920897');
		user1.send(`!Add Rol - ${user.username} - <crown>`);
	}

	if (reaction.emoji.name === '🚀') {
		await reaction.message.guild.members.cache.get(user.id).roles.add('755447098920665088');
		console.log(`!Add Rol - ${user.username} - <rocket>`);
		const user1 = client.users.cache.get('468752740147920897');
		user1.send(`!Add Rol - ${user.username} - <rocket>`);
	}
});

client.on('messageReactionRemove', async (reaction, user) => {
	if (reaction.message.partial) await reaction.message.fetch();
	if (reaction.partial) await reaction.fetch();

	if (user.bot) return;
	if (!reaction.message.guild) return;

	if (reaction.emoji.name === '👑') {
		await reaction.message.guild.members.cache.get(user.id).roles.remove('755449106616418375');
		console.log(`!Remove Rol - ${user.username} - <crown>`);
		const user1 = client.users.cache.get('468752740147920897');
		user1.send(`!Remove Rol - ${user.username} - <crown>`);
	}

	if (reaction.emoji.name === '🚀') {
		await reaction.message.guild.members.cache.get(user.id).roles.remove('755447098920665088');
		console.log(`!Remove Rol - ${user.username} - <rocket>`);
		const user1 = client.users.cache.get('468752740147920897');
		user1.send(`!Remove Rol - ${user.username} - <rocket>`);
	}
});

fs.readdir('./commands/', (err, files) => {

	if(err) console.log(err);

	const jsfile = files.filter(f => f.split('.').pop() === 'js');
	if(jsfile.length <= 0) {
		return console.log('[LOGS] Couldn\'t Find Commands!');
	}

	jsfile.forEach((f, i) => {
		const pull = require(`./commands/${f}`);
		client.commands.set(pull.config.name, pull);
		pull.config.aliases.forEach(alias => {
			client.aliases.set(alias, pull.config.name);
		});
	});
});

client.on('message', async message => {
	if(message.author.channel || message.channel.type === 'dm') return;

	const prefix = settings.prefix;
	const messageArray = message.content.split(' ');
	const cmd = messageArray[0];
	const args = messageArray.slice(1);

	if(!message.content.startsWith(prefix)) return;
	const commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
	if(commandfile) commandfile.run(client, message, args);

});

client.login(settings.token);
// npx nodemon server.js