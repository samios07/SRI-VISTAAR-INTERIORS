// ==========================================
// VISTAAR INTERIORS - MASTER JAVASCRIPT (DATA RESTORED)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. INJECT 3-SIDED GOLD SCROLL FRAME 
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
        
        topBar.style.width = scrollPercentage + '%';
        leftBar.style.height = scrollPercentage + '%';
        rightBar.style.height = scrollPercentage + '%';
    });

    // 2. THE REVEAL ENGINE (Safe Version)
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const appearOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            } else {
                entry.target.classList.remove('appear'); // Allows re-animating on scroll up!
            }
        });
    }, observerOptions);

    // 3. RESTORE DASHBOARD DATA & ANIMATE
    fetch('/content.json')
        .then(response => {
            if (!response.ok) throw new Error("Dashboard data not found");
            return response.json();
        })
        .then(data => {
            // Restore Custom Text
            const h1 = document.querySelector('.hero-content h1');
            const p = document.querySelector('.hero-content p');
            const footer = document.querySelector('footer p');
            
            if(data.heroTitle && h1) h1.innerText = data.heroTitle;
            if(data.heroSubtitle && p) p.innerText = data.heroSubtitle;
            if(data.email && data.phone && footer) footer.innerText = `Email: ${data.email} | Phone: ${data.phone}`;

            // Restore Custom Gallery
            const gallery = document.querySelector('.gallery');
            if(data.catalogues && gallery) {
                gallery.innerHTML = ''; // Clears out the default placeholders
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
                            
                            // Tell the animation engine to watch these newly loaded images
                            setTimeout(() => appearOnScroll.observe(item), 50);
                        });
                    }
                });
            }
            
            // Watch static text elements to fade them in too
            document.querySelectorAll('.hero-content, #catalogue h2').forEach(el => {
                el.classList.add('fade-in');
                appearOnScroll.observe(el);
            });
        })
        .catch(err => console.log("Waiting for new dashboard content..."));
});
