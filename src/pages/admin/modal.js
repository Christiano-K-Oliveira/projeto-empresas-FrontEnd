function modalEditUsuario(page, id, acesso, renderList){
    let divBackground = document.createElement('div')
    let divModal = document.createElement('div')
    let divHeader = document.createElement('div')
    let tituloEdit = document.createElement('h2')
    let btnFechar = document.createElement('button')
    let imgFechar = document.createElement('img')
    let selectModalidade = document.createElement('select')
    let selectNivel = document.createElement('select')
    let optModalidadePresencial = document.createElement('option')
    let optModalidadeHomeOffice = document.createElement('option')
    let optModalidadeHibrido = document.createElement('option')
    let optNivelEstagio = document.createElement('option')
    let optNivelJunior = document.createElement('option')
    let optNivelPleno = document.createElement('option')
    let optNivelSenior = document.createElement('option')
    let btnEditar = document.createElement('button')
    let optModalidadeVazio = document.createElement('option')
    let optNivelVazio = document.createElement('option')

    divBackground.className = 'modal_background'
    divModal.className = 'modal_edit_usuario'
    tituloEdit.innerText = 'Editar Usuário'
    imgFechar.src = '../../imgs/Vector.png'
    imgFechar.alt = 'icon-fechar'
    selectModalidade.value = 'modalidade'
    selectModalidade.id = 'select_modalidade_edit_user'
    selectNivel.value = 'nivel'
    selectNivel.id = 'select_nivel_edit_user'
    optModalidadePresencial.innerText = 'Presencial'
    optModalidadePresencial.value = 'presencial'
    optModalidadeHomeOffice.innerText = 'Home Office'
    optModalidadeHomeOffice.value = 'home office'
    optModalidadeHibrido.innerText = 'Hibrido'
    optModalidadeHibrido.value = 'hibrido'
    optNivelEstagio.innerText = 'Estágio'
    optNivelEstagio.value = 'estágio'
    optNivelJunior.innerText = 'Júnior'
    optNivelJunior.value = 'júnior'
    optNivelPleno.innerText = 'Pleno'
    optNivelPleno.value = 'pleno'
    optNivelSenior.innerText = 'Sênior'
    optNivelSenior.value = 'sênior'
    btnEditar.innerText = 'Editar'
    optModalidadeVazio.innerText = 'Selecionar modalidade de trabalho'
    optModalidadeVazio.value = 'modalidade_vazia'
    optNivelVazio.innerText = 'Selecionar nível profissional'
    optNivelVazio.value = 'nivel_vazio'

    btnFechar.addEventListener('click', () => {
        divBackground.remove()
    })
    divBackground.addEventListener('click', (event) => {
        if(event.target.className === 'modal_background'){
            divBackground.remove()
        }
    })
    btnEditar.addEventListener('click', async () => {
        
        if(selectModalidade.value !== 'Selecionar modalidade de trabalho' && selectNivel.value !== 'Selecionar nível profissional'){
            let editObjt = {
                "kind_of_work": selectModalidade.value,
                "professional_level": selectNivel.value
            }

            await fetch(`http://localhost:6278/admin/update_user/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${acesso}`
                },
                body: JSON.stringify(editObjt)
            })

            btnEditar.innerText = 'Editado com sucesso!'
            btnEditar.style = 'background-color: var(--brand-1-hover);'
            setTimeout(() => {
                renderList()
                divBackground.remove()
            }, 1500)
        }
    })


    btnFechar.appendChild(imgFechar)
    divHeader.append(tituloEdit, btnFechar)
    selectModalidade.append(optModalidadeVazio ,optModalidadePresencial, optModalidadeHomeOffice, optModalidadeHibrido)
    selectNivel.append(optNivelVazio ,optNivelEstagio, optNivelJunior, optNivelPleno, optNivelSenior)
    divModal.append(divHeader, selectModalidade, selectNivel, btnEditar)
    divBackground.appendChild(divModal)
    page.appendChild(divBackground)

}

export { modalEditUsuario }


