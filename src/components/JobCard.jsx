//Crea tu primer componente JobCard
//Importalo y usalo en App.jsx
import { useState } from 'react'

export function JobCard({ data, titulo, empresa, ubicacion, descripcion }) {
    
    const [
        isApplied, //estado actual
        setIsApplied //update del estado
    ] = useState(false)

    const text = isApplied ? 'Aplicado' : 'Aplicar';
    const appliedText = isApplied ? 'si' : 'no'
    const buttonClass = isApplied ? 'is-applied' : '';

    function handleClick(){
        setIsApplied(!isApplied)
    }

    
    
    return (
        <article 
            className="job-article"
            data-modalidad={data?.modalidad}
            data-nivel={data?.nivel}
            data-technology={data?.technology}            
        >
            <div>
                <h3>{titulo}</h3>
                <small>{empresa} | {ubicacion} | He aplicado? {appliedText}</small>
                <p>{descripcion}</p>
            </div>
            <div>
                <button 
                    // disabled={isApplied}
                    className={`job-apply-button ${buttonClass}`}
                    onClick={handleClick}
                >
                    {text}
                </button>
            </div>
        </article>
    )
}