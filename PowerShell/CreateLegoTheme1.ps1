$themepalette = @{
  "themePrimary" = "#ff0000";
  "themeLighterAlt" = "#fff5f5";
  "themeLighter" = "#ffd6d6";
  "themeLight" = "#ffb3b3";
  "themeTertiary" = "#ff6666";
  "themeSecondary" = "#ff1f1f";
  "themeDarkAlt" = "#e60000";
  "themeDark" = "#c20000";
  "themeDarker" = "#8f0000";
  "neutralLighterAlt" = "#0b0b0b";
  "neutralLighter" = "#151515";
  "neutralLight" = "#252525";
  "neutralQuaternaryAlt" = "#2f2f2f";
  "neutralQuaternary" = "#373737";
  "neutralTertiaryAlt" = "#595858";
  "neutralTertiary" = "#ffffb3";
  "neutralSecondary" = "#ffff66";
  "neutralSecondaryAlt" = "#ffff66";
  "neutralPrimaryAlt" = "#ffff1f";
  "neutralPrimary" = "#ffff00";
  "neutralDark" = "#c2c200";
  "black" = "#8f8f00";
  "white" = "#000000";
}

$un = "Daniel.Walker@mindpetal.com"
$pw = "OmgiOmgi22**"
$spw = $pw | ConvertTo-SecureString -AsPlainText -Force
$creds = New-Object System.Management.Automation.PSCredential -ArgumentList $un, $spw

$turl = "https://mindpetal-admin.sharepoint.com"

Connect-PnPOnline -Url $turl -Credentials $creds

Add-PnPTenantTheme -Identity "Cool Lego Theme" -Palette $themepalette -IsInverted $false