from dao.dao_item import *
from dao.dao import get_item_by_id
from core.security import *

def remove_item(uuid, token_info):
    """
        removes an item
    """
    if is_admin(token_info):
        return delete_box_by_id(uuid)
    else:
        return "Unauthorized", 401

def update_item(uuid: str, item):
    """
        updates an item
    """
    try:
        return update_item_by_id(uuid, item), 204
    except:
        return "Doesnt work", 404
    

def get_item(uuid: str):
    """
        get an item by id
    """
    item = get_item_by_id(uuid)
    if item != None:
        return item, 200
    else:
        return "Item does not exist", 404

def get_all_items():
    """
        returns all the items
    """
    return get_all_the_items_available()

def update_item_in_box(uuid: str, boxId: str):
    """
        updates just the box id of an item
    """
    return update_box_id_of_item(uuid, boxId)

def add_item(new_item, token_info):
    """
        adds a new item with a null box id (its not in a box)
    """
    if is_user(token_info):
        return create_item(new_item)
    else:
        return "Unauthorized", 401
    

def get_item_with_box_name(offset: int, limit: int):
    """
        you get the item with the box in which the item is located 
        + the amount of reports it has
    """
    try:
        return get_item_with_boxname(offset, limit), 200
    except:
        return "An error occurred", 400

def get_item_with_extra_info_by_id(uuid: str):
    """
        returns an item with the box name and the amount of reports that item has
    """
    try:
        return get_item_with_boxname_by_id(uuid), 200
    except:
        return "An error occurred", 400

def get_amount_of_items():
    """
        returns the amount of item storde in the database
    """
    try: 
        return get_amount_of_item(), 200
    except:
        return "An error ocurred", 400

def get_item_outside_box():
    """
        returns all the items that are not in a box
    """
    try: 
        return get_item_outside_box(), 200
    except:
        return "An error ocurred", 400

def get_item_by_name_and_box_id(item_name: str, box_id: str):
    """
        get an item by passing the name of the item and the id of the box that item is in
    """
    try:
        return get_item_by_name_and_box_id_dao(item_name, box_id), 200
    except:
        return "An error ocurred", 400