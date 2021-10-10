CREATE TABLE box(
    id uuid DEFAULT uuid_generate_v4 () UNIQUE,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255)
);
create type status as enum('functional', 'damage', 'repare')
CREATE TABLE item (
    id uuid DEFAULT uuid_generate_v4 (),
    name VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    box_id uuid,
	status status DEFAULT 'functional',
    PRIMARY KEY (id),
	foreign key (boxes_id) references box(id)
);
CREATE TABLE report (
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    item_id UUID DEFAULT uuid_generate_v4 (),
    repaired date DEFAULT null,
    repairing date DEFAULT null,
	foreign key (item_id) references item(id) on delete cascade
);
create type rolesENUM as enum('user', 'admin')
CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    role rolesENUM NOT NULL
);
CREATE TABLE db_version (
    id SERIAL PRIMARY KEY,
    comment VARCHAR(255) NOT NULL
);