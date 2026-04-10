 
        // Capturando os elementos HTML
        const cardInner = document.getElementById("card-inner")
        const campoPergunta = document.getElementById("pergunta")
        const campoResposta = document.getElementById("resposta")
        const btnNova = document.getElementById("btn-nova")
        const cardFront = document.querySelector(".card-front")
        const cardBack = document.querySelector(".card-back")

        // Índice para rastrear a sequência de cores
        let indiceCorAtual = 0

        // Array com temas de cores em sequência: Rosa, Roxo, Azul e Arco Iris
        const temasCores = [
            // Rosa
            {
                front: "rgba(255, 255, 255, 0.97)",
                back: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
            },
            // Roxo
            {
                front: "rgba(255, 255, 255, 0.97)",
                back: "linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)"
            },
            // Azul
            {
                front: "rgba(255, 255, 255, 0.97)",
                back: "linear-gradient(135deg, #2196f3 0%, #1976d2 100%)"
            },
            // Vermelho (Arco Iris)
            {
                front: "rgba(255, 255, 255, 0.97)",
                back: "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)"
            },
            // Laranja (Arco Iris)
            {
                front: "rgba(255, 255, 255, 0.97)",
                back: "linear-gradient(135deg, #ff9800 0%, #f57c00 100%)"
            },
            // Amarelo (Arco Iris)
            {
                front: "rgba(255, 255, 255, 0.97)",
                back: "linear-gradient(135deg, #fdd835 0%, #fbc02d 100%)"
            },
            // Verde (Arco Iris)
            {
                front: "rgba(255, 255, 255, 0.97)",
                back: "linear-gradient(135deg, #4caf50 0%, #388e3c 100%)"
            },
            // Azul Claro/Ciano (Arco Iris)
            {
                front: "rgba(255, 255, 255, 0.97)",
                back: "linear-gradient(135deg, #00bcd4 0%, #0097a7 100%)"
            },
            // Indigo (Arco Iris)
            {
                front: "rgba(255, 255, 255, 0.97)",
                back: "linear-gradient(135deg, #3f51b5 0%, #283593 100%)"
            },
            // Violeta (Arco Iris)
            {
                front: "rgba(255, 255, 255, 0.97)",
                back: "linear-gradient(135deg, #7b1fa2 0%, #4a148c 100%)"
            }
        ]

        // Função para mudar as cores do card em sequência
        function mudarCoresCard() {
            const temaSelecionado = temasCores[indiceCorAtual]
            cardFront.style.background = temaSelecionado.front
            cardBack.style.background = temaSelecionado.back
            // Incrementa o índice e volta ao início quando chegar ao final
            indiceCorAtual = (indiceCorAtual + 1) % temasCores.length
        }

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

                // Mudar cores do card ao carregar nova charada
                mudarCoresCard()

            } catch (erro) {
                campoPergunta.textContent = "✧ ERRO AO CARREGAR ✧"
                console.error("Erro na busca:", erro)
            }
        }

        // Chama a função ao carregar a página
        buscaCharada()

