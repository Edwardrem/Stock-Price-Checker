import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import NavBar       from './components/navBar.jsx';
import Footer       from './components/footer.jsx';
import Home         from './components/home.jsx';
import UserStory    from './components/userStory.jsx';
import CodeSolution from './components/codeSolution.jsx';
import NotFound     from './components/notFound.jsx';

import 'react-json-pretty/themes/monikai.css';
import './app.scss';

const App = () => {
  
  return (
    <BrowserRouter>
      
      <div id="app" className="app">
        
        <NavBar />
        
        <main className="container">
          <Switch>
            <Route path="/app" exact component={Home} />
            <Route path="/user-story" component={UserStory} />
            <Route path="/code-solution" component={CodeSolution} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/app" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
        
        <Footer />
        
      </div>
      
    </BrowserRouter>
  )
}

export default App;