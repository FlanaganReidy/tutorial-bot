const Discord = require("discord.js");

const bot = new Discord.Client();
const token = 'NzQ1MTAyNDY0OTQ0MTc3MjUz.Xzs4vg.30EV0tN1jEwIdGTiEQqU0-cuTBE'

bot.on('ready', () => {
  console.log('bot is ready')
})

bot.login(token)