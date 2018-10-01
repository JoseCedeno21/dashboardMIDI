--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.14
-- Dumped by pg_dump version 10.4

-- Started on 2018-10-01 12:04:16

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 17158)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2297 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 185 (class 1259 OID 17758)
-- Name: caracteristica; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.caracteristica (
    id integer NOT NULL,
    nombre text,
    descripcion text
);


ALTER TABLE public.caracteristica OWNER TO postgres;

--
-- TOC entry 186 (class 1259 OID 17764)
-- Name: caracteristica_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.caracteristica_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.caracteristica_id_seq OWNER TO postgres;

--
-- TOC entry 2298 (class 0 OID 0)
-- Dependencies: 186
-- Name: caracteristica_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.caracteristica_id_seq OWNED BY public.caracteristica.id;


--
-- TOC entry 187 (class 1259 OID 17766)
-- Name: chapter; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chapter (
    id integer NOT NULL,
    nombre text,
    descripcion text,
    id_game integer
);


ALTER TABLE public.chapter OWNER TO postgres;

--
-- TOC entry 188 (class 1259 OID 17772)
-- Name: chapter_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chapter_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chapter_id_seq OWNER TO postgres;

--
-- TOC entry 2299 (class 0 OID 0)
-- Dependencies: 188
-- Name: chapter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chapter_id_seq OWNED BY public.chapter.id;


--
-- TOC entry 184 (class 1259 OID 17330)
-- Name: type_room_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.type_room_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.type_room_id_seq OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 17851)
-- Name: escenario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.escenario (
    id integer DEFAULT nextval('public.type_room_id_seq'::regclass) NOT NULL,
    codigo text,
    descripcion text,
    nombre text
);


ALTER TABLE public.escenario OWNER TO postgres;

--
-- TOC entry 181 (class 1259 OID 17179)
-- Name: escuela_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.escuela_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.escuela_id_seq OWNER TO postgres;

--
-- TOC entry 189 (class 1259 OID 17774)
-- Name: escuela; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.escuela (
    id integer DEFAULT nextval('public.escuela_id_seq'::regclass) NOT NULL,
    codigo text,
    descripcion text,
    nombre text
);


ALTER TABLE public.escuela OWNER TO postgres;

--
-- TOC entry 182 (class 1259 OID 17188)
-- Name: escuela_room_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.escuela_room_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.escuela_room_id_seq OWNER TO postgres;

--
-- TOC entry 190 (class 1259 OID 17788)
-- Name: game; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.game (
    id integer NOT NULL,
    nombre text,
    descripcion text
);


ALTER TABLE public.game OWNER TO postgres;

--
-- TOC entry 191 (class 1259 OID 17794)
-- Name: game_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.game_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.game_id_seq OWNER TO postgres;

--
-- TOC entry 2300 (class 0 OID 0)
-- Dependencies: 191
-- Name: game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.game_id_seq OWNED BY public.game.id;


--
-- TOC entry 183 (class 1259 OID 17205)
-- Name: jugador_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.jugador_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.jugador_id_seq OWNER TO postgres;

--
-- TOC entry 192 (class 1259 OID 17796)
-- Name: jugador; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jugador (
    id integer DEFAULT nextval('public.jugador_id_seq'::regclass) NOT NULL,
    avatar text,
    nombre text,
    id_room integer,
    puntos real,
    id_registro real,
    id_escuela integer
);


ALTER TABLE public.jugador OWNER TO postgres;

--
-- TOC entry 193 (class 1259 OID 17803)
-- Name: learn_jugador; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.learn_jugador (
    id integer NOT NULL,
    id_jugador integer,
    id_learning integer,
    fecha_inicio date,
    fecha_fin date,
    tiempo_juego real,
    estado text,
    num_play real
);


ALTER TABLE public.learn_jugador OWNER TO postgres;

--
-- TOC entry 194 (class 1259 OID 17809)
-- Name: learn_jugador_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.learn_jugador_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.learn_jugador_id_seq OWNER TO postgres;

