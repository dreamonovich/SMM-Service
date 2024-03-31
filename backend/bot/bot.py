from random import randint
from telebot import TeleBot
from telebot.types import CallbackQuery, Message
from db_requests import new_channel_request

TOKEN = "6755435757:AAEdJcrtEuEmYz2feDl0I0bG5fbf5MpFGoA"

bot = TeleBot(TOKEN)


@bot.callback_query_handler(func=lambda call: call.data.startswith("post"))
def callback(call: CallbackQuery):
    post_id = int(call.data.split("?")[1])
    if call.data.startswith("post_decline"):
        # Какая-та логика с постами
        bot.edit_message_text("*Пост отклонен*", parse_mode="Markdown")
    elif call.data == "post_approve":
        # Какая-та логика с постами
        bot.edit_message_text("*Пост принят*", parse_mode="Markdown")


@bot.channel_post_handler(commands=["add_bot"])
@bot.message_handler(commands=["add_bot"])
def add_bot_command(message: Message):
    try:
        bot.delete_message(message.chat.id, message.message_id)
    except:
        pass
    code = randint(11111, 99999)
    message = bot.send_message(message.chat.id, f"*Ваш код:* {code}", parse_mode="Markdown")
    new_channel_request(message.chat.id, code, message.chat.type == "group")


bot.infinity_polling()
