const { SlashCommandBuilder } = require("@discordjs/builders")
const { getVoiceConnection } = require("@discordjs/voice")


module.exports = {
  data: new SlashCommandBuilder()
          .setName("pause")
          .setDescription("Pause the reading"),

  
  async execute(interaction) {
    const connection = getVoiceConnection(interaction.guildId)

    if (!connection || !connection.state.subscription || connection.state.subscription.player.state.status === "idle") {
      await interaction.reply({ content: "There is no reading going on", ephemeral: true })
      return
    }

    if (connection.state.subscription.player.state.status === "paused") {
      await interaction.reply({ content: "The reading is already paused; use /unpause to resume", ephemeral: true })
      return
    }

    connection.state.subscription.player.pause()
    
    await interaction.reply({ content: "Paused the reading", ephemeral: true })
  },
}
