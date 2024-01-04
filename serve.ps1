function Log {
    param (
        $Message
    )
    Write-Host $Message -ForegroundColor yellow -BackgroundColor black
    Write-Host " "
}

Log "Extension build, bundle and ship:"
Log "REMINDER: update version in package.json before running this script because that will become the version of the extension package."

Log "Building AppCustomizer..."
Log "Building Header and Footer..."

Set-Location Header
npm run build
Set-Location ..
Set-Location Footer
npm run build
Set-Location ..

Remove-Item AppCustomizer/src/extensions/assets/header/*.html -ErrorAction Ignore
Remove-Item AppCustomizer/src/extensions/assets/footer/*.html -ErrorAction Ignore

Log "Bundling assets..."
$programPath = "node_scripts\bundle-extension-assets.js"
$cmd = "node"
$params = @($programPath)
& $cmd $params


Log "Serving for testing..."
Set-Location AppCustomizer
gulp clean
gulp serve
Set-Location ..
