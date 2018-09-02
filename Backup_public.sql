--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.14
-- Dumped by pg_dump version 10.4

-- Started on 2018-09-02 00:58:17

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
-- TOC entry 191 (class 1259 OID 16563)
-- Name: caracteristica; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.caracteristica (
    "createdAt" bigint,
    "updatedAt" bigint,
    id integer NOT NULL,
    nombre text,
    descripcion text
);


ALTER TABLE public.caracteristica OWNER TO postgres;

--
-- TOC entry 182 (class 1259 OID 16543)
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
-- TOC entry 2268 (class 0 OID 0)
-- Dependencies: 182
-- Name: caracteristica_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.caracteristica_id_seq OWNED BY public.caracteristica.id;


--
-- TOC entry 195 (class 1259 OID 16568)
-- Name: chapter; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chapter (
    "createdAt" bigint,
    "updatedAt" bigint,
    id integer NOT NULL,
    nombre text,
    descripcion text,
    id_chapter real,
    id_game real
);


ALTER TABLE public.chapter OWNER TO postgres;

--
-- TOC entry 181 (class 1259 OID 16542)
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
-- TOC entry 2269 (class 0 OID 0)
-- Dependencies: 181
-- Name: chapter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chapter_id_seq OWNED BY public.chapter.id;


--
-- TOC entry 208 (class 1259 OID 16988)
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
-- TOC entry 205 (class 1259 OID 16970)
-- Name: escuela; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.escuela (
    id integer DEFAULT nextval('public.escuela_id_seq'::regclass) NOT NULL,
    nombre text,
    descripcion text
);


ALTER TABLE public.escuela OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 16986)
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
-- TOC entry 206 (class 1259 OID 16978)
-- Name: escuela_room; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.escuela_room (
    id integer DEFAULT nextval('public.escuela_room_id_seq'::regclass) NOT NULL,
    id_escuela real,
    id_room real,
    descripcion text
);


ALTER TABLE public.escuela_room OWNER TO postgres;

--
-- TOC entry 190 (class 1259 OID 16562)
-- Name: game; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.game (
    "createdAt" bigint,
    "updatedAt" bigint,
    id integer NOT NULL,
    nombre text,
    descripcion text
);


ALTER TABLE public.game OWNER TO postgres;

--
-- TOC entry 189 (class 1259 OID 16560)
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
-- TOC entry 2270 (class 0 OID 0)
-- Dependencies: 189
-- Name: game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.game_id_seq OWNED BY public.game.id;


--
-- TOC entry 203 (class 1259 OID 16959)
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
-- TOC entry 204 (class 1259 OID 16961)
-- Name: jugador; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jugador (
    id integer DEFAULT nextval('public.jugador_id_seq'::regclass) NOT NULL,
    avatar text,
    nombre text,
    id_room real,
    puntos real,
    id_registro real,
    id_escuela real
);


ALTER TABLE public.jugador OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 16570)
-- Name: learn_jugador; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.learn_jugador (
    "createdAt" bigint,
    "updatedAt" bigint,
    id integer NOT NULL,
    id_jugador real,
    id_learning real,
    fecha_inicio date,
    fecha_fin date,
    tiempo_juego real,
    estado text,
    num_play real
);


ALTER TABLE public.learn_jugador OWNER TO postgres;

--
-- TOC entry 183 (class 1259 OID 16544)
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
-- TOC entry 2271 (class 0 OID 0)
-- Dependencies: 183
-- Name: learn_jugador_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.learn_jugador_id_seq OWNED BY public.learn_jugador.id;


--
-- TOC entry 196 (class 1259 OID 16569)
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
-- TOC entry 186 (class 1259 OID 16547)
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
-- TOC entry 2272 (class 0 OID 0)
-- Dependencies: 186
-- Name: learning_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.learning_id_seq OWNED BY public.learning.id;


--
-- TOC entry 192 (class 1259 OID 16564)
-- Name: metrica; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.metrica (
    "createdAt" bigint,
    "updatedAt" bigint,
    id integer NOT NULL,
    nombre text,
    proposito text,
    formula text,
    interpretacion text,
    id_metrica real
);


ALTER TABLE public.metrica OWNER TO postgres;

