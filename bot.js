// slack api token
if (!process.env.SLACK_TOKEN) {
  console.log('Error: missing SLACK_TOKEN environment variable.');
  process.exit(1);
}

// mongo connection string
if (!process.env.MONGO_URL) {
  console.log('Error: missing MONGO_URL environment variable.');
  process.exit(1);
}

var Botkit = require('botkit');

var mongo_storage = require('botkit/lib/storage/mongo_storage')({
  mongo_uri: process.env.MONGO_URL
});

var controller = Botkit.slackbot({
 debug: true,
 log: true,
 storage: mongo_storage
});

controller.spawn({
  token: process.env.SLACK_TOKEN
}).startRTM(function(err) {
  if (err) {
    throw new Error(err);
  }
});

controller.hears(['hello','hi'],'direct_message',function(bot,message) {
  bot.reply(message,"Hello.");
})
