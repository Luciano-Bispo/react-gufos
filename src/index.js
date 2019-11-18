import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

//Paginas
import App from './App';
import Categoria from './pages/Categoria'; //importando a pagina categoria
import Eventos from './pages/Eventos'; 
import Login from './pages/Login'; 
import Usuarios from './pages/Usuarios'; 

import NotFound from './pages/NotFound';
//arquivo de configuração de rotas
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';

const Rotas = (
    <Router>
        <div>
            <Switch >
                <Route exact path='/' component={ App } />
                <Route path='/categoria' component={ Categoria }/>
                <Route path='/Eventos' component={ Eventos }/>
                <Route path='/Login' component={ Login }/>
                <Route path='/Usuarios' component={ Usuarios }/>

                <Route component={ NotFound } />
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(Rotas, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