--
-- TOC entry 185 (class 1259 OID 16546)
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
-- TOC entry 2273 (class 0 OID 0)
-- Dependencies: 185
-- Name: metrica_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.metrica_id_seq OWNED BY public.metrica.id;


--
-- TOC entry 193 (class 1259 OID 16565)
-- Name: nivel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nivel (
    "createdAt" bigint,
    "updatedAt" bigint,
    id integer NOT NULL,
    nombre text,
    descripcion text,
    id_chapter real,
    id_learning real
);


ALTER TABLE public.nivel OWNER TO postgres;

--
-- TOC entry 187 (class 1259 OID 16554)
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
-- TOC entry 2274 (class 0 OID 0)
-- Dependencies: 187
-- Name: nivel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nivel_id_seq OWNED BY public.nivel.id;


--
-- TOC entry 194 (class 1259 OID 16567)
-- Name: nivel_usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nivel_usuario (
    "createdAt" bigint,
    "updatedAt" bigint,
    id integer NOT NULL,
    id_usuario real,
    id_nivel real,
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
-- TOC entry 188 (class 1259 OID 16558)
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
-- TOC entry 2275 (class 0 OID 0)
-- Dependencies: 188
-- Name: nivel_usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nivel_usuario_id_seq OWNED BY public.nivel_usuario.id;


--
-- TOC entry 198 (class 1259 OID 16571)
-- Name: room; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.room (
    id integer NOT NULL,
    nombre text,
    descripcion text,
    tipo text,
    edad real,
    id_juego real
);


ALTER TABLE public.room OWNER TO postgres;

--
-- TOC entry 184 (class 1259 OID 16545)
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
-- TOC entry 2276 (class 0 OID 0)
-- Dependencies: 184
-- Name: room_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.room_id_seq OWNED BY public.room.id;


--
-- TOC entry 200 (class 1259 OID 16654)
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
-- TOC entry 199 (class 1259 OID 16652)
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
-- TOC entry 2277 (class 0 OID 0)
-- Dependencies: 199
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 202 (class 1259 OID 16663)
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
    "tosAcceptedByIp" text
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 16656)
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
-- TOC entry 2278 (class 0 OID 0)
-- Dependencies: 201
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- TOC entry 2074 (class 2604 OID 16592)
-- Name: caracteristica id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.caracteristica ALTER COLUMN id SET DEFAULT nextval('public.caracteristica_id_seq'::regclass);


--
-- TOC entry 2078 (class 2604 OID 16598)
-- Name: chapter id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chapter ALTER COLUMN id SET DEFAULT nextval('public.chapter_id_seq'::regclass);


--
-- TOC entry 2073 (class 2604 OID 16594)
-- Name: game id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game ALTER COLUMN id SET DEFAULT nextval('public.game_id_seq'::regclass);


--
-- TOC entry 2080 (class 2604 OID 16600)
-- Name: learn_jugador id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learn_jugador ALTER COLUMN id SET DEFAULT nextval('public.learn_jugador_id_seq'::regclass);


--
-- TOC entry 2079 (class 2604 OID 16593)
-- Name: learning id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning ALTER COLUMN id SET DEFAULT nextval('public.learning_id_seq'::regclass);


--
-- TOC entry 2075 (class 2604 OID 16596)
-- Name: metrica id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metrica ALTER COLUMN id SET DEFAULT nextval('public.metrica_id_seq'::regclass);


--
-- TOC entry 2076 (class 2604 OID 16599)
-- Name: nivel id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nivel ALTER COLUMN id SET DEFAULT nextval('public.nivel_id_seq'::regclass);


--
-- TOC entry 2077 (class 2604 OID 16595)
-- Name: nivel_usuario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nivel_usuario ALTER COLUMN id SET DEFAULT nextval('public.nivel_usuario_id_seq'::regclass);


--
-- TOC entry 2081 (class 2604 OID 16601)
-- Name: room id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room ALTER COLUMN id SET DEFAULT nextval('public.room_id_seq'::regclass);


