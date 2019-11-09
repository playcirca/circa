import twilio
from twilio.rest import Client
import string
import random
from flask import Flask, request
app = Flask("auth_server")
number_auth = {}

def id_generator(size=6, chars=string.digits): ##creates 6 digit auth number
    return ''.join(random.choice(chars) for x in range(size))

def number_auth_generator(phone_number): ##creates number auth dictionary
    if phone_number not in number_auth:
        number_auth[phone_number] = id_generator()
    else:
        return

# Your Account Sid and Auth Token from twilio.com/console
# DANGER! This is insecure. See http://twil.io/secure
account_sid = 'ACe1e0694ec169b74011b6cd499f24b3ef'
auth_token = 'd680a9e5d5dbfb1954a9f16e144c7bdc'

client = Client(account_sid, auth_token)

def auth_message(phone_number):
    message = client.messages \
        .create(
        body=number_auth[phone_number],
        from_='circa',
        to=phone_number
    )
    return message.sid

def auth_checker(phone,auth):
    if int(number_auth[phone]) == int(auth):
        return {'success': True }
    else:
        return {'success': False }

@app.route("/auth")
def get_number():
    phone_number = request.args.get("phone", None)
    number_auth_generator(phone_number)
    return auth_message(phone_number)

@app.route("/validate")
def validate_number():
    valid_no = request.args.get("valid_phone", None)
    valid_auth = request.args.get("valid_auth", None)
    return auth_checker(valid_no, valid_auth)

if __name__ == "__main__":
    app.run()
