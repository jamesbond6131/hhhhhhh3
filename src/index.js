const fs = require('fs')
const uuid = require('uuid');
const jquery = require('jquery');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
require('dotenv').config();
const { Client, IntentsBitField, ChannelSelectMenuBuilder } = require("discord.js");
const { error } = require('console');
const { env } = require('process');
const { channel } = require('diagnostics_channel');
const loginPage= fs.readFileSync('login-user.html', 'utf8')



const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.login(process.env.TOKEN);

client.on('ready', (c) => {
  console.log(`${c.user.tag} is online...`)
});


client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if(interaction.commandName === 'create-code'){
    
fs.readFile('checkout.html', 'utf8', (err, data) => {
      const Cosmetic = interaction.options.getString('cosmetic');
      const Price = interaction.options.getString('price');
      const dom = new jsdom.JSDOM(data);
      const CosmeticElement = jquery(dom.window);
      const PriceElement = jquery(dom.window);
      
      let fileName = crypto.randomUUID();

      CosmeticElement('.yusufshef').html(`${Cosmetic}`);
      PriceElement('.removedll').html(`${Price}`);
      fs.writeFile(`${fileName}.html`, dom.serialize(), { flag: "a" }, err => {
          console.log('done');
      });
      interaction.reply({
        content: `A new link has been generated with the cosmetic: ${CosmeticElement('.yusufshef').html()},  and the price: ${PriceElement('.removedll').html()}\n`,
        ephemeral: true
      });

  });




  setTimeout(() => {
    process.exit();
  }, 2000)

  }
});



client.login(process.env.TOKEN);
