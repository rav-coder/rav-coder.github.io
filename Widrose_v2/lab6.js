var infolist = {};
infolist.ArrayInput = [];
infolist.Input = -1;
infolist.cursor = -1;
var editposition = -1;

function ValidateForm() {

    var counter = 0;
    var x = document.forms["myForm"]["fname"].value;

    if (x.match(/[a - zA - Z]/)) {
        counter++;
    } else {
        HasFocus('fname', 'help-message');
        return false;
    }

    var y = document.forms["myForm"]["lname"].value;

    if (y.match(/[a - zA - Z]/)) {
        counter++;
    } else {
        HasFocus('lname', 'help-message');
        return false;
    }

    var z = document.forms["myForm"]["postalcode"].value;

    if (z.match(/[a-zA-Z][0-9][a-zA-Z ][\s][0-9][a-zA-Z][0-9]/)) {
        counter++;
    } else {
        HasFocus('postalcode', 'help-message');
        return false;
    }

    var a = document.forms["myForm"]["phone"].value;

    if (a.match(/\d{3} \d{3} \d{4}/)) {
        counter++;
    } else {
        HasFocus('phone', 'help-message');
        return false;
    }

    var b = document.forms["myForm"]["email1"].value;

    if (b.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
        counter++;
    } else {
        HasFocus('email1', 'help-message');
        return false;
    }

    if (counter == 5) {
        return true;
    }

}

function IDinput(id) {
    var value = "";
    var elementFound = document.getElementById(id);
    if (elementFound && elementFound.value !== undefined) {
        value = elementFound.value;
    } else {
        console.log("Element '" + id + "' cannot be found");
    }
    return value;
}


function CreateObject() {
    var customer = {};
    customer.name = IDinput('fname') + " " + IDinput('lname');
    customer.address = IDinput('address');
    customer.postalcode = IDinput('postalcode');
    customer.phone = IDinput('phone');
    customer.email = IDinput('email1');
    customer.clientinfo = {};
    if (document.querySelector('input[name="currentclient"]:checked') != null)
        customer.clientinfo.currentCLient = document.querySelector('input[name="currentclient"]:checked').value;
    else { HasFocusGroup('clienttext', 'help-message'); return; }


    if (document.querySelector('input[name="genderclient"]:checked') != null)
        customer.clientinfo.gender = document.querySelector('input[name="genderclient"]:checked').value;
    else { HasFocusGroup('clientgendertext', 'help-message'); return; }


    customer.clientinfo.age = IDinput('age');

    if (document.querySelector('input[name="hometype"]:checked') != null)
        customer.clientinfo.ownrent = document.querySelector('input[name="hometype"]:checked').value;
    else { HasFocusGroup('clienthometext', 'help-message'); return; }

    customer.clientinfo.income = IDinput('annualincome');
    customer.clientinfo.assets = [];

    var inputval = document.querySelectorAll('input[type=checkbox]:checked')

    for (var i = 0; i < inputval.length; i++) {
        customer.clientinfo.assets.push(inputval[i].value)
    }

    /*  customer.clientinfo.assets[0] = document.getElementById('Vehicle').value;
     customer.clientinfo.assets[1] = document.getElementById('RRSP').value;
     customer.clientinfo.assets[2] = document.getElementById('TFSA');
     customer.clientinfo.assets[3] = document.getElementById('RRIF'); */

    return customer;
}

function AddToArray() {
    if (ValidateForm()) {
        var InfoClient = CreateObject();
        if (InfoClient) {

            infolist.Input++;
            infolist.ArrayInput[infolist.Input] = InfoClient;
        }
        UpdateDisplay('ItemsEntered');
    }
}

function OutputHeaders() {
    var htmlFragment = `
<header style="margin-bottom: 5px; font-size:16px">
    <span id="hdr-Id">Id</span>
    <span id="hdr-Name">Name</span>
    <span class="Row-Address" id="hdr-Address">Address</span>
    <span class="Row-Postal" id="hdr-Postal">Postal Code</span>
    <span class="Row-Phone" id="hdr-Phone">Phone</span>
    <span class="Row-Email" id="hdr-Email">Email</span>
</header>
    `;
    return htmlFragment;
}

function UpdateDisplay(id) {
    var htmlFragment = OutputHeaders();
    var rowId = 0;
    for (let idx = 0; idx < infolist.ArrayInput.length; idx++) {
        var rowFragment = "";

        var currentRow = infolist.ArrayInput[idx];

        if (currentRow) {
            rowId++;
            var rowClass = (rowId % 2 == 0) ? "even-row" : "odd-row";

            rowFragment = `
<div class="Row ${rowClass}" id='row-${idx}'>
    <span class="Row-Id">${rowId}</span>
    <span class="Row-Name">${ReplaceBlanks(currentRow.name)}</span>
    <span class="Row-Address">${ReplaceBlanks(currentRow.address)}</span>
    <span class="Row-Postal">${ReplaceBlanks(currentRow.postalcode)}</span>
    <span class="Row-Phone">${ReplaceBlanks(currentRow.phone)}</span>
    <span class="Row-Email">${ReplaceBlanks(currentRow.email)}</span>
    <span class="Row-Actions">
        <span class="Edit-Row" onclick="EditItemFromArray(${idx});">Edit</span>
        <span class="Delete-Row" onclick="DeleteFromArray(${idx});">Delete</span>
    </span>
    <div class="linetwo">
    <span> Current Client: ${ReplaceBlanks(currentRow.clientinfo.currentCLient)}</span>
    <span class="linetwo">Gender: ${ReplaceBlanks(currentRow.clientinfo.gender)}</span>
    <span class="linetwo">Age: ${ReplaceBlanks(currentRow.clientinfo.age)}</span>
    <span class="linetwo">Home: ${ReplaceBlanks(currentRow.clientinfo.ownrent)}</span>
    <span class="linetwo">Income: $ ${ReplaceBlanks(currentRow.clientinfo.income)}</span>
    <span class="linetwo">Assets: ${ReplaceBlanks(currentRow.clientinfo.assets)}</span>
    </div>
</div>
`;
            htmlFragment += rowFragment;
        }
    }

    var outputElement = document.getElementById(id);
    if (outputElement && outputElement.innerHTML !== undefined) {
        outputElement.innerHTML = htmlFragment;
    }

    ClearInputFields();
}

