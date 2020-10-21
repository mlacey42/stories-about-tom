// Bot Invite Link: https://discord.com/oauth2/authorize?client_id=766188243803832352&scope=bot&permissions=392256
// Imports
const Discord = require('discord.js');
const fs = require('fs');
const mongoose = require('mongoose');
mongoose.connect(process.env.connection, {useNewUrlParser: true, useUnifiedTopology: true});

// Initialization
const prefix = '!'
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Development
client.once('ready', () => {
    console.log('Tom is ready to tell stories.');
});

client.on('message', async (message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    if(command === 'story') {
        client.commands.get('story').execute(message, args);
    } else if(command === 'help') {
        client.commands.get('help').execute(message, args);
    } else if(command === 'save') {
        client.commands.get('save').execute(message, args);
    } else if(command === 'quote') {
        client.commands.get('quote').execute(message, args);
    }
});

client.login(process.env.token);