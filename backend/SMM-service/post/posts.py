from telebot import TeleBot
from telebot.types import InputMediaPhoto, InputFile, InlineKeyboardMarkup, InlineKeyboardButton

TOKEN = "6755435757:AAEdJcrtEuEmYz2feDl0I0bG5fbf5MpFGoA"

bot = TeleBot(TOKEN)


def send_message(chat_id, text, photos, files, post_id):
    if photos:
        photo_group = [InputMediaPhoto(photo, caption=text) for photo in photos]
        bot.send_media_group(chat_id, photo_group)
    else:
        bot.send_message(chat_id, text, parse_mode="Markdown")
    for file in files:
        bot.send_document(chat_id, InputFile(file))

    bot.send_message(chat_id, "*Вы принимаете этот пост?*", parse_mode="Markdown", reply_markup=get_keyboard(post_id))


def get_keyboard(post_id):
    keyboard = InlineKeyboardMarkup()
    keyboard.add(InlineKeyboardButton("✅Принять", callback_data=f"post_approve?{post_id}"),
                 InlineKeyboardButton("🚫Отклонить", callback_data=f"post_decline?{post_id}"))
    return keyboard