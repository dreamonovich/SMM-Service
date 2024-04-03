import bs4
import requests
from bs4 import BeautifulSoup
request_header = {
    'User-Agent': '1'
}
def count_views(channel, id):
    # try:
        response = requests.get(f'https://t.me/{channel}/{id}?embed=1', headers=request_header)
        bs = bs4.BeautifulSoup(response.text, 'html.parser')
        print(bs)
        views_element = bs.find(class_='tgme_widget_message_views')

        if views_element:
            views = views_element.text
            if 'K' in views:
                views = float(views[:-1]) * 1000 // 1
            elif 'M' in views:
                views = float(views[:-1]) * 1000 * 1000 // 1
            else:
                views = int(views)
            return views
        else:
            return 0
    # except Exception as e:
    #     print("Error counting views:", e)
    #     return 0

def update_workspace_data(workspace_data):
    # try:
        for channel_name, posts in workspace_data.items():
            for post in posts:
                message_id = post["message_id"]
                message_name = post["channel_name"]
                views = count_views(message_name, int(message_id))

                # Добавляем данные о просмотрах к текущему посту
                post["views"] = views

        return workspace_data
    # except Exception as e:
    #     print("Error:", e)
    #     return None


def update_workspace_data_list(workspace_data):
    updated_workspace_data = []
    for channel_name, posts in workspace_data.items():
        channel_data = {channel_name: posts}
        updated_workspace_data.append(channel_data)
    return updated_workspace_data