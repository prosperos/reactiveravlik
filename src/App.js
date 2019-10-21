import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter, Route } from 'react-router-dom'
import Ravlik  from './ravlik/Ravlik'
import Ravliks from './ravlik/Ravliks'
import './components/base.scss'
import Home from './pages/Home'
import Header from "./common/Header/Header"
import About from './pages/About'
import Production from './pages/Production/Production'
import ProductionItem from './pages/ProductionItem/ProductionItem'

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
              <Route exact path="/" component={Ravliks} />
              <Route path="/ravliks" component={Ravliks} />
              <Route path="/ravlik/:slug" component={Ravlik} />
              <Route exact path="/:locale/main-home/" component={Home} />
              {/*<Route exact path="/main-home/" component={Home} />*/}

              <Route path="/:locale/pro-nas/" component={About} />
              <Route exact path="/:locale/produktsiya/" component={Production} />
              <Route path="/:locale/produktsiya/:slug" component={ProductionItem} />
            </div>
          </div>

        </BrowserRouter>
      </ApolloProvider>
  );
}

export default App;
