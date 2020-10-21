const Entry = require('../models/entry');
module.exports = {
    name: 'quote',
    description: "Quotes a saved entry from the database.",
    execute(message, args) {
        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }
        Entry.find()
        .exec()
        .then((foundEntries) => {
            message.channel.send(foundEntries[getRandomInt(foundEntries.length)].entryText);
        })
        .catch((err) => {
            console.log(err);
        });
        message.delete().catch(console.error);
    }
}