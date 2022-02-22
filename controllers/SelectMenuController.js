class SelectMenuController {
  optionSelected = (command, value) => {
    switch(command){
      case 'enlist': return this.enlistPlayer(value);
    }
  }

  enlistPlayer = (id) => {
    //////enlist player

    return {
      content: ` got conscripted.`,
      components: []
    };
  }
}

module.exports = SelectMenuController;
