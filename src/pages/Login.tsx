import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { useUserStore } from '../store/useUserStore';
import { apiService } from '../services/api';
import { cn } from '@/lib/utils';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const emailRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const setUsuario = useUserStore((state) => state.setUsuario);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const usuario = await apiService.authenticateUser(email, password);
      if (usuario) {
        setUsuario(usuario);
        navigate('/inicio');
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-cosmic flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-gradient-cosmic border-border shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
            Bienvenido de vuelta
          </h1>
          <p className="text-muted-foreground">
            Ingresa para acceder a tu grimorio personal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              ref={emailRef}
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-mystic-card border-border"
              placeholder="tu@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-mystic-card border-border"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="text-destructive text-sm text-center bg-destructive/10 p-3 rounded-lg">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className={cn(
              "w-full bg-gradient-mystic hover:opacity-90",
              "transition-opacity duration-200"
            )}
          >
            {isLoading ? 'Ingresando...' : 'Iniciar Sesión'}
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            ¿No tienes cuenta?{' '}
            <Link to="/registro" className="text-mystic-purple hover:text-mystic-gold transition-colors">
              Regístrate aquí
            </Link>
          </p>
        </form>

        <div className="mt-8 text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors mt-2 block">
            ← Volver al inicio
          </Link>
        </div>
      </Card>
    </div>
  );
}