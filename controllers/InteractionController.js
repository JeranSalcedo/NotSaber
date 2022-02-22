const { MessageEmbed } = require('discord.js');
const Path = require('path');

const ButtonController = require(Path.join(__dirname, 'ButtonController'));
const SlashCommandController = require(Path.join(__dirname, 'SlashCommandController'));
const SelectMenuController = require(Path.join(__dirname, 'SelectMenuController'));

class InteractionController {
  constructor(client) {
    this.buttonController = new ButtonController();
    this.slashCommandController = new SlashCommandController();
    this.selectMenuController = new SelectMenuController();

    client.on('interactionCreate', (interaction) => {
      const { commandName, options, member } = interaction;
      let response = { update: false, content: {} };

      if(interaction.isSelectMenu()){
        const command = interaction.customId;
        const value = interaction.values[0];
        response = this.selectMenuController.optionSelected(command, value);

        interaction.update(response);
        return;
      }

      if(interaction.isButton()){
        const type = interaction.customId;
        response = this.buttonController.buttonPressed(type, member);
      }

      if(interaction.isCommand()){
        const channel = interaction.member.guild.channels.cache.get(interaction.channelId)
        response = this.slashCommandController.commandIssued(commandName, member, channel);
      }

      if(response.update) this.updateEmbed();
      if(response.content.fetchReply){
        interaction.reply(response.content).then(message => {
          if(response.content.content === 'Delet this'){
            interaction.deleteReply();
          } else{
            gameState.setJoinMessage(message);
          }
        }, error => {
          throw error;
        }).catch(console.error);
      } else {
        interaction.reply(response.content);
      }
    });
  }

  updateEmbed = () => {
    if(gameState.getJoinMessage() === null) return;

    const allPlayers = gameState.getAllPlayers().map(player => player.user);
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
        { name: 'Players', value: allPlayers.length === 0? '--' : `${allPlayers}` }
      );

    gameState.getJoinMessage().edit({ embeds: [embed] });
  }
}

module.exports = InteractionController;