--
-- TOC entry 2301 (class 0 OID 0)
-- Dependencies: 194
-- Name: learn_jugador_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.learn_jugador_id_seq OWNED BY public.learn_jugador.id;


--
-- TOC entry 195 (class 1259 OID 17811)
-- Name: learning; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.learning (
    id integer NOT NULL,
    nombre text,
    descripcion text,
    id_chapter integer,
    duracion real
);


ALTER TABLE public.learning OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 17817)
-- Name: learning_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.learning_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.learning_id_seq OWNER TO postgres;

--
-- TOC entry 2302 (class 0 OID 0)
-- Dependencies: 196
-- Name: learning_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.learning_id_seq OWNED BY public.learning.id;


--
-- TOC entry 197 (class 1259 OID 17819)
-- Name: metrica; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.metrica (
    id integer NOT NULL,
    nombre text,
    proposito text,
    formula text,
    interpretacion text,
    id_caracteristica integer
);


ALTER TABLE public.metrica OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 17825)
-- Name: metrica_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.metrica_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.metrica_id_seq OWNER TO postgres;

--
-- TOC entry 2303 (class 0 OID 0)
-- Dependencies: 198
-- Name: metrica_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.metrica_id_seq OWNED BY public.metrica.id;


--
-- TOC entry 199 (class 1259 OID 17827)
-- Name: nivel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nivel (
    id integer NOT NULL,
    nombre text,
    descripcion text,
    id_chapter integer,
    id_learning integer
);


ALTER TABLE public.nivel OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 17833)
-- Name: nivel_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nivel_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nivel_id_seq OWNER TO postgres;

--
-- TOC entry 2304 (class 0 OID 0)
-- Dependencies: 200
-- Name: nivel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nivel_id_seq OWNED BY public.nivel.id;


--
-- TOC entry 201 (class 1259 OID 17835)
-- Name: nivel_usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nivel_usuario (
    id integer NOT NULL,
    id_usuario integer,
    id_nivel integer,
    fecha_inicio date,
    fecha_fin date,
    tiempo_juego real,
    estado text,
    correctas real,
    incorrectas real,
    intentos real
);


ALTER TABLE public.nivel_usuario OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 17841)
-- Name: nivel_usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nivel_usuario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nivel_usuario_id_seq OWNER TO postgres;

--
-- TOC entry 2305 (class 0 OID 0)
-- Dependencies: 202
-- Name: nivel_usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nivel_usuario_id_seq OWNED BY public.nivel_usuario.id;


--
-- TOC entry 203 (class 1259 OID 17843)
-- Name: room; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.room (
    id integer NOT NULL,
    nombre text,
    descripcion text,
    edad real,
    id_escuela integer,
    id_escenario integer,
    id_juego integer
);


ALTER TABLE public.room OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 17849)
-- Name: room_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.room_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.room_id_seq OWNER TO postgres;

--
-- TOC entry 2306 (class 0 OID 0)
-- Dependencies: 204
-- Name: room_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.room_id_seq OWNED BY public.room.id;


--
-- TOC entry 206 (class 1259 OID 17858)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    "createdAt" bigint,
    "updatedAt" bigint,
    id integer NOT NULL,
    "emailAddress" text,
    password text,
    "fullName" text,
    "isSuperAdmin" boolean,
    "passwordResetToken" text,
    "passwordResetTokenExpiresAt" real,
    "stripeCustomerId" text,
    "hasBillingCard" boolean,
    "billingCardBrand" text,
    "billingCardLast4" text,
    "billingCardExpMonth" text,
    "billingCardExpYear" text,
    "emailProofToken" text,
    "emailProofTokenExpiresAt" real,
    "emailStatus" text,
    "emailChangeCandidate" text,
    "tosAcceptedByIp" text,
    "lastSeenAt" real
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 17864)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- TOC entry 2307 (class 0 OID 0)
-- Dependencies: 207
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 208 (class 1259 OID 17866)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    "createdAt" bigint,
    "updatedAt" bigint,
    id integer NOT NULL,
    correo text,
    password text,
    nombre text,
    "passwordResetToken" text,
    "passwordResetTokenExpiresAt" real,
    "emailProofToken" text,
    "emailProofTokenExpiresAt" real,
    "emailStatus" text,
    "emailChangeCandidate" text,
    "tosAcceptedByIp" text,
    "isSuperAdmin" boolean
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 17872)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuarios_id_seq OWNER TO postgres;

