async function verificarSetorDaEmpresa(idEmpresa, acesso, value){
    await fetch(`http://localhost:6278/departments/${idEmpresa}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${acesso}`
        }
    }).then(reponse => reponse.json())
    .then(departamento => {
        if(departamento.lenght !== 0){
            console.log(departamento)
        }
    })
    .catch(erro => console.log(erro))
}

async function listaDeEmpresas(select, acess){
    let baseUrl = await fetch('http://localhost:6278/companies', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    baseUrl = await baseUrl.json()

    baseUrl.forEach((empresa) => {
        let opt = document.createElement('option')
        opt.innerText = empresa.name
        opt.id = empresa.uuid
        opt.value = ''

        verificarSetorDaEmpresa(empresa.uuid, acess, opt)

        select.appendChild(opt)
    })
}

export { listaDeEmpresas }