import { Link as NavLink } from 'react-router'

export function Link({href, children, ...props}) { //props del link
    
    return (
        <NavLink to={href} {...props}>
            {children}
        </NavLink>
    )
}