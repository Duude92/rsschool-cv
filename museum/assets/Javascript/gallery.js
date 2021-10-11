let checkGallery = ev => {
    console.log(galleryImages[0].getBoundingClientRect().top, window.innerHeight, window.scrollY)

    galleryImages.forEach(img => {
        let elem = img.getBoundingClientRect()
        if (elem.top < window.innerHeight) {
            img.animate({ opacity: 1, marginTop: 0 }, 500).onfinish = _ => {
                console.log(1);
                img.className = ''
            }
        }
    })

    console.log(galleryContainer)
}
window.addEventListener('scroll', debounce(checkGallery))

function debounce(func, wait = 20, immediate = false) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;

        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
};