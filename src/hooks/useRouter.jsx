import { useState, useEffect } from "react"

export function useRouter(){

  //definicion de estado
  const [
    currentPath, //path actual
    setCurrentPath //funcion que va a actualizar el path
  ] = useState(window.location.pathname) //estado inicial del currentPath

  useEffect(() => {

    //funcion que se ejecuta cada vez que la suscripcion al evento cambia, en este caso popstate
    //y que va a actualizar el path
    const handleLocationChange = () =>{
      setCurrentPath(window.location.pathname)
    }

    //suscripcion al evento popstate para ejecutar handleLocationChange
    window.addEventListener('popstate', handleLocationChange)

    //al final devuelve una funcion para limpiar las suscripciones a los eventos
    //para evitar anadir event listeners infinitos y evitar problemas de memoria(memory leaks)
    return () => {
      window.removeEventListener('popstate', handleLocationChange)
    }
  }, [])//dependecias para ejecutar el efecto, en este caso se ejecuta una vez por defecto

  
  function navigateTo(path){
    //pushState permite agregar una nueva entrada al historial de navegación y 
    //actualizar la URL en la barra de direcciones sin recargar la página
    window.history.pushState({}, '', path)
    //dispara el evento popstate mediante dispatchEvent
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return {
    currentPath,
    navigateTo
  }

}