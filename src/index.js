require('dotenv').config();

const { Client, Intents } = require('discord.js');
const Path = require('path');

const Commands = require(Path.join(__dirname, 'commands'));
const GameState = require(Path.join(__dirname, '..', 'game', 'gameState'));

const MessageController = require(Path.join(__dirname, '..', 'controllers', 'MessageController'));
const InteractionController = require(Path.join(__dirname, '..', 'controllers', 'InteractionController'));

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
});

global.gameState = new GameState();
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

new MessageController(client);
new InteractionController(client);

client.login(process.env.DISCORD_BOT_TOKEN);
