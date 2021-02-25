var infolist = {};
infolist.ArrayInput = [];
infolist.Input = -1;
infolist.cursor = -1;

function ValidateForm() {
    var counter = 0;
    var x = document.forms["myForm"]["fname"].value;
    if (x == "") {
        alert("Name is required.");
        return false;
    } else if (x.match(/[a - zA - Z]/)) {
        counter++;
    } else {
        alert("First name does not match the required format.");
        return false;
    }

    var y = document.forms["myForm"]["lname"].value;
    if (y == "") {
        alert("Name is required.");
        return false;
    } else if (y.match(/[a - zA - Z]/)) {
        counter++;
    } else {
        alert("Last name does not match the required format.");
        return false;
    }

    var z = document.forms["myForm"]["postalcode"].value;
    if (z == "") {
        alert("Postal Code is required.");
        return false;
    } else if (z.match(/[a-zA-Z][0-9][a-zA-Z ][\s][0-9][a-zA-Z][0-9]/)) {
        counter++;
    } else {
        alert("Postal Code does not match the required format.");
        return false;
    }

    var a = document.forms["myForm"]["phone"].value;
    if (a == "") {
        alert("Phone # is required.");
        return false;
    } else if (a.match(/\d{3} \d{3} \d{4}/)) {
        counter++;
    } else {
        alert("Phone # does not match the required format.");
        return false;
    }

    var b = document.forms["myForm"]["email1"].value;
    if (b == "") {
        alert("Email is required.");
        return false;
    } else if (b.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
        counter++;
    } else {
        alert("Email does not match the required format.");
        return false;
    }

    if (counter == 5) return true;
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
        <span class="Delete-Row" onclick="DeleteFromArray(${idx});">Delete</span>
    </span>
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