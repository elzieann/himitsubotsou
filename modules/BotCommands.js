const Discord = require('discord.js');
class BotCommands {    
    constructor(message) {
        this.message = message;
    }

    franelcrew(args) {        
        var embed =  new Discord.MessageEmbed()
            .setColor("#fcba03")
            .setTitle("Current Franelcrew members")
            .addFields(
                {
                    "Rosa": "Aileen, Celeste, Crionna, Eabhan (Eabh), Korvin, Maeryn/\"Ethniu,\" Nessa, Suaimeas",
                    "Elzie": "Amalea, Elliot, Gabrial (Gabe), Jace, Lauren, Patience, Sawyer",
                    "Dots": "Faith, Jonathan, Kail, Prudence",
                    "Nin": "Keagan, Labhri",
                    "Meg": "Lawrence"
                }
            )

        this.message.channel.send(embed);
    }

    characters(args) {
        var player = "";
        var characters = [];
        var finalMessage = "";

        if (args.length > 0 && args[0].length > 0) {
            player = args[0].toLocaleLowerCase();
        } else {
            switch (this.message.author.username) {
                case "FrozenPeach":
                    player = "Frozen";
                    break;
                case "Elzie":
                    player = "Elzie";
                    break;
                case "dots":
                    player = "Dots";
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
                characters = ["Anemone", "Calaith", "Gebann", "Inara", "Kimberly", "Lenore", "Lionel", "Loki", "Marigold", "Martha", "Rae"];
                break;
            default:
                this.message.channel.send("Player not found.");
                return;
        }

        characters.forEach(function(character) {
            var emoji = this.message.client.emojis.cache.find(emoji => emoji.name === character.toLocaleLowerCase());
            finalMessage += character;

            if (emoji != undefined) {
                finalMessage += ` ${emoji}`;
            }

            finalMessage += ", ";
        }, this)

        this.message.channel.send(player + "'s characters: " + finalMessage);
    }
}

module.exports = BotCommands;