# create-icons.ps1 - Script para crear iconos de Teams
Write-Host "🎨 Creando iconos para Teams Bot..." -ForegroundColor Green

# Crear icono de color (192x192) usando HTML
$colorIconHtml = @"
<!DOCTYPE html>
<html>
<head><title>Color Icon</title></head>
<body>
<canvas id="canvas" width="192" height="192" style="border:1px solid #ccc;"></canvas>
<script>
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Fondo azul
ctx.fillStyle = '#0078D4';
ctx.fillRect(0, 0, 192, 192);

// Círculo blanco
ctx.fillStyle = 'white';
ctx.beginPath();
ctx.arc(96, 96, 60, 0, 2 * Math.PI);
ctx.fill();

// Letra "O" azul
ctx.fillStyle = '#0078D4';
ctx.font = 'bold 80px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('O', 96, 96);
</script>
</body>
</html>
"@

# Crear icono de esquema (32x32)
$outlineIconHtml = @"
<!DOCTYPE html>
<html>
<head><title>Outline Icon</title></head>
<body>
<canvas id="canvas" width="32" height="32" style="border:1px solid #ccc;"></canvas>
<script>
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Círculo blanco
ctx.fillStyle = 'white';
ctx.beginPath();
ctx.arc(16, 16, 12, 0, 2 * Math.PI);
ctx.fill();

// Letra "O" blanca
ctx.fillStyle = 'white';
ctx.font = 'bold 16px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('O', 16, 16);
</script>
</body>
</html>
"@

# Guardar archivos HTML
$colorIconHtml | Out-File -FilePath "color-icon.html" -Encoding UTF8
$outlineIconHtml | Out-File -FilePath "outline-icon.html" -Encoding UTF8

Write-Host "✅ Archivos HTML creados:" -ForegroundColor Green
Write-Host "   - color-icon.html (192x192)" -ForegroundColor Yellow
Write-Host "   - outline-icon.html (32x32)" -ForegroundColor Yellow
Write-Host ""
Write-Host "📋 Instrucciones:" -ForegroundColor Cyan
Write-Host "1. Abre color-icon.html en el navegador" -ForegroundColor White
Write-Host "2. Haz clic derecho en el icono → 'Guardar imagen como...'" -ForegroundColor White
Write-Host "3. Guárdalo como 'color.png'" -ForegroundColor White
Write-Host "4. Repite con outline-icon.html → 'outline.png'" -ForegroundColor White
Write-Host "5. Coloca ambos archivos en la carpeta del proyecto" -ForegroundColor White
