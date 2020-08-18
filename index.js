const Discord = require("discord.js");

const bot = new Discord.Client();
const token = 'NzQ1MTAyNDY0OTQ0MTc3MjUz.Xzs4vg.U6FiSyZNQrGi2TeTjO5nqckIVl8'

bot.on('ready', () => {
  console.log('bot is ready')
})

bot.login(token)