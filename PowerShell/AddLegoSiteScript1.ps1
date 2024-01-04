$turl = "https://mindpetal-admin.sharepoint.com"
$site_script = '
{
  "$schema": "https://developer.microsoft.com/json-schemas/sp/site-design-script-actions.schema.json",
  "actions": [
    {
      "verb": "applyTheme",
      "themeName": "Cool Lego Theme"
    },
    {
      "verb": "installSolution",
      "id": "e2487cf5-5866-4bcd-88a3-15726db6a095"
    },
    {
      "verb": "associateExtension",
      "title": "LegoAppCustomizer",
      "location": "ClientSideExtension.ApplicationCustomizer",
      "clientSideComponentId": "66c6b838-c27e-472b-aaa4-8c5fd0979b34",
      "scope": "Web"
    },
    {
      "verb": "createSPList",
      "listName": "Customer Tracking",
      "templateType": 100,
      "subactions": [
        {
          "verb": "setDescription",
          "description": "List of Customers and Orders"
        },
        {
          "verb": "addSPField",
          "fieldType": "Text",
          "displayName": "Customer Name",
          "isRequired": false,
          "addToDefaultView": true
        },
        {
          "verb": "addSPField",
          "fieldType": "Number",
          "displayName": "Requisition Total",
          "addToDefaultView": true,
          "isRequired": true
        },
        {
          "verb": "addSPField",
           "fieldType": "User",
          "displayName": "Contact",
          "addToDefaultView": true,
          "isRequired": true
        },
        {
          "verb": "addSPField",
          "fieldType": "Note",
          "displayName": "Meeting Notes",
          "isRequired": false
        }
      ]
    }
  ],
  "version": 1
}
'

Connect-PnPOnline -Url $turl -Interactive

Write-Host -f Yellow "Adding Site Script"

Add-PnPSiteScript -Title "Lego Site Script" -Description "Applies the Lego Theme, Lego Customizer, and Creates a List" -Content $site_script

<# Set-PnPSiteScript -Identity ef09ed0f-2b9f-4315-82e7-f9c3df5a7fe5 -Content $site_script #>
