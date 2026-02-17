// Message categories with their icons
const categories = {
  love: { name: "Jesus's Love", icon: "❤️" },
  healing: { name: "Healing", icon: "🙏" },
  provision: { name: "Provision", icon: "🍞" },
  protection: { name: "Protection", icon: "🛡️" },
  salvation: { name: "Salvation", icon: "✝️" },
  peace: { name: "Peace", icon: "🕊️" },
  forgiveness: { name: "Forgiveness", icon: "🤲" },
  cross: { name: "The Cross", icon: "✟" },
  resurrection: { name: "Resurrection", icon: "🌅" },
  grace: { name: "Grace", icon: "💝" },
  hope: { name: "Hope", icon: "⭐" },
  strength: { name: "Strength", icon: "💪" },
  faith: { name: "Faith", icon: "🙌" },
  deliverance: { name: "Freedom", icon: "⛓️‍💥" },
  truth: { name: "Truth & Light", icon: "💡" },
  scripture: { name: "Scripture", icon: "📖" }
};

let selectedCategory = null;
let messages = {};

// Load messages from JSON file
async function loadMessages() {
  try {
    const response = await fetch('messages.json');
    messages = await response.json();
    console.log('Messages loaded successfully');
  } catch (error) {
    console.error('Error loading messages:', error);
  }
}

// Initialize the app
function initGenerator() {
  console.log('Initializing generator...');
  console.log('QRCode library available:', typeof QRCode !== 'undefined');

  renderCategorySelector();
  loadMessages();

  console.log('Categories rendered');
}

// Render category selector
function renderCategorySelector() {
  const container = document.getElementById('category-selector');

  if (!container) {
    console.error('Category selector container not found!');
    return;
  }

  Object.keys(categories).forEach(key => {
    const category = categories[key];
    const card = document.createElement('div');
    card.className = 'category-card';
    card.innerHTML = `
      <div class="category-icon">${category.icon}</div>
      <div class="category-name">${category.name}</div>
    `;

    card.addEventListener('click', () => selectCategory(key, card));
    container.appendChild(card);
  });

  console.log('Added', Object.keys(categories).length, 'category cards');
}

// Select a category
function selectCategory(key, element) {
  console.log('Category selected:', key);

  // Remove active class from all cards
  document.querySelectorAll('.category-card').forEach(card => {
    card.classList.remove('active');
  });

  // Add active class to selected card
  element.classList.add('active');
  selectedCategory = key;

  // Generate QR code
  generateQRCode(key);
}

// Generate QR code for selected category
function generateQRCode(category) {
  const qrContainer = document.getElementById('qr-code');
  qrContainer.innerHTML = ''; // Clear previous QR code

  // Check if QRCode library is loaded
  if (typeof QRCode === 'undefined') {
    qrContainer.innerHTML = '<p style="color: red; padding: 20px; text-align: center;">❌ QR Code library failed to load.<br>Please check your internet connection and refresh the page.</p>';
    console.error('QRCode library is not loaded');
    return;
  }

  // Get the current page URL and create message URL
  const baseUrl = window.location.origin + window.location.pathname.replace('index.html', '');
  const messageUrl = `${baseUrl}message.html?category=${category}`;

  console.log('Generating QR code for:', messageUrl);

  // Generate QR code
  try {
    const qr = new QRCode(qrContainer, {
      text: messageUrl,
      width: 256,
      height: 256,
      colorDark: "#4a90e2",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });

    // Show customization controls
    document.getElementById('customization-controls').style.display = 'block';

    // Show download button
    document.getElementById('download-btn').style.display = 'inline-flex';
    console.log('QR code generated successfully');
  } catch (error) {
    console.error('Error generating QR code:', error);
    qrContainer.innerHTML = '<p style="color: red; padding: 20px; text-align: center;">❌ Error generating QR code.<br>Please try again.</p>';
  }
}

