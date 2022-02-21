const Discord = require('discord.js');
const Path = require('path');
const Config = require('./config');

const GameState = require(Path.join(__dirname, 'game', 'gameState'));

const MessageController = require(Path.join(__dirname, 'controllers', 'MessageController'));
const InteractionController = require(Path.join(__dirname, 'controllers', 'InteractionController'));

const client = new Discord.Client({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS']
});


global.gameState = new GameState();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  const guild = client.guilds.cache.get(Config.guild_id);
  // guild.commands.set([])
  guild.commands.create({
    name: 'slapnotsaber',
    type: Discord.Constants.ApplicationCommandTypes['1'],
    description: 'Initiates a game of Avalon. May or may not automatically put you in the opposing side.'
  });

  guild.commands.create({
    name: 'doubleslap',
    type: Discord.Constants.ApplicationCommandTypes['1'],
    description: 'Starts the game with the current players. Ensures that you become Arthur\'s enemy.'
  });

  guild.commands.create({
    name: 'testtest',
    type: Discord.Constants.ApplicationCommandTypes['2'],
  });
  guild.commands.create({
    name: 'test',
    type: Discord.Constants.ApplicationCommandTypes['3'],
  });
});

new MessageController(client);
new InteractionController(client);

client.login(Config.token);
