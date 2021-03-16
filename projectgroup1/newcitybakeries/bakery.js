var defaultpriceSheet = 18;
var defaultpriceRound = 15;
var htmlFragment = "";

function showWidth() {
    document.getElementById('sheetvalue').style.display = 'block';
    document.getElementById('roundvalue').style.display = 'none';
    document.getElementById("p01").style.display = 'block';
    document.getElementById("p02").style.display = 'none';
}

function showRadius() {
    document.getElementById('roundvalue').style.display = 'block';
    document.getElementById('sheetvalue').style.display = 'none';
    document.getElementById("p02").style.display = 'block';
    document.getElementById("p01").style.display = 'none';

}

function showLayer() {
    document.getElementById('activateonradio').style.display = 'block';

    var message = document.getElementById("p01");
    var message2 = document.getElementById("p02");
    message.innerHTML = "";
    message2.innerHTML = "";
    if (RetrieveRadioButtonValue('caketype') == "Sheet") {


        try {
            if (RetrieveInputValue('lengthcake') && (RetrieveInputValue('lengthcake') > 60 || RetrieveInputValue('lengthcake') < 30)) {
                throw " 30 and 60 cm";
            }
        } catch (err) {
            message.innerHTML = "Choose a length between" + err;
        }

        try {
            if (RetrieveInputValue('widthcake') && (RetrieveInputValue('widthcake') > 45 || RetrieveInputValue('widthcake') < 30)) {
                throw " 30 and 45 cm";
            }
        } catch (err) {
            message.innerHTML = "Choose a width between" + err;
        }
    }

    if (RetrieveRadioButtonValue('caketype') == "Round") {

        try {
            if (RetrieveInputValue('radiuscake') > 30 || RetrieveInputValue('radiuscake') < 15) {
                throw " 15 and 30 cm";
            }
        } catch (err) {
            message2.innerHTML = "Choose a radius between" + err;
        }
    }


    document.getElementById('orderdetails').style.display = 'block';

    orderOutput();
}


function orderOutput() {
    htmlFragment = `
    <span class="leftfloat">${RetrieveInputValue('fname')} ${RetrieveInputValue('lname')}</span><br>
    <span class="leftfloat">${RetrieveInputValue('address')}</span><br>
    <span class="leftfloat">${RetrieveInputValue('postalcode')}</span><br>
    <span class="leftfloat">${RetrieveInputValue('phone')}</span><br>
    <span class="leftfloat">${RetrieveInputValue('email1')}</span><br>
    <span class="rightfloat">-----</span><br>
        `;

    if (RetrieveRadioButtonValue('caketype') == "Sheet") {
        calcSheetPrice();
    }

    if (RetrieveRadioButtonValue('caketype') == "Round") {
        calcRoundPrice();
    }

}


function calcSheetPrice() {

    if (RetrieveInputValue('lengthcake') != 0 && RetrieveInputValue('widthcake') != 0) {
        document.getElementById('button').style.display = 'block';
        var areaSheet = (RetrieveInputValue('lengthcake') * RetrieveInputValue('widthcake')) - (30 * 30);
        var priceArea = areaSheet * 0.02;
    }

    var priceSheet = defaultpriceSheet + priceArea;

    var orderdetails = `
    <span class="leftfloat"> Base Cake (30x30cm) </span> <span class="rightfloat"> ... $18.00</span><br>
    <span class="leftfloat"> Oversized Price </span> <span class="rightfloat"> ........ $${priceArea.toFixed(2)}</span><br>
    <span class="rightfloat">-----</span><br>
    <span class="leftfloat"> First Layer </span> <span class="rightfloat"> ........... $${priceSheet.toFixed(2)}</span><br>
    `;

    var layers = RetrieveCheckBoxValues('AddLayer');
    var idx;

    for (idx = 0; idx < layers.length; idx++) {
        orderdetails += `
        <span class="leftfloat"> + Additional Layer #${idx+1} </span> <span class="rightfloat"> ..... $${(priceSheet * 0.5).toFixed(2)}</span><br>
        `;
    }

    if (idx != 0) {
        priceSheet += (priceSheet * 0.5 * (idx));
    }

    var choices = RetrieveCheckBoxValues('AddChoice');

    if (choices.length > 0) {
        orderdetails += `
        -----<br>
        <span class="leftfloat" STYLE="font-weight:bold">Toppings: </span><br>
        `;
    }

    for (let x = 0; x < choices.length; x++) {

        if (choices[x] == 5) {
            orderdetails += `
            <span class="leftfloat"> Cream Cheese Icing </span> <span class="rightfloat"> ......  $5.00</span><br>
            `;
            priceSheet += 5;
        }

        if (choices[x] == 7) {
            orderdetails += `
            <span class="leftfloat"> Fruit & Almonds Topping </span> <span class="rightfloat"> $7.00</span><br>
            `;
            priceSheet += 7;
        }

        if (choices[x] == 4) {
            orderdetails += `
            <span class="leftfloat"> Fruit Jam Bet. Layers </span> <span class="rightfloat"> ......  $4.00</span><br>
            `;
            priceSheet += 4;
        }
    }

    orderdetails += `
    ------------------------<br>
            <span class="leftfloat" STYLE="font-weight:bold"> Total: </span> <span class="rightfloat"> ........ $${priceSheet.toFixed(2)}</span>
            `;

    htmlFragment += orderdetails;
    var outputElement = document.getElementById('ItemsEntered');
    if (outputElement && outputElement.innerHTML !== undefined) {
        outputElement.innerHTML = htmlFragment;
    }

}


