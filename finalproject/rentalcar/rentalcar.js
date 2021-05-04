var SearchableClients = [];

window.addEventListener('load', InitializeWebPage, false);

function InitializeWebPage() {
    LoadJSONDataFile();
    var element2 = document.getElementById('namesearch');
    if (element2) {
        element2.addEventListener('keyup', SearchForName, false);
    }

}

//#region class AJAXCalls
// This object is used to control what is updated by the GetContentUsingAJAX method
var AJAXCalls = AJAXCalls || {};
AJAXCalls.async = true;
AJAXCalls.options = AJAXCalls.options || {};
AJAXCalls.options.displayPanel = 'display-panel';
AJAXCalls.options.webPanelId = 'clientData';
AJAXCalls.options.hiddenClass = 'hidden';
//#endregion

//#region function GetContentUsingAJAX(infoPageURL)
// This is the method that will make the AJAX call, and load the page specified in 
// the param to the .innerHTML of the element with the id specified by AJAXCalls.options.webPanelId
function GetContentUsingAJAX(infoPageURL) {

    // Create the XMLHttpRequest object
    var asynchrequest = new XMLHttpRequest();

    asynchrequest.onreadystatechange = function() {

        if (asynchrequest.readyState == 4) {

            // Find the element we are supposed to update
            var elementToUpdate = document.getElementById(AJAXCalls.options.webPanelId);
            if (elementToUpdate && elementToUpdate.innerHTML !== undefined) {
                // Ok, the request completed, and we have the response in the .responseText
                // or the .responseHTML property of the variable we created as an XMLHttpRequest
                switch (asynchrequest.status) {
                    case 200:
                        ProcessJSONData(asynchrequest);
                        break;

                        // Check the common status codes of 404 and 500 next
                    case 404:
                        elementToUpdate.innerHTML = `
<span id='errmessage' class='problem-description'>
${asynchrequest.status}: Server indicated file <em>${infoPageURL}</em> does not exist. 
Please check the URL or file path is correct
</span>`;
                        ToggleClassState(AJAXCalls.options.displayPanel, AJAXCalls.options.hiddenClass, false);
                        break;

                    case 500:
                        elementToUpdate.innerHTML = `
<span id='errmessage' class='problem-description'>
${asynchrequest.status}: Server indicated a server error occurred - try again later
</span>`;
                        ToggleClassState(AJAXCalls.options.displayPanel, AJAXCalls.options.hiddenClass, false);
                        break;

                        // Handle any other status codes
                    default:
                        elementToUpdate.innerHTML = `
<span id='errmessage' class='problem-description'>
${asynchrequest.status}: Server indicated status code ${asynchrequest.status} - Not sure how to handle it
</span>`;
                        ToggleClassState(AJAXCalls.options.displayPanel, AJAXCalls.options.hiddenClass, false);
                        break;
                }
            } else {
                console.log(`Could not find element '${AJAXCalls.options.webPanelId}' to update it`);
            }
        } else {
            console.log(`Async callback to our logic but .readyState == ${asynchrequest.readyState} && .status == ${asynchrequest.status}`);
        }
    };

    asynchrequest.open("GET", infoPageURL, AJAXCalls.async);

    // This sends the request off to the URL indicated in the .open, using the method requested
    asynchrequest.send();


}
//#endregion

//#region function ParseTextAsHTML(rawXML, id)
// Given some text that represents XML, load it as XML, then extract the elements that are
// the child nodes of a specific node the XML as a string
function ParseTextAsHTML(rawHTML, id, stripJavaScript) {
    var returnString = "";
    // see https://www.w3schools.com/xml/xml_parser.asp 
    // and see https://www.w3schools.com/xml/dom_intro.asp
    var parser = new DOMParser();
    if (parser) {
        var xmlDoc = parser.parseFromString(rawHTML, "text/html");
        if (xmlDoc && xmlDoc.body !== undefined && id !== undefined) {
            switch (id) {
                case 'body':
                    returnString = xmlDoc.body.innerHTML;
                    break;
                case 'head':
                    returnString = xmlDoc.head.innerHTML;
                    break;
                default:
                    var XMLFragment = xmlDoc.getElementsByTagName(id);
                    if (XMLFragment && XMLFragment.length > 0) {
                        returnString = XMLFragment[0].innerHTML;
                    } else {
                        // XML has an error in it
                        console.log(`HTML document has an improperly closed tag such as a <br>, an <img> etc.`);
                    }
                    break;
            }
        }
    } else {
        console.log(`Cannot parse fragment as XML`);
        console.log(rawXML);
    }
    if (stripJavaScript) {
        const scriptTagClose = '</script>';
        // see https://www.w3schools.com/jsref/jsref_search.asp
        var startPoint = returnString.search(/<script/i);
        while (startPoint > 0) {
            // see https://www.w3schools.com/jsref/jsref_indexof.asp
            var endPoint = returnString.toLowerCase().indexOf(scriptTagClose, startPoint + 2);
            // see https://www.w3schools.com/jsref/jsref_substring.asp
            if (endPoint > 0) {
                returnString = returnString.substring(0, startPoint) + returnString.substring(endPoint + scriptTagClose.length + 1);
            } else {
                returnString = returnString.substring(0, startPoint)
            }
            // Are there any more script tags in the HTML?
            startPoint = returnString.search(/<script>/i);
        }
    }
    return returnString;
}
//#endregion

