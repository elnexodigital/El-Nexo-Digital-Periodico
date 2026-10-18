import { PODCASTS_MP3 } from '../data/podcastsMP3.ts';
import { VIDEO_PODCASTS } from '../data/podcasts.ts';
import { LEO_CASTRILLO_TRACKS } from '../data/leoCastrillo.ts';
import type { AppView } from '../types.ts';

export interface SearchResultItem {
  id: string;
  title: string;
  category: string;
  targetView: AppView;
  description: string;
  tags: string[];
  url?: string;
  audioUrl?: string;
  videoUrl?: string;
  pdfUrl?: string;
  coverUrl?: string;
}

// Normalizador para eliminar tildes y caracteres especiales
export const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
};

// Base unificada de conocimiento contextual de El Nexo Digital
export const ALL_CONTENT_INDEX: SearchResultItem[] = [
  // --- REVISTAS ---
  {
    id: 'casandra',
    title: 'La coartada de Casandra',
    category: 'Revista Digital',
    targetView: 'revistas',
    description: 'Siete capítulos sobre la imagen femenina como escudo moral, la geopolítica del oro y litio y la manipulación del marketing occidental.',
    tags: ['geopolitica', 'litio', 'oro', 'imperialismo', 'mujeres', 'feminismo', 'moral', 'marketing', 'propaganda', 'recursos', 'mineria'],
    url: 'https://heyzine.com/flip-book/bb23ebdb83.html',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1777933004/tapa_casandra_kgd7lg.png'
  },
  {
    id: 'aguila',
    title: 'El despertar del Águila',
    category: 'Revista Digital',
    targetView: 'revistas',
    description: 'Crónica de la tutela impuesta: desmantelando la narrativa del salvador para exponer el costo real del intervencionismo.',
    tags: ['estados unidos', 'geopolitica', 'intervencionismo', 'militar', 'recursos naturales', 'latinoamerica', 'soberania', 'tutela', 'ayuda humanitaria', 'control'],
    url: 'https://heyzine.com/flip-book/6419983d24.html',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1777933473/el_despertar_del_aguila_sam56e_wpkn9y.png'
  },
  {
    id: 'educacion',
    title: 'Educación, Heducacion, Heducasion',
    category: 'Revista Digital',
    targetView: 'revistas',
    description: 'Una mirada profunda a la educación y el aprendizaje en tiempos de cambio algorítmico, IA y crisis pedagógica.',
    tags: ['educacion', 'escuela', 'pedagogia', 'algoritmos', 'inteligencia artificial', 'aprendizaje', 'aulas', 'docentes', 'maestros', 'cultura digital'],
    url: 'https://heyzine.com/flip-book/b7ebdb2e6e.html',
    coverUrl: 'https://res.cloudinary.com/dus9zcgen/image/upload/v1775437167/tapa_abril_xmn532.png',
    pdfUrl: 'https://drive.google.com/file/d/1nl50KuToFtOlPJoMatERzRvKTBZrm-Fd/view?usp=sharing'
  },
  {
    id: 'sequia',
    title: 'Sequía en Uruguay: cuando el mito del Uruguay natural se cae a pedazos',
    category: 'Revista Digital',
    targetView: 'revistas',
    description: 'Investigación sobre la crisis del agua potable, la sequía y la gestión de recursos naturales en el Río de la Plata.',
    tags: ['agua', 'sequia', 'rio de la plata', 'uruguay natural', 'medio ambiente', 'ecologia', 'ose', 'crisis hidrica', 'naturaleza', 'recursos', 'clima'],
    url: 'https://heyzine.com/flip-book/a5b1698e99.html',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1775188752/Sequ%C3%ADa_en_Uruguaytapa_ddkjxf.png'
  },
  {
    id: 'construccion',
    title: 'Guía de Construcción en Seco',
    category: 'Revista Digital',
    targetView: 'revistas',
    description: 'Guía técnica y práctica de construcción en seco y yeso para proyectar y construir.',
    tags: ['construccion', 'yeso', 'arquitectura', 'hogar', 'tecnica', 'obras', 'materiales'],
    url: 'https://heyzine.com/flip-book/628a405afd.html',
    coverUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/yeso_para_digital_sfnem7.png'
  },
  {
    id: 'celulosa',
    title: 'La Industria de Celulosa en Uruguay',
    category: 'Reportajes',
    targetView: 'reportajes',
    description: 'Evolución y trascendencia de las plantas de celulosa: soberanía, economía y tensiones ambientales.',
    tags: ['celulosa', 'upm', 'papel', 'rio negro', 'medio ambiente', 'economia', 'soberania', 'bosques', 'industria', 'contaminacion', 'uruguay'],
    url: 'https://res.cloudinary.com/dnauavz56/raw/upload/Evoluci%C3%B3n_y_Trascendencia_de_la_Industria_de_Celulosa_en_Uruguay_Un_An%C3%A1lisis_Multidimensional_sobre_el_Desarrollo_la_Soberan%C3%ADa_y_el_Impacto_Socioambiental_y8opdq.docx',
    coverUrl: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=600'
  },

  // --- LIBROS Y ENSAYOS ---
  {
    id: 'libro_hesse',
    title: 'El Juego de los Abalorios (Hermann Hesse)',
    category: 'Libros',
    targetView: 'libros',
    description: 'La obra maestra de Hermann Hesse sobre la síntesis del conocimiento, Castalia, la crisis del arte y la búsqueda espiritual.',
    tags: ['hesse', 'literatura', 'filosofia', 'espiritualidad', 'castalia', 'musica', 'intelecto', 'crisis cultural', 'sabiduria', 'nobel', 'novela'],
    pdfUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/resumen_el_juego_de_abalorios_tz8ijd.pdf',
    videoUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/Hermann_Hesse__El_Arte_de_la_Crisis_xfvlgw.mp4',
    coverUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/juego_de_abalorios_rmbqpw.webp'
  },
  {
    id: 'libro_macondo',
    title: 'Cien Años de Soledad: La Urdimbre de Macondo',
    category: 'Libros',
    targetView: 'libros',
    description: 'Realismo mágico, soledad y violencia en Macondo. Análisis exhaustivo de la obra cumbre de Gabriel García Márquez.',
    tags: ['garcia marquez', 'macondo', 'realismo magico', 'colombia', 'soledad', 'literatura', 'violencia', 'buendia', 'novela latinoamericana'],
    pdfUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/La_urdimbre_de_Macondo__Realismo_M%C3%A1gico_Soledad_y_Violencia_en_la_obra_de_Gabriel_Garc%C3%ADa_M%C3%A1rquez_i2pfte.pdf',
    videoUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/Cien_a%C3%B1os_de_controversia_ubapnm.mp4',
    coverUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/100_de_solewdad_mc91i5.webp'
  },

  // --- BIOGRAFÍAS ---
  {
    id: 'bio_bataille',
    title: 'Georges Bataille: Soberanía, Erotismo y Gasto',
    category: 'Biografías',
    targetView: 'biografias',
    description: 'Filósofo y ensayista francés: la noción de gasto improductivo, el erotismo y el pensamiento de los límites.',
    tags: ['bataille', 'filosofia', 'erotismo', 'francia', 'gasto', 'soberania', 'sociologia', 'muerte', 'transgresion', 'pensamiento'],
    pdfUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/Investigaci%C3%B3n_sobre_Georges_Bataille_1_g1sjkw.pdf',
    audioUrl: 'https://res.cloudinary.com/dgb6icyzx/video/upload/Bataille_Gasto_El_Sol_Erotismo_Fascismo_jhajdd.mp3',
    coverUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/bataille_chwzaq.png'
  },

  // --- DOCUMENTOS EXTENSOS DE INVESTIGACIÓN ---
  {
    id: 'investigacion_3',
    title: 'Análisis Exhaustivo de la Encíclica Magnifica Humanitas del Papa León XIV',
    category: 'Documentos',
    targetView: 'documentos',
    description: 'Primer documento de supremo magisterio pontificio dedicado a abordar de forma sistemática las implicaciones éticas, antropocéntricas y sociales de la IA frente al paradigma tecnocrático.',
    tags: ['enciclica', 'papa', 'leon xiv', 'magnifica humanitas', 'inteligencia artificial', 'ia', 'etica', 'religion', 'humanidades', 'doctrina social', 'tecnocracia', 'babel', 'algoritmos', 'dignidad', 'leo castrillo', 'gemini', 'investigacion', 'dossier', 'youtube'],
    url: 'https://www.youtube.com/playlist?list=PLRkKe7b6h28Y',
    coverUrl: 'https://images.unsplash.com/photo-1548625361-1960249f315a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'investigacion_4',
    title: 'Auge y Ocaso del Frigorífico Nacional de Uruguay',
    category: 'Documentos',
    targetView: 'documentos',
    description: 'Evolución histórica de la industria ganadera en Uruguay: monopolio del abasto capitalino, vedas de la carne, experiencia de EFCSA, frigorífico Anglo y metas estratégicas hacia el 2050.',
    tags: ['frigorifico nacional', 'uruguay', 'carne', 'ganaderia', 'abasto', 'inac', 'inia', 'historia', 'economia', 'vedas', 'anglo', 'frigorifico', 'campo', 'trazabilidad', 'exportacion', 'leo castrillo', 'notebooklm', 'investigacion'],
    url: 'https://elnexodigital.com',
    coverUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'doc_celulosa_research',
    title: 'Evolución y Trascendencia de la Industria de Celulosa en Uruguay (DOCX)',
    category: 'Documentos',
    targetView: 'documentos',
    description: 'Investigación completa sobre desarrollo, plantas de celulosa, recursos hídricos, impacto ambiental y soberanía territorial.',
    tags: ['documentos', 'celulosa', 'docx', 'upm', 'investigacion', 'soberania', 'ambiente', 'rio negro', 'recursos', 'descargar', 'papelera'],
    pdfUrl: 'https://res.cloudinary.com/dnauavz56/raw/upload/Evoluci%C3%B3n_y_Trascendencia_de_la_Industria_de_Celulosa_en_Uruguay_Un_An%C3%A1lisis_Multidimensional_sobre_el_Desarrollo_la_Soberan%C3%ADa_y_el_Impacto_Socioambiental_y8opdq.docx'
  },
  {
    id: 'doc_bataille_dossier',
    title: 'Dossier de Investigación: Georges Bataille (7 Capítulos)',
    category: 'Documentos',
    targetView: 'documentos',
    description: 'Documento completo de investigación: La noción de gasto, el sol podrido, el erotismo, el fascismo y la economía general.',
    tags: ['documentos', 'bataille', 'pdf', 'filosofia', 'gasto', 'erotismo', 'soberania', 'investigacion', 'descargar', 'teoria'],
    pdfUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/Investigaci%C3%B3n_sobre_Georges_Bataille_1_g1sjkw.pdf'
  },
  {
    id: 'doc_macondo_urdimbre',
    title: 'La Urdimbre de Macondo: Cien Años de Soledad (Dossier)',
    category: 'Documentos',
    targetView: 'documentos',
    description: 'Estudio documental profundo sobre la estructura simbólica, controversias, censura y claves de lectura de García Márquez.',
    tags: ['documentos', 'macondo', 'garcia marquez', 'literatura', 'pdf', 'novela', 'violencia', 'investigacion', 'dossier'],
    pdfUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/La_urdimbre_de_Macondo__Realismo_M%C3%A1gico_Soledad_y_Violencia_en_la_obra_de_Gabriel_Garc%C3%ADa_M%C3%A1rquez_i2pfte.pdf'
  },
  {
    id: 'doc_lunar_artemis',
    title: 'Exploración Lunar: Del Apolo a Artemis (Ensayo Completo)',
    category: 'Documentos',
    targetView: 'documentos',
    description: 'Investigación sobre la nueva carrera espacial, la geopolítica de los recursos lunares y el ego colectivo humano.',
    tags: ['documentos', 'luna', 'artemis', 'apolo', 'espacio', 'ciencia', 'geopolitica', 'docx', 'investigacion', 'tecnologia'],
    pdfUrl: 'https://res.cloudinary.com/dnauavz56/raw/upload/Exploraci%C3%B3n_Lunar_Apolo_a_Artemis_tc7zwm.docx'
  },
  {
    id: 'doc_hesse_guia',
    title: 'Castalia y la Crisis del Espíritu: El Juego de los Abalorios (Guía)',
    category: 'Documentos',
    targetView: 'documentos',
    description: 'Guía y documento de análisis sobre la síntesis de las ciencias y las artes de Hermann Hesse.',
    tags: ['documentos', 'hesse', 'castalia', 'abalorios', 'resumen', 'pdf', 'guia de estudio', 'filosofia', 'humanidades'],
    pdfUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/resumen_el_juego_de_abalorios_tz8ijd.pdf'
  },
  {
    id: 'doc_linea_paralela_1492',
    title: 'Dossier de Investigación: La Línea Paralela (1492)',
    category: 'Documentos',
    targetView: 'documentos',
    description: '¿En qué época estaríamos hoy en Latinoamérica sin la llegada de Europa? Miniserie de investigación contrafáctica sobre quipus, lógica aymara, megafauna y el Ayni.',
    tags: ['1492', 'linea paralela', 'historia', 'quipu', 'aymara', 'logica trivalente', 'ayni', 'pachamama', 'cahokia', 'iroqueses', 'inca', 'uruguay', 'dossier', 'investigacion', 'charles mann', 'gary urton'],
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1792340129/Person_and_guanaco_by_river_2K_20261012202058_wwetbz.jpg'
  },
  {
    id: 'doc_el_dios_laico',
    title: 'Dossier de Investigación: El Dios Laico',
    category: 'Documentos',
    targetView: 'documentos',
    description: '¿Ateo? No me hagas reír: la democracia como cover religioso, la liturgia del voto, el diezmo fiscal y la Santa Inquisición moderna.',
    tags: ['dios laico', 'democracia', 'religion', 'iglesia', 'voto', 'elecciones', 'constitucion', 'jueces', 'impuestos', 'herejia', 'muerte civil', 'filosofia', 'leo castrillo', 'el nexo digital'],
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1792340270/el_dios_laico_bfl5q4.png'
  },

  // --- PODCASTS EN MP4 (VIDEO) ---
  ...VIDEO_PODCASTS.map(vp => ({
    id: vp.id,
    title: vp.title,
    category: 'Podcast MP4',
    targetView: 'podcasts-mp4' as AppView,
    description: vp.transcript,
    tags: ['video', 'podcast', 'analisis', 'charla', 'debate', 'reflexion', 'cultura', 'pantalla', 'dialogo'],
    videoUrl: vp.videoUrl,
    coverUrl: vp.imageUrl
  })),

  // --- PODCASTS EN MP3 (AUDIO / MICROPROGRAMAS) ---
  ...PODCASTS_MP3.map(mp => ({
    id: mp.id,
    title: mp.title,
    category: 'Podcast MP3',
    targetView: 'podcasts-mp3' as AppView,
    description: mp.description,
    tags: ['audio', 'microprograma', 'radio', 'reflexion', 'humor', 'sociedad', 'vida cotidiana', 'pensamiento', 'comunicacion'],
    audioUrl: mp.audioUrl,
    coverUrl: mp.coverUrl
  })),

  // --- MÚSICA DEL NEXO ---
  ...LEO_CASTRILLO_TRACKS.map(track => ({
    id: track.id,
    title: track.description,
    category: 'Música del Nexo',
    targetView: 'musica' as AppView,
    description: `Composición musical original de Leo Castrillo para El Nexo Digital. ${track.description}`,
    tags: ['musica', 'leo castrillo', 'sonido', 'melodia', 'tango', 'cancion', 'guitarra', 'ambiente', 'instrumental', 'uruguay', 'lacaze'],
    audioUrl: track.url
  }))
];

