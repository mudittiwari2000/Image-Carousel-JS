// alert('test');
/// Selecting the carousel track since that will be our main carousel
const track = document.querySelector('.carousel__track')

/// Selecting all the carousel slides as an array of carousel track's children
const slides = Array.from(track.children)
// console.log(slides)

/// Seleting the next Arrow
const nextButton = document.querySelector('.carousel__button--right');

/// Selecting the previous Arrow
const prevButton = document.querySelector('.carousel__button--left');

/// Selecting the whole carousel indicator navigation
const dotsNav = document.querySelector('.carousel__nav');
/// And selecting it's chilren as an array to story into dots
const dots = Array.from(dotsNav.children);

/// Getting the first slide's width since all the other slides will have the same width
const slideWidth = slides[0].getBoundingClientRect().width;
// console.log(slideWidth)

/// arrange the slides next to one another
const setSlidePosition = (slide, index) => {

    slide.style.left = slideWidth * index + 'px';
    // slides[0].style.left = slideWidth * 0 + 'px';
    // slides[1].style.left = slideWidth * 1 + 'px';
    // slides[2].style.left = slideWidth * 2 + 'px';
} 
slides.forEach(setSlidePosition);

/// Moving to desired slide's sibling or target slide into the main carousel track using transalation
const moveToSlide = (currentSlide, targetSlide) => {

    track.style.transform = `translateX(-${targetSlide.style.left})`;
    // console.log(track.style.transform);
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

/// Updating the dots when changing slides
const updateDots = (currentDot, targetDot) => {

    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

/// Updating i.e., hiding/revealing the next and previous arrows appropriately
const updateArrows = (targetIndex) => {
    
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}

/// Clicking Left, moves the slides to the left
prevButton.addEventListener('click', e => {

    // console.log(e.target);

    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

    moveToSlide (currentSlide, prevSlide);
    updateDots (currentDot, prevDot);
    updateArrows (prevIndex);
})

/// Clicking Right, moves the slides to the right
nextButton.addEventListener('click', e => {

    // console.log(e.target);

    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    moveToSlide (currentSlide, nextSlide);
    updateDots (currentDot, nextDot);
    updateArrows (nextIndex);
})


/// Clicking the nav indicators, moves the slides to the respective slides
dotsNav.addEventListener('click', e => {

    const targetDot = e.target.closest('button');
    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot == targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide (currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    updateArrows (targetIndex);
})

// function fixCar () {
//     const carousel = document.querySelector('.carousel__track-container');
//     console.log(carousel.offsetTop, window.scrollY);
// }

// window.addEventListener ('scroll', fixCar);