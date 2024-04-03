from django.utils import timezone

from celery import shared_task

from telegram.models import TelegramPost
from post.models import PostPhoto, PostFile

from post.utils import send_message


def is_all_telegram_posts_sended_to_channels(post):
    telegram_posts = TelegramPost.objects.filter(post=post)
    for telegram_post in telegram_posts:
        if telegram_post.status != "s":
            return False
    return True


@shared_task
def send_telegram_post(telegram_post_id: int):
    if not (telegram_post := TelegramPost.objects.filter(id=telegram_post_id).first()):
        raise Exception(f"Failed to find telegram post, id: {telegram_post_id}")
    try:
        telegram_post.status = "r"
        telegram_post.save(update_fields=("status",))

        photos = PostPhoto.objects.filter(post=telegram_post.post)
        files = PostFile.objects.filter(post=telegram_post.post)

        message_id = send_message(telegram_post.telegram_channel.chat_id, telegram_post.post.text, photos, files, is_send_confirmation=False)

        telegram_post.status = "s"
        telegram_post.message_id = message_id
        telegram_post.posted_at = timezone.now()
        telegram_post.save(update_fields=("status", "message_id", "posted_at"))

        if is_all_telegram_posts_sended_to_channels(telegram_post.post):
            telegram_post.post.status = "ALL_SENT"
            telegram_post.post.save(update_fields=("status",))
    except Exception as e:
        telegram_post.status = "f"
        telegram_post.save(update_fields=("status",))
        raise Exception(
            f"Failed send telegram post, id: {telegram_post_id}, error: {e}"
        )



# usage

# send_telegram_post.apply_async((telegram_post_id,), eta=datetime.datetime(2019, 8, 30, 11, 35)) - для отложенной отправки
# send_telegram_post(telegram_post_id) - для мгновенной синхронной отправки

