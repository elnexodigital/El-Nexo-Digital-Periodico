export interface CollectionTrack {
  id: string;
  title: string;
  chapter: string;
  audioUrl: string;
  description: string;
}

export interface ExclusiveCollection {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  badge: string;
  coverUrl: string;
  description: string;
  exclusiveNotes: string;
  dossierId?: string;
  externalUrl?: string;
  category: string;
  tracks: CollectionTrack[];
}

export const EXCLUSIVE_COLLECTIONS: ExclusiveCollection[] = [
  {
    id: 'col_enciclica',
    title: 'Encíclica Magnifica Humanitas',
    subtitle: 'El Papa León XIV y el Desafío de la Inteligencia Artificial',
    tagline: 'Serie Exclusiva en 6 Capítulos • Incluye Dossier y Fuentes Primarias',
    badge: 'Colección Exclusiva • Edición Especial',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1792337920/Man_reading_book_in_living_2K_20261007232437_bacsnv.jpg',
    description: 'Análisis minucioso del primer documento papal dedicado a desarmar el paradigma tecnocrático, la pérdida de sentido humano, los algoritmos de verdad pública y la dignidad de la existencia encarnada.',
    exclusiveNotes: 'Exclusivo en El Nexo Digital: audios articulados con el Dossier Analítico de 245 parágrafos, cuadros comparativos con Rerum Novarum (1891) y acceso al archivo documental completo.',
    dossierId: 'investigacion_3',
    externalUrl: 'https://www.youtube.com/playlist?list=PLRkKe7b6h28Y',
    category: 'Religión & Humanidades',
    tracks: [
      {
        id: 'enciclica_intro',
        title: 'Introducción: El Supremo Magisterio y la IA',
        chapter: 'Introducción',
        audioUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1792334523/Leonintro_k2zpqi.mp3',
        description: 'Marco histórico de la encíclica Magnifica Humanitas y su proclamación frente a la revolución algorítmica.'
      },
      {
        id: 'enciclica_cap1',
        title: 'Capítulo 1: Génesis y la Doctrina Social de la Iglesia',
        chapter: 'Capítulo 1',
        audioUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1792334511/cap1leon_ttasdq.mp3',
        description: 'La continuidad teológica desde León XIII hasta hoy: del proletariado fabril al sujeto digitalizado.'
      },
      {
        id: 'enciclica_cap2',
        title: 'Capítulo 2: La Torre de Babel y el Paradigma Tecnocrático',
        chapter: 'Capítulo 2',
        audioUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1792334511/leoncap2_hvdwcv.mp3',
        description: 'Examen de la búsqueda de eficiencia ciega y la uniformización del pensamiento humano.'
      },
      {
        id: 'enciclica_cap3',
        title: 'Capítulo 3: Trabajo Humano, Automatización y Subsidiariedad',
        chapter: 'Capítulo 3',
        audioUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1792334514/cap3leon_tk7t5m.mp3',
        description: 'El impacto de la sustitución del trabajo vivo, la alienación del criterio propio y la justicia distributiva.'
      },
      {
        id: 'enciclica_cap4',
        title: 'Capítulo 4: Verdad Pública, Manipulación y Desarme Autónomo',
        chapter: 'Capítulo 4',
        audioUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1792334518/leoncap4_ksl3wg.mp3',
        description: 'Vigilancia cognitiva, censura corporativa y el imperativo moral de frenar las armas letales autónomas.'
      },
      {
        id: 'enciclica_cap5',
        title: 'Capítulo 5: Los Muros de Jerusalén — Trascendencia y Comunidad',
        chapter: 'Capítulo 5',
        audioUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1792334517/cap5leon_f90stj.mp3',
        description: 'La persona de carne y hueso como eje innegociable. El arte y la fe como reductos incalculables por máquinas.'
      }
    ]
  },
  {
    id: 'col_1492',
    title: '1492 • La Línea Paralela: El mundo que nos quitaron',
    subtitle: '¿En qué época estaríamos hoy en Latinoamérica sin la llegada de Europa?',
    tagline: 'Miniserie Contrafáctica en 5 Entregas (Intro + 4 Capítulos) • Arqueología, Quipus & Lógica Aymara',
    badge: 'Colección Exclusiva • Historia Alternativa & Ciencia',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1792340129/Person_and_guanaco_by_river_2K_20261012202058_wwetbz.jpg',
    description: '¿Qué habría pasado si una pared infranqueable en el Atlántico hubiera dejado a las Américas completamente aisladas durante 500 años más, hasta este 2026? Sin espadas, sin gérmenes y sin intercambio: ¿estaríamos «atrasados» o seríamos una potencia ecológica e hipertecnológica? A partir de datos arqueológicos, la matemática del quipu, la lógica trivalente aymara e ingeniería real, trazamos una línea de tiempo paralela contrafáctica.',
    exclusiveNotes: 'Exclusivo en El Nexo Digital: serie sonora seriada con acceso al Dossier Analítico de investigación, fuentes primarias y bibliografía académica (Gary Urton, Charles C. Mann, Terence D’Altroy, Iván Guzmán de Rojas y John Murra).',
    dossierId: 'investigacion_linea_paralela_1492',
    externalUrl: 'https://elnexodigital.com',
    category: 'Historia & Antropología',
    tracks: [
      {
        id: '1492_intro',
        title: 'Intro: La Línea Paralela — El mundo que nos quitaron',
        chapter: 'Introducción',
        audioUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1792334227/intro1841_bzsjdi.mp3',
        description: '¿En qué época estaríamos hoy en Latinoamérica sin la llegada de Europa? Esquivamos el debate trillado de carabelas para proyectar un continente aislado hasta 2026.'
      },
      {
        id: '1492_cap1',
        title: 'Capítulo 1: El mito del atraso y la geopolítica que nos quitaron',
        chapter: 'Capítulo 1',
        audioUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1792334223/cap1_1841_fu4kwd.mp3',
        description: 'Desmantelando el mito del primitivismo: megaciudades del Misisipi (Cahokia), confederación iroquesa, ingeniería andina y el mapa geopolítico entre el Quechua y el Guaraní.'
      },
      {
        id: '1492_cap2',
        title: 'Capítulo 2: Sin caballo ni buey: La revolución hidráulica y el transporte continental',
        chapter: 'Capítulo 2',
        audioUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1792334231/cap2_1841_wter4y.mp3',
        description: 'El cuello de botella de la fauna de tiro (Jared Diamond), selección adaptativa de guanacos gigantes y la superautopista fluvial (Misisipi, Amazonas, Paraná y Uruguay).'
      },
      {
        id: '1492_cap3',
        title: 'Capítulo 3: Del Quipu al Silicio: La informática trivalente y la red de hilo',
        chapter: 'Capítulo 3',
        audioUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1792334231/cap3_1841_pgp89d.mp3',
        description: 'La ciencia tridimensional del quipu (Gary Urton / Harvard) y la gramática aymara de lógica trivalente (Iván Guzmán de Rojas) para una red de datos orgánica panamericana.'
      },
      {
        id: '1492_cap4',
        title: 'Capítulo 4: El Ayni Global: Filosofía, religión y la Ley de la Pachamama',
        chapter: 'Capítulo 4',
        audioUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1792334228/cap4_1841_xkymij.mp3',
        description: 'Evolución espiritual sin culpa original: panenteísmo ecológico (John Murra), el Ayni como reciprocidad y la búsqueda comunitaria de la Tierra Sin Mal de los guaraníes.'
      }
    ]
  },
  {
    id: 'col_reciclaje',
    title: 'Reciclaje, Consumo & Crítica Industrial',
    subtitle: 'Moda Rápida, Adicción Circular y Desindustrialización',
    tagline: 'Trilogía Sonora • Vinculada al Archivo de Ecología y Producción del Ateneo',
    badge: 'Colección Exclusiva • Ensayos Críticos',
    coverUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800',
    description: 'Tres piezas contundentes que interpelan la hipocresía del reciclaje cosmético corporativo, la trampa psíquica de la adicción al consumo y la herida abierta por el cierre fabril.',
    exclusiveNotes: 'Exclusivo en El Nexo Digital: audios enlazados a los dossiers de celulosa, crisis de agua y memoria obrera disponibles en la sección Documentos del Ateneo.',
    category: 'Ecología & Sociedad',
    tracks: [
      {
        id: 'rec_fashion',
        title: 'Reciclaje Fashion: El Maquillaje de la Moda Basura',
        chapter: 'Parte 1',
        audioUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1792333856/resiclaje_fashion_z3goes.mp3',
        description: 'La falacia del "greenwashing" textil: cómo el reciclaje aparente legitima la hiperproducción y el descarte masivo.'
      },
      {
        id: 'rec_ouroboros',
        title: 'Ouroboros y la Adicción al Vacío',
        chapter: 'Parte 2',
        audioUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1792333854/Ouroboros_y_la_adicci%C3%B3n_rlw19f.mp3',
        description: 'La serpiente que se muerde la cola: consumo compulsivo, dopamina programada y la insatisfacción constante.'
      },
      {
        id: 'rec_fanapel',
        title: 'Fuck You Fanapel: Crónica del Despojo Industrial',
        chapter: 'Parte 3',
        audioUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1792334620/fuckyoufanapel_ecz7sh.mp3',
        description: 'El impacto crudo y real del cierre fabril en Juan Lacaze: cuando el humo de las chimeneas se convirtió en desierto obrero.'
      }
    ]
  },
  {
    id: 'col_dios_laico',
    title: 'El Dios Laico',
    subtitle: 'La Democracia como Nueva Religión y la Liturgia del Estado Moderno',
    tagline: 'Serie Crítica Completa en 5 Entregas • Liturgia Republicana, Herejía y Muerte Civil',
    badge: 'Colección Exclusiva • Filosofía Crítica',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1792340270/el_dios_laico_bfl5q4.png',
    description: '¿Ateo? No me hagas reír. No vas a la iglesia, no creés en santos, pero cada cuatro años hacés fila en un templo escolar para arrodillarte ante el mismo altar. Desarmamos el mayor engaño de la modernidad: la democracia no abolió la religión, le hizo un cover. Tradujeron la Biblia en Constitución, a los curas en jueces y al sacramento de la misa en esa urna donde entregás tu soberanía.',
    exclusiveNotes: 'Exclusivo en El Nexo Digital: audios enlazados al Dossier Crítico sobre el diezmo impositivo obligatorio, la liturgia de la urna y la nueva inquisición administrativa.',
    dossierId: 'investigacion_el_dios_laico',
    externalUrl: 'https://elnexodigital.com',
    category: 'Filosofía & Política',
    tracks: [
      {
        id: 'laico_intro',
        title: 'Episodio Central: ¿Ateo? No me hagas reír — El Cover de la Democracia',
        chapter: 'Episodio Central',
        audioUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1792334938/el_dios_laico_bvbat7.mp3',
        description: 'Desarmamos el mayor engaño de la modernidad: cómo tradujeron la Biblia en Constitución, curas en jueces y la misa en la urna electoral donde entregás tu soberanía.'
      },
      {
        id: 'laico_cap1',
        title: 'Capítulo 1: El Mito de la Emancipación Secular',
        chapter: 'Capítulo 1',
        audioUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1792373252/el_dios_laico_capitulo_1_ltvikr.mp3',
        description: 'Primer capítulo: la transmutación de la fe religiosa hacia la fe estatista y las estructuras dogmáticas del poder secular.'
      },
      {
        id: 'laico_cap2',
        title: 'Capítulo 2: Los Nuevos Templos y el Ritual Ciudadano',
        chapter: 'Capítulo 2',
        audioUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1792373252/el_dios_laico_capitulo_2_xvacin.mp3',
        description: 'Segundo capítulo: la liturgia cívica, los sacramentos republicanos y la sacralización del aparato estatal.'
      },
      {
        id: 'laico_cap3',
        title: 'Capítulo 3: ¿Pensás que votar es libertad? No, es solo ir a misa',
        chapter: 'Capítulo 3',
        audioUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1792334940/laico3_waxjnn.mp3',
        description: 'La liturgia del sistema: Constitución como Biblia, Jueces en toga como Clero, veda electoral como Cuaresma y el cuarto oscuro como Confesionario.'
      },
      {
        id: 'laico_cap4',
        title: 'Capítulo 4: Si no pagás el tributo, te construyen el infierno en vida',
        chapter: 'Capítulo 4',
        audioUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1792334945/laico_4_ldguut.mp3',
        description: 'El diezmo diario y la Inquisición moderna: impuesto obligatorio como tributo de fe, persecución al abstencionista y muerte civil para el disidente.'
      }
    ]
  }
];