--
-- TOC entry 2082 (class 2604 OID 16661)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 2083 (class 2604 OID 16672)
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- TOC entry 2243 (class 0 OID 16563)
-- Dependencies: 191
-- Data for Name: caracteristica; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.caracteristica ("createdAt", "updatedAt", id, nombre, descripcion) FROM stdin;
1534726928373	1534726928373	1	Eficiencia	Grado con el que pueden lograr las metas propuestas invirtiendo una cantidad apropiada de recursos en relación a la efectividad lograda.
1534726928373	1534726928373	2	Efectividad	Grado en el que pueden lograr las metas propuestas con precisión \ny completitud.
1534726928373	1534726928373	3	Flexibilidad	Grado con el que se pueden variar las condiciones por prueba.
1534726928373	1534726928373	4	Satisfacción	Grado con el que los jugadores se sienten bien al terminar una meta.
1534726928373	1534726928373	5	Learning	Grado con el que a los jugadores les fue útil la parte de la enseñanza previa.
\.


--
-- TOC entry 2247 (class 0 OID 16568)
-- Dependencies: 195
-- Data for Name: chapter; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chapter ("createdAt", "updatedAt", id, nombre, descripcion, id_chapter, id_game) FROM stdin;
1534726928373	1534726928373	1	Mi País	Aprende la historia de los símbolos patrios del Ecuador	1	1
1534726928373	1534726928373	2	Deberes y derechos	Aprende sobre tus derechos y obligaciones como niño ecuatoriano	2	1
1534726928373	1534726928373	3	Mi escuela	Aprende sobre las actividades que todo niño puede hacer en su institución educativa	3	1
1534726928373	1534726928373	4	Preparando botiquín	Aprende a ser precavido ante cualquier accidente con ayuda de un necesario botiquín	4	1
1534726928373	1534726928373	5	Capítulo 1	Este es el capítulo 1 del juego ficticio para pruebas	5	2
1534726928373	1534726928373	6	Capítulo 2	Este es el capítulo 2 del juego ficticio para pruebas	6	2
\N	\N	7	DeberesYDerechos	descr	7	4
\N	\N	8	Mi País	descr	0	4
\N	\N	9	Ecuador		0	4
\N	\N	10	Aprendiendo capitulo	weqe	0	2
\.


--
-- TOC entry 2257 (class 0 OID 16970)
-- Dependencies: 205
-- Data for Name: escuela; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.escuela (id, nombre, descripcion) FROM stdin;
1	ES001	Escuela 1
2	ES002	Escuela 2
\.


--
-- TOC entry 2258 (class 0 OID 16978)
-- Dependencies: 206
-- Data for Name: escuela_room; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.escuela_room (id, id_escuela, id_room, descripcion) FROM stdin;
1	1	4	\N
2	1	5	\N
3	2	4	\N
\.


--
-- TOC entry 2242 (class 0 OID 16562)
-- Dependencies: 190
-- Data for Name: game; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.game ("createdAt", "updatedAt", id, nombre, descripcion) FROM stdin;
1534726928373	1534726928373	1	Aventuras Interactivas	Juego desarrollado para niños por MIDI-ESPOL
1534726928373	1534726928373	2	Aprendiendo	Juego desarrollado para niños por empresa ficticia.
\N	\N	4	Escuela	descr
\.


--
-- TOC entry 2256 (class 0 OID 16961)
-- Dependencies: 204
-- Data for Name: jugador; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jugador (id, avatar, nombre, id_room, puntos, id_registro, id_escuela) FROM stdin;
\.


--
-- TOC entry 2249 (class 0 OID 16570)
-- Dependencies: 197
-- Data for Name: learn_jugador; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.learn_jugador ("createdAt", "updatedAt", id, id_jugador, id_learning, fecha_inicio, fecha_fin, tiempo_juego, estado, num_play) FROM stdin;
1531973210185	1531973210185	1	1	1	2018-02-02	2018-02-02	210	completado	1
1531973210185	1531973210185	2	1	2	2018-02-02	2018-02-02	40	abandono	1
1531973210185	1531973210185	4	1	3	2018-02-02	2018-02-02	180	completado	1
1531973210185	1531973210185	5	1	4	2018-02-02	2018-02-02	160	completado	1
1531973210185	1531973210185	6	1	5	2018-02-02	2018-02-02	30	abandono	1
1531973210185	1531973210185	7	1	6	2018-02-02	2018-02-02	190	completado	2
1531973210185	1531973210185	8	2	6	2018-02-02	2018-02-02	220	completado	1
1531973210185	1531973210185	9	2	1	2018-02-02	2018-02-02	160	completado	1
1531973210185	1531973210185	10	2	2	2018-02-02	2018-02-02	200	completado	2
1531973210185	1531973210185	11	2	3	2018-02-02	2018-02-02	180	completado	1
1531973210185	1531973210185	12	2	4	2018-02-02	2018-02-02	50	abandono	1
1531973210185	1531973210185	13	2	5	2018-02-02	2018-02-02	220	completado	2
\N	\N	15	2	7	2018-01-31	2018-01-31	180	completado	2
\N	\N	16	2	8	2018-01-31	2018-01-31	180	completado	1
\.


