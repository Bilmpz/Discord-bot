module.exports = {
  name: "husk",
  description: "Sæt en reminder i dag",

  async execute(interaction) {
    // accepter både 11:50 og 11.50
    let tid = interaction.options.getString("tid");
    const besked = interaction.options.getString("besked");

    tid = tid.replace(".", ":");

    const [hourStr, minuteStr] = tid.split(":");
    const hour = Number(hourStr);
    const minute = Number(minuteStr);

    if (
      Number.isNaN(hour) || Number.isNaN(minute) ||
      hour < 0 || hour > 23 || minute < 0 || minute > 59
    ) {
      return interaction.reply("Brug formatet **HH:MM** (fx 11:50).");
    }

    const now = new Date();
    const reminderTime = new Date(now);
    reminderTime.setHours(hour, minute, 0, 0);

    const delay = reminderTime.getTime() - now.getTime();

    if (delay <= 0) {
      return interaction.reply("Det tidspunkt er allerede allokeret i dag.");
    }

    await interaction.reply(`Jeg minder dig om **${besked}** kl **${tid}**`);

    setTimeout(() => {
      interaction.channel.send(`Hey <@${interaction.user.id}> husk: **${besked}**`);
    }, delay);
  },
};
