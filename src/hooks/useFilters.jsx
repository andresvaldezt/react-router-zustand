import { useEffect, useState } from 'react'
import { useRouter } from "../hooks/useRouter"
import { useSearchParams } from 'react-router';

const RESULTS_PER_PAGE = 4;
const initialFilters = {
    search: '',
    technology: '',
    location: '',
    experiencelevel: ''
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
            experiencelevel: searchParams.get('level') || ''
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
                if (filters.experiencelevel) params.append('experiencelevel', filters.experiencelevel)

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
            const paramMap = {
                'text': textToFilter,
                'technology': filters.technology,
                'type': filters.location,
                'experiencelevel': filters.experiencelevel,
                'page': currentPage > 1 ? currentPage : null
            }
            
            Object.entries(paramMap).forEach(([key, value]) => {
                value ? params.set(key, value) : params.delete(key)
            })
            
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
        setSearchParams((params) => {
            const keysToDelete = ['text', 'technology', 'type', 'level', 'page']
            keysToDelete.forEach(key => params.delete(key))
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