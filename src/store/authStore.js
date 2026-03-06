import { create } from "zustand";

//custom hook
export const useAuthStore = create((set) => ({
    //Estado inicial
    isLoggedin: false,

    //Acciones
    login: () => set({ isLoggedIn: true }),
    logout: () => set({ isLoggedIn: false })
}))