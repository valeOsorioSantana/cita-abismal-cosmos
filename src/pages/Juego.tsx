import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { apiService } from '../services/api';
import type { Frase } from '../types';
import { cn } from '@/lib/utils';
import triviaCarImage from '../assets/trivia-cat.png';
import gatoFeliz from '../assets/feliz.png';
import gatoConfundido from '../assets/Confundido.png';
import gatoEnojado from '../assets/enojao.png';

interface OpcionRespuesta {
  autor: string;
  correcta: boolean;
}

export default function Juego() {
  const [frase, setFrase] = useState<Frase | null>(null);
  const [opciones, setOpciones] = useState<OpcionRespuesta[]>([]);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<string | null>(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [puntuacion, setPuntuacion] = useState({ correctas: 0, total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [catExpression, setCatExpression] = useState<'neutral' | 'happy' | 'sad' | 'angry'>('neutral');
  const [erroresConsecutivos, setErroresConsecutivos] = useState(0);

  const autoresAlternativos = [
    'Oscar Wilde', 'Virginia Woolf', 'Mark Twain', 'Maya Angelou',
    'Pablo Neruda', 'Gabriel García Márquez', 'Jorge Luis Borges',
    'Frida Kahlo', 'Winston Churchill', 'Mahatma Gandhi',
    'Steve Jobs', 'Nelson Mandela', 'Leonardo da Vinci'
  ];

  const cargarNuevaFrase = async () => {
    setIsLoading(true);
    setRespuestaSeleccionada(null);
    setMostrarResultado(false);
    setCatExpression('neutral');

    try {
      const nuevaFrase = await apiService.getFraseAleatoria();
      setFrase(nuevaFrase);

      // Crear opciones: una correcta y dos incorrectas
      const opcionesIncorrectas = autoresAlternativos
        .filter(autor => autor !== nuevaFrase.autor)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);

      const todasLasOpciones = [
        { autor: nuevaFrase.autor, correcta: true },
        { autor: opcionesIncorrectas[0], correcta: false },
        { autor: opcionesIncorrectas[1], correcta: false }
      ].sort(() => Math.random() - 0.5);

      setOpciones(todasLasOpciones);
      setCatExpression('neutral');
    } catch (error) {
      console.error('Error al cargar frase:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const manejarRespuesta = (autorSeleccionado: string) => {
    if (mostrarResultado) return;

    setRespuestaSeleccionada(autorSeleccionado);
    setMostrarResultado(true);

    const opcionSeleccionada = opciones.find(op => op.autor === autorSeleccionado);
    const esCorrecta = opcionSeleccionada?.correcta || false;

    setPuntuacion(prev => ({
      correctas: prev.correctas + (esCorrecta ? 1 : 0),
      total: prev.total + 1
    }));

    // Reinicia errores consecutivos si es correcta, suma si es incorrecta
    setErroresConsecutivos(prev => esCorrecta ? 0 : prev + 1);

    // Cambiar expresión del gato según la respuesta
    setCatExpression(esCorrecta ? 'happy' : 'sad');
  };

  const reiniciarJuego = () => {
    setPuntuacion({ correctas: 0, total: 0 });
    setErroresConsecutivos(0);
    setCatExpression('neutral');
    cargarNuevaFrase();
  };

  useEffect(() => {
    cargarNuevaFrase();
  }, []);

  useEffect(() => {
    if (erroresConsecutivos > 4) {
      setCatExpression('angry');
    } else if (catExpression === 'angry') {
      setCatExpression('neutral');
    }
  }, [erroresConsecutivos, catExpression]);

  const getThemeColor = (tema: string) => {
    const themes = {
      'filosofía': 'text-mystic-purple',
      'literatura': 'text-mystic-indigo',
      'espiritualidad': 'text-mystic-gold',
      'ciencia': 'text-cyan-400',
      'psicología': 'text-purple-400',
      'inspiración': 'text-orange-400'
    };
    return themes[tema as keyof typeof themes] || 'text-muted-foreground';
  };

  const porcentajeAciertos = puntuacion.total > 0
    ? Math.round((puntuacion.correctas / puntuacion.total) * 100)
    : 0;

  const catImageMap: Record<typeof catExpression, string> = {
    happy: gatoFeliz,
    sad: gatoConfundido,
    neutral: triviaCarImage,
    angry: gatoEnojado,
  };


  const getCatMessage = () => {
    if (catExpression === 'happy') return '¡Perfecto! 🎉';
    if (catExpression === 'sad') return 'Mmm... no era esa 🤔';
    if (catExpression === 'angry') return '¡Ya van muchas malas! 😾';
    if (catExpression === 'neutral') return '';
  };

  return (
    <div className="min-h-screen bg-gradient-cosmic">
      {/* Header */}
      <header className="border-b border-border backdrop-blur-sm bg-background/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/inicio">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver
              </Button>
            </Link>
            <h1 className="text-2xl font-serif font-bold text-mystic-gold">
              Trivia Literaria
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              {puntuacion.correctas}/{puntuacion.total} ({porcentajeAciertos}%)
            </div>
            <Button variant="outline" size="sm" onClick={reiniciarJuego}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reiniciar
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold mb-4 text-foreground">
            ¿Quién dijo esta frase?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Pon a prueba tu conocimiento sobre grandes pensadores y escritores
          </p>
        </div>

        {isLoading ? (
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 bg-gradient-cosmic border-border">
              <div className="animate-none space-y-6">
                <div className="h-6 bg-muted rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
                <div className="space-y-3">
                  <div className="h-12 bg-muted rounded"></div>
                  <div className="h-12 bg-muted rounded"></div>
                  <div className="h-12 bg-muted rounded"></div>
                </div>
              </div>
            </Card>
          </div>
        ) : frase ? (
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Gato con globo de diálogo */}
            <div className="flex flex-col items-center space-y-4">
              {/* Globo de diálogo */}
              <div className="relative bg-gradient-cosmic border-border border-2 rounded-3xl p-6 shadow-2xl max-w-2xl">
                {/* Punta del globo */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                  <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[20px] border-l-transparent border-r-transparent border-t-border"></div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-[18px]">
                    <div className="w-0 h-0 border-l-[18px] border-r-[18px] border-t-[18px] border-l-transparent border-r-transparent border-t-[hsl(var(--background))]"></div>
                  </div>
                </div>

                {/* Contenido del globo */}
                <blockquote className="text-lg md:text-xl font-light leading-relaxed text-center mb-4">
                  <span className="text-mystic-gold text-2xl">"</span>
                  {frase.texto}
                  <span className="text-mystic-gold text-2xl">"</span>
                </blockquote>

                <div className="text-center">
                  <span className={cn(
                    "inline-block px-3 py-1 rounded-full text-sm font-medium",
                    "bg-muted/30 border border-border",
                    getThemeColor(frase.tema)
                  )}>
                    {frase.tema}
                  </span>
                </div>
              </div>

              {/* Gato */}
              <div className="relative">
                <img
                  src={catImageMap[catExpression]}
                  alt={`Gato ${catExpression}`}
                  className={cn(
                    "w-32 h-32 object-contain transition-all duration-300",
                    catExpression === 'happy' && "animate-bounce",
                    catExpression === 'sad' && "grayscale",
                    catExpression === 'neutral' && "animate-none"
                  )}
                />

                {/* Mensaje del gato */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                  <div className={cn(
                    "rounded-full font-medium transition-all duration-300",
                    "bg-muted/90 border border-border backdrop-blur-sm",
                    catExpression === 'happy' && "px-3 py-1 text-sm bg-green-500/20 text-green-400 border-green-500/30",
                    catExpression === 'sad' && "px-8 py-1 text-xs min-w-[195px] max-w-[800px] whitespace-normal bg-red-500/20 text-red-400 border-red-500/30",
                    catExpression === 'angry' && "px-10 py-1 text-xs min-w-[235px] text-red-300 bg-red-500/10 border-red-500/30",
                    catExpression === 'neutral' && "px-3 py-1 text-sm bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                  )}>
                    {getCatMessage()}
                  </div>
                </div>
              </div>
            </div>

            {/* Opciones */}
            <Card className="p-6 bg-gradient-cosmic border-border">
              <div className="space-y-3">
                {opciones.map((opcion, index) => {
                  const isSelected = respuestaSeleccionada === opcion.autor;
                  const showResult = mostrarResultado;
                  const isCorrect = opcion.correcta;

                  let buttonVariant: "default" | "outline" | "destructive" = "outline";
                  let extraClasses = "";

                  if (showResult && isCorrect) {
                    extraClasses = "border-green-500 bg-green-500/10 text-green-400";
                  } else if (showResult && isSelected && !isCorrect) {
                    extraClasses = "border-destructive bg-destructive/10 text-destructive";
                  }

                  return (
                    <Button
                      key={index}
                      onClick={() => manejarRespuesta(opcion.autor)}
                      disabled={mostrarResultado}
                      className={cn(
                        "w-full h-auto p-4 text-left justify-start",
                        "border-border hover:bg-muted/20",
                        "transition-all duration-200",
                        extraClasses
                      )}
                      variant={buttonVariant}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium">{opcion.autor}</span>
                        {showResult && isCorrect && (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        )}
                        {showResult && isSelected && !isCorrect && (
                          <XCircle className="h-5 w-5 text-destructive" />
                        )}
                      </div>
                    </Button>
                  );
                })}
              </div>

              {mostrarResultado && (
                <div className="mt-6 text-center space-y-4">
                  <div className={cn(
                    "p-4 rounded-lg",
                    opciones.find(op => op.autor === respuestaSeleccionada)?.correcta
                      ? "bg-green-500/10 text-green-400"
                      : "bg-destructive/10 text-destructive"
                  )}>
                    {opciones.find(op => op.autor === respuestaSeleccionada)?.correcta
                      ? "¡Correcto! 🎉"
                      : `Incorrecto. La respuesta correcta es: ${frase.autor}`
                    }
                  </div>

                  <Button
                    onClick={cargarNuevaFrase}
                    className="bg-gradient-mystic hover:opacity-90"
                  >
                    Siguiente frase
                  </Button>
                </div>
              )}
            </Card>
          </div>
        ) : null}
      </main>
    </div>
  );
}