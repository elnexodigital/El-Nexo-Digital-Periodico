import type { LibraryItem } from '../types.ts';

export const LIBRARY_CONTENT: LibraryItem[] = [
  // --- DOCUMENTOS DE INVESTIGACIÓN / REVISTAS ---
  {
    id: 'doc_sequia',
    category: 'Revistas',
    title: 'SEQUÍA',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1775188752/Sequ%C3%ADa_en_Uruguaytapa_ddkjxf.png',
    review: 'SEQUÍA "cuando el mito del Uruguay natural se cae a pedazos"',
    publicationDate: 'Febrero, 2026',
    externalUrl: 'https://heyzine.com/flip-book/a5b1698e99.html',
    sources: 'Investigación de El Nexo Digital.'
  },
  {
    id: 'doc_casandra',
    category: 'Revistas',
    title: 'La coartada de Casandra',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1777933004/tapa_casandra_kgd7lg.png',
    review: "Desde la 'Coartada de Casandra' y el uso de la imagen femenina como escudo moral, hasta la cruda geopolítica que se esconde tras el oro y el litio en tierras lejanas. No es solo información; es un mapa para navegar entre el imperialismo estético y la resistencia real de quienes desafían el manual del marketing occidental. Siete capítulos.",
    publicationDate: 'Mayo, 2026',
    externalUrl: 'https://heyzine.com/flip-book/bb23ebdb83.html',
    sources: 'Investigación central de El Nexo Digital.'
  },
  {
    id: 'doc_educacion',
    category: 'Revistas',
    title: 'Educación, Heducacion, Heducasion',
    author: 'Archivo El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dus9zcgen/image/upload/v1775437167/tapa_abril_xmn532.png',
    review: 'Una mirada profunda a la educación en tiempos de cambio. Esta edición explora los desafíos y oportunidades de aprender en la era digital.',
    publicationDate: 'Abril, 2026',
    pdfUrl: 'https://drive.google.com/file/d/1nl50KuToFtOlPJoMatERzRvKTBZrm-Fd/view?usp=sharing',
    externalUrl: 'https://heyzine.com/flip-book/b7ebdb2e6e.html',
    sources: 'Investigación de El Nexo Digital.'
  },
  {
    id: 'doc_aguila',
    category: 'Revistas',
    title: 'El despertar del Águila',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1777933473/el_despertar_del_aguila_sam56e_wpkn9y.png',
    review: 'El despertar del águila: Crónica de la tutela impuesta. ¿Es ayuda humanitaria o control estratégico? Esta edición desmantela la narrativa del "salvador" para exponer el costo real del intervencionismo. Desde el análisis histórico hasta la balanza de los recursos naturales, recorremos las huellas de una influencia que nunca fue gratis. Un repaso crudo por las cicatrices que dejó el águila en su vuelo sobre los países en desarrollo.',
    publicationDate: 'Junio, 2026',
    externalUrl: 'https://heyzine.com/flip-book/6419983d24.html',
    sources: 'Investigación Geopolítica de El Nexo Digital.'
  },
  {
    id: 'doc_lunar',
    category: 'Revistas',
    title: 'Exploración Lunar: Del Apolo a Artemis',
    author: 'Archivo El Nexo Digital',
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=600',
    review: 'Un análisis exhaustivo sobre la reconfiguración del ego colectivo humano a través de la conquista espacial.',
    publicationDate: 'Febrero, 2025',
    pdfUrl: 'https://res.cloudinary.com/dnauavz56/raw/upload/Exploraci%C3%B3n_Lunar_Apolo_a_Artemis_tc7zwm.docx',
    sources: 'Investigación General de El Nexo Digital.'
  },
  {
    id: 'doc_celulosa',
    category: 'Revistas',
    title: 'La Industria de Celulosa en Uruguay',
    author: 'Archivo El Nexo Digital',
    imageUrl: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=600',
    review: 'Un análisis multidimensional sobre el desarrollo, la soberanía y el impacto socioambiental de las plantas de celulosa.',
    publicationDate: 'Febrero, 2025',
    pdfUrl: 'https://res.cloudinary.com/dnauavz56/raw/upload/Evoluci%C3%B3n_y_Trascendencia_de_la_Industria_de_Celulosa_en_Uruguay_Un_An%C3%A1lisis_Multidimensional_sobre_el_Desarrollo_la_Soberan%C3%ADa_y_el_Impacto_Socioambiental_y8opdq.docx',
    sources: 'Investigación sobre soberanía y recursos.'
  },
  {
    id: 'doc_bataille',
    category: 'Revistas',
    title: 'Investigación: Georges Bataille',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/bataille_chwzaq.png',
    review: 'Documento de investigación profundo sobre la obra y pensamiento de Georges Bataille.',
    publicationDate: 'Investigación Especial',
    pdfUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/Investigaci%C3%B3n_sobre_Georges_Bataille_1_g1sjkw.pdf',
    audioUrl: 'https://res.cloudinary.com/dgb6icyzx/video/upload/Bataille_Gasto_El_Sol_Erotismo_Fascismo_jhajdd.mp3',
    sources: 'Archivo de investigación de El Nexo Digital.'
  },

  // --- PODCASTS (VIDEO) ---
  // --- POSTALES (Regalos) ---
  {
    id: 'postal_bastion',
    category: 'Postales',
    title: 'Bastión del Carmen',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/f_jpg,so_2/postales2_mdcweq.jpg',
    review: 'Entre las calles tranquilas de Colonia del Sacramento, el Bastión del Carmen se alza como un puente entre pasado y presente.',
    videoUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/postales2_mdcweq.mp4',
    publicationDate: 'Postal Coleccionable',
    sources: 'Producción Original El Nexo Digital.'
  },
  {
    id: 'postal_sauce',
    category: 'Postales',
    title: 'Atardecer en Puerto Sauce',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/f_jpg,so_2/atardecer_en_puerto_ikddmm.jpg',
    review: 'Los atardeceres en Sauce no bajan… Aterrizan. Caen en silencio.',
    videoUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/atardecer_en_puerto_ikddmm.mp4',
    publicationDate: 'Postal Coleccionable',
    sources: 'Producción Original El Nexo Digital.'
  },

  // --- LIBROS / RECOMENDACIÓN DEL MES ---
  {
    id: 'libro1',
    category: 'Libros',
    title: 'El Juego de los Abalorios',
    author: 'Hermann Hesse',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/juego_de_abalorios_rmbqpw.webp',
    review: 'La obra cumbre de Hermann Hesse. Un análisis sobre la síntesis del conocimiento, la crisis del arte y la búsqueda de la unidad trascendental a través del espíritu y el intelecto.',
    videoUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/Hermann_Hesse__El_Arte_de_la_Crisis_xfvlgw.mp4',
    pdfUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/resumen_el_juego_de_abalorios_tz8ijd.pdf',
    publicationDate: 'Marzo, 2025',
    sources: 'Análisis profundo de El Nexo Digital.'
  },
  {
    id: 'doc_cien_anos',
    category: 'Revistas',
    title: 'Cien Años de Soledad (Archivo)',
    author: 'Gabriel García Márquez',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/100_de_solewdad_mc91i5.webp',
    review: 'La urdimbre de Macondo: Realismo Mágico, Soledad y Violencia. Este análisis exhaustivo explora las capas de la obra maestra de García Márquez.',
    audioUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/Cien_A%C3%B1os_de_Soledad__El_Realismo_M%C3%A1gico__la_Censura_y_el_Final_fuk0lv.mp4',
    videoUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/Cien_a%C3%B1os_de_controversia_ubapnm.mp4',
    pdfUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/La_urdimbre_de_Macondo__Realismo_M%C3%A1gico_Soledad_y_Violencia_en_la_obra_de_Gabriel_Garc%C3%ADa_M%C3%A1rquez_i2pfte.pdf',
    publicationDate: 'Octubre, 2024',
    sources: 'Análisis generado con NotebookLM.'
  }
];