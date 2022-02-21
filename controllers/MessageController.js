class MessageController {
  constructor(client) {
    client.on('messageCreate', mes => {
      console.log(mes.content);
      console.log(mes);
    });
  }
}

module.exports = MessageController;
