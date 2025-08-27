-- DROP SCHEMA person;

CREATE SCHEMA person AUTHORIZATION pg_database_owner;

COMMENT ON SCHEMA person IS 'standard public schema';

-- DROP TYPE person."post_status";

CREATE TYPE person."post_status" AS ENUM (
	'draft',
	'published',
	'archived');

-- DROP TYPE person."role";

CREATE TYPE person."role" AS ENUM (
	'user',
	'admin');

-- DROP TYPE person."role_data";

CREATE TYPE person."role_data" AS ENUM (
	'user',
	'admin');

-- DROP SEQUENCE person.blog_id_seq;

CREATE SEQUENCE person.blog_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE person.blog_id_seq OWNER TO duylong;
GRANT ALL ON SEQUENCE person.blog_id_seq TO duylong;

-- DROP SEQUENCE person.mail_id_seq;

CREATE SEQUENCE person.mail_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 3
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE person.mail_id_seq OWNER TO duylong;
GRANT ALL ON SEQUENCE person.mail_id_seq TO duylong;

-- DROP SEQUENCE person.main_role_id_seq;

CREATE SEQUENCE person.main_role_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE person.main_role_id_seq OWNER TO duylong;
GRANT ALL ON SEQUENCE person.main_role_id_seq TO duylong;

-- DROP SEQUENCE person.person_account_id_seq;

CREATE SEQUENCE person.person_account_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE person.person_account_id_seq OWNER TO duylong;
GRANT ALL ON SEQUENCE person.person_account_id_seq TO duylong;

-- DROP SEQUENCE person.person_stuff_seq;

CREATE SEQUENCE person.person_stuff_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE person.person_stuff_seq OWNER TO duylong;
GRANT ALL ON SEQUENCE person.person_stuff_seq TO duylong;

-- DROP SEQUENCE person.personal_habit_id_seq;

CREATE SEQUENCE person.personal_habit_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE person.personal_habit_id_seq OWNER TO duylong;
GRANT ALL ON SEQUENCE person.personal_habit_id_seq TO duylong;

-- DROP SEQUENCE person.personal_information_id_seq;

CREATE SEQUENCE person.personal_information_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE person.personal_information_id_seq OWNER TO duylong;
GRANT ALL ON SEQUENCE person.personal_information_id_seq TO duylong;

-- DROP SEQUENCE person.personal_money_id_seq;

CREATE SEQUENCE person.personal_money_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE person.personal_money_id_seq OWNER TO duylong;
GRANT ALL ON SEQUENCE person.personal_money_id_seq TO duylong;

-- DROP SEQUENCE person.personal_plan_id_seq;

CREATE SEQUENCE person.personal_plan_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE person.personal_plan_id_seq OWNER TO duylong;
GRANT ALL ON SEQUENCE person.personal_plan_id_seq TO duylong;

-- DROP SEQUENCE person.personal_property_id_seq;

CREATE SEQUENCE person.personal_property_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE person.personal_property_id_seq OWNER TO duylong;
GRANT ALL ON SEQUENCE person.personal_property_id_seq TO duylong;

-- DROP SEQUENCE person.personal_skill_id_seq;

CREATE SEQUENCE person.personal_skill_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE person.personal_skill_id_seq OWNER TO duylong;
GRANT ALL ON SEQUENCE person.personal_skill_id_seq TO duylong;

-- DROP SEQUENCE person.url_id_seq;

CREATE SEQUENCE person.url_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE person.url_id_seq OWNER TO duylong;
GRANT ALL ON SEQUENCE person.url_id_seq TO duylong;

-- DROP SEQUENCE person.widget_id_seq;

CREATE SEQUENCE person.widget_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE person.widget_id_seq OWNER TO duylong;
GRANT ALL ON SEQUENCE person.widget_id_seq TO duylong;
-- person.blog definition

-- Drop table

-- DROP TABLE person.blog;

CREATE TABLE person.blog ( id bigserial NOT NULL, author_id int8 NOT NULL, title varchar(255) NOT NULL, "content" text NOT NULL, slug varchar(255) NOT NULL, status person."post_status" DEFAULT 'draft'::person.post_status NOT NULL, published_at timestamptz NULL, created_at timestamptz DEFAULT now() NOT NULL, updated_at timestamptz DEFAULT now() NOT NULL, CONSTRAINT blog_pkey PRIMARY KEY (id), CONSTRAINT blog_slug_key UNIQUE (slug));
CREATE INDEX idx_posts_author_id ON person.blog USING btree (author_id);
CREATE INDEX idx_posts_status ON person.blog USING btree (status);
COMMENT ON TABLE person.blog IS 'Stores all blog posts for the application.';

-- Column comments

COMMENT ON COLUMN person.blog.id IS 'Unique identifier for each blog post.';
COMMENT ON COLUMN person.blog.author_id IS 'Foreign key referencing the author in the users table.';
COMMENT ON COLUMN person.blog.slug IS 'URL-friendly identifier for the post, derived from the title.';
COMMENT ON COLUMN person.blog.status IS 'The current status of the post (e.g., draft, published).';
COMMENT ON COLUMN person.blog.published_at IS 'The exact time the post was made public.';

