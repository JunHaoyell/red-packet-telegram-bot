import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBAPP_URL = process.env.WEBAPP_URL;

if (!BOT_TOKEN || !WEBAPP_URL) {
  throw new Error("❌ Missing BOT_TOKEN or WEBAPP_URL");
}

// 🚀 Inline 模式必须用 polling（最稳）
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

console.log("🤖 Inline bot running...");

// ===== Inline Query（@bot 时触发）=====
bot.on("inline_query", async (query) => {
  try {
    await bot.answerInlineQuery(
      query.id,
      [
        {
          type: "article",
          id: "gongxi-redpacket",
          title: "🧧 新年红包",
          description: "点开查看烟花 + 撒钱特效",
          input_message_content: {
            message_text: "🧧🧨 新年红包来啦！\n点击下方打开 👇"
          },
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "🎉 打开红包",
                  web_app: {
                    url: WEBAPP_URL
                  }
                }
              ]
            ]
          }
        }
      ],
      {
        cache_time: 0 // 🚨 很重要：调试阶段一定要 0
      }
    );
  } catch (err) {
    console.error("Inline error:", err);
  }
});