--
-- TOC entry 2308 (class 0 OID 0)
-- Dependencies: 209
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- TOC entry 2075 (class 2604 OID 17874)
-- Name: caracteristica id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.caracteristica ALTER COLUMN id SET DEFAULT nextval('public.caracteristica_id_seq'::regclass);


--
-- TOC entry 2076 (class 2604 OID 17875)
-- Name: chapter id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chapter ALTER COLUMN id SET DEFAULT nextval('public.chapter_id_seq'::regclass);


--
-- TOC entry 2078 (class 2604 OID 17876)
-- Name: game id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game ALTER COLUMN id SET DEFAULT nextval('public.game_id_seq'::regclass);


--
-- TOC entry 2080 (class 2604 OID 17877)
-- Name: learn_jugador id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learn_jugador ALTER COLUMN id SET DEFAULT nextval('public.learn_jugador_id_seq'::regclass);


--
-- TOC entry 2081 (class 2604 OID 17878)
-- Name: learning id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning ALTER COLUMN id SET DEFAULT nextval('public.learning_id_seq'::regclass);


--
-- TOC entry 2082 (class 2604 OID 17879)
-- Name: metrica id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metrica ALTER COLUMN id SET DEFAULT nextval('public.metrica_id_seq'::regclass);


--
-- TOC entry 2083 (class 2604 OID 17880)
-- Name: nivel id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nivel ALTER COLUMN id SET DEFAULT nextval('public.nivel_id_seq'::regclass);


--
-- TOC entry 2084 (class 2604 OID 17881)
-- Name: nivel_usuario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nivel_usuario ALTER COLUMN id SET DEFAULT nextval('public.nivel_usuario_id_seq'::regclass);


--
-- TOC entry 2085 (class 2604 OID 17882)
-- Name: room id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room ALTER COLUMN id SET DEFAULT nextval('public.room_id_seq'::regclass);


--
-- TOC entry 2087 (class 2604 OID 17883)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 2088 (class 2604 OID 17884)
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- TOC entry 2265 (class 0 OID 17758)
-- Dependencies: 185
-- Data for Name: caracteristica; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.caracteristica (id, nombre, descripcion) FROM stdin;
1	Eficiencia	Grado con el que pueden lograr las metas propuestas invirtiendo una cantidad apropiada de recursos en relación a la efectividad lograda.
2	Efectividad	Grado en el que pueden lograr las metas propuestas con precisión \ny completitud.
3	Flexibilidad	Grado con el que se pueden variar las condiciones por prueba.
4	Satisfacción	Grado con el que los jugadores se sienten bien al terminar una meta.
5	Learning	Grado con el que a los jugadores les fue útil la parte de la enseñanza previa.
\.


--
-- TOC entry 2267 (class 0 OID 17766)
-- Dependencies: 187
-- Data for Name: chapter; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chapter (id, nombre, descripcion, id_game) FROM stdin;
\.


--
-- TOC entry 2285 (class 0 OID 17851)
-- Dependencies: 205
-- Data for Name: escenario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.escenario (id, codigo, descripcion, nombre) FROM stdin;
4	R0	Aula virtual libre	Aula virtual libre
\.


--
-- TOC entry 2269 (class 0 OID 17774)
-- Dependencies: 189
-- Data for Name: escuela; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.escuela (id, codigo, descripcion, nombre) FROM stdin;
3	ES000	Para jugadores independientes	Escuela Libre
\.


