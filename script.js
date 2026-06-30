document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // CONTROLE DO MODO ESCURO (TEMA)
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggleBtn.textContent = savedTheme === 'dark' ? '☀️ Modo Claro' : '🌓 Modo Escuro';
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = 'light';

        if (currentTheme !== 'dark') {
            newTheme = 'dark';
            themeToggleBtn.textContent = '☀️ Modo Claro';
        } else {
            themeToggleBtn.textContent = '🌓 Modo Escuro';
        }

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // ==========================================
    // ESTRUTURA DE DADOS DO JOGO (PERGUNTAS)
    // ==========================================
    const quizData = [
        {
            question: "Se você receber um vídeo bombástico de uma figura pública cometendo um crime, qual deve ser sua primeira atitude?",
            options: [
                { text: "Compartilhar imediatamente nos grupos de família para alertar a todos.", correct: false },
                { text: "Duvidar, analisar as bordas do rosto e cruzar a informação com portais de notícias confiáveis.", correct: true },
                { text: "Acreditar cegamente, pois vídeos são provas absolutas e impossíveis de serem forjados.", correct: false }
            ]
        },
        {
            question: "Você encontrou uma notícia chocante sobre uma cura milagrosa em um site desconhecido. O que liga o seu sinal de alerta?",
            options: [
                { text: "O site usar títulos exagerados (clickbaits), excesso de anúncios e não citar fontes médicas científicas.", correct: true },
                { text: "O texto ser muito longo e bem estruturado.", correct: false },
                { text: "Conter imagens de laboratórios ilustrativos genéricos.", correct: false }
            ]
        },
        {
            question: "Uma conta com a foto de um amigo seu te manda mensagem pedindo dinheiro urgente por Pix. Qual o procedimento correto?",
            options: [
                { text: "Enviar o valor o mais rápido possível para ajudar a pessoa necessitada.", correct: false },
                { text: "Ignorar permanentemente e bloquear a pessoa sem dar explicações.", correct: false },
                { text: "Ligar diretamente para esse amigo por fora do aplicativo ou fazer uma chamada de vídeo para confirmar a identidade.", correct: true }
            ]
        }
    ];

    // Elementos de Controle do Jogo
    let currentPhase = 0;
    let score = 0;
    let answered = false;

    const questionText = document.getElementById('question-text');
    const optionsWrapper = document.getElementById('options-wrapper');
    const scoreDisplay = document.getElementById('score');
    const phaseNumDisplay = document.getElementById('phase-num');
    const progressBar = document.getElementById('progress-bar');
    const quizForm = document.getElementById('quiz-form');
    const feedbackBox = document.getElementById('quiz-feedback');
    const submitBtn = document.getElementById('submit-btn');

    // Inicializa a primeira fase do jogo
    loadPhase();

    function loadPhase() {
        answered = false;
        feedbackBox.classList.add('hidden');
        submitBtn.textContent = "Verificar Resposta";
        
        // Atualiza cabeçalhos e progresso visual
        phaseNumDisplay.textContent = currentPhase + 1;
        progressBar.style.width = ((currentPhase + 1) / quizData.length) * 100 + "%";

        // Renderiza a pergunta
        const currentQuiz = quizData[currentPhase];
        questionText.textContent = currentQuiz.question;

        // Renderiza as alternativas
        optionsWrapper.innerHTML = '';
        currentQuiz.options.forEach((option, index) => {
            const label = document.createElement('label');
            label.className = 'option-label';
            
            label.innerHTML = `
                <input type="radio" name="quiz-answer" value="${option.correct}" required>
                <span>${option.text}</span>
            `;
            optionsWrapper.appendChild(label);
        });
    }

    quizForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Se o botão estiver em modo de avançar fase
        if (answered) {
            currentPhase++;
            if (currentPhase < quizData.length) {
                loadPhase();
            } else {
                // Fim do Jogo
                showFinalResults();
            }
            return;
        }

        // Validação da alternativa escolhida
        const selected = document.querySelector('input[name="quiz-answer"]:checked');
        if (!selected) return;

        answered = true;
        
        // Desativa campos da fase resolvida
        const inputs = optionsWrapper.querySelectorAll('input');
        inputs.forEach(input => input.disabled = true);

        feedbackBox.classList.remove('hidden', 'success-message', 'error-message');

        if (selected.value === "true") {
            score += 10;
            scoreDisplay.textContent = score;
            feedbackBox.textContent = "🎉 Resposta Correta! Muito bem investigado.";
            feedbackBox.classList.add('success-message');
        } else {
            feedbackBox.textContent = "❌ Incorreto. É preciso ter mais atenção aos detalhes digitais.";
            feedbackBox.classList.add('error-message');
        }

        // Altera comportamento do botão para avançar
        if (currentPhase + 1 < quizData.length) {
            submitBtn.textContent = "Próxima Fase ➡️";
        } else {
            submitBtn.textContent = "Finalizar Desafio 🏆";
        }
    });

    function showFinalResults() {
        questionText.textContent = "🏅 Desafio Concluído!";
        optionsWrapper.innerHTML = `
            <p style="font-size:1.1rem; text-align:center; padding:1rem;">
                Você completou o treinamento de Cidadania Digital 2026.<br>
                Sua pontuação final foi de <strong>${score} de 30</strong> pontos possíveis.
            </p>
        `;
        feedbackBox.classList.add('hidden');
        submitBtn.textContent = "Reiniciar Jogo 🔄";
        
        // Permite resetar o jogo ao clicar novamente
        answered = true;
        currentPhase = -1; // Na próxima rodada vai para 0 após o incremento
        score = 0;
        scoreDisplay.textContent = "0";
    }
});
