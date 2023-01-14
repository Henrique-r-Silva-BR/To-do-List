window.onload = function(){

    const botao = document.getElementById("botao")
    const input = document.getElementById("input")

    botao.addEventListener("click", addItem)
    input.addEventListener("keypress", chave)

    const array = localStorage.getItem("array")

    if(array == null){
        var itens = []
    }
    else{
        var itens = JSON.parse(array)

        geraItem()
    }

     

    // ---------- FUNÇÕES ----------





    // Adiciona item no array

    function addItem(){
        let input = document.getElementById("input")
    
        if(input.value != ""){
            itens.push(objItem(input.value))
            geraItem()
            input.value = ""
        }       
    }





    // Gerando objeto para guardar no array

    function objItem(v){
        return {
            valor: v,
            marcado: false
        }
    }





    // Gerando o elemento para a tela

    function geraItem(){

        localStorage.setItem("array", JSON.stringify(itens))

        let lista = document.getElementById("lista")

        lista.innerHTML = ""

        //console.log(lista)

        for(let e of itens){
            lista.innerHTML += 
            `<div class="item-de-lista">
                <div class="circulo">

                </div>

                <div class="texto">
                    ${e.valor}
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg> 
            </div>
            `
        }

        let elementosFilhos = lista.children

        let index = 0

        for(let i of elementosFilhos){

            i.addEventListener("mouseover", mostrarBotao)

            i.addEventListener("mouseout", esconderBotao)

            i.children[0].addEventListener("click", marcaDesmarca)

            i.setAttribute("index", index)

            index++

            i.children[2].addEventListener("click", excluir)

            let p = i.getAttribute("index")

            if(itens[p].marcado == true){
                i.children[0].className = "circulo blue"
            }
            else{
                i.children[0].className = "circulo black"
            }
        }
   }


    // Altera o valor da propriedade marcado do array

    function marcaDesmarca(){
        let index = this.parentElement.getAttribute("index")
        
        if(itens[index].marcado == true){
            itens[index].marcado = false
        }
        else{
            itens[index].marcado = true
        }

        geraItem()
    }





    // Deleta o valor do array e executa a função de gerar tela

    function excluir(){
        let index = this.parentElement.getAttribute("index")

        itens.splice(index, 1)

        geraItem()
    }





    // Mostar e esconder botão de excluir tarrefa

    function mostrarBotao(){
        this.children[2].style.display = "block"
    }

    function esconderBotao(){
        this.children[2].style.display = "none"
    }

    
    function tecla(){
        console.log(this)
    }

    // Adicionar item de lista com o enter
 
    function chave(e){
        if(e.key == "Enter"){
            addItem()
        }
    }







}

