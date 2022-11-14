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


//Pegar e renderizar dados do usuário logado
import { dadosDoUsuario } from "../../script/api.js";
const userName = document.querySelector('h2')
const dataUser = document.querySelectorAll('span')
const secaoDepartamento = document.querySelector('.secao_departamento')

function renderUsuario(){
    dadosDoUsuario(token, userName, dataUser[0], dataUser[1], dataUser[2], secaoDepartamento)
}
renderUsuario()


async function renderDepartamento(){
    let tokenUsuariosDepartamento = ''

    await fetch('http://localhost:6278/users/departments', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(reponse => reponse.json())
    .then(reponseJson => {
        secaoDepartamento.children[0].remove()
        let divBoxDepartamento = document.createElement('div')
        let tituloBoxDepartamento = document.createElement('h2')

        divBoxDepartamento.className = 'box_departamento'
        tituloBoxDepartamento.innerText = reponseJson.name

        divBoxDepartamento.appendChild(tituloBoxDepartamento)
        secaoDepartamento.appendChild(divBoxDepartamento)

        tokenUsuariosDepartamento = reponseJson.uuid
    })
    .catch(erro => console.log(erro))

    await fetch('http://localhost:6278/users/departments/coworkers', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(reponseJson => {
        let lista = document.createElement('ul')

        reponseJson[0].users.forEach((user) => {
            console.log(user)
            let item = document.createElement('li')
            let itemName = document.createElement('h3')
            let itemWork = document.createElement('p')

            itemName.innerText = user.username
            itemWork.innerText = user.professional_level

            item.append(itemName, itemWork)
            lista.appendChild(item)
        })

        secaoDepartamento.appendChild(lista)
    })
    .catch(erro => console.log(erro))
}
renderDepartamento()

//Eventos do modal de edição e sua criação
const btnEdit = document.querySelector('button')
import { editarUsuario } from "../../script/api.js";


function criarModal(){
    let divBackground = document.createElement('div')
    let divModal = document.createElement('div')
    let divHeader = document.createElement('div')
    let formularioModal = document.createElement('form')
    let tituloModal = document.createElement('h2')
    let btnClose = document.createElement('button')
    let imgClose = document.createElement('img')
    let inputName = document.createElement('input')
    let inputEmail = document.createElement('input')
    let inputSenha = document.createElement('input')
    let btnFinalizar = document.createElement('button')

    divBackground.className = 'modal_background'
    divModal.className = 'modal'
    tituloModal.innerText = 'Editar Perfil'
    imgClose.src = '../../imgs/Vector.png'
    imgClose.alt = 'icon-fechar'
    inputName.placeholder = 'Seu nome'
    inputEmail.type = 'email'
    inputEmail.placeholder = 'Seu e-mail'
    inputSenha.type = 'password'
    inputSenha.placeholder = 'Sua Senha'
    btnFinalizar.type = 'submit'
    btnFinalizar.innerText = 'Editar Perfil'

    btnClose.addEventListener('click', () => {
        divBackground.remove()
    })
    imgClose.addEventListener('click', () => {
        divBackground.remove()
    })
    divBackground.addEventListener('click', (event) => {
        if(event.target.className === 'modal_background'){
            divBackground.remove()
        }
    })
    btnFinalizar.addEventListener('click', async (event) => {
        event.preventDefault()
        let data = {}

        if(inputName.value !== ''){
            data.username = inputName.value
        }
        if(inputEmail.value !== ''){
            data.email = inputEmail.value
        }
        if(inputSenha !== ''){
            data.password = inputSenha.value
        }

        await editarUsuario(token, data)

        divBackground.remove()
        // location.reload()
        renderUsuario()
    })

    btnClose.appendChild(imgClose)
    divHeader.append(tituloModal, btnClose)
    formularioModal.append(divHeader, inputName, inputEmail, inputSenha, btnFinalizar)
    divModal.appendChild(formularioModal)
    divBackground.appendChild(divModal)
    document.querySelector('body').appendChild(divBackground)
}

btnEdit.addEventListener('click', () => {
    criarModal()
})