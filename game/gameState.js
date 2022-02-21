class gameState {
  constructor(){
    /*
      Status:
        0 - Available
        1 - Waiting for players
        2 - Strategy time
    */
    this.status = 0;
    this.delaysCount = 0;
    this.channelId = null;
    this.strategyTime = 20000;
    this.gameHost = null;
    this.questLeader = null;
    this.joinMessage = null;
    this.questEmbed = null;
    this.playersCount = 0;
    this.players = {};
  }

  setStatus = (number) => {
    this.status = number;

    if(this.status == 2){
      return new Promise((resolve, reject) => {
        this.assignRoles().then(() => {
          resolve();
        });
      });
    }
  }

  getStatus = () => {
    return this.status;
  }

  setChannel = (channel) => {
    this.channel = channel;
  }

  addPlayer = (id, name, host = false) => {
    if(host){
      this.gameHost = id;
      this.questLeader = id;
    }

    this.players[id] = { name: name };
    this.playersCount++;
  }

  removePlayer = (id) => {
    delete this.players[id];
    this.playersCount--;
  }

  checkPlayerId = (id) => {
    return id in this.players;
  }

  getPlayerCount = () => {
    return this.playersCount;
  }

  getAllPlayerNames = () => {
    let string = '';

    Object.keys(this.players).forEach(key => {
      string += `${this.players[key].name}\n`
    });

    return string;
  }

  setJoinMessage = (message) => {
    this.joinMessage = message;
  }

  getJoinMessage = () => {
    return this.joinMessage;
  }

  getHostId = () => {
    return this.gameHost;
  }

  assignRoles = () => {
    return new Promise((resolve, reject) => {
      const shuffledPlayers = Object.keys(this.players).sort(() => Math.random - 0.5);

      this.players[shuffledPlayers.pop()].role = 'Merlin';
      // this.players[shuffledPlayers.pop()].role = 'Assassin';

      resolve();
    });
  }

  getRole = (id) => {
    return this.players[id].role;
  }
}

module.exports = gameState;
