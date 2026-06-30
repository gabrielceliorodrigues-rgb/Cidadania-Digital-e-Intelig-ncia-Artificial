document.addEventListener('DOMContentLoaded', () => {
    
    // --- MODO ESCURO ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    });

    // --- BANCO DE DADOS DO JOGO ---
    const quizData = [
        {
            question: "Se você receber um vídeo bombástico de uma figura pública cometendo um crime, qual deve ser sua primeira atitude?",
            options: [
                { text: "Compartilhar imediatamente nos grupos para alertar as pessoas.", correct: false },
                { text: "Duvidar, analisar as bordas do rosto e cruzar com portais de notícias confiáveis.", correct: true },
                { text: "Acreditar cegamente, pois vídeos não podem ser forjados por IA.", correct: false }
            ]
        },
        {
            question: "Você achou uma notícia sobre uma cura milagrosa em um site desconhecido. O que liga o alerta de fakenews?",
            options: [
                { text: "O site usar títulos sensacionalistas e não listar nenhuma fonte científica.", correct: true },
                { text: "O texto ser bem escrito e longo.", correct: false },
                { text: "Ter imagens ilustrativas da equipe médica.", correct: false }
            ]
        },
        {
            question: "Uma conta com a foto de um conhecido te pede dinheiro urgente via Pix por mensagem. Qual é a ação correta?",
            options: [
                { text: "Fazer a transferência na hora para ajudar o amigo.", correct: false },
                { text: "Ligar para a pessoa por outro canal para confirmar se a identidade é real.", correct: true },
                { text: "Bloquear instantaneamente sem validar se é ele mesmo.", correct: false }
            ]
        }
    ];

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

    function loadPhase() {
        answered = false;
        feedbackBox.classList.add('hidden');
        submitBtn.textContent = "Verificar Resposta";
        
        phaseNumDisplay.textContent = currentPhase + 1;
        progressBar.style.width = ((currentPhase + 1) / quizData.length) * 100 + "%";

        const currentQuiz = quizData[currentPhase];
        questionText.textContent = currentQuiz.question;

        optionsWrapper.innerHTML = '';
        currentQuiz.options.forEach(option => {
            const label = document.createElement('label');
            label.className = 'option-label';
            label.innerHTML = `
                <input type="radio" name="quiz-answer" value="${option.correct}" required>
                <span>${option.text}</span>
            `;
            optionsWrapper.appendChild(label);
        });
    }

    // Inicializa a primeira pergunta
    loadPhase();

    quizForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (answered) {
            currentPhase++;
            if (currentPhase < quizData.length) {
                loadPhase();
            } else {
                // Finalização
                questionText.textContent = "🏅 Jogo Concluído!";
                optionsWrapper.innerHTML = `<p>Sua pontuação final foi de ${score} pontos!</p>`;
                feedbackBox.classList.add('hidden');
                submitBtn.textContent = "Jogar Novamente";
                answered = true;
                currentPhase = -1;
                score = 0;
                scoreDisplay.textContent = "0";
            }
            return;
        }

        const selected = document.querySelector('input[name="quiz-answer"]:checked');
        if (!selected) return;

        answered = true;
        const inputs = optionsWrapper.querySelectorAll('input');
        inputs.forEach(input => input.disabled = true);

        feedbackBox.classList.remove('hidden', 'success-message', 'error-message');

        if (selected.value === "true") {
            score += 10;
            scoreDisplay.textContent = score;
            feedbackBox.textContent = "🎉 Correto! Excelente análise crítica.";
            feedbackBox.classList.add('success-message');
        } else {
            feedbackBox.textContent = "❌ Incorreto. É preciso ter mais cuidado com mídias e mensagens na internet.";
            feedbackBox.classList.add('error-message');
        }

        submitBtn.textContent = currentPhase + 1 < quizData.length ? "Próxima Fase ➡️" : "Ver Resultado Final 🏆";
    });
});
