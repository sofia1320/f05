class PomodoroTimer {
    constructor() {
        this.pomodoroTimeInput = document.getElementById('pomodoroTime');
        this.breakTimeInput = document.getElementById('breakTime');
        this.timeDisplay = document.getElementById('timeDisplay');
        this.toggleButton = document.getElementById('toggleButton');
        this.progressBar = document.getElementById('progress');
        this.status = document.getElementById('status');
        this.sessionsList = document.getElementById('sessionsList');

        this.isRunning = false;
        this.isBreak = false;
        this.minutes = parseInt(this.pomodoroTimeInput.value);
        this.seconds = 0;
        this.timer = null;
        this.sessions = [];

        this.initializeEventListeners();
        this.updateDisplay();
    }

    initializeEventListeners() {
        this.toggleButton.addEventListener('click', () => this.toggleTimer());
        this.pomodoroTimeInput.addEventListener('change', () => {
            if (!this.isRunning) {
                this.minutes = parseInt(this.pomodoroTimeInput.value);
                this.seconds = 0;
                this.updateDisplay();
            }
        });
    }

    toggleTimer() {
        this.isRunning = !this.isRunning;
        this.toggleButton.textContent = this.isRunning ? 'Pause' : 'Start';

        if (this.isRunning) {
            this.startTimer();
        } else {
            clearInterval(this.timer);
        }
    }

    startTimer() {
        this.timer = setInterval(() => {
            if (this.seconds === 0) {
                if (this.minutes === 0) {
                    this.handleTimerComplete();
                } else {
                    this.minutes--;
                    this.seconds = 59;
                }
            } else {
                this.seconds--;
            }

            this.updateProgress();
            this.updateDisplay();
        }, 1000);
    }

    handleTimerComplete() {
        if (this.isBreak) {
            this.isBreak = false;
            this.minutes = parseInt(this.pomodoroTimeInput.value);
            this.status.textContent = 'Work Time';
        } else {
            this.isBreak = true;
            this.minutes = parseInt(this.breakTimeInput.value);
            this.status.textContent = 'Break Time';
            this.addSession();
        }
        this.seconds = 0;
    }

    updateProgress() {
        const totalSeconds = this.isBreak ? 
            parseInt(this.breakTimeInput.value) * 60 : 
            parseInt(this.pomodoroTimeInput.value) * 60;
        const currentSeconds = (this.minutes * 60) + this.seconds;
        const progress = (currentSeconds / totalSeconds) * 100;
        this.progressBar.style.width = `${progress}%`;
    }

    updateDisplay() {
        this.timeDisplay.textContent = 
            `${String(this.minutes).padStart(2, '0')}:${String(this.seconds).padStart(2, '0')}`;
    }

    addSession() {
        const session = {
            date: new Date(),
            duration: this.pomodoroTimeInput.value
        };
        this.sessions.push(session);
        this.updateSessionsDisplay();
    }

    updateSessionsDisplay() {
        this.sessionsList.innerHTML = this.sessions.map(session => `
            <div class="session-item">
                <span>Date: ${session.date.toLocaleDateString()}</span>
                <span>Time: ${session.date.toLocaleTimeString()}</span>
                <span>Duration: ${session.duration} minutes</span>
            </div>
        `).join('');
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
});