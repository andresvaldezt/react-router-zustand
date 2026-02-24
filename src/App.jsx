import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'

import { HomePage } from './pages/Home.jsx'
import { SearchPage } from './pages/Search.jsx'
import { Router } from './components/Router'
import { Route } from './components/Route.jsx'
import { NotFoundPage } from './pages/404.jsx'


function App() {
  
  return (
    <>
    <Header/>
    <Router defaultComponent={NotFoundPage}>
      <Route path={"/"} component={HomePage}/>
      <Route path={"/search"} component={SearchPage}/>
    </Router>
    

    <Footer/>

    </>
  )
}

export default App