-- Table Triggers

create trigger update_blog_updated_at before
update
    on
    person.blog for each row execute function person.update_updated_at_column();

-- Permissions

ALTER TABLE person.blog OWNER TO duylong;
GRANT ALL ON TABLE person.blog TO duylong;


-- person.person definition

-- Drop table

-- DROP TABLE person.person;

CREATE TABLE person.person ( id int4 NOT NULL, "name" varchar(255) NULL, birthday date NULL, sex varchar(15) NULL, alias text DEFAULT 'other'::text NOT NULL, CONSTRAINT person_pkey PRIMARY KEY (id));

-- Permissions

ALTER TABLE person.person OWNER TO duylong;
GRANT ALL ON TABLE person.person TO duylong;


-- person.url definition

-- Drop table

-- DROP TABLE person.url;

CREATE TABLE person.url ( id bigserial NOT NULL, url_value varchar DEFAULT 'https://www.google.com/'::character varying NOT NULL, host varchar DEFAULT 'localhost'::character varying NOT NULL, "path" varchar DEFAULT '/'::character varying NOT NULL, port int8 DEFAULT 8080 NOT NULL, protocol varchar DEFAULT 'https'::character varying NOT NULL, CONSTRAINT url_pk PRIMARY KEY (id));

-- Permissions

ALTER TABLE person.url OWNER TO duylong;
GRANT ALL ON TABLE person.url TO duylong;


-- person.widget definition

-- Drop table

-- DROP TABLE person.widget;

CREATE TABLE person.widget ( id bigserial NOT NULL, role_id int8 NOT NULL, url_id int8 NULL, CONSTRAINT widget_pk PRIMARY KEY (id), CONSTRAINT widget_unique UNIQUE (role_id));

-- Permissions

ALTER TABLE person.widget OWNER TO duylong;
GRANT ALL ON TABLE person.widget TO duylong;


-- person.main_role definition

-- Drop table

-- DROP TABLE person.main_role;

CREATE TABLE person.main_role ( id int8 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1 NO CYCLE) NOT NULL, "name" varchar DEFAULT 'NORMAL'::character varying NULL, person_id int4 NULL, "role" person."role_data" NOT NULL, CONSTRAINT main_role_pk PRIMARY KEY (id), CONSTRAINT main_role_person_fk FOREIGN KEY (person_id) REFERENCES person.person(id) ON DELETE CASCADE ON UPDATE CASCADE);

-- Permissions

ALTER TABLE person.main_role OWNER TO duylong;
GRANT ALL ON TABLE person.main_role TO duylong;


-- person.person_account definition

-- Drop table

-- DROP TABLE person.person_account;

CREATE TABLE person.person_account ( id int8 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1 NO CYCLE) NOT NULL, username varchar DEFAULT 'NewUserName'::character varying NOT NULL, "password" varchar DEFAULT 'NewPassWord'::character varying NOT NULL, mail_id int8 NULL, person_id int4 NULL, CONSTRAINT person_account_pk PRIMARY KEY (id), CONSTRAINT person_account_person_fk FOREIGN KEY (person_id) REFERENCES person.person(id) ON DELETE CASCADE ON UPDATE CASCADE);

-- Permissions

ALTER TABLE person.person_account OWNER TO duylong;
GRANT ALL ON TABLE person.person_account TO duylong;


-- person.person_information definition

-- Drop table

-- DROP TABLE person.person_information;

CREATE TABLE person.person_information ( id int4 DEFAULT nextval('person.personal_information_id_seq'::regclass) NOT NULL, "name" varchar(255) NULL, major varchar(255) NULL, person_id int8 NULL, money_id int8 NULL, properties_id int8 NULL, mail_id int8 NULL, alias_id varchar DEFAULT ''::character varying NOT NULL, CONSTRAINT personal_information_pkey PRIMARY KEY (id), CONSTRAINT personal_information_person_id_fkey FOREIGN KEY (person_id) REFERENCES person.person(id));

-- Column comments

COMMENT ON COLUMN person.person_information.alias_id IS 'String Id combine with id for join table';

-- Permissions

ALTER TABLE person.person_information OWNER TO duylong;
GRANT ALL ON TABLE person.person_information TO duylong;


-- person.person_mail definition

-- Drop table

-- DROP TABLE person.person_mail;

CREATE TABLE person.person_mail ( id int4 DEFAULT nextval('person.mail_id_seq'::regclass) NOT NULL, mail varchar(255) DEFAULT 'dev'::character varying NOT NULL, person_id int4 NULL, "type" varchar(255) DEFAULT 'dev'::character varying NULL, status varchar(255) DEFAULT 'pending'::character varying NOT NULL, CONSTRAINT person_mail_pk PRIMARY KEY (id), CONSTRAINT person_mail_fk FOREIGN KEY (person_id) REFERENCES person.person(id));

