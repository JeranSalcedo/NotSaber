const GAME_CONSTANTS = {
  playersCount: {
    5: {
      'good': 3,
      'evil': 2
    },
    6: {
      'good': 4,
      'evil': 2
    },
    7: {
      'good': 4,
      'evil': 3
    },
    8: {
      'good': 5,
      'evil': 3
    },
    9: {
      'good': 6,
      'evil': 3
    },
    10: {
      'good': 6,
      'evil': 4
    }
  },
  cardRoles: {
    Merlin: {
      alignment: 'arthur',
      required: true
    },
    Assassin: {
      alignment: 'mordred',
      required: true
    }
  }
}

module.exports = GAME_CONSTANTS;