// Randomize teaser and testimonial selections
function randomizeSelections() {
  const teaserSelect = document.getElementById('teaser-selector');
  const testimonialSelect = document.getElementById('testimonial-selector');

  teaserSelect.selectedIndex = Math.floor(Math.random() * 7);
  testimonialSelect.selectedIndex = Math.floor(Math.random() * 7);
}

// Download QR code with PRESIDENTIAL-LEVEL ULTRA-PREMIUM DESIGN
function downloadQRCode() {
  if (!selectedCategory) {
    alert('Please select a category first!');
    return;
  }

  const qrCanvas = document.querySelector('#qr-code canvas');
  if (!qrCanvas) {
    alert('QR code not found. Please generate a QR code first.');
    return;
  }

  // Get selected teaser and testimonial
  const teaserIndex = parseInt(document.getElementById('teaser-selector').value);
  const testimonialIndex = parseInt(document.getElementById('testimonial-selector').value);

  // EXECUTIVE-LEVEL MESSAGING (Refined, dignified)
  const teaserMessages = [
    'A message of profound significance awaits you',
    'Discover something extraordinary within',
    'This moment could change everything',
    'A personal message, meant for you',
    'Hope and purpose wait inside',
    'Your life\'s next chapter begins here',
    'Something miraculous awaits your discovery'
  ];

  const testimonials = [
    '"Profoundly moving" — Thousands Transformed',
    '"Life-altering wisdom" — Global Impact',
    '"Exactly what I needed" — Universal Praise',
    '"Deeply meaningful" — Changed Lives',
    '"Extraordinary message" — Worldwide Reach',
    '"Pure inspiration" — 1000+ Lives Changed',
    '"Genuine hope restored" — Proven Results'
  ];

  const teaser = teaserMessages[teaserIndex];
  const testimonial = testimonials[testimonialIndex];

  // EXECUTIVE COLOR PALETTES (Sophisticated, refined)
  const executivePalettes = {
    love: { primary: '#8B4C5C', secondary: '#6B3646', light: '#F5EEF0' },
    healing: { primary: '#2C5F4A', secondary: '#1E4435', light: '#EDF5F1' },
    provision: { primary: '#9B7653', secondary: '#75583D', light: '#F5F0E8' },
    protection: { primary: '#2E4A5C', secondary: '#1F3340', light: '#EBF1F5' },
    salvation: { primary: '#5D4A7A', secondary: '#443557', light: '#F0EDF5' },
    peace: { primary: '#2A6B7A', secondary: '#1E4D58', light: '#ECF3F5' },
    forgiveness: { primary: '#9B6446', secondary: '#6F4833', light: '#F3EDEA' },
    cross: { primary: '#7A4A4A', secondary: '#573535', light: '#F2EBEB' },
    resurrection: { primary: '#3F6B4F', secondary: '#2D4D39', light: '#EEF3F0' },
    grace: { primary: '#8B5B6F', secondary: '#63414F', light: '#F2EDF0' }
  };

  const palette = executivePalettes[selectedCategory] || executivePalettes.salvation;

  // Create canvas with executive dimensions (portrait, professional)
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = 800;
  canvas.height = 1100;

  // SOPHISTICATED GRADIENT BACKGROUND (Subtle, refined)
  const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  bgGradient.addColorStop(0, '#F8F9FA');
  bgGradient.addColorStop(0.5, '#FFFFFF');
  bgGradient.addColorStop(1, '#F5F6F8');
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // PREMIUM WHITE CARD with elegant shadow
  const cardMargin = 40;
  const cardRadius = 20;

  // Sophisticated multi-layer shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
  ctx.shadowBlur = 30;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 15;

  // Card background
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.roundRect(cardMargin, cardMargin, canvas.width - cardMargin * 2, canvas.height - cardMargin * 2, cardRadius);
  ctx.fill();

  // Reset shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  // ELEGANT TOP BORDER (Refined, executive)
  const borderGradient = ctx.createLinearGradient(cardMargin, cardMargin, canvas.width - cardMargin, cardMargin);
  borderGradient.addColorStop(0, palette.secondary);
  borderGradient.addColorStop(0.5, palette.primary);
  borderGradient.addColorStop(1, palette.secondary);
  ctx.fillStyle = borderGradient;
  ctx.fillRect(cardMargin, cardMargin, canvas.width - cardMargin * 2, 6);

  // SOPHISTICATED "FREE" TEXT (Refined gold, elegant)
  ctx.font = '700 72px Georgia, serif';
  ctx.textAlign = 'center';

  // Refined gold gradient
  const goldGradient = ctx.createLinearGradient(0, 130, 0, 200);
  goldGradient.addColorStop(0, '#C9A961');
  goldGradient.addColorStop(0.5, '#B8954A');
  goldGradient.addColorStop(1, '#A67C3C');
  ctx.fillStyle = goldGradient;

  // Subtle elegant glow
  ctx.shadowColor = 'rgba(201, 169, 97, 0.3)';
  ctx.shadowBlur = 20;
  ctx.fillText('FREE', canvas.width / 2, 160);

  // Reset shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;

  // REFINED ICON (Elegant, not playful)
  ctx.font = '56px Arial';
  ctx.fillStyle = palette.primary;
  ctx.fillText('✦', canvas.width / 2, 235);

  // EXECUTIVE TEASER MESSAGE (Professional typography)
  ctx.font = '500 24px Georgia, serif';
  ctx.fillStyle = '#2C2C2C';
  ctx.textAlign = 'center';

  // Subtle text shadow for depth
  ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
  ctx.shadowBlur = 3;
  ctx.shadowOffsetY = 1;

  // Word wrap with golden ratio lineheight
  const maxWidth = canvas.width - 120;
  const words = teaser.split(' ');
  let line = '';
  let y = 295;
  const lineHeight = 38;

  for (let word of words) {
    const testLine = line + word + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line !== '') {
      ctx.fillText(line.trim(), canvas.width / 2, y);
      line = word + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), canvas.width / 2, y);

  // Reset shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  // SUBTLE DIVIDER LINE (Elegant accent)
  const dividerY = y + 35;
  const dividerGradient = ctx.createLinearGradient(200, dividerY, 600, dividerY);
  dividerGradient.addColorStop(0, 'transparent');
  dividerGradient.addColorStop(0.5, palette.primary + '40');
  dividerGradient.addColorStop(1, 'transparent');
  ctx.strokeStyle = dividerGradient;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(200, dividerY);
  ctx.lineTo(600, dividerY);
  ctx.stroke();

  // QR CODE with LUXURY FRAME (Executive presentation)
  const qrSize = 420;
  const qrX = (canvas.width - qrSize) / 2;
  const qrY = dividerY + 50;

  // Outer sophisticated border
  const outerBorderWidth = 3;
  ctx.strokeStyle = palette.secondary;
  ctx.lineWidth = outerBorderWidth;
  ctx.strokeRect(qrX - outerBorderWidth, qrY - outerBorderWidth, qrSize + outerBorderWidth * 2, qrSize + outerBorderWidth * 2);

  // Inner refined accent
  const innerBorderWidth = 14;
  const innerGradient = ctx.createLinearGradient(qrX, qrY, qrX + qrSize, qrY + qrSize);
  innerGradient.addColorStop(0, palette.light);
  innerGradient.addColorStop(1, '#FFFFFF');
  ctx.fillStyle = innerGradient;
  ctx.fillRect(qrX - innerBorderWidth, qrY - innerBorderWidth, qrSize + innerBorderWidth * 2, qrSize + innerBorderWidth * 2);

  // White QR background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(qrX, qrY, qrSize, qrSize);

  // Draw QR code
  ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);

  // Subtle frame shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.06)';
  ctx.shadowBlur = 15;
  ctx.shadowOffsetY = 5;
  ctx.strokeStyle = palette.primary + '20';
  ctx.lineWidth = 1;
  ctx.strokeRect(qrX - innerBorderWidth, qrY - innerBorderWidth, qrSize + innerBorderWidth * 2, qrSize + innerBorderWidth * 2);

  // Reset shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  // PROFESSIONAL CALL-TO-ACTION (Dignified, clear)
  const ctaY = qrY + qrSize + 60;
  ctx.font = '600 26px Georgia, serif';
  ctx.fillStyle = '#2C2C2C';
  ctx.textAlign = 'center';
  ctx.fillText('SCAN TO DISCOVER', canvas.width / 2, ctaY);

  // EXECUTIVE TESTIMONIAL (Credible, professional)
  ctx.font = 'italic 18px Georgia, serif';
  ctx.fillStyle = '#6C757D';
  ctx.fillText(testimonial, canvas.width / 2, ctaY + 50);

  // REFINED TAGLINE (Trust-building)
  ctx.font = '400 15px Georgia, serif';
  ctx.fillStyle = '#8B8B8B';
  ctx.fillText('Trusted by thousands worldwide', canvas.width / 2, ctaY + 80);

  // ELEGANT FOOTER ACCENT (Sophisticated finish)
  const footerY = canvas.height - 70;
  const footerGrad = ctx.createLinearGradient(150, footerY, 650, footerY);
  footerGrad.addColorStop(0, 'transparent');
  footerGrad.addColorStop(0.5, palette.primary + '25');
  footerGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = footerGrad;
  ctx.fillRect(150, footerY, 500, 1);

  // Download
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `salvation-${selectedCategory}-executive.png`;
    a.click();
    URL.revokeObjectURL(url);
  });
}

