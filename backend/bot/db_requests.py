import psycopg2
from datetime import datetime

dsl = {
    'dbname': 'smm_service_db',
    'user': 'postgres',
    'password': 'postgres',
    'host': 'localhost',
    'port': '5432',
    }

connection = psycopg2.connect(**dsl)


def new_channel_request(chat_id: int, code: int, is_group):
    with connection.cursor() as cursor:
        cursor.execute("INSERT INTO public.channel_channelrequest (chat_id, is_group, code, created_at)"
                       "VALUES (%s, %s, %s, %s)", (chat_id, is_group, code, datetime.now()))
    connection.commit()


def is_bot_added(chat_id):
    with connection.cursor() as cursor:
        cursor.execute("SELECT name FROM public.channel_channel WHERE chat_id = %s", (chat_id,))
        name = cursor.fetchone()
        return name is None

#new_channel_request(19381881, 12121)