// Make the AJAX call and retrieve the JSON file called fileforxclientData.json
function LoadJSONDataFile() {
    GetContentUsingAJAX("./rentalclients.json");
    // Setup an AJAX request object


}

function ProcessJSONData(xhr) {

    var clientData = JSON.parse(xhr.responseText);

    SearchableClients = clientData;

    /* var element = document.getElementById('clientData');
    if (element && element.innerHTML !== undefined) {

        var htmlFragment = GridHeaderInfo(true);

        var rowId = 0;
        for (var idx = 0; idx < clientData.length; idx++) {
            var clientRecord = clientData[idx];
            rowId++;
            var rowHtmlFragment = OutputDataRow(clientRecord, rowId);
            if (rowHtmlFragment) {
                htmlFragment += rowHtmlFragment;
            }
        }

        element.innerHTML = htmlFragment;
    } */
}

function Clear2() {
    document.getElementById('SearchResults2').style.display = 'none';
}

var clientRecordMatches = [];

function SearchForName() {
    document.getElementById('SearchResults2').style.display = 'block';
    var element = document.getElementById('namesearch');
    if (element && element.value !== undefined) {
        var searchInput = element.value;
        searchInput = searchInput.toLowerCase();

        if (searchInput && searchInput.length > 0) {
            var htmlFragment = GridHeaderInfo(false);
            var rowId = 0;
            var idy = 0;
            for (let idx = 0; idx < SearchableClients.length; idx++) {

                var clientRecord = SearchableClients[idx];
                if (clientRecord) {
                    var matchNum = new RegExp(searchInput, 'gi');

                    if (searchInput.length >= 1 && clientRecord.last_name) {
                        if (clientRecord.last_name.match(matchNum)) {
                            clientRecordMatches[idy] = clientRecord;
                            idy++;
                            // found another match
                            rowId++;
                            var match2 = OutputDataRow(clientRecord, rowId);
                            htmlFragment += match2;
                        }
                    }

                }
            }

            if (rowId == 0) {
                // nothing found
                htmlFragment += "<span> No matches found </span>";
            }

            // Output the results to the screen
            var searchResults = document.getElementById('SearchResults2');
            if (searchResults && searchResults.innerHTML !== undefined) {
                searchResults.innerHTML = htmlFragment;
            }
        }
    }
}

function GridHeaderInfo(showTotalRecords) {
    var htmlFragment = "";
    if (showTotalRecords) {
        htmlFragment += `<div id='hdr-rows'>There are ${SearchableClients.length} rows of client data available.</div><br>
        `;
    }

    htmlFragment += `
    <div id='hdr-clientData' class='header'>
        <span id='hdr-city'>First Name</span>
        <span id='hdr-city'>Last Name</span>
        <span id='hdr-but'></span>
    </div>
    <br>
            `;
    return htmlFragment;
}

// This method formats an clientRecord for output
function OutputDataRow(clientRecord, rowId) {
    var evenRow = "odd-row";
    if ((rowId + 1) % 2 == 0) {
        evenRow = "even-row";
    }

    var rowHtmlFragment = `
    <div id='row-${rowId}' class='row ${evenRow}'>
        <span id='hdr-city'>${clientRecord.first_name}</span>
        <span id='hdr-city'>${clientRecord.last_name}</span>
        <span id='row-but'><input type="button" id="btn-2" value="Rent Form" onclick="formLoader('${clientRecord}', '${rowId}')"></span>
    </div> <br>                  
            `;

    return rowHtmlFragment;
}

