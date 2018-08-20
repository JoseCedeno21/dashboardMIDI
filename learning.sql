--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.14
-- Dumped by pg_dump version 10.4

-- Started on 2018-08-20 16:12:18

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 189 (class 1259 OID 16733)
-- Name: learning; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.learning (
    "createdAt" bigint,
    "updatedAt" bigint,
    id integer NOT NULL,
    nombre text,
    descripcion text,
    id_chapter real,
    duracion real
);


ALTER TABLE public.learning OWNER TO postgres;

--
-- TOC entry 2145 (class 0 OID 16733)
-- Dependencies: 189
-- Data for Name: learning; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.learning ("createdAt", "updatedAt", id, nombre, descripcion, id_chapter, duracion) FROM stdin;
1531973210185	1531973210185	1	Ecuador   	Escucha y observa sobre el Ecuador                	1	160
1531973210185	1531973210185	2	Medicina  	Escucha y observa sobre la medicina               	2	210
1531973210185	1531973210185	3	Valores   	Escucha y observa sobre los valores               	3	180
1531973210185	1531973210185	4	Emergencia	Escucha y observa sobre las emergencias           	5	150
1531973210185	1531973210185	5	Hogar     	Escucha y observa sobre el hogar                  	6	220
1531973210185	1531973210185	6	Deberes   	Escucha y observa sobre los deberes               	4	190
\.


--
-- TOC entry 2030 (class 2606 OID 16786)
-- Name: learning learning_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning
    ADD CONSTRAINT learning_pkey PRIMARY KEY (id);


-- Completed on 2018-08-20 16:12:19

--
-- PostgreSQL database dump complete
--

