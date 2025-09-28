
import type { WeeklyContent } from '../types.ts';

// ====================================================================================
// PLANTILLA DE CONTENIDO SEMANAL - ¡EDITA ESTE ARCHIVO PARA ACTUALIZAR LA REVISTA!
// ====================================================================================
// Instrucciones:
// 1. La revista se compone de una portada ('cover') y una serie de páginas ('pages').
// 2. Cada página puede ser 'impar' (con texto) o 'par' (con imagen a hoja completa).
//    El sistema las alternará automáticamente.
// 3. Completa los datos para cada tipo de página según el formato.
// ====================================================================================

const BANNER_PUBLICITARIO_1 = 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1758420122/fijagraficagaona_jqcbrz.png';
const BANNER_PUBLICITARIO_2 = 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759056615/graficafijanegro_rlldm0.png'; 
const BANNER_PUBLICITARIO_3 = 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759056629/fijagraficacozzi_lbvju7.png';
const BANNER_PUBLICITARIO_4 = 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759056647/fija_grafica_artigas_ejyxoh.png';
const BANNER_PUBLICITARIO_5 = 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759056663/fija_para_gr%C3%A1fica_eisp2b.png';
const BANNER_PUBLICITARIO_6 = 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759056589/fijagrafica_ema_ex4aey.png';
const BANNER_PUBLICITARIO_7 = 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759056707/fija_grafica_jl_eebywl.png';
const BANNER_PUBLICITARIO_8 = 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759056717/fija_gr%C3%A1fica_roma_j4krys.png';
const BANNER_PUBLICITARIO_9 = 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759056728/fija_gr%C3%A1fica_29_giell9.png';
const BANNER_PUBLICITARIO_10 = 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759056615/graficafijanegro_rlldm0.png';

