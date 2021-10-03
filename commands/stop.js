const { SlashCommandBuilder } = require("@discordjs/builders")
const { getVoiceConnection } = require("@discordjs/voice")


module.exports = {
  data: new SlashCommandBuilder()
          .setName("stop")
          .setDescription("Stop reading the Bible"),
  
  async execute(interaction) {
    const connection = getVoiceConnection(interaction.guildId)

    if (!connection || !connection.state.subscription) {
      await interaction.reply({ content: "There is no reading going on", ephemeral: true })
      return
    }

    connection.state.subscription.player.stop()
    connection.state.subscription.unsubscribe()
    
    await interaction.reply({ content: "Stopped reading", ephemeral: true })
  },
}
