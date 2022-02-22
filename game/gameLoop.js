const { MessageEmbed } = require('discord.js');

class GameLoop {
  constructor(client){
    this.client = client;

    this.setStatusListener();
  }

  setStatusListener = () => {
    const waitGameStart = () => {
        if(gameState.getStatus() == 2){
          return this.startStrategyTime();
        }
        return setTimeout(waitGameStart, 250);
    }
    waitGameStart();
  }

  startStrategyTime = () => {
    let embedMessage = null;
    let interval = 4;
    let timeRemaining = gameState.getStrategyTime();
    const embed = new MessageEmbed()
      .setColor('#099ff')
      .setTitle('Strategy Time')
      .addField('Time Remaining', `${timeRemaining / 1000} s`);

    const updateEmbed = () => {
      const embed = new MessageEmbed()
        .setColor('#099ff')
        .setTitle('Strategy Time')
        .addField('Time Remaining', `${timeRemaining / 1000} s`);
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

    gameState.getChannel().send({
      embeds: [embed]
    }).then((message) => {
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