function calcRoundPrice() {
    document.getElementById('button').style.display = 'block';
    if (RetrieveInputValue('radiuscake') != 0) {
        var areaRound = (3.14 * RetrieveInputValue('radiuscake') * RetrieveInputValue('radiuscake')) - (3.14 * 15 * 15);

        var priceAreaR = areaRound * 0.02;
    }

    var priceRound = defaultpriceRound + priceAreaR;

    var orderdetails = `
    <span class="leftfloat"> Base Cake (15 cm) </span> <span class="rightfloat"> ..... $15.00</span><br>
    <span class="leftfloat"> Oversized Price </span> <span class="rightfloat"> ..... $${priceAreaR.toFixed(2)}</span><br>
    <span class="rightfloat">-----</span><br>
    <span class="leftfloat"> First Layer </span> <span class="rightfloat"> ..... $${priceRound.toFixed(2)}</span><br>
    `;

    var layers = RetrieveCheckBoxValues('AddLayer');
    var idx;

    for (idx = 0; idx < layers.length; idx++) {
        orderdetails += `
        <span class="leftfloat"> + Additional Layer #${idx+1} </span> <span class="rightfloat"> ..... $${(priceRound * 0.5).toFixed(2)}</span><br>
        `;
    }

    if (idx != 0) {
        priceRound += (priceRound * 0.5 * (idx));
    }

    var choices = RetrieveCheckBoxValues('AddChoice');

    if (choices.length > 0) {
        orderdetails += `
        -----<br>
        <span class="leftfloat" STYLE="font-weight:bold">Toppings: </span><br>
        `;
    }

    for (let x = 0; x < choices.length; x++) {

        if (choices[x] == 5) {
            orderdetails += `
            <span class="leftfloat"> Cream Cheese Icing </span> <span class="rightfloat"> ..... $5.00</span><br>
            `;
            priceRound += 5;
        }

        if (choices[x] == 7) {
            orderdetails += `
            <span class="leftfloat"> Fruit & Almonds Topping </span> <span class="rightfloat"> $7.00</span><br>
            `;
            priceRound += 7;
        }

        if (choices[x] == 4) {
            orderdetails += `
            <span class="leftfloat"> Fruit Jam Bet. Layers </span> <span class="rightfloat"> ..... $4.00</span><br>
            `;
            priceRound += 4;
        }
    }

    orderdetails += `
            ------------------------<br>
            <span class="leftfloat" STYLE="font-weight:bold"> Total: </span> <span class="rightfloat"> ..... $${priceRound.toFixed(2)}</span>
            `;

    htmlFragment += orderdetails;
    var outputElement = document.getElementById('ItemsEntered');
    if (outputElement && outputElement.innerHTML !== undefined) {
        outputElement.innerHTML = htmlFragment;
    }

}