const { SlashCommandBuilder } = require("@discordjs/builders")
const { joinVoiceChannel, VoiceConnectionStatus } = require("@discordjs/voice")


module.exports = {
  data: new SlashCommandBuilder()
          .setName("join")
          .setDescription("Join a voice channel")
          .addChannelOption(option =>
            option.setName("channel")
              .setDescription("The voice channel to join")
              .setRequired(true)),
  
  async execute(interaction) {
    const voiceChannel = interaction.options.getChannel("channel")

    if (voiceChannel.type !== "GUILD_VOICE" && voiceChannel.type !== "GUILD_STAGE_VOICE") {
      await interaction.reply({ content: "Please select a voice channel instead", ephemeral: true })
      return
    }

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    })

    // handle for weird disconnections
    // from: https://discordjs.guide/voice/voice-connections.html#handling-disconnects
    connection.on(VoiceConnectionStatus.Disconnected, async (oldState, newState) => {
      try {
        await Promise.race([
          entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
          entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
        ])
        // Seems to be reconnecting to a new channel - ignore disconnect
      } catch (error) {
        // Seems to be a real disconnect which shouldn't be recovered from
        try {
          connection.destroy()
        } catch (error) {
          // in case it has already been destroyed
        }
      }
    })

    await interaction.reply({ content: "Joined voice channel `" + voiceChannel.name + "`", ephemeral: true })
  },
}