--
-- TOC entry 2270 (class 0 OID 17788)
-- Dependencies: 190
-- Data for Name: game; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.game (id, nombre, descripcion) FROM stdin;
\.


--
-- TOC entry 2272 (class 0 OID 17796)
-- Dependencies: 192
-- Data for Name: jugador; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jugador (id, avatar, nombre, id_room, puntos, id_registro, id_escuela) FROM stdin;
\.


--
-- TOC entry 2273 (class 0 OID 17803)
-- Dependencies: 193
-- Data for Name: learn_jugador; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.learn_jugador (id, id_jugador, id_learning, fecha_inicio, fecha_fin, tiempo_juego, estado, num_play) FROM stdin;
\.


--
-- TOC entry 2275 (class 0 OID 17811)
-- Dependencies: 195
-- Data for Name: learning; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.learning (id, nombre, descripcion, id_chapter, duracion) FROM stdin;
\.


--
-- TOC entry 2277 (class 0 OID 17819)
-- Dependencies: 197
-- Data for Name: metrica; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.metrica (id, nombre, proposito, formula, interpretacion, id_caracteristica) FROM stdin;
1	Tiempo de meta	¿Cuánto tiempo requiere el jugador para lograr la meta?	tiempo_juego_ok	Tiempo de juego en el nivel completado	1
2	Eficiencia de meta por respuestas correctas	¿Cómo de eficientes son los usuarios en el nivel?	correctas_ok / tiempo_juego	Respuestas correctas en un nivel completado vs tiempo que tomó completarlo	1
3	Eficiencia de meta por respuestas incorrectas	¿Qué tan poco eficientes son los usuarios en el nivel?	incorrectas_ok / tiempo_juego	Respuestas incorrectas en un nivel completado vs tiempo que tomó completarlo	1
4	Eficiencia relativa a los mejores resultados de jugadores	¿Qué porcentaje de jugadores lo hicieron bastante rápido?	jugadores_OK / total_jugadores	Número de mejores jugadores vs total de jugadores	1
5	Eficiencia relativa a los jugadores con dificultades en el nivel	¿Qué porcentaje de jugadores tuvieron dificultades?	jugadores_BAD / total_jugadores	Número de jugadores que tuvieron dificultades vs total de jugadores	1
6	Efectividad de la meta	¿Qué porcentaje de metas y retos se han alcanzado correctamente?	correctas / (correctas + incorrectas)	Relacion del total de respuestas correctas vs el total de intentos	2
7	Completitud de la meta	¿Qué porcentaje de metas y retos se han completado?	n_completos / n_user	Numero de usuarios que completaron vs numero de usuarios totales	2
8	Frecuencia de intentos para llegar a la meta	¿Cuál ha sido la frecuencia de intentos?	intentos_ok / correctas_ok	Numero de intentos en niveles completados vs numero de r. correctas en niveles completados	2
9	Flexibilidad por metas	¿Qué porcentaje de metas se logran utilizando distintas formas de interacción diferentes a las usadas por defecto?	correctas / (correctas + incorrectas)	Número r. correctas en rooms por defecto menos el total de r. correctas por el resto de rooms	3
10	Flexibilidad por tiempo	¿Qué porcentaje de tiempo se logra utilizando distintas formas de interacción diferentes a las usadas por defecto?	t_rooms / t_total	Tiempo en rooms por defecto menos el tiempo total del resto de rooms	3
11	Preferencias de uso con respecto del nivel vs el resto de niveles	¿Qué porcentaje de usuarios prefieren el nivel frente a otro?	n_completos, n_usuarios, id_nivel, niveles	Tiempo en el nivel actual menos el total de tiempo del resto de niveles	4
\.


--
-- TOC entry 2279 (class 0 OID 17827)
-- Dependencies: 199
-- Data for Name: nivel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nivel (id, nombre, descripcion, id_chapter, id_learning) FROM stdin;
\.


