import React, { useState, useMemo } from 'react';
import { 
  FileSpreadsheet, 
  Download, 
  Search, 
  ExternalLink, 
  Copy, 
  Check, 
  X, 
  Layers, 
  BookOpen, 
  FileText, 
  Video, 
  Headphones, 
  Radio, 
  Music, 
  Globe, 
  Sparkles,
  Lock
} from 'lucide-react';
import { 
  getResumenRows,
  getColeccionesExclusivasRows,
  getRevistasRows,
  getDocumentosRows,
  getPodcastsVideoRows,
  getPodcastsAudioRows,
  getMicroprogramasRows,
  getMusicaLeoRows,
  getArticulosRows,
  getPostalesRows,
  getLibrosRows,
  getRedesRows,
  downloadMasterExcelFile,
  downloadSheetAsCSV,
  type InventoryRow
} from '../utils/masterInventory.ts';

interface MasterInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabKey = 
  | 'resumen' 
  | 'colecciones'
  | 'documentos'
  | 'revistas' 
  | 'podcasts-mp3'
  | 'podcasts-mp4' 
  | 'microprogramas' 
  | 'musica-leo' 
  | 'articulos' 
  | 'postales' 
  | 'libros' 
  | 'redes';

export const MasterInventoryModal: React.FC<MasterInventoryModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('resumen');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Cargar colecciones
  const summaryData = useMemo(() => getResumenRows(), []);
  const colecciones = useMemo(() => getColeccionesExclusivasRows(), []);
  const documentos = useMemo(() => getDocumentosRows(), []);
  const revistas = useMemo(() => getRevistasRows(), []);
  const podcastsAudio = useMemo(() => getPodcastsAudioRows(), []);
  const podcastsVideo = useMemo(() => getPodcastsVideoRows(), []);
  const microprogramas = useMemo(() => getMicroprogramasRows(), []);
  const musicaLeo = useMemo(() => getMusicaLeoRows(), []);
  const articulos = useMemo(() => getArticulosRows(), []);
  const postales = useMemo(() => getPostalesRows(), []);
  const libros = useMemo(() => getLibrosRows(), []);
  const redes = useMemo(() => getRedesRows(), []);

  // Filtrar según pestaña activa y búsqueda
  const currentItems = useMemo((): InventoryRow[] => {
    let list: InventoryRow[] = [];
    switch (activeTab) {
      case 'colecciones': list = colecciones; break;
      case 'documentos': list = documentos; break;
      case 'revistas': list = revistas; break;
      case 'podcasts-mp3': list = podcastsAudio; break;
      case 'podcasts-mp4': list = podcastsVideo; break;
      case 'microprogramas': list = microprogramas; break;
      case 'musica-leo': list = musicaLeo; break;
      case 'articulos': list = articulos; break;
      case 'postales': list = postales; break;
      case 'libros': list = libros; break;
      case 'redes': list = redes; break;
      default: list = []; break;
    }

    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter(item => 
      item.Titulo.toLowerCase().includes(q) ||
      item.Descripcion_O_Resena.toLowerCase().includes(q) ||
      item.ID.toLowerCase().includes(q) ||
      item.Autor_O_Artista.toLowerCase().includes(q) ||
      item.Formato.toLowerCase().includes(q)
    );
  }, [activeTab, searchQuery, colecciones, documentos, revistas, podcastsAudio, podcastsVideo, microprogramas, musicaLeo, articulos, postales, libros, redes]);

  const handleCopyLink = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadExcel = () => {
    setIsExporting(true);
    try {
      downloadMasterExcelFile('El_Nexo_Digital_Planilla_Maestra.xlsx');
    } catch (e) {
      console.error('Error generando Excel:', e);
    } finally {
      setTimeout(() => setIsExporting(false), 1000);
    }
  };

  const handleDownloadCurrentCSV = () => {
    downloadSheetAsCSV(activeTab);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-stone-900 border border-amber-600/30 rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Cabecera del Panel Privado */}
        <div className="p-4 sm:p-6 border-b border-stone-800 bg-stone-950/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 shadow-lg shadow-amber-900/30">
              <FileSpreadsheet className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase font-semibold flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" /> Acceso Editorial Privado
                </span>
                <span className="text-[10px] font-mono text-stone-400">
                  v1.0 • Formato Excel Multitab
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-100 tracking-tight mt-0.5">
                Planilla Maestra de Contenidos
              </h2>
              <p className="text-xs text-stone-400 font-sans">
                Inventario consolidado y organizado por pestañas para descarga a tu computadora y control editorial.
              </p>
            </div>
          </div>

          {/* Acciones principales de descarga */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={handleDownloadExcel}
              disabled={isExporting}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-sm shadow-lg shadow-emerald-950/40 hover:shadow-emerald-900/60 transition-all cursor-pointer active:scale-95 disabled:opacity-60"
              title="Descargar libro de Excel completo con 12 pestañas organizadas"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Generando Excel...' : 'Descargar Planilla (.xlsx)'}</span>
            </button>

            <button
              onClick={handleDownloadCurrentCSV}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono border border-stone-700 transition-colors cursor-pointer"
              title="Descargar datos actuales en formato CSV (texto separado por comas)"
            >
              <FileText className="w-3.5 h-3.5 text-stone-400" />
              <span className="hidden md:inline">Descargar CSV</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors cursor-pointer"
              title="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Barra de pestañas organizadas por categoría */}
        <div className="border-b border-stone-800 bg-stone-950/40 px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
          <button
            onClick={() => { setActiveTab('resumen'); setSearchQuery(''); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'resumen'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>00. Resumen Panorama</span>
          </button>

          <button
            onClick={() => { setActiveTab('colecciones'); setSearchQuery(''); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'colecciones'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>01. Colecciones Exclusivas ({colecciones.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('documentos'); setSearchQuery(''); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'documentos'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>02. Documentos Extensos ({documentos.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('revistas'); setSearchQuery(''); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'revistas'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>03. Revistas & Flipbooks ({revistas.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('podcasts-mp3'); setSearchQuery(''); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'podcasts-mp3'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
            }`}
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>04. Podcasts Audio ({podcastsAudio.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('podcasts-mp4'); setSearchQuery(''); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'podcasts-mp4'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>05. Podcasts Video ({podcastsVideo.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('microprogramas'); setSearchQuery(''); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'microprogramas'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>06. Micros & Spots ({microprogramas.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('musica-leo'); setSearchQuery(''); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'musica-leo'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>07. Música Leo ({musicaLeo.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('articulos'); setSearchQuery(''); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'articulos'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>08. Artículos ({articulos.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('postales'); setSearchQuery(''); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'postales'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>09. Postales ({postales.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('libros'); setSearchQuery(''); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'libros'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>10. Libros ({libros.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('redes'); setSearchQuery(''); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'redes'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>11. Redes ({redes.length})</span>
          </button>
        </div>

        {/* Buscador interno para cuando se mira una pestaña de datos */}
        {activeTab !== 'resumen' && (
          <div className="p-3 bg-stone-950/20 border-b border-stone-800/80 flex items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
              <input
                type="text"
                placeholder={`Filtrar en esta pestaña por título, ID o descripción...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500/60 font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="text-xs font-mono text-stone-400">
              Mostrando <strong className="text-amber-400">{currentItems.length}</strong> registros
            </div>
          </div>
        )}

        {/* Cuerpo del contenido (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-900/60">
          {activeTab === 'resumen' ? (
            <div className="space-y-6">
              {/* Tarjetas de métricas clave */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="bg-stone-950/60 border border-stone-800 rounded-xl p-3.5 flex flex-col">
                  <span className="text-stone-500 text-[10px] uppercase font-mono tracking-wider">Colecciones Exclusivas</span>
                  <span className="text-2xl font-bold font-mono text-amber-400 mt-1">{colecciones.length}</span>
                  <span className="text-[11px] text-stone-400 mt-0.5">Series y episodios MP3</span>
                </div>
                <div className="bg-stone-950/60 border border-stone-800 rounded-xl p-3.5 flex flex-col">
                  <span className="text-stone-500 text-[10px] uppercase font-mono tracking-wider">Documentos & Dossiers</span>
                  <span className="text-2xl font-bold font-mono text-emerald-400 mt-1">{documentos.length}</span>
                  <span className="text-[11px] text-stone-400 mt-0.5">Ensayos, Word y PDF</span>
                </div>
                <div className="bg-stone-950/60 border border-stone-800 rounded-xl p-3.5 flex flex-col">
                  <span className="text-stone-500 text-[10px] uppercase font-mono tracking-wider">Audios & Podcasts (MP3)</span>
                  <span className="text-2xl font-bold font-mono text-sky-400 mt-1">{podcastsAudio.length}</span>
                  <span className="text-[11px] text-stone-400 mt-0.5">Episodios y reflexiones</span>
                </div>
                <div className="bg-stone-950/60 border border-stone-800 rounded-xl p-3.5 flex flex-col">
                  <span className="text-stone-500 text-[10px] uppercase font-mono tracking-wider">Video Podcasts (MP4)</span>
                  <span className="text-2xl font-bold font-mono text-rose-400 mt-1">{podcastsVideo.length}</span>
                  <span className="text-[11px] text-stone-400 mt-0.5">Capítulos temáticos</span>
                </div>
                <div className="bg-stone-950/60 border border-stone-800 rounded-xl p-3.5 flex flex-col col-span-2 sm:col-span-1">
                  <span className="text-stone-500 text-[10px] uppercase font-mono tracking-wider">Música Original Leo</span>
                  <span className="text-2xl font-bold font-mono text-purple-400 mt-1">{musicaLeo.length}</span>
                  <span className="text-[11px] text-stone-400 mt-0.5">Catálogo de autor</span>
                </div>
              </div>

              {/* Explicación de la Planilla */}
              <div className="bg-stone-950/40 border border-amber-500/20 rounded-xl p-4 sm:p-5">
                <h3 className="text-sm font-semibold font-mono text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Estructura del archivo Excel descargable
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed mb-4">
                  El archivo <strong>El_Nexo_Digital_Planilla_Maestra.xlsx</strong> contiene un libro completo con <strong>13 pestañas organizadas</strong>. Cada fila representa un elemento con su identificador, enlaces directos a los videos/audios/documentos, sinopsis y carátulas.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-stone-800 text-stone-400 font-mono text-[11px]">
                        <th className="py-2 px-3">Pestaña en el Excel</th>
                        <th className="py-2 px-3">Cantidad</th>
                        <th className="py-2 px-3">Contenido y Formato</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-800/60 font-sans">
                      {summaryData.slice(1, summaryData.length - 1).map((row, idx) => (
                        <tr key={idx} className="hover:bg-stone-800/30">
                          <td className="py-2 px-3 font-mono font-medium text-stone-200">{row['MÉTRICA / CATEGORÍA']}</td>
                          <td className="py-2 px-3 font-mono text-amber-400 font-bold">{row['CANTIDAD DE ÍTEMS']}</td>
                          <td className="py-2 px-3 text-stone-400">{row['DESCRIPCIÓN Y FORMATO PRINCIPAL']}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Guía de procedimiento para Leo */}
              <div className="bg-stone-950/80 border border-stone-800 rounded-xl p-4 sm:p-5">
                <h4 className="text-xs font-mono font-semibold text-stone-200 uppercase tracking-wider mb-2">
                  💡 Procedimiento de actualización & Portadas:
                </h4>
                <ol className="text-xs text-stone-300 space-y-2 list-decimal list-inside">
                  <li>
                    <strong>Descarga la planilla</strong> haciendo clic en el botón verde arriba <em>&quot;Descargar Planilla (.xlsx)&quot;</em> y guárdala en tu computadora.
                  </li>
                  <li>
                    <strong>Columna de Carátula / Portada:</strong> Es la columna <strong>H (&quot;Enlace_Portada_O_Doc&quot;)</strong>. Ahí colocas el enlace directo a la imagen (Cloudinary, Drive, Unsplash, o tu servidor).
                  </li>
                  <li>
                    <strong>Columna de Archivo / Multimedia:</strong> Es la columna <strong>G (&quot;Enlace_Multimedia&quot;)</strong> para el PDF, Word (.docx), Audio MP3 o Video MP4.
                  </li>
                  <li>
                    <strong>Para sumar nuevo contenido:</strong> Solo anotas las filas nuevas con título, autor, descripción, link multimedia (Columna G) y link de portada (Columna H), y me pasas el enlace o los datos aquí para sincronizarlos en la app.
                  </li>
                </ol>
              </div>
            </div>
          ) : (
            /* Vista de tabla detallada para la pestaña seleccionada */
            <div className="space-y-4">
              <div className="overflow-x-auto border border-stone-800 rounded-xl bg-stone-950/70">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-stone-800 bg-stone-900/80 text-stone-400 font-mono text-[11px]">
                      <th className="py-2.5 px-3 whitespace-nowrap">ID</th>
                      <th className="py-2.5 px-3">Título / Nombre</th>
                      <th className="py-2.5 px-3">Autor / Intérprete</th>
                      <th className="py-2.5 px-3">Formato</th>
                      <th className="py-2.5 px-3 min-w-[280px]">Descripción / Sinopsis</th>
                      <th className="py-2.5 px-3 text-center">Portada / Carátula</th>
                      <th className="py-2.5 px-3 text-center">Enlace Multimedia</th>
                      <th className="py-2.5 px-3 text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/60 font-sans">
                    {currentItems.map((item) => (
                      <tr key={item.ID} className="hover:bg-stone-800/40 transition-colors">
                        <td className="py-2.5 px-3 font-mono text-[11px] text-amber-500/90 whitespace-nowrap">
                          {item.ID}
                        </td>
                        <td className="py-2.5 px-3 font-medium text-stone-200">
                          {item.Titulo}
                        </td>
                        <td className="py-2.5 px-3 text-stone-400 font-mono text-[11px] whitespace-nowrap">
                          {item.Autor_O_Artista}
                        </td>
                        <td className="py-2.5 px-3 text-stone-300 text-[11px] whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded bg-stone-800 border border-stone-700/60 text-[10px] font-mono">
                            {item.Formato}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-stone-400 text-xs leading-relaxed max-w-md">
                          <p className="line-clamp-2 hover:line-clamp-none transition-all cursor-pointer" title={item.Descripcion_O_Resena}>
                            {item.Descripcion_O_Resena || '—'}
                          </p>
                        </td>
                        <td className="py-2.5 px-3 text-center whitespace-nowrap">
                          {item.Enlace_Portada_O_Doc ? (
                            <div className="flex items-center justify-center gap-1.5">
                              {item.Enlace_Portada_O_Doc.match(/\.(jpg|jpeg|png|webp|gif)/i) || item.Enlace_Portada_O_Doc.includes('unsplash') || item.Enlace_Portada_O_Doc.includes('image/upload') ? (
                                <img 
                                  src={item.Enlace_Portada_O_Doc} 
                                  alt="Portada" 
                                  className="w-7 h-9 object-cover rounded border border-stone-700/80 shadow-sm"
                                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                                />
                              ) : null}
                              <a
                                href={item.Enlace_Portada_O_Doc}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-stone-800/90 hover:bg-stone-700 text-stone-300 hover:text-amber-300 text-[10px] font-mono transition-colors"
                                title="Ver carátula / portada"
                              >
                                <span>Ver</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            </div>
                          ) : (
                            <span className="text-stone-600 font-mono text-[11px]">—</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-center whitespace-nowrap">
                          {item.Enlace_Multimedia ? (
                            <a
                              href={item.Enlace_Multimedia}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-amber-400 text-[11px] font-mono transition-colors"
                              title="Abrir enlace multimedia en pestaña nueva"
                            >
                              <span>Abrir</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-stone-600 font-mono text-[11px]">—</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-center whitespace-nowrap">
                          {item.Enlace_Multimedia && (
                            <button
                              onClick={() => handleCopyLink(item.Enlace_Multimedia, item.ID)}
                              className="p-1.5 rounded bg-stone-800/80 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
                              title="Copiar enlace multimedia al portapapeles"
                            >
                              {copiedId === item.ID ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                    {currentItems.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-stone-500 font-mono text-xs">
                          No se encontraron registros que coincidan con la búsqueda.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Pie de modal con enlace directo y cierre */}
        <div className="p-3 sm:p-4 border-t border-stone-800 bg-stone-950/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-stone-400">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Archivo maestro sincronizado con la base de datos de la web</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/El_Nexo_Digital_Planilla_Maestra.xlsx"
              download="El_Nexo_Digital_Planilla_Maestra.xlsx"
              className="text-amber-400 hover:underline flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descarga directa estática (.xlsx)</span>
            </a>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MasterInventoryModal;
