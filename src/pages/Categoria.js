import React, { Component } from 'react';
import Rodape from '../componentes/Rodape';
import icon from  '../assets/img/icon-login.png';

class Categoria extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            listaCategorias: [],
            titulo: ''
        }

        this.buscarCategorias = this.buscarCategorias.bind(this);
        this.atualizaEstadoTitulo = this.atualizaEstadoTitulo.bind(this);
        this.cadastrarCategoria = this.cadastrarCategoria.bind(this);

    }

    //função que faz a requisição para a api
    //atribui os dados recebidos ao state lista categorias
    //e caso ocorra um erro, exibe no console do navegador
    buscarCategorias(){
        fetch('http://localhost:5000/api/Categorias')
        .then(resposta => resposta.json())
        .then(data => this.setState({ listaCategorias: data }))
        .catch((erro) => console.log(erro));
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

    render(){
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
                </tr>
              </thead>

              <tbody id="tabela-lista-corpo">
                {
                    this.state.listaCategorias.map(function(categoria){
                    return (
                      <tr key={categoria.categoriaId}>
                        <td> {categoria.categoriaId}</td>
                        <td> {categoria.titulo}</td>
                      </tr>
                    )
                  }) 
                }
              </tbody>
            </table>
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

       <Rodape />     
    </div>
        );
    }

}

export default Categoria; //retorna a página como objeto