-- Permissions

ALTER TABLE person.person_mail OWNER TO duylong;
GRANT SELECT, TRUNCATE, REFERENCES, UPDATE, TRIGGER, DELETE, INSERT ON TABLE person.person_mail TO duylong;


-- person.person_property definition

-- Drop table

-- DROP TABLE person.person_property;

CREATE TABLE person.person_property ( id int4 DEFAULT nextval('person.personal_property_id_seq'::regclass) NOT NULL, "name" varchar(255) NULL, category varchar(255) NULL, person_id int4 NULL, CONSTRAINT personal_property_pkey PRIMARY KEY (id), CONSTRAINT person_property_person_fk FOREIGN KEY (id) REFERENCES person.person(id) ON DELETE CASCADE ON UPDATE CASCADE);

-- Permissions

ALTER TABLE person.person_property OWNER TO duylong;
GRANT ALL ON TABLE person.person_property TO duylong;


-- person.person_stuff definition

-- Drop table

-- DROP TABLE person.person_stuff;

CREATE TABLE person.person_stuff ( id int4 DEFAULT nextval('person.person_stuff_seq'::regclass) NOT NULL, "name" varchar(255) DEFAULT 'NewStuff'::character varying NOT NULL, buy_day date DEFAULT '9999-12-31'::date NULL, price numeric(20, 4) DEFAULT 999999999.9999 NULL, currency_unit varchar(15) DEFAULT 'VND'::character varying NOT NULL, person_property_id int4 NULL, CONSTRAINT personal_stuff_pkey PRIMARY KEY (id), CONSTRAINT person_stuff_person_property_id_fkey FOREIGN KEY (person_property_id) REFERENCES person.person_property(id) ON DELETE CASCADE ON UPDATE CASCADE);

-- Permissions

ALTER TABLE person.person_stuff OWNER TO duylong;
GRANT ALL ON TABLE person.person_stuff TO duylong;


-- person.personal_habit definition

-- Drop table

-- DROP TABLE person.personal_habit;

CREATE TABLE person.personal_habit ( id serial4 NOT NULL, "name" varchar(255) NULL, frequency varchar(255) NULL, person_plan_id int4 NULL, CONSTRAINT personal_habit_pkey PRIMARY KEY (id), CONSTRAINT personal_habit_person_plan_id_fkey FOREIGN KEY (person_plan_id) REFERENCES person.person(id));

-- Permissions

ALTER TABLE person.personal_habit OWNER TO duylong;
GRANT ALL ON TABLE person.personal_habit TO duylong;


-- person.personal_money definition

-- Drop table

-- DROP TABLE person.personal_money;

CREATE TABLE person.personal_money ( id serial4 NOT NULL, "name" varchar(255) NULL, description varchar(2047) NULL, balance float8 NULL, person_id int4 NULL, CONSTRAINT personal_money_pkey PRIMARY KEY (id), CONSTRAINT personal_money_person_id_fkey FOREIGN KEY (person_id) REFERENCES person.person(id));

-- Permissions

ALTER TABLE person.personal_money OWNER TO duylong;
GRANT ALL ON TABLE person.personal_money TO duylong;


-- person.personal_plan definition

-- Drop table

-- DROP TABLE person.personal_plan;

CREATE TABLE person.personal_plan ( id serial4 NOT NULL, "name" varchar(255) NULL, description varchar(2047) NULL, start_date date NULL, deadline date NULL, person_id int4 NULL, CONSTRAINT personal_plan_pkey PRIMARY KEY (id), CONSTRAINT personal_plan_person_id_fkey FOREIGN KEY (person_id) REFERENCES person.person(id));

-- Permissions

ALTER TABLE person.personal_plan OWNER TO duylong;
GRANT ALL ON TABLE person.personal_plan TO duylong;


-- person.personal_skill definition

-- Drop table

-- DROP TABLE person.personal_skill;

CREATE TABLE person.personal_skill ( id serial4 NOT NULL, "name" varchar(255) NULL, description varchar(2047) NULL, "level" varchar(255) NULL, personal_information_id int4 NULL, CONSTRAINT personal_skill_pkey PRIMARY KEY (id), CONSTRAINT personal_skill_personal_information_id_fkey FOREIGN KEY (personal_information_id) REFERENCES person.person_information(id));

-- Permissions

ALTER TABLE person.personal_skill OWNER TO duylong;
GRANT ALL ON TABLE person.personal_skill TO duylong;



-- DROP FUNCTION person.update_updated_at_column();

CREATE OR REPLACE FUNCTION person.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$function$
;

-- Permissions

ALTER FUNCTION person.update_updated_at_column() OWNER TO duylong;
GRANT ALL ON FUNCTION person.update_updated_at_column() TO duylong;


-- Permissions

GRANT ALL ON SCHEMA person TO pg_database_owner;
GRANT USAGE ON SCHEMA person TO public;