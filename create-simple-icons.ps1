# create-simple-icons.ps1 - Crear iconos simples para Teams
Write-Host "🎨 Creando iconos para Teams Bot..." -ForegroundColor Green

# Crear iconos usando HTML simple
$colorIcon = @"
<!DOCTYPE html>
<html>
<head><title>Color Icon</title></head>
<body>
<canvas id="canvas" width="192" height="192" style="border:1px solid #ccc;"></canvas>
<script>
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#0078D4';
ctx.fillRect(0, 0, 192, 192);
ctx.fillStyle = 'white';
ctx.beginPath();
ctx.arc(96, 96, 60, 0, 2 * Math.PI);
ctx.fill();
ctx.fillStyle = '#0078D4';
ctx.font = 'bold 80px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('O', 96, 96);
</script>
</body>
</html>
"@

$outlineIcon = @"
<!DOCTYPE html>
<html>
<head><title>Outline Icon</title></head>
<body>
<canvas id="canvas" width="32" height="32" style="border:1px solid #ccc;"></canvas>
<script>
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'white';
ctx.beginPath();
ctx.arc(16, 16, 12, 0, 2 * Math.PI);
ctx.fill();
ctx.fillStyle = 'white';
ctx.font = 'bold 16px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('O', 16, 16);
</script>
</body>
</html>
"@

# Guardar archivos
$colorIcon | Out-File -FilePath "color-icon.html" -Encoding UTF8
$outlineIcon | Out-File -FilePath "outline-icon.html" -Encoding UTF8

Write-Host "✅ Archivos creados:" -ForegroundColor Green
Write-Host "   - color-icon.html" -ForegroundColor Yellow
Write-Host "   - outline-icon.html" -ForegroundColor Yellow
Write-Host ""
Write-Host "📋 Siguiente paso:" -ForegroundColor Cyan
Write-Host "1. Abre color-icon.html en el navegador" -ForegroundColor White
Write-Host "2. Guarda como color.png (192x192)" -ForegroundColor White
Write-Host "3. Abre outline-icon.html" -ForegroundColor White
Write-Host "4. Guarda como outline.png (32x32)" -ForegroundColor White
