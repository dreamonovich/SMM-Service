from telebot import TeleBot
from telebot.types import InputMediaPhoto, InputFile

TOKEN = "6755435757:AAEdJcrtEuEmYz2feDl0I0bG5fbf5MpFGoA"

bot = TeleBot(TOKEN)


def send_post(channel_id, text, photos=None, files=None):
    photo_group = [InputMediaPhoto(photo, caption=text) for photo in photos]
    if photos:
        message = bot.send_media_group(channel_id, photo_group)
    else:
        message = bot.send_message(channel_id, text, parse_mode="Markdown")
    for file in files:
        bot.send_document(channel_id, InputFile(file))

    return message.message_id


def delete_message(chat_id, message_id):
    bot.delete_message(chat_id, message_id)
