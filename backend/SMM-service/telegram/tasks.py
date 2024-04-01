import time
from io import BytesIO

from celery import shared_task

from telegram.models import TelegramPost

from utils import send_post


@shared_task
def send_telegram_post(telegram_post_id: int):
    if not (telegram_post := TelegramPost.objects.filter(id=telegram_post_id).first()):
        raise Exception(f"Failed to find telegram post, id: {telegram_post_id}")
    try:
        telegram_post.status = "RUNNING"  # running
        telegram_post.save(update_fields=("status",))

        message_id = send_post(telegram_post.telegram_channel.chat_id, text=telegram_post.post.text, photos=telegram_post.post.photos, files=telegram_post.post.files)
        # все должно быть по МСК(к часу -3)

        telegram_post.status = "s"
        telegram_post.message_id = message_id
        telegram_post.save(update_fields=("status",))

    except Exception as e:
        telegram_post.status = "f"
        telegram_post.save(update_fields=("status",))
        raise Exception(
            f"Failed send telegram post, id: {telegram_post_id}, error: {e}"
        )



# usage

# send_telegram_post.apply_async((telegram_post_id,), eta=datetime.datetime(2019, 8, 30, 11, 35)) - для отложенной отправки
# send_telegram_post(telegram_post_id) - для мгновенной синхронной отправки

