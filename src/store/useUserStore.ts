import { create } from 'zustand';
import { apiService } from '../services/api';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  favoritos: number[];
}

interface UserStore {
  usuario: Usuario | null;
  isLoggedIn: boolean;
  setUsuario: (usuario: Usuario) => void;
  logout: () => void;
  addFavorito: (fraseId: number) => Promise<void>;
  removeFavorito: (fraseId: number) => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  usuario: null,
  isLoggedIn: false,

  setUsuario: (usuario) => {
    set({ usuario, isLoggedIn: true });
    localStorage.setItem('usuario', JSON.stringify(usuario)); // 🟢 GUARDAR EN LOCALSTORAGE
  },

  logout: () => {
    set({ usuario: null, isLoggedIn: false });
    localStorage.removeItem('usuario'); // 🔴 BORRAR DE LOCALSTORAGE
  },

  addFavorito: async (fraseId) => {
    const { usuario } = get();
    if (!usuario || usuario.favoritos.includes(fraseId)) return;

    const nuevosFavoritos = [...usuario.favoritos, fraseId];
    const usuarioActualizado = await apiService.updateFavoritos(usuario.id, nuevosFavoritos);

    set({ usuario: usuarioActualizado });
    localStorage.setItem('usuario', JSON.stringify(usuarioActualizado)); // 🔄 ACTUALIZAR LOCALSTORAGE
  },

  removeFavorito: async (fraseId) => {
    const { usuario } = get();
    if (!usuario || !usuario.favoritos.includes(fraseId)) return;

    const nuevosFavoritos = usuario.favoritos.filter(id => id !== fraseId);
    const usuarioActualizado = await apiService.updateFavoritos(usuario.id, nuevosFavoritos);

    set({ usuario: usuarioActualizado });
    localStorage.setItem('usuario', JSON.stringify(usuarioActualizado)); // 🔄 ACTUALIZAR LOCALSTORAGE
  }
}));
