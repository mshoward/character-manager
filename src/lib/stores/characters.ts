import { writable } from 'svelte/store';
import type { V20DarkAgesCharacter } from '../types/character';

const STORAGE_KEY = 'v20-dark-ages-characters';

function createCharactersStore() {
  const initial: V20DarkAgesCharacter[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  
  const { subscribe, set, update } = writable<V20DarkAgesCharacter[]>(initial);

  return {
    subscribe,
    add: (character: V20DarkAgesCharacter) => {
      update(chars => {
        const newChars = [...chars, character];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newChars));
        return newChars;
      });
    },
    update: (updated: V20DarkAgesCharacter) => {
      update(chars => {
        const newChars = chars.map(c => c.id === updated.id ? updated : c);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newChars));
        return newChars;
      });
    },
    delete: (id: string) => {
      update(chars => {
        const newChars = chars.filter(c => c.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newChars));
        return newChars;
      });
    },
    reset: () => {
      set([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };
}

export const characters = createCharactersStore();