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
    // MECÂNICA DO MINIJOGO (QUIZ COM PONTOS)
    // ==========================================
    const quizForm = document.getElementById('quiz-form');
    const successFeedback = document.getElementById('quiz-result-success');
    const errorFeedback = document.getElementById('quiz-result-error');
    const scoreDisplay = document.getElementById('score');
    const submitBtn = document.getElementById('submit-btn');

    let currentScore = 0;
    let gamePlayed = false; // Impede trapaças de responder múltiplas vezes a mesma pergunta

    quizForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o recarregamento da página

        if (gamePlayed) return; // Se já jogou, bloqueia novos envios

        const selectedOption = document.querySelector('input[name="quiz-answer"]:checked');

        // Esconde feedbacks anteriores por segurança
        successFeedback.classList.add('hidden');
        errorFeedback.classList.add('hidden');

        if (selectedOption) {
            gamePlayed = true; // Finaliza a rodada atual
            submitBtn.disabled = true; // Desabilita o botão
            submitBtn.style.opacity = "0.5";
            submitBtn.style.cursor = "not-allowed";

            // Desabilita os campos para o usuário não mudar a opção após responder
            const inputs = quizForm.querySelectorAll('input[name="quiz-answer"]');
            inputs.forEach(input => input.disabled = true);

            // Validação e atribuição de pontos do Jogo
            if (selectedOption.value === 'correta') {
                currentScore += 10;
                scoreDisplay.textContent = currentScore;
                successFeedback.classList.remove('hidden');
            } else {
                errorFeedback.classList.remove('hidden');
            }
        }
    });
});
