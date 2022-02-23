class GameState {
  constructor(){
    /*
      Status:
        0 - Available
        1 - Waiting for players
        2 - Strategy time start
        3 - Strategy time
        4 - Party Selection
    */
    this.status = 0;
    this.extraRoles = {
      Percival: false,
      Mordred: false,
      Morgana: false,
      Oberon: false
    };
    this.guild = null;
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

    this.roundNumber = 1;
    this.questNumber = 1;
    this.delaysCount = 0;

    this.partyMembers = [];
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

  setGuild = (guild) => {
    this.guild = guild;
  }

  getGuild = () => {
    return this.guild;
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

  addPlayer = (member, host = false) => {
    if(host){
      this.gameHost = member.user;
      this.questLeader = member.user;
    }

    this.players[member.user.id] = {
      nickname: member.nickname,
      user: member.user
    };
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

  getPlayer = (id) => {
    return this.players[id];
  }

  getPlayerCount = () => {
    return this.playersCount;
  }

  getAllPlayerId = () => {
    return Object.keys(this.players);
  }

  getAllPlayers = () => {
    return Object.keys(this.players).map(key => ({
      nickname: this.players[key].nickname,
      user: this.players[key].user
    }));
  }

  addPartyMember = (id) => {
    this.partyMembers.push(id);
  }

  getPartyMembers = () => {
    return this.partyMembers;
  }

  getAllPlayerNames = () => {
    return Object.keys(this.players).map(key => this.players[key].user.username);
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

  nextRound = () => {
    this.roundNumber++;
  }

  getRoundNumber = () => {
    return this.roundNumber;
  }

  nextQuest = () => {
    this.questNumber++;
  }

  getQuestNumber = () => {
    return this.questNumber;
  }
}

module.exports = GameState;
