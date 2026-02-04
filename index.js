bot.on("inline_query", async (query) => {
  const results = [
    {
      type: "article",
      id: "redpacket-1",
      title: "🧧 新年红包",
      description: "点击打开烟花 & 撒钱特效",
      input_message_content: {
        message_text: "🧧 新年红包来啦！\n👇 点击下方打开"
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
