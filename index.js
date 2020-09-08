const Discord = require("discord.js");
const config = require("./config.json");
const BotCommands = require("./modules/BotCommands.js");

const client = new Discord.Client();

client.on("ready", function() {
    client.channels.cache.get("752736749779681321").send("Bot loaded. Version: " + config.VERSION);
})

client.on("message", function(message) {
    try {
        if (message.author.bot) return;

        if (!message.content.startsWith(config.PREFIX)) return;

        const commandBody = message.content.slice(config.PREFIX.length);
        const args = commandBody.split(' ');
        const command = args.shift().toLowerCase();

        const botCommands = new BotCommands(message);

        if (typeof botCommands[command] === "function") {
            botCommands[command](args);
        }
    } catch (error) {
        message.channel.send("Error: " + error.message)
    }
});

client.login(config.BOT_TOKEN);