import * as XLSX from 'xlsx';
import { LIBRARY_CONTENT } from '../data/libraryContent.ts';
import { VIDEO_PODCASTS } from '../data/podcasts.ts';
import { PODCASTS_MP3 } from '../data/podcastsMP3.ts';
import { MICRO_PROGRAMS } from '../data/microPrograms.ts';
import { LEO_CASTRILLO_TRACKS } from '../data/leoCastrillo.ts';
import { WEEKLY_EDITION_CONTENT } from '../data/weeklyContent.ts';
import { SOCIAL_NETWORKS } from '../components/SocialLinks.tsx';

export interface InventoryRow {
  ID: string;
  Categoria: string;
  Titulo: string;
  Autor_O_Artista: string;
  Descripcion_O_Resena: string;
  Formato: string;
  Enlace_Multimedia: string;
  Enlace_Portada_O_Doc: string;
  Fecha_O_Edicion: string;
  Fuentes_O_Notas: string;
}

// 1. Extraer Revistas
export const getRevistasRows = (): InventoryRow[] => {
  return LIBRARY_CONTENT
    .filter(item => item.category === 'Revistas' || item.category === 'Ediciones')
    .map(item => ({
      ID: item.id,
      Categoria: 'Revistas Digitales',
      Titulo: item.title,
      Autor_O_Artista: item.author || 'El Nexo Digital',
      Descripcion_O_Resena: item.review || '',
      Formato: item.externalUrl?.includes('heyzine') ? 'Flipbook Interactivo (Heyzine)' : (item.pdfUrl ? 'PDF / Documento' : 'Digital'),
      Enlace_Multimedia: item.externalUrl || item.pdfUrl || '',
      Enlace_Portada_O_Doc: item.imageUrl || '',
      Fecha_O_Edicion: item.publicationDate || '2026',
      Fuentes_O_Notas: item.sources || 'Investigación El Nexo Digital'
    }));
};

