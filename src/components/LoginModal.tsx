import { useState, useRef, useEffect } from 'react';
import { Modal } from './ui/modal';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useUserStore } from '../store/useUserStore';
import { apiService } from '../services/api';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';


interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const emailRef = useRef<HTMLInputElement>(null);
  const setUsuario = useUserStore((state) => state.setUsuario);

  useEffect(() => {
    if (open && emailRef.current) {
      emailRef.current.focus();
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const usuario = await apiService.authenticateUser(email, password);
      if (usuario) {
        setUsuario(usuario);
        onOpenChange(false);
        setEmail('');
        setPassword('');
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
    <Modal open={open} onOpenChange={onOpenChange} title="Iniciar Sesión">
      <form onSubmit={handleSubmit} className="space-y-4">
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
          />
        </div>

        {error && (
          <div className="text-destructive text-sm">{error}</div>
        )}

        <div className="flex gap-2 pt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className={cn(
              "flex-1 bg-gradient-mystic hover:opacity-90",
              "transition-opacity duration-200"
            )}
          >
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-border hover:bg-muted"
          >
            Cancelar
          </Button>

        </div>
        <p className="text-sm text-muted-foreground text-center mt-4">
          ¿No tienes cuenta?{' '}
          <Link to="/registro" className="text-mystic-purple hover:text-mystic-gold transition-colors">
            Regístrate aquí
          </Link>
        </p>
      </form>
    </Modal>
  );
}