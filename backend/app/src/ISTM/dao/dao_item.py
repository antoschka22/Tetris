from .db import get_db_cursor

def get_items_by_box_id(box_id: str):
    """
        Get Items belonging to box.
    """
    with get_db_cursor() as cursor:
        cursor.execute("select * from item where box_id = %s", [box_id])
        return cursor.fetchall()
def add_item_to_box_by_id(box_id: str, new_item):
    """
        Adds an item to a box, returns the inserted item
    """
    with get_db_cursor() as cursor:
        cursor.execute("insert into item (name, description, box_id) values (%s, %s, %s) returning *", [new_item['name'], new_item['description'], box_id]) # returning: die Items die beim Hinzufügen zurückgegeben werden soll
        return cursor.fetchone()
def update_item_by_id(uuid: str, item):
    """
        pass the item id and you can change the item
    """
    with get_db_cursor() as cursor:
        cursor.execute("UPDATE item SET name = %s, description= %s, box_id =%s, status=%s WHERE id = %s returning *", [item['name'], item['description'], item['box_id'], item['status'], uuid])
        return cursor.fetchone()
def get_all_the_items_available():
    """
        get all the items, stored in the database
    """
    with get_db_cursor() as cursor:
        cursor.execute("select * from item")
        return cursor.fetchall()
def update_box_id_of_item(uuid: str, box:str):
    """
        update the box_id in item, pass the uuid of the id and the box
    """
    with get_db_cursor() as cursor:
        cursor.execute("UPDATE item SET box_id=%s where id=%s returning *", [box['box_id'], uuid])
        return cursor.fetchone()
def create_item(new_item):
    """
        Adds a new item, returns the item
    """
    with get_db_cursor() as cursor:
        cursor.execute("insert into item (name, description) values (%s, %s) returning *", [new_item['name'], new_item['description']])
        return cursor.fetchone()
def get_item_with_boxname(offset: int, limit: int):
    """
        you get all the items with the boxname and the amount of reports that item has
    """
    with get_db_cursor() as cursor:
        cursor.execute(("""
                        select item.id, item.name, item.description, item.box_id, item.status, box.name as boxname,
                        (select count(id) as amountOfReports from report where item_id= item.id and repairing is null) as AmountOfReports
                        from item
                        left join box on box.id = item.box_id
                        left join report on item.id = report.item_id
                        group by item.id, box.name
                        order by item.id
                        OFFSET %s ROWS FETCH NEXT %s ROWS ONLY"""), [offset, limit])
        return cursor.fetchall()
def get_item_with_boxname_by_id(uuid: str):
    """
        you get an item with the boxname and the amount of reports that item has
    """
    with get_db_cursor() as cursor:
        cursor.execute("""
                        select item.id, item.name, item.description, item.box_id, item.status, box.name as boxname,
                        (select count(id) as amountOfReports from report where item_id= %s and repairing is null) as AmountOfReports
                        from item 
                        left join box on box.id = item.box_id 
                        left join report on item.id = report.item_id 
                        where item.id = %s group by item.id, box.name""", [uuid, uuid])
        return cursor.fetchone()
def delete_box_by_id(uuid: str):
    """
        removes an item
    """
    with get_db_cursor() as cursor:
        cursor.execute("DELETE FROM item WHERE id=%s returning *", [uuid])
        return cursor.fetchone()
def get_amount_of_item():
    """
        returns the amount of items stored in the database
    """
    with get_db_cursor() as cursor:
        cursor.execute("SELECT COUNT(*) as amountofitems FROM item")
        return cursor.fetchone()
def get_items_outside_of_box():
    with get_db_cursor() as cursor:
        cursor.execute("""
                        SELECT * FROM item 
                        WHERE box_id IS NULL
                        ORDER BY name
                    """)
        return cursor.fetchall()

def get_item_by_name_and_box_id_dao(item_name: str, box_id: str):
    with get_db_cursor() as cursor:
        cursor.execute("""
                        SELECT * FROM item
                        WHERE name = %s
                        AND
                        box_id = %s
                    """, [item_name, box_id])
        return cursor.fetchone()