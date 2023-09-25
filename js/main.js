// Criar um array para armazenar os dados
let banco = []

const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? []
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco))

//criar uma função anônima / arrow function
const inputItem = (tarefa, status, indice) => {
    const item = document.createElement('label')
    item.classList.add('todo_item')
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <section>${tarefa}</section>
        <input type="button" value="x" data-indice=${indice}>
    `
    document.getElementById('todoList').appendChild(item)
}

const atualizaView = () => {
    limpaTela();
    const banco = getBanco()
    banco.forEach( (item, indice) => inputItem(item.tarefa,item.status, indice))
}

const limpaTela = () => {
    const lista = document.getElementById('todoList')
    while (lista.firstChild) {
        lista.removeChild(lista.lastChild)
    }
}

const insereItem = (event) => {
    const tecla = event.key
    const valor = event.target.value

    if(tecla === 'Enter'){
        const banco = getBanco()
        banco.push({'tarefa':valor, 'status' : ''})
        setBanco(banco)
        atualizaView()
        event.target.value = ''
    }
}

const atualizaItem = () => {
    const banco = getBanco()
    banco[indice].status = banco[indice].status === '' ? 'checked' : ''
    setBanco()
    atualizaView()
}

const removeItem = () =>{
    const banco = getBanco()
    banco.splice(indice, 1)
    setBanco()
    atualizaView()
}

document.getElementById('newItem').addEventListener('keypress', insereItem)
document.getElementById('todoList').addEventListener('click', removeItem)
atualizaView()