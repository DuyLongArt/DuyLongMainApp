-- DROP SCHEMA duylong;

CREATE SCHEMA duylong AUTHORIZATION pg_database_owner;

COMMENT ON SCHEMA duylong IS 'standard duylong schema';

-- DROP SEQUENCE duylong.mail_id_seq;

CREATE SEQUENCE duylong.mail_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 3
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE duylong.mail_id_seq OWNER TO duylong;
GRANT ALL ON SEQUENCE duylong.mail_id_seq TO duylong;

-- DROP SEQUENCE duylong.person_stuff_seq;

CREATE SEQUENCE duylong.person_stuff_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE duylong.person_stuff_seq OWNER TO duylong;
GRANT ALL ON SEQUENCE duylong.person_stuff_seq TO duylong;

-- DROP SEQUENCE duylong.personal_habit_id_seq;

CREATE SEQUENCE duylong.personal_habit_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE duylong.personal_habit_id_seq OWNER TO duylong;
GRANT ALL ON SEQUENCE duylong.personal_habit_id_seq TO duylong;

-- DROP SEQUENCE duylong.personal_information_id_seq;

CREATE SEQUENCE duylong.personal_information_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE duylong.personal_information_id_seq OWNER TO duylong;
GRANT ALL ON SEQUENCE duylong.personal_information_id_seq TO duylong;

-- DROP SEQUENCE duylong.personal_money_id_seq;

CREATE SEQUENCE duylong.personal_money_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE duylong.personal_money_id_seq OWNER TO duylong;
GRANT ALL ON SEQUENCE duylong.personal_money_id_seq TO duylong;

-- DROP SEQUENCE duylong.personal_plan_id_seq;

CREATE SEQUENCE duylong.personal_plan_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE duylong.personal_plan_id_seq OWNER TO duylong;
GRANT ALL ON SEQUENCE duylong.personal_plan_id_seq TO duylong;

-- DROP SEQUENCE duylong.personal_property_id_seq;

CREATE SEQUENCE duylong.personal_property_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE duylong.personal_property_id_seq OWNER TO duylong;
GRANT ALL ON SEQUENCE duylong.personal_property_id_seq TO duylong;

-- DROP SEQUENCE duylong.personal_skill_id_seq;

CREATE SEQUENCE duylong.personal_skill_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE duylong.personal_skill_id_seq OWNER TO duylong;
GRANT ALL ON SEQUENCE duylong.personal_skill_id_seq TO duylong;
-- duylong.person definition

-- Drop table

-- DROP TABLE duylong.person;

CREATE TABLE duylong.person ( id int4 NOT NULL, "name" varchar(255) NULL, birthday date NULL, sex varchar(15) NULL, alias text DEFAULT 'other'::text NOT NULL, CONSTRAINT person_pkey PRIMARY KEY (id));

-- Permissions

ALTER TABLE duylong.person OWNER TO duylong;
GRANT ALL ON TABLE duylong.person TO duylong;


-- duylong.person_stuff definition

-- Drop table

-- DROP TABLE duylong.person_stuff;

CREATE TABLE duylong.person_stuff ( id int4 DEFAULT nextval('person_stuff_seq'::regclass) NOT NULL, "name" varchar(255) DEFAULT 'NewStuff'::character varying NOT NULL, buy_day date DEFAULT '9999-12-31'::date NULL, price numeric(20, 4) DEFAULT 999999999.9999 NULL, currency_unit varchar(15) DEFAULT 'VND'::character varying NOT NULL, person_property_id int4 NULL, CONSTRAINT personal_stuff_pkey PRIMARY KEY (id));

-- Permissions

ALTER TABLE duylong.person_stuff OWNER TO duylong;
GRANT ALL ON TABLE duylong.person_stuff TO duylong;


-- duylong.person_information definition

-- Drop table

-- DROP TABLE duylong.person_information;

CREATE TABLE duylong.person_information ( id int4 DEFAULT nextval('personal_information_id_seq'::regclass) NOT NULL, "name" varchar(255) NULL, major varchar(255) NULL, person_id int4 NULL, CONSTRAINT personal_information_pkey PRIMARY KEY (id), CONSTRAINT personal_information_person_id_fkey FOREIGN KEY (person_id) REFERENCES duylong.person(id));

-- Permissions

ALTER TABLE duylong.person_information OWNER TO duylong;
GRANT ALL ON TABLE duylong.person_information TO duylong;