function ReplaceBlanks(value) {
    var response = "-- Missing --";
    if (value && value.length > 0) {
        response = value;
    }
    return response;
}

function DeleteFromArray(idx) {

    if (idx > -1 && idx < infolist.ArrayInput.length) {

        infolist.ArrayInput[idx] = undefined;

        UpdateDisplay('ItemsEntered');
    }

}

function ClearInputFields() {

}
/* 
function ShowClient() {
    var x = document.getElementById('clientcontainer');
    if (x.style.display === "none") {
        x.style.display = "flex";
    } else {
        x.style.display = "none";
    }
    AddToArray();
} */

// Method that will retrieve an item from the array, and then place the values back in the form for editing
//   If the item was found, it also disables the Add button, and shows the Update button instead
function EditItemFromArray(idx) {
    editposition = idx;
    var retrieveRow = undefined;
    // Check that the index is in range before we attempt to retrieve the item from the array
    if (idx > -1 && idx < infolist.ArrayInput.length) {
        retrieveRow = infolist.ArrayInput[idx];
        if (retrieveRow) {
            UpdateFormFieldValue('edit-id', retrieveRow.id);
            var namegen = (retrieveRow.name).split(" ");
            var firstgen = namegen[0];
            var lastgen = (retrieveRow.name).substr((retrieveRow.name).indexOf(' ') + 1);
            UpdateFormFieldValue('fname', firstgen);
            UpdateFormFieldValue('lname', lastgen);
            UpdateFormFieldValue('address', retrieveRow.address);
            UpdateFormFieldValue('postalcode', retrieveRow.postalcode);
            UpdateFormFieldValue('phone', retrieveRow.phone);
            UpdateFormFieldValue('email1', retrieveRow.email);
            UpdateFormFieldValue('age', retrieveRow.clientinfo.age);
            UpdateFormFieldValue('annualincome', retrieveRow.clientinfo.income);

            SetRadioButtons('currentclient', retrieveRow.clientinfo.currentCLient);
            SetRadioButtons('genderclient', retrieveRow.clientinfo.gender);
            SetRadioButtons('hometype', retrieveRow.clientinfo.ownrent);

            ClearCheckboxes('Asset');
            // Reset the checkboxes back to the checked values
            SetCheckboxes('Asset', retrieveRow.clientinfo.assets);
        }
    }
    // Update the buttons
    if (retrieveRow) {
        /*   AddClassState("btn-submit", "hidden");
          RemoveClassState("btn-update", "hidden"); */

        AddClassState("btn-submit", "hidden");
        EnableInputElement('btn-update', true);
    } else {
        UpdateFormFieldValue('edit-id', -1);
        RemoveClassState("btn-submit", "hidden");
        AddClassState("btn-update", "hidden");
    }
}


// Remove a class from the element on the screen
function RemoveClassState(id, toggleClass) {
    var inputElement = document.getElementById(id);
    if (inputElement) {
        // For the Class to be removed
        inputElement.classList.remove(toggleClass, true);
    }
}
// Add a class to an element on the screen
function AddClassState(id, toggleClass) {
    var inputElement = document.getElementById(id);
    if (inputElement) {
        // Force the Class to be added
        inputElement.classList.toggle(toggleClass, true);
    }
}

function UpdateFormFieldValue(id, newValue) {
    var elementOnForm = document.getElementById(id);
    if (elementOnForm && elementOnForm.value !== undefined) {
        elementOnForm.value = newValue;
    }
}

function UpdateFormRadioButtonFieldValue(id, newValue) {

}

function UpdateFormCheckBoxFieldValue(id, newValue) {

}

function UpdateArrayItem() {
    if (IsFormValid()) {
        // the global value for indexvalue was set in the previous function
        // load data
        var customer = CreateObject();
        if (customer) {
            // Overwrite the object back at the original index location
            infolist.ArrayInput[editposition] = customer;

            // Reset submit button
            RemoveClassState("btn-submit", "hidden");
            EnableInputElement('btn-update', false);

            // Redisplay the grid
            UpdateDisplay('ItemsEntered');
        }
    }
}

function IsFormValid() {
    var isValid = true;
    // We can do any validations here if we wish

    if (isValid) {
        isValid = ValidateInputField('fname', 'errmessage');
    }

    if (isValid) {
        isValid = ValidateInputField('lname', 'errmessage');
    }

    if (isValid) {
        isValid = ValidateInputField('address', 'errmessage');
    }
    if (isValid) {
        isValid = ValidateInputField('email1', 'errmessage');
    }
    if (isValid) {
        isValid = ValidateInputField('postalcode', 'errmessage');
    }

    if (isValid) {
        isValid = ValidateInputField('phone', 'errmessage');
    }

    return isValid;
}