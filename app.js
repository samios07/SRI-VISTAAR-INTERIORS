// ==========================================
// VISTAAR INTERIORS - MASTER JAVASCRIPT
// ==========================================

// This wrapper guarantees the script WAITS for the HTML to build before running
document.addEventListener('DOMContentLoaded', () => {

    // 1. INJECT PREMIUM 3-SIDED SCROLL FRAME
    const topBar = document.createElement('div');
    const leftBar = document.createElement('div');
    const rightBar = document.createElement('div');

    const frameStyle = "position: fixed; background-color: #a67c00; z-index: 9999; transition: all 0.1s ease-out;";
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

    // 3. AUTO-ANIMATE STATIC ELEMENTS
    const staticElements = document.querySelectorAll('.hero-content, #catalogue h2, .catalogue h2');
    staticElements.forEach(el => {
        el.classList.add('fade-in');
        appearOnScroll.observe(el); 
    });

    // 4. CONNECT TO ADMIN DASHBOARD
    fetch('/content.json')
        .then(response => {
            if (!response.ok) throw new Error("No data yet");
            return response.json();
        })
        .then(data => {
            const h1 = document.querySelector('.hero-content h1');
            const p = document.querySelector('.hero-content p');
            const footer = document.querySelector('footer p');
            
            if(data.heroTitle && h1) h1.innerText = data.heroTitle;
            if(data.heroSubtitle && p) p.innerText = data.heroSubtitle;
            if(data.email && data.phone && footer) footer.innerText = `Email: ${data.email} | Phone: ${data.phone}`;

            const gallery = document.querySelector('.gallery');
            if(data.catalogues && gallery) {
                gallery.innerHTML = ''; 
                data.catalogues.forEach(cat => {
                    if(cat.photos) {
                        cat.photos.forEach(photo => {
                            const item = document.createElement('div');
                            item.className = 'gallery-item fade-in';
                            item.innerHTML = `
                                <img src="${photo}" alt="${cat.category || 'Project'}">
                                <div class="overlay"><h3>${cat.category || 'Curated Project'}</h3></div>
                            `;
                            gallery.appendChild(item);
                            // Attach the animation engine to the new photos
                            setTimeout(() => appearOnScroll.observe(item), 50); 
                        });
                    }
                });
            }
        })
        .catch(err => console.log("Waiting for dashboard data..."));

}); // <-- This closes the safety wrapper!
