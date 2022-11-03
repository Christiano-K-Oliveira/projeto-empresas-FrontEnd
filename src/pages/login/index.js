const btnMenu = document.getElementById('img_menu')
const boxMenu = document.getElementById('box_menu')

btnMenu.addEventListener('click', (event) => {
    let imgBtn = event.target

    if(imgBtn.src === 'http://127.0.0.1:5500/src/imgs/Vector%20(1).png'){
        imgBtn.style.animation = 'none'
        imgBtn.src = '../../imgs/Vector.png'
        setTimeout(function() {
            imgBtn.style.animation = "";
        }, 100);

        let listaMenu = document.createElement('ul')
        let btnLogin = document.createElement('a')
        let btnCadastro = document.createElement('a')

        listaMenu.id = 'list_menu'
        btnLogin.id = 'btn_login'
        btnLogin.innerText = 'Home'
        btnLogin.href = '../home/index.html'
        btnCadastro.innerText = 'Cadastro'
        btnCadastro.href = '../register/index.html'

        listaMenu.append(btnLogin, btnCadastro)
        boxMenu.appendChild(listaMenu)
    }
    else{
        imgBtn.style.animation = 'none'
        imgBtn.src = '../../imgs/Vector (1).png'
        let lista = document.getElementById('list_menu')
        lista.remove()

        setTimeout(function() {
            imgBtn.style.animation = "";
        }, 100);    
    }
})


const btnLogin = document.querySelector('button')
const inputs = document.querySelectorAll('input')
import { logarUsuario } from "../../script/api.js";


btnLogin.addEventListener('click', (event) => {
    event.preventDefault()

    if(inputs[0].value !== '' && inputs[1].value !== ''){
        let user = {
            "email": `${inputs[0].value}`,
            "password": `${inputs[1].value}`
        }
        logarUsuario(user)
    }
})