--
-- TOC entry 2281 (class 0 OID 17835)
-- Dependencies: 201
-- Data for Name: nivel_usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nivel_usuario (id, id_usuario, id_nivel, fecha_inicio, fecha_fin, tiempo_juego, estado, correctas, incorrectas, intentos) FROM stdin;
\.


--
-- TOC entry 2283 (class 0 OID 17843)
-- Dependencies: 203
-- Data for Name: room; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.room (id, nombre, descripcion, edad, id_escuela, id_escenario, id_juego) FROM stdin;
\.


--
-- TOC entry 2286 (class 0 OID 17858)
-- Dependencies: 206
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" ("createdAt", "updatedAt", id, "emailAddress", password, "fullName", "isSuperAdmin", "passwordResetToken", "passwordResetTokenExpiresAt", "stripeCustomerId", "hasBillingCard", "billingCardBrand", "billingCardLast4", "billingCardExpMonth", "billingCardExpYear", "emailProofToken", "emailProofTokenExpiresAt", "emailStatus", "emailChangeCandidate", "tosAcceptedByIp", "lastSeenAt") FROM stdin;
\.


--
-- TOC entry 2288 (class 0 OID 17866)
-- Dependencies: 208
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios ("createdAt", "updatedAt", id, correo, password, nombre, "passwordResetToken", "passwordResetTokenExpiresAt", "emailProofToken", "emailProofTokenExpiresAt", "emailStatus", "emailChangeCandidate", "tosAcceptedByIp", "isSuperAdmin") FROM stdin;
1534785393237	1534785393237	4	mididashboard@gmail.com	$2a$10$2r3TrNcup5qxjFFEcnOqDe3hT2t3wA4pvp4P7R4AGcX8ioKJ1vUti	MIDI		0		0	confirmed			t
\.


--
-- TOC entry 2309 (class 0 OID 0)
-- Dependencies: 186
-- Name: caracteristica_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.caracteristica_id_seq', 5, true);


--
-- TOC entry 2310 (class 0 OID 0)
-- Dependencies: 188
-- Name: chapter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chapter_id_seq', 33, true);


--
-- TOC entry 2311 (class 0 OID 0)
-- Dependencies: 181
-- Name: escuela_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.escuela_id_seq', 4, true);


--
-- TOC entry 2312 (class 0 OID 0)
-- Dependencies: 182
-- Name: escuela_room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.escuela_room_id_seq', 7, true);


--
-- TOC entry 2313 (class 0 OID 0)
-- Dependencies: 191
-- Name: game_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.game_id_seq', 19, true);


--
-- TOC entry 2314 (class 0 OID 0)
-- Dependencies: 183
-- Name: jugador_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.jugador_id_seq', 148, true);


--
-- TOC entry 2315 (class 0 OID 0)
-- Dependencies: 194
-- Name: learn_jugador_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.learn_jugador_id_seq', 113, true);


--
-- TOC entry 2316 (class 0 OID 0)
-- Dependencies: 196
-- Name: learning_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.learning_id_seq', 24, true);


--
-- TOC entry 2317 (class 0 OID 0)
-- Dependencies: 198
-- Name: metrica_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.metrica_id_seq', 13, true);


--
-- TOC entry 2318 (class 0 OID 0)
-- Dependencies: 200
-- Name: nivel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nivel_id_seq', 36, true);


--
-- TOC entry 2319 (class 0 OID 0)
-- Dependencies: 202
-- Name: nivel_usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nivel_usuario_id_seq', 162, true);


--
-- TOC entry 2320 (class 0 OID 0)
-- Dependencies: 204
-- Name: room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.room_id_seq', 15, true);


--
-- TOC entry 2321 (class 0 OID 0)
-- Dependencies: 184
-- Name: type_room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.type_room_id_seq', 4, true);


--
-- TOC entry 2322 (class 0 OID 0)
-- Dependencies: 207
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 1, false);


--
-- TOC entry 2323 (class 0 OID 0)
-- Dependencies: 209
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 9, true);


