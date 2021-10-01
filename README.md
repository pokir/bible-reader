## BibleReader

#### Setup
##### Put BOT_TOKEN, DEVELOPMENT_GUILD_ID, and CLIENT_ID in `.env` file
##### Run `npm install` to install required node modules
##### Run `node deploy_commands_dev.js` to deploy the slash commands to your development server, or `node deploy_commands_global.js` to deploy to all servers
###### Note that you must only do this when you update/edit any slash commands
##### Run `node index.js` to run the bot

#### Usage
##### This bot uses slash commands (ex. /ping); type / in the chat and all the commands will show up
##### When choosing to connect the bot to a stage channel, it must be invited to speak before reading

#### Hosting on [Replit](https://replit.com)
##### To host this bot on [Replit](https://replit.com), make a new account, create a new "repl", select NodeJS as the language, and upload all the files
##### On replit, there is no need of a `.env` file; instead, use their secret token/values feature and add BOT_TOKEN, DEVELOPMENT_GUILD_ID, and CLIENT_ID
##### Run `node -v` in the replit shell. If the version is under v16, run this command: `npm init -y && npm i --save-dev node@16 && npm config set prefix=$(pwd)/node_modules/node && export PATH=$(pwd)/node_modules/node/bin:$PATH`
###### Make sure to do this everytime you reopen replit because it can reset the node version
##### Then, run `npm install` to install all the node packages required
##### The steps above are already in the .replit file, so you can skip them if you want
##### Then click on run to run the bot
##### The `replit_server.js` file creates a dummy webpage so that [UpTimeRobot](https://uptimerobot.com) can ping it and keep the app alive
##### Go to [UpTimeRobot](https://uptimerobot.com/), and make a new account
##### Add a new monitor
##### Choose HTTP(s) as the monitor type
##### Set name as `bible-reader` or anything you want
##### Enter the URL of the dummy replit webpage (it will show up at the top right when clicking run)
##### Set the monitor interval as 30 minutes (it must be exactly 30 minutes)
##### Then create monitor (no need for alert contact)
##### You can then close replit and it will stay alive
