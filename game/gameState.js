class GameState {
  constructor(){
    /*
      Status:
        0 - Available
        1 - Waiting for players
        2 - Strategy time
    */
    this.status = 0;
    this.extraRoles = {
      Percival: false,
      Mordred: false,
      Morgana: false,
      Oberon: false
    };
    this.delaysCount = 0;
    this.channel = null;
    this.strategyTime = 10000;
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
      this.assignRoles();
    }
  }

  getStatus = () => {
    return this.status;
  }

  setChannel = (channel) => {
    this.channel = channel;
  }

  getChannel = () => {
    return this.channel;
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

  isHost = (id) => {
    return id == this.gameHost;
  }

  assignRoles = () => {
    const shuffledPlayers = Object.keys(this.players).sort(() => Math.random - 0.5);

    this.players[shuffledPlayers.pop()].role = 'Merlin';
    // this.players[shuffledPlayers.pop()].role = 'Assassin';
  }

  getRole = (id) => {
    return this.players[id].role;
  }

  getStrategyTime = () => {
    return this.strategyTime;
  }
}

module.exports = GameState;
