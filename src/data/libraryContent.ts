
import type { LibraryItem } from '../types.ts';

export const LIBRARY_CONTENT: LibraryItem[] = [
  // --- EDICIONES ANTERIORES (REVISTAS) ---
  {
    id: 'doc_bataille',
    category: 'Revistas',
    title: 'Investigación: Georges Bataille',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1764533188/bataille_chwzaq.png',
    review: 'Documento de investigación profundo sobre la obra y pensamiento de Georges Bataille. Este análisis aborda conceptos fundamentales como la noción de gasto improductivo, la "parte maldita", el erotismo y su compleja relación con el fascismo. Un material esencial para comprender las dinámicas del exceso y la economía general en la filosofía contemporánea.',
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
    review: 'Primer entrega de nuestra serie documental histórica. Este fascículo profundiza en el período de la dictadura, analizando los antecedentes, el quiebre institucional y el impacto social de aquellos años oscuros. Un documento esencial para ejercitar la memoria y comprender las cicatrices de nuestra historia reciente.',
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
    review: 'Una edición especial de investigación que se adentra en los muros del Vaticano. Exploramos la historia, los protocolos secretos y las intrigas políticas detrás del Cónclave. Desde el "Fumata Bianca" hasta los desafíos geopolíticos de la Santa Sede, este documento es una pieza fundamental para entender el poder espiritual más antiguo de Occidente.',
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
    review: 'Edición fundacional de El Nexo Digital. Un recorrido por nuestra identidad, combinando análisis cultural, opinión y el estilo único que nos caracteriza. "La Dominguera" marca el inicio de este viaje editorial, invitando a la lectura pausada y reflexiva.',
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
    review: 'El miedo, esa sombra que nos sigue, que nos define. ¿Es un ancla o una brújula? A menudo lo vemos como un enemigo a vencer, una debilidad a ocultar. Pero, ¿y si fuera un lenguaje? El lenguaje primordial de la vida misma, una señal de que estamos al borde de algo nuevo, de algo que importa...',
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
    review: 'El video reinterpreta la figura de Don Quijote, no como un demente, sino como un individuo en plena crisis existencial que elige conscientemente crear una nueva realidad para darle propósito a su vida. Se establece un paralelismo entre su "locura" y la audacia de los soñadores modernos que desafían lo convencional. Sancho Panza es presentado como el contrapunto pragmático y cauteloso, simbolizando la lucha interna entre el idealismo y el miedo al fracaso. La pieza es una meditación sobre la auto-creación, el coraje de perseguir un propósito personal y la delgada línea que la sociedad traza entre la genialidad y la locura.',
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
    review: 'Este episodio profundiza en una crítica a la concepción contemporánea de la felicidad, presentándola no como un estado natural, sino como un constructo de la sociedad de consumo. El locutor argumenta que la felicidad se ha mercantilizado, siendo promovida a través de la publicidad y las redes sociales como un producto que se puede adquirir, generando una búsqueda incesante y, a menudo, frustrante.',
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
    review: 'Este pódcast explora la dualidad entre el optimismo inspirador y el pragmatismo necesario para alcanzar metas. A través de la definición de "mantra" y la presentación de la canción "What\'s Up?", se introduce la idea de la lucha interna y la búsqueda de sentido. Se dirige a los "soñadores de vocación", aquellos que se aferran a la positividad y a la autoayuda, presentándoles con un toque de ironía libros de éxito personal.',
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
    review: 'Una crítica contundente al conformismo social y a la pérdida de la individualidad en la era moderna, un fenómeno que denominamos "el virus de la mediocridad encubierta". Se argumenta que la sociedad, especialmente a través de las redes sociales, nos presiona para encajar en un molde colectivo, donde la validación externa reemplaza la autenticidad.',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/w_720,q_auto:good/v1756714528/el_colectivo_h0vlp5.mp4',
    publicationDate: 'Video Podcast',
    sources: 'El Nexo Digital'
  },
  {
    id: 'vp6_lib',
    category: 'Podcasts',
    title: 'El sesgo cognitivo en los sueños',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/f_jpg,so_2/v1764004908/El_sesgo_cognitivo_en_los_sue%C3%B1os_vpsooo.jpg',
    review: 'Se introduce el concepto de "inercia cognitiva" y "sesgo de confirmación" para explicar por qué seguimos estos caminos preestablecidos sin cuestionarlos. El episodio propone un cambio de enfoque: en lugar de buscar la realización en lo material y externo, sugiere una introspección para descubrir una meta espiritual y auténtica.',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/w_720,q_auto:good/v1756716775/sesgo_cognitivo_en_los_suenos_tuyj6e.mp4',
    publicationDate: 'Video Podcast',
    sources: 'El Nexo Digital'
  },
  {
    id: 'vp7_lib',
    category: 'Podcasts',
    title: 'Persistencia',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1764004909/Persistencia_kqixsn.png',
    review: 'Una meditación poética sobre la naturaleza cruda de la persistencia. Despoja al acto de "seguir adelante" del glamour de la motivación o la inspiración, presentándolo como un instinto fundamental de resistencia, casi mecánico. La persistencia se redefine como una forma de fe secular, un "como si" que nos mantiene en movimiento.',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/w_720,q_auto:good/v1756714508/persistencia_xdkmtb.mp4',
    publicationDate: 'Video Podcast',
    sources: 'El Nexo Digital'
  },
  {
    id: 'vp8_lib',
    category: 'Podcasts',
    title: 'Persigue tus sueños!!',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1764004905/Persigue_tus_sue%C3%B1os_nn0yus.png',
    review: 'Reflexión crítica sobre el concepto de "perseguir los sueños" en la sociedad contemporánea. Argumentamos que la presión social y la cultura de la inmediatez a menudo nos llevan a adoptar metas que no son auténticas, lo que puede conducir a la insatisfacción a largo plazo.',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/w_720,q_auto:good/v1756716712/persigue_tus_suenos_zvkqiv.mp4',
    publicationDate: 'Video Podcast',
    sources: 'El Nexo Digital'
  },
  {
    id: 'vp9_lib',
    category: 'Podcasts',
    title: 'Simplificar.. es INVOLUTIVO',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1764004907/Simplificar.._es_INVOLUTIVO_opdbva.png',
    review: 'Crítica a la simplificación del lenguaje en la era digital, argumentando que la inmediatez y la "cultura de la reacción" están erosionando la reflexión crítica y la profundidad comunicativa. Citando a sociólogos como Evgeny Morozov y Manuel Castells, el locutor describe una involución donde abreviaciones y emojis reemplazan pensamientos complejos.',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/w_720,q_auto:good/v1756715180/040225_simplificar_es_involutivo_j81nvg.mp4',
    publicationDate: 'Video Podcast',
    sources: 'El Nexo Digital'
  },
  {
    id: 'vp10_lib',
    category: 'Podcasts',
    title: 'El pecado de ser positivo (Parte 2)',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/f_jpg,so_2/v1764004909/El_pecado_de_ser_positivo._mjydyz.jpg',
    review: 'Continuamos explorando la dualidad entre el optimismo inspirador y el pragmatismo necesario para alcanzar metas. Se profundiza en la idea de que la verdadera sabiduría reside en equilibrar la inspiración con la ejecución.',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/w_720,q_auto:good/v1756716797/pecado_de_positivo_enqsru.mp4',
    publicationDate: 'Video Podcast',
    sources: 'El Nexo Digital'
  },
  {
    id: 'vp11_lib',
    category: 'Podcasts',
    title: 'Efecto Halo: El Poder de la Primera Impresión',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1764004906/Efecto_Halo_El_Poder_de_la_Primera_Impresi%C3%B3n_hjg4pg.png',
    review: 'Este podcast explora el "efecto halo", un sesgo cognitivo que nos lleva a formar una opinión general sobre alguien o algo a partir de una única característica positiva o negativa inicial. Explicamos cómo esta primera impresión actúa como un "filtro" que distorsiona nuestra percepción de otros rasgos.',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/w_720,q_auto:good/v1757025613/Efecto_Halo_El_Poder_de_la_Primera_Impresi%C3%B3n_s883t0.mp4',
    publicationDate: 'Video Podcast',
    sources: 'El Nexo Digital'
  },
  {
    id: 'vp12_lib',
    category: 'Podcasts',
    title: 'El Sentido de la Vida: Conexión en la Era Digital',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1764004905/El_Sentido_de_la_Vida_Conexi%C3%B3n_en_la_Era_Digital_mzdo4r.png',
    review: 'Este podcast aborda la búsqueda del sentido de la vida en el contexto de la era digital y la hiperconectividad. Sostiene que la verdadera conexión y propósito no se encuentran en la superficialidad de las interacciones digitales, sino en la creación consciente de significado a través de pequeños actos y momentos de pausa reflexiva.',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/w_720,q_auto:good/v1757025822/el_sentido_de_la_vida_a0s8rs.mp4',
    publicationDate: 'Video Podcast',
    sources: 'El Nexo Digital'
  },
  {
    id: 'vp13_lib',
    category: 'Podcasts',
    title: 'Elemento FUEGO: Un Mito sobre el Poder y la Destrucción',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1764004906/Elemento_FUEGO_Un_Mito_sobre_el_Poder_y_la_Destrucci%C3%B3n_n1dvza.png',
    review: 'Una poderosa alegoría sobre la relación de la humanidad con el fuego, evocando el mito de Prometeo. Presenta el fuego no solo como una herramienta para la supervivencia y el progreso, sino como una metáfora de la ambición y el poder: una fuerza de doble filo capaz tanto de crear civilizaciones como de alimentar la autodestrucción.',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/w_720,q_auto:good/v1757025878/elemento_fuego_bzneem.mp4',
    publicationDate: 'Video Podcast',
    sources: 'El Nexo Digital'
  },
  {
    id: 'vp14_lib',
    category: 'Podcasts',
    title: 'Elemento Tierra: Ancla y Trampolín',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/f_jpg,so_2/v1764004908/Elemento_Tierra_Ancla_y_Trampol%C3%ADn_hgmpzr.jpg',
    review: 'Reflexión filosófica sobre la relación de la humanidad con la Tierra, enmarcada en una dualidad fundamental. Por un lado, la Tierra es nuestro ancla, la realidad física que nos da cimientos. Por otro, se plantea como una posible limitación para un espíritu que anhela trascender.',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/w_720,q_auto:good/v1757025930/elemento_tierra_emlpy6.mp4',
    publicationDate: 'Video Podcast',
    sources: 'El Nexo Digital'
  },
  {
    id: 'vp15_lib',
    category: 'Podcasts',
    title: 'Decisiones Emocionales: Cerebro vs Corazón',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1764004907/Decisiones_Emocionales_La_lucha_entre_el_cerebro_y_el_coraz%C3%B3n_wmriuh.png',
    review: 'Este podcast desmitifica la idea de que somos seres puramente racionales, explorando la profunda influencia que las emociones tienen en nuestra toma de decisiones. Basándose en conceptos de la psicología, como los dos sistemas de pensamiento de Daniel Kahneman.',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/w_720,q_auto:good/v1757026016/emociones_vs_decisiones_ytaqss.mp4',
    publicationDate: 'Video Podcast',
    sources: 'El Nexo Digital'
  },
  {
    id: 'vp16_lib',
    category: 'Podcasts',
    title: 'Epistemología',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1764004906/Epistemolog%C3%ADa_yluxvc.png',
    review: 'Profunda reflexión epistemológica que explora la compleja relación entre creencia, conocimiento y realidad. El locutor argumenta que, si bien el conocimiento se basa en hechos justificados, las creencias subjetivas, cuando se masifican, pueden crear "realidades sociales" con consecuencias tangibles.',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/w_720,q_auto:good/v1757027951/epistemolog%C3%ADa_dxnca5.mp4',
    publicationDate: 'Video Podcast',
    sources: 'El Nexo Digital'
  },
  {
    id: 'vp17_lib',
    category: 'Podcasts',
    title: 'La Paradoja del Libre Albedrío',
    author: 'El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1764004906/La_Paradoja_del_Libre_Albedr%C3%ADo_qavv5p.png',
    review: 'Este podcast aborda el clásico debate filosófico entre el determinismo y el libre albedrío, cuestionando hasta qué punto nuestras decisiones son verdaderamente nuestras. El locutor argumenta que factores como la biología, la educación y la cultura actúan como fuerzas deterministas.',
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
    // Generamos la portada automáticamente capturando el segundo 2 del video
    imageUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/f_jpg,so_2/v1764950849/postales2_mdcweq.jpg',
    review: 'Entre las calles tranquilas de Colonia del Sacramento, el Bastión del Carmen se alza como un puente entre pasado y presente. Antiguo edificio militar del siglo XVIII, hoy convertido en centro cultural, guarda en sus muros la memoria de la ciudad y abre sus puertas al arte, la música y el teatro. Pasear por sus salas y jardines es sentir cómo la historia se transforma en vida, donde cada piedra cuenta un relato y cada espectáculo renueva la tradición.',
    videoUrl: 'https://res.cloudinary.com/dnauavz56/video/upload/v1764950849/postales2_mdcweq.mp4',
    publicationDate: 'Postal Coleccionable',
    sources: 'Producción Original El Nexo Digital'
  },

  // --- LIBROS ---
  {
    id: 'libro1',
    category: 'Libros',
    title: 'Cien Años de Soledad',
    author: 'Gabriel García Márquez',
    imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1762290647/100a%C3%B1os_de_soledad_tapa_obdv4y.jpg',
    review: `La urdimbre de Macondo: Realismo Mágico, Soledad y Violencia en la obra de Gabriel García Márquez...`,
    audioUrl: 'https://res.cloudinary.com/dsammmekc/video/upload/v1762292455/Cien_A%C3%B1os_de_Soledad__El_Realismo_M%C3%A1gico__la_Censura_y_el_Final_fuk0lv.mp4',
    videoUrl: 'https://res.cloudinary.com/dsammmekc/video/upload/v1762291490/Cien_a%C3%B1os_de_controversia_ubapnm.mp4',
    publicationDate: 'Octubre, 2024',
    sources: `Análisis generado con el apoyo de NotebookLM...`
  },
  {
    id: 'libro2',
    category: 'Libros',
    title: '1984',
    author: 'George Orwell',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1763682991/1984_dmfxt4.webp',
    review: `1984 (George Orwell): La Anatomía de la Distopía y la Mutilación Lingüística...`,
    publicationDate: 'Septiembre, 2024',
    sources: 'Reseña basada en análisis literario estándar de la obra.'
  },
  {
    id: 'libro3',
    category: 'Libros',
    title: 'El Principito',
    author: 'Antoine de Saint-Exupéry',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1763682991/El_Principito_vp9dny.jpg',
    review: `El Principito (Antoine de Saint-Exupéry): La Indagación Existencial y el Olvido de lo Esencial...`,
    publicationDate: 'Agosto, 2024',
    sources: 'Reseña basada en análisis literario estándar de la obra.'
  },
  {
    id: 'libro4',
    category: 'Libros',
    title: 'Crimen y Castigo',
    author: 'Fiódor Dostoievski',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1763682991/Crimen_y_Castigo_hmhjw2.jpg',
    review: `Crimen y Castigo (Fiódor Dostoievski): El Experimento Moral y la Sed de Expiación...`,
    publicationDate: 'Julio, 2024',
    sources: 'Reseña basada en análisis literario estándar de la obra.'
  },

  // --- DISCOS ---
  {
    id: 'disco1',
    category: 'Discos',
    title: 'Signos',
    author: 'Soda Stereo',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1763682991/signos_soda_y5y0j8.webp',
    review: `Signos (Soda Stereo): La Consagración Continental y la Renovación New Wave...`,
    publicationDate: 'Junio, 2024',
    sources: 'Reseña basada en críticas musicales y análisis de la discografía de la banda.'
  },
  {
    id: 'disco2',
    category: 'Discos',
    title: 'OK Computer',
    author: 'Radiohead',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1763682991/OK_Computer_xdc4e3.jpg',
    review: `OK Computer (Radiohead): El Paisaje Sonoro de la Ansiedad Tecnológica...`,
    publicationDate: 'Mayo, 2024',
    sources: 'Reseña basada en críticas musicales y análisis de la discografía de la banda.'
  },
  {
    id: 'disco3',
    category: 'Discos',
    title: 'Buena Vista Social Club',
    author: 'Buena Vista Social Club',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1763682990/Buena_Vista_Social_Club_bjntin.webp',
    review: `Buena Vista Social Club (Colectivo): El Rescate Patrimonial y la Geopolítica del Ritmo...`,
    publicationDate: 'Abril, 2024',
    sources: 'Reseña basada en la historia del álbum y su impacto cultural.'
  },
  {
    id: 'disco4',
    category: 'Discos',
    title: 'El Mal Querer',
    author: 'Rosalía',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1763682990/El_Mal_Querer_rokifv.webp',
    review: `El Mal Querer (Rosalía): La Vanguardia Flamenca como Narrativa Conceptual...`,
    publicationDate: 'Marzo, 2024',
    sources: 'Reseña basada en críticas musicales y análisis del concepto del álbum.'
  },
  
  // --- PELÍCULAS ---
  {
    id: 'peli1',
    category: 'Películas',
    title: 'El Laberinto del Fauno',
    author: 'Guillermo del Toro',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1763682990/el_aberinto_del_fauno_bvflyp.jpg',
    review: `El Laberinto del Fauno (Guillermo del Toro): La Dicotomía Visual entre Mito y Fascismo...`,
    publicationDate: 'Febrero, 2024',
    sources: 'Análisis cinematográfico y de dirección de arte.'
  },
  {
    id: 'peli2',
    category: 'Películas',
    title: 'Parásitos (Parasite)',
    author: 'Bong Joon-ho',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1763682991/parasitos_ug0kxe.jpg',
    review: `Parásitos (Bong Joon-ho): La Geografía de Clase y la Escalera de la Tragedia...`,
    publicationDate: 'Enero, 2024',
    sources: 'Análisis de estructura narrativa y sociología del cine.'
  },
  {
    id: 'peli3',
    category: 'Películas',
    title: 'Breaking Bad (Serie)',
    author: 'Vince Gilligan (Creador)',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1763682990/breaking_bad_dfn2yh.jpg',
    review: `Breaking Bad (Vince Gilligan): La Alquimia del Mal y el Arco Narrativo Inevitable...`,
    publicationDate: 'Diciembre, 2023',
    sources: 'Análisis de narrativa televisiva y ética.'
  },
  {
    id: 'peli4',
    category: 'Películas',
    title: 'Roma',
    author: 'Alfonso Cuarón',
    imageUrl: 'https://res.cloudinary.com/dnauavz56/image/upload/v1763682990/roma_m5hqas.jpg',
    review: `Roma (Alfonso Cuarón): Memoria en Blanco y Negro y la Estética de la Observación...`,
    publicationDate: 'Noviembre, 2023',
    sources: 'Crítica de cine y análisis estético.'
  }
];
