require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});


// Commands collection for "Skriv tilbage besked"
client.commands = new Collection();
// Load commands sendt igennem 
const commandsPath = path.join(__dirname,"commands");
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  client.commands.set(command.name, command);
}

// Loader events 
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter((f) => f.endsWith(".js"));
for (const file of eventFiles) {
  const event = require(path.join(eventsPath, file));
  client.on(event.name, (...args) => event.execute(...args));
}

//Commands collection for "Husk" funktionen: Bruges /Husk idag 11:50 madpakke. Svar: @discord_name Husk madpakke (beskeden sendes 11.50)
client.on("interactionCreate", async(interaction) =>{
  if(!intercation.isChatInputcommand()) return

  if(interaction.commandName === "husk"){
    const time = interaction.options.getstring("tid")
    const text = interaction.options.getstring("besked")
    //fx 11.50
    const [hours, minute] = time.spilt(":").map(Number);
    const now = new Date();
    const remindertime = new Date();

    remindertime.setHours(hours)
    remindertime.setMinutes(minute)
    remindertime.setSeconds(0);
    const delay = remindertime - now;

    if(delay <= 0){
      return interaction.reply("Vælg et andet tidspunkt. dette er allerede allokeret til noget andet ")
    }

    await interaction.reply(
      `Modtaget, Du bliver mindet om **${text}** kl **${time}**`
    )
    setTimeout(() => {
      interaction.channel.send(
        `Hey <@${interaction.user.id}> husk: **${text}**`
      )
    }, delay);
  }
});

client.once("clientReady", () => {
  console.log("Bot is online!");
  // user.tag bliver bestemt via 'discord developer', her bestemmes profilbillede og banner ogs'
  console.log(`Logged in as ${client.user.tag}`);
  console.log("For at forstae de forskellige funktioner, tjek index, og interaction koden")
});

client.login(process.env.DISCORD_TOKEN);
