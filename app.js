const Discord = require("discord.js");
const {token, prefix} = require('./config.json');
const fetch = require('node-fetch');
const Sequelize = require('sequelize');

//const Tags = require('./schema.js');


const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const recipe_card  = sequelize.define('recipe', {
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
	recipe: Sequelize.TEXT,
	username: Sequelize.STRING,
	try_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	}
});

const bot = new Discord.Client();

bot.once('ready', () => {
	recipe_card.sync();
});

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

  //database commands
if (command === 'saverecipe') {
    const name = args.shift();
    const recipe = args.join(' ');
    try {
      // equivalent to: INSERT INTO tags (name, recipe, username) values (?, ?, ?);
      const tag = await recipe_card.create({
        name: name,
        recipe: recipe,
        username: msg.author.username,
      });
      return msg.reply(`recipe card for ${tag.name} added.`);
    }
    catch (e) {
      if (e.name === 'SequelizeUniqueConstraintError') {
        return message.reply('That tag already exists.');
      }
      return message.reply('Something went wrong with adding a tag.');
    }
  } else if (command === 'pullcard') {
    const tagName = args[0];

  // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
  const tag = await recipe_card.findOne({ where: { name: tagName } });
  if (tag) {
	  return msg.channel.send(`Here is the card for ${tagName}: \n` + tag.get('recipe'));
  }
    return msg.reply(`Could not find recipe for: ${tagName}`);

  } else if (command === 'edittag') {
    // [zeta]
  } else if (command === 'taginfo') {
    // [theta]
  } else if (command === 'showtags') {
    // [lambda]
  } else if (command === 'removetag') {
    // [mu]
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