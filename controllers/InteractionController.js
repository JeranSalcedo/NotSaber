class InteractionController {
  constructor(client) {
    client.on('interactionCreate', (interaction) => {
      if(!interaction.isCommand()) return;

      const { commandName, options } = interaction;
      switch(commandName){
        case 'ping': {
          interaction.reply({
            content: 'pong',
            ephemeral: true
          });
        }
      };
    });
  }
}

module.exports = InteractionController;