function modalApagarUsuario(username, page, id, acesso, renderList){
    let divBackground = document.createElement('div')
    let divModal = document.createElement('div')
    let tituloDeletar = document.createElement('h2')
    let btnDeletar = document.createElement('button')
    let btnFechar = document.createElement('button')
    let imgFechar = document.createElement('img')
    
    divBackground.className = 'modal_background'
    divModal.className = 'modal_deletar_usuario'
    tituloDeletar.innerText = `Realmente deseja remover o usuário ${username}?`
    btnDeletar.innerText = 'Deletar'
    btnDeletar.className = 'btn_deletar_usuario'
    imgFechar.src = '../../imgs/Vector.png'
    imgFechar.alt = 'icon-fechar'
    btnFechar.className = 'btn_fechar_usuario'

    btnFechar.addEventListener('click', () => {
        divBackground.remove()
    })
    divBackground.addEventListener('click', (event) => {
        let click = event.target
        if(click.className === 'modal_background'){
            divBackground.remove()
        }
    })
    btnDeletar.addEventListener('click', async () => {
        await fetch(`http://localhost:6278/admin/delete_user/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${acesso}`
            }
        })

        renderList()
        divBackground.remove()
    })

    btnFechar.appendChild(imgFechar)
    divModal.append(tituloDeletar, btnDeletar, btnFechar)
    divBackground.appendChild(divModal)
    page.appendChild(divBackground)
}

export { modalApagarUsuario }

function modalEditDepartamento(page, valueText, id, acesso, renderDepartamentos){
    let divBackground = document.createElement('div')
    let divModal = document.createElement('div')
    let tituloEdit = document.createElement('h2')
    let textoArea = document.createElement('textarea')
    let btnSalvar = document.createElement('button')
    let btnFechar = document.createElement('button')
    let imgFechar = document.createElement('img')

    divBackground.className = 'modal_background'
    divModal.className = 'modal_editar_departamento'
    tituloEdit.innerText = 'Editar Departamento'
    imgFechar.src = '../../imgs/Vector.png'
    imgFechar.alt = 'icon-fechar'
    btnSalvar.innerText = 'Salvar alterações'
    textoArea.name = 'descricao-departamento'
    textoArea.id = 'text_area_editar_departamento'
    textoArea.rows = 5
    textoArea.value = valueText
    btnFechar.className = 'btn_fechar_editar_departamento'
    btnSalvar.className = 'btn_salvar_editar_departamento'

    btnFechar.addEventListener('click', () => {
        divBackground.remove()
    })
    divBackground.addEventListener('click', (event) => {
        let click = event.target
        if(click.className === 'modal_background'){
            divBackground.remove()
        }
    })
    btnSalvar.addEventListener('click', async () => {

        if(textoArea.value !== ''){
            let editDepartamento = {
                "description": `${textoArea.value}`
            }
    
            await fetch(`http://localhost:6278/departments/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${acesso}`,
                },
                body: JSON.stringify(editDepartamento)
            })
    
            btnSalvar.innerText = 'Salvo com sucesso!'
            btnSalvar.style = 'background-color: var(--brand-1-hover)'
            setTimeout(() => {
                renderDepartamentos()
                divBackground.remove()
            }, 1500)
        }
    })

    btnFechar.appendChild(imgFechar)
    divModal.append(tituloEdit, textoArea, btnSalvar, btnFechar)
    divBackground.appendChild(divModal)
    page.appendChild(divBackground)
}

export { modalEditDepartamento }

