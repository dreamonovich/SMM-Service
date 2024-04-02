import logging
from random import randint
from telebot import TeleBot
from telebot.types import CallbackQuery, Message, InlineKeyboardMarkup, InlineKeyboardButton
from db_requests import new_channel_request, approve, change_status, get_approves
import requests

telegram_secret_key = "telegram_secret_key"

TOKEN = "6755435757:AAEdJcrtEuEmYz2feDl0I0bG5fbf5MpFGoA"

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

logging.info("started")
bot = TeleBot(TOKEN)


@bot.callback_query_handler(func=lambda call: call.data.startswith("post"))
def callback(call: CallbackQuery):
    post_id = int(call.data.split("?")[1])
    if call.data.startswith("post_decline"):
        change_status(post_id, "REJECTED")
        bot.delete_message(call.message.chat.id, call.message.message_id)
        bot.send_message(call.message.chat.id, "*Пост отклонен*", parse_mode="Markdown")

    elif call.data.startswith("post_approve"):
        logging.info("got there")
        print("gothegit")
        approve(call.from_user.id, post_id)
        try:
            approval, number_of_confirmations = get_approves(post_id)
            if approval == number_of_confirmations:
                change_status(post_id, "APPROVED")
                bot.delete_message(call.message.chat.id, call.message.message_id)
                bot.send_message(call.message.chat.id, "*Пост принят*", parse_mode="Markdown")
                requests.post(f"prodanocontest.ru/api/post/{post_id}/telegram_approve", data={"telegram_secret_key": telegram_secret_key})
                return

            keyboard = InlineKeyboardMarkup()
            keyboard.add(InlineKeyboardButton(f"✅Принять [{approval}/{number_of_confirmations}]", callback_data=call.data),
                         InlineKeyboardButton(f"🚫Отклонить", callback_data=f"post_decline?{post_id}"))
            bot.edit_message_reply_markup(call.message.chat.id, call.message.message_id, reply_markup=keyboard)
        except Exception as e:
            logging.info(e)
            print(e)


@bot.channel_post_handler(commands=["add_bot"])
@bot.message_handler(commands=["add_bot"])
def add_bot_command(message: Message):
    try:
        bot.delete_message(message.chat.id, message.message_id)
    except:
        pass
    code = randint(11111, 99999)
    channel_username = message.chat.username
    message = bot.send_message(message.chat.id, f"*Ваш код:* {code}", parse_mode="Markdown")
    new_channel_request(message.chat.id, message.message_id, code, message.chat.type == "group", channel_username)


logging.info("entering infinity poll")
bot.infinity_polling()
