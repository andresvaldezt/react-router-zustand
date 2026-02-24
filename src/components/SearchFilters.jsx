export function SearchFilters({idTechnology, idLocation, idExperienceLevel, isFiltered, handleClearFilters, filters, setFilters}){

    return(
        <div className="search-filters">
            <select 
                name={idTechnology} 
                id="tech"
                value={filters.technology}
                onChange={(e) => setFilters({ ...filters, technology: e.target.value })}
            >
                <option value="">Tecnología</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="mobile">Mobile</option>
            </select>
            <select 
                name={idLocation} 
                id="filter-location"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            >
                <option value="">Ubicación</option>
                <option value="remoto">Remoto</option>
                <option value="cdmx">CDMX</option>
                <option value="guadalajara">GDL</option>
                <option value="barcelona">Barcelona</option>
                <option value="madrid">Madrid</option>
                <option value="bsas">Buenos Aires</option>
            </select>
            <select 
                name={idExperienceLevel} 
                id="level"
                value={filters.experiencelevel}
                onChange={(e) => setFilters({ ...filters, experiencelevel: e.target.value })}
            >
                <option value="">Nivel de Experiencia</option>
            </select>
            {isFiltered && (
                <button 
                    className={`quit-filters`}
                    onClick={handleClearFilters}
                >
                    Limpiar Filtros
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="15" 
                        height="15" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="4" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="icon icon-tabler icons-tabler-outline icon-tabler-x">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M18 6l-12 12" />
                        <path d="M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    )
}