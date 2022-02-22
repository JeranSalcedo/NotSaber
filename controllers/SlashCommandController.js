const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');

class SlashCommandController{
  commandIssued = (command, user, channel) => {
    switch(command){
      case 'slapnotsaber': return this.initiateGame(command, user, channel);
        break;
      case 'doubleslap': return this.startGame(user.id);
    }
  }

  initiateGame = (command, user, channel) => {
    if(gameState.getStatus() != 0){
      return {
        update: false,
        content: {
            content: '**A GAME IS ALREADY IN SESSION**',
            ephemeral: true
        }
      };
    };

    const embed = new MessageEmbed()
      .setColor('#099ff')
      .setTitle('Game Initialized')
      .setDescription('waiting for players')
      .addFields(
        { name: 'Current number of players', value: '1' },
        { name: 'Players', value: `${user.tag}` }
      );

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('join')
          .setLabel('Join')
          .setStyle('PRIMARY')
      )
      .addComponents(
          new MessageButton()
            .setCustomId('cancel')
            .setLabel('Cancel')
            .setStyle('DANGER')
      );

    gameState.addPlayer(user.id, `${user.tag}`, true);
    gameState.setStatus(1);
    gameState.setChannel(channel);

    return {
      update: false,
      content: {
        embeds: [embed],
        components: [row],
        fetchReply: true
      }
    };
  }

  startGame = (id) => {
    if(gameState.getStatus() != 1){
      return {
        update: false,
        content: {
          content: 'No one has even initiated the game yet...'
        }
      };
    }

    if(!gameState.isHost(id)){
      return {
        update: false,
        content: {
          content: 'The sheer audacity of this bitch smh\nWait for the host to decide when to start'
        }
      };
    }

///////////////ADD PLAYER COUNT RESTRICTIONS
    gameState.setStatus(2);
    gameState.getJoinMessage().edit({ components: [] });
    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setCustomId('checkRole')
      .setLabel('Check Role')
      .setStyle('SUCCESS')
      );

    return {
      update: true,
      content: {
        content: `**GAME START**`,
        components: [row]
      }
    };
  }
}

module.exports = SlashCommandController;
