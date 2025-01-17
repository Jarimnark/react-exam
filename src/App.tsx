import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
import Exam1 from './page/Exam1';
import Home from './page/Home';
import Exam2 from './page/Exam2';
import Exam3 from './page/Exam3';
import Exam4 from './page/Exam4';
import Exam5 from './page/Exam5';
import Exam6 from './page/Exam6';
import Exam7 from './page/Exam7';
import Exam8 from './page/Exam8';
import Exam9 from './page/Exam9';
import Exam10 from './page/Exam10';
function App() {


  return (
    <Router>
      <nav className='w-full bg-slate-300 dark:bg-slate-900'>
        <ul className='grid grid-cols-3 justify-between p-4 sm:grid-cols-6 md:grid-cols-11 dark:text-white'>
          <li className='hover:underline font-medium text-center'><Link to="/">Home</Link></li>
          <li className='hover:underline font-medium text-center'><Link to="/exam1">Exam1</Link></li>
          <li className='hover:underline font-medium text-center'><Link to="/exam2">Exam2</Link></li>
          <li className='hover:underline font-medium text-center'><Link to="/exam3">Exam3</Link></li>
          <li className='hover:underline font-medium text-center'><Link to="/exam4">Exam4</Link></li>
          <li className='hover:underline font-medium text-center'><Link to="/exam5">Exam5</Link></li>
          <li className='hover:underline font-medium text-center'><Link to="/exam6">Exam6</Link></li>
          <li className='hover:underline font-medium text-center'><Link to="/exam7">Exam7</Link></li>
          <li className='hover:underline font-medium text-center'><Link to="/exam8">Exam8</Link></li>
          <li className='hover:underline font-medium text-center'><Link to="/exam9">Exam9</Link></li>
          <li className='hover:underline font-medium text-center'><Link to="/exam10">Exam10</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exam1" element={<Exam1 />} />
        <Route path="/exam2" element={<Exam2 />} />
        <Route path="/exam3" element={<Exam3 />} />
        <Route path="/exam4" element={<Exam4 />} />
        <Route path="/exam5" element={<Exam5 />} />
        <Route path="/exam6" element={<Exam6 />} />
        <Route path="/exam7" element={<Exam7 />} />
        <Route path="/exam8" element={<Exam8 />} />
        <Route path="/exam9" element={<Exam9 />} />
        <Route path="/exam10" element={<Exam10 />} />

        {/* Catch-all route for 404 */}
      </Routes>
    </Router>

  )
}

export default App
