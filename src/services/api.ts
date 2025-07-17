import type { Frase, Usuario } from '../types';
const API_URL = 'http://localhost:3001';

class ApiService {
  private async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    return response.json();
  }

  async getFrases(): Promise<Frase[]> {
    const frases = await this.fetchData<Frase[]>('/frases.json');
    console.log("Frases leídas:", frases.length);
    return frases;
  }

  async getUsuarios(): Promise<Usuario[]> {
    return this.fetchData<Usuario[]>(`${API_URL}/usuarios`);
  }

  async getFraseAleatoria(): Promise<Frase> {
    const frases = await this.getFrases();
    const randomIndex = Math.floor(Math.random() * frases.length);
    return frases[randomIndex];
  }

  async authenticateUser(email: string, password: string): Promise<Usuario | null> {
    const usuarios = await this.getUsuarios();
    return usuarios.find(u => u.email === email && u.password === password) || null;
  }

  async getFrasesByIds(ids: number[]): Promise<Frase[]> {
    const frases = await this.getFrases();
    return frases.filter(frase => ids.includes(frase.id));
  }

  // Simulación de funciones CRUD (en una app real serían llamadas al backend)
  async createUser(userData: Omit<Usuario, 'id'>): Promise<Usuario> {
    const usuarios = await this.getUsuarios();

    const yaExiste = usuarios.some(u => u.email === userData.email);
    if (yaExiste) {
      throw new Error("Ya existe un usuario con ese correo");
    }

    const res = await fetch(`${API_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...userData, id: Number(Date.now())
      })
    });

    if (!res.ok) {
      throw new Error('Error al guardar el usuario');
    }

    return res.json();
  }

  async updateFavoritos(userId: number, nuevosFavoritos: number[]): Promise<Usuario> {
    const res = await fetch(`${API_URL}/usuarios/${Number(userId)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ favoritos: nuevosFavoritos })
    });

    if (!res.ok) throw new Error('No se pudieron actualizar los favoritos');
    return res.json();
  }



}

export const apiService = new ApiService();