import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import {Route, Routes} from 'react-router-dom'
import {Home} from './pages/Home'
import { Movies } from "./pages/Movies"



function App() {

    return (<>
     <Header/>
     <main className="container content">
     <Routes>
        <Route  path="/" element={<Home/>}/>
        <Route path="/movie/:id" element={<Movies/>}/>
     </Routes>
     </main>
    <Footer/>
   
 </>
    )
}

export default App
