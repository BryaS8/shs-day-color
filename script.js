const IMAGE_URL = 'https://resources.finalsite.net/images/f_auto,q_auto,t_image_size_4/v1720637066/lgsuhsdorg/aenxqg3htati93xmxnt5/2425SHSRedBlueCalendar.png';

// Function to analyze image color
async function getDayColor() {
    try {
        const response = await fetch(IMAGE_URL);
        const blob = await response.blob();
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                
                // Get image data
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                
                let redCount = 0;
                let blueCount = 0;
                
                // Count red and blue pixels
                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    
                    if (r > 150 && g < 100 && b < 100) redCount++;
                    if (r < 100 && g < 100 && b > 150) blueCount++;
                }
                
                resolve(redCount > blueCount ? 'red' : 'blue');
            };
            img.src = URL.createObjectURL(blob);
        });
    } catch (error) {
        console.error('Error getting day color:', error);
        return 'unknown';
    }
}

function updateDayDisplay(color) {
    const dayDisplay = document.getElementById('dayDisplay');
    dayDisplay.className = 'day-display ' + color;
    dayDisplay.textContent = `Today is a ${color.toUpperCase()} day`;
}

function updateCountdown() {
    const now = new Date();
    const alarmTime = new Date();
    alarmTime.setHours(7, 50, 0);
    
    if (now > alarmTime) {
        alarmTime.setDate(alarmTime.getDate() + 1);
    }
    
    const diff = alarmTime - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('countdown').innerHTML = 
        `Time until alarm: ${hours}h ${minutes}m ${seconds}s`;
}

async function setupNotifications() {
    const statusElement = document.getElementById('notificationStatus');
    const notifyBtn = document.getElementById('notifyBtn');

    if (!('Notification' in window)) {
        statusElement.textContent = 'Notifications not supported in this browser';
        return;
    }

    if (Notification.permission === 'granted') {
        statusElement.textContent = 'Notifications enabled';
        notifyBtn.style.display = 'none';
        setDailyAlarm();
    } else if (Notification.permission === 'denied') {
        statusElement.textContent = 'Notifications blocked - please enable them in your browser settings';
    } else {
        notifyBtn.onclick = async () => {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                statusElement.textContent = 'Notifications enabled';
                notifyBtn.style.display = 'none';
                setDailyAlarm();
            }
        };
    }
}

function setDailyAlarm() {
    const now = new Date();
    const alarmTime = new Date();
    alarmTime.setHours(7, 50, 0);
    
    if (now > alarmTime) {
        alarmTime.setDate(alarmTime.getDate() + 1);
    }
    
    const timeUntilAlarm = alarmTime - now;
    setTimeout(async () => {
        const color = await getDayColor();
        new Notification('School Day Alert', {
            body: `It's 7:50 AM! Today is a ${color.toUpperCase()} day`,
            icon: '/favicon.ico'
        });
        setDailyAlarm(); // Set next day's alarm
    }, timeUntilAlarm);
}

// Initialize
async function init() {
    const color = await getDayColor();
    updateDayDisplay(color);
    setInterval(updateCountdown, 1000);
    updateCountdown();
    setupNotifications();
}

// Start the app
init(); 