const bibleBooks = require("../bible_books.json").map(x => x.toLowerCase())
const bibleChapters = require("../bible_chapters.json").map(x => x.toLowerCase())
const { SlashCommandBuilder } = require("@discordjs/builders")
const { getVoiceConnection, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require("@discordjs/voice")


function getAudioURL(chapter) {
  // chapter must be a valid chapter inside bibleChapters
  const urlStart = "https://audiobible.com/content/KingJames/audio/"

  let book = chapter.split(" ")
  const chapterNumber = book.pop() // remove chapter number and store

  let secondPadding = 3
  let number = bibleBooks.indexOf(book.join(" ")) + 1
  if (number > 39) {
    number -= 39
    secondPadding = 2
  }

  const temp = `${String(number).padStart(2, "0")}_${book.join("-").toLowerCase().replace("song-of-solomon", "songofsolomon")}`
  const urlEnd = `${temp}/${temp}_${chapterNumber.padStart(secondPadding, "0")}`

  return urlStart + urlEnd + ".mp3"
}


module.exports = {
  data: new SlashCommandBuilder()
          .setName("read")
          .setDescription("Read the Bible")
          .addStringOption(option =>
            option.setName("chapter")
              .setDescription("The chapter of the Bible to read")
              .setRequired(true))
          .addBooleanOption(option =>
            option.setName("forever")
              .setDescription("Whether to continue playing the next chapters forever")),

  
  async execute(interaction) {
    const connection = getVoiceConnection(interaction.guildId)

    if (!connection) {
      await interaction.reply({ content: "Join a voice channel first using `/join`", ephemeral: true })
      return
    }
    
    let chapter = interaction.options.getString("chapter").toLowerCase().replace(/psalms?/, "psalms")

    // check the chapter
    if (!bibleChapters.includes(chapter)) {
      await interaction.reply({ content: "Please enter a valid chapter", ephemeral: true })
      return
    }

    console.log(getAudioURL(chapter))
    const resource = createAudioResource(getAudioURL(chapter), {
      metadata: {
        title: chapter.replace(/\w+/g, c => c[0].toUpperCase() + c.slice(1))
      }
    })

    const player = createAudioPlayer()

    connection.subscribe(player)

    player.play(resource)

    player.on("error", error => {
      console.error(`Error: ${error.message} with resource ${error.resource.metadata.title}`)
    })

    player.on(AudioPlayerStatus.AutoPaused, () => {
      try {
        player.stop()
      } catch (error) {
        console.error(error)
      }
    })

    player.on(AudioPlayerStatus.Idle, () => {
      // choose the next chapter when done with chapter
      if (interaction.options.getBoolean("forever") === true) {
        let nextChapterIndex = bibleChapters.indexOf(chapter) + 1
        if (nextChapterIndex > bibleChapters.length - 1)
          nextChapterIndex = 0
        chapter = bibleChapters[nextChapterIndex]

        const nextResource = createAudioResource(getAudioURL(chapter), {
          metadata: {
            title: chapter.replace(/\w+/g, c => c[0].toUpperCase() + c.slice(1))
          }
        })

        player.play(nextResource)
      } else {
        player.stop()
      }
    })

    if (interaction.options.getBoolean("forever") === true)
      await interaction.reply({ content: "Started reading 24/7; to stop reading use /stop", ephemeral: true })
    else 
      await interaction.reply({ content: "Started reading", ephemeral: true })
  },
}
