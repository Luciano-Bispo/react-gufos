import React, { Component } from 'react';
import Axios from 'axios';
//css
import '../assets/css/login.css';

//imagem
import icon from '../assets/img/icon-login.png';

class Login extends Component {
constructor(props){
  super(props);
  this.state = {
    email:'',
    senha:'',
    errorMessage:''
  }
}

atualizaEstado(event){
  this.setState({ [event.target.name]: event.target.value })
}


efetuaLogin(event){
  event.preventDefault();
  Axios.post('http://localhost:5000/api/Login', 
  {
    email: this.state.email,
    senha : this.state.senha
  }).then(res => {
    if (res.status === 200) {
        localStorage.setItem('usuario-token', res.data.token); 
        console.log('meu token é:' + res.data.token);  
    }
  }).catch(erro => {
    this.setState({ errorMessage : 'Email ou senha inválido!'})
    console.log(erro);
  } );

}

    render() {
        return (
            <div>
      <section className="container-login flex">
      <div className="img__login"><div className="img__overlay"></div></div>

      <div className="item__login">
        <div className="row">
          <div className="item">
            <img src={ icon } className="icone__login" />
          </div>
          <div className="item" id="item__title">
            <p className="text__login" id="item__description">
              Bem-vindo! Faça login para acessar sua conta.
            </p>
          </div>
          <form method='POST' onSubmit={this.efetuaLogin.bind(this)}>
            <div className="item">
              <input
                className="input__login"
                placeholder="Email"
                value={this.state.email}
                onChange={this.atualizaEstado.bind(this)}
                type="text"
                name="email"
                id="login__email"
              />
            </div>
            <div className="item">
              <input
                className="input__login"
                value={this.state.senha}
                onChange={this.atualizaEstado.bind(this)}
                placeholder="password"
                type="password"
                name="senha"
                id="login__password"
              />
            </div>
            <div className="item">
              <button className="btn btn__login" id="btn__login " type='submit'>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

    </div>
        );
    }
}

export default Login;