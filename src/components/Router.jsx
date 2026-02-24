import { Children } from 'react'
import { useRouter } from "../hooks/useRouter"

export function Router ({ children, defaultComponent: DefaultComponent}) {
  const { currentPath } = useRouter()

  // Buscamos si alguna de las rutas hijas coincide con el path actual
  let Component = null

  Children.forEach(children, child => {
    // Verificamos que sea un componente válido y que el path coincida
    if (child.props.path === currentPath) {
      Component = child.props.component
    }
  })

  // Si encontramos la ruta, la renderizamos. Si no, el componente por defecto (404)
  return Component 
    ? <Component /> 
    : <DefaultComponent />
}