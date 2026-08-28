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

// ── Galería ───────────────────────────────────────────
import g1 from '../assets/gallery/gallery_1.webp'
import g2 from '../assets/gallery/gallery_2.webp'
import g3 from '../assets/gallery/gallery_3.webp'
import g4 from '../assets/gallery/gallery_4.webp'
import g5 from '../assets/gallery/gallery_5.webp'
import g6 from '../assets/gallery/gallery_6.webp'
import g7 from '../assets/gallery/gallery_7.webp'
import g8 from '../assets/gallery/gallery_8.webp'
import g9 from '../assets/gallery/gallery_9.webp'
import g10 from '../assets/gallery/gallery_10.webp'
import g11 from '../assets/gallery/gallery_11.webp'
import g12 from '../assets/gallery/gallery_12.webp'
import g13 from '../assets/gallery/gallery_13.webp'
import g14 from '../assets/gallery/gallery_14.webp'
import g15 from '../assets/gallery/gallery_15.webp'
import g16 from '../assets/gallery/gallery_16.webp'

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
    { label: 'Tiro', value: 79 },
    { label: 'Resistencia', value: 89 },
    { label: 'Velocidad', value: 87 },
  ],

  // Tarjetas de temporada
  seasonStats: [
    { label: 'Partidos', value: '68' },
    { label: 'Goles', value: '7' },
    { label: 'Asistencias', value: '10' },
    { label: 'Minutos', value: '5209' },
    { label: 'Pases', value: '1071' },
    { label: 'Valoración', value: '7.9' },
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
      thumbnail: g2,
      cover: g7,
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

  // Galería
  gallery: [
    {
      id: 'ph12',
      src: g12,
      alt: 'Guido Mainero',
      aspect: '3/4',
    },
    {
      id: 'ph13',
      src: g13,
      alt: 'Guido Mainero',
      aspect: '3/4',
    },
    { 
      id: 'ph14',
      src: g14,
      alt: 'Guido Mainero',
      aspect: '3/4',
    },
    {
      id: 'ph15',
      src: g15,
      alt: 'Guido Mainero',
      aspect: '3/4',
    },
    {
      id: 'ph16',
      src: g16,
      alt: 'Guido Mainero',
      aspect: '3/4',
    },
    {
      id: 'ph1',
      src: g1,
      alt: 'Guido Mainero en acción',
      aspect: '3/4',
    },
    {
      id: 'ph2',
      src: g2,
      alt: 'Guido Mainero celebrando',
      aspect: '3/4',
    },
    {
      id: 'ph3',
      src: g3,
      alt: 'Guido Mainero retrato',
      aspect: '3/4',
    },
    {
      id: 'ph4',
      src: g4,
      alt: 'Guido Mainero entrenamiento',
      aspect: '3/4',
    },
    {
      id: 'ph5',
      src: g5,
      alt: 'Guido Mainero',
      aspect: '4/4',
    },
    {
      id: 'ph6',
      src: g6,
      alt: 'Guido Mainero',
      aspect: '2/4',
    },
    {
      id: 'ph7',
      src: g7,
      alt: 'Guido Mainero',
      aspect: '3/4',
    },
    {
      id: 'ph8',
      src: g8,
      alt: 'Guido Mainero',
      aspect: '3/4',
    },
    {
      id: 'ph9',
      src: g9,
      alt: 'Guido Mainero',
      aspect: '3/4',
    },
    {
      id: 'ph10',
      src: g10,
      alt: 'Guido Mainero',
      aspect: '3/4',
    },
    {
      id: 'ph11',
      src: g11,
      alt: 'Guido Mainero',
      aspect: '3/4',
    }
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
