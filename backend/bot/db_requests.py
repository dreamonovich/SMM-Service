import psycopg2
from datetime import datetime
import os

dsl = {
    'dbname': os.getenv("POSTGRES_DB", "smm_service_db"),
    'user': os.getenv("POSTGRES_USER", "postgres"),
    'password': os.getenv("POSTGRES_PASSWORD", "postgres"),
    'host': os.getenv("POSTGRES_HOST", "127.0.0.1"),
    'port': os.getenv("POSTGRES_PORT", "5438"),
    }

connection = psycopg2.connect(**dsl)


def new_channel_request(chat_id: int, message_id:int, code: int, is_group):
    with connection.cursor() as cursor:
        cursor.execute("INSERT INTO public.channel_channelrequest (chat_id, message_id, is_group, code, created_at)"
                       "VALUES (%s, %s, %s, %s, %s)", (chat_id, message_id, is_group, code, datetime.now()))
    connection.commit()


def is_bot_added(chat_id):
    with connection.cursor() as cursor:
        cursor.execute("SELECT name FROM public.channel_channel WHERE chat_id = %s", (chat_id,))
        name = cursor.fetchone()
        return name is None


def approve(telegram_id, post_id):
    with connection.cursor() as cursor:
        cursor.execute("SELECT id FROM public.telegram_telegramapproval WHERE telegram_id = %s and post_id = %s",
                       (telegram_id, post_id))
        approval_id = cursor.fetchone()
        if approval_id is None:
            cursor.execute("INSERT INTO public.telegram_telegramapproval(telegram_id, post_id) VALUES (%s, %s)",
                           (telegram_id, post_id))
            cursor.execute("DELETE FROM public.telegram_telegramdisapproval WHERE telegram_id = %s and post_id = %s",
                           (telegram_id, post_id))
            connection.commit()


def disapprove(telegram_id, post_id):
    with connection.cursor() as cursor:
        cursor.execute("SELECT id FROM public.telegram_telegramdisapproval WHERE telegram_id = %s and post_id = %s",
                       (telegram_id, post_id))
        approval_id = cursor.fetchone()
        if approval_id is None:
            cursor.execute("INSERT INTO public.telegram_telegramdisapproval(telegram_id, post_id) VALUES (%s, %s)",
                           (telegram_id, post_id))
            cursor.execute("DELETE FROM public.telegram_telegramapproval WHERE telegram_id = %s and post_id = %s",
                           (telegram_id, post_id))
            connection.commit()


def get_approves(post_id):
    with connection.cursor() as cursor:
        cursor.execute("SELECT count(id) FROM public.telegram_telegramapproval == %s", (post_id,))
        approval = cursor.fetchone()[0]
        cursor.execute("SELECT count(id) FROM public.telegram_telegramdisapproval == %s", (post_id,))
        disapproval = cursor.fetchone()[0]
        cursor.execute('SELECT number_of_confirmations FROM public.post_post WHERE id = %s', (post_id,))
        number_of_confirmations = cursor.fetchone()[0]

    return approval, disapproval, number_of_confirmations
