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

// http port number
if (!process.env.PORT) {
  console.log('Error: missing PORT environment variable.');
  process.exit(1);
}

// configure storage
var mongo_storage = require('botkit/lib/storage/mongo_storage')({
  mongo_uri: process.env.MONGO_URL
});

// create bot
var Botkit = require('botkit');
var controller = Botkit.slackbot({
 debug: true,
 log: true,
 storage: mongo_storage
});

// connect bot to chat
controller.spawn({
  token: process.env.SLACK_TOKEN
}).startRTM(function(err) {
  if (err) {
    throw new Error(err);
  }
});

// simple listener (reply to IM containing hello or hi.)
controller.hears(['hello','hi'],'direct_message',function(bot,message) {
  bot.reply(message,"Hello.");
});

// HACK: use Heroku web dyno (avoid "Web process failed to bind to $PORT")
controller.setupWebserver(process.env.PORT,function(err,webserver) {
  // TODO: something userful here later?
});
