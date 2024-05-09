import os

import requests


def generate_text(role, text):
    role = "Ты помощник СММ специалиста. " + role

    url = "https://llm.api.cloud.yandex.net/foundationModels/v1/completion"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Api-Key {os.getenv('YAGPT_TOKEN')}"
    }
    prompt = {
        "modelUri": "gpt://b1gbq3bio0sr32ptb3v4/yandexgpt-lite",
        "completionOptions": {
            "stream": False,
            "temperature": 0.6,
            "maxTokens": "2000"
        },
        "messages": [
            {
                "role": "system",
                "text": role
            },
            {
                "role": "user",
                "text": text
            },
        ]
    }

    response = requests.post(url, headers=headers, json=prompt)
    return response
