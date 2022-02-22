class GameState {
  constructor(){
    /*
      Status:
        0 - Available
        1 - Waiting for players
        2 - Strategy time
        3 - Party Selection
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
    this.statusChannel = null;
    this.discussionChannel = null;
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

  setStatusChannel = (channel) => {
    this.statusChannel = channel;
  }

  getStatusChannel = () => {
    return this.statusChannel;
  }

  setDiscussionChannel = (channel) => {
    this.discussionChannel = channel;
  }

  getDiscussionChannel = () => {
    return this.discussionChannel;
  }

  addPlayer = (user, host = false) => {
    if(host){
      this.gameHost = user;
      this.questLeader = user;
    }

    this.players[user.id] = { user: user };
    this.playersCount++;
  }

  removePlayer = (id) => {
    delete this.players[id];
    this.playersCount--;
  }

  setQuestLeader = (user) => {
    this.questLeader = user;
  }

  getQuestLeader = () => {
    return this.questLeader;
  }

  checkPlayerId = (id) => {
    return id in this.players;
  }

  getPlayerCount = () => {
    return this.playersCount;
  }

  getAllPlayerId = () => {
    return Object.keys(this.players);
  }

  getAllPlayers = () => {
    return Object.keys(this.players).map(key => this.players[key].user);
  }

  getAllPlayerNames = () => {
    let string = '';
    let interval = 3;

    Object.keys(this.players).forEach(key => {
      string += `${this.players[key].user.username}`

      if(interval <= 0){
        string += ' ';
        interval = 3;
      } else {
        string += '\n';
        interval--;
      }
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
