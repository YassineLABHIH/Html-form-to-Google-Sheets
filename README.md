# Html-form-to-Google-Sheets

### This is a tutorial on how to transfer data from a simple html form to a google sheet

###### Made with :heart: by Yassine Labhih : full-stack developer https://yassinelabhih.com/



## Step 1

Create a basic HTML form with the inputs of your choice. 
:warning: Give a name to each of your inputs. they are important they are reused later

![HTML Form](assets/html_form.jpg)


## Step 2
- Create a new Google Sheets document
- Give a name to the documents and the sheet
- Give each column the name of your inputs previously chosen in your form
![Empty Google sheets](assets/google_sheet_empty.jpg)


## Step 3
- Open the extension App Script
![Open App Script](assets/open_apps_scripts.png)

- Name your project

- In Code.gs replace : 

'function myFunction() {
  
}'

by this code (You can found this code in [appscript.js file](appscript.js) )

```
const sheetName = 'ENTER_YOUR_SHEET_NAME'
const scriptProp = PropertiesService.getScriptProperties()

function intialSetup () {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doPost (e) {
  const lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    const sheet = doc.getSheetByName(sheetName)

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    const nextRow = sheet.getLastRow() + 1

    const newRow = headers.map(function(header) {
      return header === 'Date' ? new Date() : e.parameter[header]
    })

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  finally {
    lock.releaseLock()
  }
}

```

##### - :warning: Attention on line 1 you must enter the name of your sheet the name must match exactly for it to work !

- Save the project
![Save the project](assets/save_the_project.png)
- Deploy the project, select new deployment
![Deploy the project](assets/new_deployment.png)
- Select web app
![Select web app](assets/select_web_app.png)
- First field : Add a description of your choice
- Second field : select Me (yourmail@gmail.com)
- Third field : select Anyone
![Complet the web app fields](assets/add_web_app_config.png)
- Deploy
- A new window opens : Copy the URL !


## Step 3

- Go to your form code and copy the URL in the action field
![Copy the URL](assets/paste_web_app_url.png)

- Test your form with a submit
![Submit a form](assets/test_the_form.jpg)
 
- after submitting the form you should have this

![Result of submit](assets/result_of_submit.jpg)


## Step 4 : Redirecting after submit

- Create a Javascript file and copy this code (You can found this code in [Link to the JS code](form_submit.js) ):


```
const scriptURL = 'ENTER_THE_WEB_APP_URL'
const form = document.forms['ENTER_YOUR_FORM_NAME']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => alert("Thank you! your form is submitted successfully."))
        .then(() => { window.location.reload(); })
        .catch(error => console.error('Error!', error.message))
})
```

#####  - :warning: Attention on line 1 you must enter the web app URL (the same of the action of your form)

- Create a link to your js file in your form 
![Link to the script](assets/add_script_in_form.jpg)

- Now try to submit a new form

#### Now your form is relied to your Google Sheet and when you submit your form you have a js alert ! :wink: 

![Alert after submit](assets/alert_js.jpg)





















