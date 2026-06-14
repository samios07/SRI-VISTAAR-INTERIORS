// ==========================================
// VISTAAR INTERIORS - MASTER JAVASCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. INJECT PREMIUM 3-SIDED SCROLL FRAME
    const topBar = document.createElement('div');
    const leftBar = document.createElement('div');
    const rightBar = document.createElement('div');

    const frameStyle = "position: fixed; background-color: #a67c00; z-index: 9999; transition: all 0.1s ease-out; pointer-events: none;";
    topBar.style.cssText = frameStyle + "top: 0; left: 0; height: 3px; width: 0%;";
    leftBar.style.cssText = frameStyle + "top: 0; left: 0; width: 3px; height: 0%;";
    rightBar.style.cssText = frameStyle + "top: 0; right: 0; width: 3px; height: 0%;";

    document.body.append(topBar, leftBar, rightBar);

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = (document.documentElement.scrollHeight || document.body.scrollHeight) - document.documentElement.clientHeight;
        
        let scrollPercentage = 0;
        if (scrollHeight > 0) {
            scrollPercentage = (scrollTop / scrollHeight) * 100;
        }
        if (scrollPercentage > 100) scrollPercentage = 100;
        
        // Push the gold frame around the edges
        topBar.style.width = scrollPercentage + '%';
        leftBar.style.height = scrollPercentage + '%';
        rightBar.style.height = scrollPercentage + '%';
    });

    // 2. BI-DIRECTIONAL LUXURY REVEAL ENGINE
    const observerOptions = { 
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px" 
    };

    const appearOnScroll = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            } else {
                entry.target.classList.remove('appear'); 
            }
        });
    }, observerOptions);

    // 3. AUTO-ANIMATE ALL CONTENT (Without touching your HTML!)
    // This looks for your text and your images and applies the fade-in effect safely
    const elementsToAnimate = document.querySelectorAll('.hero-content, #catalogue h2, .catalogue h2, .gallery-item');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in'); 
        appearOnScroll.observe(el); 
    });

});
