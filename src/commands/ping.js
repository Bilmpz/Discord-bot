module.exports = {
  name: "ping",
  description: "Test command",
  async execute(interaction) {
    await interaction.reply("p2ong 🏓");
  },
};
// node src/index.js
