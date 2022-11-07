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