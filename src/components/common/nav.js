import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Clock from 'react-live-clock'

import Auth from '../../lib/auth'

class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
    }
    this.today = Date.now(),
    this.logout = this.logout.bind(this)
  }


  logout() {
    Auth.logout()
    this.props.history.push('/')
  }


  render() {
    return (
      <nav className="navbar">
        <div className = "leftSide">
          project4

          {!Auth.isAuthenticated() && <Link to="/login" className="menuItem">login</Link>}
          {Auth.isAuthenticated() && <Link to="/dashboard" className="menuItem">.</Link>}
          {Auth.isAuthenticated() && <Link to="/projects" className="menuItem">projects</Link>}
          {Auth.isAuthenticated() && <Link to="/expenses" className="menuItem">expenses</Link>}
          {Auth.isAuthenticated() && <Link to="/invoices" className="menuItem">invoices</Link>}
          {Auth.isAuthenticated() && <Link to="/clients" className="menuItem">clients</Link>}
          {Auth.isAuthenticated() && <Link to="/suppliers" className="menuItem">suppliers</Link>}
          {Auth.isAuthenticated() && <Link to="/" className="menuItem">logout</Link>}

        </div>
        <div className = "rightSide">
          <Clock className = "nowDate" format={'YYYY-MM-DD'} ticking={true}/>
          <Clock className = "nowTime"format={'HH:mm'} ticking={true}/>
        </div>
      </nav>
    )
  }
}

export default withRouter(Nav)

      // {Auth.isAuthenticated() && <a className="menuItem" onClick={this.logout}>_</a>}
