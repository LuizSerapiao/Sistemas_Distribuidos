const express = require('express');
const app = express();

app.use(express.json())


const cors = require('cors');  
app.use(cors({credentials: true, origin: 'http://192.168.0.174:3000'}));
app.use(require("body-parser").json())

let tarefas = [
    {
        id: 0,
        descricao: "estudar",
        prazo: "15 de janeiro",
        status: "incompleta"
    },
    {
        id: 1,
        descricao: "para",
        prazo: "14 de dezembro",
        status: "completa"
    },
    {
        id: 2,
        descricao: "passar",
        prazo: "20 de novembro",
        status: "completa"
    },
    {
        id: 3,
        descricao: "em",
        prazo: "10 de fevereiro",
        status: "incompleta"
    },
    {
        id: 4,
        descricao: "sistemas distribuidos",
        prazo: "15 de dezembro",
        status: "incompleta"
    }
]

function removeTarefa(id){
    tarefas.splice(id,1);
    if(id<tarefas.length){
        for(let i=id; i < tarefas.length; ++i){
            tarefas[i].id = tarefas[i].id-1
        }
    }
}

app.get("/tarefas", function(req, res){
    res.json(tarefas);
});

app.get("/tarefas/:id", function(req, res){
    const id = req.params.id
    const resposta = tarefas.find(tarefa => tarefa.id == id)
    console.log(resposta)
    if(!resposta) return res.status(204).json()
    res.json(resposta);
});

app.post("/tarefas", function(req, res){
    const id = tarefas.length
    console.log(req.body)
    const descricao = req.body.descricao
    const prazo = req.body.prazo
    const status = req.body.status
    tarefas.push({id,descricao, prazo, status})
    res.json(tarefas[id]);
});

app.delete("/tarefas/:id", function(req, res){
    const id = req.params.id
    const resposta = tarefas.find(tarefa => tarefa.id == id)
    if(!resposta) return res.status(204).json()
    console.log("Tarefa removida: " + resposta.tarefa)
    res.json("Tarefa removida: " + resposta.tarefa);
    removeTarefa(id)
});

app.listen(8080, "192.168.0.125",function(){
    console.log("Server is running")
});