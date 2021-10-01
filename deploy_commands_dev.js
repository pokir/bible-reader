// deploy commands for DEVELOPMENT (only to the dev server)
require("dotenv").config()
const config = {
  botToken: process.env.BOT_TOKEN,
  clientId: process.env.CLIENT_ID,
  guildId: process.env.DEVELOPMENT_GUILD_ID,
}

const fs = require("fs")
const { SlashCommandBuilder } = require("@discordjs/builders")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")


const commands = []
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  commands.push(command.data.toJSON())
}

const rest = new REST({ version: "9" }).setToken(config.botToken)

rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error)
