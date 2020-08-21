const Discord = require("discord.js");
const {token, prefix} = require('./config.json');
const fetch = require('node-fetch');


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
  
  //slices off prefix from our message, then trims extra whitespace, then returns our array of words from the message
  const args = msg.content.slice(prefix.length).trim().split(' ')
  
  //splits off the first word from the array, which will be our command
  const command = args.shift().toLowerCase()
  //log the command
  console.log('command: ', command)
  //log any arguments passed with a command
  console.log(args)

  if(command === 'ego') {
    msg.react("😀")
    msg.reply('wow, what a great post')
  }

  if(command === 'spicy'&& args[0] === 'take'){
      msg.react("🔥")
      msg.channel.send("That's so brave.")
  }

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

   if (command === "clear") {
    //default deletes message itself plus previous
    let num = 2;
    
    //if argument is provided, we need to convert it from string to number
    if (args[0]) {
      //add 1 to delete clear command itself
      num = parseInt(args[0]) + 1;
    }else {
        args.push(num);
    }
    //bulk delete the messages
    msg.channel.bulkDelete(num);
    //notify channel of deleted messages
    msg.channel.send(`deleted  ${args[0]} posts for you`);
  }
  
})

  //set is outside our event listener to prevent wasted processing re-creating it on every message
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