export const WEEKLY_EDITION_CONTENT: WeeklyContent = {
  // --- PORTADA DE LA REVISTA ---
  cover: {
    headline: "Un viaje al corazón del estuario",
    subtitle: "El legado oculto de Juan Lacaze",
    imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759028708/tapa%20arroyo%20del%20sauce.png',
  },

  // --- PÁGINAS DE LA REVISTA ---
  pages: [
    // --- Página 1 (Impar) ---
    {
      type: 'odd',
      id: 'page1',
      headline: "La cuna de una cultura ribereña",
      subtitle: "un paisaje que habla",
      category: "Arqueología",
      backgroundUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759063853/rio_fondo_w5x9ah.png',
      layout: 'hoja-completa',
      content:  `Si uno mira el Arroyo del Sauce, al oeste de Juan Lacaze, puede pensar que es solo otro rincón sereno del litoral uruguayo. Pero bajo esa calma hay un secreto: un paisaje arqueológico que se estira como una alfombra bajo nuestros pies, cargado de historias que no entran en los manuales escolares.

No hablamos de un hallazgo aislado, de esos que terminan en vitrina con cartelito: “herramienta de piedra, siglo tal”. Lo que se encontró acá es algo mucho más potente: un territorio entero habitado por sociedades precolombinas, un mural de tiempo extendido desde la punta rocosa de Juan Lacaze hasta Punta Artilleros.

El cambio de enfoque es clave. No es un “sitio” arqueológico, es un escenario vivo, una constelación de huellas que nos muestra que estas comunidades no solo pasaban por acá, sino que se quedaban, pescaban, cazaban, recolectaban y, sobre todo, aprendían a dialogar con un estuario que podía ser generoso… o cruel.

👉 Se calcula que hace 1.500 años ya había grupos humanos instalados en la zona, dejando señales que, sorprendentemente, sobrevivieron casi intactas a la colonización europea. Eso, en sí mismo, es un pequeño milagro de resistencia cultural.

El equipo del MEC y el Centro de Investigación del Patrimonio Costero de la Udelar están usando de todo: desde prospecciones en tierra hasta mapas batimétricos (sí, se meten al agua con tecnología que parece sacada de un videojuego) para entender cómo esos antiguos pobladores moldearon su vida en torno al paisaje.

Y acá viene lo más interesante: cada fragmento hallado, cada conchilla, cada rastro, no es solo un “objeto”. Es la pista de un relato más grande: cómo se formaron los asentamientos, cómo se movían las personas, cómo interactuaban con un mundo que todavía no tenía fronteras ni nombres en los mapas.

⚡En un tiempo donde todo se mide en likes y métricas, detenerse en estas huellas nos recuerda algo esencial: la historia no siempre está escrita en libros; a veces late bajo la tierra, esperando que alguien la escuche.`,
      sources: [
       "Ministerio de Educación y Cultura",
       "Centro de Investigación del Patrimonio Costero (Udelar)"
      ],
      bannerUrl: BANNER_PUBLICITARIO_1,
    },

    // --- Página 2 (Par) ---
    {
      type: 'even',
      imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1758419894/articulo2_qfa8sv.png',
      bannerUrl: BANNER_PUBLICITARIO_2,
    },

    // --- Página 3 (Impar) ---
    {
      type: 'odd',
      id: 'page3',
      headline: "🗿 Guardianes de barro y piedra: un catálogo que late",
      category: "Patrimonio",
      backgroundUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759063852/vasijas_fondo_x8a6uo.png',
      layout: 'hoja-completa',
      content: `Imaginate esto: entre los juncos del Arroyo del Sauce y las playas de Punta Artilleros, no solo hay agua y arena. Hay un archivo secreto de la vida cotidiana y espiritual de los primeros ribereños. Herramientas, cerámicas, esculturas… objetos que, más que cosas, son mensajes embotellados que viajaron 1.500 años para llegar hasta nuestras manos.

Primero, la piedra. Entre los hallazgos abundan los instrumentos de molienda y corte, esas piezas pulidas que servían para transformar granos, raíces y carne. Nada de importaciones: las materias primas eran locales, elegidas con precisión quirúrgica. ¿Practicidad? Sí. ¿Creatividad? También. Muchos de estos artefactos eran multitasking prehistóricos, lo más parecido a un “cuchillo suizo” del estuario.

Pero la estrella de la película es la alfarería. Fragmentos de vasijas cocidas en fuegos abiertos —de tonos rojizos o negros— que revelan una mano paciente y un ojo artístico. Las técnicas incluían modelado en bola o en rollos sucesivos, como si fueran una artesanía zen antes del zen.

👉 Y atención: no todas eran ollas para cocinar. Algunas piezas grandes, decoradas por dentro y sin marcas de fuego, fueron usadas en contextos festivos o rituales. O sea, estos grupos no solo sobrevivían… también celebraban, honraban y creaban símbolos.

Entre esos símbolos brillan las campanas zoomorfas: esculturas huecas en forma de aves, felinos y anfibios. Uruguay nunca había visto tanta concentración de estas piezas como en este sitio. Eran objetos cargados de intención ritual, casi como tótems portátiles. Y lo que cuentan es fascinante: que había tiempo, estabilidad y excedente para dedicarse al arte y al espíritu.

El gran ícono de esta tradición es El Ñacurutú —una lechuza inmortalizada en barro hace unos 2.000 años. Descubierta en los 40 y hoy resguardada en el Museo Nacional de Antropología, se convirtió en emblema de una cultura que no se conformaba con sobrevivir: quería dejar huella en el mundo invisible, en lo simbólico.

⚡En otras palabras: lo que se desentierra acá no son simples objetos, sino la prueba de que la vida humana, incluso en condiciones duras, siempre busca ir más allá de lo práctico. Siempre quiere dejar belleza, misterio y sentido.`,
      sources: ["Museo Nacional de Antropología"],
      bannerUrl: BANNER_PUBLICITARIO_3,
    },
    
    // --- Página 4 (Par) ---
    {
      type: 'even',
      imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759062729/gracias_carla_hh4wbs.png',
      bannerUrl: '', 
    },
    
    // --- Página 5 (Impar) ---
    {
      type: 'odd',
      id: 'page5',
      headline: "⏳ 1500 años de ocupación continua",
      subtitle: "spoiler, no se fueron nunca",
      category: "Historia",
      backgroundUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759057558/surfero_de_antes_j6mwov.png',
      layout: 'media-hoja',
      content: `En el Arroyo del Sauce los arqueólogos se toparon con algo que rompe el mito de “pasaron por acá y chau”: resulta que hubo gente viviendo ahí durante al menos 1500 años seguidos. Sí, mientras medio planeta todavía discutía cómo prender fuego sin chamuscarse las cejas, estos ribereños ya estaban instalados con casa, cocina y hasta decoración.

La cronología de las piezas halladas va de 300 a 2000 años atrás. Y acá entra la polémica académica: ¿eran influencias amazónicas? ¿o un desarrollo local bien uruguayo, versión proto-nacional? El debate es casi como la grieta política de hoy, solo que con menos Twitter y más fragmentos de cerámica.

Lo que sí está claro es que estos grupos —los famosos “Ribereños plásticos” o “Goya-Malabrigo”— no eran improvisados. Eran cazadores, recolectores, horticultores, básicamente multitaskers avant la lettre. Su vida ribereña estaba tan sincronizada con el entorno que parecían haber firmado un contrato de permanencia con el estuario.

👉 Y ojo a este detalle: en Boca del Cufré W, otro sitio cercano, apareció evidencia de ocupación hasta hace unos 400 años. ¿Te suena la fecha? Exacto, justo cuando los europeos andaban desembarcando con cruces, mosquetes y promesas dudosas. Traducción: estos pueblos estaban vivitos y coleando al momento del “contacto”.

Eso revienta el cliché de que los indígenas de la región “ya no estaban” cuando llegaron los colonos. Spoiler: sí estaban. Y no solo estaban, sino que sobrevivieron milenios de cambios climáticos, ecológicos y sociales antes de enfrentarse al terremoto colonial.

⚡Así que la próxima vez que alguien te diga que esta parte del Río de la Plata era un “territorio vacío”, mostrále el dato: 1500 años de ocupación continua. Vacío, lo que se dice vacío… estaba el discurso de quienes escribieron la historia oficial.`,
      sources: [],
      bannerUrl: BANNER_PUBLICITARIO_5,
    },

    // --- Página 6 (Par) ---
    {
      type: 'even',
      imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759057561/sabalo_o_domilgo_f5ln5l.png',
      bannerUrl: BANNER_PUBLICITARIO_6,
    },

    // --- Página 7 (Impar) ---
    {
      type: 'odd',
      id: 'page7',
      headline: "🏺 Arqueología al servicio del futuro",
      subtitle: "cuando el barro paga las cuentas",
      category: "Comunidad",
      backgroundUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759063853/rio_fondo_w5x9ah.png',
      layout: 'hoja-completa',
      content:`El Arroyo del Sauce ya no es solo un sitio arqueológico: es un modelo de desarrollo comunitario. O, dicho en criollo, ahora la prehistoria también entra en el rubro “industrias creativas”.

El proyecto se llama “Industrias milenarias en Juan Lacaze” y lo banca la ANII. La idea es doble:

Hacer ciencia: investigar cómo vivían los pueblos prehispánicos.

Hacer futuro: transformar esos hallazgos en motor turístico, educativo y —por qué no— económico.

En serio: de repente los cazadores-recolectores-horticultores del Sauce se convierten en influencers de la identidad local. Y ojo, que no es chiste: se habla de arqueología experimental, o sea, reproducir las campanas zoomorfas con barro y técnicas originales, para después venderlas como productos culturales premium. En otras palabras: los artesanos de hace 1500 años ahora son proveedores oficiales de la Juan Lacaze S.A. versión siglo XXI.

👉 Y lo lindo es la retórica: se habla de “democratización del conocimiento” y de “poner en valor el patrimonio”. Traducido: que la arqueología salga del paper académico y aterrice en la feria de artesanías, en la escuela local o en la próxima ruta turística.

¿Suena raro? Sí. ¿Es brillante? También. Porque por fin la historia no queda como pieza de museo polvoriento, sino que se usa como palanca de resiliencia y como fuente de identidad viva.

⚡Eso sí, pensemos lo siguiente: ¿qué dirían los antiguos ribereños si supieran que sus campanas zoomorfas terminaron reversionadas como souvenirs con QR para pagar con MercadoPago? Tal vez se reirían. Tal vez nos entenderían mejor de lo que creemos: ellos también supieron hacer del barro una herramienta para sobrevivir.`,
      sources: ["ANII (Agencia Nacional de Investigación e Innovación)"],
      bannerUrl: BANNER_PUBLICITARIO_7,
    },

    // --- Página 8 (Par) ---
    {
      type: 'even',
      imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759057553/azteca_dyltma.png',
      bannerUrl: BANNER_PUBLICITARIO_8,
    },

    // --- Página 9 (Impar) ---
    {
      type: 'odd',
      id: 'page9',
      headline: "🏛️ El legado de una colección",
      subtitle: "cuando el barro encuentra su casa en Juan Lacaze",
      category: "Cultura Local",
      backgroundUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759063852/vasijas_fondo_x8a6uo.png',
      layout: 'hoja-completa',
      content:`Atenti: Juan Lacaze ya tiene su propio Museo Arqueológico Mora. Sí, entre la fábrica cerrada, el fútbol de los domingos y la rambla al río, ahora se suma un templo del pasado que promete convertirse en el nuevo punto de encuentro. Eso sí: abrimos sábados, porque los lunes a viernes la arqueología también necesita descansar.

El corazón del museo es la colección de René Mora, un investigador autodidacta que sin becas ni papers logró juntar más de 27.000 piezas. O sea, mientras otros coleccionaban figuritas del Mundial, él se dedicó a rescatar campanas zoomorfas, vasijas y piedras pulidas. Resultado: la mayor concentración de “animales de barro” conocida en Uruguay. 🦉🐸🐆

Las vitrinas exhiben desde vasijas culinarias hasta esculturas rituales, todo catalogado por el PIAAD (sí, suena a aparato del Pentágono, pero es un programa académico en serio). Lo interesante es que este patrimonio no terminó escondido en un sótano de Montevideo: se quedó en su lugar de origen. Empoderamiento cultural versión Sauce City.

👉 El gesto importa: no es un museo para turistas con guía en inglés y gift shop de 20 dólares. Es un espacio local, para que la comunidad vea su historia sin intermediarios, sin filtro capitalino. El barro que salió del Sauce ahora brilla en vitrinas… pero sigue siendo de la gente.

⚡Y entre nosotros: si las piezas resistieron 1500 años bajo tierra, seguramente aguanten el polvo de vitrina y la mirada curiosa de los gurises en excursión. Lo importante es que ahora, en un rincón de Colonia, el pasado no está enterrado: abre los sábados de tarde.`,
      sources: ["Museo Arqueológico Mora"],
      bannerUrl: BANNER_PUBLICITARIO_9,
    },

    // --- Página 10 (Par) ---
    {
      type: 'even',
      imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759060658/pexels-annie-bailey-368305123-14456003_jrbvgs.jpg',
      bannerUrl: BANNER_PUBLICITARIO_10,
    },

     // --- Página 11 (Impar) ---
    {
      type: 'odd',
      id: 'page11',
      headline: "🦣 Aclarando confusione",
      subtitle: "ni todos los arroyos son iguales, ni todos los huesos cuentan la misma historia",
      category: "Cultura Local",
      backgroundUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759063853/rio_fondo_w5x9ah.png',
      layout: 'hoja-completa',
      content:`En Uruguay tenemos dos estrellas prehistóricas con nombres parecidos pero guiones muy distintos: Arroyo del Sauce (Colonia) y Arroyo del Vizcaíno (Canelones). Y aunque suenen a spin-offs de la misma serie, en realidad son dos temporadas separadas por decenas de miles de años.

👉 El Vizcaíno es Jurassic Park versión criolla: restos de perezosos gigantes, gliptodontes y tigres dientes de sable de hace 30.000 años. Bestias del Pleistoceno que, según algunas hipótesis polémicas, podrían haber tenido sus roces con los primeros humanos. ¿Marcas de corte en huesos? ¿O simples arañazos de un gliptodonte con mal humor? El debate sigue abierto, como siempre en ciencia.

En cambio, el Sauce juega otra liga: nada de bichos XXL, sino alfarería fina, campanas zoomorfas, herramientas de piedra y sociedades ribereñas que vivieron entre hace 1.500 y 300 años. Menos rugidos prehistóricos y más vida comunitaria, con rituales, ollas y símbolos.

⚡La diferencia es clara:

Vizcaíno = el capítulo épico de “humanos vs megafauna”.

Sauce = la saga intimista de comunidades que aprendieron a domesticar el paisaje ribereño.

¿Y qué nos deja todo esto? Que Uruguay, más allá de su tamaño, guarda un registro prehistórico variado como serie de Netflix: desde el “Mundo de gigantes” hasta la “Cultura del barro”.

Lo importante es no confundir peras con manzanas (o gliptodontes con campanas). Cada sitio cuenta su propia historia. Y, de paso, confirma algo: este país, que a veces parece vivir en el margen del mapa, tiene capas de tiempo tan profundas como cualquier imperio olvidado.`,
      sources: [],
      bannerUrl: BANNER_PUBLICITARIO_1,
    },

    // --- Página 12 (Par) ---
    {
      type: 'even',
      imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759057554/pipio_p6ihdb.png',
      bannerUrl: BANNER_PUBLICITARIO_3,
    },
    
    // --- Página 13 (Impar) ---
    {
      type: 'odd',
      id: 'page13',
      headline: "Descubriendo las Capas del Pasado de Juan Lacaze",
      subtitle: "Más allá de la fábrica",
      category: "Reflexión",
      backgroundUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759060767/pexels-fatima-acunman-759286837-30482053_t2ywhc.jpg',
      layout: 'columna-izquierda-centrada',
      content:`Cuando pensamos en Juan Lacaze, lo primero que nos viene a la cabeza es la ciudad obrera: los molinos, la textil Campomar, los barcos entrando y saliendo, el ruido de las fábricas, la mística del trabajo en comunidad. Esa historia industrial está tatuada en la identidad del pueblo: el sacrificio, el sudor, la organización y la resistencia.

Pero ojo, porque debajo de ese relato moderno late otra historia, muchísimo más antigua, que no se escucha en el silbato de las fábricas sino en la arena de las playas y en la toponimia que, sin quererlo, nos guiña el ojo: Playa Charrúa, nombres propuestos para calles como Guyunusa o Vaimaca Pirú. Esos rastros silenciosos cuentan que la memoria indígena no estaba dormida, solo esperaba ser reconocida.

Y ahí está el corazón de este informe: mostrar cómo Juan Lacaze no es solo un capítulo industrial en la historia del Uruguay, sino un territorio que guarda capas y capas de tiempo. Capas que van desde los pueblos originarios, con sus rituales y herramientas, hasta las luchas de los obreros modernos. El pasado, en este lugar, no es una foto fija: es una trama viva que conecta la ciudad con un legado que trasciende generaciones.`,
      sources: [],
      bannerUrl: BANNER_PUBLICITARIO_2,
    },

    // --- Página 14 (Par) ---
    {
      type: 'even',
      imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1758419894/articulo_6_xadquy.jpg',
      bannerUrl: BANNER_PUBLICITARIO_4,
    },

    // --- Página 15 (Impar) ---
    {
      type: 'odd',
      id: 'page15',
      headline: "Un Legado de Artesanía Ancestral y Espíritu Comunitario",
      subtitle: "Más allá de la fábrica 2",
      category: "Cultura",
      backgroundUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759063852/vasijas_fondo_x8a6uo.png',
      layout: 'hoja-completa',
      content:`El Arroyo Sauce y Punta Artilleros no son solo paisajes ribereños: son territorios que guardan memorias. Ahí, entre agua y arena, quedaron las huellas de quienes habitaron la zona mucho antes de que un barco europeo avistara estas costas.

De su vida cotidiana nos quedan piezas de piedra pulida, herramientas de talla, fragmentos de cerámica cocida. Pero no se trata de simples objetos: son relatos mudos de manos que sabían transformar la materia.

La alfarería, por ejemplo, revela un pulso creativo sorprendente. Ollas, cuencos, platos: algunos ennegrecidos por el fuego de la cocina, otros intactos, pintados y ceremoniales. Entre los más singulares están las “campanas zoomorfas”: esculturas ahuecadas con forma de aves o felinos. No eran adornos casuales, sino símbolos de un vínculo íntimo con la naturaleza. El artista de aquel entonces no copiaba: interpretaba, comprendía, se conectaba.

Cuando los arqueólogos actuales hablan de “procesos tecnológicos”, lo que realmente desentrañan es un lenguaje ancestral: cómo trabajaban, cómo pensaban y cómo celebraban la vida estos pueblos del litoral. Cada fragmento es una página de un libro que todavía estamos aprendiendo a leer.

El Espíritu Pionero de René Mora: El Corazón de la Relación
Pero esta historia no la descubrimos gracias a un hallazgo fortuito. La semilla la sembró un vecino, René Mora, que supo mirar donde otros pasaban de largo. Autodidacta, obsesivo, paciente, coleccionó durante décadas más de 27 mil piezas. Dibujó, clasificó, cuidó. Su trabajo fue un puente entre las comunidades ancestrales y el presente.

René no fue un académico en un laboratorio: fue un lacazino con la sensibilidad de escuchar al suelo. Gracias a él, lo que pudo quedar disperso en la tierra hoy es relato, memoria y ciencia. Su legado demuestra que el patrimonio no siempre lo rescatan las instituciones; a veces lo rescata la terquedad apasionada de un solo individuo.

El Museo Arqueológico Mora: De Colección Privada a Patrimonio Público

Hoy, esa terquedad tiene casa: el Museo Arqueológico Mora, instalado en la Biblioteca José Enrique Rodó. Nació de la donación de la colección de René y del esfuerzo conjunto de instituciones nacionales y locales.

Pero más que un museo, es un punto de encuentro. Un espacio donde los objetos no son reliquias muertas, sino disparadores de preguntas. Donde los escolares descubren que en su ciudad hubo ceramistas milenarios, y donde investigadores continúan trabajando en laboratorio para dar nuevas respuestas.

El paso de colección privada a patrimonio público no es un trámite burocrático: es un gesto simbólico. Significa que esas piezas ya no pertenecen a un hombre, sino a todos. Que el legado se apropia socialmente, se comparte y se proyecta hacia el futuro.

En cada visita guiada, en cada niño que observa una campana zoomorfa, en cada investigador que revisa un dibujo de René, se confirma lo esencial: el pasado de Juan Lacaze no está encerrado en vitrinas, está latiendo en la memoria colectiva.`,
      sources: [],
      bannerUrl: BANNER_PUBLICITARIO_2,
    },

    // --- Página 16 (Par) ---
    {
      type: 'even',
      imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759060187/pexels-cristian-rojas-8066084_c3dyyp.jpg',
      bannerUrl: BANNER_PUBLICITARIO_4,
    },

    // --- Página 17 (Impar) ---
    {
      type: 'odd',
      id: 'page17',
      headline: "El Patrimonio en Perspectiva: ¿Qué Hacemos con el Barro?",
      subtitle: "Una reflexión final",
      category: "Opinión",
      backgroundUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759063853/rio_fondo_w5x9ah.png',
      layout: 'hoja-completa',
      content:`Cuando miramos alrededor, el espejo es incómodo.
En México, la cultura maya y azteca no solo se estudia: se convirtió en marca país. No hay turista que no se saque una foto en Chichén Itzá o que no regrese con un calendario mexica de recuerdo. En Perú, Machu Picchu es la postal obligada, pero también un motor económico y educativo: el orgullo inca atraviesa la música, la escuela y hasta la gastronomía. En Chile y Argentina, los pueblos originarios han tenido sus procesos de revalorización —a veces con tensiones políticas, otras con celebraciones oficiales— pero el tema está en la agenda nacional.

Y nosotros… nosotros tenemos las campanas zoomorfas y la colección de René Mora, que son patrimonio genuino, poderoso, único… y al mismo tiempo invisibles para la mayoría. Nos desvivimos por colectivos identitarios de moda, banderas de colores y discursos de ocasión (todos valiosos, ojo), pero seguimos sin preguntarnos qué significa que, bajo nuestros pies, hubo comunidades que modelaban el barro con una sensibilidad que ni soñamos enseñar en la escuela.

Porque ahí está la otra pregunta: ¿qué hacemos con esto en la educación local? ¿Los gurises de Juan Lacaze estudian a fondo la alfarería del Sauce, o apenas son llevados “a los tirones” a una visita guiada que se olvida al lunes siguiente? ¿La maestra puede contar que, antes de Campomar y el Río de la Plata industrial, acá había ceramistas que representaban felinos en piezas rituales? ¿O seguimos mirando el pasado como si fuera un decorado folclórico, simpático, pero irrelevante?

La ironía es brutal: celebramos identidades globalizadas y causas importadas mientras ignoramos el barro propio, ese que cuenta de dónde venimos y que podría ayudarnos a imaginar adónde vamos.

El Museo Mora es un faro, sí. Pero un faro no ilumina nada si la gente no levanta la vista.

Quizás el verdadero desafío de Juan Lacaze no sea solo conservar las piezas, sino aprender a habitar el barro. Reconocer que nuestra herencia no es solo industrial ni obrera, sino también ancestral, artesanal y simbólica. Y que en esa mezcla —obreros textiles, ceramistas milenarios, investigadores autodidactas— se juega la posibilidad de construir una identidad más completa y menos olvidadiza.

Porque, al final, de eso se trata el patrimonio: de no olvidar que lo que somos hoy también está hecho con arcilla de hace mil años.
Y si no lo entendemos, seguiremos confundiendo moda con memoria, y pasado con souvenir.`,
      sources: [],
      bannerUrl: BANNER_PUBLICITARIO_2,
    },

    // --- Página 18 (Par) ---
    {
      type: 'even',
      imageUrl: "https://res.cloudinary.com/ddmj6zevz/image/upload/v1759060059/pexels-franklin-santillan-a-551795305-17029372_faqgsq.jpg",
      bannerUrl: BANNER_PUBLICITARIO_5,
    }
  ]
};