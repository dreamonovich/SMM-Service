import logging
from telebot import TeleBot
from telebot.types import InputMediaPhoto, InputFile

TOKEN = "6755435757:AAEdJcrtEuEmYz2feDl0I0bG5fbf5MpFGoA"

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
bot = TeleBot(TOKEN)

def send_post(channel_id, text, photos=[], files=[]):
    photo_group = [InputMediaPhoto("это фото юрл", caption=text) for photo in photos]
    logging.info(f"{[photo.photo for photo in photos]}")
    if photos:
        bot.send_media_group(channel_id, "why this govno is not working")
    else:
        bot.send_message(channel_id, text, parse_mode="Markdown")
    for file in files:
        bot.send_document(channel_id, InputFile(file.file))


def delete_message(chat_id, message_id):
    bot.delete_message(chat_id, message_id)
