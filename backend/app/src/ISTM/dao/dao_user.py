from .db import get_db_cursor

def get_user_by_credentials(credentials):
    """
        get the information of the user by credentials (email, password)
    """
    with get_db_cursor() as cursor:
        cursor.execute("select * from users where email = %s and password = %s", [credentials['username'], credentials['password']])
        return cursor.fetchone()
    
def get_user_by_id(id: str):
    """
        get the information of the user by the id
    """
    with get_db_cursor() as cursor:
        cursor.execute("select * from users where id = %s", [id])
        return cursor.fetchone()

def get_all_users():
    """
        get all the users back
    """
    with get_db_cursor() as cursor:
        cursor.execute("select * from users")
        return cursor.fetchall()
