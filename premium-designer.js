// PRESIDENTIAL-LEVEL ULTRA-PREMIUM QR CODE DESIGNER
// White House / Fortune 500 Quality Standard

// This file contains helper functions for creating executive-level QR code designs
// with sophisticated typography, luxury aesthetics, and impeccable attention to detail

// Executive Color Palettes - Sophisticated and refined
const EXECUTIVE_PALETTES = {
    love: {
        primary: '#C7365F',  // Elegant burgundy
        secondary: '#8B2346',
        accent: '#F8E5E5'
    },
    healing: {
        primary: '#2C6E49',  // Deep emerald
        secondary: '#1B4332',
        accent: '#E8F3EC'
    },
    provision: {
        primary: '#D4A574',  // Luxurious gold
        secondary: '#9B7653',
        accent: '#F7F1E8'
    },
    protection: {
        primary: '#2E5266',  // Executive navy
        secondary: '#1C3A4A',
        accent: '#E6EEF2'
    },
    salvation: {
        primary: '#6A4C93',  // Royal purple
        secondary: '#4A3468',
        accent: '#EDE9F2'
    },
    peace: {
        primary: '#1A8B9D',  // Sophisticated teal
        secondary: '#135866',
        accent: '#E5F3F5'
    },
    forgiveness: {
        primary: '#C47335',  // Rich terracotta
        secondary: '#8B5229',
        accent: '#F3EBE3'
    },
    cross: {
        primary: '#8B4545',  // Deep mahogany
        secondary: '#633232',
        accent: '#F0E8E8'
    },
    resurrection: {
        primary: '#4A7C59',  // Refined forest green
        secondary: '#35574',
        accent: '#EBF2ED'
    },
    grace: {
        primary: '#A65B7A',  // Elegant mauve
        secondary: '#754156',
        accent: '#F2EAF0'
    }
};

// Luxury gradient builder
function createLuxuryGradient(ctx, x1, y1, x2, y2, color1, color2, color3) {
    const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(0.5, color2);
    gradient.addColorStop(1, color3 || color1);
    return gradient;
}

// Premium text shadow (subtle depth)
function addPremiumTextShadow(ctx, blur = 4) {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.12)';
    ctx.shadowBlur = blur;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2;
}

// Reset shadows
function resetShadow(ctx) {
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
}

// Word wrapping with precise control
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;
    const lines = [];

    for (let word of words) {
        const testLine = line + word + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && line !== '') {
            lines.push({ text: line.trim(), y: currentY });
            line = word + ' ';
            currentY += lineHeight;
        } else {
            line = testLine;
        }
    }
    lines.push({ text: line.trim(), y: currentY });

    return { lines, finalY: currentY };
}

// Draw multi-line text with perfect alignment
function drawMultilineText(ctx, lines, x) {
    lines.forEach(({ text, y }) => {
        ctx.fillText(text, x, y);
    });
}

// Subtle texture overlay for depth
function addSubtleTexture(ctx, x, y, width, height) {
    const imageData = ctx.getImageData(x, y, width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 3;
        data[i] += noise;
        data[i + 1] += noise;
        data[i + 2] += noise;
    }

    ctx.putImageData(imageData, x, y);
}
