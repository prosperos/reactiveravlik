import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter, Route, Router, Switch, Redirect } from 'react-router-dom'

import Ravlik  from './ravlik/Ravlik'
import Ravliks from './ravlik/Ravliks'
import './components/base.scss'
import Home from './pages/Home'
import Header from "./common/Header/Header"
import About from './pages/About'
import Production from './pages/Production/Production'
import ProductionItem from './pages/ProductionItem/ProductionItem'
import Vyrobnytstvo from './pages/Vyrobnytstvo/Vyrobnytstvo'
import Export from './pages/Export/Export'
import Blog from './pages/Blog/Blog'
import BlogDetail from './pages/BlogDetail/BlogDetail'
import Contact from './pages/Contact/Contact'
import Page404 from './pages/Page404/Page404'
const client = new ApolloClient({
  uri: 'http://reactwp/graphql/',
})

function App() {
  return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div>

            <Header/>

            <div className="content">
              <Switch>
                <Route exact path="/:locale/main-home/" component={Home} />
                <Route exact path="/ravliks" component={Ravliks} />
                <Route exact path="/ravlik/:slug" component={Ravlik} />

                <Route exact path="/:locale/main-home/" component={Home} />
                <Route exact path="/:locale/pro-nas/" component={About} />
                <Route exact path="/:locale/produktsiya/" component={Production} />
                <Route exact path="/:locale/produktsiya/:slug/" component={ProductionItem} />
                <Route exact path="/:locale/vyrobnytstvo/" component={Vyrobnytstvo} />
                <Route exact path="/:locale/eksport/" component={Export} />

                <Route exact path="/:locale/bloh/" component={Blog} />
                <Route exact path="/:locale/bloh/:slug" component={BlogDetail} />
                <Route exact path="/:locale/kontakty/" component={Contact} />

                <Route component={Page404} />

              </Switch>
            </div>
          </div>

        </BrowserRouter>
      </ApolloProvider>
  );
}

export default App;
