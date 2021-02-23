window.onload = function() {
    var image1 = document.getElementById("Roadway");
    var header1 = document.getElementById("Roadway1");
    image1.addEventListener('click', function() {
        if (header1.style.display === "none") {
            header1.style.display = "block";
        } else {
            header1.style.display = "none";
        }
    });

    var image2 = document.getElementById("Hill");
    var header2 = document.getElementById("Hill1");
    image2.addEventListener('click', function() {
        if (header2.style.display === "none") {
            header2.style.display = "block";
        } else {
            header2.style.display = "none";
        }
    });

    var image3 = document.getElementById("Deer");
    var header3 = document.getElementById("Deer1");
    image3.addEventListener('click', function() {
        if (header3.style.display === "none") {
            header3.style.display = "block";
        } else {
            header3.style.display = "none";
        }
    });

    var image4 = document.getElementById("Waterfall");
    var header4 = document.getElementById("Waterfall1");
    image4.addEventListener('click', function() {
        if (header4.style.display === "none") {
            header4.style.display = "block";
        } else {
            header4.style.display = "none";
        }
    });

    var image5 = document.getElementById("Kananaskis Lake");
    var header5 = document.getElementById("Kananaskis Lake1");
    image5.addEventListener('click', function() {
        if (header5.style.display === "none") {
            header5.style.display = "block";
        } else {
            header5.style.display = "none";
        }
    });

    var image6 = document.getElementById("Lake Louise");
    var header6 = document.getElementById("Lake Louise1");
    image6.addEventListener('click', function() {
        if (header6.style.display === "none") {
            header6.style.display = "block";
        } else {
            header6.style.display = "none";
        }
    });

}