async function listarEmpresas(select) {
    let baseUrl = await fetch('http://localhost:6278/companies', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    baseUrl = await baseUrl.json()

    baseUrl.forEach((empresa) => {
        let option = document.createElement('option')
        
        option.innerText = empresa.name
        option.value = empresa.name
        option.id = empresa.uuid
        select.appendChild(option)
    })
}

function criarDepartamento(page, acesso, renderDepartamentos){
    let divBackground = document.createElement('div')
    let divModal = document.createElement('div')
    let tituloCriar = document.createElement('h2')
    let formulario = document.createElement('form')
    let inputNome = document.createElement('input')
    let inputDescricao = document.createElement('input')
    let inputSelecionar = document.createElement('select')
    let btnCriar = document.createElement('button')
    let btnFechar = document.createElement('button')
    let imgFechar = document.createElement('img')
    let optSelecionarVazio = document.createElement('option')

    divBackground.className = 'modal_background'
    divModal.className = 'modal_criar_departamento'
    imgFechar.src = '../../imgs/Vector.png'
    imgFechar.alt = 'icon-fechar'
    btnFechar.className = 'btn_fechar_criar_departamento'
    btnCriar.innerText = 'Criar o departamento'
    btnCriar.className = 'btn_criar_departamento'
    inputNome.placeholder = 'Nome do departamento'
    inputDescricao.placeholder = 'Descrição'
    inputSelecionar.name = 'departamento'
    tituloCriar.innerText = 'Criar Departamento' 
    optSelecionarVazio.innerText = 'Selecionar empresa'
    optSelecionarVazio.value = 'selecionar-empresa'
    listarEmpresas(inputSelecionar)

    btnFechar.addEventListener('click', () => {
        divBackground.remove()
        console.log(inputSelecionar.id)
    })
    divBackground.addEventListener('click', (event) =>{
        let click = event.target
        if(click.className === 'modal_background'){
            divBackground.remove()
        }
    })
    formulario.addEventListener('submit', (event) => {
        event.preventDefault()
    })
    btnCriar.addEventListener('click', async () => {
        if(inputNome.value !== '' && inputDescricao.value !== '' && inputSelecionar.value !== ''){

            let options =[...inputSelecionar.options]
            let objtDepartamento = {
                "name": inputNome.value,
                "description": inputDescricao.value,
            }

            await options.forEach((opt) => {
                if(opt.value === inputSelecionar.value){
                    objtDepartamento.company_uuid = opt.id
                }
            })
            console.log(objtDepartamento)

            await fetch('http://localhost:6278/departments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${acesso}` 
                },
                body: JSON.stringify(objtDepartamento)
            })

            btnCriar.innerText = 'Criado com sucesso!'
            btnCriar.style = 'background-color: var(--brand-1-hover)'
            setTimeout(() => {
                renderDepartamentos()
                divBackground.remove()
            }, 1500)
        }
    })

    btnFechar.appendChild(imgFechar)
    inputSelecionar.append(optSelecionarVazio)
    formulario.append(tituloCriar, inputNome, inputDescricao, inputSelecionar, btnCriar, btnFechar)
    divModal.appendChild(formulario)
    divBackground.appendChild(divModal)
    page.appendChild(divBackground)
}

export { criarDepartamento, listarEmpresas }



function modalExcluirDepartamento (page, idDep, acesso, renderDepartamentos, nome){
    let divBackground = document.createElement('div')
    let divModal = document.createElement('div')
    let tituloExcluir = document.createElement('h2')
    let btnConfirmar = document.createElement('button')
    let btnFechar = document.createElement('button')
    let imgFechar = document.createElement('img') 

    divBackground.className = 'modal_background'
    divModal.className = 'modal_excluir_departamento'
    imgFechar.src = '../../imgs/Vector.png'
    imgFechar.alt = 'icon-fechar'
    btnFechar.className = 'btn_fechar_excluir_departamento'
    btnConfirmar.innerText = 'Confirmar'
    tituloExcluir.innerText = `Realmente deseja deletar o Departamento ${nome} e demitir seus funcionários?`
    btnFechar.className = 'btn_fechar_excluir_departamento'
    btnConfirmar.className = 'btn_confirmar_excluir_departamento'

    btnFechar.addEventListener('click', () => {
        divBackground.remove()
    })
    divBackground.addEventListener('click', (event) => {
        let click = event.target.className
        if(click === 'modal_background'){
            divBackground.remove()
        }
    })
    btnConfirmar.addEventListener('click', async () => {
        await fetch(`http://localhost:6278/departments/${idDep}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${acesso}`
            }
        })

        renderDepartamentos()
        divBackground.remove()
    })

    btnFechar.appendChild(imgFechar)
    divModal.append(tituloExcluir, btnConfirmar, btnFechar)
    divBackground.appendChild(divModal)
    page.appendChild(divBackground)
}

export { modalExcluirDepartamento }



