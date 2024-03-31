from random import randint
from telebot import TeleBot
from telebot.types import CallbackQuery, Message, InlineKeyboardMarkup, InlineKeyboardButton
from db_requests import new_channel_request, approve, disapprove, get_approves

TOKEN = "6755435757:AAEdJcrtEuEmYz2feDl0I0bG5fbf5MpFGoA"

bot = TeleBot(TOKEN)


@bot.callback_query_handler(func=lambda call: call.data.startswith("post"))
def callback(call: CallbackQuery):
    post_id = int(call.data.split("?")[1])
    if call.data.startswith("post_decline"):
        approve(call.message.from_user.id, post_id)
    elif call.data == "post_approve":
        disapprove(call.message.from_user.id, post_id)
    try:
        approval, disapproval, number_of_people = get_approves(post_id)
        keyboard = InlineKeyboardMarkup()
        keyboard.add(InlineKeyboardButton(f"{approval}/{number_of_people}", callback_data=call.data),
                     InlineKeyboardButton(f"{disapproval}/{number_of_people}", callback_data=call.data))
        bot.edit_message_reply_markup(call.message.chat.id, call.message.message_id, reply_markup=keyboard)
    except:
        pass


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
