import TelegramBot from "node-telegram-bot-api";
import express from "express";

const token = process.env.BOT_TOKEN;
const WEBAPP_URL = process.env.WEBAPP_URL;

const bot = new TelegramBot(token, { polling: true });
const app = express();

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🧧 点开领取新年红包", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🎉 打开红包",
            web_app: { url: WEBAPP_URL }
          }
        ]
      ]
    }
  });
});

app.get("/", (_, res) => {
  res.send("Bot is running");
});

app.listen(process.env.PORT || 3000);

