import React from 'react'
import {Link} from 'react-router-dom'


const Navbar = () => (
  <div>
    <div className="header-content">
      <h1 className="header">D3 Data Visualizations by Daniel Howard</h1>
    </div>
    <nav>
        <div>
          <Link to="/pyramid">Population Pyramid</Link>
          <Link to="/graph">Force-Directed Graph</Link>
          <Link to="/">Home</Link>
        </div>
    </nav>
    <hr />
  </div>
)

export default Navbar