--
-- TOC entry 2124 (class 2606 OID 17886)
-- Name: escenario Type_room_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.escenario
    ADD CONSTRAINT "Type_room_pkey" PRIMARY KEY (id);


--
-- TOC entry 2090 (class 2606 OID 17888)
-- Name: caracteristica caracteristica_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.caracteristica
    ADD CONSTRAINT caracteristica_pkey PRIMARY KEY (id);


--
-- TOC entry 2092 (class 2606 OID 17890)
-- Name: chapter chapter_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chapter
    ADD CONSTRAINT chapter_pkey PRIMARY KEY (id);


--
-- TOC entry 2095 (class 2606 OID 17892)
-- Name: escuela escuela_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.escuela
    ADD CONSTRAINT escuela_pkey PRIMARY KEY (id);


--
-- TOC entry 2097 (class 2606 OID 17896)
-- Name: game game_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game
    ADD CONSTRAINT game_pkey PRIMARY KEY (id);


--
-- TOC entry 2101 (class 2606 OID 17898)
-- Name: jugador jugador_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jugador
    ADD CONSTRAINT jugador_pkey PRIMARY KEY (id);


--
-- TOC entry 2105 (class 2606 OID 17900)
-- Name: learn_jugador learn_jugador_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learn_jugador
    ADD CONSTRAINT learn_jugador_pkey PRIMARY KEY (id);


--
-- TOC entry 2108 (class 2606 OID 17902)
-- Name: learning learning_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning
    ADD CONSTRAINT learning_pkey PRIMARY KEY (id);


--
-- TOC entry 2111 (class 2606 OID 17904)
-- Name: metrica metrica_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metrica
    ADD CONSTRAINT metrica_pkey PRIMARY KEY (id);


--
-- TOC entry 2115 (class 2606 OID 17906)
-- Name: nivel nivel_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nivel
    ADD CONSTRAINT nivel_pkey PRIMARY KEY (id);


--
-- TOC entry 2119 (class 2606 OID 17908)
-- Name: nivel_usuario nivel_usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nivel_usuario
    ADD CONSTRAINT nivel_usuario_pkey PRIMARY KEY (id);


--
-- TOC entry 2122 (class 2606 OID 17910)
-- Name: room room_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room
    ADD CONSTRAINT room_pkey PRIMARY KEY (id);


--
-- TOC entry 2126 (class 2606 OID 17912)
-- Name: user user_emailAddress_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "user_emailAddress_key" UNIQUE ("emailAddress");


--
-- TOC entry 2128 (class 2606 OID 17914)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 2130 (class 2606 OID 17916)
-- Name: usuarios usuarios_correo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_correo_key UNIQUE (correo);


--
-- TOC entry 2132 (class 2606 OID 17918)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 2093 (class 1259 OID 17919)
-- Name: fki_chapter_game_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_chapter_game_fkey ON public.chapter USING btree (id_game);


--
-- TOC entry 2098 (class 1259 OID 17921)
-- Name: fki_jugador_escuela_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_jugador_escuela_fkey ON public.jugador USING btree (id_escuela);


--
-- TOC entry 2102 (class 1259 OID 17922)
-- Name: fki_jugador_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_jugador_fkey ON public.learn_jugador USING btree (id_jugador);


--
-- TOC entry 2099 (class 1259 OID 17923)
-- Name: fki_jugador_room_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_jugador_room_fkey ON public.jugador USING btree (id_room);


--
-- TOC entry 2106 (class 1259 OID 17924)
-- Name: fki_learning_chapter_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_learning_chapter_fkey ON public.learning USING btree (id_chapter);


--
-- TOC entry 2103 (class 1259 OID 17925)
-- Name: fki_learning_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_learning_fkey ON public.learn_jugador USING btree (id_learning);


--
-- TOC entry 2109 (class 1259 OID 17926)
-- Name: fki_metrica_caracteristica_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_metrica_caracteristica_fkey ON public.metrica USING btree (id_caracteristica);


