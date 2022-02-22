const { MessageEmbed } = require('discord.js');
const Path = require('path');

const ButtonController = require(Path.join(__dirname, 'ButtonController'));
const SlashCommandController = require(Path.join(__dirname, 'SlashCommandController'));

class InteractionController {
  constructor(client) {
    this.buttonController = new ButtonController();
    this.slashCommandController = new SlashCommandController();

    client.on('interactionCreate', (interaction) => {
      const { commandName, options, user } = interaction;
      let response = { update: false, content: {} };

      if(interaction.isButton()){
        const type = interaction.customId;
        response = this.buttonController.buttonPressed(type, user);
      }

      if(interaction.isCommand()){
        const channel = interaction.member.guild.channels.cache.get(interaction.channelId)
        response = this.slashCommandController.commandIssued(commandName, user, channel);
      }

      if(response.update) this.updateEmbed();
      if(response.track){
        interaction.reply(response.content).then(() => {
          interaction.fetchReply()
          .then(message => {
            gameState.setJoinMessage(message);
          });
        }, error => {
          throw error;
        });
      } else {
        interaction.reply(response.content);
      }
    });
  }

  updateEmbed = () => {
    if(gameState.getJoinMessage() === null) return;

    const allPlayers = gameState.getAllPlayerNames();
    let gameStatus = '';
    let playerStatus = '';
    switch(gameState.getStatus()){
      case 1:
        gameStatus = 'Game Initiated';
        playerStatus = 'waiting for players';
        break;
      case 2:
        gameStatus = 'Game Started';
        playerStatus = 'players complete';
        break;
      default:
        gameStatus = 'Game Ended';
        playerStatus = 'screw off, scram';
    }
    const embed = new MessageEmbed()
      .setColor('#099ff')
      .setTitle(gameStatus)
      .setDescription(playerStatus)
      .addFields(
        { name: 'Current number of players', value: `${gameState.playersCount}` },
        { name: 'Players', value: allPlayers === ''? '--' : allPlayers }
      );

    gameState.getJoinMessage().edit({ embeds: [embed] });
  }
}

module.exports = InteractionController;
