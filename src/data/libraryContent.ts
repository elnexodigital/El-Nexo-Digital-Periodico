import type { LibraryItem } from '../types.ts';

export const LIBRARY_CONTENT: LibraryItem[] = [
  // --- DOCUMENTOS DE INVESTIGACIÓN / REVISTAS ---
  {
    id: 'doc_aguila',
    category: 'Revistas',
    title: 'El Despertar del Águila',
    author: 'Archivo El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1770891228/el_despertar_del_aguila_sam56e.png',
    review: 'Una crónica cruda y detallada sobre la hegemonía geopolítica. Este documento analiza las intervenciones militares de Estados Unidos, explorando la maquinaria del poder, el Destino Manifiesto y las cicatrices que la expansión imperial ha dejado en el mapa global.',
    publicationDate: 'Marzo, 2025',
    pdfUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1770892038/Cr%C3%B3nica_de_las_Intervenciones_Militares_de_Estados_Unidos_2_pwqu2i.pdf',
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
    pdfUrl: 'https://res.cloudinary.com/dus9zcgen/raw/upload/v1769353709/Exploraci%C3%B3n_Lunar_Apolo_a_Artemis_tc7zwm.docx',
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
    pdfUrl: 'https://res.cloudinary.com/dus9zcgen/raw/upload/v1769353708/Evoluci%C3%B3n_y_Trascendencia_de_la_Industria_de_Celulosa_en_Uruguay_Un_An%C3%A1lisis_Multidimensional_sobre_el_Desarrollo_la_Soberan%C3%ADa_y_el_Impacto_Socioambiental_y8opdq.docx',
    sources: 'Investigación sobre soberanía y recursos.'
  },
  {
    id: 'doc_bataille',
    category: 'Revistas',
    title: 'Investigación: Georges Bataille',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1764533188/bataille_chwzaq.png',
    review: 'Documento de investigación profundo sobre la obra y pensamiento de Georges Bataille.',
    publicationDate: 'Investigación Especial',
    pdfUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1764532682/Investigaci%C3%B3n_sobre_Georges_Bataille_1_g1sjkw.pdf',
    audioUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/v1764532510/Bataille_Gasto_El_Sol_Erotismo_Fascismo_jhajdd.mp3',
    sources: 'Archivo de investigación de El Nexo Digital.'
  },

  // --- PODCASTS (VIDEO) ---
  {
    id: 'vp1_lib',
    category: 'Podcasts',
    title: 'Nuestra Relación con el Miedo',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1764004910/Nuestra_Relaci%C3%B3n_con_el_Miedo_glyfqz.png',
    review: 'El miedo, esa sombra que nos sigue, que nos define. ¿Es un ancla o una brújula?',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1764886279/la_busqueda_de_lo_sobrenatural_nn2mhb.mp4',
    publicationDate: 'Video Podcast',
    sources: 'El Nexo Digital'
  },
  {
    id: 'vp_quijote_lib',
    category: 'Podcasts',
    title: 'Don Quijote: Manifiesto Existencial',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1764887019/Gemini_Generated_Image_a2c5dia2c5dia2c5_x0dvmh.png',
    review: 'El video reinterpreta la figura de Don Quijote como un individuo en plena crisis existencial.',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1758266308/Don_Quijote_Un_Manifiesto_Existencial_g1rxky.mp4',
    publicationDate: 'Video Podcast',
    sources: 'El Nexo Digital'
  },
  {
    id: 'vp3_lib',
    category: 'Podcasts',
    title: '¿Vale la pena la felicidad?',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/f_jpg,so_2/v1764004910/Vale_la_pena_la_felicidad_m1gmb4.jpg',
    review: 'Crítica a la concepción contemporánea de la felicidad como constructo de consumo.',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/w_720,q_auto:good/v1756716939/vale_la_pena_la_felicidad_lryhcf.mp4',
    publicationDate: 'Video Podcast',
    sources: 'El Nexo Digital'
  },
  {
    id: 'vp5_lib',
    category: 'Podcasts',
    title: 'El colectivo, virus de la mediocridad',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/f_jpg,so_2/v1764004909/El_colectivo_virus_de_la_mediocridad_rqsmxz.jpg',
    review: 'Crítica contundente al conformismo social y a la pérdida de la individualidad.',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/w_720,q_auto:good/v1756714528/el_colectivo_h0vlp5.mp4',
    publicationDate: 'Video Podcast',
    sources: 'El Nexo Digital'
  },
  {
    id: 'vp11_lib',
    category: 'Podcasts',
    title: 'Efecto Halo: El Poder de la Impresión',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756714882/logo_el_nexo_digital_assa82.png',
    review: 'Exploración del sesgo cognitivo que distorsiona nuestra percepción de los demás.',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/w_720,q_auto:good/v1757025613/Efecto_Halo_El_Poder_de_la_Primera_Impresi%C3%B3n_s883t0.mp4',
    publicationDate: 'Video Podcast',
    sources: 'El Nexo Digital'
  },
  {
    id: 'vp13_lib',
    category: 'Podcasts',
    title: 'Elemento FUEGO: Poder y Destrucción',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756714882/logo_el_nexo_digital_assa82.png',
    review: 'Poderosa alegoría sobre la relación de la humanidad con el fuego.',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/w_720,q_auto:good/v1757025878/elemento_fuego_bzneem.mp4',
    publicationDate: 'Video Podcast',
    sources: 'El Nexo Digital'
  },
  {
    id: 'vp16_lib',
    category: 'Podcasts',
    title: 'Epistemología: Creencia y Conocimiento',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756714882/logo_el_nexo_digital_assa82.png',
    review: 'Profunda reflexión que explora la compleja relación entre creencia y realidad.',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/w_720,q_auto:good/v1757027951/epistemolog%C3%ADa_dxnca5.mp4',
    publicationDate: 'Video Podcast',
    sources: 'El Nexo Digital'
  },
  {
    id: 'vp17_lib',
    category: 'Podcasts',
    title: 'La Paradoja del Libre Albedrío',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756714882/logo_el_nexo_digital_assa82.png',
    review: 'Cuestionamos hasta qué punto nuestras decisiones son verdaderamente nuestras.',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/w_720,q_auto:good/v1757028671/Libre_albedr%C3%ADo_evpvhp.mp4',
    publicationDate: 'Video Podcast',
    sources: 'El Nexo Digital'
  },

  // --- POSTALES (Regalos) ---
  {
    id: 'postal_bastion',
    category: 'Postales',
    title: 'Bastión del Carmen',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/f_jpg,so_2/v1764950849/postales2_mdcweq.jpg',
    review: 'Entre las calles tranquilas de Colonia del Sacramento, el Bastión del Carmen se alza como un puente entre pasado y presente.',
    videoUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/v1764950849/postales2_mdcweq.mp4',
    publicationDate: 'Postal Coleccionable',
    sources: 'Producción Original El Nexo Digital.'
  },
  {
    id: 'postal_sauce',
    category: 'Postales',
    title: 'Atardecer en Puerto Sauce',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/f_jpg,so_2/v1764980525/atardecer_en_puerto_ikddmm.jpg',
    review: 'Los atardeceres en Sauce no bajan… Aterrizan. Caen en silencio.',
    videoUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/v1764980525/atardecer_en_puerto_ikddmm.mp4',
    publicationDate: 'Postal Coleccionable',
    sources: 'Producción Original El Nexo Digital.'
  },

  // --- LIBROS ---
  {
    id: 'libro1',
    category: 'Libros',
    title: 'Cien Años de Soledad',
    author: 'Gabriel García Márquez',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1763682991/100a%C3%B1os_de_soledad_tapa_obdv4y.jpg',
    review: 'La urdimbre de Macondo: Realismo Mágico, Soledad y Violencia.',
    audioUrl: 'https://res.cloudinary.com/dsammmekc/video/upload/v1762292455/Cien_A%C3%B1os_de_Soledad__El_Realismo_M%C3%A1gico__la_Censura_y_el_Final_fuk0lv.mp4',
    videoUrl: 'https://res.cloudinary.com/dsammmekc/video/upload/v1762291490/Cien_a%C3%B1os_de_controversia_ubapnm.mp4',
    publicationDate: 'Octubre, 2024',
    sources: 'Análisis generado con NotebookLM.'
  }
];