// 2. Extraer Documentos de Investigación Extensos
export const getDocumentosRows = (): InventoryRow[] => {
  const docsFromLibrary = LIBRARY_CONTENT
    .filter(item => item.id.startsWith('doc_') || item.pdfUrl)
    .map(item => ({
      ID: item.id,
      Categoria: 'Documentos Extensos de Investigación',
      Titulo: item.title,
      Autor_O_Artista: item.author || 'El Nexo Digital',
      Descripcion_O_Resena: item.review || '',
      Formato: item.pdfUrl?.endsWith('.docx') ? 'Documento Word (.docx)' : (item.pdfUrl?.endsWith('.pdf') ? 'Dossier PDF (.pdf)' : 'Documento / Lectura'),
      Enlace_Multimedia: item.pdfUrl || item.externalUrl || '',
      Enlace_Portada_O_Doc: item.imageUrl || '',
      Fecha_O_Edicion: item.publicationDate || 'Investigación Especial',
      Fuentes_O_Notas: item.sources || 'Archivo documental'
    }));

  // Agregar documentos dedicados adicionales
  const extraDocs: InventoryRow[] = [
    {
      ID: 'doc_celulosa_completo',
      Categoria: 'Documentos Extensos de Investigación',
      Titulo: 'Evolución y Trascendencia de la Industria de Celulosa en Uruguay',
      Autor_O_Artista: 'Archivo El Nexo Digital',
      Descripcion_O_Resena: 'Un análisis multidimensional sobre el desarrollo, la soberanía territorial y el impacto socioambiental de las plantas de celulosa.',
      Formato: 'Documento Word (.docx)',
      Enlace_Multimedia: 'https://res.cloudinary.com/dnauavz56/raw/upload/Evoluci%C3%B3n_y_Trascendencia_de_la_Industria_de_Celulosa_en_Uruguay_Un_An%C3%A1lisis_Multidimensional_sobre_el_Desarrollo_la_Soberan%C3%ADa_y_el_Impacto_Socioambiental_y8opdq.docx',
      Enlace_Portada_O_Doc: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=600',
      Fecha_O_Edicion: 'Febrero, 2025',
      Fuentes_O_Notas: 'Investigación sobre soberanía y recursos naturales'
    },
    {
      ID: 'doc_lunar_apolo_artemis',
      Categoria: 'Documentos Extensos de Investigación',
      Titulo: 'Exploración Lunar: Del Apolo a Artemis',
      Autor_O_Artista: 'Archivo El Nexo Digital',
      Descripcion_O_Resena: 'Análisis exhaustivo sobre la reconfiguración del ego colectivo humano y la geopolítica de los recursos espaciales.',
      Formato: 'Documento Word (.docx)',
      Enlace_Multimedia: 'https://res.cloudinary.com/dnauavz56/raw/upload/Exploraci%C3%B3n_Lunar_Apolo_a_Artemis_tc7zwm.docx',
      Enlace_Portada_O_Doc: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=600',
      Fecha_O_Edicion: 'Febrero, 2025',
      Fuentes_O_Notas: 'Investigación General de El Nexo Digital'
    },
    {
      ID: 'doc_bataille_dossier_7cap',
      Categoria: 'Documentos Extensos de Investigación',
      Titulo: 'Investigación sobre Georges Bataille (Gasto, Sol, Erotismo, Fascismo)',
      Autor_O_Artista: 'El Nexo Digital',
      Descripcion_O_Resena: 'Dossier filosófico y político profundo de 7 capítulos sobre el pensamiento transgresor de Georges Bataille.',
      Formato: 'Dossier PDF (.pdf) + Audio MP3',
      Enlace_Multimedia: 'https://res.cloudinary.com/dnauavz56/image/upload/Investigaci%C3%B3n_sobre_Georges_Bataille_1_g1sjkw.pdf',
      Enlace_Portada_O_Doc: 'https://res.cloudinary.com/dnauavz56/image/upload/bataille_chwzaq.png',
      Fecha_O_Edicion: 'Investigación Especial',
      Fuentes_O_Notas: 'Audio complementario disponible en la radio'
    },
    {
      ID: 'doc_macondo_urdimbre_dossier',
      Categoria: 'Documentos Extensos de Investigación',
      Titulo: 'La Urdimbre de Macondo: Realismo Mágico, Soledad y Violencia',
      Autor_O_Artista: 'Gabriel García Márquez / Archivo El Nexo',
      Descripcion_O_Resena: 'Estudio documental y análisis de censura, estructura y poética de Cien Años de Soledad.',
      Formato: 'Dossier PDF (.pdf)',
      Enlace_Multimedia: 'https://res.cloudinary.com/dnauavz56/image/upload/La_urdimbre_de_Macondo__Realismo_M%C3%A1gico_Soledad_y_Violencia_en_la_obra_de_Gabriel_Garc%C3%ADa_M%C3%A1rquez_i2pfte.pdf',
      Enlace_Portada_O_Doc: 'https://res.cloudinary.com/dnauavz56/image/upload/100_de_solewdad_mc91i5.webp',
      Fecha_O_Edicion: 'Octubre, 2024',
      Fuentes_O_Notas: 'Análisis generado y curado con NotebookLM'
    },
    {
      ID: 'doc_hesse_abalorios_guia',
      Categoria: 'Documentos Extensos de Investigación',
      Titulo: 'El Juego de los Abalorios: Síntesis del Conocimiento y Castalia',
      Autor_O_Artista: 'Hermann Hesse / Archivo El Nexo',
      Descripcion_O_Resena: 'Guía y resumen conceptual sobre la crisis del espíritu y la búsqueda de la unidad trascendental.',
      Formato: 'Dossier PDF (.pdf)',
      Enlace_Multimedia: 'https://res.cloudinary.com/dnauavz56/image/upload/resumen_el_juego_de_abalorios_tz8ijd.pdf',
      Enlace_Portada_O_Doc: 'https://res.cloudinary.com/dnauavz56/image/upload/juego_de_abalorios_rmbqpw.webp',
      Fecha_O_Edicion: 'Marzo, 2025',
      Fuentes_O_Notas: 'Análisis profundo de El Nexo Digital'
    },
    {
      ID: 'investigacion_3',
      Categoria: 'Documentos Extensos de Investigación',
      Titulo: 'Análisis Exhaustivo de la Encíclica Magnifica Humanitas del Papa León XIV',
      Autor_O_Artista: 'Leo Castrillo / Gemini',
      Descripcion_O_Resena: 'La carta encíclica Magnifica Humanitas («Magnífica humanidad»), promulgada por el papa León XIV, aborda de forma sistemática las implicaciones éticas, antropocéntricas y sociales de la IA frente al paradigma tecnocrático.',
      Formato: 'Documento bruto en PDF / Playlist de Análisis',
      Enlace_Multimedia: 'https://www.youtube.com/playlist?list=PLRkKe7b6h28Y',
      Enlace_Portada_O_Doc: 'https://images.unsplash.com/photo-1548625361-1960249f315a?auto=format&fit=crop&q=80&w=800',
      Fecha_O_Edicion: 'Edición Semanal Activa',
      Fuentes_O_Notas: 'Doctrina Social de la Iglesia • Análisis Gemini & El Nexo Digital'
    },
    {
      ID: 'investigacion_4',
      Categoria: 'Documentos Extensos de Investigación',
      Titulo: 'Auge y Ocaso del Frigorífico Nacional de Uruguay',
      Autor_O_Artista: 'Leo Castrillo / NotebookLM',
      Descripcion_O_Resena: 'Visión integral de la industria ganadera en Uruguay, analizando su evolución histórica, el monopolio del abasto capitalino de 1928, las vedas de carne de los años 70 y la experiencia de EFCSA en la Villa del Cerro.',
      Formato: 'Dossier de Investigación Histórica',
      Enlace_Multimedia: 'https://elnexodigital.com',
      Enlace_Portada_O_Doc: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800',
      Fecha_O_Edicion: 'Edición Semanal Activa',
      Fuentes_O_Notas: 'Archivo Histórico Nacional • Curaduría NotebookLM & El Nexo Digital'
    }
  ];

  // Unificar evitando IDs duplicados
  const map = new Map<string, InventoryRow>();
  [...docsFromLibrary, ...extraDocs].forEach(d => map.set(d.ID, d));
  return Array.from(map.values());
};

