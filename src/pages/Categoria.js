import React, { Component } from 'react';
import Rodape from '../componentes/Rodape';
import icon from  '../assets/img/icon-login.png';

import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';


class Categoria extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            listaCategorias: [],
            titulo: '',
            loading : false,
            modal : false,
            erroMessage : '',
            editarModal : {
              categoriaId : '',
              titulo : ''
            }
        }

        this.buscarCategorias = this.buscarCategorias.bind(this);
        this.atualizaEstadoTitulo = this.atualizaEstadoTitulo.bind(this);
        this.cadastrarCategoria = this.cadastrarCategoria.bind(this);
    }

   

    //função que faz a requisição para a api
    //atribui os dados recebidos ao state lista categorias
    //e caso ocorra um erro, exibe no console do navegador
    buscarCategorias(){

        // setar state loading
        this.setState({loading : true});

        fetch('http://localhost:5000/api/Categorias')
        .then(resposta => resposta.json())
        .then(data => {
          this.setState({ listaCategorias: data })
          this.setState({loading : false});
      })
        .catch((erro) => {
          this.setState({loading : false});
          console.log(erro)
        });
    }

    //assim que a pagina for carregada, chama a função buscarCategorias
    componentDidMount(){
      this.buscarCategorias();
    }

    //Recebe um evento que contém o valor do campo titulo 
    atualizaEstadoTitulo(event){
      this.setState({ 
        titulo : event.target.value
      });
    }

    cadastrarCategoria(event){
        event.preventDefault(); //evita comportamentos padrões da página

        fetch('http://localhost:5000/api/Categorias',
        {
          method: 'POST', // declara que será utilizado o método post
          body : JSON.stringify({ titulo : this.state.titulo }),
          headers : {
            'Content-type': 'application/json'
          }
        }).then(resposta => {
          if (resposta.status === 200) {
            console.log('categoria cadastrada!');
          }
        })
        .catch(erro => console.log(erro))
        .then(this.buscarCategorias); //atualiza a lista de categoria com a cadastrada 
    }

    deletarCategoria = (id)=> {
        console.log('Excluindo');

        fetch('http://localhost:5000/api/Categorias/' + id, {
          method: 'DELETE',
          headers: {
            'Content-type' : 'apllication/json'
          }
        }).then(resp => resp.json())
          .then(response => {
            console.log(response);
            this.setState(()=> ({ lista: this.state.lista}))
            this.buscarCategorias()
          })
          .catch(error => {
          
            console.log(error)
            this.setState({erroMessage : 'Não foi possivel excluir, verifique se não há um evento cadastrado com essa categoria'})
          
          });

    }

//Alterar

 // add toggle
 toggle = () => {
  this.setState({
    modal : !this.state.modal
  })
}

alterarCategoria = (categoria) =>{
  this.setState({
    editarModal : {
      categoriaId : categoria.categoriaId,
      titulo:categoria.titulo 
    }
  })
  //abrir modal
  this.toggle();
}

salvarAlteracoes = (event) =>{
  event.preventDefault();

  fetch('http://localhost:5000/api/Categorias/'+this.state.editarModal.categoriaId, {
    method : 'PUT',
    body: JSON.stringify(this.state.editarModal),
    headers: {
      'Content-type' : 'application/json'
    }
  }).then(response => response.json())
    .then(
      setTimeout(() => {
        this.buscarCategorias()
      }, 2000)
    ).catch(erro => console.log(erro));

    // fecha o modal
      this.toggle();
}

//atualizar titulo do modal
atualizarEditarModalTitulo(input){
  this.setState({
    editarModal:{
    categoriaId : this.state.editarModal.categoriaId,
    titulo: input.target.value
  }})
}

    render(){
      let{ loading } = this.state;
        return(
            <div>
      <header class="cabecalhoPrincipal">
        <div class="container">
          <img src={ icon } />

          <nav class="cabecalhoPrincipal-nav">
            Administrador
          </nav>
        </div>
      </header>

      <main class="conteudoPrincipal">
        <section class="conteudoPrincipal-cadastro">
          <h1 class="conteudoPrincipal-cadastro-titulo">Categorias</h1>
          <div class="container" id="conteudoPrincipal-lista">
            <table id="tabela-lista">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Título</th>
                  <th>Ação</th>
                </tr>
              </thead>

              <tbody id="tabela-lista-corpo">
                {
                    this.state.listaCategorias.map(function(categoria){
                    return (
                      <tr key={categoria.categoriaId}>
                        <td> {categoria.categoriaId}</td>
                        <td> {categoria.titulo}</td>
                        <td>
                           <button type='submit' onClick={e => this.alterarCategoria(categoria)}>Alterar</button>
                           <button type='submit' onClick={i => this.deletarCategoria(categoria.categoriaId)}>Excluir</button>
                        </td>
                      </tr>
                    )
                    
                  }.bind(this)) 
                }
              </tbody>
            </table>
          
          {/*erro */}
            {this.state.erroMessage && <div className='text-danger'>{this.state.erroMessage}</div>  }

            {/* <i class="fas fa-spinner"></i> */}

          </div>

          {/* loading */}
            {loading && <i className='fa fa-spin fa-spinner fa-2x'></i>}

          <div>
              
          </div>
          
          <div class="container" id="conteudoPrincipal-cadastro">
            <h2 class="conteudoPrincipal-cadastro-titulo">
              Cadastrar Tipo de Evento
            </h2>
            <form onSubmit = {this.cadastrarCategoria}>
              <div class="container">
                <input
                  value = {this.state.titulo}
                  onChange = {this.atualizaEstadoTitulo}
                  type="text"
                  id="nome-tipo-evento"
                  placeholder="tipo do evento"
                />
                <button
                  type='submit'
                  class="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro">
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <MDBContainer>
        <form onSubmit={this.salvarAlteracoes}>
          <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
            <MDBModalHeader toggle={this.toggle}>Alterar <b>{this.state.editarModal.titulo}</b></MDBModalHeader>
            <MDBModalBody>
              
              <MDBInput 
                label="Categoria"
                value={this.state.editarModal.titulo}
                onChange={this.atualizarEditarModalTitulo.bind(this)}
              />
            
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={this.toggle}>Fechar</MDBBtn>
              <MDBBtn color="primary" type='submit'>Alterar</MDBBtn>
            </MDBModalFooter>
          </MDBModal>
      </form>
    </MDBContainer>


       <Rodape />     
    </div>
        );
    }

}

export default Categoria; //retorna a página como objeto