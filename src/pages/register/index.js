const btnMenu = document.getElementById('img_menu')
const boxMenu = document.getElementById('box_menu')

//Menu mobile
btnMenu.addEventListener('click', (event) => {
    let imgBtn = event.target

    if(imgBtn.src === 'http://127.0.0.1:5500/src/imgs/Vector%20(1).png'){
        imgBtn.style.animation = 'none'
        imgBtn.src = '../../imgs/Vector.png'
        setTimeout(function() {
            imgBtn.style.animation = "";
        }, 100);

        let listaMenu = document.createElement('ul')
        let btnHome = document.createElement('a')
        let btnLogin = document.createElement('a')

        listaMenu.id = 'list_menu'
        btnHome.id = 'btn_home'
        btnHome.innerText = 'Home'
        btnHome.href = '../home/index.html'
        btnLogin.innerText = 'Login'
        btnLogin.href = '../login/index.html'

        listaMenu.append(btnHome, btnLogin)
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


//Evento Cadastro
const btnCadastrar = document.querySelector('button')
const inputs = [...document.querySelectorAll('input')]
const menuSelect = document.querySelector('select')
import { cadastrarUsuario } from "../../script/api.js";


btnCadastrar.addEventListener('click', (event) => {
    event.preventDefault()
    let button = event.target

    if(inputs[0].value !== '' && inputs[1].value !== '' && inputs[2].value !== '' && menuSelect.value !== 'nivel_profissional'){
        let user = {
                "username": `${inputs[0].value}`,
                "password": `${inputs[2].value}`,
                "email": `${inputs[1].value}`,
                "professional_level": `${menuSelect.value}`
        }
        cadastrarUsuario(user)

        button.innerText = ''
        let img = document.createElement('img')
        img.src = '../../imgs/spinner.png'
        button.appendChild(img)

        setTimeout(() => {
            window.location.href = window.location.href.replace('register', 'login')
        }, 3000)   
    }
    
})


