// Motor de búsqueda contextual con puntaje de relevancia (Relevance Score)
export const searchByContext = (query: string): SearchResultItem[] => {
  if (!query || query.trim().length === 0) return [];

  const rawTokens = normalizeText(query).split(/\s+/).filter(Boolean);
  if (rawTokens.length === 0) return [];

  const results: { item: SearchResultItem; score: number }[] = [];

  for (const item of ALL_CONTENT_INDEX) {
    const normTitle = normalizeText(item.title);
    const normDesc = normalizeText(item.description);
    const normCategory = normalizeText(item.category);
    const normTags = item.tags.map(normalizeText);

    let score = 0;
    let matchesAllTokens = true;

    for (const token of rawTokens) {
      let tokenMatched = false;

      // 1. Coincidencia exacta o parcial en título (Máximo puntaje)
      if (normTitle.includes(token)) {
        score += normTitle.startsWith(token) ? 35 : 25;
        tokenMatched = true;
      }

      // 2. Coincidencia en etiquetas conceptuales / tags temáticos (Gran puntaje semántico)
      for (const tag of normTags) {
        if (tag === token) {
          score += 30; // Coincidencia conceptual exacta
          tokenMatched = true;
        } else if (tag.includes(token)) {
          score += 15;
          tokenMatched = true;
        }
      }

      // 3. Coincidencia en descripción o transcripción profunda
      if (normDesc.includes(token)) {
        score += 12;
        tokenMatched = true;
      }

      // 4. Coincidencia en categoría (ej. "video", "revista", "libro", "musica")
      if (normCategory.includes(token)) {
        score += 10;
        tokenMatched = true;
      }

      if (!tokenMatched) {
        matchesAllTokens = false;
      }
    }

    // Si coincide con todos los términos de la consulta o tiene un puntaje alto
    if (matchesAllTokens && score > 0) {
      results.push({ item, score });
    } else if (rawTokens.length > 1 && score >= 25) {
      // Coincidencia parcial relevante
      results.push({ item, score: score * 0.7 });
    }
  }

  // Ordenar por relevancia descendente
  return results.sort((a, b) => b.score - a.score).map(r => r.item);
};
