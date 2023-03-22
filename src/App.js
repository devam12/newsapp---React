import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize = 12;
  country="in";
  apikey = process.env.REACT_APP_NEWS_API_KEY; 
  // apikey="6bd23193e90147e79dbe8100a61a386a";

  state = {
    progress: 0,
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {
    return (
      <>
        <BrowserRouter>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} pageSize={this.pageSize} apikey={this.apikey} key="general" country={this.country} category="general" />}></Route>
            <Route exact path="/business" element={<News setProgress={this.setProgress} pageSize={this.pageSize} apikey={this.apikey} key="business" country={this.country} category="business" />}></Route>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} pageSize={this.pageSize} apikey={this.apikey} key="entertainment" country={this.country} category="entertainment" />}></Route>
            <Route exact path="/general" element={<News setProgress={this.setProgress} pageSize={this.pageSize} apikey={this.apikey} key="general" country={this.country} category="general" />}></Route>
            <Route exact path="/health" element={<News setProgress={this.setProgress} pageSize={this.pageSize} apikey={this.apikey} key="health" country={this.country} category="health" />}></Route>
            <Route exact path="/science" element={<News setProgress={this.setProgress} pageSize={this.pageSize} apikey={this.apikey} key="science" country={this.country} category="science" />}></Route>
            <Route exact path="/sports" element={<News setProgress={this.setProgress} pageSize={this.pageSize} apikey={this.apikey} key="sports" country={this.country} category="sports" />}></Route>
            <Route exact path="/technology" element={<News setProgress={this.setProgress} pageSize={this.pageSize} apikey={this.apikey} key="technology" country={this.country} category="technology" />}></Route>
          </Routes>
        </BrowserRouter>
      </>
    )
  }
}
