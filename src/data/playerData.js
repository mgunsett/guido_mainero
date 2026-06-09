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

// ── Imágenes del jugador ──────────────────────────────
import playerImg from '../assets/perfil1.webp'

// ── Galería ───────────────────────────────────────────
import g1 from '../assets/gallery/gallery_1.jpg'
import g2 from '../assets/gallery/gallery_2.jpg'
import g3 from '../assets/gallery/gallery_3.jpg'
import g4 from '../assets/gallery/gallery_4.jpg'
import g5 from '../assets/gallery/gallery_5.jpg'
import g6 from '../assets/gallery/gallery_6.jpg'
import g7 from '../assets/gallery/gallery_7.jpg'

// ── Logos de clubes ───────────────────────────────────
import platense from '../assets/escudos/escudo_platense.png'
import sarmiento from '../assets/escudos/escudo_sarmiento.png'
import iquique from '../assets/escudos/escudo_iquique.png'
import defensa from '../assets/escudos/escudo_defensa.png'
import velez from '../assets/escudos/escudo_velez.png'
import instituto from '../assets/escudos/escudo_instituto.webp'
// ── Videos ────────────────────────────────────────────
import video from '../assets/videos/video_highlight.mp4'

export const playerData = {
  name: 'GUIDO',
  fullName: 'MAINERO',
  number: 7,
  position: 'Extremo Derecho',
  positionShort: 'ED',
  nationality: 'Argentina',
  nationalityFlag: '🇦🇷',
  age: 31,
  height: '1,78 m',
  weight: '70 kg',
  foot: 'Izquierdo  ',
  birthDate: '23 de Marzo, 1995',
  birthPlace: 'Córdoba, Argentina',
  currentClub: 'C.A Platense',
  logoCurrentClub: platense,
  image: playerImg,

  // Barras técnicas (0-100)
  stats: [
    { label: 'Pase', value: 88 },
    { label: 'Visión', value: 91 },
    { label: 'Regate', value: 85 },
    { label: 'Tiro', value: 79 },
    { label: 'Resistencia', value: 82 },
    { label: 'Velocidad', value: 87 },
  ],

  // Tarjetas de temporada
  seasonStats: [
    { label: 'Partidos', value: '22' },
    { label: 'Goles', value: '1' },
    { label: 'Asistencias', value: '4' },
    { label: 'Minutos', value: '1502' },
    { label: 'Pases', value: '78' },
    { label: 'Valoración', value: '7.8' },
  ],

  // Timeline de clubes
  clubs: [
    {
      name: 'C.A Platense',
      country: 'Liga Argentina',
      years: '2023 — Actualidad',
      escudo: platense,
      titles: ['Liga Apertura 2025'],
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
      src: video,
      previewSrc: video,
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
      id: 'ph1',
      src: g1,
      alt: 'Guido Mainero en acción',
      caption: 'Final vs River Plate 2025',
      category: 'Campeones',
      aspect: '3/4',
    },
    {
      id: 'ph2',
      src: g2,
      alt: 'Guido Mainero celebrando',
      caption: 'Copa Libertadores 2026',
      category: 'Partido',
      aspect: '3/4',
    },
    {
      id: 'ph3',
      src: g3,
      alt: 'Guido Mainero retrato',
      caption: 'Liga Argentina 2025',
      category: 'Partido',
      aspect: '3/4',
    },
    {
      id: 'ph4',
      src: g4,
      alt: 'Guido Mainero entrenamiento',
      caption: 'Copa Libertadores 2026',
      category: 'Partido',
      aspect: '3/4',
    },
    {
      id: 'ph5',
      src: g5,
      alt: 'Guido Mainero',
      caption: 'Copa Argentina 2025',
      category: 'Partido',
      aspect: '4/4',
    },
    {
      id: 'ph6',
      src: g6,
      alt: 'Guido Mainero',
      caption: 'Capitán',
      category: 'Equipo',
      aspect: '2/4',
    },
    {
      id: 'ph7',
      src: g7,
      alt: 'Guido Mainero',
      caption: 'Liga Argentina 2026',
      category: 'Partido',
      aspect: '3/4',
    }
  ],

  // Redes sociales
  socialMedia: [
    {
      label: 'Instagram',
      icon: FaInstagram,
      handle: '@guidomainero',
      url: 'https://instagram.com',
      hoverColor: '#E1306C',
    },
    {
      label: 'TransferMark',
      icon: IoMdStats,
      handle: 'Guido Mainero',
      url: 'https://transfermark.com',
      hoverColor: '#1f59c4',
    }

  ],

  // Contacto profesional + representante
  contact: [
    {
      title: 'Contacto profesional',
      label: 'Email',
      icon: FaEnvelope,
      handle: 'contacto@guidomainero.com',
      url: 'mailto:contacto@guidomainero.com',
      hoverColor: '#9c755a',
    },
    {
      title: 'Contacto profesional',
      label: 'WhatsApp',
      icon: FaWhatsapp,
      handle: '+54 9 341 000 0000',
      url: 'https://wa.me/5493410000000',
      hoverColor: '#25D366',
    },
    {
      title: 'Representante',
      label: 'Agencia',
      icon: FaHandshake,
      handle: 'Sports Management',
      url: 'mailto:rep@sportsmanagement.com',
      hoverColor: '#C9A84C',
    },
    {
      title: 'Representante',
      label: 'Teléfono',
      icon: FaPhone,
      handle: '+54 9 341 111 1111',
      url: 'tel:+5493411111111',
      hoverColor: '#C9A84C',
    },
  ],

  // ─── MARQUEE DATA ────────────────────────────────────────────────
  marqueeItems: [
    'CLUB ATLETICO PLATENSE', '·', 'DELANTERO', '·', 'CORDOBA', '·', 'ARGENTINA', '·',
    '#7', '·', 'LIGA ARGENTINA', '·', 'ZURDO', '·', '1.77m', '·',
    'CLUB ATLETICO PLATENSE', '·', 'DELANTERO', '·', 'CORDOBA', '·', 'ARGENTINA', '·',
    '#7', '·', 'LIGA ARGENTINA', '·', 'ZURDO', '·', '1.77m', '·',
  ],
}

export default playerData
