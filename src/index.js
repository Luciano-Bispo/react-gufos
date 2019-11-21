import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

//Paginas
import App from './App';
import Categoria from './pages/Categoria'; //importando a pagina categoria
import Eventos from './pages/Eventos'; 
import Login from './pages/Login'; 
import Usuarios from './pages/Usuarios'; 

import { usuarioAutenticado, parseJwt  } from './services/auth'

import NotFound from './pages/NotFound';
//arquivo de configuração de rotas
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';


const PermissaoAdm =({ component : Component }) => (
    
    <Route 
        render = { props => 
        
            usuarioAutenticado() && parseJwt().Role === 'Administrador' ? ( 
                <Component {...props} /> 
            ) : ( 
                <Redirect to={{pathname:'Login'}} /> 
                ) 
        }

    />
)

const PermissaoAluno =({ component : Component }) => (
    
    <Route 
        render = { props => 
        
            usuarioAutenticado() && parseJwt().Role === 'Aluno' ? ( 
                <Component {...props} /> 
            ) : ( 
                <Redirect to={{pathname:'Login'}} /> 
                ) 
        }

    />
)



const Rotas = (
    <Router>
        <div>
            <Switch >
                <Route exact path='/' component={ App } />
                <PermissaoAdm path='/categoria' component={ Categoria }/>
                <PermissaoAluno path='/Eventos' component={ Eventos }/>
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
