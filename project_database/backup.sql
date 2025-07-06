--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13 (Homebrew)
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: mail_id_seq; Type: SEQUENCE; Schema: public; Owner: duylong
--

CREATE SEQUENCE public.mail_id_seq
    START WITH 3
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mail_id_seq OWNER TO duylong;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: person; Type: TABLE; Schema: public; Owner: duylong
--

CREATE TABLE public.person (
    id integer NOT NULL,
    name character varying(255),
    birthday date,
    sex character varying(15)
);


ALTER TABLE public.person OWNER TO duylong;

--
-- Name: person_mail; Type: TABLE; Schema: public; Owner: duylong
--

CREATE TABLE public.person_mail (
    id integer DEFAULT nextval('public.mail_id_seq'::regclass) NOT NULL,
    mail character varying(255) DEFAULT 'dev'::character varying NOT NULL,
    person_id integer,
    type character varying(255) DEFAULT 'dev'::character varying,
    status character varying(255) DEFAULT 'pending'::character varying NOT NULL
);


ALTER TABLE public.person_mail OWNER TO duylong;

--
-- Name: person_stuff_seq; Type: SEQUENCE; Schema: public; Owner: duylong
--

CREATE SEQUENCE public.person_stuff_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.person_stuff_seq OWNER TO duylong;

--
-- Name: person_stuff; Type: TABLE; Schema: public; Owner: duylong
--

CREATE TABLE public.person_stuff (
    id integer DEFAULT nextval('public.person_stuff_seq'::regclass) NOT NULL,
    name character varying(255) DEFAULT 'NewStuff'::character varying NOT NULL,
    buy_day date,
    price double precision
);


ALTER TABLE public.person_stuff OWNER TO duylong;

--
-- Name: personal_habit; Type: TABLE; Schema: public; Owner: duylong
--

CREATE TABLE public.personal_habit (
    id integer NOT NULL,
    name character varying(255),
    frequency character varying(255),
    person_plan_id integer
);


ALTER TABLE public.personal_habit OWNER TO duylong;

--
-- Name: personal_habit_id_seq; Type: SEQUENCE; Schema: public; Owner: duylong
--

CREATE SEQUENCE public.personal_habit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.personal_habit_id_seq OWNER TO duylong;

--
-- Name: personal_habit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: duylong
--

ALTER SEQUENCE public.personal_habit_id_seq OWNED BY public.personal_habit.id;


--
-- Name: personal_information; Type: TABLE; Schema: public; Owner: duylong
--

CREATE TABLE public.personal_information (
    id integer NOT NULL,
    name character varying(255),
    major character varying(255),
    person_id integer
);


ALTER TABLE public.personal_information OWNER TO duylong;

--
-- Name: personal_information_id_seq; Type: SEQUENCE; Schema: public; Owner: duylong
--

CREATE SEQUENCE public.personal_information_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.personal_information_id_seq OWNER TO duylong;

--
-- Name: personal_information_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: duylong
--

ALTER SEQUENCE public.personal_information_id_seq OWNED BY public.personal_information.id;


--
-- Name: personal_money; Type: TABLE; Schema: public; Owner: duylong
--

CREATE TABLE public.personal_money (
    id integer NOT NULL,
    name character varying(255),
    description character varying(2047),
    balance double precision,
    person_id integer
);


ALTER TABLE public.personal_money OWNER TO duylong;

--
-- Name: personal_money_id_seq; Type: SEQUENCE; Schema: public; Owner: duylong
--

CREATE SEQUENCE public.personal_money_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.personal_money_id_seq OWNER TO duylong;

--
-- Name: personal_money_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: duylong
--

ALTER SEQUENCE public.personal_money_id_seq OWNED BY public.personal_money.id;


--
-- Name: personal_plan; Type: TABLE; Schema: public; Owner: duylong
--

CREATE TABLE public.personal_plan (
    id integer NOT NULL,
    name character varying(255),
    description character varying(2047),
    start_date date,
    deadline date,
    person_id integer
);


ALTER TABLE public.personal_plan OWNER TO duylong;

--
-- Name: personal_plan_id_seq; Type: SEQUENCE; Schema: public; Owner: duylong
--

CREATE SEQUENCE public.personal_plan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.personal_plan_id_seq OWNER TO duylong;

--
-- Name: personal_plan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: duylong
--

ALTER SEQUENCE public.personal_plan_id_seq OWNED BY public.personal_plan.id;


--
-- Name: personal_property; Type: TABLE; Schema: public; Owner: duylong
--

CREATE TABLE public.personal_property (
    id integer NOT NULL,
    name character varying(255),
    category character varying(255),
    person_id integer
);


ALTER TABLE public.personal_property OWNER TO duylong;

--
-- Name: personal_property_id_seq; Type: SEQUENCE; Schema: public; Owner: duylong
--

