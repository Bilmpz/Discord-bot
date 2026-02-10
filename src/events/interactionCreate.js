module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    console.log("interactionCreate fired");

    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    console.log("command:", interaction.commandName, "found?", !!command);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (err) {
      console.error(err);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: "Der skete en fejl 😅", ephemeral: true });
      } else {
        await interaction.reply({ content: "Der skete en fejl 😅", ephemeral: true });
      }
    }
  },
};
