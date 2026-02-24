import { useId, useState, useRef } from 'react'
import { SearchBar } from './SearchBar.jsx'
import { SearchFilters } from './SearchFilters.jsx'

const useSearchForm = ({ idText, idTechnology, idLocation, idExperienceLevel, onSearch, onTextFilter  }) => {

    const timeoutId = useRef(null)

    const[
        searchText,
        setSearchText
    ] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault()

      //Se cambio e.target por e.currentTarget
      //asi recuperamos todo el formulario para filtrar
      const formData = new FormData(e.currentTarget)

      if(e.target.name === idText){
        return
      }

      const filters = {
        search: formData.get(idText),
        technology: formData.get(idTechnology),
        location: formData.get(idLocation),
        experiencielevel: formData.get(idExperienceLevel)
      }

      onSearch(filters)
    }

    const handleTextChange = (e) => {
        const text = e.target.value
        setSearchText(text)//actualiza el imput inmediatamente

        //DEBOUNCE: Cancelar el timeout anterior
        if(timeoutId.current){
            clearTimeout(timeoutId.current)
        }
        
        timeoutId.current = setTimeout( () => {
            onTextFilter(text)
        }, 500)  
    }

    return {
        searchText,
        handleSubmit,
        handleTextChange
    }

}

export function JobSearchForm({onSearch, onTextFilter, isFiltered, handleClearFilters, filters, setFilters, textToFilter}){

    const idText = useId()
    const idTechnology = useId()
    const idLocation = useId()
    const idExperienceLevel = useId()
    const inputRef = useRef()

    //los hooks no pueden ser llamados dentro de un callback, estos deben ser llamados dentro de la funcion
    //del componente o dentro de otra funcion custom hook
    const {
        handleSubmit, 
        handleTextChange
    } = useSearchForm(
        { 
            idText, 
            idTechnology, 
            idLocation, 
            idExperienceLevel, 
            onSearch, 
            onTextFilter
        }
    )

    const handleClearInput = (e) =>{
        e.preventDefault()
        console.log(inputRef)
        inputRef.current.value = ""
        onTextFilter("")
    }

    return(
        <form onChange={handleSubmit} className="jobs-search" role="search">
            <SearchBar
                idText={idText}
                onTextChange={handleTextChange}
                filters={filters}
                inputRef={inputRef}
                handleClearInput={handleClearInput}
                textToFilter={textToFilter}
            />
            <SearchFilters
                idTechnology={idTechnology}
                idLocation={idLocation}
                idExperienceLevel={idExperienceLevel}
                isFiltered={isFiltered}
                handleClearFilters={handleClearFilters}
                filters={filters}
                setFilters={setFilters}
            />
        </form>
    )
}