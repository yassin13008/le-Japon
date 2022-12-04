const slides = [...document.querySelectorAll(".slide")];

const sliderData = {
    locked : false,
    direction : 0,
    slidesOutIndex : 0,
    slidesInIndex : 0,
};

const directionButtons = [...document.querySelectorAll(".direction-btn")];

directionButtons.forEach(btn => btn.addEventListener('click', handleClick));

//  création de la fonction handleClick

function handleClick(e) {
    if (sliderData.locked) return;
    sliderData.locked=true;
getDirection(e.target);
slideOut();
}

// Création de la fonction getDirection

function getDirection(btn){
    //  Opération Ternaire = Comme if et else mais inclut 3 valeur, regarde la syntaxe du includes
sliderData.direction = btn.className.includes('right') ? 1 : -1;

sliderData.slidesOutIndex = slides.findIndex(slide => slide.classList.contains("active"));

if (sliderData.slidesOutIndex + sliderData.direction > slides.length - 1)  {
    sliderData.slidesInIndex = 0;
}
else if (sliderData.slidesOutIndex + sliderData.direction < 0){
    sliderData.slidesInIndex = slides.length - 1;
}
else {
    sliderData.slidesInIndex = sliderData.slidesOutIndex + sliderData.direction;
}
}

function slideOut() {
    slideAnimation({
        el: slides[sliderData.slidesInIndex],
        props: {
            display: "flex",
            transform: `translateX(${sliderData.direction < 0 ? "100%" : "-100%" }`,
            opacity: 0
        }

    })
    slideAnimation({
        el: slides[sliderData.slidesOutIndex],
        props: {
            transition: "transform 0.4s cubic-bezier(0.74, -0.34, 1, 1.19), opacity 0.4s ease-out",
            transform: `translateX(${sliderData.direction < 0 ? "-100%" : "100%"})`,
            opacity: 0,
        }
    })
    slides[sliderData.slidesOutIndex].addEventListener("transitionend",slideIn)
}

function slideAnimation(animationObject) {
    for (const prop in animationObject.props) {
        animationObject.el.style[prop] = animationObject.props[prop]
    }
}

function slideIn(e) {
    slideAnimation({
        el: slides[sliderData.slidesInIndex],
        props: {
            transition: "transform 0.4s ease out, opacity 0.6s ease out",
            transform: "translateX(0%)",
            opacity : 1,
        }
    })
    slides[sliderData.slidesInIndex].classList.add("active");


    slides[sliderData.slidesOutIndex].classList.remove("active");
    e.target.removeEventListener("transitionend",slideIn)
    slides[sliderData.slidesOutIndex].style.display ="none"

    setTimeout(() => {
        sliderData.locked = false,
        400
    })
}