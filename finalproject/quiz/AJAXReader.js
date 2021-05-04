/* was original passed upon the readrecords.js from the ReadXML demo from week 9 JSON examples */
"use strict;"

// Declare some global variables
var xmlRecords = undefined;
var dataset = [];

// You might use datasets like these for the FinalQuiz.xml file
var questionsDataSet = [];
var quizAnswers = [];

// for user answer record
var answers = [];
var answerCursor = -1;

// Add the onload event handler that will be called when the web page is loaded and read
window.addEventListener('load', InitializeWebpage, false);

//#region function InitializeWebpage()
function InitializeWebpage() {

    if (document.createElement("template").content) {
        console.log("Your browser supports templates!");
    } else {
        console.log("Your browser does not support templates!");
    }

    // LoadXMLData("NYCGO_museums_and_galleries_001.xml");
    LoadXMLData("FinalQuiz.xml");
}
//#endregion


//#region function LoadXMLData(url)
// Method that makes the AJAX call to load the url as an XML file, and then transfer it to the
// dataset global variable, and finally processes the dataset to produce the grid 
function LoadXMLData(url) {

    var asyncrequest = new XMLHttpRequest();
    // Setup the callback function
    asyncrequest.onreadystatechange = function() {

        if (asyncrequest.readyState == 4) {
            switch (asyncrequest.status) {
                case 200:
                    // Based upon the URL, we'll process the information differently
                    switch (url) {

                        // Read all the museum nodes from the XML file 

                        // Read the Quiz questions
                        case "FinalQuiz.xml":
                            // You might do something like this for the FinalQuiz.xml file processing
                            xmlRecords = asyncrequest.responseXML.getElementsByTagName("question");
                            if (xmlRecords) {
                                ProcessXMLDataSetQuestions();
                            }
                            xmlRecords = asyncrequest.responseXML.getElementsByTagName("rightanswers");
                            if (xmlRecords) {
                                ProcessXMLDataSetAnswers();
                            }

                            // You might initialize the quiz using this type of process
                            // Note we are waiting .5 seconds before firing this logic off
                            setTimeout(AskQuizQuestions, 0.5 * 1000);
                            break;
                        default:
                            break;
                    }


                    break;

                case 404:
                    debugger;
                    xmlRecords = undefined;
                    var errMessage = `
<div class='error-message'>
	Could not load XML file ${url} due to 404 error<br/>
	Please check the URL or file path is valid
</div>`;
                    SetElementInnerHTML('output-grid', errMessage);
                    ToggleElementClass('output-grid', 'hidden', false);
                    break;
                default:
                    debugger;
                    xmlRecords = undefined;
                    var errMessage = `
<div class='error-message'>
Could not load XML file ${url} due to ${asyncrequest.status} error
</div>`;
                    SetElementInnerHTML('output-grid', errMessage);
                    ToggleElementClass('output-grid', 'hidden', false);
                    break;
            }
        }

    };

    // Setup the request and send it off
    asyncrequest.open("GET", url, true);
    asyncrequest.send();

}

//#region function SetElementInnerHTML(id, htmlFragment)
// Helper function that allows us to set the .innerHTML of an element on the web page
function SetElementInnerHTML(id, htmlFragment) {
    var element = document.getElementById(id);
    if (element && element.innerHTML !== undefined) {
        element.innerHTML = htmlFragment;
    } else {
        console.log(`Could not find element id='${id}' on the web page`);
    }
    return element;
}
//#endregion

//#region function ToggleElementClass(id, className, force)
// Helper function that allows us to toggle a class on an element in the web page
function ToggleElementClass(id, className, force) {
    var element = document.getElementById(id);
    if (element && element.classList !== undefined) {
        element.classList.toggle(className, force);
    } else {
        console.log(`Could not find element id='${id} on the row`);
    }
    return element;
}
//#endregion

//#region function AddRowToCollection(id, row)
// Helper function that lets us add a row to the collection
function AddRowToCollection(id, row) {
    var element = document.getElementById(id);
    if (element) {
        element.appendChild(row);
    }
}
//#endregion

