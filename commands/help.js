const Discord = require('discord.js');
module.exports = {
    name: 'help',
    description: "Gives directions on how to use the bot.",
    execute(message, args) {
        const helpEmbed = new Discord.MessageEmbed()
        .setColor('#54CC6C')
        .setAuthor('HeZeus', 'https://i.imgur.com/FqBvFc5.png')
        .setTitle('How to Generate a Story')
        .addFields(
            { name: '!help', value: 'Provides general information on the use of the bot.' },
            { name: '!story (your prompt here)', value: 'Generates a user-created prompt. Each prompt begins with the word "Tom".' },
            { name: '!save (entry number)', value: 'Saves a specified entry to the database.' },
            { name: '!quote', value: 'Quotes a random entry from the database.' }
        )
        .setThumbnail('https://i.imgur.com/SnoXbOM.png');
        message.channel.send(helpEmbed);
    }
}