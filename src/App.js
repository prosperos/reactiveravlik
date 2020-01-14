import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'
import { InMemoryCache } from 'apollo-cache-inmemory';

import './components/base.scss'

import {API_ROOT} from "./env"
import Layout from "./Layout";


const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: API_ROOT,
  //cache
});


export default function App() {
  return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <>
            <Layout/>
          </>
        </BrowserRouter>
      </ApolloProvider>
  );
}

