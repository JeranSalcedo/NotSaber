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

            gameState.addPlayer(user.id, `${user.username}#${user.discriminator}`);
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

          gameState.addPlayer(user.id, `${user.username}#${user.discriminator}`, true);
          gameState.setStatus(1);
          gameState.setChannel(interaction.member.guild.channels.cache.get(interaction.channelId));
          const embed = new MessageEmbed()
            .setColor('#099ff')
            .setTitle('Game Initialized')
            .setDescription('waiting for players')
            .addFields(
              { name: 'Current number of players', value: '1' },
              { name: 'Players', value: `${user.username}#${user.discriminator}` }
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
          if(user.id != gameState.getHostId()){
            interaction.reply('The sheer audacity of this bitch smh\nWait for the host to decide when to start');
          }
///////////////ADD PLAYER COUNT RESTRICTIONS
          const result = gameState.setStatus(2).then(() => {
            const row = new MessageActionRow()
            .addComponents(
              new MessageButton()
              .setCustomId('checkRole')
              .setLabel('Check Role')
              .setStyle('SUCCESS')
            );
            interaction.reply({
              content: '**GAME START**',
              components: [row]
            });

          });
        }
      };
    });
  }

  updateEmbed = () => {
    const allPlayers = gameState.getAllPlayerNames();

    const embed = new MessageEmbed()
      .setColor('#099ff')
      .setTitle('Game Initialized')
      .setDescription('waiting for players')
      .addFields(
        { name: 'Current number of players', value: `${gameState.playersCount}` },
        { name: 'Players', value: allPlayers === ''? '--' : allPlayers }
      );

    gameState.getJoinMessage().edit({ embeds: [embed] });
  }
}

module.exports = InteractionController;
