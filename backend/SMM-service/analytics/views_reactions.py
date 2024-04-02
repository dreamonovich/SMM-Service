from pyrogram import Client



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
        app = Client("my_account")
        for channel_name, posts in workspace_data.items():
            for post in posts:
                current_channel_name = post["channel_name"]
                message_id = post["message_id"]

                # Получаем данные о просмотрах и смайликах для текущего поста
                views, emojis = count_emojis(app, current_channel_name, message_id)

                # Добавляем данные о просмотрах и смайликах к текущему посту
                post["views"] = views
                post["emojis_count"] = emojis

        return workspace_data
    except Exception as e:
        print("Error:", e)
        return None
