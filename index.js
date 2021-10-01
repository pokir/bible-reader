require("dotenv").config()
const config = {
  botToken: process.env.BOT_TOKEN
}

const fs = require("fs")
const { Client, Collection, Intents } = require("discord.js")


//https://www.youtube.com/watch?v=TeiePQGt-HA
// https://www.audioverse.org/english/audiobibles/books/ENGKJV/O/1Sam/1

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

client.login(config.botToken)
