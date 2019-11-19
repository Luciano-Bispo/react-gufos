import React, { Component } from 'react';
import Rodape from '../componentes/Rodape';

//imagem
import icon from '../assets/img/icon-login.png';

class Eventos extends Component {

    constructor(props){
        super(props);
        this.state = {
            listaEventos : [],
            titulo:'',
            dataEvento:'',
            acessoLivre:'',
            categoria: 1,
        }

        this.cadastraEvento = this.cadastraEvento.bind(this);
        this.atualizaEstadoTitulo = this.atualizaEstadoTitulo.bind(this);
        this.atualizaEstadoAcesso = this.atualizaEstadoAcesso.bind(this);
        this.atualizaEstadoCategoria = this.atualizaEstadoCategoria.bind(this);
        this.atualizaEstadoDataEvento = this.atualizaEstadoDataEvento.bind(this);
        this.buscarEventos = this.buscarEventos.bind(this);
        
    }
    
    componentDidMount(){
        this.buscarEventos()
    }

     buscarEventos() {
        fetch('http://localhost:5000/api/Eventos')
        .then(resposta => resposta.json())
        .then(data => this.setState({ listaEventos : data}))
        .catch((erro) => console.log(erro));
    }
    
    atualizaEstadoTitulo(event){
        this.setState({
            titulo: event.target.value
        });
    }
    atualizaEstadoDataEvento(event){
        this.setState({
            dataEvento: event.target.value
        });
    }
    atualizaEstadoAcesso(event){
        this.setState({
            acessoLivre: event.target.value
        });
        alert(this.state.acessoLivre);
    }
    atualizaEstadoCategoria(event){
        this.setState({
            categoria: event.target.value
        });
    }

cadastraEvento(event){
    event.preventDefault();

    fetch('http://localhost:5000/api/Eventos', {
        method: 'POST',
        body: JSON.stringify({
            titulo: this.state.titulo,
            dataEvento: this.state.dataEvento,
            acessoLivre: this.state.acessoLivre,
            categoriaId : this.state.categoria,
            localizacaoId: 1
        }),
        headers: {
            'Content-type':'application/json'
        }
    })
    .then(resposta =>{
        if (resposta.status === 200) {
            console.log('Cadastrado com sucesso');
        }
    })
    .catch(erro => console.log(erro))
        .then(this.buscarEventos);
}


deletarEvento = (id) =>{
   console.log('Excluindo');
   fetch('http://localhost:5000/api/Eventos/' + id, {
       method:'DELETE',
       headers:{
           'Content-type': 'application/json'
       }
   }).then(resp => resp.json())
     .then(response => {
         console.log(response);
        //  this.setState(() => ({ lista: this.state.lista}))
        }) 
        .catch(error => console.log(error))
        .then(this.buscarEventos);
}

    render() {
        return (
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
                        <h1 class="conteudoPrincipal-cadastro-titulo">Eventos</h1>
                        <div class="container" id="conteudoPrincipal-lista">
                            <table id="tabela-lista">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Evento</th>
                                        <th>Data</th>
                                        <th>Acesso Livre</th>
                                        <th>Tipo do Evento</th>
                                        <th>Ação</th>
                                    </tr>
                                </thead>

                                <tbody id="tabela-lista-corpo">
                                    { 
                                    
                                    this.state.listaEventos.map(function(eventos) {
                                        return(                                        
                                            <tr key={eventos.eventoId}>

                                                <td> {eventos.eventoId} </td>
                                                <td> {eventos.titulo} </td>
                                                <td> {eventos.dataEvento } </td>
                                                <td> {eventos.acessoLivre ? 'Público' : 'Privado'}</td>
                                                <td> {eventos.categoria.titulo}</td>
                                                <td> 
                                                    <button type='submit' onClick={i => this.deletarEvento(eventos.eventoId)}>Excluir</button>
                                                </td>
                                            </tr>
                                        )
                                    }.bind(this))
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div class="container" id="conteudoPrincipal-cadastro">
                            <h2 class="conteudoPrincipal-cadastro-titulo">Cadastrar Evento</h2>
                            <form  onSubmit={this.cadastraEvento} class="container">
                                <input
                                    type="text"
                                    id="evento__titulo"
                                    placeholder="título do evento"
                                    value={this.state.titulo}
                                    onChange={this.atualizaEstadoTitulo}
                                />
                               
                                <input type="date" id="evento__data" placeholder="dd/MM/yyyy" value={this.state.dataEvento} onChange={ this.atualizaEstadoDataEvento } />
                               
                                <select id="option__acessolivre"
                                 onChange={this.atualizaEstadoAcesso}
                                 value={this.state.acessoLivre}>
                                    <option value='true'>Livre</option>
                                    <option value='false'>Restrito</option>
                                </select>

                                <select id="option__tipoevento" onChange={this.atualizaEstadoCategoria} value={this.atualizaEstadoCategoria} >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                </select>
                                
                            <button
                                type='submit'
                                class="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
                                >
                                Cadastrar
                            </button>
                            </form>
                        </div>
                    </section>
                </main>

                <Rodape />

            </div>

        );
    }
}

export default Eventos;
