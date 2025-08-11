class Player {
    constructor(nickname, email, consent = false){
        this.nickname = nickname;
        this.email = email;
        this.consent = consent;
        this.streak = 0;
        this.highStreak = 0;
        this.streaks = [];
        this.init();
    }
    init(){
    }

    getNickname(){
        return this.nickname;
    }

    getEmail(){
        return this.email;
    }

    getConsent() {
        return this.consent;
    }

    getCurrentStreak(){
        return this.streak;
    }

    getHighStreak(){
        return this.highStreak;
    }
    
    updateScore(newStreak){
        console.log(`Updating player streak from ${this.streak} to ${newStreak}`);
        this.streak = newStreak;
        
        if(newStreak > this.highStreak){
            console.log(`New high streak! Updating from ${this.highStreak} to ${newStreak}`);
            this.highStreak = newStreak;
        }
        
        this.streaks.push(newStreak);
        
        console.log("Current player state:", {
            streak: this.streak,
            highStreak: this.highStreak,
            streaks: this.streaks
        });
    }
}

// Expose globally
window.Player = Player;


