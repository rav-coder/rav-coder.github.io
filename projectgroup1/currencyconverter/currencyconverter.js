var htmlFragment = "";
var result = 0;

function convertMain(value) {

    var mainoption = RetrieveMainOption();
    var secoption = RetrieveSecOption();

    if (mainoption == secoption) {
        document.getElementById("ItemsEntered").style.margin = "5px";
        htmlFragment = `
        <span class="error"> You are converting to the same currency</span>
        `
    }

    if (isNaN(value) || value == "") {
        document.getElementById("ItemsEntered").style.margin = "5px";
        htmlFragment = `
        <span class="error"> Please enter a number to convert</span>
        `

    } else {
        document.getElementById("ItemsEntered").style.marginTop = "15px";
        if (mainoption == "US") {
            ConvertUSTo(mainoption, secoption, value);
        }

        if (mainoption == "CAD") {
            ConvertCADTo(mainoption, secoption, value);
        }

        if (mainoption == "Euro") {
            ConvertEuroTo(mainoption, secoption, value);
        }

        if (mainoption == "Bitcoin") {
            ConvertBitcoinTo(mainoption, secoption, value);
        }

        if (mainoption == "Ethereum") {
            ConvertEthereumTo(mainoption, secoption, value);
        }
    }


    var outputElement = document.getElementById('ItemsEntered');
    if (outputElement && outputElement.innerHTML !== undefined) {
        outputElement.innerHTML = htmlFragment;
    }

    /* document.getElementById("currencyto-field").style.display = "unset"; */
}

function convertTo(value) {

}


function RetrieveMainOption() {
    var x = document.getElementById("currencymain").selectedIndex;
    return document.getElementsByTagName("option")[x].value;
}

function RetrieveSecOption() {
    var y = document.getElementById("currencyto").selectedIndex;
    return document.getElementsByTagName("option")[y].value;
}

function ConvertUSTo(mainoption, secoption, value) {
    if (secoption == "Bitcoin") {
        result = value / 56688.25;
        document.getElementById("currencyto-field").value = result.toFixed(6);
        htmlFragment = `
        ${value} <span class="unittype"> USD</span> = ${result.toFixed(6)} <span class="unittype"> BTC</span><br>
        <span class="bottomOut"> Conversion (56,688.25 USD = 1 BTC) <span>
        `
    }

    if (secoption == "Ethereum") {
        result = value / 1803.89;
        document.getElementById("currencyto-field").value = result.toFixed(6);
        htmlFragment = `
        ${value} <span class="unittype"> USD</span> = ${result.toFixed(6)} <span class="unittype"> ETH</span><br>
        <span class="bottomOut"> Conversion (1,803.89 USD = 1 ETH) <span>
        `
    }

    if (secoption == "CAD") {
        result = value * 1.254058821;
        document.getElementById("currencyto-field").value = result.toFixed(2);
        htmlFragment = `
        ${value} <span class="unittype"> USD</span> = ${result.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} <span class="unittype"> CAD</span><br>
        <span class="bottomOut"> Conversion (1.00 USD = 1.25 CAD) <span>
        `
    }

    if (secoption == "Euro") {
        result = value * 0.8345820787;
        document.getElementById("currencyto-field").value = result.toFixed(2);
        htmlFragment = `
        ${value} <span class="unittype"> USD</span> = ${result.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} <span class="unittype"> Euro</span><br>
        <span class="bottomOut"> Conversion (1.00 USD = 0.83 EUR) <span>
        `
    }
}

function ConvertCADTo(mainoption, secoption, value) {
    if (secoption == "Bitcoin") {
        result = value / 71321.7;
        document.getElementById("currencyto-field").value = result.toFixed(6);
        htmlFragment = `
        ${value} <span class="unittype"> CAD</span> = ${result.toFixed(6)} <span class="unittype"> BTC</span><br>
        <span class="bottomOut"> Conversion (71,321.70 CAD = 1 BTC) <span>
        `
    }

    if (secoption == "Ethereum") {
        result = value / 2269.54;
        document.getElementById("currencyto-field").value = result.toFixed(6);
        htmlFragment = `
        ${value} <span class="unittype"> CAD</span> = ${result.toFixed(6)} <span class="unittype"> ETH</span><br>
        <span class="bottomOut"> Conversion (2,269.54 CAD = 1 ETH) <span>
        `
    }

    if (secoption == "US") {
        result = value / 1.254058821;
        document.getElementById("currencyto-field").value = result.toFixed(2);
        htmlFragment = `
        ${value} <span class="unittype"> CAD</span> = ${result.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} <span class="unittype"> USD</span><br>
        <span class="bottomOut"> Conversion (1.25 CAD = 1.00 USD) <span>
        `
    }

    if (secoption == "Euro") {
        result = value * 0.66549020232118;
        document.getElementById("currencyto-field").value = result.toFixed(2);
        htmlFragment = `
        ${value} <span class="unittype"> CAD</span> = ${result.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} <span class="unittype"> EUR</span><br>
        <span class="bottomOut"> Conversion (1.00 CAD= 0.67 EUR) <span>
        `
    }
}