async function modalVisualizarDepartamento(page, info, acesso){
    let divBackground = document.createElement('div')
    let divModal = document.createElement('div')
    let tituloNome = document.createElement('h2')
    let descricao = document.createElement('h4')
    let empresaNome = document.createElement('span')
    let selectMenu = document.createElement('select')
    let optVazio = document.createElement('option')
    let btnContratar = document.createElement('button')
    let btnFechar = document.createElement('button')
    let imgFechar = document.createElement('img') 
    let listaContratados = document.createElement('ul')
    let boxDiv = document.createElement('div')
    let div1 = document.createElement('div')
    let div2 = document.createElement('div')

    divBackground.className = 'modal_background'
    divModal.className = 'modal_visualizar_departamento'
    imgFechar.src = '../../imgs/Vector.png'
    imgFechar.alt = 'icon-fechar'
    tituloNome.innerText = info[0]
    descricao.innerText = info[1]
    empresaNome.innerText = info[2]
    selectMenu.name = 'usuarios_disponiveis'
    selectMenu.id = 'select_usuario_disponivel'
    optVazio.innerText = 'Selecionar usuário'
    optVazio.value = 'selecionar_usuario'
    btnContratar.innerText = 'Contratar'
    div1.className = 'box_1'
    div2.className = 'box_2'
    btnFechar.className = 'btn_fechar_modal_visualizar'
    selectMenu.append(optVazio)

    await fetch('http://localhost:6278/admin/out_of_work', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Beare ${acesso}`
        }
    }).then(response => response.json())
    .then(responseJson => {
        responseJson.forEach((item) => {
            let option = document.createElement('option')
            option.innerText = item.username
            option.value = item.uuid
            selectMenu.appendChild(option)
        })
    })
    .catch(erro => {
        console.log(erro)
    })

    await fetch('http://localhost:6278/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${acesso}`
        }
    })
    .then(response => response.json())
    .then(responseJson => {
        responseJson.forEach((user) => {
            if(user.department_uuid === info[3]){
                console.log(user.uuid)
                let userContratado = document.createElement('li')
                let tituloUsername = document.createElement('h3')
                let nivelUser = document.createElement('span')
                let companyUser = document.createElement('span')
                let btnDesligar = document.createElement('button')

                tituloUsername.innerText = user.username
                nivelUser.innerText = user.professional_level
                companyUser.innerText = info[2]
                btnDesligar.innerText = 'Desligar'

                btnDesligar.addEventListener('click', async () => {
                    await fetch(`http://localhost:6278/departments/dismiss/${user.uuid}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${acesso}`
                        }
                    })
                        userContratado.remove()
                })

                userContratado.append(tituloUsername, nivelUser, companyUser, btnDesligar)
                listaContratados.appendChild(userContratado)
            }
        })
    })
    .catch(erro => console.log(erro))

    btnFechar.addEventListener('click', () => {
        divBackground.remove()
    })
    divBackground.addEventListener('click', (event) => {
        let click = event.target.className
        if(click === 'modal_background'){
            divBackground.remove()
        }
    })
    btnContratar.addEventListener('click', async () => {
        if(selectMenu.value !== 'selecionar_usuario'){
            let usuario = {
                "user_uuid": selectMenu.value,
                "department_uuid": info[3]
            }

            await fetch('http://localhost:6278/departments/hire/', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${acesso}`
                },
                body: JSON.stringify(usuario)
            })

            listaContratados.innerHTML = ''

            await fetch('http://localhost:6278/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${acesso}`
                }
            })
            .then(response => response.json())
            .then(responseJson => {
                responseJson.forEach((user) => {
                    if(user.department_uuid === info[3]){
                        console.log(user.uuid)
                        let userContratado = document.createElement('li')
                        let tituloUsername = document.createElement('h3')
                        let nivelUser = document.createElement('span')
                        let companyUser = document.createElement('span')
                        let btnDesligar = document.createElement('button')
        
                        tituloUsername.innerText = user.username
                        nivelUser.innerText = user.professional_level
                        companyUser.innerText = info[2]
                        btnDesligar.innerText = 'Desligar'
        
                        btnDesligar.addEventListener('click', async () => {
                            await fetch(`http://localhost:6278/departments/dismiss/${user.uuid}`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${acesso}`
                                }
                            })
                                userContratado.remove()
                        })
        
                        userContratado.append(tituloUsername, nivelUser, companyUser, btnDesligar)
                        listaContratados.appendChild(userContratado)
                    }
                })
            })
            .catch(erro => console.log(erro))
        }
    })

    btnFechar.appendChild(imgFechar)
    div1.append(descricao, empresaNome)
    div2.append(selectMenu, btnContratar)
    boxDiv.append(div1, div2)
    divModal.append(tituloNome, boxDiv, listaContratados, btnFechar)
    divBackground.appendChild(divModal)
    page.appendChild(divBackground)
}

export { modalVisualizarDepartamento }























