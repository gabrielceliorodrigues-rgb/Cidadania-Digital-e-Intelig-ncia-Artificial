document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DO MODO ESCURO ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    // Verifica se o usuário já tem uma preferência salva
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


    // --- LÓGICA DO JOGO (QUIZ) ---
    const quizForm = document.getElementById('quiz-form');
    const successFeedback = document.getElementById('quiz-result-success');
    const errorFeedback = document.getElementById('quiz-result-error');

    quizForm.addEventListener('submit', (event) => {
        // Evita que a página recarregue ao enviar o formulário
        event.preventDefault(); 

        // Captura a opção selecionada
        const selectedOption = document.querySelector('input[name="quiz-answer"]:checked');

        // Reseta a visibilidade dos feedbacks anteriores
        successFeedback.classList.add('hidden');
        errorFeedback.classList.add('hidden');

        // Valida a resposta do jogador
        if (selectedOption && selectedOption.value === 'correta') {
            successFeedback.classList.remove('hidden');
        } else {
            errorFeedback.classList.remove('hidden');
        }
    });
});