function ConvertEuroTo(mainoption, secoption, value) {
    if (secoption == "Bitcoin") {
        result = value / 47410.48;
        document.getElementById("currencyto-field").value = result.toFixed(6);
        htmlFragment = `
        ${value} <span class="unittype"> EUR</span> = ${result.toFixed(6)} <span class="unittype"> BTC</span><br>
        <span class="bottomOut"> Conversion (47,410.48 EUR = 1 BTC) <span>
        `
    }

    if (secoption == "Ethereum") {
        result = value / 1508.66;
        document.getElementById("currencyto-field").value = result.toFixed(6);
        htmlFragment = `
        ${value} <span class="unittype"> EUR</span> = ${result.toFixed(6)} <span class="unittype"> ETH</span><br>
        <span class="bottomOut"> Conversion (1,508.66 EUR = 1 ETH) <span>
        `
    }

    if (secoption == "US") {
        result = value / 0.8345820787;
        document.getElementById("currencyto-field").value = result.toFixed(2);
        htmlFragment = `
        ${value} <span class="unittype"> EUR</span> = ${result.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} <span class="unittype"> USD</span><br>
        <span class="bottomOut"> Conversion (0.83 EUR = 1.00 USD) <span>
        `
    }

    if (secoption == "CAD") {
        result = value / 0.66549020232118;
        document.getElementById("currencyto-field").value = result.toFixed(2);
        htmlFragment = `
        ${value} <span class="unittype"> EUR</span> = ${result.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} <span class="unittype"> CAD</span><br>
        <span class="bottomOut"> Conversion (0.67 EUR = 1.00 CAD) <span>
        `
    }
}



function ConvertBitcoinTo(mainoption, secoption, value) {
    if (secoption == "Euro") {
        result = value * 47410.48;
        document.getElementById("currencyto-field").value = result.toFixed(2);
        htmlFragment = `
        ${value} <span class="unittype"> BTC</span> = ${result.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} <span class="unittype"> EUR</span><br>
        <span class="bottomOut"> Conversion (1 BTC = 47,410.48 EUR) <span>
        `
    }

    if (secoption == "Ethereum") {
        result = value * 31.75011198;
        document.getElementById("currencyto-field").value = result.toFixed(6);
        htmlFragment = `
        ${value} <span class="unittype"> BTC</span> = ${result.toFixed(6)} <span class="unittype"> ETH</span><br>
        <span class="bottomOut"> Conversion (1 BTC = 31.75 ETH) <span>
        `
    }

    if (secoption == "US") {
        result = value * 56688.25;
        document.getElementById("currencyto-field").value = result.toFixed(2);
        htmlFragment = `
        ${value} <span class="unittype"> BTC</span> = ${result.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} <span class="unittype"> USD</span><br>
        <span class="bottomOut"> Conversion (1 BTC = 56,688.25 USD) <span>
        `
    }

    if (secoption == "CAD") {
        result = value * 71321.7;
        document.getElementById("currencyto-field").value = result.toFixed(2);
        htmlFragment = `
        ${value} <span class="unittype"> BTC</span> = ${result.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} <span class="unittype"> CAD</span><br>
        <span class="bottomOut"> Conversion (1 BTC = 71,321.7 CAD) <span>
        `
    }
}


function ConvertEthereumTo(mainoption, secoption, value) {
    if (secoption == "Euro") {
        result = value * 1508.66;
        document.getElementById("currencyto-field").value = result.toFixed(2);
        htmlFragment = `
        ${value} <span class="unittype"> ETH</span> = ${result.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} <span class="unittype"> EUR</span><br>
        <span class="bottomOut"> Conversion (1 ETH = 1,508.66 EUR) <span>
        `
    }

    if (secoption == "Bitcoin") {
        result = value / 31.75011198;
        document.getElementById("currencyto-field").value = result.toFixed(6);
        htmlFragment = `
        ${value} <span class="unittype"> ETH</span> = ${result.toFixed(6)} <span class="unittype"> BTC</span><br>
        <span class="bottomOut"> Conversion (31.75 ETH = 1 BTC) <span>
        `
    }

    if (secoption == "US") {
        result = value * 1803.89;
        document.getElementById("currencyto-field").value = result.toFixed(2);
        htmlFragment = `
        ${value} <span class="unittype"> ETH</span> = ${result.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} <span class="unittype"> USD</span><br>
        <span class="bottomOut"> Conversion (1 ETH = 1,803.89 USD) <span>
        `
    }

    if (secoption == "CAD") {
        result = value * 2269.54;
        document.getElementById("currencyto-field").value = result.toFixed(2);
        htmlFragment = `
        ${value} <span class="unittype"> ETH</span> = ${result.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} <span class="unittype"> CAD</span><br>
        <span class="bottomOut"> Conversion (1 ETH = 2,269.54 CAD) <span>
        `
    }
}

