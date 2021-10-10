#!/usr/bin/env python3
'''
Basic example of a resource server
from https://github.com/zalando/connexion/blob/master/examples/openapi3/jwt/app.py
'''

import time
import os as os
import six
from werkzeug.exceptions import Unauthorized
from dao.dao_user import get_user_by_credentials

from jose import JWTError, jwt

JWT_ISSUER = 'com.armstrongconsulting'
JWT_SECRET = 'change_this'
JWT_LIFETIME_SECONDS = 60000
JWT_ALGORITHM = 'HS256'


def login(body):
    """"
        create a token if the username and password are correct
    """
    if not 'password' in body or not 'username' in body:
        return "Username and password are required", 403
    else:
        user = get_user_by_credentials(body)
        if user != None:
            return generate_token(user['id'], user["role"])
        else:
            return "Username or password incorrect", 403
        

def generate_token(user_id, user_role):
    """"
    generates a token
    """
    timestamp = _current_timestamp()
    payload = {
        "iss": JWT_ISSUER,
        "iat": int(timestamp),
        "exp": int(timestamp + JWT_LIFETIME_SECONDS),
        "sub": str(user_id),
        "role": user_role
    }

    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def decode_token(token):
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except JWTError as e:
        six.raise_from(Unauthorized, e)


def get_secret(user, token_info) -> str:
    return '''
    You are user_id {user} and the secret is 'wbevuec'.
    Decoded token claims: {token_info}.
    '''.format(user=user, token_info=token_info["role"])


def _current_timestamp() -> int:
    return int(time.time())
