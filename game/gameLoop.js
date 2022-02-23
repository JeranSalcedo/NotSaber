const Path = require('path');

const GameStatusMonitor = require(Path.join(__dirname, 'gameStatusMonitor'));

class GameLoop {
  constructor(client){
    this.client = client;

    this.setStatusListener();
  }

  setStatusListener = () => {
    const waitGameStart = () => {
      switch(gameState.getStatus()){
        case 4: this.gameStart();
          break;
        case 2: this.createRooms();
          gameState.setStatus(3);
      }

      return setTimeout(waitGameStart, 250);
    }
    waitGameStart();
  }

  createRooms = () => {
    const threadCreation = [];

    threadCreation.push(this.createThread('game-status', true));
    threadCreation.push(this.createThread('game-discussion', false));

    Promise.all(threadCreation).then(() => {
      const membersAdd = [];

      gameState.getAllPlayers().forEach(player => {
        membersAdd.push(gameState.getStatusChannel().members.add(player.user));
        membersAdd.push(gameState.getDiscussionChannel().members.add(player.user));
      });

      Promise.all(membersAdd).then(() => {
        new GameStatusMonitor();
      });
    });
  }

  createThread = async (name, isStatusChannel) => {
    const threadChannel = await gameState.getChannel().threads.create({
      name: name
    });

    if(isStatusChannel){
      gameState.setStatusChannel(threadChannel);
    } else{
      gameState.setDiscussionChannel(threadChannel);
    }

    return Promise.resolve();
  }

  gameStart = () => {
    const beginRound = () => {
      console.log('TEST');
    };

    beginRound();
  }
}

module.exports = GameLoop;
