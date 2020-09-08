const discord = require("discord.js");
const config = require("./config.json");

const client = new discord.Client();

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

        if (command == "player") {
            var player = "";

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
                    var characters = "Anemone, Calaith, Gebann, Lionel, Loki, Marigold, Martha, Rae"
                    break;
                default:
                    message.channel.send("Player not found.");
                    return;
            }

            message.channel.send(player + "'s characters: " + characters);
        }
    } catch (error) {
        message.channel.send("Error: " + error.message)
    }
});

client.login(config.BOT_TOKEN);