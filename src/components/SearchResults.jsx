
import {JobCard} from './JobCard.jsx'
export function SearchResults({jobs}){
    return(
        <section className="search-results">
            <h1>Resultados de búsqueda</h1>
            <p className="errorMessage hide-element">
                No se encontraron coincidencias...
            </p>
            <div className="job-listing">
                {
                    jobs.length === 0 && (
                        <p style={{textAling: 'center', padding: '1rem', textWrap: 'balance'}}>
                            No se han encontrado empleos que coinciden los criterios de búsqueda
                        </p>
                    )
                }
                {jobs.map(job => (
                    <JobCard
                        key = {job.id}
                        titulo = {job.titulo}
                        empresa = {job.empresa}
                        ubicacion = {job.ubicacion}
                        descripcion = {job.descripcion}
                        data={{ 
                            modalidad: job?.data?.modalidad, 
                            nivel: job.data?.nivel, 
                            technology: job.data?.technology 
                        }}
                    />
                ))}              
            </div>
        </section>
    )
}