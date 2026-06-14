// ==========================================
// VISTAAR INTERIORS - GOLD FRAME ONLY
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. CREATE THE GOLD BARS
    const topBar = document.createElement('div');
    const leftBar = document.createElement('div');
    const rightBar = document.createElement('div');

    // These styles are safely injected here and do not affect your content
    const frameStyle = "position: fixed; background-color: #a67c00; z-index: 9999; transition: all 0.1s ease-out; pointer-events: none;";
    
    topBar.style.cssText = frameStyle + "top: 0; left: 0; height: 3px; width: 0%;";
    leftBar.style.cssText = frameStyle + "top: 0; left: 0; width: 3px; height: 0%;";
    rightBar.style.cssText = frameStyle + "top: 0; right: 0; width: 3px; height: 0%;";

    document.body.append(topBar, leftBar, rightBar);

    // 2. ANIMATE BARS ON SCROLL
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        let scrollPercentage = 0;
        if (scrollHeight > 0) {
            scrollPercentage = (scrollTop / scrollHeight) * 100;
        }
        
        // This keeps the frame movement smooth
        topBar.style.width = scrollPercentage + '%';
        leftBar.style.height = scrollPercentage + '%';
        rightBar.style.height = scrollPercentage + '%';
    });
});
