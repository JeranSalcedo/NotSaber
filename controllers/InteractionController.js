const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');

class InteractionController {
  constructor(client) {
    client.on('interactionCreate', (interaction) => {
      const { commandName, options, user } = interaction;

      if(interaction.isButton()){
        const buttonId = interaction.customId;

        switch(buttonId){
          case 'join':  {
            if(gameState.checkPlayerId(user.id)){
              interaction.reply({
                content: 'You\'re already in the list dumbass.',
                ephemeral: true
              });
              break;
            }

            gameState.addPlayer(user.id, `${user.tag}`);
            interaction.reply({
              content: 'You joined the game.',
              ephemeral: true
            });
            this.updateEmbed();
            break;
          }

          case 'cancel': {
            if(gameState.checkPlayerId(user.id)){
              gameState.removePlayer(user.id);
              interaction.reply({
                content: 'You left the game.',
                ephemeral: true
              });
              this.updateEmbed();
              break;
            }

            interaction.reply({
              content: 'You\'re not even in the list idiot.',
              ephemeral: true
            });
            break;
          }

          case 'checkRole':
            interaction.reply({
              content: `You've been assigned as ${gameState.getRole(user.id)}`,
              ephemeral: true
            });
        };
      }
      if(!interaction.isCommand()) return;

      switch(commandName){
        case 'slapnotsaber': {
          if(gameState.status != 0){
            interaction.reply({
                content: '**A GAME IS ALREADY IN SESSION**',
                ephemeral: true
            });

            break;
          }

          gameState.addPlayer(user.id, `${user.tag}`, true);
          gameState.setStatus(1);
          gameState.setChannel(interaction.member.guild.channels.cache.get(interaction.channelId));
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

          interaction.reply({
            embeds: [embed],
            components: [row]
          }).then(() => {
            interaction.fetchReply()
              .then(message => {
                gameState.setJoinMessage(message);
              });
          }, error => {
            throw error;
          });

          break;
        }

        case `doubleslap`: {
          if(gameState.getStatus() != 1){
            interaction.reply('No one has even initiated the game yet...');
            break;
          }

          if(user.id != gameState.getHostId()){
            interaction.reply('The sheer audacity of this bitch smh\nWait for the host to decide when to start');
            break;
          }

///////////////ADD PLAYER COUNT RESTRICTIONS
          const result = gameState.setStatus(2).then(() => {
            this.updateEmbed();
            const row = new MessageActionRow()
            .addComponents(
              new MessageButton()
              .setCustomId('checkRole')
              .setLabel('Check Role')
              .setStyle('SUCCESS')
            );
            gameState.getJoinMessage().edit({ components: [] });
            interaction.reply({
              content: `**GAME START**`,
              components: [row]
            });
          });
        }
      };
    });
  }

  updateEmbed = () => {
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
