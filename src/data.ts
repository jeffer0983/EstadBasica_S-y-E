import { Situation } from "./types";

export const SITUACIONES_PUTUMAYO: Situation[] = [
  {
    id: 1,
    municipio: "Mocoa",
    tema: "Cascadas del Fin del Mundo",
    contexto: "En una expedición turística a las famosas Cascadas del Fin del Mundo en Mocoa, un guía registra si los visitantes deciden cruzar el puente de piedra natural o tomar el sendero alternativo boscoso para llegar al mirador principal.",
    pregunta: "¿Cuál es el espacio muestral (S) y el suceso (E) de que un visitante elija cruzar por el puente de piedra natural?",
    opciones: [
      "S = {Puente, Sendero}, E = {Puente}",
      "S = {Puente}, E = {Puente, Sendero}",
      "S = {Puente, Sendero, Cascada}, E = {Sendero}",
      "S = {Cruzó, No Cruzó}, E = {No Cruzó}"
    ],
    correcta: 0,
    retroalimentacion: "El espacio muestral S representa todos los resultados posibles del experimento aleatorio (cruzar por el Puente o por el Sendero). El suceso E es el subconjunto de interés: elegir el Puente, denotado como E = {Puente}."
  },
  {
    id: 2,
    municipio: "Orito",
    tema: "Cultivo de Pimienta",
    contexto: "Un productor de la Asociación de Pimienteros de Orito inspecciona la calidad de tres sacos de pimienta negra recién cosechados de su chagra. Registra si cada saco cumple con el estándar de exportación de calidad Alta (A) o no (N).",
    pregunta: "¿Cuál es el espacio muestral (S) de los tres sacos inspeccionados y el suceso (E) de que al menos dos de ellos tengan calidad Alta (A)?",
    opciones: [
      "S = {AAA, AAN, ANA, ANN, NAA, NAN, NNA, NNN}, E = {AAA, AAN, ANA, NAA}",
      "S = {AA, AN, NA, NN}, E = {AA, AN}",
      "S = {AAA, AAN, ANA, NAA}, E = {AAA, NNN}",
      "S = {AAA, AAN, ANA, ANN, NAA, NAN, NNA, NNN}, E = {ANN, NAN, NNA, NNN}"
    ],
    correcta: 0,
    retroalimentacion: "Para tres sacos independientes con dos opciones cada uno, hay 2³ = 8 resultados posibles que forman el espacio muestral S. El suceso E ('al menos dos sacos de calidad Alta') agrupa los resultados que tienen dos o tres 'A': {AAA, AAN, ANA, NAA}."
  },
  {
    id: 3,
    municipio: "Valle del Sibundoy",
    tema: "Artesanías Kamëntsá",
    contexto: "En un taller de artesanías en Sibundoy, una maestra indígena selecciona al azar una máscara tallada en madera de sauce. En la mesa tiene máscaras de la Alegría (A), del Dolor (D) y de la Sabiduría (S).",
    pregunta: "Si la maestra toma una máscara al azar para pulirla, ¿cuál es el espacio muestral (S) de los diseños disponibles y el suceso (E) de seleccionar una máscara que no represente el Dolor?",
    opciones: [
      "S = {A, D, S}, E = {A, S}",
      "S = {A, D, S}, E = {D}",
      "S = {Alegría, Sabiduría}, E = {Alegría}",
      "S = {A, D, S, M}, E = {A, D, S}"
    ],
    correcta: 0,
    retroalimentacion: "Los resultados posibles (tipos de diseño de máscara) son {A, D, S}, formando el espacio muestral S. El suceso 'no representar el Dolor' excluye el elemento D, por lo que E = {A, S}."
  },
  {
    id: 4,
    municipio: "Puerto Asís",
    tema: "Navegación en el Río Putumayo",
    contexto: "Un estudiante de Grado 10° observa las embarcaciones que llegan al muelle de Puerto Asís desde el río Putumayo. En un intervalo de tiempo, registra si las próximas dos embarcaciones son Lanchas Motoras (L) o Canoas Tradicionales (C).",
    pregunta: "¿Cuál es el espacio muestral (S) de las dos embarcaciones observadas y el suceso (E) de que pase exactamente una lancha motora?",
    opciones: [
      "S = {LL, LC, CL, CC}, E = {LC, CL}",
      "S = {LL, CC}, E = {LC}",
      "S = {L, C}, E = {L}",
      "S = {LL, LC, CL, CC}, E = {LL, CC}"
    ],
    correcta: 0,
    retroalimentacion: "Al registrar dos embarcaciones consecutivas, se obtienen 4 combinaciones ordenadas en el espacio muestral S. El suceso de que pase exactamente una lancha corresponde a las combinaciones {LC, CL}."
  },
  {
    id: 5,
    municipio: "Puerto Leguízamo",
    tema: "Tortugas Charapa",
    contexto: "En el Parque Nacional Natural La Paya en Puerto Leguízamo, un guardabosques monitorea un nido de tortugas Charapa. Al nacer, clasifica el tamaño del caparazón de una tortuga recién nacida seleccionada al azar como Pequeño (P), Mediano (M) o Grande (G).",
    pregunta: "¿Cuál es el espacio muestral (S) de la clasificación del tamaño y el suceso (E) de que la tortuga sea de tamaño Mediano o Grande?",
    opciones: [
      "S = {P, M, G}, E = {M, G}",
      "S = {P, M, G}, E = {P, M}",
      "S = {P, M, G}, E = {M}",
      "S = {Charapa}, E = {Grande}"
    ],
    correcta: 0,
    retroalimentacion: "Los tres posibles tamaños forman el espacio muestral completo S = {P, M, G}. El suceso de que el tamaño sea Mediano o Grande está dado por el subconjunto E = {M, G}."
  },
  {
    id: 6,
    municipio: "Villagarzón",
    tema: "Avistamiento de Aves en Chaluayaco",
    contexto: "Un grupo de jóvenes investigadores en la Reserva Chaluayaco de Villagarzón busca identificar aves endémicas. Clasifican el siguiente ejemplar observado según su color predominante: Verde (V), Azul (A), o Rojo (R).",
    pregunta: "¿Cuál es el espacio muestral (S) de la observación y el suceso (E) de que el ave observada no sea de color Rojo?",
    opciones: [
      "S = {V, A, R}, E = {V, A}",
      "S = {V, A, R}, E = {R}",
      "S = {V, A}, E = {V, A, R}",
      "S = {Verde, Azul}, E = {Verde}"
    ],
    correcta: 0,
    retroalimentacion: "Los tres colores posibles forman el espacio muestral S = {V, A, R}. El suceso de que 'no sea de color Rojo' excluye la opción R, resultando en el conjunto E = {V, A}."
  },
  {
    id: 7,
    municipio: "Valle del Guamuez",
    tema: "Cosecha de Chontaduro",
    contexto: "En una parcela del Valle del Guamuez, un agricultor selecciona dos chontaduros de un racimo recién cosechado y califica su madurez como Pintón (P) o Maduro (M).",
    pregunta: "¿Cuál es el espacio muestral (S) de los dos chontaduros evaluados y el suceso (E) de que al menos uno de ellos esté Maduro (M)?",
    opciones: [
      "S = {PP, PM, MP, MM}, E = {PM, MP, MM}",
      "S = {PP, PM, MP, MM}, E = {MM}",
      "S = {P, M}, E = {M}",
      "S = {PP, MM}, E = {PM, MP}"
    ],
    correcta: 0,
    retroalimentacion: "El espacio muestral de dos chontaduros consta de 4 elementos S = {PP, PM, MP, MM}. El suceso 'al menos uno maduro' significa que puede haber uno o ambos maduros, dando E = {PM, MP, MM}."
  },
  {
    id: 8,
    municipio: "Mocoa",
    tema: "Plantas de la Chagra Indígena",
    contexto: "En una chagra tradicional Kamëntsá en Mocoa, un taita curandero recolecta dos plantas medicinales sagradas de entre tres especies disponibles: Llantén (L), Ortiga (O) y Cuti (C). Las recolecta una a una en orden y sin repetición.",
    pregunta: "¿Cuál es el espacio muestral (S) de las parejas ordenadas de plantas recolectadas y el suceso (E) de que la primera planta recolectada sea Ortiga (O)?",
    opciones: [
      "S = {LO, LC, OL, OC, CL, CO}, E = {OL, OC}",
      "S = {LO, LC, OC}, E = {OL}",
      "S = {L, O, C}, E = {O}",
      "S = {LO, LC, OL, OC, CL, CO}, E = {LO, CO}"
    ],
    correcta: 0,
    retroalimentacion: "Al extraer dos plantas diferentes en orden, hay 6 parejas ordenadas posibles que forman S. Las parejas que comienzan por Ortiga (O) son {OL, OC}, lo cual define el suceso E."
  },
  {
    id: 9,
    municipio: "Puerto Guzmán",
    tema: "Pesca en el Río Caquetá",
    contexto: "Un pescador artesanal de Puerto Guzmán extrae un pez de su red en el caudaloso río Caquetá. El pez puede pertenecer a una de tres especies de gran aprecio comercial: Pintadillo (P), Bocachico (B) o Sabaleta (S).",
    pregunta: "¿Cuál es el espacio muestral (S) de la especie del pez capturado y el suceso (E) de que el pez sea un Bocachico o un Pintadillo?",
    opciones: [
      "S = {P, B, S}, E = {P, B}",
      "S = {P, B, S}, E = {S}",
      "S = {P, B}, E = {P, B, S}",
      "S = {Pintadillo, Bocachico}, E = {Pintadillo}"
    ],
    correcta: 0,
    retroalimentacion: "Las tres especies posibles que pueden salir en la pesca constituyen el espacio muestral completo S = {P, B, S}. El suceso de que sea Bocachico (B) o Pintadillo (P) es el subconjunto E = {P, B}."
  },
  {
    id: 10,
    municipio: "Santiago",
    tema: "Aguas Termales de Colón",
    contexto: "Se monitorea la temperatura de las piscinas de aguas termales en Colón (Santiago). Se registra si en dos días seguidos la temperatura del agua supera los 38°C, anotando Sí (S) o No (N).",
    pregunta: "¿Cuál es el espacio muestral (S) de los dos días registrados y el suceso (E) de que no se superen los 38°C en ninguno de los dos días?",
    opciones: [
      "S = {SS, SN, NS, NN}, E = {NN}",
      "S = {SS, SN, NS, NN}, E = {SS}",
      "S = {S, N}, E = {N}",
      "S = {SS, NN}, E = {SN, NS}"
    ],
    correcta: 0,
    retroalimentacion: "Con dos días de medición, el espacio de resultados posibles tiene 4 elementos. Que no se superen los 38°C en ninguno de los dos días se reduce al único caso donde ambos días son negativos: E = {NN}."
  },
  {
    id: 11,
    municipio: "San Francisco",
    tema: "Floración de Orquídeas",
    contexto: "En un vivero de conservación forestal en San Francisco, se evalúan tres capullos de orquídeas exóticas para ver si florecen en la semana: Sí (S) o No (N).",
    pregunta: "¿Cuál es el espacio muestral (S) y el suceso (E) de que florezcan exactamente dos de las tres orquídeas?",
    opciones: [
      "S = {SSS, SSN, SNS, SNN, NSS, NSN, NNS, NNN}, E = {SSN, SNS, NSS}",
      "S = {SSS, SSN, SNS, SNN, NSS, NSN, NNS, NNN}, E = {SNN, NSN, NNS}",
      "S = {SS, SN, NS, NN}, E = {SN, NS}",
      "S = {SSS, NNN}, E = {SSN, SNS}"
    ],
    correcta: 0,
    retroalimentacion: "Al evaluar tres capullos hay 2³ = 8 resultados posibles en S. El suceso de que florezcan exactamente dos requiere combinaciones con dos letras 'S' y una 'N': {SSN, SNS, NSS}."
  },
  {
    id: 12,
    municipio: "Orito",
    tema: "Cámaras Trampa en Ingi-Andé",
    contexto: "En un sendero ecológico de la Reserva Nacional Ingi-Andé de Orito, se instala una cámara trampa. Se registra si el próximo mamífero mediano fotografiado es un Armadillo (A), un Cusumbo (C) o una Guagua (G).",
    pregunta: "¿Cuál es el espacio muestral (S) del mamífero registrado y el suceso (E) de que la cámara capte un Armadillo o una Guagua?",
    opciones: [
      "S = {A, C, G}, E = {A, G}",
      "S = {A, C, G}, E = {C}",
      "S = {Armadillo, Guagua}, E = {Armadillo}",
      "S = {A, C, G}, E = {A, C, G}"
    ],
    correcta: 0,
    retroalimentacion: "Las tres especies constituyen el espacio muestral S = {A, C, G}. El suceso de captar Armadillo o Guagua se representa mediante el subconjunto E = {A, G}."
  },
  {
    id: 13,
    municipio: "Puerto Caicedo",
    tema: "Calidad de Cacao Orgánico",
    contexto: "Una asociación de cacaoteros en Puerto Caicedo clasifica sus barras de chocolate artesanal según su porcentaje de cacao en tres categorías exclusivas: Suave (S), Semiamargo (M) y Amargo (A).",
    pregunta: "Si un catador toma una barra de chocolate al azar, ¿cuál es el espacio muestral (S) y el suceso (E) de que el chocolate elegido sea Amargo o Semiamargo?",
    opciones: [
      "S = {S, M, A}, E = {M, A}",
      "S = {S, M, A}, E = {S, M}",
      "S = {M, A}, E = {A}",
      "S = {Suave, Amargo}, E = {Amargo}"
    ],
    correcta: 0,
    retroalimentacion: "El espacio muestral agrupa las tres categorías posibles de sabor S = {S, M, A}. El suceso de que sea Amargo (A) o Semiamargo (M) corresponde al subconjunto E = {M, A}."
  },
  {
    id: 14,
    municipio: "San Miguel",
    tema: "Monitoreo Ambiental de Ríos",
    contexto: "En el municipio fronterizo de San Miguel, ingenieros ambientales toman una muestra de agua del río San Miguel para evaluar su nivel de turbidez, clasificándolo en Bajo (B), Medio (M) o Alto (A).",
    pregunta: "¿Cuál es el espacio muestral (S) del análisis de turbidez y el suceso (E) de que la turbidez sea de nivel Bajo o Medio?",
    opciones: [
      "S = {B, M, A}, E = {B, M}",
      "S = {B, M, A}, E = {A}",
      "S = {B, M}, E = {B, M, A}",
      "S = {Bajo, Medio}, E = {Bajo}"
    ],
    correcta: 0,
    retroalimentacion: "Los tres estados de turbidez posibles forman el espacio muestral S = {B, M, A}. El suceso de que la turbidez esté dentro del rango aceptable (Bajo o Medio) es E = {B, M}."
  },
  {
    id: 15,
    municipio: "Mocoa",
    tema: "Corrientes en el Río Rumiyaco",
    contexto: "Un estudiante en las playas del río Rumiyaco en Mocoa lanza un flotador biodegradable al río y observa si este es arrastrado por la corriente hacia la Orilla Izquierda (I), la Orilla Derecha (D) o si sigue recto por el Centro (C).",
    pregunta: "¿Cuál es el espacio muestral (S) de la trayectoria y el suceso (E) de que el flotador no termine en la Orilla Derecha?",
    opciones: [
      "S = {I, D, C}, E = {I, C}",
      "S = {I, D, C}, E = {D}",
      "S = {I, C}, E = {I, D, C}",
      "S = {Izquierda, Centro}, E = {Izquierda}"
    ],
    correcta: 0,
    retroalimentacion: "Los posibles caminos del flotador son {I, D, C}. Al excluir la Orilla Derecha (D), el suceso de interés queda definido por las trayectorias restantes: E = {I, C}."
  },
  {
    id: 16,
    municipio: "Valle del Sibundoy",
    tema: "Instrumentos del Carnaval Kamëntsá",
    contexto: "Un joven músico de Sibundoy tiene tres instrumentos sagrados hechos a mano: un Tambor (T), una Flauta (F) y un Capador (C). Elige dos instrumentos al azar para participar en la comparsa del Clatsh (sin repetición y sin importar el orden).",
    pregunta: "¿Cuál es el espacio muestral (S) de las combinaciones de instrumentos elegidos y el suceso (E) de que la Flauta (F) sea uno de los instrumentos seleccionados?",
    opciones: [
      "S = {TF, TC, FC}, E = {TF, FC}",
      "S = {T, F, C}, E = {F}",
      "S = {TF, TC, FC}, E = {TC}",
      "S = {TF, TC, FC}, E = {TF, TC, FC}"
    ],
    correcta: 0,
    retroalimentacion: "Al seleccionar 2 elementos de un grupo de 3 sin orden, las combinaciones posibles son {TF, TC, FC}. El suceso en el que participa la flauta está constituido por las parejas E = {TF, FC}."
  },
  {
    id: 17,
    municipio: "Puerto Asís",
    tema: "Avistamiento de Delfines Rosados",
    contexto: "Durante un paseo en lancha por el río Putumayo saliendo de Puerto Asís, un fotógrafo realiza dos paradas de observación. En cada parada, registra si logra fotografiar al hermoso Delfín Rosado de río: Sí (S) o No (N).",
    pregunta: "¿Cuál es el espacio muestral (S) de las dos observaciones y el suceso (E) de que logre fotografiar al delfín en al menos una de las paradas?",
    opciones: [
      "S = {SS, SN, NS, NN}, E = {SS, SN, NS}",
      "S = {SS, SN, NS, NN}, E = {SS}",
      "S = {S, N}, E = {S}",
      "S = {SS, NN}, E = {SN, NS}"
    ],
    correcta: 0,
    retroalimentacion: "Las cuatro combinaciones posibles de dos avistamientos independientes componen S. El suceso 'al menos una de las paradas' implica tener 1 o 2 respuestas afirmativas, es decir, E = {SS, SN, NS}."
  },
  {
    id: 18,
    municipio: "Orito",
    tema: "Cosecha de Asaí Silvestre",
    contexto: "Una cooperativa de familias recolectoras en Orito selecciona dos racimos de asaí silvestre en la selva para procesar pulpa. Mide su grado de madurez como Verde (V) o Maduro (M).",
    pregunta: "¿Cuál es el espacio muestral (S) de las dos muestras de asaí y el suceso (E) de que ambos racimos estén maduros?",
    opciones: [
      "S = {VV, VM, MV, MM}, E = {MM}",
      "S = {VV, VM, MV, MM}, E = {VM, MV, MM}",
      "S = {V, M}, E = {M}",
      "S = {VV, MM}, E = {VM, MV}"
    ],
    correcta: 0,
    retroalimentacion: "Al evaluar dos racimos independientes, el espacio muestral S tiene 4 elementos. El suceso de que ambos estén maduros corresponde al caso único en el que ambos son 'M': E = {MM}."
  },
  {
    id: 19,
    municipio: "Villagarzón",
    tema: "Frutales de Copoazú",
    contexto: "Un técnico agrícola en Villagarzón evalúa dos árboles de Copoazú de un cultivo piloto para verificar si presentan resistencia a plagas comunes de la región, anotando Resistente (R) o Susceptible (S).",
    pregunta: "¿Cuál es el espacio muestral (S) de los dos árboles evaluados y el suceso (E) de que exactamente uno de los dos árboles sea Resistente (R)?",
    opciones: [
      "S = {RR, RS, SR, SS}, E = {RS, SR}",
      "S = {RR, SS}, E = {RS}",
      "S = {R, S}, E = {R}",
      "S = {RR, RS, SR, SS}, E = {RR, SS}"
    ],
    correcta: 0,
    retroalimentacion: "Las combinaciones de resistencia para dos árboles son 4. El suceso 'exactamente uno resistente' excluye que ambos lo sean o que ninguno lo sea, lo que nos deja con E = {RS, SR}."
  },
  {
    id: 20,
    municipio: "Puerto Guzmán",
    tema: "Semillero de Oradores Escolares",
    contexto: "Un docente de una escuela rural de Puerto Guzmán selecciona dos estudiantes en orden para exponer sobre mitos de la selva. Registra si cada estudiante seleccionado es Masculino (M) o Femenino (F).",
    pregunta: "¿Cuál es el espacio muestral (S) de los géneros de los dos expositores y el suceso (E) de que el primer expositor seleccionado sea de género Femenino (F)?",
    opciones: [
      "S = {MM, MF, FM, FF}, E = {FM, FF}",
      "S = {MM, FF}, E = {FM}",
      "S = {M, F}, E = {F}",
      "S = {MM, MF, FM, FF}, E = {MF, FM}"
    ],
    correcta: 0,
    retroalimentacion: "El espacio muestral de géneros ordenados para dos personas es S = {MM, MF, FM, FF}. El suceso de que la primera persona sea mujer requiere que la primera letra sea 'F', resultando E = {FM, FF}."
  },
  {
    id: 21,
    municipio: "Santiago",
    tema: "Senderos Ecológicos",
    contexto: "Un operador turístico en Santiago clasifica la dificultad de tres caminos prehispánicos locales como Fácil (F), Moderada (M) o Difícil (D). Elige un camino al azar para un grupo escolar.",
    pregunta: "¿Cuál es el espacio muestral (S) y el suceso (E) de que el sendero elegido sea de dificultad Moderada o Fácil?",
    opciones: [
      "S = {F, M, D}, E = {F, M}",
      "S = {F, M, D}, E = {M, D}",
      "S = {F, M}, E = {F, M, D}",
      "S = {Fácil, Moderada}, E = {Fácil}"
    ],
    correcta: 0,
    retroalimentacion: "El espacio de dificultad tiene tres posibles estados {F, M, D}. El suceso de que sea Moderada o Fácil corresponde al subconjunto E = {F, M}."
  },
  {
    id: 22,
    municipio: "San Francisco",
    tema: "Tejido de Fajas Tradicionales",
    contexto: "Una artesana en San Francisco teje una faja tradicional utilizando hilos de colores naturales de la Amazonía. Selecciona al azar dos colores de su cesta que contiene hilos de color Negro (N), Blanco (B) y Rojo (R) (sin repetición y sin importar el orden).",
    pregunta: "¿Cuál es el espacio muestral (S) de las combinaciones de colores elegidos y el suceso (E) de que el color Rojo (R) sea seleccionado?",
    opciones: [
      "S = {NB, NR, BR}, E = {NR, BR}",
      "S = {N, B, R}, E = {R}",
      "S = {NB, NR, BR}, E = {NB}",
      "S = {NB, NR, BR}, E = {NB, NR, BR}"
    ],
    correcta: 0,
    retroalimentacion: "Al seleccionar 2 colores entre 3 sin importar el orden y sin repetir, se obtienen 3 combinaciones. El suceso en el cual participa el color Rojo está compuesto por las parejas E = {NR, BR}."
  },
  {
    id: 23,
    municipio: "Puerto Caicedo",
    tema: "Avistamiento del Oso de Anteojos",
    contexto: "En un proyecto de monitoreo ambiental en las montañas de Puerto Caicedo, biólogos registran si logran avistar al Oso de Anteojos andino durante dos días seguidos: Avistado (A) o No Avistado (N).",
    pregunta: "¿Cuál es el espacio muestral (S) de las observaciones de los dos días y el suceso (E) de que se observe al oso en al menos uno de los días?",
    opciones: [
      "S = {AA, AN, NA, NN}, E = {AA, AN, NA}",
      "S = {AA, AN, NA, NN}, E = {AA}",
      "S = {A, N}, E = {A}",
      "S = {AA, NN}, E = {AN, NA}"
    ],
    correcta: 0,
    retroalimentacion: "Con dos días de observación hay 4 combinaciones posibles. El suceso de observar al oso al menos un día abarca los casos con 1 o 2 avistamientos: E = {AA, AN, NA}."
  },
  {
    id: 24,
    municipio: "Valle del Guamuez",
    tema: "Feria del Chontaduro Gigante",
    contexto: "En una exposición agrícola en la Hormiga (Valle del Guamuez), un jurado experto evalúa la calidad y tamaño de un chontaduro excepcional presentado a concurso, clasificándolo como Mediano (M), Grande (G) o Extra Grande (X).",
    pregunta: "¿Cuál es el espacio muestral (S) de la clasificación del jurado y el suceso (E) de que reciba una calificación superior a Mediano?",
    opciones: [
      "S = {M, G, X}, E = {G, X}",
      "S = {M, G, X}, E = {M}",
      "S = {G, X}, E = {M, G, X}",
      "S = {Grande, Extra}, E = {Grande}"
    ],
    correcta: 0,
    retroalimentacion: "La escala de evaluación contiene tres categorías, por tanto S = {M, G, X}. El suceso de que reciba una calificación superior a Mediano agrupa a Grande (G) y Extra Grande (X), dando E = {G, X}."
  },
  {
    id: 25,
    municipio: "San Miguel",
    tema: "Acidez de Suelo para Cacao",
    contexto: "Ingenieros agrónomos en el municipio fronterizo de San Miguel analizan el suelo de dos parcelas de cacao para clasificar la acidez del terreno como Ácido (A) o Neutro (N).",
    pregunta: "¿Cuál es el espacio muestral (S) de las dos parcelas evaluadas y el suceso (E) de que ninguna de las parcelas tenga un suelo de tipo Ácido (A)?",
    opciones: [
      "S = {AA, AN, NA, NN}, E = {NN}",
      "S = {AA, AN, NA, NN}, E = {AA}",
      "S = {A, N}, E = {N}",
      "S = {AA, NN}, E = {AN, NA}"
    ],
    correcta: 0,
    retroalimentacion: "El análisis de dos parcelas nos da 4 combinaciones de resultados. Que ninguna tenga suelo Ácido significa que ambas son Neutras, definiendo el suceso E = {NN}."
  },
  {
    id: 26,
    municipio: "Mocoa",
    tema: "Orquídeas de la Reserva Suruma",
    contexto: "En la Reserva Suruma de Mocoa, un guía ambientalista muestra una orquídea silvestre a unos estudiantes y les pide identificar si es terrestre (T), epífita (E) o litófita (L).",
    pregunta: "¿Cuál es el espacio muestral (S) de la clasificación de la orquídea y el suceso (E) de que la planta sea epífita o terrestre?",
    opciones: [
      "S = {T, E, L}, E = {T, E}",
      "S = {T, E, L}, E = {L}",
      "S = {T, E}, E = {T, E, L}",
      "S = {Epífita, Terrestre}, E = {Epífita}"
    ],
    correcta: 0,
    retroalimentacion: "Las tres clasificaciones forman el espacio muestral S = {T, E, L}. El suceso de que sea epífita o terrestre está dado por el conjunto E = {T, E}."
  },
  {
    id: 27,
    municipio: "Puerto Asís",
    tema: "Exportación de Palmitos",
    contexto: "Un analista de aduanas de Puerto Asís monitorea dos cargamentos de palmitos amazónicos y clasifica el mercado de destino de cada uno como Nacional (N) o Internacional (I).",
    pregunta: "¿Cuál es el espacio muestral (S) de los mercados de destino de ambos cargamentos y el suceso (E) de que al menos uno de ellos tenga destino Internacional (I)?",
    opciones: [
      "S = {NN, NI, IN, II}, E = {NI, IN, II}",
      "S = {NN, NI, IN, II}, E = {II}",
      "S = {N, I}, E = {I}",
      "S = {NN, II}, E = {NI, IN}"
    ],
    correcta: 0,
    retroalimentacion: "La clasificación de destinos para dos cargamentos genera 4 posibilidades. El suceso 'al menos uno de destino internacional' incluye los resultados con uno o dos destinos internacionales, por lo que E = {NI, IN, II}."
  },
  {
    id: 28,
    municipio: "Orito",
    tema: "Polinización de Mariposas Morpho",
    contexto: "En un mariposario de Orito, un biólogo observa el vuelo de dos espectaculares mariposas morpho azules y registra si se posan en flores de orquídeas (O) o de heliconias (H).",
    pregunta: "¿Cuál es el espacio muestral (S) de los posaderos elegidos por las dos mariposas y el suceso (E) de que ambas elijan posarse sobre orquídeas (O)?",
    opciones: [
      "S = {OO, OH, HO, HH}, E = {OO}",
      "S = {OO, OH, HO, HH}, E = {OH, HO, HH}",
      "S = {O, H}, E = {O}",
      "S = {OO, HH}, E = {OH, HO}"
    ],
    correcta: 0,
    retroalimentacion: "Las combinaciones de posaderos de dos mariposas son 4. El suceso de que ambas seleccionen orquídeas se reduce al único elemento donde ambas eligen orquídea: E = {OO}."
  },
  {
    id: 29,
    municipio: "Puerto Guzmán",
    tema: "Producción de Plátano Hartón",
    contexto: "Un agricultor de Puerto Guzmán inspecciona la sanidad de dos racimos de plátano recién recolectados de su plantación familiar, clasificando cada racimo como Aceptable (A) o Defectuoso (D) por manchas de insectos.",
    pregunta: "¿Cuál es el espacio muestral (S) de los dos racimos evaluados y el suceso (E) de que exactamente uno de ellos sea Aceptable (A)?",
    opciones: [
      "S = {AA, AD, DA, DD}, E = {AD, DA}",
      "S = {AA, DD}, E = {AD}",
      "S = {A, D}, E = {A}",
      "S = {AA, AD, DA, DD}, E = {AA, DD}"
    ],
    correcta: 0,
    retroalimentacion: "La combinación de estados para dos racimos de plátano da 4 resultados posibles. El suceso 'exactamente un racimo aceptable' corresponds a las parejas mixtas: E = {AD, DA}."
  },
  {
    id: 30,
    municipio: "Valle del Sibundoy",
    tema: "Pintura Tradicional",
    contexto: "En Sibundoy, un joven de la comunidad Kamëntsá selecciona al azar una pintura de origen natural para colorear un cuadro de la chagra de su abuelo. Su paleta tiene colores Amarillo (A), Verde (V) o Negro (N).",
    pregunta: "¿Cuál es el espacio muestral (S) del color seleccionado y el suceso (E) de que el color elegido no sea Negro (N)?",
    opciones: [
      "S = {A, V, N}, E = {A, V}",
      "S = {A, V, N}, E = {N}",
      "S = {A, V}, E = {A, V, N}",
      "S = {Amarillo, Verde}, E = {Amarillo}"
    ],
    correcta: 0,
    retroalimentacion: "El espacio muestral agrupa los tres colores disponibles S = {A, V, N}. El suceso de que no se elija el color Negro corresponde a las opciones restantes, resultando en E = {A, V}."
  }
];