// 3. Extraer Podcasts en Video (MP4)
export const getPodcastsVideoRows = (): InventoryRow[] => {
  return VIDEO_PODCASTS.map((vp, index) => ({
    ID: vp.id || `vp_${index + 1}`,
    Categoria: 'Podcasts en Video (MP4)',
    Titulo: vp.title,
    Autor_O_Artista: 'Leo Castrillo • El Nexo Digital',
    Descripcion_O_Resena: vp.transcript || '',
    Formato: 'Video MP4 (Full HD/HD)',
    Enlace_Multimedia: vp.videoUrl,
    Enlace_Portada_O_Doc: vp.imageUrl || '',
    Fecha_O_Edicion: 'Episodio Oficial',
    Fuentes_O_Notas: 'Producción Audiovisual Original'
  }));
};

// 4. Extraer Podcasts en Audio (MP3)
export const getPodcastsAudioRows = (): InventoryRow[] => {
  return PODCASTS_MP3.map((mp, index) => ({
    ID: mp.id || `mp3_${index + 1}`,
    Categoria: 'Podcasts en Audio (MP3)',
    Titulo: mp.title,
    Autor_O_Artista: mp.artist || 'El Nexo Digital',
    Descripcion_O_Resena: mp.description || '',
    Formato: 'Audio MP3',
    Enlace_Multimedia: mp.audioUrl,
    Enlace_Portada_O_Doc: mp.coverUrl || '',
    Fecha_O_Edicion: 'Episodio Oficial',
    Fuentes_O_Notas: 'Edición Sonora El Nexo Digital'
  }));
};

// 5. Extraer Microprogramas de Radio
export const getMicroprogramasRows = (): InventoryRow[] => {
  return MICRO_PROGRAMS.map((m, index) => ({
    ID: m.id || `micro_${index + 1}`,
    Categoria: 'Microprogramas de Radio (3 min)',
    Titulo: m.title,
    Autor_O_Artista: m.artist || 'El Nexo Digital',
    Descripcion_O_Resena: m.description || '',
    Formato: `Audio MP3 (${m.duration || '3 min'})`,
    Enlace_Multimedia: m.audioUrl,
    Enlace_Portada_O_Doc: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1777939872/Copilot_20260504_211025_nw8vlh.png',
    Fecha_O_Edicion: 'Rotación Diaria',
    Fuentes_O_Notas: 'Micro radial para difusión y redes'
  }));
};

