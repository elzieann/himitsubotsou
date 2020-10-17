import { MessageEmbed } from "discord.js";
import { Config } from "../config.js";
import mysqlx from "@mysql/xdevapi";

export default class BotCommands {
    constructor(message) {
        this.message = message;

        this.sql = mysqlx.getClient(
            { host: Config.MYSQL_HOST, user: Config.MYSQL_USER, password: Config.MYSQL_PASSWORD },
            { pooling: { enabled: true, maxIdleTime: 30000, maxSize: 25, queueTimeout: 10000 } }
        )
    }

    test(args) {
        var vm = this;
        var session;

        this.sql.getSession()
        .then(s => { session = s; return session.getSchema(Config.MYSQL_CHARDB) })
        .then(s => { return s.getTable("Characters") })
        .then(t => t.select("name").orderBy("name").execute())
        .then(r => {
            var rows = r.fetchAll();

            var characters = rows.join(', ');

            this.message.channel.send(characters.substring(0,2000));
            this.message.channel.send(characters.substring(2000, 3999));
        })
        .then(() => session.close())
    }

    help(args) {
        if (args[0] !== undefined) {
            var argHelp = args[0] + "Help";

            if (typeof this[argHelp] === 'function') {
                this[argHelp]();
            } else {
                this.message.channel.send("No additional help.");
            }

            return;
        }

        //Thanks for the snippet https://stackoverflow.com/a/35033472
        const getAllMethods = (obj) => {
            let props = [];

            do {
                const l = Object.getOwnPropertyNames(obj)
                    .concat(Object.getOwnPropertySymbols(obj).map(s => s.toString()))
                    .sort()
                    .filter((p, i, arr) =>
                        typeof obj[p] === 'function' &&  //only the methods
                        p !== 'constructor' &&           //not the constructor
                        (i == 0 || p !== arr[i - 1]) &&  //not overriding in this prototype
                        props.indexOf(p) === -1 &&       //not overridden in a child
                        !p.endsWith("Help")              //not a help function
                    );
                props = props.concat(l);
            }
            while (
                (obj = Object.getPrototypeOf(obj)) &&   //walk-up the prototype chain
                Object.getPrototypeOf(obj)              //not the the Object prototype methods (hasOwnProperty, etc...)
            )

            return props;
        }

        var embed = new MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Available commands")
            .setDescription(getAllMethods(this).join(", "));

        this.message.channel.send(embed);
    }

    franelcrew(args) {
        var franelcrew = [
            { player: "Rosa", characters: ["Aileen", "Celeste", "Crionna", "Eabhan (Eabh)", "Korvin", "Maeryn/\"Ethniu\"", "Nessa", "Suaimeas"] },
            { player: "Elzie", characters: ["Amalea", "Elliot", "Gaibrial (Gabe)", "Jace", "Lauren", "Patience", "Sawyer"] },
            { player: "Dots", characters: ["Faith", "Jonathan", "Kail", "Prudence"] },
            { player: "Nin", characters: ["Keagan", "Labhri"] },
            { player: "Meg", characters: ["Lawrence"] }
        ];

        this.#sendCharacterEmbed(franelcrew, "#fcba03", "Current Franelcrew members", args[0]);
    }

    franelcrewHelp() {
        var embed = new MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Help - Franelcrew")
            .setDescription("Lists characters in the Franelcrew plotline.\n\nOptional Parameters: player name to filter by");

        this.message.channel.send(embed);
    }

    hanalan(args) {
        var hanalanCommons = [
            { player: "Frozen", characters: ["Lenore", "Inara", "Kimberly"] },
            { player: "Dots", characters: ["Mark", "Eri"] },
            { player: "Elzie", characters: ["Demi", "Daisy"] },
            { player: "Rosa", characters: ["Annie", "Anton", "Nathan"] }
        ];

        this.#sendCharacterEmbed(hanalanCommons, "#90ee90", "Current Hanalan commons members", args[0]);
    }

    hanalanHelp() {
        var embed = new MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Help - Franelcrew")
            .setDescription("Lists characters in the Hanalan Commons plotline.\n\nOptional Parameters: player name to filter by");

        this.message.channel.send(embed);
    }

    eina(args) {
        var eina = [
            { player: "Frozen", characters: ["Gebann", "Rae"] },
            { player: "Nin", characters: ["Dagda"] },
            { player: "Rosa", characters: ["April"] },
            { player: "Dots", characters: ["ebony"] }
        ];

        this.#sendCharacterEmbed(eina, "#bcf5f3", "Current Eina members", args[0]);
    }

    einaHelp() {
        var embed = new MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Help - Franelcrew")
            .setDescription("Lists characters in the Eina plotline.\n\nOptional Parameters: player name to filter by");

        this.message.channel.send(embed);
    }

