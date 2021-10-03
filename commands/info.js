const bibleBooks = require("../bible_books.json").map(x => x.toLowerCase())
const bibleChapters = require("../bible_chapters.json").map(x => x.toLowerCase())
const { MessageEmbed } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const { getVoiceConnection } = require("@discordjs/voice")


module.exports = {
  data: new SlashCommandBuilder()
          .setName("info")
          .setDescription("Get info on the current reading"),
  
  async execute(interaction) {
    const connection = getVoiceConnection(interaction.guildId)

    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Reading Information")
    
    if (!connection) {
      embed.setDescription("There is no reading going on.")
    } else if (!connection.state.subscription || connection.state.subscription.player.state.status === "idle") {
      embed.setDescription(`Connected to <#${connection.joinConfig.channelId}>, but no reading is going on.`)
    } else {
      embed.setDescription(`Connected to <#${connection.joinConfig.channelId}>, reading \`${connection.state.subscription.player.state.resource.metadata.title}\` (${connection.state.subscription.player.state.status}).`)
    }

    await interaction.reply({ embeds: [embed], ephemeral: true })
  },
}