// 6. Extraer Música de Leo Castrillo
export const getMusicaLeoRows = (): InventoryRow[] => {
  return LEO_CASTRILLO_TRACKS.map((track, index) => {
    // Extraer título limpio de la descripción si contiene guión
    const parts = track.description.split('–');
    const titulo = parts.length > 1 ? parts[1].trim() : track.description;
    return {
      ID: track.id || `leo_track_${index + 1}`,
      Categoria: 'Música de Leo Castrillo',
      Titulo: titulo,
      Autor_O_Artista: 'Leo Castrillo',
      Descripcion_O_Resena: track.description,
      Formato: 'Audio MP3 Original',
      Enlace_Multimedia: track.url,
      Enlace_Portada_O_Doc: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=600',
      Fecha_O_Edicion: 'Composición Original',
      Fuentes_O_Notas: 'Catálogo Musical de Autor'
    };
  });
};

// 7. Extraer Artículos Periodísticos de Investigación
export const getArticulosRows = (): InventoryRow[] => {
  return (WEEKLY_EDITION_CONTENT.pages || [])
    .filter((p): p is import('../types.ts').OddPage => p.type === 'odd')
    .map((page, index) => ({
      ID: page.id || `articulo_${index + 1}`,
      Categoria: 'Artículos de Portada / Investigaciones',
      Titulo: page.headline,
      Autor_O_Artista: 'El Nexo Digital',
      Descripcion_O_Resena: `${page.subtitle} — ${page.content.substring(0, 200)}...`,
      Formato: 'Artículo Periodístico Editorial',
      Enlace_Multimedia: 'https://elnexodigital.com',
      Enlace_Portada_O_Doc: WEEKLY_EDITION_CONTENT.cover.imageUrl,
      Fecha_O_Edicion: 'Edición Semanal Activa',
      Fuentes_O_Notas: Array.isArray(page.sources) ? page.sources.join('; ') : 'Redacción El Nexo'
    }));
};

// 8. Extraer Postales Audiovisuales
export const getPostalesRows = (): InventoryRow[] => {
  return LIBRARY_CONTENT
    .filter(item => item.category === 'Postales')
    .map(item => ({
      ID: item.id,
      Categoria: 'Postales Audiovisuales',
      Titulo: item.title,
      Autor_O_Artista: item.author || 'El Nexo Digital',
      Descripcion_O_Resena: item.review || '',
      Formato: item.videoUrl ? 'Video Postal MP4' : 'Fotografía Digital',
      Enlace_Multimedia: item.videoUrl || '',
      Enlace_Portada_O_Doc: item.imageUrl || '',
      Fecha_O_Edicion: item.publicationDate || 'Colección Abierta',
      Fuentes_O_Notas: item.sources || 'Producción Audiovisual de Colonia / Sauce'
    }));
};

// 9. Extraer Libros y Ensayos
export const getLibrosRows = (): InventoryRow[] => {
  return LIBRARY_CONTENT
    .filter(item => item.category === 'Libros')
    .map(item => ({
      ID: item.id,
      Categoria: 'Libros y Ensayos Filosóficos',
      Titulo: item.title,
      Autor_O_Artista: item.author,
      Descripcion_O_Resena: item.review || '',
      Formato: 'Multimedia (Video + PDF Resumen)',
      Enlace_Multimedia: item.videoUrl || item.audioUrl || '',
      Enlace_Portada_O_Doc: item.pdfUrl || item.imageUrl || '',
      Fecha_O_Edicion: item.publicationDate || 'Recomendación Especial',
      Fuentes_O_Notas: item.sources || 'Análisis profundo de El Nexo'
    }));
};

