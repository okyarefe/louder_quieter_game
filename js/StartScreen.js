// Using globals: StorageManager, Player, Game, questions are loaded via script tags

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

class StartScreen {
    constructor() {
        this.modal = null;
        this.startButton = null;
        this.form = null;
        this.isValid = false;
        this.storageManager = new StorageManager();
        this.preloadedImages = new Map();
        this.init();
    }

    init() {
        this.createModal();
        this.setupEventListeners();
        this.displayHighScores();
        this.startPreloadingImages();
        // Enable start button if default placeholders are present
        this.validateForm();
    }

    startPreloadingImages() {
        console.log("Starting silent image preload...");
        questions.forEach(question => {
            const img = new Image();
            img.onload = () => {
                console.log(`Silently loaded image: ${question.imagePath}`);
                this.preloadedImages.set(question.imagePath, img);
            };
            img.onerror = () => {
                console.error(`Failed to silently load image: ${question.imagePath}`);
            };
            img.src = question.imagePath;
        });
    }

    createModal() {
        const modalHTML = `
            <div class="start-screen-modal">
                <div class="modal-content">
                    <div class="logo-container">
                        <img src="assets/loqicon.png" alt="Louder Quieter Game" class="logo">
                    </div>
                    <form id="startForm">
                        <div class="form-group">
                            <label for="nickname">Nickname:</label>
                            <input type="text" id="nickname" name="nickname" required placeholder="Guest" value="Guest">
                        </div>
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email" required placeholder="guest@example.com" value="guest@example.com">
                            <small style="display:block; margin-top:4px; opacity:0.8;">No real email required. Used only for local leaderboard.</small>
                        </div>
                        <div class="form-group checkbox">
                            <input type="checkbox" id="consent" name="consent" checked>
                            <label for="consent">I agree to be contacted (you can use a placeholder email)</label>
                        </div>
                        <button type="submit" id="startButton" disabled>Start Game</button>
                    </form>
                    <div class="high-scores-section">
                        <h3>High Scores</h3>
                        <div id="highScoresList"></div>
                    </div>
                </div>
            </div>
        `;

        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHTML;
        document.body.appendChild(modalContainer.firstElementChild);
        
        this.modal = document.querySelector('.start-screen-modal');
        this.form = document.getElementById('startForm');
        this.startButton = document.getElementById('startButton');
    }

    setupEventListeners() {
        this.form.addEventListener('input', () => this.validateForm());
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    validateForm() {
        const nickname = document.getElementById('nickname').value.trim();
        const email = document.getElementById('email').value.trim();
        const consent = document.getElementById('consent').checked;

        this.isValid = nickname.length > 0 && validateEmail(email) && consent;
        this.startButton.disabled = !this.isValid;
    }

    showGoodLuckPopup(playerName) {
        const popup = document.createElement('div');
        popup.className = 'good-luck-popup';
        popup.innerHTML = `
            <h3>Good Luck <span class="player-name">${playerName}</span>!</h3>
        `;
        document.body.appendChild(popup);
        setTimeout(() => { popup.classList.add('show'); }, 100);
        setTimeout(() => {
            popup.classList.remove('show');
            setTimeout(() => { popup.remove(); }, 300);
        }, 2000);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.isValid) return;

        const formData = {
            nickname: document.getElementById('nickname').value.trim(),
            email: document.getElementById('email').value.trim(),
            consent: document.getElementById('consent').checked
        };

        this.modal.style.display = 'none';
        this.showGoodLuckPopup(formData.nickname);

        const player = new Player(formData.nickname, formData.email, formData.consent);
        const game = new Game(player, this.preloadedImages);
        game.start();
        console.log("Game started", game);
    }

    displayHighScores() {
        const highScoresList = document.getElementById('highScoresList');
        const highScores = this.storageManager.getHighStreaks();
        
        if (highScores.length === 0) {
            highScoresList.innerHTML = '<p class="no-scores">No high scores yet. Be the first!</p>';
            return;
        }

        const scoresHTML = highScores.map((score, index) => `
            <div class="high-score-item">
                <span class="rank">#${index + 1}</span>
                <span class="nickname">${score.nickname}</span>
                <span class="streak">${score.streak} 🔥</span>
            </div>
        `).join('');

        highScoresList.innerHTML = scoresHTML;
    }
}

// Expose globally
window.StartScreen = StartScreen;


