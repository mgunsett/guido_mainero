import {
  FaInstagram,
  FaXTwitter,
  FaTiktok,
  FaYoutube,
  FaEnvelope,
  FaWhatsapp,
  FaPhone,
  FaHandshake,
} from 'react-icons/fa6'

import { IoMdStats } from "react-icons/io";
import ledsportsLogo from '../assets/LED.webp'
import transfermkt from '../assets/transfermkt.webp'

// ── Imágenes del jugador ──────────────────────────────
import playerImg from '../assets/perfil1.webp'
import fondoContact from '../assets/fondoContact.webp'

// ── Portada del video ─────────────────────────────────
import videoCover from '../assets/gallery-torneos/Liga Profesional/04-encarando-por-la-derecha.webp'


// ── Logos de clubes ───────────────────────────────────
import platense from '../assets/escudos/escudo_platense.webp'
import sarmiento from '../assets/escudos/escudo_sarmiento.webp'
import iquique from '../assets/escudos/escudo_iquique.webp'
import defensa from '../assets/escudos/escudo_defensa.webp'
import velez from '../assets/escudos/escudo_velez.webp'
import instituto from '../assets/escudos/escudo_instituto.webp'
// ── Videos ────────────────────────────────────────────
//import video from '../assets/videos/video_highlight.mp4'

export const playerData = {
  name: 'GUIDO',
  fullName: 'MAINERO',
  number: 7,
  position: 'Extremo Derecho',
  positionShort: 'ED',
  nationality: 'Argentina',
  nationalityFlag: '🇦🇷',
  age: 31,
  height: '1,79 m',
  weight: '70 kg',
  foot: 'Derecho',
  birthDate: '23 de Marzo, 1995',
  birthPlace: 'Córdoba, Argentina',
  currentClub: 'C.A Platense',
  logoCurrentClub: platense,
  image: playerImg,
  imageContact: fondoContact,

  // Barras técnicas (0-100)
  stats: [
    { label: 'Pase', value: 88 },
    { label: 'Visión', value: 91 },
    { label: 'Regate', value: 85 },
    { label: 'Tiro', value: 90 },
    { label: 'Resistencia', value: 89 },
    { label: 'Velocidad', value: 87 },
  ],

  // Tarjetas de temporada
  seasonStats: [
    { label: 'Partidos', value: '77' },
    { label: 'Goles', value: '9' },
    { label: 'Asistencias', value: '14' },
    { label: 'Minutos', value: '5832' },
    { label: 'Pases', value: '1225' },
    { label: 'Valoración', value: '8.9' },
  ],

  // Timeline de clubes
  clubs: [
    {
      name: 'C.A Platense',
      country: 'Liga Argentina',
      years: '2024 — Actualidad',
      escudo: platense,
      titles: ['Liga Apertura 2025'],
    },
    {
      name: 'Instituto de Córdoba',
      country: 'Argentina',
      years: '2024',
      escudo: instituto,
    },
    {
      name: 'Sarmiento de Junín',
      country: 'Argentina',
      years: '2021 — 2023',
      escudo: sarmiento,
    },
    {
      name: 'Deportes Iquique',
      country: 'Chile',
      years: '2021',
      escudo: iquique,
      info: 'Préstamo',
    },
    {
      name: 'Defensa y Justicia',
      country: 'Argentina',
      years: '2020',
      escudo: defensa,
      info: 'Préstamo',
    },
    {
      name: 'Vélez Sarsfield',
      country: 'Argentina',
      years: '2018 — 2020',
      escudo: velez,
    },
    {
      name: 'Instituto de Córdoba',
      country: 'Argentina',
      years: '2014 — 2017',
      escudo: instituto,
      info: 'Debút Profesional',
    },
  ],

  // Videos
  videos: [
    {
      id: 'v1',
      title: 'Highlights 2026',
      duration: '0:46',
      cover: videoCover,
      category: 'Highlights',
    },
  ],

  // Prensa
  press: [
    {
      media: 'Olé',
      logo: '',
      title: '"Estuve tocado por la varita. No lo podía creer. Fue soñado. Es el premio para un grupo humilde que soñó en grande”',
      date: '01 Jun 2025',
      url: 'https://www.ole.com.ar/platense/mainero-futbol-heroe-leyenda-ascenso-resiliencia-guido-mainero_0_1VMkwKwLAn.html',
    },
    {
      media: 'TyC Sports',
      logo: '',
      title: 'El héroe del Platense campeón que sueña con jugar en Racing: ”No tengo preferencia por Boca o River”',
      date: '11 Feb 2026',
      url: 'https://www.tycsports.com/racing-club/guido-mainero-platense-campeon-suena-jugar-racing--id712480.html',
    },
    {
      media: 'CONMEBOL Libertadores',
      logo: '',
      title: '"Nos propusimos venir a hacer historia. Sabíamos los años que este club llevaba sin perder acá. Pusimos la cara y estuvimos a la altura"',
      date: '21 Abr 2026',
      url: 'https://gol.conmebol.com/libertadores/es/news/guido-mainero-el-hombre-de-los-goles-importantes',
    },
  ],


  // Redes sociales
  socialMedia: [
    {
      label: 'Instagram',
      icon: FaInstagram,
      iconBg: FaInstagram,
      handle: '@guidomainero',
      url: 'https://www.instagram.com/guidomainero/?hl=es',
      hoverColor: '#e42d6a',
    },
    {
      label: 'TransferMarkt',
      image: transfermkt,
      iconBg: IoMdStats,
      handle: 'Guido Mainero',
      url: 'https://www.transfermarkt.com.ar/guido-mainero/profil/spieler/441270',
      hoverColor: '#1f59c4',
    }

  ],

  // Contacto profesional + representante
  contact: [
    {
      title: 'Contacto profesional',
      label: 'Contacto',
      icon: FaEnvelope,
      handle: 'Corner Football Agency',
      url: 'https://www.instagram.com/cornerfootballagency',
      hoverColor: '#9c755a',
    },
    
    {
      title: 'Representante',
      label: 'Agencia',
      image: ledsportsLogo,
      handle: 'LED SPORTS',
      url: 'https://www.instagram.com/_ledsports/',
      hoverColor: '#C9A84C',
    },
  ],

  // ─── MARQUEE DATA ────────────────────────────────────────────────
  marqueeItems: [
    'CLUB ATLETICO PLATENSE', '◊', 'GUIDO MAINERO', '◊',  'DELANTERO', '◊', 'CORDOBA', '◊', 'ARGENTINA', '◊',
    '#7', '◊', 'LIGA ARGENTINA', '◊', 'ZURDO', '◊', '1.77m', '◊',
    'CLUB ATLETICO PLATENSE', '◊','GUIDO MAINERO', '◊', 'DELANTERO', '◊', 'CORDOBA', '◊', 'ARGENTINA', '◊',
    '#7', '◊', 'LIGA ARGENTINA', '◊', 'ZURDO', '◊', '1.77m', '◊',
  ],
}

export default playerData
