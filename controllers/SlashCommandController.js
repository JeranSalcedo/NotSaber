const { MessageActionRow, MessageEmbed, MessageButton, MessageSelectMenu } = require('discord.js');

class SlashCommandController{
  commandIssued = (command, member, channel) => {
    switch(command){
      case 'slapnotsaber': return this.initiateGame(command, member, channel);
        break;
      case 'doubleslap': return this.startGame(member.user.id);
        break;
      case 'enlist': return this.createMenu();
    }
  }

  initiateGame = (command, member, channel) => {
    if(gameState.getStatus() != 0){
      return {
        update: false,
        content: {
            content: '**A GAME IS ALREADY IN SESSION**',
            ephemeral: true
        }
      };
    }

    if(channel.isThread()){
      return {
        update: false,
        content: {
          content: 'This is a thread channel you dolt.'
        }
      };
    }

    const embed = new MessageEmbed()
      .setColor('#099ff')
      .setTitle('Game Initialized')
      .setDescription('waiting for players')
      .addFields(
        { name: 'Current number of players', value: '1' },
        { name: 'Players', value: `${member.user}` }
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

    gameState.addPlayer(member, true);
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

    return {
      update: true,
      content: {
        content: 'Delet this',
        fetchReply: true
      }
    };
  }

  createMenu = () => {
    const options = gameState.getAllPlayers().map((player, index) => ({
      label: player.nickname,
      description: player.user.tag,
      value: player.user.id
    }));
    const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('enlist')
          .addOptions(options)
      );

    return {
      update: false,
      content: {
        components: [row],
        ephemeral: true
      }
    };
  }
}

module.exports = SlashCommandController;
