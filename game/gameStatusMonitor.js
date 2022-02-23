const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');

class GameStatusMonitor {
  constructor() {
    this.embedMessage = null;

    this.mainRow = new MessageActionRow();

    this.attachButtons();
    this.startStrategyTime();
  }

  updateStrategyTimeEmbed = (text) => {
    const embed = new MessageEmbed()
      .setColor('#099ff')
      .setTitle('Strategy Time')
      .addField('Time Remaining', text);

    this.embedMessage.edit({ embeds: [embed] });
  }

  updateGameStatusEmbed = () => {
    const questPartySize = GAME_CONSTANTS.playersCount[5].quests[gameState.getQuestNumber()].partySize;
    const partyMembersText = '[open slot] '.repeat(questPartySize);
    const embed = new MessageEmbed()
    .setColor('#099ff')
    .setTitle('GAME STATUS')
    .addFields(
      { name: 'Round', value: `${gameState.getRoundNumber()}` },
      { name: 'Leader', value: `${gameState.getQuestLeader()}`, inline: true },
      { name: 'Quest', value: `${gameState.getQuestNumber()} / 5`, inline: true },
      { name: 'Party Members', value: partyMembersText },
      { name: 'Players', value: `${gameState.getAllPlayers().map(player => player.user)}` },
      { name: 'Phase', value: `testestestestest` }
    );
    this.embedMessage.edit({ embeds: [embed] });
  }

  attachButtons = () => {
    this.mainRow.addComponents(
      new MessageButton()
      .setCustomId('checkRole')
      .setLabel('Check Role')
      .setStyle('SUCCESS')
    );
  }

  startStrategyTime = () => {
    let interval = 4;
    let timeRemaining = gameState.getStrategyTime();
    const embed = new MessageEmbed()
      .setColor('#099ff')
      .setTitle('Strategy Time')
      .addField('Time Remaining', `${timeRemaining / 1000} sec`);

    const waitTime = () => {
      if(timeRemaining <= 0){
        this.updateStrategyTimeEmbed('Time\'s up!');
        return setTimeout(() => {
          gameState.setStatus(3);
          this.updateGameStatusEmbed();
        }, 2000);
      }
      timeRemaining -= 250;
      if(interval == 0){
        interval = 4;
        this.updateStrategyTimeEmbed(`${timeRemaining / 1000} sec`);
      } else{
        interval--;
      }
      setTimeout(waitTime, 250);
    }

    gameState.getStatusChannel().send({
      embeds: [embed],
      components: [this.mainRow]
    }).then(message => {
      this.embedMessage = message;
      setTimeout(waitTime, 250);
    }).catch(console.error);
  }
}

module.exports = GameStatusMonitor;
