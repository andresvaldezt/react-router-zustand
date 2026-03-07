import { useState, useEffect} from "react"
import {  useParams, useNavigate } from "react-router"
import { Link } from "../components/Link"
import snarkdown from "snarkdown"
import styles from "./Detail.module.css"
import { useAuthStore } from "../store/authStore"
import { useFavoritesStore } from "../store/favoritesStore"
import { useApplyStore } from "../store/appliedStore"


function JobSection({ title, content }){
    const html =  snarkdown(content)

    return(
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
               {title} 
            </h2>
            <div dangerouslySetInnerHTML={{__html: html}}>

            </div>
        </section>
    )
}

function DetailApplyButton ({ jobId }) {

    const { isLoggedIn } = useAuthStore()
    const { toggleApplication, isApplied } = useApplyStore()

    const buttonClass = isApplied(jobId) ? 'is-applied' : '';
    const text = isApplied(jobId) ? 'Aplicado' : 'Aplicar'

    return (
        <button disabled={!isLoggedIn} className={`job-apply-button ${buttonClass}`} onClick={() => toggleApplication(jobId)}>
            {isLoggedIn ? text : "Inicia sesión para aplicar"}
        </button>
    )
}

function DetailFavoriteButton({ jobId }){
    //suscribete a toda la store y extrae toda la store
    const { toggleFavorite, isFavorite } = useFavoritesStore()

    const favIcon = <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="icon icon-tabler icons-tabler-outline icon-tabler-heart">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
        </svg>
        
    const unFavIcon = <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="icon icon-tabler icons-tabler-filled icon-tabler-heart">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" />
        </svg>

    return (
        <button 
            className={`job-apply-button`} 
            onClick={() => toggleFavorite(jobId)}
        >
            {isFavorite(jobId) ? unFavIcon : favIcon}
        </button>
    )
}

export default function JobDetail(){
    const { isLoggedIn } = useAuthStore()
    const { jobId } = useParams()
    const navigate = useNavigate()

    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)
    const [err, setError] = useState(null)

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
                    <div className={styles.header}>
                        <h1 className={styles.title}>
                            {job.titulo}
                        </h1>
                        <p className={styles.meta}>
                            {job.empresa} - {job.ubicacion}
                        </p>
                    </div>
                    <DetailApplyButton jobId={job.id}></DetailApplyButton>
                    {isLoggedIn && (
                            <DetailFavoriteButton jobId={job.id}></DetailFavoriteButton>
                        )
                    }
                    
                    <JobSection title="Descripcion del puesto" content={job.content.description}/>
                    <JobSection title="Responsabilidades" content={job.content.responsibilities}/>
                    <JobSection title="Requisitos" content={job.content.requirements}/>
                    <JobSection title="Acerca de la empresa" content={job.content.about}/>
                </div>
            </>
        )
    }

}