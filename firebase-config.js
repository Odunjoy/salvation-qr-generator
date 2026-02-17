// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBU3nbD2yuohvg4HvWQlp0MtykfzUgh4Fg",
    authDomain: "salvation-qr-analytics.firebaseapp.com",
    databaseURL: "https://salvation-qr-analytics-default-rtdb.firebaseio.com",
    projectId: "salvation-qr-analytics",
    storageBucket: "salvation-qr-analytics.firebasestorage.app",
    messagingSenderId: "751581372778",
    appId: "1:751581372778:web:231a2cef9a99e4dd878513"
};

// Initialize Firebase (using compatibility version for easier implementation)
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const auth = firebase.auth();

// Set auth persistence to LOCAL (stays logged in)
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// Analytics tracking function (FIXED - no more duplicates!)
function trackScan(category, messageData) {
    const scanRef = database.ref('scans');

    // Get device info
    const deviceType = getDeviceType();
    const browser = getBrowser();

    // Create base scan record
    const scanData = {
        timestamp: Date.now(),
        date: new Date().toISOString(),
        category: category,
        messageTitle: messageData.title,
        deviceType: deviceType,
        browser: browser,
        userAgent: navigator.userAgent,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        language: navigator.language
    };

    // Get location first, then push ONCE to Firebase
    getLocation()
        .then(location => {
            // Add location if available
            if (location) {
                scanData.city = location.city;
                scanData.country = location.country;
                scanData.countryCode = location.countryCode;
            }

            // Push to Firebase ONCE with all data
            return scanRef.push(scanData);
        })
        .then(() => {
            console.log('✅ Scan tracked successfully');
        })
        .catch((error) => {
            console.error('❌ Error tracking scan:', error);
        });
}

// Get device type
function getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
    }
    return "desktop";
}

// Get browser name
function getBrowser() {
    const ua = navigator.userAgent;
    let browser = "Unknown";

    if (ua.indexOf("Firefox") > -1) {
        browser = "Firefox";
    } else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) {
        browser = "Opera";
    } else if (ua.indexOf("Trident") > -1) {
        browser = "IE";
    } else if (ua.indexOf("Edge") > -1 || ua.indexOf("Edg") > -1) {
        browser = "Edge";
    } else if (ua.indexOf("Chrome") > -1) {
        browser = "Chrome";
    } else if (ua.indexOf("Safari") > -1) {
        browser = "Safari";
    }

    return browser;
}

// Get location from IP (using ipapi.co free API)
async function getLocation() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return {
            city: data.city || 'Unknown',
            country: data.country_name || 'Unknown',
            countryCode: data.country_code || 'Unknown'
        };
    } catch (error) {
        console.log('Could not get location:', error);
        return null;
    }
}
