import { create } from "zustand";

//custom hook
export const useApplyStore = create((set, get) => ({
    //Estado inicial
    jobApplications: [],

    //Acciones
    addApplication: (jobId) => {
        set((state) => ({ 
            jobApplications: state.jobApplications.includes(jobId)
            ? state.jobApplications
            : [...state.jobApplications, jobId]
        }))
    },

    removeApplication: (jobId) => {
        set((state) => ({
            jobApplications: state.jobApplications.filter((id) => id !== jobId)
        }))
    },

    isApplied: (jobId) => {
        return get().jobApplications.includes(jobId)
    },

    toggleApplication: (jobId) => {
        const { addApplication, removeApplication, isApplied, jobApplications} = get()
        const isApp = isApplied(jobId)
        isApp ? removeApplication(jobId) : addApplication(jobId)
    },

    countApplied: () => get().jobApplications.length

}))