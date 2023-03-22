import './App.css';
import React, { useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

 const App = () => {
  const pageSize = 12;
  const country="in";
  const apikey = process.env.REACT_APP_NEWS_API_KEY; 
  const [progress,setProgress] = useState(0);  

    return (
      <>
        <BrowserRouter>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} pageSize={pageSize} apikey={apikey} key="general" country={country} category="general" />}></Route>
            <Route exact path="/business" element={<News setProgress={setProgress} pageSize={pageSize} apikey={apikey} key="business" country={country} category="business" />}></Route>
            <Route exact path="/entertainment" element={<News setProgress={setProgress} pageSize={pageSize} apikey={apikey} key="entertainment" country={country} category="entertainment" />}></Route>
            <Route exact path="/general" element={<News setProgress={setProgress} pageSize={pageSize} apikey={apikey} key="general" country={country} category="general" />}></Route>
            <Route exact path="/health" element={<News setProgress={setProgress} pageSize={pageSize} apikey={apikey} key="health" country={country} category="health" />}></Route>
            <Route exact path="/science" element={<News setProgress={setProgress} pageSize={pageSize} apikey={apikey} key="science" country={country} category="science" />}></Route>
            <Route exact path="/sports" element={<News setProgress={setProgress} pageSize={pageSize} apikey={apikey} key="sports" country={country} category="sports" />}></Route>
            <Route exact path="/technology" element={<News setProgress={setProgress} pageSize={pageSize} apikey={apikey} key="technology" country={country} category="technology" />}></Route>
          </Routes>
        </BrowserRouter>
      </>
    )
}


export default App; 