/* if (document.getElementById("btn-2")) {
    document.getElementById("btn-2").onclick = function() { formLoader(clientRecord, rowId) };
} */


function formLoader(clientRecord, rowId) {
    /* var htmlFragment = "";
    var element = document.getElementById('clientForm');
    if (element && element.innerHTML !== undefined) {
        htmlFragment += clientRecordMatches[rowId - 1].first_name;
        element.innerHTML = htmlFragment;
    } */

    document.getElementById('rentalForm').style.display = "block";
    document.getElementById('searchFields').style.display = "none";
    document.getElementById('SearchResults2').style.display = "none";

    /* UpdateFormFieldValue(id, newValue); */
    UpdateFormFieldValue('fname', clientRecordMatches[rowId - 1].first_name);
    UpdateFormFieldValue('lname', clientRecordMatches[rowId - 1].last_name);
    UpdateFormFieldValue('address', clientRecordMatches[rowId - 1].address);
    UpdateFormFieldValue('province', clientRecordMatches[rowId - 1].state_prov);
    UpdateFormFieldValue('email1', clientRecordMatches[rowId - 1].email);
    UpdateFormFieldValue('phone', clientRecordMatches[rowId - 1].phone);
}

function searchReturn() {
    document.getElementById('rentalForm').style.display = "none";
    document.getElementById('searchFields').style.display = "block";
    document.getElementById('SearchResults2').style.display = "block";
    ClearCheckboxes('gps');
    ClearCheckboxes('child');
    document.getElementById("totalOut").innerHTML = "";
    document.querySelector('input[name="car"]:checked').checked = false;
    document.querySelector('input[name="add-on"]:checked').checked = false;
    document.getElementById('days').value = '';
}

function radioChoice() {
    var radioValue = "";
    radioValue = RetrieveRadioButtonValue('car');
    var el = document.getElementById("carImage");
    var img = new Image();

    var vehicleValue = 0;
    var optionalValue = 0.0;
    var total = 0;

    if (radioValue == "compact") {
        img.src = './compact.jpg';
        el.innerHTML = '<img src="' + img.src + '" WIDTH=300 />';
        vehicleValue = 15;
    } else if (radioValue == "mid") {
        img.src = './mid-size.jpg';
        el.innerHTML = '<img src="' + img.src + '" WIDTH=300 />';
        vehicleValue = 20;
    } else if (radioValue == "luxury") {
        img.src = './luxury.jpg';
        el.innerHTML = '<img src="' + img.src + '" WIDTH=300 />';
        vehicleValue = 35;
    } else if (radioValue == "van") {
        img.src = './van.jpg';
        el.innerHTML = '<img src="' + img.src + '" WIDTH=300 />';
        vehicleValue = 40;
    } else if (radioValue == "truck") {
        img.src = './truck.jpg';
        el.innerHTML = '<img src="' + img.src + '" WIDTH=300 />';
        vehicleValue = 40;
    }

    var radioValue2 = "";
    radioValue2 = RetrieveRadioButtonValue('add-on');

    if (radioValue2 == "roof") {
        optionalValue += 5;
    } else if (radioValue2 == "bicycle") {
        optionalValue += 5;
    } else if (radioValue2 == "neither") {
        optionalValue += 0;
    }

    if (document.getElementById("gps").checked) {
        var x = parseInt(document.getElementById("gps").value);
        optionalValue += x;
    }

    if (document.getElementById("child").checked) {
        var y = parseInt(document.getElementById("child").value);
        optionalValue += y;
    }

    var days = 1;

    days = RetrieveInputValueNumeric('days');

    var vehicleTotal = vehicleValue * days;
    var opTotal = optionalValue * days

    total = (vehicleValue * days + optionalValue * days);

    var firstN = "";
    var lastN = "";

    firstN = RetrieveInputValue('fname');
    lastN = RetrieveInputValue('lname');

    document.getElementById("totalOut").innerHTML =
        `
    <div id="totalPrice">Order For: <span id="priceT"> ${firstN}, ${lastN} </span>
    <div class="spaceOrder"></div>
    Vehicle Price: <span id="priceT"> $${vehicleTotal.toFixed(2)} </span>
    <div class="spaceOrder"></div>
    Add-ons Price: <span id="priceT"> $${opTotal.toFixed(2)} </span>
    <br>
    ------------------------------
    <div class="spaceOrder"></div>
    Rental Total: <span id="priceT"> $${total.toFixed(2)} </span> </div>
    `

}