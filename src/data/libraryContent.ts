
import type { LibraryItem } from '../types.ts';

export const LIBRARY_CONTENT: LibraryItem[] = [
  // --- DOCUMENTOS DE INVESTIGACIÓN ---
  {
    id: 'doc_lunar',
    category: 'Revistas',
    title: 'Exploración Lunar: Del Apolo a Artemis',
    author: 'Archivo El Nexo Digital',
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=600',
    review: 'Un análisis exhaustivo sobre la reconfiguración del ego colectivo humano a través de la conquista espacial. Desde el Programa Apolo hasta la moderna iniciativa Artemis, exploramos qué significa para nuestra especie volver a mirar a la Luna no como un satélite, sino como una frontera prospectiva.',
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
    review: 'Un análisis multidimensional sobre el desarrollo, la soberanía y el impacto socioambiental de las plantas de celulosa en territorio uruguayo. Este documento aborda la evolución de una industria que ha redefinido la matriz productiva y las tensiones territoriales del país.',
    publicationDate: 'Febrero, 2025',
    pdfUrl: 'https://res.cloudinary.com/dus9zcgen/raw/upload/v1769353708/Evoluci%C3%B3n_y_Trascendencia_de_la_Industria_de_Celulosa_en_Uruguay_Un_An%C3%A1lisis_Multidimensional_sobre_el_Desarrollo_la_Soberan%C3%ADa_y_el_Impacto_Socioambiental_y8opdq.docx',
    sources: 'Investigación sobre soberanía y recursos.'
  },
  {
    id: 'doc_acuifero_geo',
    category: 'Revistas',
    title: 'Geopolítica del Acuífero Guaraní',
    author: 'Archivo El Nexo Digital',
    imageUrl: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=600',
    review: 'Soberanía, desarrollo industrial y el conflicto por los recursos hídricos en el Cono Sur. Una mirada estratégica a uno de los reservorios de agua dulce más importantes del planeta y las tensiones geopolíticas que lo rodean en un mundo sediento.',
    publicationDate: 'Febrero, 2025',
    pdfUrl: 'https://res.cloudinary.com/dus9zcgen/raw/upload/v1769353707/Acu%C3%ADfero_Guaran%C3%AD_Conflictos_y_Gesti%C3%B3n_qqhmyt.docx',
    sources: 'Archivo de Geopolítica de El Nexo Digital.'
  },
  {
    id: 'doc_acuifero_actores',
    category: 'Revistas',
    title: 'Actores del Acuífero: Una Red Compleja',
    author: 'Archivo El Nexo Digital',
    imageUrl: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&q=80&w=600',
    review: '¿Quiénes deciden sobre el agua? Este informe desglosa la red compleja de actores institucionales, privados y sociales que intervienen en la gestión del Sistema Acuífero Guaraní, revelando las dinámicas de poder detrás del recurso.',
    publicationDate: 'Febrero, 2025',
    pdfUrl: 'https://res.cloudinary.com/dus9zcgen/raw/upload/v1769353707/Actores_del_Acu%C3%ADfero_Guaran%C3%AD_Una_Red_Compleja_hwyvze.docx',
    sources: 'Mapeo de actores y gestión de recursos.'
  },
  {
    id: 'doc_muerte',
    category: 'Revistas',
    title: 'Duelo y Cognición Humana',
    author: 'Archivo El Nexo Digital',
    imageUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=600',
    review: 'Un análisis integral sobre la muerte y los procesos cognitivos del duelo. Cómo nuestra mente procesa la ausencia y la finitud, desde una perspectiva que une la psicología profunda con la observación existencial del ser humano.',
    publicationDate: 'Febrero, 2025',
    pdfUrl: 'https://res.cloudinary.com/dus9zcgen/raw/upload/v1769353706/An%C3%A1lisis_Integral_sobre_la_Muerte_el_Duelo_y_la_Cognici%C3%B3n_Humana_gfjbu8.docx',
    sources: 'Investigación sobre la condition humana.'
  },
  {
    id: 'doc_intervenciones',
    category: 'Revistas',
    title: 'Crónica de Intervenciones Militares (EE.UU.)',
    author: 'Archivo El Nexo Digital',
    imageUrl: 'https://images.unsplash.com/photo-1508138221679-760a23a2285b?auto=format&fit=crop&q=80&w=600',
    review: 'Una cronología crítica de las intervenciones militares de Estados Unidos. Un documento necesario para comprender la construcción del orden global actual y las consecuencias de la proyección de poder en distintas latitudes del planeta.',
    publicationDate: 'Febrero, 2025',
    pdfUrl: 'https://res.cloudinary.com/dus9zcgen/raw/upload/v1769353706/Cr%C3%B3nica_de_las_Intervenciones_Militares_de_Estados_Unidos_ov6lmg.docx',
    sources: 'Archivo Histórico-Político de El Nexo Digital.'
  },

  // --- CONTENIDO PREVIO ---
  {
    id: 'doc_bataille',
    category: 'Revistas',
    title: 'Investigación: Georges Bataille',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1764533188/bataille_chwzaq.png',
    review: 'Documento de investigación profundo sobre la obra y pensamiento de Georges Bataille. Este análisis aborda conceptos fundamentales como la noción de gasto improductivo, la "parte maldita", el erotismo y su compleja relación con el fascismo.',
    publicationDate: 'Investigación Especial',
    pdfUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1764532682/Investigaci%C3%B3n_sobre_Georges_Bataille_1_g1sjkw.pdf',
    audioUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/v1764532510/Bataille_Gasto_El_Sol_Erotismo_Fascismo_jhajdd.mp3',
    sources: 'Archivo de investigación de El Nexo Digital.'
  },
  {
    id: 'mag_04',
    category: 'Revistas',
    title: 'Coleccionable: Fascículo 1 - Dictadura',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/w_600,pg_1,f_auto,q_auto/v1763748569/fasc%C3%ADculo_1_dictadura_k3kplr.jpg',
    review: 'Primer entrega de nuestra serie documental histórica. Este fascículo profundiza en el período de la dictadura, analizando los antecedentes, el quiebre institucional y el impacto social de aquellos años oscuros.',
    publicationDate: 'Colección Histórica',
    pdfUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1763748569/fasc%C3%ADculo_1_dictadura_k3kplr.pdf',
    videoUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/v1763749780/PRIMER_LANZAMIENTO_pcgk71.mp4',
    sources: 'Archivo histórico y Documental de El Nexo Digital.'
  },
  {
    id: 'mag_03',
    category: 'Revistas',
    title: 'Coleccionable: ¿Quién elige al Papa?',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/w_600,pg_1,f_auto,q_auto/v1763748570/quien_elige_al_papa_nyz0ep.jpg',
    review: 'Una edición especial de investigación que se adentra en los muros del Vaticano. Exploramos la historia, los protocolos secretos y las intrigas políticas detrás del Cónclave.',
    publicationDate: 'Edición Especial',
    pdfUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1763748570/quien_elige_al_papa_nyz0ep.pdf',
    videoUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/v1763750440/quien_elige_al_papa___PDF_to_Flipbook_y_2_p%C3%A1ginas_m%C3%A1s_-_Personal__Microsoft_Edge_2025-11-21_15-38-59_oz5els.mp4',
    sources: 'Archivo histórico y Documental de El Nexo Digital.'
  },
  {
    id: 'mag_01',
    category: 'Revistas',
    title: 'Edición Nº 01: La Dominguera',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/w_600,pg_1,f_auto,q_auto/v1763749556/La_dominguera_de_el_nexo_digital_j4uxue.jpg',
    review: 'Edición fundacional de El Nexo Digital. Un recorrido por nuestra identidad, combinando análisis cultural, opinión y el estilo único que nos caracteriza.',
    publicationDate: 'Edición Fundacional',
    pdfUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1763749556/La_dominguera_de_el_nexo_digital_j4uxue.pdf',
    sources: 'Archivo histórico de El Nexo Digital.'
  },

  // --- PODCASTS (VIDEO) ---
  {
    id: 'vp1_lib',
    category: 'Podcasts',
    title: 'Nuestra Relación con el Miedo',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1764004910/Nuestra_Relaci%C3%B3n_con_el_Miedo_glyfqz.png',
    review: 'El miedo, esa sombra que nos sigue, que nos define. ¿Es un ancla o una brújula? A menudo lo vemos como un enemigo a vencer, una debilidad a ocultar. Pero, ¿y si fuera un lenguaje?',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1764886279/la_busqueda_de_lo_sobrenatural_nn2mhb.mp4',
    publicationDate: 'Video Podcast',
    sources: 'El Nexo Digital'
  },
  {
    id: 'vp_quijote',
    category: 'Podcasts',
    title: 'Don Quijote: Un Manifiesto Existencial',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1764887019/Gemini_Generated_Image_a2c5dia2c5dia2c5_x0dvmh.png',
    review: 'El video reinterpreta la figura de Don Quijote, no como un demente, sino como un individuo en plena crisis existencial que elige conscientemente crear una nueva realidad para darle propósito a su vida.',
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
    review: 'Este episodio profundiza en una crítica a la concepción contemporánea de la felicidad, presentándola no como un estado natural, sino como un constructo de la sociedad de consumo.',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/w_720,q_auto:good/v1756716939/vale_la_pena_la_felicidad_lryhcf.mp4',
    publicationDate: 'Video Podcast',
    sources: 'El Nexo Digital'
  },
  {
    id: 'vp4_lib',
    category: 'Podcasts',
    title: 'El pecado de ser positivo',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/f_jpg,so_2/v1764004909/El_pecado_de_ser_positivo._mjydyz.jpg',
    review: 'Este pódcast explora la dualidad entre el optimismo inspirador y el pragmatismo necesario para alcanzar metas. A través de la definición de "mantra" y la presentación de la canción "What\'s Up?".',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/w_720,q_auto:good/v1756716797/pecado_de_positivo_enqsru.mp4',
    publicationDate: 'Video Podcast',
    sources: 'El Nexo Digital'
  },
  {
    id: 'vp5_lib',
    category: 'Podcasts',
    title: 'El colectivo, virus de la mediocridad',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/f_jpg,so_2/v1764004909/El_colectivo_virus_de_la_mediocridad_rqsmxz.jpg',
    review: 'Una crítica contundente al conformismo social y a la pérdida de la individualidad en la era moderna, un fenómeno que denominamos "el virus de la mediocridad encubierta".',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/w_720,q_auto:good/v1756714528/el_colectivo_h0vlp5.mp4',
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
    review: 'Entre las calles tranquilas de Colonia del Sacramento, el Bastión del Carmen se alza como un puente entre pasado y presente. Antiguo edificio militar del siglo XVIII, hoy convertido en centro cultural.',
    videoUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/v1764950849/postales2_mdcweq.mp4',
    publicationDate: 'Postal Coleccionable',
    sources: 'Producción Original El Nexo Digital. Editor General: Leo Castrillo'
  },
  {
    id: 'postal_sauce',
    category: 'Postales',
    title: 'Atardecer en Puerto Sauce',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/f_jpg,so_2/v1764980525/atardecer_en_puerto_ikddmm.jpg',
    review: 'Los atardeceres en Sauce no bajan… Aterrizan. Caen en silencio, como si el cielo estuviera practicando un abrazo. Es el tipo de luz que te deja pensando tres días seguidos.',
    videoUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/v1764980525/atardecer_en_puerto_ikddmm.mp4',
    publicationDate: 'Postal Coleccionable',
    sources: 'Producción Original El Nexo Digital. Editor General: Leo Castrillo'
  },

  // --- LIBROS ---
  {
    id: 'libro1',
    category: 'Libros',
    title: 'Cien Años de Soledad',
    author: 'Gabriel García Márquez',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1763682991/100a%C3%B1os_de_soledad_tapa_obdv4y.jpg',
    review: 'La urdimbre de Macondo: Realismo Mágico, Soledad y Violencia en la obra de Gabriel García Márquez.',
    audioUrl: 'https://res.cloudinary.com/dsammmekc/video/upload/v1762292455/Cien_A%C3%B1os_de_Soledad__El_Realismo_M%C3%A1gico__la_Censura_y_el_Final_fuk0lv.mp4',
    videoUrl: 'https://res.cloudinary.com/dsammmekc/video/upload/v1762291490/Cien_a%C3%B1os_de_controversia_ubapnm.mp4',
    publicationDate: 'Octubre, 2024',
    sources: 'Análisis generado con el apoyo de NotebookLM.'
  }
];
