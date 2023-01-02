

export async function fetchTasks() {
try {
    const res = fetch("/tarefas")
    return res
} catch(error) {
    //Log errors
    console.log("deu nao")
    }
}