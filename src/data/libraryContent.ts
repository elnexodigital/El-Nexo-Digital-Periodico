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
  },
  {
    id: 'investigacion_3',
    category: 'Revistas',
    title: 'Análisis Exhaustivo de la Encíclica Magnifica Humanitas del Papa León XIV',
    author: 'Leo Castrillo / Gemini',
    imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1792337920/Man_reading_book_in_living_2K_20261007232437_bacsnv.jpg',
    review: `La carta encíclica Magnifica Humanitas («Magnífica humanidad»), promulgada por el papa León XIV, se constituye como el primer documento de supremo magisterio pontificio dedicado de forma sistemática a abordar las implicaciones éticas, antropocéntricas y sociales de la inteligencia artificial. Firmada el 15 de mayo de 2026 y dada a conocer oficialmente al mundo el 25 de mayo de 2026, la encíclica articula una respuesta teológica y jurídica frente al paradigma tecnocrático. El texto toma como marco la Doctrina Social de la Iglesia (DSI) para evaluar las transformaciones digitales que reconfiguran el trabajo, la verdad pública, la paz mundial y la concepción misma de la condición humana.

— Contexto Histórico y Continuidad Doctrinal:
Suscrita el 15 de mayo de 2026, coincidiendo exactamente con el 135.º aniversario de Rerum novarum de León XIII (1891). Mientras León XIII intervino ante la Revolución Industrial, León XIV fija la postura de la sede romana frente a las res novae de la Revolución Digital y la inteligencia artificial generativa.

— Comparativa Doctrinal:
• Rerum Novarum (1891): Sujeto prioritario: proletariado urbano fabril. Amenaza: capitalismo salvaje y explotación asalariada. Eje ético: salario justo, derecho de asociación y regulación estatal protectora.
• Magnifica Humanitas (2026): Sujeto prioritario: la persona encarnada y el trabajador automatizado. Amenaza: paradigma tecnocrático, monopolios de datos y militarización autónoma. Eje ético: dignidad inalienable, subsidiariedad digital, desarme de la IA y bien común participativo.

— Estructura y Parábolas Teológicas:
Compuesta por 245 párrafos y 5 capítulos temáticos, contrapone dos metáforas bíblicas:
1. La Torre de Babel: simboliza el paradigma tecnocrático y la búsqueda de eficiencia total donde la uniformidad algorítmica aplasta la diversidad cultural.
2. La Reconstrucción de los Muros de Jerusalén: evoca el renacimiento comunitario donde la tecnología se subordina al bien común.

— Desarme Integral de la Inteligencia Artificial:
1. Dimensión Militar: prohibición estricta de sistemas de armas letales autónomas.
2. Dimensión Socioeconómica: freno a la vigilancia laboral y desarticulación de monopolios de datos.
3. Dimensión Cognitiva y Cultural: erradicación de adicciones digitales y prevención de manipulación de la verdad pública.

Defensa de la existencia encarnada: la persona humana no es un conjunto de datos reductible a código. El arte auténtico es una manifestación del alma y de la chispa interior humana irreproducible por el cálculo estadístico de una máquina.`,
    publicationDate: 'Mayo, 2026',
    externalUrl: 'https://www.youtube.com/playlist?list=PLRkKe7b6h28Y',
    sources: 'Doctrina Social de la Iglesia • Análisis Gemini & El Nexo Digital'
  },
  {
    id: 'investigacion_4',
    category: 'Revistas',
    title: 'Auge y Ocaso del Frigorífico Nacional de Uruguay',
    author: 'Leo Castrillo / NotebookLM',
    imageUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800',
    review: `Una visión integral de la industria ganadera en Uruguay, analizando su evolución histórica, su estructura institucional y los desafíos actuales:

1. El Monopolio del Abasto Capitalino (1928-1959): Creado por Ley 8282 de 1928 bajo el impulso del batllismo, el Frigorífico Nacional actuó como "Ente Testigo" frente al oligopolio exportador extranjero ("Trust de Chicago"), asegurando precios justos a ganaderos y carne accesible para Montevideo.
2. La Desregulación de 1959 y el Abasto Libre: El decreto de abasto libre eliminó el monopolio del abasto capitalino, exponiendo a la empresa estatal a una fuerte crisis competitiva frente a plantas modernas del interior. En 1978 se dispuso su cese definitivo.
3. Las Vedas de la Carne (1969-1973): Prohibiciones totales y parciales del consumo interno para forzar la exportación y el ingreso de divisas, provocando cambios alimentarios en la población, contrabando interdepartamental y mercados paralelos.
4. La Experiencia de EFCSA (1958-1992): Creación de Establecimientos Frigoríficos del Cerro S.A. con participación obrera y estatal tras la salida de Swift y Artigas a fines de 1957.
5. El Frigorífico Anglo de Fray Bentos: De la Liebig's alemana al grupo británico Vestey en 1924 como "la gran cocina del mundo", con 4.500 operarios de más de 60 nacionalidades y su emblemática ciudad-fábrica.
6. El Modelo Actual: Récords de exportación, sistema de "Cajas Negras" (SEIIC) y trazabilidad individual obligatoria (SIRA), posicionando a Uruguay como referente internacional de calidad del campo al plato.`,
    publicationDate: 'Edición Semanal Activa',
    externalUrl: 'https://elnexodigital.com',
    sources: 'Archivo Histórico Nacional • Investigación Curada con NotebookLM & El Nexo Digital'
  },
  {
    id: 'investigacion_linea_paralela_1492',
    category: 'Revistas',
    title: 'La Línea Paralela: El Mundo que nos Quitaron (o el que no nos dejamos construir)',
    author: 'Leo Castrillo / El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1792340129/Person_and_guanaco_by_river_2K_20261012202058_wwetbz.jpg',
    review: `¿En qué época estaríamos hoy en Latinoamérica sin la llegada de Europa?

El 12 de octubre en El Nexo Digital esquivamos la discusión repetitiva sobre carabelas y conquistadores para hacernos una pregunta decisiva: ¿qué habría pasado si una pared infranqueable en el Atlántico hubiera dejado a las Américas completamente aisladas durante 500 años más, hasta este 2026?

Sin espadas, sin gérmenes y sin intercambio: ¿estaríamos «atrasados» o seríamos una potencia ecológica e hipertecnológica? A partir de datos arqueológicos, la matemática del quipu, la lógica trivalente aymara y estudios de antropología e ingeniería real, trazamos una línea de tiempo paralela contrafáctica y rigurosa en 4 capítulos esenciales:

— Episodio 1: El mito del atraso y la geopolítica que nos quitaron
¿Incas dominando todo el continente o imperios cayendo por su propio peso? Desmantelamos la falacia de que en 1492 había un «vacío» o sociedades «primitivas». Desde las megaciudades del Misisipi como Cahokia y la democracia confederada iroquesa en el norte, hasta la ingeniería sísmica y la biotecnología agrícola andina.
Basándonos en estudios de Charles C. Mann (1491) y Terence D'Altroy (The Incas), analizamos la tensión geopolítica del Tawantinsuyu y cómo luciría hoy el mapa político de Sudamérica entre dos gigantes lingüísticos e institucionales: el Quechua en el Pacífico y el Guaraní en la Cuenca del Plata.

— Episodio 2: Sin caballo ni buey: La revolución hidráulica y el transporte continental
¿Cómo te movés por miles de kilómetros sin caballos, vacas ni bueyes? Abordamos el gran cuello de botella evolutivo de las Américas: la ausencia de megafauna doméstica de tiro pesado.
A partir de la tesis de Jared Diamond (Armas, gérmenes y acero), demostramos cómo la falta de caballos no significó un estancamiento, sino un acelerador tecnológico singular: selección genética adaptativa de camélidos (guanacos de gran porte) y una superautopista fluvial por los ríos Misisipi, Amazonas, Paraná y Uruguay, propiciando un salto directo a la energía del vapor y la ingeniería hidráulica de canales.

— Episodio 3: Del Quipu al Silicio: La informática trivalente y la red de hilo
¿Y si la primera supercomputadora de este continente no hubiese sido de silicio ni de plástico, sino de hilo anudado? Exploramos la era digital alternativa: la ciencia tridimensional de los quipus incaicos estudiada por Gary Urton en Harvard y los descubrimientos de Iván Guzmán de Rojas sobre la gramática aymara y su lógica trivalente (verdadero, falso, indeterminado), óptima para inteligencia artificial y computación cuántica. Una red de datos panamericana táctil, orgánica y basada en algoritmos al servicio del tejido comunitario.

— Episodio 4: El Ayni Global: Filosofía, religión y la Ley de la Pachamama
Sin Biblia, sin Inquisición y sin dogma del pecado original: ¿en qué creeríamos hoy? Alejándonos del mito colonial del «salvaje sangriento», examinamos la cosmovisión panenteísta y ecológica de las civilizaciones originarias.
Apoyándonos en los trabajos del antropólogo John Murra sobre la organización económica andina, proyectamos una ética donde el delito supremo del siglo XXI no es moral sino romper el equilibrio del biosistema: un modelo social articulado en torno al Ayni (reciprocidad comunitaria) y la búsqueda guaraní del Yvy Maraë'ÿ (la Tierra Sin Mal).

— Fuentes, Bibliografía y Evidencia Científica:
• Charles C. Mann — 1491: Una nueva historia de las Américas antes de Colón.
• Terence N. D'Altroy — The Incas (Peoples of America).
• Jared Diamond — Armas, gérmenes y acero: Los destinos de las sociedades humanas.
• Gary Urton — Signs of the Inka Khipu: Binary Coding in the Andean Knotted-String Records (Harvard University Press).
• Iván Guzmán de Rojas — Lógica trivalente aymara, computación y traducción sintáctica algorítmica.
• John V. Murra — Formaciones económicas y políticas del mundo andino.`,
    publicationDate: '12 de Octubre, 2026',
    externalUrl: 'https://elnexodigital.com',
    sources: 'Arqueología & Antropología • Gary Urton, Iván Guzmán de Rojas, Charles Mann, Terence D’Altroy, John Murra'
  },
  {
    id: 'investigacion_el_dios_laico',
    category: 'Revistas',
    title: 'El Dios Laico: La Democracia como Nueva Religión y la Liturgia del Estado Moderno',
    author: 'Leo Castrillo / El Nexo Digital',
    imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1792340270/el_dios_laico_bfl5q4.png',
    review: `¿Ateo? No me hagas reír. No vas a la iglesia, no creés en santos, pero cada cuatro años hacés fila en un templo escolar para arrodillarte ante el mismo altar.

En «EL DIOS LAICO», desarmamos el mayor engaño de la modernidad: la democracia no abolió la religión, le hizo un cover. Analizamos con datos e historia cómo tradujeron la Biblia en Constitución, a los curas en jueces y al sacramento de la misa en esa urna donde entregás tu soberanía popular:

— Episodio Central: ¿Ateo? No me hagas reír — El Cover Secular
¿De verdad te creés emancipado del dogma? Te cambiaron de templo y ni te diste cuenta.
Desmontamos paso a paso la transmutación teológica del Estado moderno: la sacralización de lo profano, la infalibilidad dogmática del aparato burocrático y cómo la fe se canalizó desde las catedrales de piedra hacia los palacios legislativos y las urnas electorales.

— Capítulo 3: ¿Pensás que votar es un acto de libertad? No, es solo ir a misa
Le metemos el bisturí al rito más intocable e incuestionado de la democracia contemporánea. Te mostramos cómo el sistema armó su propia liturgia completa:
• La Constitución como Sagrada Biblia.
• Los Jueces en toga como el Sumo Clero ungido.
• La veda electoral como tiempo de Cuaresma y purificación civil.
• El cuarto oscuro como el Confesionario íntimo.
Te convencieron de que meter un papelito en una caja de cartón perdona mágicamente los pecados de la casta política.

— Capítulo 4: Si no pagás el tributo, te construyen el infierno en vida
El lado más oscuro del templo republicano: el diezmo diario y la Santa Inquisición moderna.
Desnudamos la trágica realidad de la disciplina estatal:
• El impuesto mensual como tributo de fe obligatorio bajo amenaza de violencia legal.
• La persecución implacable al abstencionista y la ciber-herejía en el ágora digital de redes.
• La muerte civil, fiscal, crediticia y administrativa para cualquiera que intente decir firmemente “NO”.
¿Te dijeron que fueras libre? Intentá no arrodillarte y mirá cómo te asfixian. Un análisis sin anestesia sobre la verdadera prisión de la modernidad secular.`,
    publicationDate: 'Edición Exclusiva Especial',
    externalUrl: 'https://elnexodigital.com',
    sources: 'Filosofía Política & Crítica Institucional • El Nexo Digital'
  }
];