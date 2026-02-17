// Analytics Dashboard Logic

let scansData = [];
let charts = {};

// Load and display analytics data
document.addEventListener('DOMContentLoaded', () => {
    loadAnalytics();

    // Auto-refresh every 30 seconds
    setInterval(refreshData, 30000);
});

// Load all analytics data
function loadAnalytics() {
    const scansRef = database.ref('scans');

    scansRef.on('value', (snapshot) => {
        scansData = [];
        snapshot.forEach((childSnapshot) => {
            scansData.push(childSnapshot.val());
        });

        updateDashboard();
    });
}

// Update all dashboard components
function updateDashboard() {
    updateStats();
    updateCharts();
    updateTables();
    updateRecentScans();
}

// Update stat cards
function updateStats() {
    const totalScans = scansData.length;
    document.getElementById('total-scans').textContent = totalScans.toLocaleString();

    // Mobile percentage
    const mobileScans = scansData.filter(scan => scan.deviceType === 'mobile').length;
    const mobilePercentage = totalScans > 0 ? Math.round((mobileScans / totalScans) * 100) : 0;
    document.getElementById('mobile-percentage').textContent = mobilePercentage + '%';

    // Unique countries
    const countries = new Set(scansData.map(scan => scan.country).filter(Boolean));
    document.getElementById('unique-countries').textContent = countries.size;

    // Top category
    const categoryCounts = {};
    scansData.forEach(scan => {
        categoryCounts[scan.category] = (categoryCounts[scan.category] || 0) + 1;
    });
    const topCategory = Object.keys(categoryCounts).reduce((a, b) =>
        categoryCounts[a] > categoryCounts[b] ? a : b
        , '');
    document.getElementById('top-category').textContent = topCategory || '-';
}

// Update all charts
function updateCharts() {
    updateCategoryChart();
    updateDeviceChart();
    updateTimeChart();
}

