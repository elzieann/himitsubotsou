const Discord = require("discord.js");
const Config = require("./config.json");
const BotCommands = require("./modules/BotCommands.js");

const client = new Discord.Client();

client.on("ready", function() {
    if (Config.VERSION) {
        client.channels.cache.find(channel => channel.name === "botspam").send("Bot loaded. Version: " + Config.VERSION);
    }
})

client.on("message", function(message) {
    try {
        if (message.author.bot) return;

        if (!message.content.startsWith(Config.PREFIX)) return;

        const commandBody = message.content.slice(Config.PREFIX.length);
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

client.login(Config.BOT_TOKEN);