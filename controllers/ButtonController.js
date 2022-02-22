class ButtonController{
  buttonPressed = (type, member) => {
    switch(type){
      case 'join': return this.addPlayer(member);
        break;
      case 'cancel': return this.removePlayer(member.user.id);
        break;
      case 'checkRole': return {
        update: false,
        content: {
          content: `You've been assigned as ${gameState.getRole(member.user.id)}`,
          ephemeral: true
        }
      }
    }
  }

  addPlayer = (member) => {
    if(gameState.checkPlayerId(member.user.id)){
      return {
        update: false,
        content: {
          content: 'You\'re already in the list dumbass.',
          ephemeral: true
        }
      };
    } else {
      gameState.addPlayer(member);
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
