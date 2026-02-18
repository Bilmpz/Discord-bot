require("dotenv").config();
const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter((f) => f.endsWith(".js"));

for (const file of commandFiles) {
  const cmd = require(path.join(commandsPath, file));
  commands.push({
    name: cmd.name,
    description: cmd.description,
  });
}

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);


(async () => {
  try {
    console.log("Registering commands...");
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
    console.log("commands registered!");
  } catch (error) {
    console.error(error);
  }
})();