-- duylong.person_mail definition

-- Drop table

-- DROP TABLE duylong.person_mail;

CREATE TABLE duylong.person_mail ( id int4 DEFAULT nextval('mail_id_seq'::regclass) NOT NULL, mail varchar(255) DEFAULT 'dev'::character varying NOT NULL, person_id int4 NULL, "type" varchar(255) DEFAULT 'dev'::character varying NULL, status varchar(255) DEFAULT 'pending'::character varying NOT NULL, CONSTRAINT person_mail_pk PRIMARY KEY (id), CONSTRAINT person_mail_fk FOREIGN KEY (person_id) REFERENCES duylong.person(id));

-- Permissions

ALTER TABLE duylong.person_mail OWNER TO duylong;
GRANT DELETE, REFERENCES, INSERT, TRUNCATE, SELECT, UPDATE, TRIGGER ON TABLE duylong.person_mail TO duylong;


-- duylong.person_property definition

-- Drop table

-- DROP TABLE duylong.person_property;

CREATE TABLE duylong.person_property ( id int4 DEFAULT nextval('personal_property_id_seq'::regclass) NOT NULL, "name" varchar(255) NULL, category varchar(255) NULL, person_id int4 NULL, CONSTRAINT personal_property_pkey PRIMARY KEY (id), CONSTRAINT personal_property_person_id_fkey FOREIGN KEY (person_id) REFERENCES duylong.person(id));

-- Permissions

ALTER TABLE duylong.person_property OWNER TO duylong;
GRANT ALL ON TABLE duylong.person_property TO duylong;


-- duylong.personal_habit definition

-- Drop table

-- DROP TABLE duylong.personal_habit;

CREATE TABLE duylong.personal_habit ( id serial4 NOT NULL, "name" varchar(255) NULL, frequency varchar(255) NULL, person_plan_id int4 NULL, CONSTRAINT personal_habit_pkey PRIMARY KEY (id), CONSTRAINT personal_habit_person_plan_id_fkey FOREIGN KEY (person_plan_id) REFERENCES duylong.person(id));

-- Permissions

ALTER TABLE duylong.personal_habit OWNER TO duylong;
GRANT ALL ON TABLE duylong.personal_habit TO duylong;


-- duylong.personal_money definition

-- Drop table

-- DROP TABLE duylong.personal_money;

CREATE TABLE duylong.personal_money ( id serial4 NOT NULL, "name" varchar(255) NULL, description varchar(2047) NULL, balance float8 NULL, person_id int4 NULL, CONSTRAINT personal_money_pkey PRIMARY KEY (id), CONSTRAINT personal_money_person_id_fkey FOREIGN KEY (person_id) REFERENCES duylong.person(id));

-- Permissions

ALTER TABLE duylong.personal_money OWNER TO duylong;
GRANT ALL ON TABLE duylong.personal_money TO duylong;


-- duylong.personal_plan definition

-- Drop table

-- DROP TABLE duylong.personal_plan;

CREATE TABLE duylong.personal_plan ( id serial4 NOT NULL, "name" varchar(255) NULL, description varchar(2047) NULL, start_date date NULL, deadline date NULL, person_id int4 NULL, CONSTRAINT personal_plan_pkey PRIMARY KEY (id), CONSTRAINT personal_plan_person_id_fkey FOREIGN KEY (person_id) REFERENCES duylong.person(id));

-- Permissions

ALTER TABLE duylong.personal_plan OWNER TO duylong;
GRANT ALL ON TABLE duylong.personal_plan TO duylong;


-- duylong.personal_skill definition

-- Drop table

-- DROP TABLE duylong.personal_skill;

CREATE TABLE duylong.personal_skill ( id serial4 NOT NULL, "name" varchar(255) NULL, description varchar(2047) NULL, "level" varchar(255) NULL, personal_information_id int4 NULL, CONSTRAINT personal_skill_pkey PRIMARY KEY (id), CONSTRAINT personal_skill_personal_information_id_fkey FOREIGN KEY (personal_information_id) REFERENCES duylong.person_information(id));

-- Permissions

ALTER TABLE duylong.personal_skill OWNER TO duylong;
GRANT ALL ON TABLE duylong.personal_skill TO duylong;




-- Permissions

GRANT ALL ON SCHEMA duylong TO pg_database_owner;
GRANT USAGE ON SCHEMA duylong TO duylong;