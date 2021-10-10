from .db import get_db_cursor

def insert_item_into_list(new_item):
    """
        insert an item with the box id into a list
    """
    with get_db_cursor() as cursor:
        cursor.execute("""
                    INSERT INTO list (box_id, item_name, item_id)
                    VALUES (%s, %s, %s) returning *
                    """, [new_item['box_id'], new_item['item_name'], new_item['item_id']])
        return cursor.fetchone()
        
def get_a_list_with_items_in_box(uuid: str):
    """
        pass a box id and get a list of items that should be in that box
    """
    with get_db_cursor() as cursor:
        cursor.execute("SELECT * FROM list WHERE box_id = %s AND done is null", [uuid])
        return cursor.fetchall()


def update_list_by_name_dao(uuid: str, list, item_name: str):
    """
        updates the item of a by the box_id
    """
    with get_db_cursor() as cursor:
        cursor.execute("UPDATE list SET done =%s, inbox=%s, missing = %s, buying = %s, item_id = %s WHERE box_id = %s AND item_name = %s returning *", [list['done'], list['inbox'], list['missing'], list['buying'], list['item_id'], uuid, item_name])
        return cursor.fetchone()

def remove_list_by_id(uuid: str):
    """
        delete a list, parameter is the uuid of the box that list is assigned to
    """
    with get_db_cursor() as cursor:
        cursor.execute("DELETE FROM list WHERE box_id=%s AND done = null returning *", [uuid])
        return cursor.fetchone()

def remove_item_in_list_by_id(uuid: str):
    """
        delete an item in a list, paramter is the uuid of the item in the list
    """
    with get_db_cursor() as cursor:
        cursor.execute("DELETE FROM list WHERE id = %s returning *", [uuid])
        return cursor.fetchone()

def get_a_list_with_list_id(uuid: str):
    """
        pass the id of a list and get the list back
    """
    with get_db_cursor() as cursor:
        cursor.execute("SELECT * FROM list WHERE id = %s", [uuid])
        return cursor.fetchone()

def get_items_arent_on_stock():
    """
        get all the items that have been reported because they are not on stock
    """
    with get_db_cursor() as cursor:
        cursor.execute("SELECT * FROM list WHERE missing is not null")
        return cursor.fetchall()
    
def get_items_not_in_stock_by_box_dao(uuid: str):
    """
        get all the items that are missing in that box, parameter is the box id
    """
    with get_db_cursor() as cursor:
        cursor.execute("SELECT * FROM list WHERE box_id = %s AND missing is not null", [uuid])
        return cursor.fetchall()
    
def get_amount_of_reports_dao():
    """
        get the amount of items that are missing
    """
    with get_db_cursor() as cursor:
        cursor.execute("SELECT COUNT(*) FROM list WHERE missing is not null")
        return cursor.fetchone()

def update_a_list(uuid: str, list):
    """
        update a list, passing the uuid of the list and the list with the changed values
    """
    with get_db_cursor() as cursor:
        cursor.execute("UPDATE list SET box_id = %s, item_name= %s, item_id = %s WHERE id = %s", [list['box_id'], list['item_name'], list['item_id'], uuid])

def update_a_done_list(uuid: str):
    """
        update the done column with the current timestamp
    """
    with get_db_cursor() as cursor:
        cursor.execute("UPDATE list SET done = current_timestamp WHERE id = %s", [uuid])

def update_a_inbox_list(uuid: str):
    """
        update the inbox column with the current timestamp
    """
    with get_db_cursor() as cursor:
        cursor.execute("UPDATE list SET inbox = current_timestamp WHERE id = %s", [uuid])

def update_a_missing_list(uuid: str):
    """
        update the missing column with the current timestamp
    """
    with get_db_cursor() as cursor:
        cursor.execute("UPDATE list SET missing = current_timestamp WHERE id = %s", [uuid])

def update_a_missing_list_null(uuid: str):
    """
        update the missing column with the null
    """
    with get_db_cursor() as cursor:
        cursor.execute("UPDATE list SET missing = null WHERE id = %s", [uuid])

def update_a_buying_list(uuid: str):
    """
        update the buying column with the current timestamp
    """
    with get_db_cursor() as cursor:
        cursor.execute("UPDATE list SET buying = current_timestamp WHERE id = %s", [uuid])