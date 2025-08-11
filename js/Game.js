// Using globals: StorageManager and questions are loaded via script tags

class Game {
    constructor(Player, preloadedImages = new Map()) {
        this.currentPlayer = Player;
        this.currentRound = 0;
        this.totalRounds = questions.length-1;
        this.currentStreak = 0;
        this.isPlaying = false;
        this.questionList = questions;
        this.remainingItems = [...questions];
        this.referenceItem = null;
        this.currentQuestion = null;
        this.storageManager = new StorageManager();
        this.preloadedImages = preloadedImages;
        this.domElements = {
            upperItemName: null,
            upperItemDb: null,
            lowerItemName: null,
            lowerItemDb: null,
            louderButton: null,
            quieterButton: null,
            upperImage: null,
            lowerImage: null,
            highStreakLabel: null,
            currentStreakLabel: null,
            animatedEmblem: null
        };
        this.init();
    }

    init() {
        this.initializeDOMElements();
        this.setupEventListeners();
        this.createHighStreakLabel();
        this.createCurrentStreakLabel();
        this.updateHighStreakLabel();
        this.updateCurrentStreakLabel();
        this.initializeGameState();
        this.updateUI();
    }

    initializeDOMElements() {
        this.domElements.upperItemName = document.querySelector('.left-image .item-name');
        this.domElements.upperItemDb = document.querySelector('.left-image .item-db');
        this.domElements.lowerItemName = document.querySelector('.right-image .item-name');
        this.domElements.lowerItemDb = document.querySelector('.right-image .item-db');
        this.domElements.louderButton = document.querySelector('.game-button.louder');
        this.domElements.quieterButton = document.querySelector('.game-button.quieter');
        this.domElements.upperImage = document.querySelector('.left-image img');
        this.domElements.lowerImage = document.querySelector('.right-image img');
        this.domElements.animatedEmblem = document.querySelector('.animated-emblem');
    }

    initializeGameState() {
        this.currentRound = 0;
        this.currentStreak = 0;
        this.remainingItems = [...this.questionList];
        this.referenceItem = this.getInitialItem();
        this.currentQuestion = this.getRandomQuestion();
        console.log("Game state initialized:", {
            referenceItem: this.referenceItem,
            currentQuestion: this.currentQuestion,
            remainingItems: this.remainingItems.length
        });
    }

    setIsPlaying(isPlaying) { this.isPlaying = isPlaying; }
    getIsPlaying() { return this.isPlaying; }
    start() { this.isPlaying = true; }

    getInitialItem() {
        if (this.remainingItems.length === 0) {
            console.log("No more items available");
            return null;
        }
        const randomIndex = Math.floor(Math.random() * this.remainingItems.length);
        const selectedItem = this.remainingItems[randomIndex];
        this.remainingItems = this.remainingItems.filter(item => item.itemName !== selectedItem.itemName);
        console.log("Initial Item: ", selectedItem);
        return selectedItem;
    }

    getRandomQuestion() {
        console.log("Get Random Question RUN!");
        if (this.remainingItems.length === 0) {
            console.log("No more questions available");
            return null;
        }

        const validItems = this.referenceItem 
            ? this.remainingItems.filter(item => {
                const isSameDb = parseInt(item.dB) === parseInt(this.referenceItem.dB);
                if (isSameDb) {
                    console.log(`Filtered out ${item.itemName} (${item.dB} dB) - same dB level as reference item ${this.referenceItem.itemName} (${this.referenceItem.dB} dB)`);
                }
                return !isSameDb;
            })
            : this.remainingItems;

        if (validItems.length === 0) {
            console.log("No items with different dB level found - Player has won!");
            this.showGameOverModal(true, true);
            this.endGame(this.currentStreak);
            return null;
        }

        const randomIndex = Math.floor(Math.random() * validItems.length);
        const selectedItem = validItems[randomIndex];
        console.log("Question Item: ", selectedItem.itemName, selectedItem.dB);
        this.remainingItems = this.remainingItems.filter(item => item.itemName !== selectedItem.itemName);
        console.log("Returning Question item: ", selectedItem);
        return selectedItem;
    }

