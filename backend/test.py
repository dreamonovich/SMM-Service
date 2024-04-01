import requests

prompt = {
    "modelUri": "gpt://b1gbq3bio0sr32ptb3v4/yandexgpt-lite",
    "completionOptions": {
        "stream": False,
        "temperature": 0.6,
        "maxTokens": "100"
    },
    "messages": [
        {
            "role": "system",
            "text": "Ты ассистент СММ специалиста. Распиши текст"
        },
        {
            "role": "user",
            "text": "Дорогие друзья я сегоня расскажу вам о работае смм менеджера"
        },
    ]
}


url = "https://llm.api.cloud.yandex.net/foundationModels/v1/completion"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Api-Key AQVNwMxCC7FdTPArzCnHr6aQ3MfIXvg2Ln1Hud0P"
}

response = requests.post(url, headers=headers, json=prompt)
result = response.text
print(result)