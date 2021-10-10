from .db import get_db_cursor

def get_reports_by_item_id(uuid: str):
    """
        get reports by passing the uuid of the item and filters the reports that are not repaired yet
    """
    with get_db_cursor() as cursor:
        cursor.execute("select * from report where item_id=%s and repairing is null", [uuid])
        return cursor.fetchall()

def get_reports_by_item_id_repaired(uuid: str):
    """
        get reports by passing the uuid of the item and filters the reports that are not repaired yet
    """
    with get_db_cursor() as cursor:
        cursor.execute("select * from report where item_id=%s and (repaired is null and repairing is not null)", [uuid])
        return cursor.fetchall()

def delete_report_by_id(uuid: str):
    """
        removes a report
    """
    with get_db_cursor() as cursor:
        cursor.execute("DELETE FROM report WHERE id=%s returning *", [uuid])
        return cursor.fetchone()

def get_report_by_report_id(uuid: str):
    """
        gets a report by the report id
    """
    with get_db_cursor() as cursor:
        cursor.execute("SELECT * FROM report WHERE id = %s", [uuid])
        return cursor.fetchone()

def get_amount_of_reports_by_item_id(uuid: str):
    """
        pass the id of an item and you get the amount of reports that item has
    """
    with get_db_cursor() as cursor:
        cursor.execute("select count(id) as amountOfReports from report where item_id=%s and repairing is null", [uuid])
        return cursor.fetchone()

def update_repairing_state(uuid: int):
    """
        you pass the report id and you change the repairing state from NULL to the current date
    """
    with get_db_cursor() as cursor:
        cursor.execute("UPDATE report SET repairing= current_timestamp where id=%s returning *", [uuid])
        return cursor.fetchone()

def update_repaired_state(uuid: int):
    """
        you pass the report id and you change the repaired state from NULL to the current date
    """
    with get_db_cursor() as cursor:
        cursor.execute("UPDATE report SET repaired= current_timestamp where id=%s returning *", [uuid])
        return cursor.fetchone()

def get_report_by_id(uuid: int):
    """
        returns report by report uuid
    """
    with get_db_cursor() as cursor:
        cursor.execute("select * from report where id=%s", [uuid])
        return cursor.fetchone()

def update_all_report_repairing_by_id(uuid: int):
    """
        you pass an item uuid and you change the repaired state from NULL to the current date from all the reports from that item
    """
    with get_db_cursor() as cursor:
        cursor.execute("update report set repairing = current_timestamp where item_id = %s returning *", [uuid])
        return cursor.fetchone()

def create_item_report(new_report):
    """
    creates a new report of an item
    """
    with get_db_cursor() as cursor:
        cursor.execute("insert into report (description, item_id) values (%s, %s) returning *", [new_report['description'], new_report['item_id']])
        return cursor.fetchone()