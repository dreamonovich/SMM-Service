import hashlib
import hmac

bot_token = "6755435757:AAEdJcrtEuEmYz2feDl0I0bG5fbf5MpFGoA"


def check_telegram_authorization(auth_data):
    d = auth_data.copy()
    del d['hash']
    if "name" in d:
        del d["name"]
    d_list = []
    for key in sorted(d.keys()):
        d_list.append(key + '=' + str(d[key]))
    data_string = bytes('\n'.join(d_list), 'utf-8')

    secret_key = hashlib.sha256(bot_token.encode('utf-8')).digest()
    hmac_string = hmac.new(secret_key, data_string, hashlib.sha256).hexdigest()
    if hmac_string == auth_data['hash']:
        return True
    return False