// Helper function to adjust color brightness
function adjustBrightness(color, percent) {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255))
    .toString(16).slice(1);
}

// Show preview modal
function showPreview() {
  if (!selectedCategory) {
    alert('Please select a category first!');
    return;
  }

  const qrCanvas = document.querySelector('#qr-code canvas');
  if (!qrCanvas) {
    alert('QR code not found. Please generate a QR code first.');
    return;
  }

  // Generate premium QR on preview canvas
  const previewCanvas = document.getElementById('preview-canvas');
  generatePremiumQR(previewCanvas, qrCanvas);

  // Show modal
  document.getElementById('preview-modal').style.display = 'flex';
}

// Close preview modal
function closePreview() {
  document.getElementById('preview-modal').style.display = 'none';
}

// Download from preview
function downloadFromPreview() {
  const previewCanvas = document.getElementById('preview-canvas');
  previewCanvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `salvation-${selectedCategory}-executive.png`;
    a.click();
    URL.revokeObjectURL(url);
  });
  closePreview();
}

// Generate PRESIDENTIAL-LEVEL QR design on canvas
function generatePremiumQR(canvas, qrCanvas) {
  const ctx = canvas.getContext('2d');

  // Get user selections
  const teaserIndex = parseInt(document.getElementById('teaser-selector').value);
  const testimonialIndex = parseInt(document.getElementById('testimonial-selector').value);

  // EXECUTIVE MESSAGING (Same as download function)
  const teaserMessages = [
    'A message of profound significance awaits you',
    'Discover something extraordinary within',
    'This moment could change everything',
    'A personal message, meant for you',
    'Hope and purpose wait inside',
    'Your life\'s next chapter begins here',
    'Something miraculous awaits your discovery'
  ];

  const testimonials = [
    '"Profoundly moving" — Thousands Transformed',
    '"Life-altering wisdom" — Global Impact',
    '"Exactly what I needed" — Universal Praise',
    '"Deeply meaningful" — Changed Lives',
    '"Extraordinary message" — Worldwide Reach',
    '"Pure inspiration" — 1000+ Lives Changed',
    '"Genuine hope restored" — Proven Results'
  ];

  const teaser = teaserMessages[teaserIndex];
  const testimonial = testimonials[testimonialIndex];

  // EXECUTIVE COLOR PALETTES (Sophisticated)
  const executivePalettes = {
    love: { primary: '#8B4C5C', secondary: '#6B3646', light: '#F5EEF0' },
    healing: { primary: '#2C5F4A', secondary: '#1E4435', light: '#EDF5F1' },
    provision: { primary: '#9B7653', secondary: '#75583D', light: '#F5F0E8' },
    protection: { primary: '#2E4A5C', secondary: '#1F3340', light: '#EBF1F5' },
    salvation: { primary: '#5D4A7A', secondary: '#443557', light: '#F0EDF5' },
    peace: { primary: '#2A6B7A', secondary: '#1E4D58', light: '#ECF3F5' },
    forgiveness: { primary: '#9B6446', secondary: '#6F4833', light: '#F3EDEA' },
    cross: { primary: '#7A4A4A', secondary: '#573535', light: '#F2EBEB' },
    resurrection: { primary: '#3F6B4F', secondary: '#2D4D39', light: '#EEF3F0' },
    grace: { primary: '#8B5B6F', secondary: '#63414F', light: '#F2EDF0' }
  };

  const palette = executivePalettes[selectedCategory] || executivePalettes.salvation;

  // Executive canvas dimensions
  canvas.width = 800;
  canvas.height = 1100;

  // SOPHISTICATED BACKGROUND
  const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  bgGradient.addColorStop(0, '#F8F9FA');
  bgGradient.addColorStop(0.5, '#FFFFFF');
  bgGradient.addColorStop(1, '#F5F6F8');
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Premium card with elegant shadow
  const cardMargin = 40;
  const cardRadius = 20;

  ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
  ctx.shadowBlur = 30;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 15;

  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.roundRect(cardMargin, cardMargin, canvas.width - cardMargin * 2, canvas.height - cardMargin * 2, cardRadius);
  ctx.fill();

  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  // Elegant top border
  const borderGradient = ctx.createLinearGradient(cardMargin, cardMargin, canvas.width - cardMargin, cardMargin);
  borderGradient.addColorStop(0, palette.secondary);
  borderGradient.addColorStop(0.5, palette.primary);
  borderGradient.addColorStop(1, palette.secondary);
  ctx.fillStyle = borderGradient;
  ctx.fillRect(cardMargin, cardMargin, canvas.width - cardMargin * 2, 6);

  // Sophisticated "FREE" text
  ctx.font = '700 72px Georgia, serif';
  ctx.textAlign = 'center';

  const goldGradient = ctx.createLinearGradient(0, 130, 0, 200);
  goldGradient.addColorStop(0, '#C9A961');
  goldGradient.addColorStop(0.5, '#B8954A');
  goldGradient.addColorStop(1, '#A67C3C');
  ctx.fillStyle = goldGradient;

  ctx.shadowColor = 'rgba(201, 169, 97, 0.3)';
  ctx.shadowBlur = 20;
  ctx.fillText('FREE', canvas.width / 2, 160);

  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;

  // Refined icon
  ctx.font = '56px Arial';
  ctx.fillStyle = palette.primary;
  ctx.fillText('✦', canvas.width / 2, 235);

  // Executive teaser message
  ctx.font = '500 24px Georgia, serif';
  ctx.fillStyle = '#2C2C2C';
  ctx.textAlign = 'center';

  ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
  ctx.shadowBlur = 3;
  ctx.shadowOffsetY = 1;

  const maxWidth = canvas.width - 120;
  const words = teaser.split(' ');
  let line = '';
  let y = 295;
  const lineHeight = 38;

  for (let word of words) {
    const testLine = line + word + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line !== '') {
      ctx.fillText(line.trim(), canvas.width / 2, y);
      line = word + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), canvas.width / 2, y);

  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  // Subtle divider line
  const dividerY = y + 35;
  const dividerGradient = ctx.createLinearGradient(200, dividerY, 600, dividerY);
  dividerGradient.addColorStop(0, 'transparent');
  dividerGradient.addColorStop(0.5, palette.primary + '40');
  dividerGradient.addColorStop(1, 'transparent');
  ctx.strokeStyle = dividerGradient;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(200, dividerY);
  ctx.lineTo(600, dividerY);
  ctx.stroke();

  // QR code with luxury frame
  const qrSize = 420;
  const qrX = (canvas.width - qrSize) / 2;
  const qrY = dividerY + 50;

  // Outer border
  const outerBorderWidth = 3;
  ctx.strokeStyle = palette.secondary;
  ctx.lineWidth = outerBorderWidth;
  ctx.strokeRect(qrX - outerBorderWidth, qrY - outerBorderWidth, qrSize + outerBorderWidth * 2, qrSize + outerBorderWidth * 2);

  // Inner accent
  const innerBorderWidth = 14;
  const innerGradient = ctx.createLinearGradient(qrX, qrY, qrX + qrSize, qrY + qrSize);
  innerGradient.addColorStop(0, palette.light);
  innerGradient.addColorStop(1, '#FFFFFF');
  ctx.fillStyle = innerGradient;
  ctx.fillRect(qrX - innerBorderWidth, qrY - innerBorderWidth, qrSize + innerBorderWidth * 2, qrSize + innerBorderWidth * 2);

  // White QR background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(qrX, qrY, qrSize, qrSize);

  // Draw QR code
  ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);

  // Frame shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.06)';
  ctx.shadowBlur = 15;
  ctx.shadowOffsetY = 5;
  ctx.strokeStyle = palette.primary + '20';
  ctx.lineWidth = 1;
  ctx.strokeRect(qrX - innerBorderWidth, qrY - innerBorderWidth, qrSize + innerBorderWidth * 2, qrSize + innerBorderWidth * 2);

  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  // Professional call-to-action
  const ctaY = qrY + qrSize + 60;
  ctx.font = '600 26px Georgia, serif';
  ctx.fillStyle = '#2C2C2C';
  ctx.textAlign = 'center';
  ctx.fillText('SCAN TO DISCOVER', canvas.width / 2, ctaY);

  // Executive testimonial
  ctx.font = 'italic 18px Georgia, serif';
  ctx.fillStyle = '#6C757D';
  ctx.fillText(testimonial, canvas.width / 2, ctaY + 50);

  // Refined tagline
  ctx.font = '400 15px Georgia, serif';
  ctx.fillStyle = '#8B8B8B';
  ctx.fillText('Trusted by thousands worldwide', canvas.width / 2, ctaY + 80);

  // Elegant footer accent
  const footerY = canvas.height - 70;
  const footerGrad = ctx.createLinearGradient(150, footerY, 650, footerY);
  footerGrad.addColorStop(0, 'transparent');
  footerGrad.addColorStop(0.5, palette.primary + '25');
  footerGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = footerGrad;
  ctx.fillRect(150, footerY, 500, 1);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initGenerator);

