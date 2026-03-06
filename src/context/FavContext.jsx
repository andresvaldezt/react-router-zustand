import { createContext, useState, use } from "react";

export const FavoritesContext = createContext()

export function favoritesProvider ({ children }) {
    const [favorites, setFavorites] = useState([])

    const addFavorite = (job) =>{
        setFavorites((prevFavorites) => [...prevFavorites, job])
    }

    const removeFavorites = (jobId) => {
        setFavorites((prevFavorites) =>{
            prevFavorites.filter((job) => job.id !== jobId)
        })
    }

    const isFavorite = (jobId) => {
        return favorites.some((job) => job.id === jobId)
    }

    const value = {
        favorites,
        addFavorite,
        removeFavorites,
        isFavorite
    }

    return (
        <FavoritesContext>
            {children}
        </FavoritesContext>
    )

}

export function useFavorites() {
    const context = use(FavoritesContext)

    if (context === undefined){
        throw new Error('useFavorites must be used within an AuthProvider')
    }

    return context
}