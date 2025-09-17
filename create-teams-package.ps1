# create-teams-package.ps1 - Crear paquete de aplicación Teams
Write-Host "📦 Creando paquete de aplicación Teams..." -ForegroundColor Green

# Verificar que existen los archivos necesarios
$requiredFiles = @("manifest.json", "color.png", "outline.png")
$missingFiles = @()

foreach ($file in $requiredFiles) {
    if (-not (Test-Path $file)) {
        $missingFiles += $file
    }
}

if ($missingFiles.Count -gt 0) {
    Write-Host "❌ Archivos faltantes:" -ForegroundColor Red
    foreach ($file in $missingFiles) {
        Write-Host "   - $file" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "📋 Crea los archivos faltantes antes de continuar" -ForegroundColor Yellow
    exit 1
}

# Crear carpeta para el paquete
$packageFolder = "teams-app-package"
if (Test-Path $packageFolder) {
    Remove-Item $packageFolder -Recurse -Force
}
New-Item -ItemType Directory -Path $packageFolder | Out-Null

# Copiar archivos al paquete
Copy-Item "manifest.json" -Destination "$packageFolder\"
Copy-Item "color.png" -Destination "$packageFolder\"
Copy-Item "outline.png" -Destination "$packageFolder\"

# Crear archivo ZIP del paquete
$zipFile = "OBLIKU-Teams-Bot.zip"
if (Test-Path $zipFile) {
    Remove-Item $zipFile -Force
}

Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($packageFolder, $zipFile)

Write-Host "✅ Paquete de Teams creado:" -ForegroundColor Green
Write-Host "   - Carpeta: $packageFolder" -ForegroundColor Yellow
Write-Host "   - ZIP: $zipFile" -ForegroundColor Yellow
Write-Host ""
Write-Host "📋 Archivos incluidos:" -ForegroundColor Cyan
Get-ChildItem $packageFolder | ForEach-Object {
    Write-Host "   - $($_.Name)" -ForegroundColor White
}
Write-Host ""
Write-Host "🚀 Siguiente paso:" -ForegroundColor Green
Write-Host "1. Ve a Teams → Apps → Manage your apps" -ForegroundColor White
Write-Host "2. Upload a custom app" -ForegroundColor White
Write-Host "3. Selecciona el archivo: $zipFile" -ForegroundColor White
Write-Host "4. ¡Prueba tu bot!" -ForegroundColor White
