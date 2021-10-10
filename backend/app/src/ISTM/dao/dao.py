from logging import setLoggerClass
from .db import get_db_cursor

def get_box_by_id(box_id: str):
    """
        Get a Box by Id from DB, returns None if no box is found
    """
    with get_db_cursor() as cursor:
        cursor.execute("select * from box where id = %s", [box_id])
        return cursor.fetchone()
def create_box(new_box):
    """
        Adds a new box, returns the box
    """
    with get_db_cursor() as cursor:
        cursor.execute("insert into box (name, description) values (%s, %s) returning *", [new_box['name'], new_box['description']])
        return cursor.fetchone()

def get_all_the_boxes_available():
    """
        get all the boxes, stored in the database
    """
    with get_db_cursor() as cursor:
        cursor.execute("select * from box")
        return cursor.fetchall()

def get_item_by_id(uuid: str):
    """
        Get an Item by Id from DB, returns None if no box is found
    """
    with get_db_cursor() as cursor:
        cursor.execute("select * from item where id = %s", [uuid])
        return cursor.fetchone()

def get_the_available_boxes():
    """
        returns all the boxes that are available
    """
    with get_db_cursor() as cursor:
        cursor.execute("SELECT * FROM box WHERE usage = 'available'")
        return cursor.fetchall()
    
def get_the_unavailable_boxes():
    """
        returns all the boxes that are unavailable (something in the box is missing)
    """
    with get_db_cursor() as cursor:
        cursor.execute("SELECT * FROM box WHERE usage = 'unavailable'")
        return cursor.fetchall()

def get_boxes_beeing_used():
    """
        returns all the boxes that are beeing used
    """
    with get_db_cursor() as cursor:
        cursor.execute("SELECT * FROM box WHERE usage = 'borrowed'")
        return cursor.fetchall()

def update_a_box(box, box_id: str):
    """
        update the usage or contact person of the box
    """
    with get_db_cursor() as cursor:
        cursor.execute("UPDATE box SET usage =%s, contactperson = %s WHERE id = %s returning *", [box['usage'], box['contactperson'], box_id])
        return cursor.fetchone()

def get_boxes_beeing_listed():
    """
        get all the boxes that have a list of items
    """
    with get_db_cursor() as cursor:
        cursor.execute("SELECT * FROM box WHERE usage = 'listed'")
        return cursor.fetchall()
