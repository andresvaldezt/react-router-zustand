export function SearchBar({idText, onTextChange, filters, inputRef, handleClearInput, textToFilter}){

    return(
        <div className="search-bar">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="icon icon-tabler icons-tabler-outline icon-tabler-search">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                <path d="M21 21l-6 -6" />
            </svg>
            <input 
                name={idText} 
                type="text" 
                ref={inputRef}
                placeholder="Buscar empleos por titulo, habilidad o empresa"
                /*value={filters.search}*/
                onChange={onTextChange}
                defaultValue={textToFilter}
            />
            <button 
                className={`quit-filters`}
                onClick={handleClearInput}
            >
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
        </div>
    )
}