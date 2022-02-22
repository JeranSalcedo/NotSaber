const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const allCommands = [
  {
    name: 'slapnotsaber',
    type: 1,
    description: 'Initiates a game of Avalon. May or may not automatically put you in the opposing side.'
  },
  {
    name: 'doubleslap',
    type: 1,
    description: 'Starts the game with the current players. Ensures that you become Arthur\'s enemy.'
  },
  {
    name: 'testtest',
    type: 2,
  },
  {
    name: 'test',
    type: 3,
  }
];

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_BOT_TOKEN);

(async () => {
  try{
    console.log('Started refreshing application commands.');

    await rest.put(
      Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.GUILD_ID),
      { body: allCommands }
    );

    console.log('Successfully reloaded application commands.');
  } catch(error){
    console.error(error);
  }
})();
