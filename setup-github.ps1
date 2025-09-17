# setup-github.ps1 - Script para conectar con GitHub
Write-Host "🚀 Configurando repositorio en GitHub..." -ForegroundColor Green

# Verificar que Git está funcionando
Write-Host "📋 Verificando Git..." -ForegroundColor Yellow
& "C:\Program Files\Git\bin\git.exe" --version

# Mostrar estado actual
Write-Host "📊 Estado del repositorio:" -ForegroundColor Yellow
& "C:\Program Files\Git\bin\git.exe" status

Write-Host "`n🔗 Para conectar con GitHub:" -ForegroundColor Cyan
Write-Host "1. Crea un repositorio en https://github.com/new" -ForegroundColor White
Write-Host "2. Copia la URL del repositorio" -ForegroundColor White
Write-Host "3. Ejecuta estos comandos:" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/TU-USUARIO/TU-REPO.git" -ForegroundColor Gray
Write-Host "   git push -u origin main" -ForegroundColor Gray

Write-Host "`n📁 Archivos listos para subir:" -ForegroundColor Green
& "C:\Program Files\Git\bin\git.exe" ls-files