//#region function GetNewRow(templateId, newRowId, addClass) 
// Method that clones the template
function GetNewRow(templateId, newRowId, addClass) {
    // see https://www.w3schools.com/tags/tag_template.asp
    var rowTemplate = document.getElementById(templateId);
    if (rowTemplate && rowTemplate.content !== undefined) {
        // Make a clone of the template
        var newRow = null;
        // Find the first child node that is and element (nodeType = 1) and clone it
        // see https://www.w3schools.com/jsref/prop_node_nodetype.asp
        for (let idx = 0; idx < rowTemplate.content.childNodes.length; idx++) {
            if (rowTemplate.content.childNodes[idx].nodeType === 1) {
                newRow = rowTemplate.content.childNodes[idx].cloneNode(true);
                if (newRow) {
                    if (newRowId) {
                        // Populate the id
                        newRow.setAttribute('id', newRowId);
                    }
                    if (addClass) {
                        newRow.classList.add(addClass);
                    }
                    break;
                }
            }
        }
    } else {
        console.log(`Could not find template row id='${id}'`);
    }
    return newRow;
}
//#endregion

//#region function SetRowElementValue(row, className, htmlFragment)
// Helper function that transfer the htmlFragement to the .innerHTML of an element in the <template> copy
function SetRowElementValue(row, className, htmlFragment) {
    var element = row.getElementsByClassName(className);
    if (element && element.length > 0) {
        element[0].innerHTML = htmlFragment;
    } else {
        console.log(`Could not find element id='${className}' on the row`);
    }
    return element;
}
//#endregion


//#region function ProcessXMLDataSetQuestions()
function ProcessXMLDataSetQuestions() {
    for (var idx = 0; idx < xmlRecords.length; idx++) {
        // Retrieve a record from the xmlRecords so we can process it
        var currentRecord = xmlRecords[idx];
        if (currentRecord) {
            // Create the object
            var question = {};
            // parse out the XML, and add the information as properties on our object
            question.qnumber = GetXMLNodeValue(currentRecord, "qnumber", 3);
            question.qtitle = GetXMLNodeValue(currentRecord, "qtitle", 3);
            question.a = GetXMLNodeValue(currentRecord, "a", 3);
            question.b = GetXMLNodeValue(currentRecord, "b", 3);
            question.c = GetXMLNodeValue(currentRecord, "c", 3);
            question.d = GetXMLNodeValue(currentRecord, "d", 3);

            // Add the record to our collection
            questionsDataSet.push(question);
        }
    }
}
//#endregion

//#region function ProcessXMLDataSetAnswers()
// This shows how to extract the answers from the XML file
function ProcessXMLDataSetAnswers() {
    for (var idx = 0; idx < xmlRecords.length; idx++) {
        // Retrieve a record from the xmlRecords so we can process it
        var currentRecord = xmlRecords[idx];
        if (currentRecord) {
            // Create the array by getting the answers, and then splitting it based upon the comma
            var answersXML = currentRecord.childNodes[0].data;
            quizAnswers = answersXML.split(',');
        }
    }
}
//#endregion

//#region function GetXMLNodeValue(record, id)
// Helper method that allows us to deal with ![CDATA[]] wrappings in XML data sets
// nodeTypeDesired = 4  when we have ![CDATA[string]] syntax
// nodeTypeDesired = 3  when we have just regular strings
function GetXMLNodeValue(record, id, nodeTypeDesired) {
    var returnValue = "";
    var parentNode = record.getElementsByTagName(id);
    if (parentNode && parentNode.length > 0) {
        var childNodes = parentNode[0].childNodes;
        if (childNodes && childNodes.length > 0) {
            for (let idx = 0; idx < childNodes.length; idx++) {
                var node = childNodes[idx];
                if (node && node.nodeType === nodeTypeDesired) {
                    returnValue += node.nodeValue;
                }
            }
        }
    }
    return returnValue;
}
//#endregion

//#region function AskQuizQuestions()
// This outputs the questions and correct answers in a grid
var questionNum = 0;



