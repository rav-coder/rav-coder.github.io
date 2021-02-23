window.onload = timefunc;

function timefunc() {
    var datecheck = new Date();
    document.getElementById("date").innerHTML = datecheck;
}

function ordercheck() {
    var firstname;
    var lastname;
    var phonenumber;
    var message = "Order for: <br>";
    firstname = document.getElementById("fname").value;
    lastname = document.getElementById("lname").value;
    phonenumber = document.getElementById("phone").value;
    message += "Name: " + firstname + " " + lastname;
    message += "<br>" + "Phone# " + phonenumber;
    message += "<br>" + "<br>" + "Details: " + "<br>";

    var ordertotal = parseFloat(0);

    if (document.querySelector('input[name="Margherita"]:checked') && parseFloat(document.getElementById("MargheritaQuantity").value) > 0) {
        var orderA = 0;
        orderA = parseFloat(document.getElementById("MargheritaQuantity").value) * parseFloat(document.querySelector('input[name="Margherita"]:checked').value);
        ordertotal += orderA;
        message += parseFloat(document.getElementById("MargheritaQuantity").value) + " Margherita    $" + orderA + "<br>";
    }

    if (document.querySelector('input[name="QuattroFormaggi"]:checked') && parseFloat(document.getElementById("QuattroFormaggiQuantity").value) > 0) {
        var orderB = 0;
        orderB = parseFloat(document.getElementById("QuattroFormaggiQuantity").value) * parseFloat(document.querySelector('input[name="QuattroFormaggi"]:checked').value);
        ordertotal += orderB;
        message += parseFloat(document.getElementById("QuattroFormaggiQuantity").value) + " Quattro Formaggi   $" + orderB + "<br>";
    }

    if (document.querySelector('input[name="Capricciosa"]:checked') && parseFloat(document.getElementById("CapricciosaQuantity").value) > 0) {
        var orderC = 0;
        orderC = parseFloat(document.getElementById("CapricciosaQuantity").value) * parseFloat(document.querySelector('input[name="Capricciosa"]:checked').value);
        ordertotal += orderC;
        message += parseFloat(document.getElementById("CapricciosaQuantity").value) + " Capricciosa  $" + orderC + "<br>";
    }

    if (document.querySelector('input[name="Schnitzel"]:checked') && parseFloat(document.getElementById("SchnitzelQuantity").value) > 0) {
        var orderD = 0;
        orderD = parseFloat(document.getElementById("SchnitzelQuantity").value) * parseFloat(document.querySelector('input[name="Schnitzel"]:checked').value);
        ordertotal += orderD;
        message += parseFloat(document.getElementById("SchnitzelQuantity").value) + " Schnitzel  $" + orderD + "<br>";
    }

    if (document.querySelector('input[name="MixedGrill"]:checked') && parseFloat(document.getElementById("MixedGrillQuantity").value) > 0) {
        var orderE = 0;
        orderE = parseFloat(document.getElementById("MixedGrillQuantity").value) * parseFloat(document.querySelector('input[name="MixedGrill"]:checked').value);
        ordertotal += orderE;
        message += parseFloat(document.getElementById("MixedGrillQuantity").value) + " Mixed Grill  $" + orderE + "<br>";
    }

    if (document.querySelector('input[name="Beef"]:checked') && parseFloat(document.getElementById("BeefQuantity").value) > 0) {
        var orderF = 0;
        orderF = parseFloat(document.getElementById("BeefQuantity").value) * parseFloat(document.querySelector('input[name="Beef"]:checked').value);
        ordertotal += orderF;
        message += parseFloat(document.getElementById("BeefQuantity").value) + " Big Beef on a Bun  $" + orderF + "<br>";
    }

    if (document.querySelector('input[name="Coffee"]:checked') && parseFloat(document.getElementById("CoffeeQuantity").value) > 0) {
        var orderG = 0;
        orderG = parseFloat(document.getElementById("CoffeeQuantity").value) * parseFloat(document.querySelector('input[name="Coffee"]:checked').value);
        ordertotal += orderG;
        message += parseFloat(document.getElementById("CoffeeQuantity").value) + " Coffee  $" + orderG + "<br>";
    }

    if (document.querySelector('input[name="Latte"]:checked') && parseFloat(document.getElementById("LatteQuantity").value) > 0) {
        var orderH = 0;
        orderH = parseFloat(document.getElementById("LatteQuantity").value) * parseFloat(document.querySelector('input[name="Latte"]:checked').value);
        ordertotal += orderH;
        message += parseFloat(document.getElementById("LatteQuantity").value) + " Latte  $" + orderH + "<br>";
    }

    if (document.querySelector('input[name="SoftDrink"]:checked') && parseFloat(document.getElementById("SoftDrinkQuantity").value) > 0) {
        var orderI = 0;
        orderI = parseFloat(document.getElementById("SoftDrinkQuantity").value) * parseFloat(document.querySelector('input[name="SoftDrink"]:checked').value);
        ordertotal += orderI;
        message += parseFloat(document.getElementById("SoftDrinkQuantity").value) + " Soft Drink  $" + orderI + "<br>";
    }

    message += "<br>" + "Total Cost:     $" + ordertotal;
    document.getElementById("result").innerHTML = message;
}