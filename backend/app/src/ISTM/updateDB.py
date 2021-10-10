from dao.db import get_db_cursor

def updateDatabase():
    def checkTables():
        """
            checks if all the tables exist
        """
        with get_db_cursor() as cursor:
            cursor.execute("""SELECT count(*) as amountoftables
                            FROM pg_catalog.pg_tables
                            WHERE schemaname != 'pg_catalog' AND 
                            schemaname != 'information_schema';
                            """)
            return cursor.fetchone()

    def checkDBVersionTableExists():
        """
            function checks if the table db_version which stores the versions of the dbs exists
        """
        with get_db_cursor() as cursor:
            cursor.execute("""SELECT *
                            FROM INFORMATION_SCHEMA.TABLES
                            WHERE TABLE_SCHEMA = 'public'
                            AND TABLE_NAME = 'db_version'; 
                            """)
            return cursor.fetchone()
    if not checkDBVersionTableExists():
        """
            creates the db_version table if it doesnt exist
        """
        with get_db_cursor() as cursor:
            cursor.execute("""
                            CREATE TABLE db_version (
                            id SERIAL PRIMARY KEY,
                            comment VARCHAR(255) NOT NULL);
                            """)
    def latestVersion():
        """
            Get the current version of the db
        """
        with get_db_cursor() as cursor:
            cursor.execute("select max(id) from db_version")
            return cursor.fetchone()

    def addVersion(comment):
        """
            add next new version with a comment
        """
        with get_db_cursor() as cursor:
            cursor.execute("""
                            insert into db_version (comment)
                            values(%s)""", [comment])

    checkAllTheTables = checkTables()
    lastVersionId = latestVersion()
    if checkAllTheTables['amountoftables'] == 1:
        with get_db_cursor() as cursor: 
            cursor.execute("""
                CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
                CREATE TABLE IF NOT EXISTS box( 
                    id uuid DEFAULT uuid_generate_v4 () UNIQUE,
                    name VARCHAR(255) NOT NULL,
                    description VARCHAR(255)
                );
                create type status as enum('functional', 'damage', 'repare');
                CREATE TABLE IF NOT EXISTS item (
                    id uuid DEFAULT uuid_generate_v4 (),
                    name VARCHAR NOT NULL,
                    description VARCHAR NOT NULL,
                    box_id uuid,
                    status status DEFAULT 'functional',
                    PRIMARY KEY (id),
                    foreign key (box_id) references box(id)
                );
                CREATE TABLE IF NOT EXISTS report (
                    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
                    description VARCHAR(255) NOT NULL,
                    item_id UUID DEFAULT uuid_generate_v4 (),
                    repaired date DEFAULT null,
                    repairing date DEFAULT null,
                    foreign key (item_id) references item(id) on delete cascade
                );
                create type rolesENUM as enum('user', 'admin');
                CREATE TABLE IF NOT EXISTS users (
                    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
                    email VARCHAR(255) NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    first_name VARCHAR(255) NOT NULL,
                    last_name VARCHAR(255) NOT NULL,
                    role rolesENUM NOT NULL,
                    username VARCHAR NOT NULL,
                    specialization VARCHAR NOT NULL);
                """)
        addVersion('Create the required tables for the beginning (Box, Item, Report, Users)')
    if lastVersionId['max'] < 2:
        addVersion('test')
    if lastVersionId['max'] < 3:
        with get_db_cursor() as cursor:
            cursor.execute("""
                CREATE TYPE boxUsage AS enum('available', 'unavailable');
                ALTER TABLE box
                ADD COLUMN usage boxUsage NOT NULL DEFAULT 'available';
                        """)
        addVersion('created an boxUsage enum and a usage column in the box table')    
    if lastVersionId['max'] < 4:
        with get_db_cursor() as cursor:
            cursor.execute("""
                ALTER TYPE boxUsage ADD VALUE 'borrowed'; 
                        """)
        addVersion('append borrowed to boxUsage enum')
    if lastVersionId['max'] < 5:
        with get_db_cursor() as cursor:
            cursor.execute("""
                INSERT INTO users(email, password, first_name, last_name, role, username, specialization)
                VALUES ('cashier@gmail.com', 'cashier', 'Christoph', 'Schachinger', 'admin', 'principal cashier', 'make money')
                        """)
        addVersion('add the new user "Cashier"')

    if lastVersionId['max'] < 6:
        with get_db_cursor() as cursor:
            cursor.execute("""
                ALTER TABLE report
                DROP CONSTRAINT report_item_id_fkey;

                ALTER TABLE item
                DROP CONSTRAINT item_box_id_fkey;

                ALTER TABLE box
                ALTER COLUMN id TYPE VARCHAR;

                ALTER TABLE item
                ALTER COLUMN id TYPE VARCHAR,
                ALTER COLUMN box_id TYPE VARCHAR,
                ADD CONSTRAINT item_box_id_fkey FOREIGN KEY(box_id) REFERENCES box(id);

                ALTER TABLE report
                ALTER COLUMN id TYPE VARCHAR,
                ALTER COLUMN item_id TYPE VARCHAR,
                ADD CONSTRAINT report_item_id_fkey FOREIGN KEY (item_id) REFERENCES item(id) ON DELETE CASCADE;

                ALTER TABLE users
                ALTER COLUMN id TYPE VARCHAR;
                        """)
        addVersion('changing from uuid to string, but still generating them')
    if lastVersionId['max'] < 7:
        with get_db_cursor() as cursor:
            cursor.execute("""
                ALTER TYPE boxUsage ADD VALUE 'listed'; 
                        """)
        addVersion('append listed to boxUsage enum')
    if lastVersionId['max'] < 8:
        with get_db_cursor() as cursor:
            cursor.execute("""
                ALTER TABLE item
                ADD COLUMN itemListed VARCHAR NULL,
                ADD COLUMN borrowing BOOLEAN DEFAULT false
                        """)
        addVersion('create itemListed and borrowing columns')
    if lastVersionId['max'] < 9:
        with get_db_cursor() as cursor:
            cursor.execute("""
                ALTER TABLE item
                DROP COLUMN itemListed,
                DROP COLUMN borrowing;

                CREATE TABLE IF NOT EXISTS list (
                    id VARCHAR(255) DEFAULT uuid_generate_v4 () PRIMARY KEY,
                    box_id VARCHAR(255) NULL,
                    item_id VARCHAR(255) NULL,
                    FOREIGN KEY (box_id) REFERENCES box(id) ON DELETE CASCADE);
                        """)
        addVersion('drop itemListed and borrowing columns, add a new table list')
    if lastVersionId['max'] < 10:
        with get_db_cursor() as cursor:
            cursor.execute("""
                ALTER TABLE list
                ADD COLUMN done BOOLEAN DEFAULT false;
                            """)
        addVersion('drop itemListed and borrowing columns, add a new table list')
    if lastVersionId['max'] < 11:
        with get_db_cursor() as cursor:
            cursor.execute("""
                ALTER TABLE box
                ADD COLUMN contactPerson VARCHAR NULL;
                            """)
        addVersion('add a contact person column in box table')
    if lastVersionId['max'] < 12:
        with get_db_cursor() as cursor:
            cursor.execute("""
                ALTER TABLE list
                ADD COLUMN inbox BOOLEAN DEFAULT false;
                            """)
        addVersion('add a column inbox to know if the item is in the box')
    if lastVersionId['max'] < 13:
        with get_db_cursor() as cursor:
            cursor.execute("""
                ALTER TABLE list
                ADD COLUMN missing BOOLEAN DEFAULT false;
                            """)
        addVersion('add a column missing to know if the item is not in the materialkammerl')
    if lastVersionId['max'] < 14:
        with get_db_cursor() as cursor:
            cursor.execute("""
                ALTER TABLE list
                RENAME COLUMN item_id to item_name;

                ALTER TABLE list
                ADD COLUMN item_id VARCHAR NULL,
                ADD CONSTRAINT item_item_id_fkey FOREIGN KEY (item_id) REFERENCES item(id);
                            """)
        addVersion('renamed item_id to item_name, added a column item_id being the foreign key of item(id)')
    if lastVersionId['max'] < 15:
        addVersion('error handling')
    if lastVersionId['max'] < 16:
        addVersion('error handling')
    if lastVersionId['max'] < 17:
        with get_db_cursor() as cursor:
            cursor.execute("""
                ALTER TABLE list
                ADD COLUMN buying BOOLEAN NULL;
                            """)
        addVersion('add buying column into the list table')
    if lastVersionId['max'] < 18:
        with get_db_cursor() as cursor:
            cursor.execute("""
                ALTER TABLE list
                ALTER COLUMN missing set DEFAULT false;
                            """)
        addVersion('add buying default value (because im a Wachbirne and forgot it)')
    if lastVersionId['max'] < 19:
        with get_db_cursor() as cursor:
            cursor.execute("""
                ALTER TABLE list
                ALTER COLUMN missing set NOT NULL;
                            """)
        addVersion('add buying default value (because im a Wachbirne and forgot it)')
    if lastVersionId['max'] < 20:
        with get_db_cursor() as cursor:
            cursor.execute("""
                ALTER TABLE list
                DROP COLUMN buying;

                ALTER TABLE list
                ADD COLUMN buying BOOLEAN NOT NULL DEFAULT false
                            """)
        addVersion('add buying default value (because im a Wachbirne and forgot it)')
    if lastVersionId['max'] < 21:
            with get_db_cursor() as cursor:
                cursor.execute("""
                    ALTER TABLE list
                    DROP COLUMN buying,
                    DROP COLUMN done,
                    DROP COLUMN inbox,
                    DROP COLUMN missing;

                    ALTER TABLE list
                    ADD COLUMN done date DEFAULT null,
                    ADD COLUMN inbox date DEFAULT null,
                    ADD COLUMN missing date DEFAULT null, 
                    ADD COLUMN buying date DEFAULT null;
                                """)
            addVersion('changing the datatypes in list to dates')