require("dotenv").config()
const config = {
  botToken: process.env.BOT_TOKEN
}

const fs = require("fs")
const { Client, Collection, Intents } = require("discord.js")


const client = new Client({
  shards: "auto",
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
})

client.commands = new Collection()
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.data.name, command)
}

client.once("ready", () => {
  // setup stuff
  client.user.setActivity("the Bible", { type: "WATCHING" })
  client.user

  console.log("Ready!")
})

client.on("interactionCreate", async interaction => {
  if (!interaction.isCommand()) return

  const command = client.commands.get(interaction.commandName)

  if (!command) return

  try {
    await command.execute(interaction)
  } catch (error) {
    console.error(error)
    await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true })
  }
})

// auto speaker in stage channels
client.on("voiceStateUpdate", async (oldState, newState) => {
  if (newState.channelId && newState.channel.type === "GUILD_STAGE_VOICE" && newState.guild.me.voice.suppress) {
    try {
      await newState.guild.me.voice.setSuppressed(false)
    } catch (error) {
      console.error(error)
    }
  }
})

//client.on("debug", console.log)

require("./replit_server.js") // for keeping the bot alive on replit only
require("./logger.js")(client, "logs/events.log", "logs/debug.log") // for logging stuff

client.login(config.botToken)
