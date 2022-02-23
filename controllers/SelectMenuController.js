class SelectMenuController {
  optionSelected = (command, value) => {
    switch(command){
      case 'enlist': return this.enlistPlayer(value);
    }
  }

  enlistPlayer = (id) => {
    gameState.addPartyMember(id);

    const player = gameState.getPlayer(id);

    return {
      content: `${player.nickname} got conscripted.`,
      components: []
    };
  }
}

module.exports = SelectMenuController;
