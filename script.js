/* Variáveis de Cores e Configurações Globais */
:root {
    --bg-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --bg-container: rgba(255, 255, 255, 0.95);
    --text-main: #2d3748;
    --text-muted: #4a5568;
    --accent-color: #5a67d8;
    --accent-success: #38a169;
    --accent-error: #e53e3e;
    --border-color: #e2e8f0;
    --transition-speed: 0.3s;
}

[data-theme="dark"] {
    --bg-primary: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
    --bg-container: rgba(26, 32, 44, 0.95);
    --text-main: #f7fafc;
    --text-muted: #cbd5e0;
    --accent-color: #90cdf4;
    --border-color: #4a5568;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: var(--bg-primary);
    background-attachment: fixed;
    color: var(--text-main);
    line-height: 1.6;
    transition: background var(--transition-speed), color var(--transition-speed);
    padding-bottom: 2rem;
}

/* Header */
.main-header {
    background-color: var(--bg-container);
    border-bottom: 1px solid var(--border-color);
    padding: 1rem 2rem;
    position: sticky;
    top: 0;
    z-index: 100;
    backdrop-filter: blur(10px);
}

.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}

.header-container h1 span {
    color: #4c51bf;
}

[data-theme="dark"] .header-container h1 span {
    color: var(--accent-color);
}

/* Botões */
.btn-toggle {
    background: transparent;
    border: 2px solid var(--accent-color);
    color: var(--text-main);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    cursor: pointer;
    font-weight: bold;
    transition: all var(--transition-speed) ease;
}

.btn-toggle:hover {
    background-color: var(--accent-color);
    color: #fff;
    transform: translateY(-2px);
}

/* Layout Central */
main {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
}

.hero-section, .interactive-section, .card {
    background-color: var(--bg-container);
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    border: 1px solid var(--border-color);
    transition: transform var(--transition-speed), background-color var(--transition-speed);
}

.hero-section {
    text-align: center;
    padding: 2.5rem;
    margin-bottom: 2.5rem;
}

.hero-section h2 {
    font-size: 2.2rem;
    margin-bottom: 1rem;
    color: var(--accent-color);
}

/* Cards Flexbox */
.info-section {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 2.5rem;
}

.card {
    flex: 1;
    padding: 2rem;
}

.card:hover {
    transform: translateY(-5px);
}

.card h4 {
    margin-bottom: 0.8rem;
    font-size: 1.2rem;
}

/* Elementos do Jogo */
.interactive-section {
    padding: 2.5rem;
}

.scoreboard {
    background: var(--accent-color);
    color: #fff;
    padding: 0.5rem 1.5rem;
    border-radius: 30px;
    display: inline-block;
    margin: 1rem 0;
    font-size: 1.1rem;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.quiz-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 1rem;
}

.quiz-question {
    font-weight: 600;
    font-size: 1.2rem;
}

.options-container {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
}

.option-label {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1rem;
    border: 2px solid var(--border-color);
    border-radius: 10px;
    cursor: pointer;
    transition: background-color var(--transition-speed), border-color var(--transition-speed);
}

.option-label:hover {
    background-color: rgba(90, 103, 216, 0.1);
    border-color: var(--accent-color);
}

.btn-submit {
    background-color: var(--accent-success);
    color: white;
    border: none;
    padding: 0.8rem 2rem;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 10px;
    cursor: pointer;
    align-self: flex-start;
    transition: filter var(--transition-speed), transform 0.1s;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.btn-submit:hover {
    filter: brightness(1.1);
}

.btn-submit:active {
    transform: scale(0.98);
}

/* Mensagens de Feedback */
.result-message {
    margin-top: 1.5rem;
    padding: 1.2rem;
    border-radius: 10px;
    animation: fadeIn 0.4s ease forwards;
}

.hidden {
    display: none !important;
}

#quiz-result-success {
    background-color: rgba(56, 161, 105, 0.2);
    border-left: 6px solid var(--accent-success);
}

#quiz-result-error {
    background-color: rgba(229, 62, 98, 0.2);
    border-left: 6px solid var(--accent-error);
}

/* Rodapé */
.main-footer {
    text-align: center;
    padding: 2rem;
    margin-top: 3rem;
    background-color: var(--bg-container);
    border-top: 1px solid var(--border-color);
    color: var(--text-muted);
    border-radius: 12px;
}

/* Animações */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Responsividade Básica */
@media (max-width: 768px) {
    .header-container {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
    .info-section {
        flex-direction: column;
    }
    .btn-submit {
        width: 100%;
    }
}
