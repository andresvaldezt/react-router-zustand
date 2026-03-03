import { useState, useEffect } from "react"
import {  useParams, useNavigate } from "react-router"
import { Link } from "../components/Link"
import snarkdown from "snarkdown"


function JobSection({ title, content }){
    const html =  snarkdown(content)

    return(
        <section>
            <h2>
               {title} 
            </h2>
            <div dangerouslySetInnerHTML={{__html: html}}>

            </div>
        </section>
    )
}

export function JobDetail(){
    const { jobId } = useParams()
    const navigate = useNavigate()

    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)
    const [err, setError] = useState(null)
    const [isApplied,setIsApplied] = useState(false)

    const text = isApplied ? 'Aplicado' : 'Aplicar';
    const buttonClass = isApplied ? 'is-applied' : '';

    function handleClick(){
        setIsApplied(!isApplied)
    }

    useEffect(() => {
        fetch(`https://jscamp-api.vercel.app/api/jobs/${jobId}`)
        .then(res => {
            if(!res.ok){
                throw new Error('Job Not Found')
            }
            return res.json()
        })
        .then(json => setJob(json))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false))
    }, [jobId])

    if(loading){
        return <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
            <div>
                <p>Cargando...</p>
            </div>
        </div>
    }

    if(err || !job){
        return <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
            <div>
                <h2>
                    Oferta no encontrada
                </h2>
                <button
                    onClick={() => navigate('/')}
                >
                    Volver al Inicio
                </button>
            </div>
        </div>
    }

    if(job){
        return(
            <>
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
                    <div>
                        <nav>
                        <Link
                            href="/search"
                        >
                            Empleos
                        </Link>
                        <span>/</span>
                        <span>{job.titulo}</span>
                        </nav>
                    </div>
                    <div>
                        <h1>
                            {job.titulo}
                        </h1>
                        <p>
                            {job.empresa} - {job.ubicacion}
                        </p>
                    </div>
                    <button className={`job-apply-button ${buttonClass}`} onClick={handleClick}>
                        {text}
                    </button>
                    <JobSection title="Descripcion del puesto" content={job.content.description}/>
                    <JobSection title="Responsabilidades" content={job.content.responsibilities}/>
                    <JobSection title="Requisitos" content={job.content.requirements}/>
                    <JobSection title="Acerca de la empresa" content={job.content.about}/>
                </div>
            </>
        )
    }

}