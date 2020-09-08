const discord = require("discord.js");

class BotCommands {
    constructor(message) {
        this.message = message;
    }

    franelcrew(args) {        
        message.channel.send("Current franelcrew members: ")
    }

    characters(args) {
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
                finalMessage += ` ${emoji}`;
            }

            finalMessage += ", ";
        })

        message.channel.send(player + "'s characters: " + finalMessage);
    }
}

module.exports = BotCommands;