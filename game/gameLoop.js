const setStatusListener = () => {
  const waitGameStart = () => {
      if(gameState.getStatus() == 2){
        console.log("STRATEGY TIME")
        return setTimeout(() => console.log("GAME START"), 5000);
      }
      return setTimeout(waitGameStart, 250);
  }
  waitGameStart();
}

setStatusListener();
