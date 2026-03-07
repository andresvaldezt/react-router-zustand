//Crea tu primer componente JobCard
//Importalo y usalo en App.jsx
import { Link } from './Link';
import { useFavoritesStore } from '../store/favoritesStore';
import { useAuthStore } from '../store/authStore';
import { useApplyStore } from '../store/appliedStore';

function JobCardApplyButton({ jobId }){

    const { toggleApplication, isApplied } = useApplyStore()
    
    const buttonClass = isApplied(jobId) ? 'is-applied' : '';
    const text = isApplied(jobId) ? 'Aplicado' : 'Aplicar'

    return(
        <button 
            // disabled={isApplied}
            className={`job-apply-button ${buttonClass}`}
            onClick={() => toggleApplication(jobId)}
        >
            {text}
        </button>
    )
}

function JobCardFavoriteButton({ jobId }){
    //suscribete a toda la store y extrae toda la store
    const { toggleFavorite, isFavorite } = useFavoritesStore()

    //suscribete solo a lo que necesitamos
    // const isFavorite = useFavoritesStore((state) => state.isFavorite)
    // const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)

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

export function JobCard({ id, data, titulo, empresa, ubicacion, descripcion }) {
    const { isLoggedIn } = useAuthStore()
    const { isApplied } = useApplyStore()

    const appliedText = isApplied(id) ? 'si' : 'no'

    return (
        <article 
            className="job-article"
            data-modalidad={data?.modalidad}
            data-nivel={data?.nivel}
            data-technology={data?.technology}            
        >
            <div>
                <h3>
                    <Link href={`/jobs/${id}`}>
                        {titulo}
                    </Link>
                </h3>
                
                    <small>{empresa} | {ubicacion} {isLoggedIn && (` | He aplicado? ${appliedText}`)}</small>
                
                <p>{descripcion}</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>

                {isLoggedIn && (
                    <JobCardApplyButton jobId={id}/>
                )}

                {isLoggedIn && (
                    <JobCardFavoriteButton jobId={id}/>
                )}
                
            </div>
        </article>
    )
}