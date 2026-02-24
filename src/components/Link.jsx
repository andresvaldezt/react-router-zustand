import { useRouter } from "../hooks/useRouter";

export function Link({href, children, ...props}) { //props del link
    const { navigateTo } = useRouter()
    
    const handleClick = (e) => {
        e.preventDefault()
        navigateTo(href)
    }
    
    return (
        //Link pasa el href como prop cuando se renderiza
        //ese href lo utiliza la funcion handleClick para actualizar el popstate
        //mediante la funcion navigateTo que se importa desde useRouter
        <a href={href} {...props} onClick={handleClick}>
            {children}
        </a>
    )
}