CREATE SEQUENCE public.personal_property_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.personal_property_id_seq OWNER TO duylong;

--
-- Name: personal_property_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: duylong
--

ALTER SEQUENCE public.personal_property_id_seq OWNED BY public.personal_property.id;


--
-- Name: personal_skill; Type: TABLE; Schema: public; Owner: duylong
--

CREATE TABLE public.personal_skill (
    id integer NOT NULL,
    name character varying(255),
    description character varying(2047),
    level character varying(255),
    personal_information_id integer
);


ALTER TABLE public.personal_skill OWNER TO duylong;

--
-- Name: personal_skill_id_seq; Type: SEQUENCE; Schema: public; Owner: duylong
--

CREATE SEQUENCE public.personal_skill_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.personal_skill_id_seq OWNER TO duylong;

--
-- Name: personal_skill_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: duylong
--

ALTER SEQUENCE public.personal_skill_id_seq OWNED BY public.personal_skill.id;


--
-- Name: personal_habit id; Type: DEFAULT; Schema: public; Owner: duylong
--

ALTER TABLE ONLY public.personal_habit ALTER COLUMN id SET DEFAULT nextval('public.personal_habit_id_seq'::regclass);


--
-- Name: personal_information id; Type: DEFAULT; Schema: public; Owner: duylong
--

ALTER TABLE ONLY public.personal_information ALTER COLUMN id SET DEFAULT nextval('public.personal_information_id_seq'::regclass);


--
-- Name: personal_money id; Type: DEFAULT; Schema: public; Owner: duylong
--

ALTER TABLE ONLY public.personal_money ALTER COLUMN id SET DEFAULT nextval('public.personal_money_id_seq'::regclass);


--
-- Name: personal_plan id; Type: DEFAULT; Schema: public; Owner: duylong
--

ALTER TABLE ONLY public.personal_plan ALTER COLUMN id SET DEFAULT nextval('public.personal_plan_id_seq'::regclass);


--
-- Name: personal_property id; Type: DEFAULT; Schema: public; Owner: duylong
--

ALTER TABLE ONLY public.personal_property ALTER COLUMN id SET DEFAULT nextval('public.personal_property_id_seq'::regclass);


--
-- Name: personal_skill id; Type: DEFAULT; Schema: public; Owner: duylong
--

ALTER TABLE ONLY public.personal_skill ALTER COLUMN id SET DEFAULT nextval('public.personal_skill_id_seq'::regclass);


--
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: duylong
--

COPY public.person (id, name, birthday, sex) FROM stdin;
1	Ngô Đoàn Duy Long	2001-03-04	male
\.


--
-- Data for Name: person_mail; Type: TABLE DATA; Schema: public; Owner: duylong
--

COPY public.person_mail (id, mail, person_id, type, status) FROM stdin;
1	duylong@gworkspace.duylong.art	1	GoogleWorkspace	active
2	duylong@microsoft.duylong.art	1	Microsoft365	inactive
\.


--
-- Data for Name: person_stuff; Type: TABLE DATA; Schema: public; Owner: duylong
--

COPY public.person_stuff (id, name, buy_day, price) FROM stdin;
1	M3Mouse	\N	1100000
\.


--
-- Data for Name: personal_habit; Type: TABLE DATA; Schema: public; Owner: duylong
--

COPY public.personal_habit (id, name, frequency, person_plan_id) FROM stdin;
\.


--
-- Data for Name: personal_information; Type: TABLE DATA; Schema: public; Owner: duylong
--

COPY public.personal_information (id, name, major, person_id) FROM stdin;
\.


--
-- Data for Name: personal_money; Type: TABLE DATA; Schema: public; Owner: duylong
--

COPY public.personal_money (id, name, description, balance, person_id) FROM stdin;
\.


--
-- Data for Name: personal_plan; Type: TABLE DATA; Schema: public; Owner: duylong
--

COPY public.personal_plan (id, name, description, start_date, deadline, person_id) FROM stdin;
\.


--
-- Data for Name: personal_property; Type: TABLE DATA; Schema: public; Owner: duylong
--

COPY public.personal_property (id, name, category, person_id) FROM stdin;
\.


--
-- Data for Name: personal_skill; Type: TABLE DATA; Schema: public; Owner: duylong
--

COPY public.personal_skill (id, name, description, level, personal_information_id) FROM stdin;
\.


--
-- Name: mail_id_seq; Type: SEQUENCE SET; Schema: public; Owner: duylong
--

SELECT pg_catalog.setval('public.mail_id_seq', 3, true);


--
-- Name: person_stuff_seq; Type: SEQUENCE SET; Schema: public; Owner: duylong
--

SELECT pg_catalog.setval('public.person_stuff_seq', 1, true);


--
-- Name: personal_habit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: duylong
--

