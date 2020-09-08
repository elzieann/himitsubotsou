const discord = require("discord.js");
const config = require("./config.json");

const client = new discord.Client();
var emoji = [];

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

        if (command == "franelcrew") {
            message.channel.send("Current franelcrew members: ", "")
        }

        if (command == "characters") {
            var player = "";
            var characters = [];
            var finalMessage = "";

            if (args.length > 0 && args[0].length > 0) {
                player = args[0].toLocaleLowerCase();
            } else {
                switch (message.author.username) {
                    case "FrozenPeach":
                        player = "Frozen";
                        break;
                    case "Elzie":
                        player = "Elzie";
                        break;
                    case "ROSA":
                        player = "Rosa";
                        break;
                    case "Meg":
                        player = "Meg";
                        break;
                    case "Nineveh":
                        player = "Nin";
                        break;
                }
            }

            switch (player.toLocaleLowerCase()) {
                case "frozen":
                case "frozenpeach":
                    characters = ["Anemone", "Calaith", "Gebann", "Inara", "Kim", "Lenore", "Lionel", "Loki", "Marigold", "Martha", "Rae"];
                    break;
                default:
                    message.channel.send("Player not found.");
                    return;
            }

            characters.forEach(function(character) {
                var emoji = client.emojis.cache.find(emoji => emoji.name === character.toLocaleLowerCase());
                finalMessage += character;

                if (emoji != undefined) {
                    finalMessage += `${emoji}`;
                }

                finalMessage += ", ";
            })

            message.channel.send(player + "'s characters: " + finalMessage);
        }
    } catch (error) {
        message.channel.send("Error: " + error.message)
    }
});

client.login(config.BOT_TOKEN);