## BibleReader

#### Setup
##### Put BOT_TOKEN, DEVELOPMENT_GUILD_ID, and GUILD_ID in .env file
##### Run `npm install` to install required node modules
##### Run `node deploy_commands_dev.js` to deploy the slash commands to your development server, or `node deploy_commands_global.js` to deploy to all servers
###### Note that you must only do this when you update/edit any slash commands
##### Run `node index.js` to run the bot

#### Usage
##### This bot uses slash commands (ex. /ping); type / in the chat and all the commands will show up
##### When choosing to connect the bot to a stage channel, it must be invited to speak before reading

#### Hosting on [Replit](https://replit.com)
##### To host this bot on [Replit](https://replit.com), create a new "repl", select NodeJS as the language, and upload all the files
##### Run `node -v` in the [Replit](https://replit.com) shell. If the version is under v16, run this command: `npm init -y && npm i --save-dev node@16 && npm config set prefix=$(pwd)/node_modules/node && export PATH=$(pwd)/node_modules/node/bin:$PATH`
###### Make sure to do this everytime you reopen replit because it can reset the node version
##### Then, run `npm install` to install all the node packages required
##### The steps above are already in the .replit file, so you can skip them if you want
##### Then click on run to run the bot
##### The `replit_server.js` file creates a dummy webpage so that [UpTimeRobot](https://uptimerobot.com) can ping it and keep the app alive
##### Go to [UpTimeRobot](https://uptimerobot.com/), and make a new account (you can use a temporary email from [generator.email](https://generator.email) if you don't want to use your real one)
##### Add a new monitor
##### Choose HTTP(s) as the monitor type
##### 
