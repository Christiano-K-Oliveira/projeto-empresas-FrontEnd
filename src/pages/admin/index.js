//Verificar Autenticação do usuário
const token = localStorage.getItem('KenzieEmpresas-TokenUsuario')

function verificarAutencicacao(){
    if(token === null || token.length < 20 || token === ''){
       window.location.href = window.location.href.replace('user', 'home')
    }
}
verificarAutencicacao()


//Fazer o logout
const btnLogout = document.querySelector('a')
btnLogout.addEventListener('click', () => {
    localStorage.removeItem('KenzieEmpresas-TokenUsuario')
})


//Listar Departamento e funcionalidades
const departamentosLista = document.getElementById('list_departments')
const listaUsuarios = document.getElementById('list_usuarios')
const selectDepartamentos = document.getElementById('select_empresa')
import { modalEditDepartamento, modalExcluirDepartamento, modalVisualizarDepartamento, listarEmpresas } from "./modal.js";
listarEmpresas(selectDepartamentos)


async function renderDepartments(){
    departamentosLista.innerHTML = ''

    await fetch('http://localhost:6278/departments', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(reponse => reponse.json())
    .then(listaDepartamentos => {
        listaDepartamentos.forEach((departamento) => {
            let item = document.createElement('li')
            let departamentoNome = document.createElement('h3')
            let departamentoDescricao = document.createElement('span')
            let departamentoCompany = document.createElement('span')
            let divBtns = document.createElement('div')
            let btnVisualizar = document.createElement('button')
            let btnEditar = document.createElement('button')
            let btnExcluir = document.createElement('button')
            let imgVisualizar = document.createElement('img')
            let imgEditar = document.createElement('img')
            let imgExcluir = document.createElement('img')

            imgVisualizar.src = '../../imgs/icon-vizualizar.png'
            imgVisualizar.alt = 'icon-visualização'
            imgEditar.src = '../../imgs/icon-editar.png'
            imgEditar.alt = 'icon-edição'
            imgExcluir.src = '../../imgs/icon-trash.png'
            imgExcluir.alt = 'icon-lixeira'
            departamentoNome.innerText = departamento.name
            departamentoDescricao.innerText = departamento.description
            departamentoCompany.innerText = departamento.companies.name
            item.id = departamento.uuid

            btnEditar.addEventListener('click', (event) => {
                let corpo = document.querySelector('body')
                let descricaoAtual = event.target.closest('li').children[1].innerText
                let idDepartamento = event.target.closest('li').id
                modalEditDepartamento(corpo, descricaoAtual, idDepartamento, token, renderDepartments)
            })
            btnExcluir.addEventListener('click', (event) => {
                let corpo = document.querySelector('body')
                let idDepartamento = event.target.closest('li').id
                let departamentoNome = event.target.closest('li').children[0].innerText

                modalExcluirDepartamento(corpo, idDepartamento, token, renderDepartments, departamentoNome)
            })
            btnVisualizar.addEventListener('click', (event) => {
                let item = event.target.closest('li')
                let corpo = document.querySelector('body')
                let infoDepartamento = [item.children[0].innerText, item.children[1].innerText, item.children[2].innerText, item.id]

                modalVisualizarDepartamento(corpo, infoDepartamento, token)
            })

            btnVisualizar.appendChild(imgVisualizar)
            btnEditar.appendChild(imgEditar)
            btnExcluir.appendChild(imgExcluir)
            divBtns.append(btnVisualizar, btnEditar, btnExcluir)
            item.append(departamentoNome, departamentoDescricao, departamentoCompany, divBtns)
            departamentosLista.appendChild(item)
        })
    })
    .catch(erro => console.log(erro))
}
renderDepartments()

selectDepartamentos.addEventListener('click', async (event) => {
    let item = event.target

    if(item.value !== 'selecionar_empresa' && item.id !== 'select_empresa'){
        await fetch(`http://localhost:6278/departments/${item.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(reponse => reponse.json())
        .then(reponseJson => {
            if(reponseJson.length > 0){
                departamentosLista.innerHTML = ''

                reponseJson.forEach((item) => {
                    let itemList = document.createElement('li')
                    let departamentoNome = document.createElement('h3')
                    let departamentoDescricao = document.createElement('span')
                    let departamentoCompany = document.createElement('span')
                    let divBtns = document.createElement('div')
                    let btnVisualizar = document.createElement('button')
                    let btnEditar = document.createElement('button')
                    let btnExcluir = document.createElement('button')
                    let imgVisualizar = document.createElement('img')
                    let imgEditar = document.createElement('img')
                    let imgExcluir = document.createElement('img')
        
                    imgVisualizar.src = '../../imgs/icon-vizualizar.png'
                    imgVisualizar.alt = 'icon-visualização'
                    imgEditar.src = '../../imgs/icon-editar.png'
                    imgEditar.alt = 'icon-edição'
                    imgExcluir.src = '../../imgs/icon-trash.png'
                    imgExcluir.alt = 'icon-lixeira'
                    departamentoNome.innerText = item.name
                    departamentoDescricao.innerText = item.description
                    departamentoCompany.innerText = item.companies.name
                    itemList.id = item.uuid

                    btnEditar.addEventListener('click', (event) => {
                        let corpo = document.querySelector('body')
                        let descricaoAtual = event.target.closest('li').children[1].innerText
                        let idDepartamento = event.target.closest('li').id
                        modalEditDepartamento(corpo, descricaoAtual, idDepartamento, token, renderDepartments)
                    })
                    btnExcluir.addEventListener('click', (event) => {
                        let corpo = document.querySelector('body')
                        let idDepartamento = event.target.closest('li').id
                        let departamentoNome = event.target.closest('li').children[0].innerText
        
                        modalExcluirDepartamento(corpo, idDepartamento, token, renderDepartments, departamentoNome)
                    })
                    btnVisualizar.addEventListener('click', (event) => {
                        let item = event.target.closest('li')
                        let corpo = document.querySelector('body')
                        let infoDepartamento = [item.children[0].innerText, item.children[1].innerText, item.children[2].innerText, item.id]
        
                        modalVisualizarDepartamento(corpo, infoDepartamento, token)
                    })

                    btnVisualizar.appendChild(imgVisualizar)
                    btnEditar.appendChild(imgEditar)
                    btnExcluir.appendChild(imgExcluir)
                    divBtns.append(btnVisualizar, btnEditar, btnExcluir)
                    itemList.append(departamentoNome, departamentoDescricao, departamentoCompany, divBtns)
                    departamentosLista.appendChild(itemList)
                })
            }
        })
        .catch(erro => {
            console.log(erro)
        })
    }
    else{
        renderDepartments()
    }
})

//Listar usuarios e funcionalidades
import { modalEditUsuario, modalApagarUsuario } from "./modal.js";


async function renderUsuarios(){
    listaUsuarios.innerHTML = ''

    await fetch('http://localhost:6278/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(reponse => reponse.json())
    .then(usuarios => {
        usuarios.forEach((usuario) => {
            let item = document.createElement('li')
            let userName = document.createElement('h3')
            let userNivel = document.createElement('span')
            let userCompany = document.createElement('span')
            let divBtns = document.createElement('div')
            let btnEditar = document.createElement('button')
            let btnExcluir = document.createElement('button')
            let imgEditar = document.createElement('img')
            let imgExcluir = document.createElement('img')

            imgEditar.src = '../../imgs/Vector (2).png'
            imgEditar.alt = 'icon-edição'
            imgExcluir.src = '../../imgs/icon-trash.png'
            imgExcluir.alt = 'icon-lixeira'
            userName.innerText = usuario.username
            userNivel.innerText = usuario.professional_level
            item.id = usuario.uuid

            if(usuario.kind_of_work !== null){
                userCompany.innerText = usuario.kind_of_work
            }

            btnEditar.addEventListener('click', async (event) => {
                let corpo = document.querySelector('body')
                let idItemEdit = event.target.closest('li').id
                await modalEditUsuario(corpo, idItemEdit, token, renderUsuarios)
            })
            btnExcluir.addEventListener('click', (event) => {
                let corpo = document.querySelector('body')
                let itemUsername = event.target.closest('li').children[0].innerText
                let itemId = event.target.closest('li').id

                modalApagarUsuario(itemUsername, corpo, itemId, token, renderUsuarios)
            })

            btnEditar.appendChild(imgEditar)
            btnExcluir.appendChild(imgExcluir)
            divBtns.append(btnEditar, btnExcluir)
            item.append(userName, userNivel, userCompany, divBtns)
            listaUsuarios.appendChild(item)

            if(usuario.is_admin){
                item.remove()
            }
        })
    })
    .catch(erro => console.log(erro))
}
renderUsuarios()


//Criar Departamento
const btnCriarDepartamento = document.querySelector('button')
import { criarDepartamento } from "./modal.js";

btnCriarDepartamento.addEventListener('click', async () => {
    let corpo = document.querySelector('body')

    await criarDepartamento(corpo, token, renderDepartments)
})











// Quando terminar os eventos da renderDepartments tem que pegar e colocar no evento do fitro do select Departamentos





















