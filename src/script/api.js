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
    })

    return baseUrl 
}

export { cadastrarUsuario }


async function logarUsuario(usuario){
    let baseUrl = await fetch('http://localhost:6278/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })

    if(baseUrl.statusText !== 'Unauthorized'){
        localStorage.setItem('KenzieEmpresas-Usuario')
        window.location.href = window.location.href.replace('login', 'home')
    }

    return baseUrl
}

export { logarUsuario }


