--
-- TOC entry 2112 (class 1259 OID 17927)
-- Name: fki_nivel_chapter_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_nivel_chapter_fkey ON public.nivel USING btree (id_chapter);


--
-- TOC entry 2116 (class 1259 OID 17928)
-- Name: fki_nivel_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_nivel_fkey ON public.nivel_usuario USING btree (id_nivel);


--
-- TOC entry 2113 (class 1259 OID 17929)
-- Name: fki_nivel_learning_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_nivel_learning_fkey ON public.nivel USING btree (id_learning);


--
-- TOC entry 2120 (class 1259 OID 18015)
-- Name: fki_room_escuela_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_room_escuela_fkey ON public.room USING btree (id_escuela);


--
-- TOC entry 2117 (class 1259 OID 17933)
-- Name: fki_usuario_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_usuario_fkey ON public.nivel_usuario USING btree (id_usuario);


--
-- TOC entry 2133 (class 2606 OID 18026)
-- Name: chapter chapter_game_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chapter
    ADD CONSTRAINT chapter_game_fkey FOREIGN KEY (id_game) REFERENCES public.game(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2134 (class 2606 OID 18031)
-- Name: jugador jugador_escuela_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jugador
    ADD CONSTRAINT jugador_escuela_fkey FOREIGN KEY (id_escuela) REFERENCES public.escuela(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2136 (class 2606 OID 18041)
-- Name: learn_jugador jugador_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learn_jugador
    ADD CONSTRAINT jugador_fkey FOREIGN KEY (id_jugador) REFERENCES public.jugador(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2135 (class 2606 OID 18036)
-- Name: jugador jugador_room_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jugador
    ADD CONSTRAINT jugador_room_fkey FOREIGN KEY (id_room) REFERENCES public.room(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2138 (class 2606 OID 18051)
-- Name: learning learning_chapter_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning
    ADD CONSTRAINT learning_chapter_fkey FOREIGN KEY (id_chapter) REFERENCES public.chapter(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2137 (class 2606 OID 18046)
-- Name: learn_jugador learning_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learn_jugador
    ADD CONSTRAINT learning_fkey FOREIGN KEY (id_learning) REFERENCES public.learning(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2139 (class 2606 OID 18056)
-- Name: metrica metrica_caracteristica_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metrica
    ADD CONSTRAINT metrica_caracteristica_fkey FOREIGN KEY (id_caracteristica) REFERENCES public.caracteristica(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2140 (class 2606 OID 18061)
-- Name: nivel nivel_chapter_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nivel
    ADD CONSTRAINT nivel_chapter_fkey FOREIGN KEY (id_chapter) REFERENCES public.chapter(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2142 (class 2606 OID 18071)
-- Name: nivel_usuario nivel_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nivel_usuario
    ADD CONSTRAINT nivel_fkey FOREIGN KEY (id_nivel) REFERENCES public.nivel(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2141 (class 2606 OID 18066)
-- Name: nivel nivel_learning_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nivel
    ADD CONSTRAINT nivel_learning_fkey FOREIGN KEY (id_learning) REFERENCES public.learning(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2145 (class 2606 OID 18016)
-- Name: room room_escenario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room
    ADD CONSTRAINT room_escenario_fkey FOREIGN KEY (id_escenario) REFERENCES public.escenario(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2144 (class 2606 OID 18010)
-- Name: room room_escuela_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room
    ADD CONSTRAINT room_escuela_fkey FOREIGN KEY (id_escuela) REFERENCES public.escuela(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2146 (class 2606 OID 18021)
-- Name: room room_juego_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room
    ADD CONSTRAINT room_juego_fkey FOREIGN KEY (id_juego) REFERENCES public.game(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2143 (class 2606 OID 18076)
-- Name: nivel_usuario usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nivel_usuario
    ADD CONSTRAINT usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.jugador(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2018-10-01 12:04:18

--
-- PostgreSQL database dump complete
--

