import { useEffect, useState } from 'react'
import { useRouter } from "../hooks/useRouter"
import { useSearchParams } from 'react-router';

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

    const [searchParams, setSearchParams] = useSearchParams()

    const [filters, setFilters] = useState(() =>{
        return {
            technology: searchParams.get('technology') || '',
            location: searchParams.get('type') || '',
            experiencielevel: searchParams.get('level') || ''
        }
    })

    const [textToFilter, setTextToFilter ] = useState(() => searchParams.get('text') || '')

    const [currentPage, setCurrentPage ] = useState(() =>{
        const page = Number(searchParams.get('page'))
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
    //console.log("Filtros actuales:", filters);
    //console.log("¿Está filtrado?:", isFiltered);
    
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

                const response = await fetch(`https://04-express-nine.vercel.app/jobs?${queryParams}`)
                const json =  await response.json()

                setJobs(json.data)
                setTotal(json.total)
                console.log('Trabajos obtenidos:', json.total)
            } catch (error) {
                console.error('Error fetching jobs:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchJobs()
    }, [filters, textToFilter, currentPage])

    useEffect(() =>{

        setSearchParams((params) => {
            // Set parameters that have values
            if (textToFilter) {
                params.set('text', textToFilter)
            } else {
                params.delete('text')
            }
            
            if (filters.technology) {
                params.set('technology', filters.technology)
            } else {
                params.delete('technology')
            }
            
            if (filters.location) {
                params.set('type', filters.location)
            } else {
                params.delete('type')
            }
            
            if (filters.experiencielevel) {
                params.set('experiencielevel', filters.experiencielevel)
            } else {
                params.delete('experiencielevel')
            }

            if (currentPage > 1) {
                params.set('page', currentPage)
            } else {
                params.delete('page')
            }

            return params
        })

    }, [filters, textToFilter, currentPage, setSearchParams])

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
        // Remove all search parameters explicitly
        setSearchParams((params) => {
            params.delete('text')
            params.delete('technology')
            params.delete('type')
            params.delete('level')
            params.delete('page')
            return params
        })
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