// Category distribution chart
function updateCategoryChart() {
    const categoryCounts = {};
    scansData.forEach(scan => {
        categoryCounts[scan.category] = (categoryCounts[scan.category] || 0) + 1;
    });

    const ctx = document.getElementById('categoryChart').getContext('2d');

    if (charts.category) {
        charts.category.destroy();
    }

    charts.category = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(categoryCounts),
            datasets: [{
                label: 'Scans',
                data: Object.values(categoryCounts),
                backgroundColor: 'rgba(102, 126, 234, 0.8)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
}

// Device type chart
function updateDeviceChart() {
    const deviceCounts = {};
    scansData.forEach(scan => {
        const device = scan.deviceType || 'unknown';
        deviceCounts[device] = (deviceCounts[device] || 0) + 1;
    });

    const ctx = document.getElementById('deviceChart').getContext('2d');

    if (charts.device) {
        charts.device.destroy();
    }

    const colors = {
        mobile: 'rgba(102, 126, 234, 0.8)',
        desktop: 'rgba(118, 75, 162, 0.8)',
        tablet: 'rgba(255, 193, 7, 0.8)',
        unknown: 'rgba(158, 158, 158, 0.8)'
    };

    charts.device = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(deviceCounts).map(d => d.charAt(0).toUpperCase() + d.slice(1)),
            datasets: [{
                data: Object.values(deviceCounts),
                backgroundColor: Object.keys(deviceCounts).map(d => colors[d] || colors.unknown),
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Time series chart
function updateTimeChart() {
    // Group scans by date
    const scansByDate = {};
    scansData.forEach(scan => {
        const date = new Date(scan.timestamp).toLocaleDateString();
        scansByDate[date] = (scansByDate[date] || 0) + 1;
    });

    // Sort dates
    const sortedDates = Object.keys(scansByDate).sort((a, b) =>
        new Date(a) - new Date(b)
    );

    const ctx = document.getElementById('timeChart').getContext('2d');

    if (charts.time) {
        charts.time.destroy();
    }

    charts.time = new Chart(ctx, {
        type: 'line',
        data: {
            labels: sortedDates,
            datasets: [{
                label: 'Scans per Day',
                data: sortedDates.map(date => scansByDate[date]),
                borderColor: 'rgba(102, 126, 234, 1)',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
}

// Update tables
function updateTables() {
    updateCountriesTable();
    updateBrowsersTable();
}

// Countries table
function updateCountriesTable() {
    const countryCounts = {};
    scansData.forEach(scan => {
        const country = scan.country || 'Unknown';
        countryCounts[country] = (countryCounts[country] || 0) + 1;
    });

    const sorted = Object.entries(countryCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    const tbody = document.getElementById('countries-tbody');
    const total = scansData.length;

    tbody.innerHTML = sorted.map(([country, count]) => `
        <tr>
            <td>${country}</td>
            <td>${count}</td>
            <td>${total > 0 ? Math.round((count / total) * 100) : 0}%</td>
        </tr>
    `).join('');
}

// Browsers table
function updateBrowsersTable() {
    const browserCounts = {};
    scansData.forEach(scan => {
        const browser = scan.browser || 'Unknown';
        browserCounts[browser] = (browserCounts[browser] || 0) + 1;
    });

    const sorted = Object.entries(browserCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    const tbody = document.getElementById('browsers-tbody');
    const total = scansData.length;

    tbody.innerHTML = sorted.map(([browser, count]) => `
        <tr>
            <td>${browser}</td>
            <td>${count}</td>
            <td>${total > 0 ? Math.round((count / total) * 100) : 0}%</td>
        </tr>
    `).join('');
}

// Recent scans table
function updateRecentScans() {
    const recent = [...scansData]
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 20);

    const tbody = document.getElementById('recent-scans-tbody');

    tbody.innerHTML = recent.map(scan => {
        const date = new Date(scan.timestamp);
        const timeStr = date.toLocaleString();
        const location = scan.city && scan.country
            ? `${scan.city}, ${scan.country}`
            : (scan.country || 'Unknown');

        return `
            <tr>
                <td>${timeStr}</td>
                <td>${scan.category || 'Unknown'}</td>
                <td>${scan.messageTitle || '-'}</td>
                <td>${scan.deviceType || 'Unknown'}</td>
                <td>${location}</td>
            </tr>
        `;
    }).join('');
}

// Refresh data
function refreshData() {
    loadAnalytics();
}

// Export to CSV
function exportToCSV() {
    if (scansData.length === 0) {
        alert('No data to export!');
        return;
    }

    // CSV headers
    const headers = ['Timestamp', 'Date', 'Category', 'Message', 'Device', 'Browser', 'Country', 'City'];

    // CSV rows
    const rows = scansData.map(scan => [
        scan.timestamp || '',
        scan.date || '',
        scan.category || '',
        scan.messageTitle || '',
        scan.deviceType || '',
        scan.browser || '',
        scan.country || '',
        scan.city || ''
    ]);

    // Combine into CSV string
    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
        csv += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    // Download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `salvation-qr-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Clear all analytics data
function clearAllData() {
    const confirmed = confirm('⚠️ WARNING: This will permanently delete ALL analytics data!\n\nAre you sure you want to continue?');

    if (!confirmed) {
        return;
    }

    // Double confirmation for safety
    const doubleConfirm = confirm('🚨 FINAL WARNING: This action CANNOT be undone!\n\nType YES in your mind and click OK to proceed.');

    if (!doubleConfirm) {
        return;
    }

    // Delete all data from Firebase
    const scansRef = database.ref('scans');
    scansRef.remove()
        .then(() => {
            alert('✅ All analytics data has been cleared successfully!');
            // Reset local data
            scansData = [];
            updateDashboard();
        })
        .catch((error) => {
            alert('❌ Error clearing data: ' + error.message);
            console.error('Error clearing data:', error);
        });
}