// 10. Extraer Canales y Redes Sociales
export const getRedesRows = (): InventoryRow[] => {
  return SOCIAL_NETWORKS.map((sn, index) => ({
    ID: `red_${index + 1}`,
    Categoria: 'Canales y Redes Sociales Oficiales',
    Titulo: sn.name,
    Autor_O_Artista: sn.handle || '@leocastrillo',
    Descripcion_O_Resena: `Canal oficial de ${sn.name} para El Nexo Digital y Leo Castrillo.`,
    Formato: 'Perfil / Canal Oficial Web',
    Enlace_Multimedia: sn.url,
    Enlace_Portada_O_Doc: '',
    Fecha_O_Edicion: 'Canal Permanente',
    Fuentes_O_Notas: sn.badge ? `Distintivo: ${sn.badge}` : 'Comunidad y difusión'
  }));
};

// Hoja de Resumen Panorama
export const getResumenRows = () => {
  const revistas = getRevistasRows().length;
  const docs = getDocumentosRows().length;
  const podcastsVideo = getPodcastsVideoRows().length;
  const podcastsAudio = getPodcastsAudioRows().length;
  const microprogramas = getMicroprogramasRows().length;
  const musicaLeo = getMusicaLeoRows().length;
  const articulos = getArticulosRows().length;
  const postales = getPostalesRows().length;
  const libros = getLibrosRows().length;
  const redes = getRedesRows().length;
  const total = revistas + docs + podcastsVideo + podcastsAudio + microprogramas + musicaLeo + articulos + postales + libros + redes;

  return [
    {
      'MÉTRICA / CATEGORÍA': '📌 TOTAL DE ELEMENTOS EN EL NEXO DIGITAL',
      'CANTIDAD DE ÍTEMS': total,
      'DESCRIPCIÓN Y FORMATO PRINCIPAL': 'Catálogo consolidado completo en la base de datos de la aplicación.'
    },
    {
      'MÉTRICA / CATEGORÍA': '📚 1. Revistas Digitales y Ediciones',
      'CANTIDAD DE ÍTEMS': revistas,
      'DESCRIPCIÓN Y FORMATO PRINCIPAL': 'Ediciones interactivas en Flipbook (Heyzine) y publicaciones visuales.'
    },
    {
      'MÉTRICA / CATEGORÍA': '📄 2. Documentos Extensos de Investigación',
      'CANTIDAD DE ÍTEMS': docs,
      'DESCRIPCIÓN Y FORMATO PRINCIPAL': 'Monografías, ensayos y dossieres descargables en Word (.docx) y PDF.'
    },
    {
      'MÉTRICA / CATEGORÍA': '🎬 3. Podcasts en Video (MP4)',
      'CANTIDAD DE ÍTEMS': podcastsVideo,
      'DESCRIPCIÓN Y FORMATO PRINCIPAL': 'Capítulos completos en video con transcripción y análisis filosófico/cultural.'
    },
    {
      'MÉTRICA / CATEGORÍA': '🎙️ 4. Podcasts en Audio (MP3)',
      'CANTIDAD DE ÍTEMS': podcastsAudio,
      'DESCRIPCIÓN Y FORMATO PRINCIPAL': 'Episodios y reflexiones de audio MP3 para escucha móvil o en la web.'
    },
    {
      'MÉTRICA / CATEGORÍA': '📻 5. Microprogramas de Radio',
      'CANTIDAD DE ÍTEMS': microprogramas,
      'DESCRIPCIÓN Y FORMATO PRINCIPAL': 'Cápsulas de 3 minutos de duración con locución, análisis y rotación.'
    },
    {
      'MÉTRICA / CATEGORÍA': '🎵 6. Música de Leo Castrillo',
      'CANTIDAD DE ÍTEMS': musicaLeo,
      'DESCRIPCIÓN Y FORMATO PRINCIPAL': 'Composiciones propias, experimentos sonoros y música de autor.'
    },
    {
      'MÉTRICA / CATEGORÍA': '📰 7. Artículos de Portada e Investigaciones',
      'CANTIDAD DE ÍTEMS': articulos,
      'DESCRIPCIÓN Y FORMATO PRINCIPAL': 'Notas de fondo de la edición semanal activa.'
    },
    {
      'MÉTRICA / CATEGORÍA': '📮 8. Postales Audiovisuales',
      'CANTIDAD DE ÍTEMS': postales,
      'DESCRIPCIÓN Y FORMATO PRINCIPAL': 'Cápsulas poéticas visuales y sonoras (Colonia del Sacramento, Puerto Sauce).'
    },
    {
      'MÉTRICA / CATEGORÍA': '📖 9. Libros y Ensayos',
      'CANTIDAD DE ÍTEMS': libros,
      'DESCRIPCIÓN Y FORMATO PRINCIPAL': 'Obras fundamentales con análisis y resúmenes guiados.'
    },
    {
      'MÉTRICA / CATEGORÍA': '🌐 10. Canales y Redes Sociales Oficiales',
      'CANTIDAD DE ÍTEMS': redes,
      'DESCRIPCIÓN Y FORMATO PRINCIPAL': 'YouTube, WhatsApp, Instagram, TikTok, Facebook, Threads y X.'
    },
    {
      'MÉTRICA / CATEGORÍA': 'ℹ️ INSTRUCCIÓN PARA LEO',
      'CANTIDAD DE ÍTEMS': '---',
      'DESCRIPCIÓN Y FORMATO PRINCIPAL': 'Para agregar nuevos ítems: puedes completar filas nuevas en cualquier pestaña con el título, descripción y link, y yo las incorporo inmediatamente a la plataforma.'
    }
  ];
};