--
-- TOC entry 2248 (class 0 OID 16569)
-- Dependencies: 196
-- Data for Name: learning; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.learning ("createdAt", "updatedAt", id, nombre, descripcion, id_chapter, duracion) FROM stdin;
1531973210185	1531973210185	5	Hogar     	Escucha y observa sobre el hogar                  	6	220
1531973210185	1531973210185	1	Mi país	Escucha y observa sobre el Ecuador                	1	160
1531973210185	1531973210185	2	Medicina  	Escucha y observa sobre la medicina               	5	210
1531973210185	1531973210185	3	Deberes y derechos	Escucha y observa sobre los valores               	2	180
1531973210185	1531973210185	4	Preparando botiquín	Escucha y observa sobre las emergencias           	4	150
1531973210185	1531973210185	6	Mi escuela	Escucha y observa sobre los deberes               	3	190
\N	\N	7	Bandera2	desc3	7	180
\.


--
-- TOC entry 2244 (class 0 OID 16564)
-- Dependencies: 192
-- Data for Name: metrica; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.metrica ("createdAt", "updatedAt", id, nombre, proposito, formula, interpretacion, id_metrica) FROM stdin;
1534726928373	1534726928373	1	Tiempo de meta	¿Cuánto tiempo requiere el jugador para lograr la meta?	tiempo_juego_ok	Tiempo de juego en el nivel completado	1
1534726928373	1534726928373	2	Eficiencia de meta por respuestas correctas	¿Cómo de eficientes son los usuarios en el nivel?	correctas_ok / tiempo_juego	Respuestas correctas en un nivel completado vs tiempo que tomó completarlo	1
1534726928373	1534726928373	3	Eficiencia de meta por respuestas incorrectas	¿Qué tan poco eficientes son los usuarios en el nivel?	incorrectas_ok / tiempo_juego	Respuestas incorrectas en un nivel completado vs tiempo que tomó completarlo	1
1534726928373	1534726928373	4	Eficiencia relativa a los mejores resultados de jugadores	¿Qué porcentaje de jugadores lo hicieron bastante rápido?	jugadores_OK / total_jugadores	Número de mejores jugadores vs total de jugadores	1
1534726928373	1534726928373	5	Eficiencia relativa a los jugadores con dificultades en el nivel	¿Qué porcentaje de jugadores tuvieron dificultades?	jugadores_BAD / total_jugadores	Número de jugadores que tuvieron dificultades vs total de jugadores	1
1534726928373	1534726928373	6	Efectividad de la meta	¿Qué porcentaje de metas y retos se han alcanzado correctamente?	correctas / (correctas + incorrectas)	Relacion del total de respuestas correctas vs el total de intentos	2
1534726928373	1534726928373	7	Completitud de la meta	¿Qué porcentaje de metas y retos se han completado?	n_completos / n_user	Numero de usuarios que completaron vs numero de usuarios totales	2
1534726928373	1534726928373	8	Frecuencia de intentos para llegar a la meta	¿Cuál ha sido la frecuencia de intentos?	intentos_ok / correctas_ok	Numero de intentos en niveles completados vs numero de r. correctas en niveles completados	2
1534726928373	1534726928373	9	Flexibilidad por metas	¿Qué porcentaje de metas se logran utilizando distintas formas de interacción diferentes a las usadas por defecto?	correctas / (correctas + incorrectas)	Número r. correctas en rooms por defecto menos el total de r. correctas por el resto de rooms	3
1534726928373	1534726928373	10	Flexibilidad por tiempo	¿Qué porcentaje de tiempo se logra utilizando distintas formas de interacción diferentes a las usadas por defecto?	t_rooms / t_total	Tiempo en rooms por defecto menos el tiempo total del resto de rooms	3
1534726928373	1534726928373	11	Preferencias de uso con respecto del nivel vs el resto de niveles	¿Qué porcentaje de usuarios prefieren el nivel frente a otro?	n_completos, n_usuarios, id_nivel, niveles	Tiempo en el nivel actual menos el total de tiempo del resto de niveles	4
\.


