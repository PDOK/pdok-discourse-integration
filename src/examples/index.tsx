import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import { Container, Nav, Navbar, NavItem } from 'reactstrap';
import TopicExample from './TopicExample';

const App = () => (
  <HashRouter>
    <div>
      <header>
        <Navbar color="light">
          <Container>
            <Nav>
              <NavItem>
                <Link to="/topic" className="nav-link">Topic</Link>
              </NavItem>
            </Nav>
          </Container>
        </Navbar>
      </header>
      <main className="mt-4">
        <Container fluid>
          <Switch>
            <Route exact path="/topic" component={TopicExample} />
            <Redirect from="/" to="/topic" />
          </Switch>
        </Container>
      </main>
    </div>
  </HashRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));