function ClearInputs() {
    document.getElementById('ItemsEntered').innerHTML = "";
}

//Focus Functions
function CalculateTopPosition(helperMsgId, rectangle, message) {
    var msgElement = document.getElementById(helperMsgId);
    if (msgElement && msgElement.innerHTML !== undefined && msgElement.style !== undefined) {
        msgElement.innerHTML = message;
        // We might need to make some adjustments for the height of this element if it wraps
        var rectangleOfMsgElement = msgElement.getBoundingClientRect();

        // Not sure the math is right, but it appears 3.5 times the input field height works well
        var topOffset = rectangle.top - (rectangle.height + rectangleOfMsgElement.height) + window.scrollY;
        // Add an inline style of the top to the helperMsgId to position it absolutely 
        // on the screen. 
        msgElement.style.top = topOffset + "px";

        // Not sure we have the math right, but -32 seems to work well
        var leftOffset = rectangle.left + rectangle.width - 32;
        // Add an inline style of the left to the helperMsgId to position it absolutely 
        // on the screen. 
        msgElement.style.left = leftOffset + "px";
    }

}

function HasFocus(id, helperMsgId) {
    var inputElement = document.getElementById(id);
    // if (inputElement && inputElement.value !== undefined) {
    if (inputElement) {
        // Get the bounding rectangle where the element is on the web page
        // see https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element-relative-to-the-browser-window
        var rectangleOfElement = inputElement.getBoundingClientRect();

        if (rectangleOfElement && rectangleOfElement.top !== undefined) {
            var msgText = inputElement.getAttribute("data-helpMsg");
            // Toggle the class called "hidden" on the helperMsgId element
            ToggleClassState(helperMsgId, 'hidden', false);
            // Reposition the element on the web page
            CalculateTopPosition(helperMsgId,
                rectangleOfElement,
                msgText);
        }
    }
}

function LostFocus(id, helperMsgId) {
    // Update the element to remove the top position
    var msgElement = document.getElementById(helperMsgId);
    if (msgElement) {
        msgElement.style = ""; // Remove the top style
        // Toggle the class called "hidden" on the helperMsgId element
        ToggleClassState(helperMsgId, 'hidden', true);
    }
}


function HasFocusGroup(id, helperMsgId) {
    var inputElement = document.getElementById(id);
    // if (inputElement && inputElement.value !== undefined) {
    if (inputElement) {
        // Get the bounding rectangle where the element is on the web page
        // see https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element-relative-to-the-browser-window
        var rectangleOfElement = inputElement.getBoundingClientRect();

        if (rectangleOfElement && rectangleOfElement.top !== undefined) {
            var msgText = inputElement.getAttribute("data-helpMsg");
            // Toggle the class called "hidden" on the helperMsgId element
            ToggleClassState(helperMsgId, 'hidden', false);
            // Reposition the element on the web page
            rectangleOfElement.width = rectangleOfElement.width / 1.28;
            CalculateTopPositionGroup(helperMsgId,
                rectangleOfElement,
                msgText);
        }
    }
}

function LostFocusGroup(id, helperMsgId, offset) {
    // Update the element to remove the top position
    var msgElement = document.getElementById(helperMsgId);
    if (msgElement) {
        msgElement.style = ""; // Remove the top style
        // Toggle the class called "hidden" on the helperMsgId element
        ToggleClassState(helperMsgId, 'hidden', true);
    }
}

function CalculateTopPositionGroup(helperMsgId, rectangle, message) {
    var msgElement = document.getElementById(helperMsgId);
    if (msgElement && msgElement.innerHTML !== undefined && msgElement.style !== undefined) {
        msgElement.innerHTML = message;
        // We might need to make some adjustments for the height of this element if it wraps
        var rectangleOfMsgElement = msgElement.getBoundingClientRect();

        // Not sure the math is right, but it appears 3.5 times the input field height works well
        var topOffset = rectangle.top - (rectangleOfMsgElement.height) + window.scrollY;
        // Add an inline style of the top to the helperMsgId to position it absolutely 
        // on the screen. 
        msgElement.style.top = topOffset + "px";

        // Not sure we have the math right, but -32 seems to work well
        var leftOffset = rectangle.left + rectangle.width - 32;
        // Add an inline style of the left to the helperMsgId to position it absolutely 
        // on the screen. 
        msgElement.style.left = leftOffset + "px";
    }

}