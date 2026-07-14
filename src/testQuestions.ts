import { Situation } from "./types";

export const BANCO_PRUEBA_25: Situation[] = [
  {
    id: 101,
    municipio: "Mocoa",
    tema: "Senderismo en la Cascada Hornoyaco",
    contexto: "Un turista en Mocoa decide visitar la Cascada Hornoyaco. En el trayecto puede encontrar clima Lluvioso (LL), Nublado (N) o Despejado (D). Se registra el clima observado en dos tramos consecutivos del camino.",
    pregunta: "¿Cuál es el espacio muestral S de los climas en los dos tramos y el suceso E de que el clima esté despejado en al menos uno de los tramos?",
    opciones: [
      "S = {LLLL, LLN, LLD, NLL, NN, ND, DLL, DN, DD}, E = {LLD, ND, DLL, DN, DD}",
      "S = {LL-LL, LL-N, LL-D, N-LL, N-N, N-D, D-LL, D-N, D-D}, E = {LL-D, N-D, D-LL, D-N, D-D}",
      "S = {LL, LN, LD, NL, NN, ND, DL, DN, DD}, E = {LD, ND, DL, DN, DD}",
      "S = {Lluvia, Despejado}, E = {Despejado}"
    ],
    correcta: 2,
    retroalimentacion: "Al registrar el clima en dos tramos con 3 estados posibles cada uno, el espacio muestral S contiene 3² = 9 resultados posibles (LL, LN, LD, NL, NN, ND, DL, DN, DD). El suceso de que esté despejado (D) en al menos un tramo agrupa todos los pares que contienen la letra 'D', es decir: {LD, ND, DL, DN, DD}."
  },
  {
    id: 102,
    municipio: "Orito",
    tema: "Extracción de Aceite de Sacha Inchi",
    contexto: "En una planta procesadora de Orito, se analiza la pureza de dos lotes de aceite de Sacha Inchi. Cada lote puede catalogarse como Extra Virgen (E), Virgen (V) o Corriente (C).",
    pregunta: "¿Cuál es el espacio muestral S de la evaluación de los dos lotes y el suceso E de que al menos un lote sea Extra Virgen (E)?",
    opciones: [
      "S = {EE, EV, EC, VE, VV, VC, CE, CV, CC}, E = {EE, EV, EC, VE, CE}",
      "S = {EE, EV, EC, VE, VV, VC, CE, CV, CC}, E = {EE, VV, CC}",
      "S = {E, V, C}, E = {E}",
      "S = {EE, VV, CC}, E = {EE}"
    ],
    correcta: 0,
    retroalimentacion: "Para dos lotes evaluados en tres categorías, hay 3² = 9 resultados posibles en S. El suceso E de 'al menos un lote Extra Virgen' incluye todas las parejas donde figura al menos una 'E': {EE, EV, EC, VE, CE}."
  },
  {
    id: 103,
    municipio: "Puerto Asís",
    tema: "Transporte de Combustible Alternativo",
    contexto: "En el muelle de Puerto Asís se inspeccionan dos camiones cisterna para verificar si transportan biodiésel. Los resultados posibles para cada camión son Conforme (C) o No Conforme (N).",
    pregunta: "¿Cuál es el espacio muestral S de la inspección y el suceso E de que exactamente un camión sea Conforme?",
    opciones: [
      "S = {CC, CN, NC, NN}, E = {CN, NC}",
      "S = {CC, NN}, E = {CN}",
      "S = {C, N}, E = {C}",
      "S = {CC, CN, NC, NN}, E = {CC, NN}"
    ],
    correcta: 0,
    retroalimentacion: "Con dos camiones evaluados de forma binaria, el espacio muestral es S = {CC, CN, NC, NN}. El suceso de que exactamente uno sea conforme agrupa los dos casos mixtos: E = {CN, NC}."
  },
  {
    id: 104,
    municipio: "Valle del Sibundoy",
    tema: "Tejido de Mochilas de lana",
    contexto: "Una artesana del Valle del Sibundoy dispone de lana de tres colores: Amarillo (A), Verde (V) y Violeta (T). Selecciona dos colores distintos para tejer las franjas de una mochila tradicional sin importar el orden.",
    pregunta: "¿Cuál es el espacio muestral S de las combinaciones de colores y el suceso E de que se incluya el color Violeta (T)?",
    opciones: [
      "S = {AV, AT, VT}, E = {AT, VT}",
      "S = {A, V, T}, E = {T}",
      "S = {AV, AT, VT}, E = {AV}",
      "S = {AA, VV, TT}, E = {TT}"
    ],
    correcta: 0,
    retroalimentacion: "Al seleccionar 2 colores diferentes de un grupo de 3 sin importar el orden, las combinaciones son 3: {AV, AT, VT}. El suceso de incluir el Violeta (T) está compuesto por las muestras {AT, VT}."
  },
  {
    id: 105,
    municipio: "Valle del Guamuez",
    tema: "Empaque de Palmitos",
    contexto: "En una planta empacadora de palmito en la Hormiga, se muestrean dos latas para verificar su sellado al vacío. Una lata puede estar Perfecta (P) o Filtrada (F).",
    pregunta: "¿Cuál es el espacio muestral S y el suceso E de que ninguna de las latas esté Filtrada (F)?",
    opciones: [
      "S = {PP, PF, FP, FF}, E = {PP}",
      "S = {PP, PF, FP, FF}, E = {FF}",
      "S = {P, F}, E = {P}",
      "S = {PP, FF}, E = {PF, FP}"
    ],
    correcta: 0,
    retroalimentacion: "El espacio muestral de dos latas evaluadas es S = {PP, PF, FP, FF}. Que ninguna lata esté filtrada significa que ambas deben estar perfectas, por lo que el suceso contiene un solo elemento: E = {PP}."
  },
  {
    id: 106,
    municipio: "Puerto Leguízamo",
    tema: "Monitoreo del Caimán Negro",
    contexto: "Un guardabosques del Parque Nacional Natural La Paya observa un ejemplar de caimán negro al azar y registra su estado de desarrollo: Cría (C), Juvenil (J) o Adulto (A).",
    pregunta: "¿Cuál es el espacio muestral S y el suceso E de que el caimán observado sea Juvenil o Adulto?",
    opciones: [
      "S = {C, J, A}, E = {J, A}",
      "S = {C, J, A}, E = {C}",
      "S = {J, A}, E = {C, J, A}",
      "S = {Juvenil, Adulto}, E = {Juvenil}"
    ],
    correcta: 0,
    retroalimentacion: "Las tres etapas posibles forman el espacio muestral completo S = {C, J, A}. El suceso de que sea Juvenil (J) o Adulto (A) es el subconjunto E = {J, A}."
  },
  {
    id: 107,
    municipio: "Villagarzón",
    tema: "Siembra de Árboles en Cuencas",
    contexto: "Estudiantes de Villagarzón plantan dos árboles en una cuenca hídrica y registran si sobreviven el primer mes: Sí (S) o No (N).",
    pregunta: "¿Cuál es el espacio muestral S de los dos árboles y el suceso E de que sobreviva al menos uno de ellos?",
    opciones: [
      "S = {SS, SN, NS, NN}, E = {SS, SN, NS}",
      "S = {SS, SN, NS, NN}, E = {SS}",
      "S = {S, N}, E = {S}",
      "S = {SS, NN}, E = {SN, NS}"
    ],
    correcta: 0,
    retroalimentacion: "El espacio muestral para dos árboles independientes es S = {SS, SN, NS, NN}. El suceso 'sobrevive al menos uno' abarca los resultados con un árbol vivo o con ambos vivos: E = {SS, SN, NS}."
  },
  {
    id: 108,
    municipio: "San Miguel",
    tema: "pH del Agua para Riego",
    contexto: "Un agrónomo mide el pH del agua en una finca productora de cacao en San Miguel. Clasifica la acidez como Ácida (A), Neutra (N) o Alcalina (L).",
    pregunta: "¿Cuál es el espacio muestral S y el suceso E de que el agua no sea Ácida?",
    opciones: [
      "S = {A, N, L}, E = {N, L}",
      "S = {A, N, L}, E = {A}",
      "S = {N, L}, E = {A, N, L}",
      "S = {Neutra, Alcalina}, E = {Neutra}"
    ],
    correcta: 0,
    retroalimentacion: "Los tres estados forman S = {A, N, L}. El suceso 'no ser Ácida' excluye el elemento 'A', por lo tanto el conjunto queda definido como E = {N, L}."
  },
  {
    id: 109,
    municipio: "Santiago",
    tema: "Piscina de Lodoterapia",
    contexto: "En Santiago, un operario de un centro turístico anota si los próximos dos visitantes deciden entrar a la piscina de lodo volcánico: Sí (S) o No (N).",
    pregunta: "¿Cuál es el espacio muestral S de las decisiones de los dos visitantes y el suceso E de que ninguno de los dos decida entrar?",
    opciones: [
      "S = {SS, SN, NS, NN}, E = {NN}",
      "S = {SS, SN, NS, NN}, E = {SS}",
      "S = {S, N}, E = {N}",
      "S = {SS, NN}, E = {SN, NS}"
    ],
    correcta: 0,
    retroalimentacion: "El espacio muestral de dos decisiones consecutivas es S = {SS, SN, NS, NN}. El suceso de que ninguno entre corresponde únicamente a la pareja de respuestas negativas: E = {NN}."
  },
  {
    id: 110,
    municipio: "San Francisco",
    tema: "Patios Productivos de plantas exóticas",
    contexto: "En un patio productivo familiar en San Francisco, se evalúan tres capullos de anturios para ver si florecen en color Rojo (R) o Amarillo (A). Se registran las flores resultantes.",
    pregunta: "¿Cuál es el espacio muestral S y el suceso E de que exactamente dos de los tres capullos florezcan en color Rojo (R)?",
    opciones: [
      "S = {RRR, RRA, RAR, RAA, ARR, ARA, AAR, AAA}, E = {RRA, RAR, ARR}",
      "S = {RRR, RRA, RAR, RAA, ARR, ARA, AAR, AAA}, E = {RAA, ARA, AAR}",
      "S = {RR, RA, AR, AA}, E = {RA, AR}",
      "S = {RRR, AAA}, E = {RRA, RAR}"
    ],
    correcta: 0,
    retroalimentacion: "Para tres flores hay 2³ = 8 posibles resultados en S. El suceso de que exactamente dos capullos florezcan de color Rojo (R) contiene los elementos con exactamente dos 'R' y una 'A': E = {RRA, RAR, ARR}."
  },
  {
    id: 111,
    municipio: "Puerto Guzmán",
    tema: "Clasificación de Plátano de Rechazo",
    contexto: "En una finca de plátano en Puerto Guzmán, un agricultor clasifica un racimo rechazado por tamaño como Pequeño (P), Mediano (M) o Deforme (D).",
    pregunta: "¿Cuál es el espacio muestral S de la clasificación y el suceso E de que el racimo sea catalogado como Pequeño o Mediano?",
    opciones: [
      "S = {P, M, D}, E = {P, M}",
      "S = {P, M, D}, E = {D}",
      "S = {P, M}, E = {P, M, D}",
      "S = {Pequeño, Mediano}, E = {Pequeño}"
    ],
    correcta: 0,
    retroalimentacion: "Las tres opciones posibles componen el espacio muestral S = {P, M, D}. El suceso de que sea catalogado como Pequeño (P) o Mediano (M) está representado por el conjunto E = {P, M}."
  },
  {
    id: 112,
    municipio: "Puerto Caicedo",
    tema: "Fermentación de Granos de Cacao",
    contexto: "En Puerto Caicedo, un técnico evalúa la fermentación de dos lotes de cacao clasificados como Excelente (E) o Deficiente (D).",
    pregunta: "¿Cuál es el espacio muestral S de los dos lotes y el suceso E de que ambos tengan una fermentación Excelente?",
    opciones: [
      "S = {EE, ED, DE, DD}, E = {EE}",
      "S = {EE, ED, DE, DD}, E = {ED, DE, EE}",
      "S = {E, D}, E = {E}",
      "S = {EE, DD}, E = {ED, DE}"
    ],
    correcta: 0,
    retroalimentacion: "Las cuatro posibles combinaciones para dos lotes son S = {EE, ED, DE, DD}. El suceso de que ambos tengan excelente fermentación tiene un solo elemento: E = {EE}."
  },
  {
    id: 113,
    municipio: "Mocoa",
    tema: "Fauna de la Reserva Suruma",
    contexto: "En la reserva natural Suruma, un guía ambientalista registra si el próximo visitante observa una Danta (D), un Mono (M) o un Tucán (T).",
    pregunta: "¿Cuál es el espacio muestral S y el suceso E de que el animal observado no sea una Danta (D)?",
    opciones: [
      "S = {D, M, T}, E = {M, T}",
      "S = {D, M, T}, E = {D}",
      "S = {M, T}, E = {D, M, T}",
      "S = {Mono, Tucán}, E = {Mono}"
    ],
    correcta: 0,
    retroalimentacion: "El espacio muestral contiene los tres animales S = {D, M, T}. El suceso de que no sea una Danta (D) se compone de los otros dos elementos restantes: E = {M, T}."
  },
  {
    id: 114,
    municipio: "Valle del Sibundoy",
    tema: "Bebida de Chicha de Maíz",
    contexto: "Un sabedor indígena en Sibundoy elabora dos vasijas de chicha de maíz y evalúa el grado de fermentación de cada una como Fuerte (F) o Suave (S).",
    pregunta: "¿Cuál es el espacio muestral S y el suceso E de que al menos una vasija tenga fermentación Fuerte (F)?",
    opciones: [
      "S = {FF, FS, SF, SS}, E = {FF, FS, SF}",
      "S = {FF, FS, SF, SS}, E = {FF}",
      "S = {F, S}, E = {F}",
      "S = {FF, SS}, E = {FS, SF}"
    ],
    correcta: 0,
    retroalimentacion: "Las cuatro combinaciones posibles son S = {FF, FS, SF, SS}. El suceso 'al menos una fuerte' abarca todos los resultados que poseen una o dos 'F': E = {FF, FS, SF}."
  },
  {
    id: 115,
    municipio: "Puerto Asís",
    tema: "Descarga de Mercancías Fluviales",
    contexto: "En el puerto de Puerto Asís, se registra si el próximo bote de carga transporta Madera (M), Alimentos (A) o Combustible (C).",
    pregunta: "¿Cuál es el espacio muestral S y el suceso E de que la carga sea de Madera o de Alimentos?",
    opciones: [
      "S = {M, A, C}, E = {M, A}",
      "S = {M, A, C}, E = {C}",
      "S = {M, A}, E = {M, A, C}",
      "S = {Madera, Alimentos}, E = {Madera}"
    ],
    correcta: 0,
    retroalimentacion: "Las tres cargas posibles forman el espacio muestral completo S = {M, A, C}. El suceso de que transporte Madera (M) o Alimentos (A) es el subconjunto E = {M, A}."
  },
  {
    id: 116,
    municipio: "Orito",
    tema: "Colección de Mariposas",
    contexto: "En un laboratorio de Orito, se examinan dos ejemplares de mariposas silvestres recolectadas para registrar su género: Hembra (H) o Macho (M).",
    pregunta: "¿Cuál es el espacio muestral S y el suceso E de que el primer ejemplar examinado sea Hembra (H)?",
    opciones: [
      "S = {HH, HM, MH, MM}, E = {HH, HM}",
      "S = {HH, HM, MH, MM}, E = {HH, MM}",
      "S = {H, M}, E = {H}",
      "S = {HH, MM}, E = {HM, MH}"
    ],
    correcta: 0,
    retroalimentacion: "Las cuatro combinaciones posibles son S = {HH, HM, MH, MM}. El suceso de que el primer ejemplar sea Hembra (H) requiere que comience por 'H', dando E = {HH, HM}."
  },
  {
    id: 117,
    municipio: "Villagarzón",
    tema: "Inoculantes para Árboles",
    contexto: "Técnicos forestales de Villagarzón prueban dos dosis de micorrizas en plántulas de Cedro. Cada dosis puede resultar en crecimiento Acelerado (A) o Normal (N).",
    pregunta: "¿Cuál es el espacio muestral S de las dos plántulas y el suceso E de que exactamente una plántula muestre un crecimiento Acelerado (A)?",
    opciones: [
      "S = {AA, AN, NA, NN}, E = {AN, NA}",
      "S = {AA, NN}, E = {AN}",
      "S = {A, N}, E = {A}",
      "S = {AA, AN, NA, NN}, E = {AA, NN}"
    ],
    correcta: 0,
    retroalimentacion: "Las combinaciones de resultados son S = {AA, AN, NA, NN}. El suceso de que exactamente una plántula tenga crecimiento acelerado corresponde a los resultados mixtos {AN, NA}."
  },
  {
    id: 118,
    municipio: "Valle del Guamuez",
    tema: "Grosor del Palmito",
    contexto: "En la Hormiga, se mide el grosor de un tallo de palmito seleccionado al azar para conserva. Se clasifica en Delgado (D), Estándar (E) o Grueso (G).",
    pregunta: "¿Cuál es el espacio muestral S y el suceso E de que el grosor sea Estándar o Delgado?",
    opciones: [
      "S = {D, E, G}, E = {D, E}",
      "S = {D, E, G}, E = {G}",
      "S = {D, E}, E = {D, E, G}",
      "S = {Delgado, Estándar}, E = {Delgado}"
    ],
    correcta: 0,
    retroalimentacion: "Los tres grosores posibles constituyen S = {D, E, G}. El suceso de que sea Estándar o Delgado está formado por los elementos E = {D, E}."
  },
  {
    id: 119,
    municipio: "Puerto Leguízamo",
    tema: "Avistamiento de Manatíes",
    contexto: "Durante una expedición fluvial en Puerto Leguízamo se realizan dos recorridos en lancha. En cada recorrido, se anota si se observa al Manatí Amazónico: Sí (S) o No (N).",
    pregunta: "¿Cuál es el espacio muestral S y el suceso E de que se observe al manatí en ambos recorridos?",
    opciones: [
      "S = {SS, SN, NS, NN}, E = {SS}",
      "S = {SS, SN, NS, NN}, E = {SS, SN, NS}",
      "S = {S, N}, E = {S}",
      "S = {SS, NN}, E = {SN, NS}"
    ],
    correcta: 0,
    retroalimentacion: "El espacio muestral de dos recorridos es S = {SS, SN, NS, NN}. El suceso de observar al manatí en ambos recorridos es el elemento único E = {SS}."
  },
  {
    id: 120,
    municipio: "San Miguel",
    tema: "Enfermedades del Cacao",
    contexto: "Un agrónomo en San Miguel revisa dos hojas de un árbol de cacao para ver si tienen Monilia (M) o si están Sanas (S).",
    pregunta: "¿Cuál es el espacio muestral S y el suceso E de que al menos una de las hojas tenga Monilia (M)?",
    opciones: [
      "S = {MM, MS, SM, SS}, E = {MM, MS, SM}",
      "S = {MM, MS, SM, SS}, E = {MM}",
      "S = {M, S}, E = {M}",
      "S = {MM, SS}, E = {MS, SM}"
    ],
    correcta: 0,
    retroalimentacion: "Con dos hojas revisadas de forma binaria, el espacio muestral tiene 4 resultados. El suceso 'al menos una con Monilia' agrupa las opciones {MM, MS, SM}."
  },
  {
    id: 121,
    municipio: "Santiago",
    tema: "Artesanías en Arcilla",
    contexto: "Una artesana en Santiago elabora jarrones y clasifica el acabado final de dos piezas como Brillante (B) o Mate (M).",
    pregunta: "¿Cuál es el espacio muestral S de las dos piezas y el suceso E de que al menos una sea de acabado Mate (M)?",
    opciones: [
      "S = {BB, BM, MB, MM}, E = {BM, MB, MM}",
      "S = {BB, BM, MB, MM}, E = {MM}",
      "S = {B, M}, E = {M}",
      "S = {BB, MM}, E = {BM, MB}"
    ],
    correcta: 0,
    retroalimentacion: "Para dos piezas se obtienen 4 combinaciones. El suceso 'al menos una de acabado Mate' comprende las combinaciones {BM, MB, MM}."
  },
  {
    id: 122,
    municipio: "San Francisco",
    tema: "Tintes Naturales para Tejidos",
    contexto: "Una tejedora de San Francisco extrae al azar dos madejas de hilo de diferentes tintes de su canasta que contiene madejas de color Nogal (N), Aliso (A) y Cúrcuma (C) (sin importar el orden y sin repetición).",
    pregunta: "¿Cuál es el espacio muestral S de las parejas de colores y el suceso E de que se extraiga el tinte de Cúrcuma (C)?",
    opciones: [
      "S = {NA, NC, AC}, E = {NC, AC}",
      "S = {N, A, C}, E = {C}",
      "S = {NA, NC, AC}, E = {NA}",
      "S = {NA, NC, AC}, E = {NA, NC, AC}"
    ],
    correcta: 0,
    retroalimentacion: "Al seleccionar 2 madejas de 3 diferentes sin orden ni repetición, se tienen 3 combinaciones. El suceso de que aparezca Cúrcuma (C) es E = {NC, AC}."
  },
  {
    id: 123,
    municipio: "Puerto Guzmán",
    tema: "Variedades de Yuca",
    contexto: "Un agricultor en Puerto Guzmán cultiva yuca dulce y yuca amarga. Selecciona dos raíces al azar de su cosecha para examinarlas y registra si cada una es Dulce (D) o Amarga (A).",
    pregunta: "¿Cuál es el espacio muestral S y el suceso E de que ninguna de las raíces sea Amarga (A)?",
    opciones: [
      "S = {DD, DA, AD, AA}, E = {DD}",
      "S = {DD, DA, AD, AA}, E = {AA}",
      "S = {D, A}, E = {D}",
      "S = {DD, AA}, E = {DA, AD}"
    ],
    correcta: 0,
    retroalimentacion: "El espacio muestral de dos raíces es S = {DD, DA, AD, AA}. Que ninguna sea Amarga significa que ambas son Dulces, resultando en el suceso E = {DD}."
  },
  {
    id: 124,
    municipio: "Puerto Caicedo",
    tema: "Saborizadores de Chocolate",
    contexto: "En una cooperativa de Puerto Caicedo se decide agregar una esencia natural a una línea de chocolate. Las esencias candidatas son Menta (M), Clavo (C) o Canela (N). Se elige una al azar.",
    pregunta: "¿Cuál es el espacio muestral S de la esencia y el suceso E de que no se elija Clavo (C)?",
    opciones: [
      "S = {M, C, N}, E = {M, N}",
      "S = {M, C, N}, E = {C}",
      "S = {M, N}, E = {M, C, N}",
      "S = {Menta, Canela}, E = {Menta}"
    ],
    correcta: 0,
    retroalimentacion: "El espacio muestral agrupa las tres esencias posibles S = {M, C, N}. Al excluir el Clavo (C), el suceso de interés queda definido por las dos esencias restantes: E = {M, N}."
  },
  {
    id: 125,
    municipio: "Mocoa",
    tema: "Inspección de Semillas de Árboles",
    contexto: "En un vivero de Mocoa, un operario evalúa dos semillas de cedro para ver si germinan en 10 días: Sí (S) o No (N).",
    pregunta: "¿Cuál es el espacio muestral S y el suceso E de que exactamente una de las semillas germine?",
    opciones: [
      "S = {SS, SN, NS, NN}, E = {SN, NS}",
      "S = {SS, NN}, E = {SN}",
      "S = {S, N}, E = {S}",
      "S = {SS, SN, NS, NN}, E = {SS, NN}"
    ],
    correcta: 0,
    retroalimentacion: "Las cuatro combinaciones posibles de dos semillas independientes son S = {SS, SN, NS, NN}. El suceso de que exactamente una germine incluye las parejas con un 'S' y un 'N': E = {SN, NS}."
  }
];
