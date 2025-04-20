import { BrowserRouter , Routes, Route} from 'react-router-dom'
import './App.css'
import Landingpage from './Landingpage'
import DocsLayout from './components/pages/DocsLayout'
import ComponentGallery from './components/pages/ComponentGallery'
import Header from './components/Header'


function App() {

  return (
    <div>
 

      <BrowserRouter>
      <Routes>
        <Route path= {'/'} element={<Landingpage />}/>
        <Route path= {'/docs'} element={<DocsLayout />}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
