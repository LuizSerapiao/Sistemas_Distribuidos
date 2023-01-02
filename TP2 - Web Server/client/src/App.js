//import { response } from 'express';
import React, {useState, useContext,useEffect, handleSubmit} from 'react';
import api from "./service/api"

const style = {
  display:'flex',
  gap:'20px', 
  alignItems:'center',
  flexDirection: "column"
};

const idField = {
  display:'flex',
  gap:'20px', 
  alignItems:'center',
  flexDirection: "row",
  justifyContent: "center"
}

const grid = {
  display:'flex', 
  width: "100vw",
}

const gridItem = {
  display: "flex",
  width: "25%",
}

const textField = {
  alignSelf: "center"
}

function App() {
  const [tarefas, setTarefas] = useState(null);
  const [descricao, setDescricao] = useState('');
  const [prazo, setPrazo] = useState('');
  const [status, setStatus] = useState('');
  const [idB, setIdB] = useState('');
  const [idD, setIdD] = useState('');
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState(undefined);

  useEffect(() => {
    async function fetchTasks() {
      try {
        fetch("/tarefas")
          .then((res) => res.json())
          .then((res) => setTarefas(res))
      } catch(error) {
         console.log("deu nao")
        }
      }
    fetchTasks();
    setLoading(true);
  }, [loading])


  const insertTask = async (e) => {
    e.preventDefault();
    const url = `tarefas`
    fetch(url,{
      method:'POST',
      body: JSON.stringify({
        "descricao": descricao,
        "prazo": prazo,
        "status": status
      }),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
      .then(response => response.json()) 
      .then(json => console.log(json))
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  };

  const deleteTask = async (e) =>{
    e.preventDefault();
    const id = idD
    const url = `tarefas/${id}`
    fetch(url,{
      method:'DELETE'
    })
      .then(() => setLoading(false))
  }

  const searchTask = async (e) =>{
    e.preventDefault();
    const id = idB
    const url = `tarefas/${id}`
    fetch(url,{
      method:'GET'
    })
      .then((res) => res.json())
      .then((res) => setBusca(res))
      .finally(() => setLoading(false))
  }



  return (
    <div>
      <header style={{display: "flex", justifyContent: "center"}}>
        <h1>
          TRABALHO SERVIDOR WEB REST - SISTEMAS DISTRIBUIDOS
        </h1>
      </header>
      <form onSubmit={insertTask} method="post">
        <div style={style}>
          <h3>Insere tarefa:</h3>
          <div style={{display:"flex", alignItems: "center"}}>
            <h3>Descrição:</h3>
            <input type="textfield" style={{textField}} onChange={({ target }) => setDescricao(target.value)}/>
          </div>
          <div style={{display:"flex", alignItems: "center"}}>
            <h3>Prazo:</h3>
            <input type="textfield" style={{textField}} onChange={({ target }) => setPrazo(target.value)}/>
          </div>
          <div style={{display:"flex", alignItems: "center"}}>
            <h3>Status:</h3>
            <input type="textfield" style={{textField}} onChange={({ target }) => setStatus(target.value)}/>
          </div>
          <button type="submit">inserir tarefa</button>
        </div>
      </form>
      <form onSubmit={deleteTask} method="delete">
        <div style={idField}>
          <h3>Delete tarefa de id:</h3>
          <input type="textfield" style={{textField}} onChange={({ target }) => setIdD(target.value)}/>
          <button type="submit">delete tarefa</button>
        </div>
      </form>
      <form onSubmit={searchTask} method="get">
        <div style={idField}>
          <h3>Buscar tarefa de id:</h3>
          <input type="textfield" style={{textField}} onChange={({ target }) => setIdB(target.value)}/>
          <button type="submit">buscar</button>
        </div>
      </form>
      <h2 style={{padding: "10px"}}>Tarefa Buscada:</h2>
      <div style={grid} >
          <h3 style={gridItem}>id</h3>
          <h3 style={gridItem}>descricao</h3>
          <h3 style={gridItem}>prazo</h3>
          <h3 style={gridItem}>status</h3>
      </div>
      {busca === undefined ? ('') : (
        <div style={grid} >
          <p style={gridItem}>{busca.id}</p>
          <p style={gridItem}>{busca.descricao}</p>
          <p style={gridItem}>{busca.prazo}</p>
          <p style={gridItem}>{busca.status}</p>
        </div>
      )
      }
      <h2 style={{padding: "10px"}}>Listagem de todas as tarefas:</h2>
      <div style={grid} >
          <h3 style={gridItem}>id</h3>
          <h3 style={gridItem}>descricao</h3>
          <h3 style={gridItem}>prazo</h3>
          <h3 style={gridItem}>status</h3>
      </div>
      { tarefas?.map((tarefa, index) => (
        <div style={grid} >
          <p style={gridItem}>{tarefa.id}</p>
          <p style={gridItem}>{tarefa.descricao}</p>
          <p style={gridItem}>{tarefa.prazo}</p>
          <p style={gridItem}>{tarefa.status}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
