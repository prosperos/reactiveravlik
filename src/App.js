import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter, Route, Switch,  } from 'react-router-dom'

import './components/base.scss'
import Home from './pages/Home'
import About from './pages/About'
import Production from './pages/Production/Production'
import ProductionItem from './pages/ProductionItem/ProductionItem'
import Vyrobnytstvo from './pages/Vyrobnytstvo/Vyrobnytstvo'
import Export from './pages/Export/Export'
import Blog from './pages/Blog/Blog'
import BlogDetail from './pages/BlogDetail/BlogDetail'
import Contact from './pages/Contact/Contact'
import Page404 from './pages/Page404/Page404'
import MapSite from './pages/MapSite/MapSite'
import UseCookies from './pages/UseCookies/UseCookies'
import PoliticalConfidentiality from "./pages/PoliticalConfidentiality/PoliticalConfidentiality";
import { LOCALES, DEFAULT_LOCALE } from "./constants";
import {API_ROOT} from "./env"


const client = new ApolloClient({
  uri: API_ROOT,
})

const LOCALE_PARAM = `/:locale(${LOCALES.filter(locale => locale !== DEFAULT_LOCALE).join('|')})?`

function App() {
  return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <>

            <div className="content">
              <Switch>
                <Route exact path={`${LOCALE_PARAM}/`} component={Home} />
                <Route exact path={`${LOCALE_PARAM}/about-us/`} component={About} />
                <Route exact path={`${LOCALE_PARAM}/our-products/`} component={Production} />
                <Route exact path={`${LOCALE_PARAM}/our-products/:slug/`} component={ProductionItem} />
                <Route exact path={`${LOCALE_PARAM}/production/`} component={Vyrobnytstvo} />
                <Route exact path={`${LOCALE_PARAM}/export/`} component={Export} />
                <Route exact path={`${LOCALE_PARAM}/blog/`} component={Blog} />
                <Route exact path={`${LOCALE_PARAM}/blog/:slug`} component={BlogDetail} />
                <Route exact path={`${LOCALE_PARAM}/contacts/`} component={Contact} />
                <Route exact path={`${LOCALE_PARAM}/maps-site/`} component={MapSite} />
                <Route exact path={`${LOCALE_PARAM}/privacy-policy/`} component={PoliticalConfidentiality} />
                <Route exact path={`${LOCALE_PARAM}/cookies/`} component={UseCookies} />
                <Route  path={`${LOCALE_PARAM}`} component={Page404} />
                {/*<Route component={Page404} />*/}
              </Switch>
            </div>
          </>

        </BrowserRouter>
      </ApolloProvider>
  );
}

export default App;
