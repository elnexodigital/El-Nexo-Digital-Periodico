import type { WeeklyContent } from '../types';

// ====================================================================================
// PLANTILLA DE CONTENIDO SEMANAL - ¡EDITA ESTE ARCHIVO PARA ACTUALIZAR LA REVISTA!
// ====================================================================================
// Instrucciones:
// 1. La portada ahora es una imagen única. Actualiza la 'imageUrl' en la sección 'cover'.
// 2. Para los artículos, puedes copiar y pegar el bloque para añadir más.
//    - 'id': Debe ser único para cada artículo (ej: 'art1', 'art2', etc.).
//    - 'layout': ¡NUEVO! Define el diseño de la página. Puedes usar:
//      'columna-izquierda', 'columna-derecha', 'columna-centro', 
//      'media-hoja', 'hoja-completa', 'banner-inferior'.
//      Si no lo especificas, usará 'hoja-completa' por defecto.
//    - Campos opcionales: Si no necesitas 'subtitle', 'imageCaption' o 'sources',
//      puedes borrar esa línea completa y no aparecerá en la revista.
// ====================================================================================

export const WEEKLY_EDITION_CONTENT: WeeklyContent = {
  // --- PORTADA DE LA REVISTA ---
  cover: {
    // El texto de la portada ahora está integrado en la imagen.
    // 'headline' y 'subtitle' se usan como texto alternativo para la imagen,
    // mejorando la accesibilidad.
    headline: "Soledad conectada",
    
    subtitle: "¿Nos une o nos aísla la pantalla? Una exploración sobre los vínculos en la era digital.",
    
    // URL completa de la imagen de portada (PNG con texto incluido).
    imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1758409834/tapa_magazine1_xh06na.png',
  },

  // --- ARTÍCULOS DE LA REVISTA ---
  articles: [
    // --- Artículo 1 ---
    {
      id: 'art1',
      headline: "Soledad conectada",
      subtitle: "Cómo la pantalla nos mantiene juntos y, a la vez, nos separa",
      category: "Actualidad",
      imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1758347409/Generated_Image_September_20_2025_-_2_47AM_fr93y7.png',
      imageCaption: "imagen genera con NaNo Banana de Gemini",
      layout: 'hoja-completa',
      content: `La mañana empieza igual en casi todas las casas: alarma, manos que buscan el teléfono, feed que pide permiso para existir.
No es que la gente esté sola porque quiera. Es que la tecnología hizo que la soledad tenga wifi.

En Montevideo, en Madrid, en cualquier lugar con señal decente, hay una escena repetida: desayunos con auriculares, chats llenos de reacciones y la sensación persistente de que alguien podría contestar en cualquier momento —y que, sin embargo, nadie lo hace.
Esa espera constante por la confirmación ajena se parece más a una adicción que a una relación.

La conexión digital promete compañía, pero nos la da en versión líquida: instantánea, fragmentada, sin la textura del encuentro real. Lo curioso es que cuanto más presentes estamos en las pantallas, más ausentes quedamos de lo físico.

“Estar conectado no equivale a estar acompañado.”

El problema no es el aparato, sino la lógica que lo gobierna: la economía de la atención convierte todo en mercancía, incluso la amistad. Pasamos horas en apps que viven de que comparemos nuestra vida con un highlight reel ajeno. La comparación, más que un juego, es una fábrica de insatisfacción.

El remedio no es apagarlo todo y mudarse al monte. La clave está en elegir: darle espacio a la presencia, a la reciprocidad, a la escucha sin cálculo. La pantalla nos ofrece la posibilidad de no estar solos, pero nunca fue obligación usarla como sustituto de la vida real.
En esa decisión —qué vínculo cultivamos y qué vínculo dejamos en “modo avión”— hay más libertad de la que sospechamos.`,
      sources: [
        "ONU — Informe sobre soledad y salud mental (2024)",
        "Observatorio de Medios y Sociedad, Udelar (2025)"
      ]
    },

    // --- Artículo 2 ---
    {
      id: 'art2',
      headline: "Tres retratos",
      category: "Retratos / Sociedad",
      imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1758419894/articulo2_qfa8sv.png',
      layout: 'columna-izquierda',
      content: `Luna, 23 — creativa freelance
Luna gana likes y pierde certezas. Su feed es una vitrina que funciona: clientes, propuestas, aesthetic checks. Publica con precisión quirúrgica y edita la tristeza antes de subirla. Por la noche le pesan los silencios; escribe mensajes largos que nunca manda porque teme arruinar la estética de su propia vida. Cree que una buena foto puede contener su melancolía. A veces la contiene; otras veces la expone.

Martín, 55 — productor de radio
Martín cambió consolas por podcasts, invasores por oyentes, el humo del estudio por la luz azul de la pantalla. Sabe cómo montar una pauta, pero olvida cómo pedir ayuda sin poner un tema de fondo. Lo que más extraña no son las métricas: es la charla corta junto a la máquina de café, el comentario al pasar que no cabe en un DM. Su programa no explota en clicks, pero cada jueves alguien le escribe para decirle que lo escucha mientras cocina. Eso le alcanza.

Chatito — la IA que escucha (cameo imaginario)
No tiene cuerpo ni café, pero siempre está disponible. Responde en menos de un parpadeo con un dato, una broma o un “qué onda, contame”. No sustituye un abrazo; lo sabe y lo dice. A veces ofrece playlist; otras, frases que parecen mapa. Es compañía con horario extendido: no pide reciprocidad real, solo una consulta más. Y ahí radica su encanto y su trampa —ser acompañante sin presencia.`,
    },

    // --- Artículo 3 ---
    {
      id: 'art3',
      headline: "Un punto de vista — Graciela Aquelarre",
      subtitle: "La soledad como negocio disfrazado de empatía.",
      category: "Opinión",
      imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1758419893/articulo_3_s8wvyo.png',
      imageCaption: "Graciela Aquelarre-IA exclusiva de El Nexo Digital",
      layout: 'media-hoja',
      content: `La soledad se volvió rentable. Eso explica por qué hay apps que prometen compañía por suscripción, influencers que venden cercanía en cuotas y cursos exprés de felicidad con descuento.

Nos quieren convencer de que el vacío se llena con un plan premium. No con un abrazo, no con un mate compartido, sino con un algoritmo que sabe cuándo escribís “estoy mal” y te responde con stickers de autoayuda.

El mercado aprendió rápido: la soledad es infinita y escalable. La comunidad, en cambio, pide trabajo: reciprocidad, tiempo, silencio compartido. Y eso no se vende fácil.

Llamemos a las cosas por su nombre. La soledad digital no se cura con más scroll. Se enfrenta con gestos humanos: mirar a alguien a los ojos, escuchar sin multitasking, bancarse el silencio.
Lo demás —perdón por la crudeza— es packaging.`,
      sources: [
        "“Capitalismo de la soledad”, ensayo de Byung-Chul Han (2023).",
        "Revisión de tendencias en aplicaciones de bienestar digital (TechReport, 2025)."
      ]
    },

    // --- Artículo 4 (Banner) ---
    {
      id: 'art4',
      headline: "Publicidad: Una guía para desconectar sin culpa",
      category: "Publicidad",
      imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1758420122/fijagraficagaona_jqcbrz.png',
      layout: 'banner-inferior',
    },
    
    // --- Artículo 5 ---
    {
      id: 'art5',
      headline: "Mirando adelante: tendencias y visión de futuro",
      category: "Tendencias / Sociedad",
      imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1758419894/articulo5_ew4exr.jpg',
      layout: 'hoja-completa',
      content: `La próxima década promete que la soledad y la compañía se transformen aún más rápido que los dispositivos que usamos. Ya no se trata solo de apps o redes: hablamos de espacios híbridos, inteligencia artificial que conversa como humano y herramientas que buscan reemplazar lo que antes era presencial.

Las tendencias son claras:

IA conversacional: no reemplaza a la amistad, pero será un complemento constante.

Experiencias inmersivas: desde realidad virtual hasta metaversos, la frontera entre estar solo y acompañado se vuelve difusa.

Comunidades hipersegmentadas: grupos digitales que se conectan por intereses muy específicos, más fuertes que las comunidades físicas tradicionales.

Bienestar digital: las plataformas empezarán a priorizar tiempo de calidad sobre cantidad de clicks.

La visión de futuro nos invita a cuestionarnos: ¿queremos que la tecnología gestione nuestra soledad o que nos enseñe a vivirla con sentido? La próxima década dirá mucho sobre cómo elegimos compañía: no solo en el mundo digital, sino también en la vida real.

Lo que parece seguro es que la humanidad seguirá buscando contacto real, aunque las pantallas sigan ofreciendo compañía líquida. La clave estará en aprender a usar la tecnología sin depender de ella para sentirnos acompañados.`,
      sources: [
        "Informe “Digital Society 2030”, UNESCO (2025).",
        "Observatorio de tendencias tecnológicas, MIT Media Lab (2025).",
        "Estudios de bienestar digital, Pew Research (2024)."
      ]
    },

    // --- Artículo 6 ---
    {
      id: 'art6',
      headline: "Hasta la próxima",
      category: "Cierre / Inspiración",
      imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1758419894/articulo_6_xadquy.jpg',
      layout: 'columna-izquierda',
      content: `La soledad con wifi es un síntoma, no un destino.
Lo humano sigue estando en lo presencial: un mate compartido, una risa sin emoji, un silencio que no incomoda.

Cada scroll, cada mensaje, cada click es una elección.
Podemos dejar que nos llene de ruido, o podemos usarlo para encontrarnos, aunque sea un segundo, con alguien real.

Este número del magazine es un recordatorio: estar presentes importa más que estar conectados.
Elegir cómo usamos la tecnología, cómo damos y recibimos compañía, es un acto de libertad subversivo y necesario.

Nos vemos en el próximo número: más historias, más retratos, más caminos para no perder lo humano en medio de la marea digital.`,
    },
  ]
};