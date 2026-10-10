import React, { useState } from 'react';
import { X, Smartphone, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

interface DesignMockupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DesignMockupModal: React.FC<DesignMockupModalProps> = ({ isOpen, onClose }) => {
  const [selectedMockup, setSelectedMockup] = useState<'A' | 'B'>('A');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#1A1D20] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden text-stone-100">
        
        {/* Encabezado del modal */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-stone-900/80">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
              <Smartphone size={22} />
            </span>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-amber-200">
                Bocetos de Ejemplo — Propuesta Móvil
              </h3>
              <p className="text-xs text-stone-400">
                Visualización previa antes de realizar cualquier cambio en el código
              </p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
            title="Cerrar vista previa"
          >
            <X size={20} />
          </button>
        </div>

        {/* Selector de Bocetos A / B */}
        <div className="flex border-b border-white/10 bg-stone-950/40 p-2 gap-2">
          <button
            onClick={() => setSelectedMockup('A')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              selectedMockup === 'A'
                ? 'bg-amber-600/30 text-amber-200 border border-amber-500/40 shadow-lg'
                : 'bg-stone-900/60 text-stone-400 hover:bg-stone-800 hover:text-stone-200'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-amber-500/30 flex items-center justify-center text-[10px] font-bold">A</span>
            <span>Boceto A: Reproductor Superior + Marquesina Viva</span>
          </button>

          <button
            onClick={() => setSelectedMockup('B')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              selectedMockup === 'B'
                ? 'bg-amber-600/30 text-amber-200 border border-amber-500/40 shadow-lg'
                : 'bg-stone-900/60 text-stone-400 hover:bg-stone-800 hover:text-stone-200'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-amber-500/30 flex items-center justify-center text-[10px] font-bold">B</span>
            <span>Boceto B: Quiosco de Revistas + Parrilla de Categorías</span>
          </button>
        </div>

        {/* Contenido interactivo del boceto */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          
          {/* Imagen de maqueta en móvil */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-2xl bg-black max-w-[280px] sm:max-w-[320px] aspect-[9/16]">
              {selectedMockup === 'A' ? (
                <img 
                  src="/src/assets/images/mobile_player_header_1791586633385.jpg" 
                  alt="Boceto A: Reproductor compacto y marquesina"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <img 
                  src="/src/assets/images/mobile_content_hub_1791586648332.jpg" 
                  alt="Boceto B: Parrilla de contenidos y quiosco"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
            <span className="text-[11px] font-mono text-stone-400 mt-2 uppercase tracking-wider">
              {selectedMockup === 'A' ? 'Vista superior: Radio & Ticker' : 'Vista central: Contenidos & Ateneo'}
            </span>
          </div>

          {/* Explicación detallada de la opción */}
          <div className="space-y-4 text-stone-300 text-sm">
            {selectedMockup === 'A' ? (
              <>
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40">
                  <h4 className="font-serif text-base font-bold text-amber-300 mb-1 flex items-center gap-2">
                    <CheckCircle2 size={16} /> Plano Superior Inmediato (Pantalla + Radio)
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Apenas abres la aplicación en el celular, el video y la radio están listos para sonar. Sin títulos estáticos gigantescos que te hagan scrollear.
                  </p>
                </div>

                <div className="space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-widest text-amber-400 font-mono">
                    Detalles clave del Boceto A:
                  </h5>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span><strong>Marquesina Digital (Ticker):</strong> Concentra en una sola cinta de 30px la fecha, "🟢 120 Nexólogos en línea, bienvenidos" y la pista que suena. Ahorra 180px verticales.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span><strong>Botones rápidos de acceso:</strong> Tres botones destacados: <em>Revista Digital</em>, <em>Podcast MP4</em> y <em>Podcast MP3</em>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span><strong>Controles táctiles optimizados:</strong> Botones de Play/Pausa y Siguiente amplios y cómodos para pulsar con el pulgar.</span>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40">
                  <h4 className="font-serif text-base font-bold text-amber-300 mb-1 flex items-center gap-2">
                    <Layers size={16} /> Quiosco Abierto y Parrilla de Secciones
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Resuelve el problema de que los números de la revista y las secciones queden ocultos en menús desplegables. Todo queda expuesto a un solo toque.
                  </p>
                </div>

                <div className="space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-widest text-amber-400 font-mono">
                    Detalles clave del Boceto B:
                  </h5>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span><strong>Estante de Revistas Digitales:</strong> Deslizador horizontal táctil con las portadas completas (Casandra, Águila, Educación, Sequía...), con etiquetas de "Última Edición" y botón directo a Heyzine/PDF.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span><strong>Parrilla en 2 Columnas:</strong> Tarjetas cuadradas táctiles: <em>Libros</em>, <em>Biografías</em>, <em>Reportajes</em>, <em>Música del Nexo</em>, <em>Películas</em> y <em>Podcasts</em>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span><strong>Navegación limpia:</strong> El usuario elige exactamente qué desea explorar sin perderse en una sola lista mezclada.</span>
                    </li>
                  </ul>
                </div>
              </>
            )}

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-stone-400">
                ¿Qué te parece esta distribución?
              </span>
              <button
                onClick={() => setSelectedMockup(selectedMockup === 'A' ? 'B' : 'A')}
                className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 font-bold transition-colors"
              >
                <span>Ver Boceto {selectedMockup === 'A' ? 'B' : 'A'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Pie del modal */}
        <div className="px-5 py-3 border-t border-white/10 bg-stone-900 flex items-center justify-between">
          <p className="text-xs text-stone-400">
            Aún no se ha modificado el código de la app. Estamos evaluando los bocetos.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold rounded-lg transition-colors"
          >
            Entendido / Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};

export default DesignMockupModal;
