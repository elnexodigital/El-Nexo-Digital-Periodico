import type { WeeklyContent } from '~/types.ts';

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
    headline: "la coartada de Casandra",
    subtitle: "O cómo Occidente se Puso el Velo Feminista para Vender su Guerra Sagrada contra el Islam",
    imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759416770/tapa%20arroyo%20del%20sauce.png?v=240905',
  },

  // --- PÁGINAS DE LA REVISTA ---
  pages: [
    // --- Página 1 (Impar) ---
    {
      type: 'odd',
      id: 'page1',
      headline: "📢 Capítulo I: Feminismo de Exportación y la Mujer como Excusa",
      subtitle: "El combate como lenguaje. ",
      category: "intro",
      backgroundUrl: '',
      layout: 'hoja-completa',
      content:  `¿Querés saber cómo se arma una guerra con perfume de sororidad? Fácil: se agarra a la mujer musulmana, se la convierte en símbolo de opresión, y se la usa como excusa para bombardear países enteros. Todo en nombre de la libertad, claro. Porque nada dice “emancipación” como un dron sobre tu casa.
Occidente se especializa en empaquetar moralidad. Exporta feminismo como si fuera shampoo anticaspa: con promesas de limpieza, pero sin entender el cuero cabelludo. La mujer musulmana no es sujeto político, es objeto de compasión. No importa si militan, escriben, protestan o gobiernan—si usan velo, ya están en la lista de “salvables”.
Y los medios, cómplices de esta narrativa, repiten el guion como loros bien entrenados. Cada burka es una amenaza, cada mezquita un semillero de radicales, cada comunidad musulmana un barrio a vigilar. ¿La estrategia? La sinécdoque: un terrorista representa a mil millones. Así se justifica la guerra cultural antes que la militar.
Este feminismo de misiles no busca liberar, busca dominar. Y lo hace con una sonrisa, una campaña de marketing y una columnista blanca que nunca pisó Kabul pero opina como si viviera ahí.`,
      sources: [],
      bannerUrl: BANNER_PUBLICITARIO_1,
    },

    // --- Página 2 (Par) ---
    {
      type: 'even',
      imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759434279/pexels-hamidoffstudio-19298248_z8ed9y.jpg?v=240905',
      bannerUrl: BANNER_PUBLICITARIO_2,
    },

    // --- Página 3 (Impar) ---
    {
      type: 'odd',
      id: 'page3',
      headline: "🧨 Capítulo II: La Mujer como Campo de Batalla",
      category: "Realidad",
      backgroundUrl: '',
      layout: 'hoja-completa',
      content: `¿Querés saber dónde se libran las guerras modernas? En el cuerpo de las mujeres. Pero no en el sentido poético: literal. La mujer musulmana se convirtió en el campo de batalla simbólico donde se cruzan misiles, discursos y moralidades prefabricadas.
Occidente la mira como quien observa una vitrina rota: con lástima, con superioridad, con ganas de “arreglarla”. Pero no le pregunta nada. Porque si hablara, complicaría la narrativa. Si dijera “el velo es mi elección”, se cae la campaña. Si dijera “no quiero que me liberen con bombas”, se arruina el guion.
Y los medios, como siempre, hacen de megáfono. Titulares que gritan “opresión”, imágenes que seleccionan la burka más oscura, la mirada más triste, el contexto más desolador. ¿La estrategia? El encuadre selectivo. Mostrar una parte como si fuera el todo. Como si todas las mujeres musulmanas fueran prisioneras esperando a ser rescatadas por soldados con bandera de la OTAN.
Pero ¿qué pasa cuando esas mujeres escriben, militan, gobiernan, se organizan? Silencio. Porque no encajan en el relato. Porque no son útiles para justificar la intervención. Porque no son víctimas, son protagonistas. Y eso incomoda.
📌 Dato que suma: En 2022, la ONU publicó un informe sobre mujeres afganas que, pese al régimen talibán, siguen organizándose en redes clandestinas de educación, salud y resistencia. ¿Lo viste en los medios? No. Porque no vende. Porque no justifica la ocupación.
📌 Dato que arde: En Francia, el Estado prohíbe el uso del hiyab en escuelas públicas en nombre de la “laicidad”. ¿Libertad? ¿O imposición disfrazada de neutralidad? ¿Quién decide qué es emancipador y qué es opresivo?`,
      sources: [],
      bannerUrl: BANNER_PUBLICITARIO_3,
    },
    
    // --- Página 4 (Par) ---
    {
      type: 'even',
      imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759062729/gracias_carla_hh4wbs.png?v=240905',
      bannerUrl: '', 
    },
    
    // --- Página 5 (Impar) ---
    {
      type: 'odd',
      id: 'page5',
      headline: "🕵️ Capítulo III: Orientalismo 2.0 — El Otro como Espectáculo",
      subtitle: "Miro las muertes mientras como Oreo",
      category: "Espejo",
      backgroundUrl: '',
      layout: 'media-hoja',
      content: `Edward Said lo explicó hace décadas: el Orientalismo es una lente distorsionada con la que Occidente mira al mundo árabe. Pero hoy esa lente tiene filtros de Instagram, titulares clickbait y música de fondo dramática. El “otro” ya no es solo exótico, ahora es peligroso, retrógrado, y convenientemente útil para justificar cualquier intervención.
Los medios no informan: escenifican. Cada nota sobre el Islam parece escrita por un guionista de Hollywood con trauma post-11S. El árabe es el villano, la mujer musulmana es la víctima, y el soldado occidental es el héroe. ¿La realidad? No importa. Lo que importa es el relato.
📺 Ejemplo que arde: En 2021, Fox News tituló “Sharia Law invades American towns” sin evidencia, sin contexto, sin vergüenza. ¿Qué vendía? Miedo. ¿Qué justificaba? Vigilancia, racismo, islamofobia.
📚 Dato que suma: En estudios de medios británicos, se encontró que el 60% de las noticias sobre musulmanes están asociadas a violencia o conflicto. ¿Y las historias de cultura, arte, ciencia, activismo? Silencio. Porque no encajan en el molde.
Este Orientalismo 2.0 no necesita libros, necesita memes. Se viraliza, se comparte, se instala. Y así, el Islam se convierte en una caricatura útil para justificar guerras, leyes represivas, y discursos de odio disfrazados de preocupación.`,
      sources: [],
      bannerUrl: BANNER_PUBLICITARIO_5,
    },

    // --- Página 6 (Par) ---
    {
      type: 'even',
      imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759057561/sabalo_o_domilgo_f5ln5l.png?v=240905',
      bannerUrl: BANNER_PUBLICITARIO_6,
    },

    // --- Página 7 (Impar) ---
    {
      type: 'odd',
      id: 'page7',
      headline: "🎙️ Capítulo IV: Las Voces que No Caben en el Guion",
      subtitle: "Cuando no vende no es real",
      category: "Incómodo",
      backgroundUrl: '',
      layout: 'hoja-completa',
      content:`¿Y si la mujer musulmana no necesita que la salven? ¿Y si ya se está salvando sola, con redes, con palabras, con lucha? ¿Y si el problema no es el Islam, sino el micrófono que nunca le prestan?
Las mujeres musulmanas no son figurantes. Son guionistas, directoras, protagonistas. Pero claro, eso no vende. Porque si hablan, se cae el relato. Si escriben, incomodan. Si militan, desarman el estereotipo. Y entonces, los medios hacen lo que mejor saben hacer: ignorarlas.
🎤 Ejemplo que incomoda: Mona Eltahawy, periodista egipcia, escribió “Headscarves and Hymens”, un libro que denuncia tanto el patriarcado islámico como el occidental. ¿La invitan a los paneles de CNN? No. Porque no encaja en el molde de víctima silenciosa ni en el de feminista blanca.
🎬 Ejemplo que rompe moldes: Haifaa al-Mansour, primera cineasta saudí, filmó “Wadjda”, una historia sobre una niña que quiere andar en bicicleta. ¿Revolución? Sí. ¿Con bombas? No. Con arte, con sutileza, con resistencia desde adentro.
📚 Ejemplo que arde: Leila Ahmed, académica egipcia, escribió “Women and Gender in Islam”, desmontando siglos de prejuicios. ¿Está en los titulares? No. Porque el conocimiento no genera clics, la caricatura sí.
Estas voces no piden permiso. No esperan que Occidente las libere. Ya están hablando, escribiendo, filmando, organizando. Pero para escucharlas hay que apagar el ruido de los drones, los titulares sensacionalistas y los discursos con perfume de superioridad moral.`,
      sources: [],
      bannerUrl: BANNER_PUBLICITARIO_7,
    },

    // --- Página 8 (Par) ---
    {
      type: 'even', 
      headline: "Mona Eltahawy",
      imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759057553/azteca_dyltma.png?v=240905',
      bannerUrl: BANNER_PUBLICITARIO_8,
    },

    // --- Página 9 (Impar) ---
    {
      type: 'odd',
      id: 'page9',
      headline: "🔥 Conclusión: ¿Quién Tiene el Micrófono?",
      subtitle: "Como si importara",
      category: "Opinión",
      backgroundUrl: '',
      layout: 'hoja-completa',
      content:`La guerra ya no se libra solo con balas. Se libra con narrativas. Y en esa guerra, la mujer musulmana es usada como excusa, como símbolo, como pantalla. Pero no como voz.
Occidente se arroga el derecho de definir qué es libertad, qué es opresión, qué es feminismo. Y lo hace desde redacciones que nunca pisaron un zoco, desde parlamentos que legislan sobre cuerpos ajenos, desde ONGs que reparten moralidad como si fuera pan bendito.
Pero las mujeres musulmanas no están esperando que las salven. Están escribiendo, filmando, marchando, resistiendo. Están construyendo feminismos propios, desde sus contextos, desde sus lenguas, desde sus luchas. Y eso incomoda. Porque no encajan en el molde de víctima ni en el de heroína occidentalizada.
Entonces, ¿quién tiene el micrófono? ¿Quién decide qué se muestra y qué se oculta? ¿Quién arma el relato y quién lo padece?
La respuesta es incómoda. Pero necesaria. Porque si queremos hablar de género, cultura y medios, tenemos que empezar por escuchar. No traducir. No interpretar. Escuchar. Y después, pasar el micrófono. Aunque eso signifique perder el control del guion.`,
      sources: [],
      bannerUrl: BANNER_PUBLICITARIO_9,
    },

    // --- Página 10 (Par) ---
    {
      type: 'even',
      imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759060658/pexels-annie-bailey-368305123-14456003_jrbvgs.jpg?v=240905',
      bannerUrl: BANNER_PUBLICITARIO_10,
    },

     // --- Página 11 (Impar) ---
    {
      type: 'odd',
      id: 'page11',
      headline: "🎯 Ideología de Género: ¿Herramienta de Liberación o Coartada Imperial?",
      subtitle: "",
      category: "Manipulación",
      backgroundUrl: '',
      layout: 'hoja-completa',
      content:`Cuando el feminismo se convierte en excusa para invadir, algo huele a pólvora. La ideología de género, en manos de ciertos gobiernos y medios, deja de ser herramienta de emancipación y se transforma en bisturí geopolítico. Se usa para cortar culturas ajenas, para abrir grietas en sociedades que no responden al molde occidental, y para justificar guerras con perfume de sororidad.
¿Querés apoyo popular para bombardear un país? Mostrá una mujer con burka, decí que está oprimida, y prometé liberarla. No importa si ella no pidió ayuda. No importa si ya está luchando desde adentro. Lo importante es que el relato funcione. Que el feminismo se convierta en marketing bélico. Que la ideología de género se use como narrativa emocional para generar consenso.
📌 Ejemplo que incomoda: En la invasión a Afganistán, se usó el argumento de “liberar a las mujeres” como parte del discurso oficial. ¿Resultado? Bombas, ocupación, y una estructura patriarcal aún más radicalizada.
📌 Ejemplo que arde: En campañas mediáticas europeas, se asocia el uso del velo con sumisión, ignorando que muchas mujeres lo eligen como acto político, espiritual o identitario. ¿Quién decide qué es opresión y qué es elección?
El documento que analizamos lo dice sin rodeos: los discursos de género no son neutros. Pueden ser emancipadores, sí. Pero también pueden ser manipulados, instrumentalizados, convertidos en armas narrativas. Y cuando eso pasa, el feminismo deja de liberar y empieza a colonizar.`,
      sources: [],
      bannerUrl: BANNER_PUBLICITARIO_1,
    },

    // --- Página 12 (Par) ---
    {
      type: 'even',
      imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759057554/pipio_p6ihdb.png?v=240905',
      bannerUrl: BANNER_PUBLICITARIO_3,
    },
    
    // --- Página 13 (Impar) ---
    {
      type: 'odd',
      id: 'page13',
      headline: "🧠 Lo que completa el informe: Datos, autores y casos que lo hacen irrefutable",
      subtitle: "",
      category: "Informarce",
      backgroundUrl: '',
      layout: 'columna-izquierda-centrada',
      content:`🧨 1. Feminismo como coartada imperial
Afganistán (2001): La invasión se vendió como “liberación de las mujeres”. Laura Bush lo dijo en cadena nacional. ¿Resultado? 20 años de ocupación, retrocesos en derechos, y mujeres afganas usadas como excusa.
Irak (2003): Se usó el argumento de “derechos humanos” para justificar la guerra. Pero los derechos de las mujeres fueron ignorados en la reconstrucción. El feminismo fue decorado, no aplicado.
Siria: En medios occidentales, se mostraban mujeres kurdas armadas como íconos feministas, mientras se ignoraban las voces que denunciaban la instrumentalización de su lucha.
📚 2. Autores que lo explican sin anestesia
Cynthia Enloe: En Bananas, Beaches and Bases, muestra cómo las mujeres son usadas como símbolos en política internacional. No como sujetos, sino como decorado.
Edward Said: En Orientalismo, explica cómo Occidente construye al “otro” como exótico, atrasado y oprimido, para justificar su intervención. El feminismo occidental entra en esa lógica5.
Leila Ahmed: En Women and Gender in Islam, desmonta la idea de que el Islam es intrínsecamente opresivo. Muestra cómo el discurso feminista occidental ignora las voces musulmanas.
🧬 3. Ideología de género como narrativa emocional
Resolución 1325 de la ONU: Introduce el enfoque de género en conflictos armados. Pero también se ha usado para legitimar intervenciones militares con retórica feminista.
Narrativas mediáticas: Se repite el patrón: mujer con velo = víctima. Mujer sin velo = liberada. Pero ¿quién decide eso? ¿La mujer o el editor del diario?
🧕 4. Mujeres musulmanas que rompen el molde
Tawakkol Karman (Yemen): Nobel de la Paz, activista por derechos humanos. No encaja en el molde de víctima, por eso los medios la ignoran.
Haifaa al-Mansour (Arabia Saudita): Cineasta que filmó Wadjda, desafiando normas desde adentro.
Amina Wadud: Teóloga que lideró una oración mixta en una mezquita. ¿Revolución? Sí. ¿Con drones? No. Con fe y coraje.`,
      sources: [],
      bannerUrl: BANNER_PUBLICITARIO_2,
    },

    // --- Página 14 (Par) ---
    {
      type: 'even',
      imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759434389/Cynthia_Enloe_ia8pmo.jpg?v=240905',
      bannerUrl: BANNER_PUBLICITARIO_4,
    },

    // --- Página 15 (Impar) ---
    {
      type: 'odd',
      id: 'page15',
      headline: "La Marea Transformadora:",
      subtitle: "Balance de Resultados y Desafíos Estructurales de los Movimientos Feministas y de Género en América Latina (2015-2024)",
      category: "información",
      backgroundUrl: '',
      layout: 'hoja-completa',
      content:`Definición de la "Cuarta Ola" y el Contexto Regional
El activismo feminista y de género en América Latina ha experimentado una transformación radical en la última década, marcada por la masificación, la transnacionalización y la irrupción de nuevas agendas. La historiografía regional reconoce tradicionalmente una Primera Ola, centrada en el sufragio, y una Segunda Ola, identificada con el "renacer" del feminismo en los años setenta. La etapa actual (a menudo denominada Cuarta Ola) se caracteriza por un repertorio de acción que combina estratégicamente la movilización masiva en las calles con la incidencia digital y la litigación constitucional. El periodo posterior a 2015, impulsado por movimientos como #NiUnaMenos y la Marea Verde, ha establecido un nuevo estándar para la protesta social.   
En contraste con las prioridades iniciales de los feminismos del Norte global, las reivindicaciones en América Latina han estado inherentemente ligadas a las problemáticas estructurales de la región: la defensa de las tierras, la lucha contra el racismo institucional, la desigualdad socioeconómica, y la alarmante escalada de la violencia de género y los feminicidios. Por lo tanto, movimientos como #NiUnaMenos o #VivasNosQueremos nacieron de una América Latina exhausta por las violencias, las desigualdades y la opresión sistémica.   

`,
      sources: [],
      bannerUrl: BANNER_PUBLICITARIO_2,
    },

    // --- Página 16 (Par) ---
    {
      type: 'even',
      imageUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1759060187/pexels-cristian-rojas-8066084_c3dyyp.jpg?v=240905',
      bannerUrl: BANNER_PUBLICITARIO_4,
    },

    // --- Página 17 (Impar) ---
    {
      type: 'odd',
      id: 'page17',
      headline: "De lo Digital a lo Físico: El Impacto de #MeToo en la Región",
      subtitle: "La Adaptación Regional del #MeToo",
      category: "datos",
      backgroundUrl: '',
      layout: 'hoja-completa',
      content:`La campaña global de #MeToo, originada en la industria de Hollywood en 2017, se extendió y diversificó en América Latina, adaptando sus repertorios de acción colectiva. Esta movilización se caracterizó por ser un activismo híbrido, utilizando Twitter y otras plataformas digitales para detonar denuncias, las cuales posteriormente se tradujeron en acciones en el espacio físico. Un ejemplo notable es México, donde el activismo    

online se materializó en los "tendederos de denuncias" en centros educativos y, en algunos casos, en la ocupación física de escuelas y universidades.   

Este activismo digital se distinguió por la distribución horizontal de las voces testimoniales y la ausencia de liderazgos centralizados, utilizando el hashtag de forma táctica para generar impacto en los medios e instituciones. La intensidad del uso de redes sociales en la región, donde los usuarios dedican en promedio 44 horas al mes a las plataformas, proporcionó el terreno fértil para esta amplificación.   

III.B. Resultados y Límites del Escrache y la Denuncia
El efecto inmediato del #MeToo se reflejó en cambios institucionales, principalmente en la implementación de protocolos contra el acoso y la violencia sexual en universidades y lugares de trabajo. Este fenómeno demuestra que la movilización generacional puede impulsar cambios endógenos dentro de los movimientos sociales, independientemente de los factores económicos externos.   

Sin embargo, el alcance del #MeToo enfrentó barreras significativas en el contexto latinoamericano. El movimiento tuvo dificultades para ganar impulso en sectores vulnerables de la población. Muchas mujeres, especialmente en ciertas áreas de América Latina, siguen sintiendo temor a denunciar a sus abusadores debido a las cuestiones culturales y la persistencia de la desigualdad. La vulnerabilidad económica y el miedo a represalias son factores que impiden la universalización del derecho a la denuncia. Además, el escrache y la denuncia    

online generaron una intensa "disputa de sentido" en la prensa iberoamericana, donde los discursos en competencia definieron la legitimidad de estos posicionamientos a partir de binarios de clase, raza y posición moral. Esto muestra que la digitalización de la denuncia es solo el primer paso en la confrontación directa ante la injusticia, mas no garantiza la justicia estructural.   

`,
      sources: [],
      bannerUrl: BANNER_PUBLICITARIO_2,
    },

    // --- Página 18 (Par) ---
    {
      type: 'even',
      imageUrl: "https://res.cloudinary.com/ddmj6zevz/image/upload/v1759419747/me_too_mbt7g8.jpg?v=240905",
      bannerUrl: BANNER_PUBLICITARIO_5,
      objectPosition: 'left center',
    }
  ]
};