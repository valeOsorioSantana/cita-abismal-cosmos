import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { cn } from '@/lib/utils';
import { BookOpen, 	Eye, Sparkles } from "lucide-react";


export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-cosmic flex items-center justify-center p-4">
      <div className="text-center space-y-10 max-w-2xl">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold bg-gradient-mystic bg-clip-text text-transparent">
            Susurros del Abismo
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light">
            Descubre frases que transforman el alma
          </p>
        </div>

        <div className="flex flex-col items-center space-y-10">
          <p className="text-lg text-foreground/80 max-w-lg text-center">
            Sumérgete en un mundo de sabiduría donde cada palabra
            resuena con el eco de grandes pensadores y visionarios.
          </p>

          <Link to="/inicio">
            <Button
              size="lg"
              className={cn(
                "text-lg px-8 py-6 font-serif",
                "bg-gradient-mystic hover:opacity-90",
                "transition-all duration-300",
                "hover:scale-105 hover:shadow-lg hover:shadow-mystic-purple/25"
              )}
            >
              Ingresar al abismo
            </Button>
          </Link>
        </div>


        <div className="space-y-2 pt-8">
          <p className="text-muted-foreground text-sm">
            Explora categorías como:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <BookOpen className="w-8 h-8 text-mystic-gold" />
              </div>
              <h3 className="font-serif text-lg text-mystic-gold">Literatura</h3>
              <p className="text-sm text-muted-foreground">
                Palabras que trascienden el tiempo
              </p>
            </div>
            <div className="text-center space-y-2">
<div className="flex justify-center">
  <	Eye className="w-8 h-8 text-mystic-gold" />
</div>

              <h3 className="font-serif text-lg text-mystic-gold">Filosofía</h3>
              <p className="text-sm text-muted-foreground">
                Reflexiones profundas del ser
              </p>
            </div>
            <div className="text-center space-y-2">
<div className="flex justify-center">
  <Sparkles className="w-8 h-8 text-mystic-gold" />
</div>
              <h3 className="font-serif text-lg text-mystic-gold">Espiritualidad</h3>
              <p className="text-sm text-muted-foreground">
                Conexión con lo trascendente
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
