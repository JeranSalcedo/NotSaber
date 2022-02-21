const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');

class InteractionController {
  constructor(client) {
    client.on('interactionCreate', (interaction) => {
      const { commandName, options, user } = interaction;

      if(interaction.isButton()){
        const buttonId = interaction.customId;

        switch(buttonId){
          case 'join':  {
            if(user.id in avalonState.players){
              interaction.reply({
                content: 'You\'re already in the list dumbass.',
                ephemeral: true
              });
              break;
            }

            avalonState.players[user.id] = {
              name: `${user.username}#${user.discriminator}`
            };
            interaction.reply({
              content: 'You joined the game.',
              ephemeral: true
            });
            this.updateEmbed();
            break;
          }
          case 'cancel':
            if(user.id in avalonState.players){
              delete avalonState.players[user.id];
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
        };
      }
      if(!interaction.isCommand()) return;

      switch(commandName){
        case 'slapnotsaber': {
          if(avalonState.status != 0){
            interaction.reply({
                content: '**A GAME IS ALREADY IN SESSION**',
                ephemeral: true
            });

            break;
          }

          avalonState.players[user.id] = {
            name: `${user.username}#${user.discriminator}`
          };
          avalonState.status = 1;
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
                avalonState.joinMessage = message;
              });
          }, error => {
            throw error;
          });
        }
      };
    });
  }

  updateEmbed = () => {
    let string = '';

    Object.keys(avalonState.players).forEach(key => {
      string += `${avalonState.players[key].name}\n`
    });

    const embed = new MessageEmbed()
      .setColor('#099ff')
      .setTitle('Game Initialized')
      .setDescription('waiting for players')
      .addFields(
        { name: 'Current number of players', value: `${Object.keys(avalonState.players).length}` },
        { name: 'Players', value: string === ''? '--' : string }
      );

    avalonState.joinMessage.edit({ embeds: [embed] });
  }
}

module.exports = InteractionController;
