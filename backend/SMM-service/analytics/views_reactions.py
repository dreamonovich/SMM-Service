import time
import requests
import bs4
import random

version = '1.2.2'
source = 'https://github.com/ktnk-dev/teleview'
random_UA = True
request_header = {
    'User-Agent': '1'
}

if random_UA:
    request_header['User-Agent'] = random.choice(
        ['Windows', 'MacOS', 'Linux', 'iPhone', 'Android']) + '; ' + random.choice(
        ['Chrome 100', 'Firefox 93', 'Safari 14', 'Opera 30', 'Edge'])

def count_emojis(app, channel_name, message_id):
    with app:
        message = app.get_messages(channel_name, message_id)
        views = message.views if hasattr(message, "views") else 0

        total_emojis = 0
        if hasattr(message, "reactions") and message.reactions is not None:
            for reaction in message.reactions.reactions:
                total_emojis += reaction.count

        return views, total_emojis

def update_workspace_data(workspace_data):
    try:
        for channel_name, posts in workspace_data.items():
            for post in posts:
                current_channel_name = post["channel_name"]
                message_id = post["message_id"]

                # Получаем данные о просмотрах и смайликах для текущего поста
                views, emojis = count_emojis(None, current_channel_name, message_id)  # None передаем в качестве app

                # Добавляем данные о просмотрах и смайликах к текущему посту
                post["views"] = views
                post["emojis_count"] = emojis

        return workspace_data
    except Exception as e:
        print("Error:", e)
        return None

def BStoChannel(bs, name) -> dict:
    info = bs.find(class_='tgme_channel_info')
    try:
        description = info.find(class_='tgme_channel_info_description').text  # описание
    except:
        description = None

    subs_str = info.find(class_='tgme_channel_info_counter').find(
        class_='counter_value').text  # получение кол-ва подписчиков / исправление бага с некоректным подсчетом количества подписчиков
    if 'K' in subs_str:
        subscribers = int(float(subs_str[:-1]) * 1000)  # конвертация из str в int
    elif 'M' in subs_str:
        subscribers = int(float(subs_str[:-1]) * 1000 * 1000)
    else:
        subscribers = int(subs_str)

    try:
        picture = info.find(class_='tgme_page_photo_image').find('img').get('src')  # фото канала
    except:
        picture = None

    return {
        'url': f'https://t.me/{name}',
        'title': info.find(class_='tgme_channel_info_header_title').text,
        'description': description,
        'subscribers': subscribers,
        'picture': picture,
        'bs': bs
    }

def BStoPost(bs, channel) -> dict:
    try:
        text = bs4.BeautifulSoup(str(bs.find(class_='tgme_widget_message_text')).replace('<br/>', '\n'),
                                 'html.parser').text  # получаем текст сообщения, форматируя <br/> в \n
    except AttributeError:
        text = None
    id = bs.get('data-post').split('/')[-1]
    try:
        views = bs.find(class_='tgme_widget_message_views').text
        if 'K' in views:
            views = float(views[:-1]) * 1000 // 1
        elif 'M' in views:
            views = float(views[:-1]) * 1000 * 1000 // 1
        else:
            views = int(views)
    except:
        views = 0

    media = []
    photos = bs.findAll(class_='tgme_widget_message_photo_wrap')
    videos = bs.findAll(class_='tgme_widget_message_video')
    if photos or videos:
        for photo in photos:
            media.append({'url': photo.get('style').split("background-image:url('")[1].split("')")[0], 'type': 'photo/jpg'})
        for video in videos:
            media.append({'url': video.get('src'), 'type': 'video/mp4'})
    roundvideo = bs.findAll(class_='tgme_widget_message_roundvideo')
    if roundvideo:
        media.append({'url': roundvideo[0].get('src'), 'type': 'round_video/mp4'})
    voicemsg = bs.findAll(class_='tgme_widget_message_voice')
    if voicemsg:
        media.append({'url': voicemsg[0].get('src'), 'type': 'voice/ogg'})

    try:
        datetime = bs.find(class_='datetime').get('datetime')
    except:
        datetime = bs.find(class_='time').get('datetime')

    return {
        'channel': channel,
        'url': f'{channel["url"]}/{id}',
        'id': int(id),
        'text': text,
        'media': media,
        'views': views,
        'datetime': datetime,
        'bs': bs
    }

def getChannel(url: str) -> dict or None:
    """--- Функция для получения информации о канале ---

    Принимает:
        * url: Ссылка или ЮЗ канала

    Результат:
        * dict: при успешном получении информации о канале
        * None: если канала не существует или он приватный
    """
    name = url.replace('@', '')
    if '/' in url:
        name = name.split('/')[3]

    response = requests.get(f'https://t.me/s/{name}', headers=request_header)
    bs = bs4.BeautifulSoup(response.text, 'html.parser')
    info = bs.find(class_='tgme_channel_info')  # <div> с информацией о канале

    if not info:
        return None
    else:
        return BStoChannel(bs, name)

def getPost(channel: dict or str, id: int) -> dict or None:
    """--- Функция для поиска поста в канале ---

    Принимает:
        * channel: объект Channel ИЛИ ссылка/ЮЗ канала
        * id: айди поста

    Результат:
        * dict: если пост найден
        * None: если пост НЕ найден
    """
    if type(channel) == str:
        channel = getChannel(channel)
    if not channel:
        return None

    response = requests.get(f'https://t.me/{channel["url"].split("/")[-1]}/{id}?embed=1', headers=request_header)
    bs = bs4.BeautifulSoup(response.text, 'html.parser')
    if bs.find(class_='tgme_widget_message_error'):
        return None
    else:
        return BStoPost(bs.find(class_='tgme_widget_message'), channel)


