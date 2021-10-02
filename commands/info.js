const bibleBooks = require("../bible_books.json").map(x => x.toLowerCase())
const bibleChapters = require("../bible_chapters.json").map(x => x.toLowerCase())
const { SlashCommandBuilder } = require("@discordjs/builders")
const { getVoiceConnection } = require("@discordjs/voice")


module.exports = {
  data: new SlashCommandBuilder()
          .setName("info")
          .setDescription("Get info on the current reading"),
  
  async execute(interaction) {
    const connection = getVoiceConnection(interaction.guildId)

    if (!connection) {
      await interaction.reply({ content: "There is no reading going on", ephemeral: true })
      return
    }

    if (!connection.state.subscription || connection.state.subscription.player.state.status === "idle") {
      await interaction.reply({ content: `Connected to <#${connection.joinConfig.channelId}>, but not reading`, ephemeral: true })
      return
    }

    await interaction.reply({ content: `Connected to <#${connection.joinConfig.channelId}>, reading \`${connection.state.subscription.player.state.resource.metadata.title}\` (${connection.state.subscription.player.state.status})`, ephemeral: true })
  },
}
