var imageIndex = 0;

function imageSlideShow() {
    var i;
    var slides = document.getElementsByClassName("slides");

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    imageIndex++;
    if (imageIndex > slides.length) { imageIndex = 1 }

    slides[imageIndex - 1].style.display = "block";

    setTimeout(imageSlideShow, 3000);
}