SELECT pg_catalog.setval('public.personal_habit_id_seq', 1, false);


--
-- Name: personal_information_id_seq; Type: SEQUENCE SET; Schema: public; Owner: duylong
--

SELECT pg_catalog.setval('public.personal_information_id_seq', 1, false);


--
-- Name: personal_money_id_seq; Type: SEQUENCE SET; Schema: public; Owner: duylong
--

SELECT pg_catalog.setval('public.personal_money_id_seq', 1, false);


--
-- Name: personal_plan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: duylong
--

SELECT pg_catalog.setval('public.personal_plan_id_seq', 1, false);


--
-- Name: personal_property_id_seq; Type: SEQUENCE SET; Schema: public; Owner: duylong
--

SELECT pg_catalog.setval('public.personal_property_id_seq', 1, false);


--
-- Name: personal_skill_id_seq; Type: SEQUENCE SET; Schema: public; Owner: duylong
--

SELECT pg_catalog.setval('public.personal_skill_id_seq', 1, false);


--
-- Name: person_mail person_mail_pk; Type: CONSTRAINT; Schema: public; Owner: duylong
--

ALTER TABLE ONLY public.person_mail
    ADD CONSTRAINT person_mail_pk PRIMARY KEY (id);


--
-- Name: person person_pkey; Type: CONSTRAINT; Schema: public; Owner: duylong
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT person_pkey PRIMARY KEY (id);


--
-- Name: personal_habit personal_habit_pkey; Type: CONSTRAINT; Schema: public; Owner: duylong
--

ALTER TABLE ONLY public.personal_habit
    ADD CONSTRAINT personal_habit_pkey PRIMARY KEY (id);


--
-- Name: personal_information personal_information_pkey; Type: CONSTRAINT; Schema: public; Owner: duylong
--

ALTER TABLE ONLY public.personal_information
    ADD CONSTRAINT personal_information_pkey PRIMARY KEY (id);


--
-- Name: personal_money personal_money_pkey; Type: CONSTRAINT; Schema: public; Owner: duylong
--

ALTER TABLE ONLY public.personal_money
    ADD CONSTRAINT personal_money_pkey PRIMARY KEY (id);


--
-- Name: personal_plan personal_plan_pkey; Type: CONSTRAINT; Schema: public; Owner: duylong
--

ALTER TABLE ONLY public.personal_plan
    ADD CONSTRAINT personal_plan_pkey PRIMARY KEY (id);


--
-- Name: personal_property personal_property_pkey; Type: CONSTRAINT; Schema: public; Owner: duylong
--

ALTER TABLE ONLY public.personal_property
    ADD CONSTRAINT personal_property_pkey PRIMARY KEY (id);


--
-- Name: personal_skill personal_skill_pkey; Type: CONSTRAINT; Schema: public; Owner: duylong
--

ALTER TABLE ONLY public.personal_skill
    ADD CONSTRAINT personal_skill_pkey PRIMARY KEY (id);


--
-- Name: person_stuff personal_stuff_pkey; Type: CONSTRAINT; Schema: public; Owner: duylong
--

ALTER TABLE ONLY public.person_stuff
    ADD CONSTRAINT personal_stuff_pkey PRIMARY KEY (id);


--
-- Name: person_mail person_mail_fk; Type: FK CONSTRAINT; Schema: public; Owner: duylong
--

ALTER TABLE ONLY public.person_mail
    ADD CONSTRAINT person_mail_fk FOREIGN KEY (person_id) REFERENCES public.person(id);


--
-- Name: personal_habit personal_habit_person_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: duylong
--

ALTER TABLE ONLY public.personal_habit
    ADD CONSTRAINT personal_habit_person_plan_id_fkey FOREIGN KEY (person_plan_id) REFERENCES public.person(id);


--
-- Name: personal_information personal_information_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: duylong
--

ALTER TABLE ONLY public.personal_information
    ADD CONSTRAINT personal_information_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.person(id);


--
-- Name: personal_money personal_money_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: duylong
--

ALTER TABLE ONLY public.personal_money
    ADD CONSTRAINT personal_money_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.person(id);


--
-- Name: personal_plan personal_plan_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: duylong
--

ALTER TABLE ONLY public.personal_plan
    ADD CONSTRAINT personal_plan_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.person(id);


--
-- Name: personal_property personal_property_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: duylong
--

ALTER TABLE ONLY public.personal_property
    ADD CONSTRAINT personal_property_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.person(id);


--
-- Name: personal_skill personal_skill_personal_information_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: duylong
--

ALTER TABLE ONLY public.personal_skill
    ADD CONSTRAINT personal_skill_personal_information_id_fkey FOREIGN KEY (personal_information_id) REFERENCES public.personal_information(id);


--
-- PostgreSQL database dump complete
--

