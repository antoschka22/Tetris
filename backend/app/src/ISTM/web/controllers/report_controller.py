from dao.dao_report import *

def add_report(new_report):
    """
        adds a new report of an item and returns the added values
    """
    return create_item_report(new_report)

def get_reports(uuid: str):
    try:
        return get_reports_by_item_id(uuid), 200
    except:
        return "An error has ocurred", 404

def get_repairing_report(uuid: str):
    try: 
        return get_reports_by_item_id_repaired(uuid), 200
    except:
        return "An error has ocurred", 404

def get_amount_of_reports(uuid: str):
    try:
        return get_amount_of_reports_by_item_id(uuid), 200
    except:
        return "An error has ocurred", 404

def update_report_repairing(uuid: str):
    try:
        return update_repairing_state(uuid), 201
    except:
        return "An error has ocurred", 404

def update_report_repaired(uuid: str):
    report = get_report_by_id(uuid)
    if report["repairing"] == None:
        return "This item has not been send for repair"
    else:
        try:
            return update_repaired_state(uuid), 201
        except: 
            return "An error has ocurred", 404
def update_all_report_repairing(uuid: str):
    try:
        return update_all_report_repairing_by_id(uuid), 201
    except: 
        return "An error has ocurred", 404
    
def remove_report(uuid: str): 

    report = get_report_by_report_id(uuid)

    if not report:
        return "Report doesnt exist", 404
    elif report["repaired"] is not None and report["repairing"] is not None:
        return "Cant delete a report that has already been repaired", 200
    elif report["repairing"] is not None and report["repaired"] is None:
        return "Cant delete a report that is been dealt with at the moment", 200
    elif report["repairing"] is None and report["repaired"] is None:
        return delete_report_by_id(uuid), 200
    else:
        return "An Error ocurred", 404