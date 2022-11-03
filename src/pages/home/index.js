import { listarEmpresas, aplicarFiltro } from "../../script/api.js";

const listaEmpresas = document.getElementById('lista_empresas')
const menuSelect = document.getElementById('seletor_empresa')
listarEmpresas(listaEmpresas, menuSelect)

//Aplicar filtro
menuSelect.addEventListener('click', async (event) => {
    let select = event.target

    if(select.tagName === 'OPTION' && select.innerText !== 'Selecionar Setor'){
        aplicarFiltro(listaEmpresas, select.innerText)
    }
    else if(select.tagName === 'OPTION'){
        listarEmpresas(listaEmpresas, menuSelect)
    }
})

//Criar o menu do mobile
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
        btnLogin.innerText = 'Login'
        btnLogin.href = '../login/index.html'
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