function AskQuizQuestions() {

    SetElementInnerHTML("row-count", `There are ${questionsDataSet.length} questions in the quiz. <br>`);
    ToggleElementClass('output-area', 'hidden', false);
    SetElementInnerHTML('output-grid', "");
    // Output the heading for the grid
    var headingRow = GetNewRow('template-header-quiz', null);
    if (headingRow) {
        AddRowToCollection('output-grid', headingRow);
    }
    var bodyRowArea = GetNewRow('template-body', null);
    if (bodyRowArea) {
        AddRowToCollection('output-grid', bodyRowArea);
    }

    if (questionNum == questionsDataSet.length) {
        SetElementInnerHTML("row-count", ``);

        var outputHTML = "";
        outputHTML += `
        <div id="finalmessage"> Thank you for completing this quiz. </div>
        `;

        var correctTotal = 0;

        for (let qIdx = 0; qIdx < quizAnswers.length; qIdx++) {
            if (quizAnswers[qIdx] == answers[qIdx]) {
                correctTotal++;
            }
        }

        outputHTML += `
        <span id="finalmessage2"> Your Score: ${correctTotal}/${quizAnswers.length}</span>
        `
            //document.getElementById("resultOut").innerHTML = "Thank you for completing this quiz.";
        document.getElementById("resultOut").innerHTML = outputHTML;
        /* 
                for (let qIdx = 0; qIdx < quizAnswers.length; qIdx++) {
                    var currentRecord = questionsDataSet[qIdx];
                    var newRow = GetNewRow('template-row-quiz', 'answers', null);
                    if (newRow) {
                        SetRowElementValue(newRow, 'row-qNumber', "Answers Q " + qIdx);

                        SetRowElementValue(newRow, 'row-prompt', currentRecord.qtitle);
                        SetRowElementValue(newRow, 'row-answerA', "Correct Answer: " + quizAnswers[qIdx]);

                        // Add the new row to the collection
                        AddRowToCollection('output-rows', newRow);
                    }
                } */
    }
    // Now output the rows
    var recordId = 0;

    for (var idx = 0; idx < questionsDataSet.length; idx++) {
        // Retrieve a record from the xmlRecords so we can process it
        var currentRecord = questionsDataSet[questionNum];
        if (currentRecord) {
            // Each row must have a unique id
            var newRowId = `row-${recordId}`;
            var evenOddRow = (recordId % 2 === 0) ? "even-row" : "odd-row";
            // Retrieve a clone of the template, and assign it the id we generated
            var newRow = GetNewRow('template-row-quiz', newRowId, evenOddRow);
            if (newRow) {

                // We have a copy the row template, so populate it
                SetRowElementValue(newRow, 'row-qNumber', currentRecord.qnumber);
                SetRowElementValue(newRow, 'row-prompt', currentRecord.qnumber + ") " + currentRecord.qtitle);
                SetRowElementValue(newRow, 'row-answerA', "<sup class='possible-answer'></sup>" + currentRecord.a);
                SetRowElementValue(newRow, 'row-answerB', "<sup class='possible-answer'></sup> " + currentRecord.b);
                SetRowElementValue(newRow, 'row-answerC', "<sup class='possible-answer'></sup> " + currentRecord.c);
                SetRowElementValue(newRow, 'row-answerD', "<sup class='possible-answer'></sup> " + currentRecord.d);

                AddRowToCollection('output-rows', newRow);

                if (document.getElementById("nextButton")) {
                    document.getElementById("nextButton").disabled = true;
                }

                if (document.getElementById("submitButton")) {
                    document.getElementById("submitButton").disabled = true;
                }

                if (questionNum == (questionsDataSet.length - 1)) {
                    document.getElementById("nextButton").style.display = "none";
                    document.getElementById("submitButton").style.display = "block";
                }

                answerCursor++;
                questionNum++;

                // Add the new row to the collection
                /* if (document.getElementById("nextButton")) {
                    document.getElementById("nextButton").onclick = function AskQuizQuestions();
                } */
                break;

            } else {
                console.log(`Could not create new row template from template id='template-row'`);
            }
            recordId++;
        }
    }
}
//#endregion


function answerTest() {
    answers[answerCursor] = RetrieveRadioButtonValue('question');
    //answerCursor++;

    if (document.getElementById("nextButton")) {
        document.getElementById("nextButton").disabled = false;
    }

    if (document.getElementById("submitButton")) {
        document.getElementById("submitButton").disabled = false;
    }
}