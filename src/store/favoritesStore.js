import { create } from "zustand";

//custom hook
export const useFavoritesStore = create((set, get) => ({
    //Estado inicial
    favorites: [],

    //Acciones
    addFavorites: (jobId) => {
        set((state) => ({ 
            favorites: state.favorites.includes(jobId)
            ? state.favorites
            : [...state.favorites, jobId]
        }))
    },

    removeFavorites: (jobId) => {
        set((state) => ({
            favorites: state.favorites.filter((id) => id !== jobId)
        }))
    },

    isFavorite: (jobId) => {
        return get().favorites.includes(jobId)
    },

    toggleFavorite: (jobId) => {
        const { addFavorites, removeFavorites, isFavorite, favorites} = get()
        const isFav = isFavorite(jobId)
        isFav ? removeFavorites(jobId) : addFavorites(jobId)
    },

    countFavorites: () => get().favorites.length
    
}))