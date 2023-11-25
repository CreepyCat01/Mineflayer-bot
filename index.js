const mineflayer = require('mineflayer');


const bot = mineflayer.createBot({
  host: 'SERVERIP',
  port: PORT,
  username: 'USERNAME',
});

function makeDecision() {
  // Add your decision-making logic here
  // For example, move the bot randomly
  const direction = Math.floor(Math.random() * 4); // 0: forward, 1: backward, 2: left, 3: right

  switch (direction) {
    case 0:
      bot.setControlState('forward', true);
      break;
    case 1:
      bot.setControlState('back', true);
      break;
    case 2:
      bot.setControlState('left', true);
      break;
    case 3:
      bot.setControlState('right', true);
      break;
  }

  // Stop after a random duration
  const duration = Math.floor(Math.random() * 5000) + 1000; // Between 1 and 5 seconds
  setTimeout(() => {
    bot.clearControlStates();
    makeDecision(); // Make a new decision after stopping
  }, duration);
}

bot.on('spawn', () => {
  makeDecision(); // Start making decisions when the bot spawns
});

// Listen for chat messages and respond
bot.on('chat', (username, message) => {
  if (username === bot.username) return;

  if (message === 'Hello bot') {
    bot.chat('Hello, ' + username + '!');
  }
});
