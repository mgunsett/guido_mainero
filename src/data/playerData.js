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
import platense from '../assets/escudo_platense.webp'
// ── Videos ────────────────────────────────────────────
import heroVideo from '../assets/videos/Diseño sin título (1).mp4'

export const playerData = {
  name: 'GUIDO MAINERO',
  fullName: 'Guido Mainero',
  number: 7,
  position: 'Mediocampista Ofensivo',
  positionShort: 'MCO',
  nationality: 'Argentina',
  nationalityFlag: '🇦🇷',
  age: 24,
  height: '1,77 m',
  weight: '70 kg',
  foot: 'Izquierdo  ',
  birthDate: '23 de Marzo, 1995',
  birthPlace: 'Córdoba, Argentina',
  currentClub: 'Club Atlético Platense',
  logoCurrentClub: platense,
  image: playerImg,

  // Barras técnicas (0-100)
  stats: [
    { label: 'Pase', value: 88 },
    { label: 'Visión', value: 91 },
    { label: 'Regate', value: 85 },
    { label: 'Tiro', value: 79 },
    { label: 'Resistencia', value: 83 },
    { label: 'Velocidad', value: 80 },
  ],

  // Tarjetas de temporada
  seasonStats: [
    { label: 'Partidos', value: '32' },
    { label: 'Goles', value: '11' },
    { label: 'Asistencias', value: '14' },
    { label: 'Minutos', value: '2680' },
    { label: 'Pases clave', value: '58' },
    { label: 'Valoración', value: '7.8' },
  ],

  // Timeline de clubes
  clubs: [
    {
      name: 'Inferiores',
      country: 'Argentina',
      years: '2014 — 2019',
      logo: '',
      titles: ['Campeón Juvenil 2018'],
      info: 'Formación en divisiones inferiores.',
    },
    {
      name: 'Primera División',
      country: 'Argentina',
      years: '2020 — 2022',
      logo: '',
      titles: ['Debut profesional', 'Copa Liga 2021'],
      info: 'Consolidación como titular.',
    },
    {
      name: 'Club Atlético',
      country: 'Argentina',
      years: '2022 — Actualidad',
      logo: '',
      titles: ['Subcampeón 2023', 'Mejor jugador joven'],
      info: 'Referente del mediocampo.',
    },
  ],

  // Videos
  videos: [
    {
      id: 'v1',
      title: 'Highlights — Temporada 2024',
      duration: '2:14',
      thumbnail: g2,
      cover: g2,
      src: heroVideo,
      previewSrc: heroVideo,
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

  marqueeItems: [
    'MEDIOCAMPISTA · CREADOR DE JUEGO · #10',
    'VISIÓN · TÉCNICA · GOL',
    'GUIDO MAINERO · ARGENTINA',
    'PASIÓN POR EL FÚTBOL',
  ],
}

export default playerData
