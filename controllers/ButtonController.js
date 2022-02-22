class ButtonController{
  buttonPressed = (type, user) => {
    switch(type){
      case 'join': return this.addPlayer(user);
        break;
      case 'cancel': return this.removePlayer(user.id);
        break;
      case 'checkRole': return {
        update: false,
        content: {
          content: `You've been assigned as ${gameState.getRole(user.id)}`,
          ephemeral: true
        }
      }
    }
  }

  addPlayer = (user) => {
    if(gameState.checkPlayerId(user.id)){
      return {
        update: false,
        content: {
          content: 'You\'re already in the list dumbass.',
          ephemeral: true
        }
      };
    } else {
      gameState.addPlayer(user);
      return {
        update: true,
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
        content: {
          content: 'You left the game.',
          ephemeral: true
        }
      };
    } else {
      return {
        update: false,
        content: {
          content: 'You\'re not even in the list idiot.',
          ephemeral: true
        }
      }
    }
  }
}

module.exports = ButtonController;
