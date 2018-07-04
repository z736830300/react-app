import React, { Component } from 'react';
import Home from './components/home'
import './assets/styles/App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable'
import { Loading }  from 'element-react'

const loading = () =>  <Loading fullscreen={true} text="拼命加载中"></Loading>

const StoreProductlist = Loadable({
  loader: () => import('./components/store/productList'),
  loading: loading
})
const ProductProductlist = Loadable({
  loader: () => import('./components/product/productList'),
  loading: loading
})

class App extends Component {
  render() {
    return (
      <Router>
        <div className="main">
          <div className="slide">
            <h1 className="log">
              <a href="/">
                <img src="" alt=""/>
              </a>
              <p className="p-10">12312</p>
            </h1>
            <Home />
          </div>
          <div className="main-container">
            {/* <Router> */}
              <Switch>
                <Route path='/store/productlist' component={StoreProductlist}/>
                <Route path='/product/productlist' component={ProductProductlist}/>
              </Switch>
            {/* </Router> */}
            
          </div>
        </div>
      </Router>
     
    );
  }
}

export default App;
