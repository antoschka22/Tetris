from dao.dao import *
from dao.dao_item import *
from dao.dao_list import get_items_not_in_stock_by_box_dao


def get_box(box_id: str):
    """
        Get a Box and the Items in Box by box_id
        returns 404 if no box is found
    """
    box = get_box_by_id(box_id)
    if box != None:
        box['items'] = get_items_by_box_id(box_id)
        return box, 200
    else:
        return "Box does not exist", 404
 
def add_item_to_box(box_id: str, new_item):
    """
        adds item to a box, returns the added item
        if there is no description then there are just double quotes
    """
    try:
        if not "description" in new_item:
            new_item["description"] = ""
        return add_item_to_box_by_id(box_id, new_item)
    except:
        return "An error occurred", 400
    

def add_box(new_box):
    """
        adds item to a box, returns the added item
        if there is no description then there are just double quotes
    """
    if not "description" in new_box:
        new_box["description"] = ""
    return create_box(new_box)

def get_all_boxes():
    """
        gets all the boxes
    """
    return get_all_the_boxes_available()
    
def get_all_available_boxes():
    """
        get all the boxes that are available
    """
    try:
        return get_the_available_boxes(), 200
    except:
        return "An error ocurred", 404

def get_all_unavailable_boxes():
    """
        get all the boxes that are unavailable
    """
    try:
        return get_the_unavailable_boxes(), 200
    except: 
        return "An error ocurred", 404

def get_all_borrowed_boxes():
    """
        get all the boxes that are beeing used at the moments
    """
    try:
        return get_boxes_beeing_used(), 200
    except:
        return "An error ocurred", 404

def update_box(box_id: str, box):
    """
        update a box
    """
    try:
        return update_a_box(box, box_id), 204
    except:
        return "An error ocurred", 404

def get_all_listed_boxes():
    """
        get all the boxes that have a list
    """
    try:
        return get_boxes_beeing_listed(), 200
    except:
        return "An error ocurred", 404

def get_box_with_missing_items():
    """
        get all the boxes with the missing items
    """
    boxes = get_all_the_boxes_available()
    if boxes != None:
        for box in boxes:
            items = get_items_not_in_stock_by_box_dao(box['id'])
            box['items'] = items
        return boxes, 200
    else:
        return "An error ocurred", 404