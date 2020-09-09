class BotCommands {    
    constructor(message) {
        this.message = message;
    }

    franelcrew(args) {        
        this.message.channel.send("Current franelcrew members: \n" +
                                  "*Rosa:* Aileen, Celeste, Crionna, Eabhan (Eabh), Korvin, Maeryn/\"Ethniu,\" Nessa, Suaimeas\n" + 
                                  "*Elzie:* Amalea, Elliot, Gabrial (Gabe), Jace, Lauren, Patience, Sawyer\n" +
                                  "*Dots:* Faith, Jonathan, Kail, Prudence\n" + 
                                  "*Nin:* Keagan, Labhri\n" +
                                  "*Meg:* Lawrence");
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