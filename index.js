//require("dotenv").config();
const { Client, Intents, MessageEmbed } = require("discord.js");
const bot = new Client({
    ws: { properties: { $browser: "Discord Android" } }, 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
console.log('[HASTEBOT] Discord Client has been allocated')
const hastebin = require('hastebin.js');
const haste = new hastebin({ /* url: 'hastebin.com */ });
console.log('[HASTEBOT] Hastebin client has started')


bot.on("ready", () => { 
    bot.user.setActivity("haste help");
    console.log('[HASTEBOT] Ready!')
});

const prefix = "haste ";
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

bot.on("messageCreate", (message) => {
    if (message.content === "<@964106323153285160>" || message.content === "<@!964106323153285160>") return message.reply("My prefix is `haste ` (Include a space at end)")
    
    if (message.author.bot) return; // Prevents bots from using it, also known as "botception"

    	const prefixRegex = new RegExp(`^(<@!?${bot.user.id}>|${escapeRegex(prefix)})\\s*`);
	if (!prefixRegex.test(message.content)) return;

	const [, matchedPrefix] = message.content.match(prefixRegex);
	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

    if (command === "help") {
        const embed = new MessageEmbed()
        .setTitle("Hastebot")
        .setColor("042c35")
        .setDescription("Hastebot is a bot for uploading text (in any size) to [**Hastebin**](https://hastebin.com)")
        .addField("paste", "Paste text to Hastebin")
        .addField("ping", "Ping the bot")
        .addField("help", "This command!")
        .addField("info", "View info on the bot")
        message.reply({ embeds: [embed] });
    }

    if (command === "paste") {
        const text = args.slice(0).join(" ")
        if (!text) return message.reply(":x: Please provide some text!")
        const link = haste.post(text).then(link => message.channel.send(`<${link}>`));

    }

    if (command === "ping") message.reply(`Pong!\n${bot.ws.ping} ms`)
    if (command === "invite") message.reply("You can invite me at https://discord.com/api/oauth2/authorize?client_id=964106323153285160&permissions=18432&scope=bot")
    if (command === "info") message.reply("Hastebot is a bot for uploading text (in any size) to Hastebin\n\nMade by **sparkfire298#2981** in Discord.js V13 using the Hastebin.js NPM package.\n\nSource: <https://github.com/sparkfire298/hastebot>")

    
});

bot.login(`OTY0MTA2MzIzMTUzMjg1MTYw.GL0YxC.fso_uIiVglqYhDJeLRB95h0aJRdQiJKEaDULN8`)