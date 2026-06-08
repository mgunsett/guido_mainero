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

// ── Imágenes del jugador ──────────────────────────────
import playerImg from '../assets/perfil1.webp'

// ── Galería ───────────────────────────────────────────
import g1 from '../assets/gallery/050A0211.webp'
import g2 from '../assets/gallery/1V3A3421.webp'
import g3 from '../assets/gallery/1V3A4852.jpg'
import g4 from '../assets/gallery/1V3A5808.webp'
import g5 from '../assets/gallery/1V6A5944.webp'

// ── Logos de clubes ───────────────────────────────────
import platense from '../assets/escudos/escudo_platense.webp'
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
      cover: g2,
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
      title: 'La nueva joya del mediocampo argentino',
      date: '15 Mar 2024',
      url: '#',
    },
    {
      media: 'TyC Sports',
      logo: '',
      title: 'Guido Mainero, el 10 que ilusiona a los hinchas',
      date: '02 Feb 2024',
      url: '#',
    },
    {
      media: 'ESPN',
      logo: '',
      title: 'Análisis: el talento que pisa el área',
      date: '20 Dic 2023',
      url: '#',
    },
  ],

  // Galería
  gallery: [
    {
      id: 'ph1',
      src: g1,
      alt: 'Guido Mainero en acción',
      caption: 'En el campo de juego',
      category: 'Partido',
      aspect: '3/4',
    },
    {
      id: 'ph2',
      src: g2,
      alt: 'Guido Mainero celebrando',
      caption: 'Celebración de gol',
      category: 'Partido',
      aspect: '3/4',
    },
    {
      id: 'ph3',
      src: g3,
      alt: 'Guido Mainero retrato',
      caption: 'Sesión de fotos',
      category: 'Estudio',
      aspect: '3/4',
    },
    {
      id: 'ph4',
      src: g4,
      alt: 'Guido Mainero entrenamiento',
      caption: 'Entrenamiento',
      category: 'Training',
      aspect: '3/4',
    },
    {
      id: 'ph5',
      src: g5,
      alt: 'Guido Mainero',
      caption: 'Concentración',
      category: 'Partido',
      aspect: '3/4',
    },
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
      label: 'X / Twitter',
      icon: FaXTwitter,
      handle: '@guidomainero',
      url: 'https://x.com',
      hoverColor: '#ffffff',
    },
    {
      label: 'TikTok',
      icon: FaTiktok,
      handle: '@guidomainero',
      url: 'https://tiktok.com',
      hoverColor: '#25F4EE',
    },
    {
      label: 'YouTube',
      icon: FaYoutube,
      handle: 'Guido Mainero',
      url: 'https://youtube.com',
      hoverColor: '#FF0000',
    },
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
