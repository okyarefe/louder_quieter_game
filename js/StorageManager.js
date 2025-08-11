class StorageManager {
    constructor() {
        this.storage = localStorage;
        this.USER_STREAKS_KEY = 'userStreaks';
        this.HIGH_STREAKS_KEY = 'highStreaks';
    }

    saveUserData(player) {
        console.log("Saving user data");
        console.log("User Data:", player);
        if (!player) return;

        const userData = {
            nickname: player.nickname,
            email: player.email,
            streak: player.streak,
            highStreak: player.highStreak,
            consent: player.consent,
            timestamp: new Date().toISOString()
        };

        const allUsers = this.getAllUsers();

        const existingUserIndex = allUsers.findIndex(u => u.email === player.email);

        if (existingUserIndex !== -1) {
            const existingUser = allUsers[existingUserIndex];
            console.log(`Updating existing user ${player.nickname}'s data`);
            console.log(`Current streak: ${player.streak}, Previous streak: ${existingUser.streak}`);
            console.log(`Current high streak: ${player.highStreak}, Previous high streak: ${existingUser.highStreak}`);

            allUsers[existingUserIndex] = {
                ...userData,
                streak: player.streak,
                highStreak: Math.max(player.highStreak, existingUser.highStreak)
            };
        } else {
            console.log(`Adding new user ${player.nickname}`);
            allUsers.push(userData);
        }

        try {
            this.storage.setItem(this.USER_STREAKS_KEY, JSON.stringify(allUsers));
            console.log("Successfully saved user data to localStorage");
        } catch (error) {
            console.error("Error saving to localStorage:", error);
        }

        this.updateHighStreaks(allUsers);
    }

    getAllUsers() {
        try {
            const users = this.storage.getItem(this.USER_STREAKS_KEY);
            return users ? JSON.parse(users) : [];
        } catch (error) {
            console.error("Error reading from localStorage:", error);
            return [];
        }
    }

    getHighStreaks(limit = 10) {
        try {
            const highStreaks = this.storage.getItem(this.HIGH_STREAKS_KEY);
            return highStreaks ? JSON.parse(highStreaks) : [];
        } catch (error) {
            console.error("Error reading high streaks from localStorage:", error);
            return [];
        }
    }

    updateHighStreaks(allUsers) {
        try {
            const sortedUsers = [...allUsers].sort((a, b) => b.highStreak - a.highStreak);

            const topStreaks = sortedUsers.slice(0, 3).map(user => ({
                nickname: user.nickname,
                email: user.email,
                streak: user.highStreak,
                timestamp: user.timestamp
            }));

            this.storage.setItem(this.HIGH_STREAKS_KEY, JSON.stringify(topStreaks));
            console.log("Successfully updated high streaks:", topStreaks);
        } catch (error) {
            console.error("Error updating high streaks:", error);
        }
    }

    getUserByEmail(email) {
        const allUsers = this.getAllUsers();
        return allUsers.find(user => user.email === email);
    }

    clearAllData() {
        try {
            this.storage.removeItem(this.USER_STREAKS_KEY);
            this.storage.removeItem(this.HIGH_STREAKS_KEY);
            console.log("Successfully cleared all data from localStorage");
        } catch (error) {
            console.error("Error clearing data from localStorage:", error);
        }
    }

    clearHighStreaks() {
        try {
            this.storage.removeItem(this.HIGH_STREAKS_KEY);
            console.log("Successfully cleared high streaks from localStorage");
        } catch (error) {
            console.error("Error clearing high streaks from localStorage:", error);
        }
    }

    isNewHighScore(streak) {
        try {
            const highStreaks = this.getHighStreaks();
            if (highStreaks.length === 0) {
                return true;
            }
            const currentHighestStreak = Math.max(...highStreaks.map(score => score.streak));
            const isNewHigh = streak > currentHighestStreak;
            console.log(`Checking if ${streak} is a new high score. Current highest: ${currentHighestStreak}, Is new high: ${isNewHigh}`);
            return isNewHigh;
        } catch (error) {
            console.error("Error checking for new high score:", error);
            return false;
        }
    }

    exportUserScoresToCSV() {
        try {
            const users = this.getAllUsers();
            if (users.length === 0) {
                console.log("No user data to export");
                return;
            }

            const sortedUsers = [...users].sort((a, b) => b.highStreak - a.highStreak);

            const headers = ['Nickname', 'Email', 'High Streak', 'Consent', 'Last Updated'];
            const csvRows = sortedUsers.map(user => [
                user.nickname,
                user.email,
                user.highStreak,
                user.consent ? 'Yes' : 'No',
                user.timestamp
            ]);

            const csvContent = [
                headers.join(','),
                ...csvRows.map(row => row.join(','))
            ].join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `user_scores_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            console.log("Successfully exported user scores to CSV");
        } catch (error) {
            console.error("Error exporting user scores to CSV:", error);
        }
    }

    getPlayerRank(player) {
        try {
            const allUsers = this.getAllUsers();
            const sortedUsers = [...allUsers].sort((a, b) => b.highStreak - a.highStreak);
            const playerIndex = sortedUsers.findIndex(user => user.email === player.email);
            return playerIndex + 1;
        } catch (error) {
            console.error("Error getting player rank:", error);
            return null;
        }
    }
}

// Expose globally
window.StorageManager = StorageManager;