// Generar el archivo Excel Workbook completo con múltiples pestañas y formato
export const createMasterExcelWorkbook = (): XLSX.WorkBook => {
  const wb = XLSX.utils.book_new();

  // Función auxiliar para autoajustar columnas
  const formatSheet = (ws: XLSX.WorkSheet, colWidths: number[]) => {
    ws['!cols'] = colWidths.map(w => ({ wch: w }));
  };

  // 1. Pestaña: Resumen
  const wsResumen = XLSX.utils.json_to_sheet(getResumenRows());
  formatSheet(wsResumen, [42, 20, 80]);
  XLSX.utils.book_append_sheet(wb, wsResumen, '00_Resumen_General');

  // 2. Pestaña: Revistas
  const wsRevistas = XLSX.utils.json_to_sheet(getRevistasRows());
  formatSheet(wsRevistas, [16, 20, 36, 25, 70, 30, 65, 65, 20, 35]);
  XLSX.utils.book_append_sheet(wb, wsRevistas, '01_Revistas_Digitales');

  // 3. Pestaña: Documentos Extensos
  const wsDocs = XLSX.utils.json_to_sheet(getDocumentosRows());
  formatSheet(wsDocs, [22, 25, 42, 25, 75, 28, 70, 65, 22, 40]);
  XLSX.utils.book_append_sheet(wb, wsDocs, '02_Documentos_Extensos');

  // 4. Pestaña: Podcasts en Video MP4
  const wsPodVideo = XLSX.utils.json_to_sheet(getPodcastsVideoRows());
  formatSheet(wsPodVideo, [14, 24, 38, 30, 80, 24, 70, 65, 18, 30]);
  XLSX.utils.book_append_sheet(wb, wsPodVideo, '03_Podcasts_Video_MP4');

  // 5. Pestaña: Podcasts en Audio MP3
  const wsPodAudio = XLSX.utils.json_to_sheet(getPodcastsAudioRows());
  formatSheet(wsPodAudio, [16, 24, 42, 28, 80, 16, 70, 65, 18, 30]);
  XLSX.utils.book_append_sheet(wb, wsPodAudio, '04_Podcasts_Audio_MP3');

  // 6. Pestaña: Microprogramas de Radio
  const wsMicros = XLSX.utils.json_to_sheet(getMicroprogramasRows());
  formatSheet(wsMicros, [16, 28, 36, 24, 75, 20, 70, 65, 18, 30]);
  XLSX.utils.book_append_sheet(wb, wsMicros, '05_Microprogramas_Radio');

  // 7. Pestaña: Música de Leo Castrillo
  const wsMusicaLeo = XLSX.utils.json_to_sheet(getMusicaLeoRows());
  formatSheet(wsMusicaLeo, [16, 25, 40, 20, 75, 20, 70, 65, 22, 30]);
  XLSX.utils.book_append_sheet(wb, wsMusicaLeo, '06_Musica_Leo_Castrillo');

  // 8. Pestaña: Artículos Periodísticos
  const wsArticulos = XLSX.utils.json_to_sheet(getArticulosRows());
  formatSheet(wsArticulos, [18, 30, 36, 22, 80, 25, 30, 65, 24, 40]);
  XLSX.utils.book_append_sheet(wb, wsArticulos, '07_Articulos_Investigacion');

  // 9. Pestaña: Postales
  const wsPostales = XLSX.utils.json_to_sheet(getPostalesRows());
  formatSheet(wsPostales, [16, 24, 30, 22, 70, 22, 70, 65, 20, 35]);
  XLSX.utils.book_append_sheet(wb, wsPostales, '08_Postales_Audiovisuales');

  // 10. Pestaña: Libros y Ensayos
  const wsLibros = XLSX.utils.json_to_sheet(getLibrosRows());
  formatSheet(wsLibros, [16, 26, 36, 25, 75, 30, 70, 65, 22, 35]);
  XLSX.utils.book_append_sheet(wb, wsLibros, '09_Libros_y_Ensayos');

  // 11. Pestaña: Canales y Redes
  const wsRedes = XLSX.utils.json_to_sheet(getRedesRows());
  formatSheet(wsRedes, [14, 32, 20, 26, 60, 25, 65, 15, 20, 30]);
  XLSX.utils.book_append_sheet(wb, wsRedes, '10_Redes_y_Canales');

  // 12. Pestaña Consolidada: TODO el inventario en una sola hoja para filtros masivos
  const todoInventario: InventoryRow[] = [
    ...getRevistasRows(),
    ...getDocumentosRows(),
    ...getPodcastsVideoRows(),
    ...getPodcastsAudioRows(),
    ...getMicroprogramasRows(),
    ...getMusicaLeoRows(),
    ...getArticulosRows(),
    ...getPostalesRows(),
    ...getLibrosRows(),
    ...getRedesRows()
  ];
  const wsTotal = XLSX.utils.json_to_sheet(todoInventario);
  formatSheet(wsTotal, [18, 30, 38, 25, 80, 25, 70, 65, 20, 35]);
  XLSX.utils.book_append_sheet(wb, wsTotal, '99_INVENTARIO_TOTAL');

  return wb;
};

