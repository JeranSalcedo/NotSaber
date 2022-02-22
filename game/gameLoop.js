const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');

class GameLoop {
  constructor(client){
    this.client = client;

    this.setStatusListener();
  }

  setStatusListener = () => {
    const waitGameStart = () => {
        if(gameState.getStatus() == 2){
          return this.createRooms();
        }
        return setTimeout(waitGameStart, 250);
    }
    waitGameStart();
  }

  createRooms = () => {
    const threadCreation = [];

    threadCreation.push(this.createThread('game-status', true));
    threadCreation.push(this.createThread('game-discussion'), false);

    Promise.all(threadCreation).then(() => {
      const membersAdd = [];

      gameState.getAllPlayers().forEach(user => {
        membersAdd.push(gameState.getStatusChannel().members.add(user));
        membersAdd.push(gameState.getDiscussionChannel().members.add(user));
      });

      Promise.all(membersAdd).then(() => {
        this.startStrategyTime();
      });
    });
  }

  createThread = async (name, isStatusChannel) => {
    const threadChannel = await gameState.getChannel().threads.create({
      name: name
    });

    if(isStatusChannel){
      gameState.setStatusChannel(threadChannel);
    } else{
      gameState.setDiscussionChannel(threadChannel);
    }

    return Promise.resolve();
  }

  startStrategyTime = () => {
    this.embedMessage = null;
    let interval = 4;
    let timeRemaining = gameState.getStrategyTime();
    const embed = new MessageEmbed()
      .setColor('#099ff')
      .setTitle('Strategy Time')
      .addField('Time Remaining', `${timeRemaining / 1000} sec`);
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
        .setCustomId('checkRole')
        .setLabel('Check Role')
        .setStyle('SUCCESS')
        );

    const updateEmbed = (text) => {
      const embed = new MessageEmbed()
        .setColor('#099ff')
        .setTitle('Strategy Time')
        .addField('Time Remaining', text);
      this.embedMessage.edit({ embeds: [embed] });
    }

    const waitTime = () => {
      if(timeRemaining <= 0){
        gameState.setStatus(3);
        updateEmbed('Time\'s up!');
        return setTimeout(this.gameStart, 2000);
      }
      timeRemaining -= 250;
      if(interval == 0){
        interval = 4;
        updateEmbed(`${timeRemaining / 1000} sec`);
      } else{
        interval--;
      }
      return setTimeout(waitTime, 250);
    }

    gameState.getStatusChannel().send({
      embeds: [embed],
      components: [row]
    }).then(message => {
      this.embedMessage = message;
      setTimeout(waitTime, 250);
    }).catch(console.error);
  }

  gameStart = () => {
    const embed = new MessageEmbed()
      .setColor('#099ff')
      .setTitle('GAME STATUS')
      .addFields(
        { name: 'Round', value: '1' },
        { name: 'Leader', value: `${gameState.getQuestLeader()}`, inline: true },
        { name: 'Quest', value: '1 / 5', inline: true },
        { name: 'Players', value: `${gameState.getAllPlayers()}` }
      );
    this.embedMessage.edit({ embeds: [embed] });
  }
}

module.exports = GameLoop;
