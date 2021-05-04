var SearchableClients = [];

window.addEventListener('load', InitializeWebPage, false);

function InitializeWebPage() {
    LoadJSONDataFile();
    var element = document.getElementById('idsearch');
    if (element) {
        element.addEventListener('keyup', SearchForID, false);
    }

    var element2 = document.getElementById('namesearch');
    if (element2) {
        element2.addEventListener('keyup', SearchForName, false);
    }

    var element3 = document.getElementById('phonesearch');
    if (element3) {
        element3.addEventListener('keyup', SearchForPhone, false);
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
    GetContentUsingAJAX("https://data.calgary.ca/resource/848s-4m4z.json");
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

function Clear1() {
    document.getElementById('SearchResults').style.display = 'none';
}

function Clear2() {
    document.getElementById('SearchResults2').style.display = 'none';
}

function Clear3() {
    document.getElementById('SearchResults3').style.display = 'none';
}


function SearchForID() {
    //document.body.appendChild(document.getElementsByTagName("template1").content.cloneNode(true));
    document.getElementById('SearchResults').style.display = 'block';
    document.getElementById('SearchResults2').style.display = 'none';
    document.getElementById('SearchResults3').style.display = 'none';
    var element = document.getElementById('idsearch');
    if (element && element.value !== undefined) {
        var searchInput = element.value;

        if (searchInput && parseInt(searchInput)) {
            if (searchInput && searchInput.length > 0) {
                var htmlFragment = GridHeaderInfo(false);
                var rowId = 0;

                for (let idx = 0; idx < SearchableClients.length; idx++) {

                    var clientRecord = SearchableClients[idx];
                    if (clientRecord) {
                        if (searchInput.length >= 1 && clientRecord.count) {
                            //var date = clientRecord.camera_url.description.substring(7, clientRecord.camera_url.description.length);
                            if (clientRecord.count == searchInput) {
                                // found another match
                                rowId++;
                                var match2 = OutputDataRow(clientRecord, rowId);
                                htmlFragment += match2;
                            }
                        }
                    }

                    // Output the results to the screen
                    var searchResults = document.getElementById('SearchResults');
                    if (searchResults && searchResults.innerHTML !== undefined) {
                        searchResults.innerHTML = htmlFragment;
                    }

                }

                if (rowId == 0) {
                    // nothing found
                    document.getElementById('SearchResults').innerHTML = "<span> No matches found. </span>";
                }
            }

        } else {
            document.getElementById('SearchResults').innerHTML = "<span> No matches found. Plese enter a number. </span>";
        }

    }
}

function SearchForName() {
    document.getElementById('SearchResults').style.display = 'none';
    document.getElementById('SearchResults2').style.display = 'block';
    document.getElementById('SearchResults3').style.display = 'none';
    var element = document.getElementById('namesearch');
    if (element && element.value !== undefined) {
        var searchInput = element.value;
        searchInput = searchInput.toLowerCase();


        if (searchInput && searchInput.length > 0) {
            var htmlFragment = GridHeaderInfo(false);
            var rowId = 0;

            for (let idx = 0; idx < SearchableClients.length; idx++) {

                var clientRecord = SearchableClients[idx];
                if (clientRecord) {
                    var matchNum = new RegExp(searchInput, 'gi');
                    if (searchInput.length >= 1) {
                        if (clientRecord.community_name.match(matchNum)) {
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

function SearchForPhone() {
    document.getElementById('SearchResults').style.display = 'none';
    document.getElementById('SearchResults2').style.display = 'none';
    document.getElementById('SearchResults3').style.display = 'block';
    var element = document.getElementById('phonesearch');
    if (element && element.value !== undefined) {
        var searchInput = element.value;


        if (searchInput && searchInput.length > 0) {
            var htmlFragment = GridHeaderInfo(false);
            var rowId = 0;

            for (let idx = 0; idx < SearchableClients.length; idx++) {

                var clientRecord = SearchableClients[idx];
                if (clientRecord) {
                    var matchNum = new RegExp(searchInput, 'gi');
                    if (searchInput.length >= 1) {
                        if (clientRecord.category.match(matchNum)) {
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
            var searchResults = document.getElementById('SearchResults3');
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
        <span id='hdr-rowid'>Row</span>
        <span id='hdr-address'>Community Name</span>
        <span id='hdr-city'>Region</span>
        <span id='hdr-city'>Category</span>
        <span id='hdr-count'>Count</span>
        <span id='hdr-address'>Description</span>
        <span id='hdr-city'>Date</span>
        <span id='hdr-city'>Location</span>
    </div>
    <br/>
            `;
    return htmlFragment;
}

// This method formats an clientRecord for output
function OutputDataRow(clientRecord, rowId) {
    var evenRow = "odd-row";
    if ((rowId + 1) % 2 == 0) {
        evenRow = "even-row";
    }

    var googleMap = "https://www.google.ca/maps/place/" + clientRecord.geocoded_column.latitude + "," + clientRecord.geocoded_column.longitude;



    var rowHtmlFragment = `
    <div id='row-${rowId}' class='row ${evenRow}'>
    <span class='row-rowid'>${rowId}</span>
    <span class='row-address'>${clientRecord.community_name}</span>
    <span class='row-city'>${clientRecord.sector}</span>
    <span class='row-city'>
            ${clientRecord.group_category}
    </span>
    <span class='row-count'>${clientRecord.count}</span>
    <span class='row-address'>
            ${clientRecord.category}
    </span>
    <span class='row-city'>
            ${clientRecord.month + " " + clientRecord.year}
    </span>
    <span id='hdr-city'>
    <a href="${googleMap}" target="_blank">See on Map</a>
    </span>
    </div> <br>                  
            `;
    return rowHtmlFragment;
}