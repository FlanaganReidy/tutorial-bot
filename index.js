const Discord = require("discord.js");
const token = require('./token.js');

const bot = new Discord.Client();

bot.on('ready', () => {
  console.log('bot is ready')
})

bot.login(token)