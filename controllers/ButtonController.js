class ButtonController{
  buttonPressed = (type, user) => {
    switch(type){
      case 'join': return this.addPlayer(user.id, user.tag);
        break;
      case 'cancel': return this.removePlayer(user.id);
        break;
      case 'checkRole': return {
        update: false,
        track: false,
        content: {
          content: `You've been assigned as ${gameState.getRole(user.id)}`,
          ephemeral: true
        }
      }
    }
  }

  addPlayer = (id, name) => {
    if(gameState.checkPlayerId(id)){
      return {
        update: false,
        track: false,
        content: {
          content: 'You\'re already in the list dumbass.',
          ephemeral: true
        }
      };
    } else {
      gameState.addPlayer(id, name);
      return {
        update: true,
        track: false,
        content: {
          content: 'You joined the game.',
          ephemeral: true
        }
      };
    }
  }

  removePlayer = (id) => {
    if(gameState.checkPlayerId(id)){
      gameState.removePlayer(id);
      return {
        update: true,
        track: false,
        content: {
          content: 'You left the game.',
          ephemeral: true
        }
      };
    } else {
      return {
        update: false,
        track: false,
        content: {
          content: 'You\'re not even in the list idiot.',
          ephemeral: true
        }
      }
    }
  }
}

module.exports = ButtonController;
