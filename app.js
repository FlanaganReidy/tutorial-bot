const Discord = require("discord.js");
const {token, prefix} = require('./config.json');
const fetch = require('node-fetch');
const Sequelize = require('sequelize');
const recipe_book = require('schema.js');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const bot = new Discord.Client();

bot.on('ready', () => {
  console.log('bot is ready')
})

bot.login(token)


bot.on('message', async (msg) => {
  //if our message doesnt start with our defined prefix, dont go any further into function
  if(!msg.content.startsWith(prefix)) {
    console.log('no prefix')
    return
  }
    const args = msg.content.slice(prefix.length).trim().split(' ')
    const command = args.shift().toLowerCase()
  //log the command
  console.log('command: ', command)
  //log any arguments passed with a command
  console.log(args)



  //series of entertaining response commands.
  if(command === 'ego') {
    msg.react("😀")
    msg.reply('Wow! You\'re both smart and incredibly attractive!')
  }

  if(command == 'status'){
    msg.channel.send("Jeeze, tough question. I'm really just trying my best.")
  }

  if(command === 'spicy'&& args[0] === 'take'){
      msg.react("🔥")
      msg.channel.send("That's so brave.")
  }


  //Jump command
  if(command === 'joke') {
    //async API call using async/await syntax
    let getJoke = async () => {
      //make API call
      let result = await fetch('https://official-joke-api.appspot.com/random_joke')
      //convert to object we can work with
      let json = await result.json()
      return json
    }
    //call function defined above
    let joke = await getJoke()
    
    //have our bot reply using the data returned from our API call
    msg.reply(`
    Here's your joke
    ${joke.setup}
    ${joke.punchline}
    `)
  }

  //delete messages command

   if (command === "clear") {
    let num = 2;
    if (args[0]) {
      num = parseInt(args[0]) + 1;
    }else {
        args.push(num);
    }
    msg.channel.bulkDelete(num);
    msg.channel.send(`deleted  ${args[0]} posts for you`);
  }
  
})








//hate speech filter. Words are hardcoded in. Potential to move over to 
let set = new Set(['tranny', 'faggot'])
bot.on('message', (msg) => {
//if author of message is a bot, return. This prevents potential infinite loops
if(msg.author.bot) {
    return
}
//split message into array of individual words
let message = msg.content.toLowerCase();
let wordArray = message.split(' ');
console.log(wordArray)
    
//loop through every word and check if it is in our set of banned words
    for (var i = 0; i < wordArray.length; i++) {
        //if the message contains a word in our set, we delete it and send a message telling them why
        if (set.has(wordArray[i])) {
            msg.delete()
            msg.channel.send(`sorry ${msg.author.username}, this is a nice person server, no hatespeech allowed`)
            break
        }

    }
})