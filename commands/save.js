const Entry = require('../models/entry');
module.exports = {
    name: 'save',
    description: "Saves a story specified by the user.",
    async execute(message, args) {
        const entryNum = parseInt(args.shift());
        let msgText = "";
        let msgArr = await message.channel.messages.fetch ({limit: 100});
        msgArr = msgArr.array();
        for(let i = 0; i < msgArr.length; i++) {
            let msgObj = JSON.stringify(msgArr[i]);
            msgObj = JSON.parse(msgObj);
            if(msgObj.content.includes(` - Entry ${entryNum}📔`)) {
                msgText = msgObj.content;
            }
            if(i + 1 === msgArr.length && msgText === "") {
                message.channel.send(`\`Could not find Entry ${entryNum}!\``);
                message.delete().catch(console.error);
                return;
            }
        }
        await Entry.find({ entry: entryNum }, function(err, entries) {
            if(err) {
                console.log(err);
            }
            if(!entries.length) {
                Entry.create({
                    entry: entryNum,
                    entryText: msgText
                });
                message.channel.send(`\`Entry ${entryNum} has been saved!\``);
            }
            if(entries.length > 0) {
                message.channel.send(`\`Entry ${entryNum} has already been saved!\``);
            }
        });
        message.delete().catch(console.error);
    }
}