--
-- TOC entry 2245 (class 0 OID 16565)
-- Dependencies: 193
-- Data for Name: nivel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nivel ("createdAt", "updatedAt", id, nombre, descripcion, id_chapter, id_learning) FROM stdin;
1531612938663	1531612938663	2	Pinta la bandera	Colorear la bandera del Ecuador	1	1
1531612938663	1531612938663	1	Coloca la línea	Arrastrar la línea en el Ecuador	1	1
1531612938663	1531612938663	3	Arma el escudo	Arrastrar elementos del escudo en su lugar correcto	1	1
1531612938663	1531612938663	4	Canta el himno	Karaoke del himno nacional	1	1
1531612938663	1531612938663	5	Rompecabezas	Arma un rompecabezas	2	2
1531612938663	1531612938663	6	Escoge el derecho	Elige de las múltiples opciones	2	2
1531612938663	1531612938663	7	Juguemos ruleta	Gira la ruleta para responder correctamente	2	2
1531612938663	1531612938663	8	Recorre el camino	Debes recorrer un camino	2	2
1531612938663	1531612938663	9	Une las áreas	Arrastrar para unir los elementos	3	3
1531612938663	1531612938663	10	Arma la mochila	Elige los elementos que componen tu mochila	3	3
1531612938663	1531612938663	11	Ordena el salón	Ordena los elementos que corresponden al correcto orden del salón	3	3
1531612938663	1531612938663	12	Recorre cuál es el área	Recorre es área correcta	3	3
1531612938663	1531612938663	13	Armando mi botiquín	Selecciona los elementos que corresponden a un botiquín de primeros auxilios	4	4
1531612938663	1531612938663	14	Polito enfermo	Selecciona los elementos para curar a Polito	4	4
1531612938663	1531612938663	15	Atrapa el objeto correcto que cae de arriba	Atrapa el objeto correcto que cae de arriba	4	4
1531612938663	1531612938663	16	Adivina el par	Elige los pares correspondientes	4	4
\N	\N	17	Bandera	zxcxcz	9	1
\.


--
-- TOC entry 2246 (class 0 OID 16567)
-- Dependencies: 194
-- Data for Name: nivel_usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nivel_usuario ("createdAt", "updatedAt", id, id_usuario, id_nivel, fecha_inicio, fecha_fin, tiempo_juego, estado, correctas, incorrectas, intentos) FROM stdin;
1531612938663	1531612938663	1	1	1	2018-02-01	2018-02-01	120	completado	10	5	1
1531612938663	1531612938663	2	1	2	2018-02-01	2018-02-01	95	completado	8	4	2
1531612938663	1531612938663	3	1	3	2018-02-01	2018-02-01	80	completado	12	2	1
1531612938663	1531612938663	4	1	4	2018-02-01	2018-02-01	160	completado	10	4	1
1531612938663	1531612938663	5	1	5	2018-02-02	2018-02-02	20	abandonado	3	2	1
1531612938663	1531612938663	6	1	6	2018-02-02	2018-02-02	25	abandonado	3	2	1
1531612938663	1531612938663	7	1	7	2018-02-03	2018-02-03	125	completado	14	5	2
1531612938663	1531612938663	8	1	8	2018-02-03	2018-02-03	175	completado	12	5	2
1531612938663	1531612938663	9	1	9	2018-02-03	2018-02-03	200	completado	6	3	1
1531612938663	1531612938663	10	1	10	2018-02-04	2018-02-04	130	completado	6	2	1
1531612938663	1531612938663	11	1	11	2018-02-04	2018-02-04	150	completado	8	2	1
1531612938663	1531612938663	12	1	12	2018-02-04	2018-02-04	27	abandonado	1	2	1
1531612938663	1531612938663	13	2	1	2018-02-04	2018-02-04	145	completado	10	2	1
1531612938663	1531612938663	14	2	2	2018-02-05	2018-02-05	127	completado	10	3	1
1531612938663	1531612938663	15	2	3	2018-02-05	2018-02-05	177	completado	7	3	2
1531612938663	1531612938663	16	2	4	2018-02-05	2018-02-05	210	completado	6	2	1
1531612938663	1531612938663	17	2	5	2018-02-05	2018-02-05	218	completado	9	2	1
1531612938663	1531612938663	18	2	6	2018-02-06	2018-02-06	168	completado	7	2	1
1531612938663	1531612938663	19	2	7	2018-02-06	2018-02-06	230	completado	8	2	1
1531612938663	1531612938663	20	2	8	2018-02-06	2018-02-06	250	completado	8	2	1
1531612938663	1531612938663	21	2	9	2018-02-06	2018-02-06	160	completado	10	5	1
1531612938663	1531612938663	22	2	10	2018-02-06	2018-02-06	32	abandonado	1	2	1
1531612938663	1531612938663	23	2	11	2018-02-06	2018-02-06	27	abandonado	1	2	1
1531612938663	1531612938663	24	2	12	2018-02-06	2018-02-06	127	completado	10	4	1
1531612938663	1531612938663	25	5	1	2018-02-06	2018-02-06	150	completado	10	5	1
\N	\N	26	3	17	2018-01-02	2018-01-02	150	completado	10	0	4
\.