    characters(args) {
        var player = "";
        var characters = [];
        var color = "";
        var user = undefined;
        var finalMessage = "";

        //If there is an arg find the characters for that player
        //Otherwise find the characters for the player that activated the command
        if (args.length > 0 && args[0].length > 0) {
            player = args[0].toLocaleLowerCase();
        } else {
            switch (this.message.author.username.toLocaleLowerCase()) {
                case "frozenpeach":
                    player = "Frozen";
                    break;
                case "belix":
                    player = "Elzie";
                    break;
                case "stormbourne":
                    player = "Dots";
                    break;
                case "rosa":
                    player = "Rosa";
                    break;
                case "meg":
                    player = "Meg";
                    break;
                case "wheelfor":
                    player = "Nin";
                    break;
            }
        }

        //Player preferences - TO DO: Pull from database
        switch (player.toLocaleLowerCase()) {
            case "frozen":
                characters = ["Anemone", "Calaith", "Gebann", "Inara", "Kimberly", "Lenore", "Lionel", "Loki", "Marigold", "Martha", "Rae"];
                user = this.message.client.users.cache.find(user => user.username == "FrozenPeach");
                color = "#32a8a4";
                break;
            case "dots":
                characters = ["Kail", "Faith", "Prudence", "Jonathan", "Ebony", "Eri", "Christopher", "Mark", "Irving", "Lysander", "Verity"];
                user = this.message.client.users.cache.find(user => user.username == "stormbourne");
                color = "#a70058";
                break;
            case "elzie":
                characters = [];
                user = this.message.client.users.cache.find(user => user.username == "belix");
                color = "#008000";
                break;
            case "meg":
                characters = [];
                user = this.message.client.users.cache.find(user => user.username == "Meg");
                break;
            case "nin":
                characters = [];
                user = this.message.client.users.cache.find(user => user.username == "wheelfor");
                break;
            case "rosa":
                characters = [];
                user = this.message.client.users.cache.find(user => user.username == "ROSA");
                color = "#800080";
                break;
            default:
                this.message.channel.send("Player not found.");
                return;
        }

        characters.sort();

        //Find emojis for each character - emoji must be a custom emoji upload with the character's proper name
        characters.forEach(function(character) {
            finalMessage += character;

            var emoji = this.#getCharacterEmoji(character);

            if (emoji != undefined) {
                finalMessage += ` ${emoji}`;
            }

            finalMessage += ", ";
        }, this)

        var embed = new MessageEmbed()
            .setTitle(player.slice(0, 1).toLocaleUpperCase() + player.slice(1).toLocaleLowerCase() + (player.slice(-1) == "s" ? "'" : "'s") + " characters")
            .setDescription(finalMessage.slice(0, -2));

        if (color != "") {
            embed.setColor(color);
        }

        if (user != undefined) {
            embed.setThumbnail(user.displayAvatarURL("webp", true, "64"));
        }

        this.message.channel.send(embed);
    }

    charactersHelp() {
        var embed = new MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Help - Franelcrew")
            .setDescription("Lists characters played by the current user.\n\nOptional Parameters: alternative player name to filter by");

        this.message.channel.send(embed);
    }

    //Takes a list of players/characters, a color, and a title, and creates a custom embed
    #sendCharacterEmbed(playerCharacters, color, title, filterPlayer = undefined) {
        if (filterPlayer !== undefined) {
            playerCharacters = playerCharacters.filter(row => row.player.toLocaleLowerCase() === filterPlayer.toLocaleLowerCase())
        }

        var embed =  new MessageEmbed()
            .setColor(color)
            .setTitle(title);

        playerCharacters.sort(function(a, b) {
            if (a.player < b.player) {
                return -1;
            } else if (a.player > b.player) {
                return 1;
            } else {
                return 0;
            }
        });

        playerCharacters.forEach(function(pc) {
            var characterString = "";

            pc.characters.sort();

            //For each character find a matching emoji if possible - must be the character's proper name
            pc.characters.forEach(function(character) {
                characterString += character;

                var emoji = this.#getCharacterEmoji(character);

                if (emoji != undefined) {
                    characterString += ` ${emoji}`;
                }

                characterString += ", ";
            }, this);

            embed.addField(pc.player, characterString.slice(0, -2))
        }, this);

        this.message.channel.send(embed);
    }

    //Gets the emoji based on a character name
    #getCharacterEmoji(character) {
        //proper name
        var emoji = this.message.client.emojis.cache.find(emoji => emoji.name === character.toLocaleLowerCase().split("/")[0].split(" ")[0]);

        //secondary name
        if (emoji == undefined && character.includes("/")) {
            emoji = this.message.client.emojis.cache.find(emoji => emoji.name === character.toLocaleLowerCase().split("/\"")[1].slice(0, -1));
        }

        //nickname
        if (emoji == undefined && character.includes("(")) {
            emoji = this.message.client.emojis.cache.find(emoji => emoji.name === character.toLocaleLowerCase().split("(")[1].slice(0, -1));
        }

        return emoji;
    }
}