    updateUI() {
        if (!this.referenceItem || !this.currentQuestion) {
            console.log("Cannot update UI - missing items");
            return;
        }

        console.log("Updating UI with:", {
            referenceItem: this.referenceItem,
            questionItem: this.currentQuestion
        });

        this.domElements.upperItemName.textContent = this.referenceItem.itemName;
        this.domElements.upperItemDb.textContent = `${this.referenceItem.dB} dB`;
        this.domElements.lowerItemName.textContent = this.currentQuestion.itemName;
        this.domElements.lowerItemDb.textContent = "? dB";

        const upperImage = this.preloadedImages.get(this.referenceItem.imagePath);
        const lowerImage = this.preloadedImages.get(this.currentQuestion.imagePath);

        if (upperImage) {
            this.domElements.upperImage.src = upperImage.src;
        } else {
            this.domElements.upperImage.src = this.referenceItem.imagePath;
        }

        if (lowerImage) {
            this.domElements.lowerImage.src = lowerImage.src;
        } else {
            this.domElements.lowerImage.src = this.currentQuestion.imagePath;
        }
    }

    setupEventListeners() {
        this.domElements.louderButton.addEventListener('click', () => this.handleUserChoice('louder'));
        this.domElements.quieterButton.addEventListener('click', () => this.handleUserChoice('quieter'));
    }

    handleUserChoice(choice) {
        if (!this.isPlaying) return;
        this.domElements.louderButton.disabled = true;
        this.domElements.quieterButton.disabled = true;

        if (!this.referenceItem || !this.currentQuestion) {
            console.log("Cannot proceed - missing items");
            this.showGameOverModal(true, true);
            this.endGame();
            return;
        }

        this.animateNumber(this.domElements.lowerItemDb, this.currentQuestion.dB, () => {
            const referenceDb = Number(this.referenceItem.dB);
            const questionDb = Number(this.currentQuestion.dB);
            const isQuestionLouder = questionDb > referenceDb;
            const isCorrect = (choice === 'louder' && isQuestionLouder) || 
                            (choice === 'quieter' && !isQuestionLouder);

            console.log("Detailed Comparison:", {
                referenceItem: { name: this.referenceItem.itemName, dB: referenceDb },
                questionItem: { name: this.currentQuestion.itemName, dB: questionDb },
                comparison: { isQuestionLouder, userChoice: choice, expectedChoice: isQuestionLouder ? 'louder' : 'quieter', isCorrect }
            });

            if (isCorrect) {
                this.currentStreak++;
                this.currentRound++;
                this.updateCurrentStreakLabel();

                const emblemImg = this.domElements.animatedEmblem.querySelector('img');
                if (emblemImg) { emblemImg.src = '/assets/check2.png'; }
                if (this.domElements.animatedEmblem) { this.domElements.animatedEmblem.classList.add('success'); }

                const leftImage = document.querySelector('.left-image');
                const rightImage = document.querySelector('.right-image');
                if (leftImage && rightImage) {
                    leftImage.classList.add('slide-out');
                    rightImage.classList.add('slide-up');
                }
                const diagonalLine = document.querySelector('.diagonal-line');
                if (diagonalLine) { diagonalLine.classList.add('success'); }

                if (this.currentRound >= this.totalRounds) {
                    this.showGameOverModal(true);
                    this.endGame();
                    return;
                }

                setTimeout(() => {
                    console.log(`\n=== Round ${this.currentRound + 1} of ${this.totalRounds} ===`);
                    if (diagonalLine) { diagonalLine.classList.remove('success'); }
                    if (this.domElements.animatedEmblem) {
                        this.domElements.animatedEmblem.classList.remove('success');
                        const emblemImg2 = this.domElements.animatedEmblem.querySelector('img');
                        if (emblemImg2) { emblemImg2.src = '/assets/NTi-Audio-1500-679.png'; }
                    }

                    const newReferenceItem = this.currentQuestion;
                    console.log("New reference item:", newReferenceItem);
                    this.referenceItem = newReferenceItem;
                    this.currentQuestion = this.getRandomQuestion();
                    console.log("New question item:", this.currentQuestion);

                    if (!this.currentQuestion) {
                        console.log("No more questions available");
                        this.showGameOverModal(true, true);
                        this.endGame();
                        return;
                    }

                    if (leftImage && rightImage) {
                        leftImage.classList.remove('slide-out');
                        rightImage.classList.remove('slide-up');
                        this.updateUI();
                        rightImage.classList.add('slide-in-new');
                        setTimeout(() => { rightImage.classList.remove('slide-in-new'); }, 2000);
                    } else {
                        this.updateUI();
                    }

                    this.domElements.louderButton.disabled = false;
                    this.domElements.quieterButton.disabled = false;
                }, 2000);
            } else {
                const diagonalLine2 = document.querySelector('.diagonal-line');
                if (diagonalLine2) { diagonalLine2.classList.add('failure'); }
                if (this.domElements.animatedEmblem) {
                    this.domElements.animatedEmblem.classList.add('failure');
                    const emblemImg3 = this.domElements.animatedEmblem.querySelector('img');
                    if (emblemImg3) { emblemImg3.src = '/assets/wrongcross.png'; }
                }
                const finalStreak = this.currentStreak;
                setTimeout(() => {
                    this.showGameOverModal(false, false, finalStreak);
                    this.endGame(finalStreak);
                }, 1000);
            }
        });
    }

