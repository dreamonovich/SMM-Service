import os
from telebot import TeleBot
from telebot.types import InputMediaPhoto, InputFile, InlineKeyboardMarkup, InlineKeyboardButton
from telegramify_markdown import convert

TOKEN = "6755435757:AAEdJcrtEuEmYz2feDl0I0bG5fbf5MpFGoA"

bot = TeleBot(TOKEN)


def send_message(chat_id, text, photos=None, files=None, post_id=None, is_send_confirmation=True):
    text = convert(text)
    if photos is None:
        photos = []
    if files is None:
        files = []
    if photos:
        photo_group = [InputMediaPhoto(photo.photo.file.read(), caption=text) for photo in photos]
        message = bot.send_media_group(chat_id, photo_group)
    else:
        message = bot.send_message(chat_id, text, parse_mode="MarkdownV2")
    for file in files:
        file_path = os.path.join('/tmp', file.file.file.name.split("/")[-1].split("jopalexi")[-1])
        with open(file_path, 'wb') as tmp_file:
            tmp_file.write(file.file.file.read())
            bot.send_document(chat_id, InputFile(file_path))
        os.remove(file_path)
    if is_send_confirmation:
        bot.send_message(chat_id, "*Вы принимаете этот пост?*", parse_mode="Markdown", reply_markup=get_keyboard(post_id))

    return message.message_id

def get_keyboard(post_id):
    keyboard = InlineKeyboardMarkup()
    keyboard.add(InlineKeyboardButton("✅Принять", callback_data=f"post_approve?{post_id}"),
                 InlineKeyboardButton("🚫Отклонить", callback_data=f"post_decline?{post_id}"))
    return keyboard


def delete_message(chat_id, message_id):
    bot.delete_message(chat_id, message_id)
