$turl = "https://mindpetal-admin.sharepoint.com"

Connect-PnPOnline -Url $turl -Interactive

Write-Host -f Yellow "Adding Site Script"

Add-PnPSiteDesign -Title "Lego Site Design" -SiteScriptIds "ef09ed0f-2b9f-4315-82e7-f9c3df5a7fe5" -WebTemplate GrouplessTeamSite
