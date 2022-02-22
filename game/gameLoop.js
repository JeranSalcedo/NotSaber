const { MessageEmbed } = require('discord.js');

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
      gameState.getAllPlayerId().forEach(key => {
        this.client.users.fetch(key)
          .then(player => {
            gameState.getStatusChannel().members.add(player);
            gameState.getDiscussionChannel().members.add(player);
          })
          .catch(console.error);
      });

      this.startStrategyTime();
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
    let embedMessage = null;
    let interval = 4;
    let timeRemaining = gameState.getStrategyTime();
    const embed = new MessageEmbed()
      .setColor('#099ff')
      .setTitle('Strategy Time')
      .addField('Time Remaining', `${timeRemaining / 1000} sec`);

    const updateEmbed = () => {
      const embed = new MessageEmbed()
        .setColor('#099ff')
        .setTitle('Strategy Time')
        .addField('Time Remaining', `${timeRemaining / 1000} sec`);
      embedMessage.edit({ embeds: [embed] });
    }

    const waitTime = () => {
      if(timeRemaining <= 0){
        return this.gameStart();
      }
      timeRemaining -= 250;
      if(interval == 0){
        interval = 4;
        updateEmbed();
      } else{
        interval--;
      }
      return setTimeout(waitTime, 250);
    }

    gameState.getStatusChannel().send({
      embeds: [embed]
    }).then(message => {
      embedMessage = message;
      waitTime();
    }).catch(console.error);
  }

  gameStart = () => {
    while(true){

    }
  }
}

module.exports = GameLoop;
