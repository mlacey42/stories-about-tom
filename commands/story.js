const config = require('../config');
const date = require('date-and-time');
const fetch = require('node-fetch');
const Count = require('../models/count');
module.exports = {
    name: 'story',
    description: "Creates an AI generated story based on a user prompt.",
    async execute(message, args) {
        let entryNum = 0;
        const messageText = message.content.slice(1);
        const now = new Date();
        const formatted = date.format(now, 'ddd, MMM DD YYYY HH:mm A');
        let json = 
        {
            prompt: {
                text: `Tom ${messageText.substring(messageText.indexOf(" ") + 1, messageText.length)}`
            },
            length: 500
        };
        console.log(json.prompt.text);
        const { data } = await fetch("https://api.inferkit.com/v1/models/standard/generate", {
            method: 'POST',
            body: JSON.stringify(json),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.inferkit.key}`
            }
        })
        .then(response => response.json());
        await Count.estimatedDocumentCount((err, count) => {
            if(err) {
                console.log(err);
            } else {
                if(count === 0){
                    Count.create({
                        totalCount: 0
                    });
                } else {
                    Count.findById(config.db.countId)
                    .exec((err, count) => {
                        if(err) {
                            console.log(err);
                        } else {
                            entryNum = count.totalCount + 1;
                            Count.findByIdAndUpdate(config.db.countId, { totalCount : entryNum}, 
                            (err, count) => {
                                if(err) {
                                    console.log(err);
                                } else {
                                    message.channel.send(`\`${formatted} - Entry ${count.totalCount}📔\`\n${json.prompt.text}${data.text}`);
                                }
                            })
                        }
                    })
                }
            }          
        });
        message.delete().catch(console.error);
    }
}