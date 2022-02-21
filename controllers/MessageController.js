class MessageController {
  constructor(client) {
    client.on('messageCreate', message => {
      // console.log(message.content);
      // console.log(message);
    });

    client.on('messageReactionAdd', (messageReaction, user) => {
      if(user.bot || avalonState.status != 1 || user.id in avalonState.players) return;

      avalonState.players[user.id] = null;
      console.log(avalonState);
    });
  }
}

module.exports = MessageController;
