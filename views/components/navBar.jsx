import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav> 
      
      <input 
        className="input-menu"
        id="input-menu"
        type="checkbox" 
        name="input-menu"/>
      <label className="label-menu" htmlFor="input-menu"><i className="fas fa-bars"/></label>
      
      <ul className="menu">
        <li><NavLink className="nav-link" to="/app" activeClassName="active-link">App</NavLink></li>
        <li><NavLink className="nav-link" to="/user-story" activeClassName="active-link">User Story</NavLink></li>
        <li><NavLink className="nav-link" to="/code-solution" activeClassName="active-link">Code Solution</NavLink></li>
        <div className="divider"></div>
        <li className="dropdown-link">Fcc BackEnd Projects <i className="fas fa-caret-down"></i>
          <ul className="dropdown">
            <li className="label">APIs and Microservices Projects</li>
            <li><a href="https://fcc-bt-timestamp.glitch.me/" target="_blank">Timestamp Microservice</a></li>
            <li><a href="https://fcc-bt-request-header-parser.glitch.me/" target="_blank">Request Header Parser Microservice</a></li>
            <li><a href="https://fcc-bt-url-shortener.glitch.me/" target="_blank">URL Shortener Microservice</a></li>
            <li><a href="https://fcc-bt-exercise-tracker.glitch.me/" target="_blank">Exercise Tracker</a></li>
            <li><a href="https://fcc-bt-file-metadata.glitch.me/" target="_blank">File Metadata Microservice</a></li>
            <li className="label">Information Security and Quality Assurance Projects</li>
            <li><a href="https://fcc-bt-metric-imp-converter.glitch.me/" target="_blank">Metric-Imperial Converter</a></li>
            <li><a href="https://fcc-bt-issue-tracker.glitch.me/" target="_blank">Issue Tracker</a></li>
            <li><a href="https://fcc-bt-personal-library.glitch.me/" target="_blank">Personal Library</a></li>
            <li><a href="https://fcc-bt-stock-price-checker.glitch.me/" target="_blank">Stock Price Checker</a></li>
            <li><a href="https://fcc-bt-anon-message-board.glitch.me/" target="_blank">Anonymous Message Board</a></li>
          </ul>
        </li>
 
      </ul>
    </nav>
  );
};

export default NavBar;