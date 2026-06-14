// Grab all elements with the 'fade-in' class
const faders = document.querySelectorAll('.fade-in');

// Set up the Intersection Observer options
const appearOptions = {
    threshold: 0.15, // Triggers when 15% of the element is visible
    rootMargin: "0px 0px -50px 0px" // Triggers slightly before it fully hits the bottom
};

// Create the Observer
const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target); // Stop observing once it has appeared
        }
    });
}, appearOptions);

// Tell the Observer to watch all our faders
faders.forEach(fader => {
    appearOnScroll.observe(fader);
});