function downloadQRCode() {
  if (!selectedCategory) {
    alert('Please select a category first!');
    return;
  }

  const qrCanvas = document.querySelector('#qr-code canvas');
  if (!qrCanvas) {
    alert('QR code not found. Please generate a QR code first.');
    return;
  }

  // STRATEGY 6: Category-specific colors for mystery
  const categoryColors = {
    love: { border: '#ff1744', glow: 'rgba(255, 23, 68, 0.4)' },
    healing: { border: '#00c853', glow: 'rgba(0, 200, 83, 0.4)' },
    provision: { border: '#ff6f00', glow: 'rgba(255, 111, 0, 0.4)' },
    protection: { border: '#1976d2', glow: 'rgba(25, 118, 210, 0.4)' },
    salvation: { border: '#9c27b0', glow: 'rgba(156, 39, 176, 0.4)' },
    peace: { border: '#00bcd4', glow: 'rgba(0, 188, 212, 0.4)' },
    forgiveness: { border: '#e91e63', glow: 'rgba(233, 30, 99, 0.4)' },
    cross: { border: '#795548', glow: 'rgba(121, 85, 72, 0.4)' },
    resurrection: { border: '#ffc107', glow: 'rgba(255, 193, 7, 0.4)' },
    grace: { border: '#f06292', glow: 'rgba(240, 98, 146, 0.4)' },
    hope: { border: '#ffeb3b', glow: 'rgba(255, 235, 59, 0.4)' },
    strength: { border: '#ff5722', glow: 'rgba(255, 87, 34, 0.4)' },
    faith: { border: '#3f51b5', glow: 'rgba(63, 81, 181, 0.4)' },
    deliverance: { border: '#4caf50', glow: 'rgba(76, 175, 80, 0.4)' },
    truth: { border: '#ffca28', glow: 'rgba(255, 202, 40, 0.4)' },
    scripture: { border: '#8d6e63', glow: 'rgba(141, 110, 99, 0.4)' }
  };

  // STRATEGY 1 & 2: Mysterious teaser text + emotional hooks
  const teaserMessages = [
    { text: 'What if this is the message\nyou\'ve been waiting for?', symbol: '✨' },
    { text: 'Your blessing is inside.\nAre you ready?', symbol: '🎁' },
    { text: 'Someone needs to hear this today.\nIs it you?', symbol: '❓' },
    { text: 'What does God want\nto tell you today?', symbol: '💫' },
    { text: 'This could change everything.\nScan to discover.', symbol: '⚡' },
    { text: 'A message of hope\nis waiting for you.', symbol: '🔓' },
    { text: 'Don\'t miss what\'s inside.\nYour breakthrough awaits.', symbol: '💎' }
  ];

  // STRATEGY 7: Testimonial teasers
  const testimonials = [
    '⭐⭐⭐⭐⭐ "This brought me to tears"',
    '⭐⭐⭐⭐⭐ "I needed this today"',
    '⭐⭐⭐⭐⭐ "Life-changing message"',
    '⭐⭐⭐⭐⭐ "Exactly what I needed to hear"',
    '⭐⭐⭐⭐⭐ "God spoke to me through this"',
    '⭐⭐⭐⭐⭐ "1000+ lives changed"',
    '⭐⭐⭐⭐⭐ "This gave me hope again"'
  ];


  // Get user selections from dropdowns
  const teaserIndex = parseInt(document.getElementById('teaser-selector').value);
  const testimonialIndex = parseInt(document.getElementById('testimonial-selector').value);

  // Use selected teaser and testimonial
  const teaser = teaserMessages[teaserIndex];
  const testimonial = testimonials[testimonialIndex];
  const categoryColor = categoryColors[selectedCategory];

  // Create canvas
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Larger canvas to fit all content
  canvas.width = 600;
  canvas.height = 750;

  // Draw gradient background
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#667eea');
  gradient.addColorStop(1, '#764ba2');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add white content area
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(20, 20, canvas.width - 40, canvas.height - 40);

  // Draw decorative top border (gold)
  const topGradient = ctx.createLinearGradient(20, 20, canvas.width - 20, 20);
  topGradient.addColorStop(0, '#ffd700');
  topGradient.addColorStop(0.5, '#ffe66d');
  topGradient.addColorStop(1, '#ffd700');
  ctx.fillStyle = topGradient;
  ctx.fillRect(20, 20, canvas.width - 40, 6);

  // Draw "FREE" text at top
  ctx.fillStyle = '#ffd700';
  ctx.font = 'bold 56px Arial';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(255, 215, 0, 0.6)';
  ctx.shadowBlur = 20;
  ctx.fillText('FREE', canvas.width / 2, 85);

  // Reset shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;

  // STRATEGY 4: Draw mystery symbol
  ctx.font = '40px Arial';
  ctx.fillStyle = categoryColor.border;
  ctx.fillText(teaser.symbol, canvas.width / 2, 140);

  // STRATEGY 1 & 2: Draw teaser message
  ctx.fillStyle = '#333';
  ctx.font = 'bold 20px Arial';
  const lines = teaser.text.split('\n');
  lines.forEach((line, index) => {
    ctx.fillText(line, canvas.width / 2, 180 + (index * 28));
  });

  // STRATEGY 3: Create urgency
  ctx.fillStyle = '#d32f2f';
  ctx.font = 'bold 18px Arial';
  ctx.fillText('⏰ Don\'t miss this!', canvas.width / 2, 260);

  // Draw QR code with category-specific colored border
  const qrSize = 280;
  const qrX = (canvas.width - qrSize) / 2;
  const qrY = 290;

  // Add white background for QR
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(qrX - 12, qrY - 12, qrSize + 24, qrSize + 24);

  // STRATEGY 6: Draw colored border with glow effect
  ctx.strokeStyle = categoryColor.border;
  ctx.lineWidth = 6;
  ctx.shadowColor = categoryColor.glow;
  ctx.shadowBlur = 20;
  ctx.strokeRect(qrX - 12, qrY - 12, qrSize + 24, qrSize + 24);

  // Reset shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;

  // Draw the actual QR code
  ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);

  // Draw "Scan Now" text
  ctx.fillStyle = '#555';
  ctx.font = 'bold 22px Arial';
  ctx.fillText(' 👆 Scan Now', canvas.width / 2, 610);

  // STRATEGY 7: Draw testimonial teaser at bottom
  ctx.fillStyle = '#666';
  ctx.font = '16px Arial';
  ctx.fillText(testimonial, canvas.width / 2, 660);

  // STRATEGY 5: Add social proof
  ctx.fillStyle = '#888';
  ctx.font = 'italic 14px Arial';
  ctx.fillText('Join thousands who discovered hope', canvas.width / 2, 690);

  // Download
  const link = document.createElement('a');
  link.download = `FREE-mystery-qr-${selectedCategory}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();

  console.log('Mystery QR code downloaded with all 7 strategies!');
}

// Initialize message display page
function initMessageDisplay() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');

  if (!category || !categories[category]) {
    displayError();
    return;
  }

  loadMessages().then(() => {
    displayMessage(category);
  });
}

// Display a random message from the selected category
function displayMessage(category) {
  const categoryMessages = messages[category];

  if (!categoryMessages || categoryMessages.length === 0) {
    displayError();
    return;
  }

  // Get random message from category
  const message = categoryMessages[Math.floor(Math.random() * categoryMessages.length)];

  // Update page elements
  document.getElementById('message-title').textContent = message.title;
  document.getElementById('message-text').textContent = message.message;
  document.getElementById('scripture-text').textContent = `"${message.scripture}"`;
  document.getElementById('scripture-reference').textContent = `— ${message.reference}`;
  document.getElementById('prayer-text').textContent = message.prayer;

  // Update page title
  document.title = `${message.title} | Salvation Message`;

  // Show the message container
  document.getElementById('message-container').style.display = 'block';
}

// Display error message
function displayError() {
  const container = document.getElementById('message-container');
  container.innerHTML = `
    <div class="glass-card">
      <h2>Message Not Found</h2>
      <p>We couldn't find the message you're looking for, but remember:</p>
      <div class="scripture-box">
        <p class="scripture-text">"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."</p>
        <p class="scripture-reference">— John 3:16</p>
      </div>
    </div>
  `;
  container.style.display = 'block';
}

// Share functionality
function shareMessage() {
  if (navigator.share) {
    navigator.share({
      title: document.getElementById('message-title').textContent,
      text: 'Jesus loves you! Check out this message of hope.',
      url: window.location.href
    }).catch(err => console.log('Error sharing:', err));
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Link copied to clipboard!');
    });
  }
}

// Random message on message page
function getRandomMessage() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');

  if (category) {
    // Reload the page to get a new random message
    window.location.reload();
  }
}
