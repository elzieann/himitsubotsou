const Discord = require('discord.js');

class BotCommands {    
    constructor(message) {
        this.message = message;
    }

    franelcrew(args) {
        var franelcrew = [
            { player: "Rosa", characters: ["Aileen", "Celeste", "Crionna", "Eabhan (Eabh)", "Korvin", "Maeryn/\"Ethniu\"", "Nessa", "Suaimeas"] },
            { player: "Elzie", characters: ["Amalea", "Elliot", "Gabrial (Gabe)", "Jace", "Lauren", "Patience", "Sawyer"] },
            { player: "Dots", characters: ["Faith", "Jonathan", "Kail", "Prudence"] },
            { player: "Nin", characters: ["Keagan", "Labhri"] },
            { player: "Meg", characters: ["Lawrence"] }
        ];        

        var embed =  new Discord.MessageEmbed()
            .setColor("#fcba03")
            .setTitle("Current Franelcrew members");

        franelcrew.forEach(function(playerCharacters) {
            var characterString = "";

            playerCharacters.characters.forEach(function(character) {
                var emoji = this.message.client.emojis.cache.find(emoji => emoji.name === character.toLocaleLowerCase().split("/")[0].split(" ")[0]);

                characterString += character;

                if (emoji != undefined) {
                    characterString += ` ${emoji}`;
                }

                characterString += ", ";
            }, this);

            embed.addField(playerCharacters.player, characterString.slice(0, -2))
        }, this);

        this.message.channel.send(embed);
    }

    characters(args) {
        var player = "";
        var characters = [];
        var user = undefined;
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
                user = this.message.client.users.cache.find(user => user.username == "FrozenPeach");
                break;
            case "dots":
                characters = [];
                user = this.message.client.users.cache.find(user => user.username == "stormbourne");
                break;
            case "elzie":
                characters = [];
                user = this.message.client.users.cache.find(user => user.username == "belix");
                break;                
            case "meg":
                characters = [];
                user = this.message.client.users.cache.find(user => user.username == "Meg");
                break;
            case "nin":
                characters = [];
                user = this.message.client.users.cache.find(user => user.username == "willfor");
                break;
            case "rosa":
                characters = [];
                user = this.message.client.users.cache.find(user => user.username == "ROSA");
                break;
            default:
                this.message.channel.send("Player not found.");
                return;
        }

        characters.forEach(function(character) {
            var emoji = this.message.client.emojis.cache.find(emoji => emoji.name === character.toLocaleLowerCase().split("/")[0].split(" ")[0]);
            finalMessage += character;

            if (emoji != undefined) {
                finalMessage += ` ${emoji}`;
            }

            finalMessage += ", ";
        }, this)

        var embed = new Discord.MessageEmbed()
            .setColor("#32a8a4")
            .setTitle(player.slice(0, 1).toLocaleUpperCase() + player.slice(1).toLocaleLowerCase() + "'s characters")
            .setDescription(finalMessage.slice(0, -2));

        if (user != undefined) {
            embed.setThumbnail(user.displayAvatarURL("webp", true, "64"));
        }

        this.message.channel.send(embed);
    }
}

module.exports = BotCommands;