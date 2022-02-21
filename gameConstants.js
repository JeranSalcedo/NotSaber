const GAME_CONSTANTS = {
  playersCount: {
    5: {
      'good': 3,
      'evil': 2,
      quests: {
        1: {
          partySize: 2,
          maxFails: 1
        },
        2: {
          partySize: 3,
          maxFails: 1
        },
        3: {
          partySize: 2,
          maxFails: 1
        },
        4: {
          partySize: 3,
          maxFails: 1
        },
        5: {
          partySize: 3,
          maxFails: 1
        }
      }
    },
    6: {
      'good': 4,
      'evil': 2,
      quests: {
        1: {
          partySize: 2,
          maxFails: 1
        },
        2: {
          partySize: 3,
          maxFails: 1
        },
        3: {
          partySize: 4,
          maxFails: 1
        },
        4: {
          partySize: 3,
          maxFails: 1
        },
        5: {
          partySize: 4,
          maxFails: 1
        }
      }
    },
    7: {
      'good': 4,
      'evil': 3,
      quests: {
        1: {
          partySize: 2,
          maxFails: 1
        },
        2: {
          partySize: 3,
          maxFails: 1
        },
        3: {
          partySize: 3,
          maxFails: 1
        },
        4: {
          partySize: 4,
          maxFails: 2
        },
        5: {
          partySize: 4,
          maxFails: 1
        }
      }
    },
    8: {
      'good': 5,
      'evil': 3,
      quests: {
        1: {
          partySize: 3,
          maxFails: 1
        },
        2: {
          partySize: 4,
          maxFails: 1
        },
        3: {
          partySize: 4,
          maxFails: 1
        },
        4: {
          partySize: 5,
          maxFails: 2
        },
        5: {
          partySize: 5,
          maxFails: 1
        }
      }
    },
    9: {
      'good': 6,
      'evil': 3,
      quests: {
        1: {
          partySize: 3,
          maxFails: 1
        },
        2: {
          partySize: 4,
          maxFails: 1
        },
        3: {
          partySize: 4,
          maxFails: 1
        },
        4: {
          partySize: 5,
          maxFails: 2
        },
        5: {
          partySize: 5,
          maxFails: 1
        }
      }
    },
    10: {
      'good': 6,
      'evil': 4,
      quests: {
        1: {
          partySize: 3,
          maxFails: 1
        },
        2: {
          partySize: 4,
          maxFails: 1
        },
        3: {
          partySize: 4,
          maxFails: 1
        },
        4: {
          partySize: 5,
          maxFails: 2
        },
        5: {
          partySize: 5,
          maxFails: 1
        }
      }
    }
  },
  cardRoles: {
    Merlin: {
      alignment: 'good',
      required: true
    },
    Assassin: {
      alignment: 'evil',
      required: true
    }
  }
}

module.exports = GAME_CONSTANTS;
