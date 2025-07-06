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
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: duylong
--

COPY public.person (id, name, birthday, sex) FROM stdin;
1	Ngô Đoàn Duy Long	2001-03-04	male
\.


--
-- Name: person person_pkey; Type: CONSTRAINT; Schema: public; Owner: duylong
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT person_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

