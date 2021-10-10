from dao.dao_user import *

def get_user(id: str):
    try: 
        return get_user_by_id(id), 200
    except:
        return "An error ocurred", 404

def get_all_user():
    try:
        return get_all_users(), 200
    except:
        return "An error ocurred", 404