 
        // Capturando os elementos HTML
        const cardInner = document.getElementById("card-inner")
        const campoPergunta = document.getElementById("pergunta")
        const campoResposta = document.getElementById("resposta")
        const btnNova = document.getElementById("btn-nova")

        // Evento que faz o card girar
        cardInner.addEventListener('click', () => {
            cardInner.classList.toggle('[transform:rotateY(180deg)]')
        })

        // Ação do botão nova charada
        btnNova.addEventListener('click', () => {
            buscaCharada() 
        })

        // Função que irá buscar as charadas no backend
        async function buscaCharada() {
            try {
                // Resetar o card para a posição frontal
                if (cardInner.classList.contains('[transform:rotateY(180deg)]')) {
                    cardInner.classList.remove('[transform:rotateY(180deg)]')
                }
                
                const baseUrl = 'https://api-charadas-backend-kappa.vercel.app/'
                const endPoint = 'charadas/aleatorias'
                
                const respostaApi = await fetch(baseUrl+endPoint)
                const dados = await respostaApi.json()
                
                campoPergunta.textContent = dados.pergunta
                campoResposta.textContent = dados.resposta

            } catch (erro) {
                campoPergunta.textContent = "✧ ERRO AO CARREGAR ✧"
                console.error("Erro na busca:", erro)
            }
        }

        // Chama a função ao carregar a página
        buscaCharada()

