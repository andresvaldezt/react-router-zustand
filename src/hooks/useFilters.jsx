import { useEffect, useState } from 'react'
import { useRouter } from "../hooks/useRouter"

const RESULTS_PER_PAGE = 4;
const initialFilters = {
    search: '',
    technology: '',
    location: '',
    experiencielevel: ''
}

export function useFilters(){

    //Los estados se componen de 3 elementos:
    //estado actual, un metodo para actualizar el estado
    //y un estado inicial.

    const [filters, setFilters] = useState(() =>{
        const params = new URLSearchParams(window.location.search)
        return {
            technology: params.get('technology') || '',
            location: params.get('type') || '',
            experiencielevel: params.get('level') || ''
        }
    })

    const [textToFilter, setTextToFilter ] = useState(() =>{
        const params = new URLSearchParams(window.location.search)
        return params.get('text') || ''
    })

    const [currentPage, setCurrentPage ] = useState(() =>{
        const params = new URLSearchParams(window.location.search)
        const page = Number(params.get('page'))
        // Si NO es NaN y es mayor a 0, usa ese número. Si no, usa 1.
        return (!Number.isNaN(page) && page > 0) ? page : 1;
    })

    const [jobs, setJobs] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)

    const { navigateTo } = useRouter()

    const isFiltered = Object.values(filters).some(v => 
        v !== null && v !== undefined && v.toString().trim() !== ''
    );
    console.log("Filtros actuales:", filters);
    console.log("¿Está filtrado?:", isFiltered);
    
    useEffect(() => {
        //console.log(isFiltered)
        async function fetchJobs() {
            try {
                setLoading(true)

                const params = new URLSearchParams()
                if (textToFilter) params.append('text', textToFilter)
                if (filters.technology) params.append('technology', filters.technology)
                if (filters.location) params.append('type', filters.location)
                if (filters.experiencielevel) params.append('experiencielevel', filters.experiencielevel)

                const offset = (currentPage - 1) * RESULTS_PER_PAGE
                params.append('limit', RESULTS_PER_PAGE)
                params.append('offset', offset)

                const queryParams = params.toString()

                const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`)
                const json =  await response.json()

                setJobs(json.data)
                setTotal(json.total)
            } catch (error) {
                console.error('Error fetching jobs:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchJobs()
    }, [filters, textToFilter, currentPage])

    useEffect(() =>{
        const params = new URLSearchParams()

        if (textToFilter) params.append('text', textToFilter)
        if (filters.technology) params.append('technology', filters.technology)
        if (filters.location) params.append('type', filters.location)
        if (filters.experiencielevel) params.append('experiencielevel', filters.experiencielevel)
        if (currentPage > 1) params.append('page', currentPage)
        
        const newUrl = params.toString()
            ? `${window.location.pathname}?${params.toString()}`
            : window.location.pathname

         navigateTo(newUrl)
    }, [filters, textToFilter, currentPage])

    const totalPages = Math.ceil(total / RESULTS_PER_PAGE);

    const handlePageChange = (page) => {
        console.log('cambiando a la pagina:', page);
        setCurrentPage(page);
    }

    const handleTextFilter = (newTextToFilter) =>{
        setTextToFilter(newTextToFilter)
        setCurrentPage(1)
    }

    const handleSearch = (filters) =>{
        setFilters(filters)
        setCurrentPage(1)
    }

    const handleClearFilters = () =>{
        setFilters(initialFilters)
        setTextToFilter('')
        setCurrentPage(1)
    }

    return {
        jobs,
        total,
        filters,
        loading,
        totalPages,
        currentPage,
        handlePageChange,
        handleSearch,
        handleTextFilter,
        isFiltered,
        handleClearFilters,
        setFilters,
        textToFilter
    }
}