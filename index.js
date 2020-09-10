import { Client } from "discord.js";
import { VERSION, PREFIX, BOT_TOKEN } from "./config.json";
import BotCommands from "./modules/BotCommands.js";

const client = new Client();

client.on("ready", function() {
    if (VERSION) {
        client.channels.cache.find(channel => channel.name === "botspam").send("Bot loaded. Version: " + VERSION);
    }
})

client.on("message", function(message) {
    try {
        if (message.author.bot) return;

        if (!message.content.startsWith(PREFIX)) return;

        const commandBody = message.content.slice(PREFIX.length);
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

client.login(BOT_TOKEN);