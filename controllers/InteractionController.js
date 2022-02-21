const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');

class InteractionController {
  constructor(client) {
    client.on('interactionCreate', (interaction) => {

      console.log(interaction);
      if(!interaction.isCommand()) return;

      const { commandName, options } = interaction;
      switch(commandName){
        case 'slapnotsaber': {
          if(avalonState.status != 0){
            interaction.reply({
                content: '**A GAME IS ALREADY IN SESSION**',
                ephemeral: true
            });

            break;
          }

          avalonState.players[interaction.user.id] = '';
          avalonState.status = 1;
          avalonState.playerListEmbed = new MessageEmbed()
            .setColor('#099ff')
            .setTitle('Game Initialized')
            .setDescription('waiting for players')
            .addFields(
              { name: 'Current number of players', value: '1' },
              { name: 'Players', value: `${interaction.user.username}#${interaction.user.discriminator}` }
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
            embeds: [avalonState.playerListEmbed],
            components: [row]
          });
        }
      };
    });
  }
}

module.exports = InteractionController;
