import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Book, Gamepad2, LogOut, User } from 'lucide-react';
import { FraseCard } from '../components/FraseCard';
import { Button } from '../components/ui/button';
import { apiService } from '../services/api';
import { useUserStore } from '../store/useUserStore';
import type { Frase } from '../types';

export default function Inicio() {
  const [frases, setFrases] = useState<Frase[]>([]);
  const [fraseActual, setFraseActual] = useState<Frase | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { usuario, isLoggedIn, logout, setUsuario } = useUserStore();



  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      try {
        setUsuario(JSON.parse(usuarioGuardado));
      } catch (error) {
        console.error('Error leyendo usuario desde localStorage:', error);
      }
    }
  },[setUsuario]);


  // Cargar todas las frases una vez al inicio
  useEffect(() => {
    const cargarFrases = async () => {
      setIsLoading(true);
      try {
        const todas = await apiService.getFrases(); // ← frases.json
        setFrases(todas);

        const random = todas[Math.floor(Math.random() * todas.length)];
        setFraseActual(random);
      } catch (error) {
        console.error('Error al cargar frases:', error);
      } finally {
        setIsLoading(false);
      }
    };

    cargarFrases();
  }, []);

  // Función para mostrar otra frase aleatoria (evita repetir la misma)
  const handleNuevaFrase = () => {
    if (frases.length === 0) return;

    let nueva;
    do {
      nueva = frases[Math.floor(Math.random() * frases.length)];
    } while (nueva.id === fraseActual?.id && frases.length > 1);

    setFraseActual(nueva);
  };

  return (
    <div className="min-h-screen bg-gradient-cosmic">
      {/* Header */}
      <header className="border-b border-border backdrop-blur-sm bg-background/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="font-serif text-xl font-bold text-mystic-gold">
            Susurros del Abismo
          </Link>

          <nav className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <Home className="mr-2 h-4 w-4" />
                Inicio
              </Button>
            </Link>

            <Link to="/grimorio">
              <Button variant="ghost" size="sm">
                <Book className="mr-2 h-4 w-4" />
                Grimorio
              </Button>
            </Link>

            <Link to="/juego">
              <Button variant="ghost" size="sm">
                <Gamepad2 className="mr-2 h-4 w-4" />
                Trivia
              </Button>
            </Link>

            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground flex items-center">
                  <User className="mr-1 h-3 w-3" />
                  {usuario?.nombre}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-destructive hover:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Salir
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Iniciar Sesión
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">
            Palabras que Iluminan
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Cada cita es una ventana hacia la sabiduría universal
          </p>
        </div>

        {fraseActual ? (
          <FraseCard
            frase={fraseActual}
            onNuevaFrase={handleNuevaFrase}
            isLoading={isLoading}
          />
        ) : (
          <div className="text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-muted rounded-lg max-w-2xl mx-auto"></div>
              <div className="h-6 bg-muted rounded-lg max-w-md mx-auto"></div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