// Disparador de descarga en el navegador del usuario
export const downloadMasterExcelFile = (fileName = 'El_Nexo_Digital_Planilla_Maestra.xlsx') => {
  const wb = createMasterExcelWorkbook();
  XLSX.writeFile(wb, fileName);
};

// Descargar una pestaña específica como CSV
export const downloadSheetAsCSV = (sheetKey: string, fileName?: string) => {
  let rows: any[] = [];
  let defaultName = 'El_Nexo_Digital_Export.csv';

  switch (sheetKey) {
    case 'revistas':
      rows = getRevistasRows();
      defaultName = 'El_Nexo_Digital_Revistas.csv';
      break;
    case 'documentos':
      rows = getDocumentosRows();
      defaultName = 'El_Nexo_Digital_Documentos.csv';
      break;
    case 'podcasts-mp4':
      rows = getPodcastsVideoRows();
      defaultName = 'El_Nexo_Digital_Podcasts_Video.csv';
      break;
    case 'podcasts-mp3':
      rows = getPodcastsAudioRows();
      defaultName = 'El_Nexo_Digital_Podcasts_Audio.csv';
      break;
    case 'microprogramas':
      rows = getMicroprogramasRows();
      defaultName = 'El_Nexo_Digital_Microprogramas.csv';
      break;
    case 'musica':
      rows = getMusicaLeoRows();
      defaultName = 'El_Nexo_Digital_Musica_Leo_Castrillo.csv';
      break;
    default:
      rows = [
        ...getRevistasRows(),
        ...getDocumentosRows(),
        ...getPodcastsVideoRows(),
        ...getPodcastsAudioRows(),
        ...getMicroprogramasRows(),
        ...getMusicaLeoRows(),
        ...getArticulosRows(),
        ...getPostalesRows(),
        ...getLibrosRows(),
        ...getRedesRows()
      ];
      defaultName = 'El_Nexo_Digital_Inventario_Total.csv';
      break;
  }

  const ws = XLSX.utils.json_to_sheet(rows);
  const csv = XLSX.utils.sheet_to_csv(ws);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName || defaultName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
