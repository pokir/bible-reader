const { SlashCommandBuilder } = require("@discordjs/builders")
const { getVoiceConnection } = require("@discordjs/voice")


module.exports = {
  data: new SlashCommandBuilder()
          .setName("leave")
          .setDescription("Leave the voice channel"),
  
  async execute(interaction) {
    const connection = getVoiceConnection(interaction.guildId)

    if (!connection) {
      await interaction.reply({ content: "There is no voice channel to leave", ephemeral: true })
      return
    }

    connection.destroy()

    await interaction.reply({ content: "Left the voice channel", ephemeral: true })
  },
}
