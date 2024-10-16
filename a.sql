--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: client; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.client (
    id integer NOT NULL,
    name character varying(255),
    rut character varying(255),
    companyname character varying(255),
    details character varying(255),
    adress character varying(255)
);


ALTER TABLE public.client OWNER TO postgres;

--
-- Name: client_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.client_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.client_id_seq OWNER TO postgres;

--
-- Name: client_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.client_id_seq OWNED BY public.client.id;


--
-- Name: contact; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contact (
    id integer NOT NULL,
    name character varying(255),
    phone character varying(255),
    email character varying(255),
    details character varying(255),
    clientid integer
);


ALTER TABLE public.contact OWNER TO postgres;

--
-- Name: contact_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contact_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contact_id_seq OWNER TO postgres;

--
-- Name: contact_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contact_id_seq OWNED BY public.contact.id;


--
-- Name: service; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.service (
    id integer NOT NULL,
    price integer,
    startdate date,
    enddate date,
    paid boolean,
    clientid integer,
    servicetypeid integer,
    active boolean,
    payment character varying(255),
    eliminated boolean,
    name character varying(255)
);


ALTER TABLE public.service OWNER TO postgres;

--
-- Name: serviceType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."serviceType" (
    id integer NOT NULL,
    name character varying(255),
    type character varying(255)
);


ALTER TABLE public."serviceType" OWNER TO postgres;

--
-- Name: service_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.service_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.service_id_seq OWNER TO postgres;

--
-- Name: service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.service_id_seq OWNED BY public.service.id;


--
-- Name: servicetype_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.servicetype_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.servicetype_id_seq OWNER TO postgres;

--
-- Name: servicetype_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.servicetype_id_seq OWNED BY public."serviceType".id;


--
-- Name: client id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client ALTER COLUMN id SET DEFAULT nextval('public.client_id_seq'::regclass);


--
-- Name: contact id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact ALTER COLUMN id SET DEFAULT nextval('public.contact_id_seq'::regclass);


--
-- Name: service id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service ALTER COLUMN id SET DEFAULT nextval('public.service_id_seq'::regclass);


--
-- Name: serviceType id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."serviceType" ALTER COLUMN id SET DEFAULT nextval('public.servicetype_id_seq'::regclass);


--
-- Data for Name: client; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.client (id, name, rut, companyname, details, adress) FROM stdin;
1	test1	466849854	TestClient	aouiEouGAEblbkjhDSVjkhbDSVBbjknDVAjbkhdvauojni;bvdkjbnvsdjkbn; daVS jkl nadSV ojdasfv of kujhadsFoasudHF ikujadshfikujSBHED FclkJHSD sd oi sodlij;jhsd fv	jacintovera4555
\.


--
-- Data for Name: contact; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contact (id, name, phone, email, details, clientid) FROM stdin;
1	TEsting Bruno	+59897312727	brunocanepa22@gmail.com	a	1
2	Test2contact	+5989144444	testing@gmail.com	Detalles opcional	1
\.


--
-- Data for Name: service; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.service (id, price, startdate, enddate, paid, clientid, servicetypeid, active, payment, eliminated, name) FROM stdin;
2	15000	2023-09-11	2024-09-11	t	1	2	t	Anual	t	test
3	98498	2024-09-11	2024-09-11	t	1	1	f	Puntual	t	asdasd
1	41	2024-09-18	2025-09-18	t	1	1	f	Anual	t	Bruno Cánepa
4	150	2024-09-18	2025-09-18	t	1	1	f	Anual	t	Dana 
\.


--
-- Data for Name: serviceType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."serviceType" (id, name, type) FROM stdin;
1	Servicio 1	HOjaslfd
2	Servicio 1	plan v
\.


--
-- Name: client_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.client_id_seq', 1, true);


--
-- Name: contact_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contact_id_seq', 2, true);


--
-- Name: service_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.service_id_seq', 4, true);


--
-- Name: servicetype_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.servicetype_id_seq', 2, true);


--
-- Name: client client_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_pkey PRIMARY KEY (id);


--
-- Name: contact contact_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact
    ADD CONSTRAINT contact_pkey PRIMARY KEY (id);


--
-- Name: service service_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service
    ADD CONSTRAINT service_pkey PRIMARY KEY (id);


--
-- Name: serviceType servicetype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."serviceType"
    ADD CONSTRAINT servicetype_pkey PRIMARY KEY (id);


--
-- Name: contact fk_client; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact
    ADD CONSTRAINT fk_client FOREIGN KEY (clientid) REFERENCES public.client(id);


--
-- Name: service service_clientid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service
    ADD CONSTRAINT service_clientid_fkey FOREIGN KEY (clientid) REFERENCES public.client(id);


--
-- Name: service service_servicetypeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service
    ADD CONSTRAINT service_servicetypeid_fkey FOREIGN KEY (servicetypeid) REFERENCES public."serviceType"(id);


--
-- PostgreSQL database dump complete
--

