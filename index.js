import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBAPP_URL = process.env.WEBAPP_URL;

if (!BOT_TOKEN || !WEBAPP_URL) {
  throw new Error("❌ Missing BOT_TOKEN or WEBAPP_URL");
}

// ✅ 1️⃣ 先创建 bot（非常关键）
const bot = new TelegramBot(BOT_TOKEN, {
  polling: true
});

console.log("🤖 Inline bot running...");

// ✅ 2️⃣ 再监听 inline_query
bot.on("inline_query", async (query) => {
  const results = [
    {
      type: "article",
      id: "gongxi-redpacket",
      title: "🧧 新年红包",
      description: "点击打开烟花 + 撒钱特效",
      input_message_content: {
        message_text: "🧧🧨 新年红包来啦！\n👇 点击下方打开"
      },
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🎉 打开红包",
              url: WEBAPP_URL
            }
          ]
        ]
      }
    }
  ];

  try {
    await bot.answerInlineQuery(query.id, results, {
      cache_time: 0,
      is_personal: true
    });
  } catch (e) {
    console.error("❌ answerInlineQuery failed");
    console.error(e?.response?.body || e);
  }
});