    animateNumber(element, finalValue, callback) {
        const duration = 1500;
        const startTime = performance.now();
        const startValue = 0;
        const formatNumber = (num) => { return num.toString().padStart(3, '0'); };
        const updateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            if (progress < 1) {
                const currentValue = Math.floor(startValue + (finalValue - startValue) * progress);
                element.textContent = `${formatNumber(currentValue)} dB`;
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = `${finalValue} dB`;
                if (callback) callback();
            }
        };
        requestAnimationFrame(updateNumber);
    }

    showFeedback(isCorrect) {
        if (this.currentRound >= this.totalRounds) { return; }
        this.domElements.lowerItemDb.textContent = `${this.currentQuestion.dB} dB`;
        const feedbackClass = isCorrect ? 'correct' : 'incorrect';
        this.domElements.lowerItemDb.classList.add(feedbackClass);
        setTimeout(() => { this.domElements.lowerItemDb.classList.remove(feedbackClass); }, 1000);
    }

    showFeedbackModal(isCorrect) {
        if (this.currentRound >= this.totalRounds) { return; }
        const modal = document.createElement('div');
        modal.className = `feedback-modal ${isCorrect ? 'success' : 'failure'}`;
        const message = isCorrect ? 'Correct! 🎯' : 'Wrong! ❌';
        const subMessage = isCorrect ? 
            `STREAK: ${this.currentStreak} IN A ROW!<br> ${this.currentQuestion.itemName} (${this.currentQuestion.dB} dB)` : 
            `${this.currentQuestion.itemName} (${this.currentQuestion.dB} dB)`;
        modal.innerHTML = `
            <div class="modal-content">
                <h2>${message}</h2>
                <p class="sub-message">${subMessage}</p>
                ${isCorrect ? '<div class="next-round">Next round coming up...</div>' : ''}
            </div>
        `;
        document.body.appendChild(modal);
        setTimeout(() => { modal.classList.add('show'); }, 100);
        setTimeout(() => { modal.classList.remove('show'); setTimeout(() => { modal.remove(); }, 300); }, 3000);
    }

    nextRound() {
        this.currentQuestion = this.getRandomQuestion();
        if (!this.currentQuestion) {
            console.log("Not enough questions available for next round");
            this.showGameOverModal(true, true);
            this.endGame();
            return;
        }
        const emblemImg = this.domElements.animatedEmblem.querySelector('img');
        if (emblemImg) { emblemImg.src = '/assets/NTi-Audio-1500-679.png'; }
        this.updateUI();
    }

    showGameOverModal(isWin, isOutOfQuestions = false, finalStreak = null) {
        const existingModals = document.querySelectorAll('.game-over-modal');
        existingModals.forEach(modal => modal.remove());
        const streakToShow = finalStreak !== null ? finalStreak : this.currentStreak;
        const isNewHighScore = streakToShow > 0 && this.storageManager.isNewHighScore(streakToShow);
        this.currentPlayer.updateScore(streakToShow);
        this.storageManager.saveUserData(this.currentPlayer);
        const playerRank = this.storageManager.getPlayerRank(this.currentPlayer);
        const rankDisplay = playerRank ? `<p>RANK : <span class="score">   #${playerRank}</span></p>` : '';

        const modal = document.createElement('div');
        modal.className = `game-over-modal ${isWin ? 'success' : 'failure'}`;
        let message, subMessage, gifPath, gifMessage;
        if (isOutOfQuestions) {
            message = '🎉 Congratulations! 🎉';
            subMessage = 'You\'ve completed all available questions!';
            gifPath = '/assets/HS.gif';
            gifMessage = 'You just broke the sound barrier... and the game. <span class="legend-text">LEGEND!</span>';
        } else if (isWin) {
            message = '🎉 Congratulations! 🎉';
            subMessage = `${this.currentQuestion.itemName} (${this.currentQuestion.dB} dB)`;
            gifPath = '/assets/HS.gif';
            gifMessage = 'You just broke the sound barrier... and the game. <span class="legend-text">LEGEND!</span>';
        } else {
            if (isNewHighScore) {
                message = 'Oops! Wrong answer!';
                gifPath = '/assets/HS.gif';
                gifMessage = 'You just broke the sound barrier... and the game. <span class="legend-text">LEGEND!</span>';
            } else if (streakToShow >= 16) {
                message = 'Oops! Wrong answer!';
                gifPath = '/assets/15-HS.gif';
                gifMessage = 'Wow! Almost perfect – just one decibel away from glory!';
            } else if (streakToShow >= 6) {
                message = 'Oops! Wrong answer!';
                gifPath = '/assets/6-15.gif';
                gifMessage = 'You\'re halfway to acoustic greatness!';
            } else {
                message = 'Oops! Wrong answer!';
                gifPath = '/assets/0-5.gif';
                gifMessage = 'Looks like your ears hit snooze!';
            }
            subMessage = `${this.currentQuestion.itemName} (${this.currentQuestion.dB}dB)`;
        }

        const highScoreMessage = isNewHighScore ? '<div class="high-score-celebration">🏆 NEW HIGH STREAK! 🏆</div>' : '';
        modal.innerHTML = `
            <div class="modal-content">
               <div class="wrong-modal-wrapper">
                    ${!isWin ? `<img src="${gifPath}" alt="Game Over" class="endgame-image">` : ''}
                 <div class="wrong-wrapper">    
                    <h2 style="color: red;">${message}</h2>
                    <div class="score-display">
                     ${isWin && streakToShow === this.totalRounds ? 
                            '<p class="perfect-score">You\'ve completed all rounds! 🌟</p>' : ''}
                        <p>STREAK:<span class="score">${streakToShow}</span></p>
                            ${rankDisplay}
                        <p class="gif-message">${gifMessage}</p>
                    </div>
                    <p class="sub-message">${subMessage}</p>
                    ${highScoreMessage}
                    
                    <div class="modal-buttons">
                        <button class="play-again-btn">Play Again</button>
                        <button class="back-home-btn">Back to Home</button>
                    </div>
                </div>
                </div>
                </div>
        `;

        document.body.appendChild(modal);
        const playAgainBtn = modal.querySelector('.play-again-btn');
        const backHomeBtn = modal.querySelector('.back-home-btn');
        
        playAgainBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
                this.resetGame();
            }, 300);
        });

        backHomeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
                this.resetGame();
                window.location.href = 'index.html';
            }, 300);
        });

        setTimeout(() => { modal.classList.add('show'); }, 100);

        if (isNewHighScore) {
            const celebration = document.createElement('div');
            celebration.className = 'celebration';
            document.body.appendChild(celebration);
            setTimeout(() => { celebration.remove(); }, 3000);
        }
    }

    resetGame() {
        const existingModals = document.querySelectorAll('.game-over-modal');
        existingModals.forEach(modal => modal.remove());
        this.isPlaying = true;
        this.currentStreak = 0;
        this.initializeGameState();
        this.domElements.louderButton.disabled = false;
        this.domElements.quieterButton.disabled = false;
        if (this.domElements.animatedEmblem) {
            this.domElements.animatedEmblem.classList.remove('success', 'failure');
            this.domElements.animatedEmblem.classList.add('reset');
            const emblemImg = this.domElements.animatedEmblem.querySelector('img');
            if (emblemImg) { emblemImg.src = '/assets/NTi-Audio-1500-679.png'; }
        }
        const leftImage = document.querySelector('.left-image');
        const rightImage = document.querySelector('.right-image');
        if (leftImage && rightImage) {
            leftImage.classList.remove('slide-out', 'reset-position');
            rightImage.classList.remove('slide-up', 'reset-position');
        }
        const diagonalLine = document.querySelector('.diagonal-line');
        if (diagonalLine) { diagonalLine.classList.remove('success', 'failure'); }
        this.updateUI();
        this.updateCurrentStreakLabel();
    }

    endGame(finalStreak = null) {
        console.log("Ending game...");
        this.isPlaying = false;
        const streakToSave = finalStreak !== null ? finalStreak : this.currentStreak;
        this.currentPlayer.updateScore(streakToSave);
        console.log("Attempting to save user data...");
        console.log("Current player:", this.currentPlayer);
        console.log("Saving streak:", streakToSave);
        try {
            this.storageManager.saveUserData(this.currentPlayer);
            console.log("Successfully saved user data to localStorage");
            this.updateHighStreakLabel();
        } catch (error) {
            console.error("Error saving user data:", error);
        }
        console.log("\n=== Game Over ===");
        console.log(`Final Streak: ${streakToSave}`);
        console.log(`Player: ${this.currentPlayer.getNickname()}`);
        console.log("================\n");
    }

    createHighStreakLabel() {
        const label = document.createElement('div');
        label.className = 'high-streak-label';
        document.body.appendChild(label);
        this.domElements.highStreakLabel = label;
    }

    updateHighStreakLabel() {
        const highStreaks = this.storageManager.getHighStreaks();
        if (highStreaks.length > 0) {
            const highestStreak = highStreaks[0];
            this.domElements.highStreakLabel.innerHTML = `
                High Streak: <span class="streak-value">${highestStreak.streak}</span>
                <span class="nickname">(${highestStreak.nickname})</span>
            `;
        } else {
            this.domElements.highStreakLabel.innerHTML = 'High Streak: <span class="streak-value">0</span>';
        }
    }

    createCurrentStreakLabel() {
        const label = document.createElement('div');
        label.className = 'current-streak-label';
        document.body.appendChild(label);
        this.domElements.currentStreakLabel = label;
    }

    updateCurrentStreakLabel() {
        this.domElements.currentStreakLabel.innerHTML = `
            Your Streak: <span class="streak-value">${this.currentStreak}</span>
        `;
    }
}

// Expose globally
window.Game = Game;


