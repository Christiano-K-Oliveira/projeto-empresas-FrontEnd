async function listarEmpresas(lista, select){
    let baseUrl = await fetch('http://localhost:6278/companies', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    baseUrl = await baseUrl.json()

    let baseSectors = await fetch('http://localhost:6278/sectors', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    baseSectors = await baseSectors.json()

    lista.innerHTML  = ''
    select.innerHTML = ''


    baseUrl.forEach((element) => {
        let itemEmpresa = document.createElement('li')
        let tituloEmpresa = document.createElement('h3')
        let horasEmpresa = document.createElement('span')
        let setorEmpresa = document.createElement('span')

        tituloEmpresa.innerText = element.name
        horasEmpresa.innerText = `${element.opening_hours.slice(0, 2)} horas`
        horasEmpresa.className = 'horas_empresa'
        setorEmpresa.className = 'setor_empresa'
        setorEmpresa.innerText = element.sectors.description

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
        }     
        const observerCard = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting){
                    entry.target.classList.add('show');
                }
                else{
                    entry.target.classList.remove('show');
                }
            })
        }, options)       
        observerCard.observe(itemEmpresa)

        itemEmpresa.append(tituloEmpresa, horasEmpresa, setorEmpresa)
        lista.appendChild(itemEmpresa)
    })

    let option = document.createElement('option')
    option.innerText = 'Selecionar Setor'
    option.value = `select-setor`
    select.appendChild(option)

    baseSectors.forEach((element) => {
        let option = document.createElement('option')
        option.innerText = element.description
        option.value = `select-${element.description}`

        select.appendChild(option)
    })
}

export {listarEmpresas}


async function aplicarFiltro(lista, elemento){
    let baseUrl = await fetch('http://localhost:6278/companies', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    baseUrl = await baseUrl.json()

    lista.innerHTML = ''

    baseUrl.forEach((element) => {
        if(element.sectors.description === elemento){
            let itemEmpresa = document.createElement('li')
            let tituloEmpresa = document.createElement('h3')
            let horasEmpresa = document.createElement('span')
            let setorEmpresa = document.createElement('span')
    
            tituloEmpresa.innerText = element.name
            horasEmpresa.innerText = `${element.opening_hours.slice(0, 2)} horas`
            horasEmpresa.className = 'horas_empresa'
            setorEmpresa.className = 'setor_empresa'
            setorEmpresa.innerText = element.sectors.description
    
            itemEmpresa.append(tituloEmpresa, horasEmpresa, setorEmpresa)
            lista.appendChild(itemEmpresa)
        }
    })
}

export { aplicarFiltro }


async function cadastrarUsuario(usuario){
    
    let baseUrl = await fetch('http://localhost:6278/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    }).then(response => response.json())
    .then(responseJson => {
        setTimeout(() => {
            window.location.href = window.location.href.replace('register', 'login')
        }, 3000) 
    })
    .catch(erro => {console.log(erro)})
    // try{
    // }
    // catch(erro){
    // }

}

export { cadastrarUsuario }


async function logarUsuario(usuario, btnLogin){
    let baseUrl = await fetch('http://localhost:6278/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    }).then(response => response.json())
    .then(responseJson => {
        btnLogin.innerText = ''
        let img = document.createElement('img')
        img.src = '../../imgs/spinner.png'
        btnLogin.appendChild(img)
        localStorage.setItem('KenzieEmpresas-TokenUsuario', responseJson.token)

        if(usuario.email === 'admin@mail.com' && usuario.password === 'admin'){
            setTimeout(() => {
                window.location.href = window.location.href.replace('login', 'admin')
             }, 3300)  
        }
        else{
            setTimeout(() => {
               window.location.href = window.location.href.replace('login', 'user')
            }, 3300)  
        }
    })
    .catch(erro => {
        console.log(erro)
    })

    // if(baseUrl.statusText !== 'Unauthorized'){
    //     localStorage.setItem('KenzieEmpresas-Usuario')
    //     window.location.href = window.location.href.replace('login', 'home')
    // }

    return baseUrl
}

export { logarUsuario }

//User sem admin
async function dadosDoUsuario(acesso, name, email, setor, work = '', secao){
    let baseUrl = await fetch('http://localhost:6278/users/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${acesso}`
        },
    }).then(response => response.json())
    .then(responseJson => {
        // console.log(responseJson)
        let sector = responseJson.professional_level[0].toUpperCase() + responseJson.professional_level.slice(1)

        name.innerText = responseJson.username
        email.innerText = responseJson.email
        setor.innerText = sector

        if(responseJson.kind_of_work !== null && responseJson.kind_of_work !== ''){
            work.innerText = responseJson.kind_of_work
        }
        else{
            work.innerText = ''

            secao.classList.add('departamento_vazio')
            let titleVazio = document.createElement('h2')
            titleVazio.innerText = 'Você ainda não foi contratado'
            secao.appendChild(titleVazio)
        }
    })
    .catch(erro => {
        console.log(erro)
    })

}

export { dadosDoUsuario }



async function editarUsuario(acesso, objeto){
    await fetch('http://localhost:6278/users', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${acesso}`
        },
        body: JSON.stringify(objeto)
    }).then(reponse => reponse.json())
    .catch(erro => console.log(erro))
}

export { editarUsuario }



//User admin

//Pegar os departamentos
async function listaDepartamentos(acesso){
    await fetch('http://localhost:6278/departments', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${acesso}`
        }
    }).then(reponse => reponse.json())
    .then(responseJson => {
        console.log(responseJson)
    })
    .catch(erro => console.log(erro))
}




