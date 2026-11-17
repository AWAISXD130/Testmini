// mongodb.js
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://MonsterBunny:mongopass@monsterbunny.2jzumfq.mongodb.net/';
const client = new MongoClient(uri, { maxPoolSize: 10 });

const defaults = {
  AUTO_REACT: "off",
  PRESENCE_TYPE: "on",
  AUTO_RECORDING: 'true',
  PRESENCE_FAKE: "both",
  ANTI_CALL: "on",
  ANTI_DELETE: "on",
  AUTO_VIEW_STATUS: "true",
  AUTO_LIKE_STATUS: "on",
  AUTO_LIKE_IMOJI: "❤️",
  NEWSLETTER_JID: '120363433346706611@newsletter',
  GROUP_INVITE_LINK: 'https://chat.whatsapp.com/EFdDVbys4GN0IhLWVGfiFd?s=cl&p=a&iam=2',
  CHANNEL_LINK: 'https://whatsapp.com/channel/0029VbE5cSjJpe8cItVyoY1L/100',
};

// Ensure user doc exists
async function initUserEnvIfMissing(number) {
  try {
    await client.connect();
    const db = client.db('ANGLEDB');
    const collection = db.collection('SETTINGS');

    const doc = await collection.findOne({ number });
    if (!doc) {
      await collection.updateOne(
        { number },
        { $set: { number, ...defaults } },
        { upsert: true }
      );
      console.log(`✅ Created defaults for ${number}`);
      return { number, ...defaults };
    }
    return doc;
  } catch (err) {
    console.error("❌ initUserEnvIfMissing error:", err.message);
    return { number, ...defaults };
  } finally {
    await client.close();
  }
}

// Get config from DB
async function getconfig(number) {
  try {
    await client.connect();
    const db = client.db('ANGLEDB');
    const collection = db.collection('SETTINGS');
    const doc = await collection.findOne({ number });
    return doc || { number, ...defaults };
  } catch (err) {
    console.error("❌ getconfig error:", err.message);
    return { number, ...defaults };
  } finally {
    await client.close();
  }
}

module.exports = { initUserEnvIfMissing, getconfig };
