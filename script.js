 // Capturando os elementos HTML
    const cardInner = document.getElementById('card-inner')
    const cardWrapper = document.getElementById('card-wrapper')
    const campoPergunta = document.getElementById('pergunta')
    const campoResposta = document.getElementById('resposta')
    const btnNova = document.getElementById('btn-nova')
    const btnReset = document.getElementById('btn-reset')
    const btnAcertouCard = document.getElementById('btn-acertou-card')
    const btnErrouCard = document.getElementById('btn-errou-card')
    const pontosEl = document.getElementById('pontos')
    const cardFront = document.querySelector('.card-front')
    const cardBack = document.querySelector('.card-back')

        // Array com temas de cores em sequência
        const temasCores = [
            { front: "rgba(255, 255, 255, 0.97)", back: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
            { front: "rgba(255, 255, 255, 0.97)", back: "linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)" },
            { front: "rgba(255, 255, 255, 0.97)", back: "linear-gradient(135deg, #2196f3 0%, #1976d2 100%)" },
            { front: "rgba(255, 255, 255, 0.97)", back: "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)" },
            { front: "rgba(255, 255, 255, 0.97)", back: "linear-gradient(135deg, #ff9800 0%, #f57c00 100%)" },
            { front: "rgba(255, 255, 255, 0.97)", back: "linear-gradient(135deg, #fdd835 0%, #fbc02d 100%)" },
            { front: "rgba(255, 255, 255, 0.97)", back: "linear-gradient(135deg, #4caf50 0%, #388e3c 100%)" },
            { front: "rgba(255, 255, 255, 0.97)", back: "linear-gradient(135deg, #00bcd4 0%, #0097a7 100%)" },
            { front: "rgba(255, 255, 255, 0.97)", back: "linear-gradient(135deg, #3f51b5 0%, #283593 100%)" },
            { front: "rgba(255, 255, 255, 0.97)", back: "linear-gradient(135deg, #7b1fa2 0%, #4a148c 100%)" }
        ];

        let pontos = 0;
        let indiceCorAtual = 0;

        // Função para mostrar toast
        function showToast(mensagem, tipo = 'info') {
            const toast = document.createElement('div');
            toast.className = 'toast-message';
            const icon = tipo === 'success' ? '🎉' : tipo === 'error' ? '😓' : 'ℹ️';
            toast.innerHTML = `${icon} ${mensagem}`;
            document.body.appendChild(toast);
            setTimeout(() => toast.classList.add('show'), 10);
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, 2500);
        }

        // Função para mudar as cores do card em sequência
        function mudarCoresCard() {
            const temaSelecionado = temasCores[indiceCorAtual];
            cardFront.style.background = temaSelecionado.front;
            cardBack.style.background = temaSelecionado.back;
            indiceCorAtual = (indiceCorAtual + 1) % temasCores.length;
        }

        // Função para atualizar o display de pontos
        function atualizarPontos() {
            pontosEl.textContent = pontos;
            pontosEl.classList.add('pulse-animation');
            setTimeout(() => pontosEl.classList.remove('pulse-animation'), 300);
        }

        // Função para verificar se o card está virado
        function cardEstaVirado() {
            return cardWrapper.classList.contains('card-virado');
        }

        // Evento que faz o card girar
        cardWrapper.addEventListener('click', (e) => {
            // Evita que o clique nos botões também vire o card
            if (e.target.closest('.btn-resposta')) {
                return;
            }
            cardWrapper.classList.toggle('card-virado');
        })

        // Função que irá buscar as charadas no backend
        async function buscaCharada() {
            // Reseta o card para a frente ANTES de buscar
            cardWrapper.classList.remove('card-virado')
            
            try {
                const baseUrl = 'https://api-charadas-backend-five.vercel.app/'
                const endPoint = 'charadas/aleatorias'
                
                console.log('Buscando em:', baseUrl + endPoint)
                
                const respostaApi = await fetch(`${baseUrl}${endPoint}`)
                
                if (!respostaApi.ok) {
                    throw new Error(`HTTP error! status: ${respostaApi.status}`)
                }
                
                const dados = await respostaApi.json()
                
                console.log('Charada recebida:', dados)
                
                campoPergunta.textContent = dados.pergunta
                campoResposta.textContent = dados.resposta
                
                // Muda as cores do card a cada nova charada
                mudarCoresCard()

            } catch (erro) {
                campoPergunta.textContent = "Erro ao conectar com o servidor backend."
                campoResposta.textContent = "Tente novamente mais tarde."
                console.error("Erro na busca:", erro)
            }
        }

        // Função para acertou
        function acertou() {
            if (!cardEstaVirado()) {
                showToast('Vire o card para ver a resposta primeiro! 🔍', 'info');
                return;
            }
            pontos += 10;
            atualizarPontos();
            showToast('+10 pontos! 🎉 Muito bem!', 'success');
            buscaCharada();
        }

        // Função para errou
        function errou() {
            if (!cardEstaVirado()) {
                showToast('Vire o card para ver a resposta primeiro! 🔍', 'info');
                return;
            }
            pontos -= 5;
            if (pontos < 0) pontos = 0;
            atualizarPontos();
            showToast('-5 pontos! 😓 Continue tentando!', 'error');
            buscaCharada();
        }

        // Eventos dos botões
        btnNova.addEventListener('click', () => {
            buscaCharada();
        })

        btnReset.addEventListener('click', () => {
            pontos = 0;
            atualizarPontos();
            showToast('Pontos resetados! Recomece com tudo! 💪', 'info');
        })

        btnAcertouCard.addEventListener('click', (e) => {
            e.stopPropagation();
            acertou();
        })

        btnErrouCard.addEventListener('click', (e) => {
            e.stopPropagation();
            errou();
        })

        // Inicializar ao carregar a página
        buscaCharada()