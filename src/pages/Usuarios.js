import React, { Component } from 'react';
import Rodape from '../componentes/Rodape'; 
import { icone } from '../assets/img/icon-login.png';
//css
import "../assets/css/flexbox.css";
import "../assets/css/reset.css";
import "../assets/css/style.css";
import "../assets/css/cabecalho.css";

class Usuarios extends Component {

  constructor(props){
    super(props);
    this.state = {
      listaUsuario: [],
      nome: '',
      email: '',
      tipoUsuarioId: 2,
      senha:''
    }

    this.buscarUsuario = this.buscarUsuario.bind(this);
    this.atualizaEstadoNome = this.atualizaEstadoNome.bind(this);
    this.atualizaEstadoEmail = this.atualizaEstadoEmail.bind(this);
    this.atualizaEstadoSenha = this.atualizaEstadoSenha.bind(this);
    this.cadastrarUsuario = this.cadastrarUsuario.bind(this);

  }

componentDidMount(){
  this.buscarUsuario()
}

buscarUsuario(){
  fetch('http://localhost:5000/api/Usuarios')
  .then(resposta => resposta.json())
  .then(data => this.setState({ listaUsuario : data }))
  .catch((erro) => console.log(erro))
}

atualizaEstadoNome(event){
  this.setState({ 
    nome : event.target.value
  });
}
atualizaEstadoEmail(event){
  this.setState({ 
    email : event.target.value
  });
}
atualizaEstadoSenha(event){
  
  this.setState({ 
    senha : event.target.value
  });
}


    cadastrarUsuario(event){
        event.preventDefault(); //evita comportamentos padrões da página
        fetch('http://localhost:5000/api/Usuarios',
        {
          method: 'POST', // declara que será utilizado o método post
          body : JSON.stringify({
            email : this.state.email,
            nome : this.state.nome,
            senha : this.state.senha,
            tipoUsuarioId : this.state.tipoUsuarioId
          }),
          headers : {
            'Content-type': 'application/json'
          }
        }).then(resposta => {
          if (resposta.status === 200) {
            console.log('Usuario cadastrado!');
          }
        })
        .catch(erro => console.log(erro))
        .then(this.buscarUsuario); //atualiza a lista de categoria com a cadastrada 
    }

    deletarUsuario = (id) => {
      console.log('Excluindo');

      fetch('http://localhost:5000/api/Usuarios/' + id, {
        method:'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      }).then(resp => resp.json())
        .catch(error => console.log(error))
        .then(this.buscarUsuario);
    }



    render(){
        return(
        <div>
        
        <header class="cabecalhoPrincipal">
        <div class="container">
        <img src={icone} />

        <nav class="cabecalhoPrincipal-nav">
          Administrador
        </nav>
        </div>
        </header>

    <main class="conteudoPrincipal">
      <section class="conteudoPrincipal-cadastro">
        <h1 class="conteudoPrincipal-cadastro-titulo">Usuários</h1>
        <div class="container" id="conteudoPrincipal-lista">
          <table id="tabela-lista">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Permissão</th>
                <th>Ação</th>
              </tr>
            </thead>

            <tbody>
              {
                this.state.listaUsuario.map(function(usuario) {
                    return( 

                      <tr key={usuario.usuarioId}>
                        <td>{usuario.usuarioId}</td>
                        <td>{usuario.nome}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.tipoUsuario.titulo}</td>
                        <td>
                          <button type='submit' onClick={i => this.deletarUsuario(usuario.usuarioId)}>Excluir</button>
                        </td>
                      </tr>

                    )                  
                }.bind(this))
              }
             
            </tbody>
          </table>

          <div class="paginacao">
            <a href="#">&laquo;</a>
            <a href="#">1</a>
            <a class="active" href="#">2</a>
            <a href="#">3</a>
            <a href="#">4</a>
            <a href="#">5</a>
            <a href="#">6</a>
            <a href="#">&raquo;</a>
          </div>
        </div>

        <div class="container" id="conteudoPrincipal-cadastro">
          <h2 class="conteudoPrincipal-cadastro-titulo">Cadastrar Usuário</h2>
          <form class="container" >
            
            <input type="text" placeholder="nome do usuário" value={this.state.nome} onChange={this.atualizaEstadoNome}/>
            <input type="text" placeholder="e-mail" value={this.state.email} onChange={this.atualizaEstadoEmail}/>
            
            {/* <select>
              <option value="0" disabled>Permissão</option>
              <option value="ADMINISTRADOR">ADMINISTRADOR</option>
              <option value="COMUM">COMUM</option>
            </select> */}
            <input type="password" placeholder="Senha" value={this.state.senha} onChange={this.atualizaEstadoSenha}/>
            
          </form>
          <button
         type='submit'
         onClick={this.cadastrarUsuario}
          class="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro">
            Cadastrar
          </button>
        </div>
      </section>
    </main>

    <Rodape />
    
    </div>
        );
    }
}

export default Usuarios;