--
-- TOC entry 2250 (class 0 OID 16571)
-- Dependencies: 198
-- Data for Name: room; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.room (id, nombre, descripcion, tipo, edad, id_juego) FROM stdin;
4	R1	Sala por Default	Default	8	1
5	R2	Sin guía	Sin guía	6	1
\.


--
-- TOC entry 2252 (class 0 OID 16654)
-- Dependencies: 200
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" ("createdAt", "updatedAt", id, "emailAddress", password, "fullName", "isSuperAdmin", "passwordResetToken", "passwordResetTokenExpiresAt", "stripeCustomerId", "hasBillingCard", "billingCardBrand", "billingCardLast4", "billingCardExpMonth", "billingCardExpYear", "emailProofToken", "emailProofTokenExpiresAt", "emailStatus", "emailChangeCandidate", "tosAcceptedByIp", "lastSeenAt") FROM stdin;
\.


--
-- TOC entry 2254 (class 0 OID 16663)
-- Dependencies: 202
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios ("createdAt", "updatedAt", id, correo, password, nombre, "passwordResetToken", "passwordResetTokenExpiresAt", "emailProofToken", "emailProofTokenExpiresAt", "emailStatus", "emailChangeCandidate", "tosAcceptedByIp") FROM stdin;
1534726928373	1534726928373	1	mmendozaquelal@gmail.com	$2a$10$2YbqvSq0N3AY0FfG9TBlGO1oOPYGQ6ZnSbc9z/A5I0YkivE8Rd2Cu	Marco		0		0	confirmed		
1534785393237	1534785393237	4	mididashboard@gmail.com	$2a$10$2r3TrNcup5qxjFFEcnOqDe3hT2t3wA4pvp4P7R4AGcX8ioKJ1vUti	MIDI		0		0	confirmed		
\N	\N	5	maxamend@espol.edu.ec	$2a$10$KUb9VB8GgYsnQMFEX23yPOcf5LD20xRKbUU1xIfO7Qs/cFOVWEk3G	Marco		0		0	confirmed		
\.


--
-- TOC entry 2279 (class 0 OID 0)
-- Dependencies: 182
-- Name: caracteristica_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.caracteristica_id_seq', 5, true);


--
-- TOC entry 2280 (class 0 OID 0)
-- Dependencies: 181
-- Name: chapter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chapter_id_seq', 10, true);


--
-- TOC entry 2281 (class 0 OID 0)
-- Dependencies: 208
-- Name: escuela_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.escuela_id_seq', 2, true);


--
-- TOC entry 2282 (class 0 OID 0)
-- Dependencies: 207
-- Name: escuela_room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.escuela_room_id_seq', 3, true);


