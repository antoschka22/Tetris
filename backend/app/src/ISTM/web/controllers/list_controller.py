from dao.dao_list import *
from core.security import *

def add_item_to_list(new_item):
    try:
        return insert_item_into_list(new_item), 201
    except:
        return "An error ocurred", 404

def get_list_with_items_in_box(uuid: str):
    try:
        return get_a_list_with_items_in_box(uuid), 200
    except: 
        return "An error ocurred", 404

def update_list(uuid: str, list):
    try:
        if list['done'] == '':
            update_a_done_list(uuid)
        if list['missing']  == '':
            update_a_missing_list(uuid)
        if list['missing']  == 'inStock':
            update_a_missing_list_null(uuid)
        if list['inbox']  == '':
            update_a_inbox_list(uuid)
        if list['buying']  == '':
            update_a_buying_list(uuid)
        update_a_list(uuid, list)
    except:
        return "An error ocurred", 404

def update_list_by_name(box_id: str, list, item_id: str):
    try:
        return update_list_by_name_dao(box_id, list, item_id), 200
    except: 
        return "An error ocurred", 404

def remove_list(uuid: str):
    try:
        return remove_list_by_id(uuid), 202
    except:
        return "An error ocurred", 404

def remove_item_in_list(uuid: str):
    try:
        return remove_item_in_list_by_id(uuid), 202
    except: 
        return "An error ocurred", 404

def get_list(uuid: str):
    try: 
        return get_a_list_with_list_id(uuid), 200
    except: 
        return "An error ocurred", 404

    
def get_items_not_in_stock():
    """
        get all the items that are not in stock
    """
    try:
        return get_items_arent_on_stock(), 200
    except:
        return "An error ocurred", 404

def get_items_not_in_stock_by_box(uuid: str):
    """
        get all the missing items in a box, pass in the box id
    """
    try: 
        return get_items_not_in_stock_by_box_dao(uuid), 200
    except:
        return "An error ocurred", 404
    
def get_amount_of_reports():
    """
        get the amount of reports of something missing
    """
    try: 
        return get_amount_of_reports_dao(), 200
    except: 
        return "An error ocurred", 404