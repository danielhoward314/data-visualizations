import React, {Component} from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
import AboutMe from './AboutMe'
import PopulationPyramid from './PopulationPyramid'
import ForceDirectedGraph from './ForceDirectedGraph'

class Routes extends Component {

  render() {

    return (
      <Switch>
        <Route exact path="/" component={AboutMe} />
        <Route path="/pyramid" component={PopulationPyramid} />
        <Route path="/graph" component={ForceDirectedGraph} />
      </Switch>
    )
  }
}

export default withRouter(Routes)
