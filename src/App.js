import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter, Route } from 'react-router-dom'
import Ravlik  from './ravlik/Ravlik';
import Ravliks from './ravlik/Ravliks';
import Home from './pages/Home'

const client = new ApolloClient({
  uri: 'http://reactwp/graphql/',
})

function App() {
  return (
      <ApolloProvider client={client}>
        <BrowserRouter>

          <div>
            <header>
              <h1>Ravlik site</h1>
            </header>
            <div className="content">
              <Route exact path="/" component={Ravliks} />
              <Route path="/ravliks" component={Ravliks} />
              <Route path="/ravlik/:slug" component={Ravlik} />
              <Route path="/home/" component={Home} />
            </div>
          </div>

        </BrowserRouter>
      </ApolloProvider>
  );
}

export default App;
