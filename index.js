const Express = require('express');
const Discord = require('discord.js');
const Path = require('path');
const Config = require('./config');

const MessageController = require(Path.join(__dirname, 'controllers', 'MessageController'));
const InteractionController = require(Path.join(__dirname, 'controllers', 'InteractionController'));

const app = Express();
const client = new Discord.Client({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS']
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  const guild = client.guilds.cache.get(Config.guild_id);

  guild.commands.create({
    name: 'ping',
    description:  'Replies with pong.'
  });
});

const messageController = new MessageController(client);
const interactionController = new InteractionController(client);

client.login(Config.token);
