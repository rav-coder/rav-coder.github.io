function litTOgal(value) {
    var result = 0;
    result = value / 3.785411784;
    document.getElementById("Gallons").value = result.toFixed(2);
    document.getElementById("out1").innerHTML = document.getElementById("Litres").value + " litres = " + document.getElementById("Gallons").value + " US Gallons";
}

function galTOlit(value) {
    var result = 0;
    result = value * 3.785411784;
    document.getElementById("Litres").value = result.toFixed(2);
    document.getElementById("out1").innerHTML = document.getElementById("Litres").value + " litres = " + document.getElementById("Gallons").value + " US Gallons";
}

function metersC(value) {
    var result = 0;
    result = value * 3.28084;
    document.getElementById("Feet").value = result.toFixed(2);
    document.getElementById("out2").innerHTML = document.getElementById("Meters").value + " meters = " + document.getElementById("Feet").value + " feet";
}

function feetC(value) {
    var result = 0;
    result = value / 3.28084;
    document.getElementById("Meters").value = result.toFixed(2);
    document.getElementById("out2").innerHTML = document.getElementById("Meters").value + " meters = " + document.getElementById("Feet").value + " feet";
}

function smetersC(value) {
    var result = 0;
    result = value / 0.092903;
    document.getElementById("Square Feet").value = result.toFixed(2);
    document.getElementById("out3").innerHTML = document.getElementById("Square Meters").value + " m² = " + document.getElementById("Square Feet").value + " ft²";
}

function sfeetC(value) {
    var result = 0;
    result = value * 0.092903;
    document.getElementById("Square Meters").value = result.toFixed(2);
    document.getElementById("out3").innerHTML = document.getElementById("Square Meters").value + " m² = " + document.getElementById("Square Feet").value + " ft²";
}

function kmC(value) {
    var result = 0;
    result = value * 0.62137119;
    document.getElementById("mile").value = result.toFixed(2);
    document.getElementById("out4").innerHTML = document.getElementById("km").value + " km = " + document.getElementById("mile").value + " mile";
}

function mileC(value) {
    var result = 0;
    result = value / 0.62137119;
    document.getElementById("km").value = result.toFixed(2);
    document.getElementById("out4").innerHTML = document.getElementById("km").value + " km = " + document.getElementById("mile").value + " mile";
}