--
-- TOC entry 2283 (class 0 OID 0)
-- Dependencies: 189
-- Name: game_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.game_id_seq', 4, true);


--
-- TOC entry 2284 (class 0 OID 0)
-- Dependencies: 203
-- Name: jugador_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.jugador_id_seq', 24, true);


--
-- TOC entry 2285 (class 0 OID 0)
-- Dependencies: 183
-- Name: learn_jugador_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.learn_jugador_id_seq', 16, true);


--
-- TOC entry 2286 (class 0 OID 0)
-- Dependencies: 186
-- Name: learning_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.learning_id_seq', 8, true);


--
-- TOC entry 2287 (class 0 OID 0)
-- Dependencies: 185
-- Name: metrica_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.metrica_id_seq', 13, true);


--
-- TOC entry 2288 (class 0 OID 0)
-- Dependencies: 187
-- Name: nivel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nivel_id_seq', 17, true);


--
-- TOC entry 2289 (class 0 OID 0)
-- Dependencies: 188
-- Name: nivel_usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nivel_usuario_id_seq', 26, true);


--
-- TOC entry 2290 (class 0 OID 0)
-- Dependencies: 184
-- Name: room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.room_id_seq', 5, true);


--
-- TOC entry 2291 (class 0 OID 0)
-- Dependencies: 199
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 1, false);


--
-- TOC entry 2292 (class 0 OID 0)
-- Dependencies: 201
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 5, true);


--
-- TOC entry 2090 (class 2606 OID 16649)
-- Name: caracteristica caracteristica_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.caracteristica
    ADD CONSTRAINT caracteristica_pkey PRIMARY KEY (id);


--
-- TOC entry 2098 (class 2606 OID 16646)
-- Name: chapter chapter_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chapter
    ADD CONSTRAINT chapter_pkey PRIMARY KEY (id);


--
-- TOC entry 2116 (class 2606 OID 16977)
-- Name: escuela escuela_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.escuela
    ADD CONSTRAINT escuela_pkey PRIMARY KEY (id);


--
-- TOC entry 2118 (class 2606 OID 16985)
-- Name: escuela_room escuela_room_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.escuela_room
    ADD CONSTRAINT escuela_room_pkey PRIMARY KEY (id);


--
-- TOC entry 2088 (class 2606 OID 16636)
-- Name: game game_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game
    ADD CONSTRAINT game_pkey PRIMARY KEY (id);


--
-- TOC entry 2114 (class 2606 OID 16969)
-- Name: jugador jugador_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jugador
    ADD CONSTRAINT jugador_pkey PRIMARY KEY (id);


--
-- TOC entry 2102 (class 2606 OID 16651)
-- Name: learn_jugador learn_jugador_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learn_jugador
    ADD CONSTRAINT learn_jugador_pkey PRIMARY KEY (id);


--
-- TOC entry 2100 (class 2606 OID 16635)
-- Name: learning learning_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning
    ADD CONSTRAINT learning_pkey PRIMARY KEY (id);


--
-- TOC entry 2092 (class 2606 OID 16637)
-- Name: metrica metrica_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metrica
    ADD CONSTRAINT metrica_pkey PRIMARY KEY (id);


--
-- TOC entry 2094 (class 2606 OID 16647)
-- Name: nivel nivel_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nivel
    ADD CONSTRAINT nivel_pkey PRIMARY KEY (id);


--
-- TOC entry 2096 (class 2606 OID 16642)
-- Name: nivel_usuario nivel_usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nivel_usuario
    ADD CONSTRAINT nivel_usuario_pkey PRIMARY KEY (id);


--
-- TOC entry 2104 (class 2606 OID 16639)
-- Name: room room_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room
    ADD CONSTRAINT room_pkey PRIMARY KEY (id);


--
-- TOC entry 2106 (class 2606 OID 16686)
-- Name: user user_emailAddress_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "user_emailAddress_key" UNIQUE ("emailAddress");


--
-- TOC entry 2108 (class 2606 OID 16680)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 2110 (class 2606 OID 16688)
-- Name: usuarios usuarios_correo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_correo_key UNIQUE (correo);


--
-- TOC entry 2112 (class 2606 OID 16682)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 2267 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2018-09-02 00:58:19

--
-- PostgreSQL database dump complete
--

