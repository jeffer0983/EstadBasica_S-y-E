export interface Situation {
  id: number;
  municipio: string;
  tema: string;
  contexto: string;
  pregunta: string;
  opciones: string[];
  correcta: number;
  retroalimentacion: string;
}
