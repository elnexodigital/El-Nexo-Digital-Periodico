
import type { WeeklyContent } from '../types.ts';

export const WEEKLY_EDITION_CONTENT: WeeklyContent = {
  cover: {
    headline: "La Paradoja de la Privacidad",
    subtitle: "Cómo cedimos nuestro silencio a cambio de algoritmos que nos conocen mejor que nosotros mismos.",
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
  },

  pages: [
    {
      type: 'odd',
      id: 'investigacion_1',
      headline: "El Fin de la Intimidad Digital",
      subtitle: "Un recorrido por las sombras del rastro que dejamos al scrollear.",
      category: "Sociedad & Tecnología",
      backgroundUrl: '',
      layout: 'hoja-completa',
      content: "Vivimos en una era donde el silencio se ha convertido en una moneda de cambio. Cada clic, cada pausa frente a una imagen, alimenta una maquinaria invisible que procesa nuestros deseos antes de que los nombremos.\n\nLa pregunta no es si nos vigilan, sino qué parte de nosotros estamos dispuestos a sacrificar por la conveniencia de una interfaz fluida. El Nexo Digital ha investigado las granjas de datos donde nuestra identidad se desglosa en bits comercializables.\n\nDesde las redes sociales hasta los asistentes de voz, el rastro es imborrable. ¿Podemos recuperar nuestro espacio analógico o estamos condenados a ser simples mamíferos digitales en una jaula de cristal?",
      sources: ["Archivo de Ciberseguridad", "Entrevistas a ex-ingenieros de Meta"],
      bannerUrl: '',
    },
    {
      type: 'even',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
      bannerUrl: '',
      headline: "Circuitos de la Memoria",
      objectPosition: 'center'
    },
    {
      type: 'odd',
      id: 'investigacion_2',
      headline: "El Costo de 'Aceptar Términos'",
      subtitle: "Lo que no leemos pero firmamos con el pulgar.",
      category: "Opinión",
      backgroundUrl: '',
      layout: 'columna-izquierda',
      content: "La gran estafa del siglo XXI no ocurrió en un banco, sino en el botón de 'Aceptar'. Nadie lee las tres mil palabras de jerga legal que otorgan derechos de imagen, voz y pensamiento a corporaciones transoceánicas.\n\nEs un pacto fáustico moderno. Cedemos nuestra biometría por un filtro de perrito. Cedemos nuestra ubicación por un mapa que nos dice dónde estamos, aunque hayamos perdido el rumbo existencial.\n\nEn este artículo, desgranamos las cláusulas más oscuras de las aplicaciones que usas a diario. Prepárate para querer apagar el router.",
      sources: ["Informe Legal El Nexo", "Derecho Digital Uruguay"],
      bannerUrl: '',
    }
  ]
};
