// ==========================================
// VISTAAR INTERIORS - MASTER JAVASCRIPT
// ==========================================

// 1. INJECT PREMIUM SCROLL PROGRESS BAR
const scrollBar = document.createElement('div');
scrollBar.className = 'scroll-progress';
document.body.prepend(scrollBar);

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    scrollBar.style.width = scrollPercentage + '%';
});

// 2. BI-DIRECTIONAL LUXURY REVEAL ENGINE (Up & Down)
const observerOptions = { 
    threshold: 0.1, 
    rootMargin: "0px 0px -50px 0px" 
};

const appearOnScroll = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
        } else {
            // This removes the class when the item leaves the screen
            // causing it to smoothly animate again when scrolling back up!
            entry.target.classList.remove('appear');
        }
    });
}, observerOptions);

// 3. CONNECT TO ADMIN DASHBOARD (Netlify CMS)
fetch('/content.json')
    .then(response => response.json())
    .then(data => {
        if(data.heroTitle) document.querySelector('.hero-content h1').innerText = data.heroTitle;
        if(data.heroSubtitle) document.querySelector('.hero-content p').innerText = data.heroSubtitle;
        if(data.email && data.phone) document.querySelector('footer p').innerText = `Email: ${data.email} | Phone: ${data.phone}`;

        const gallery = document.querySelector('.gallery');
        if(data.catalogues && gallery) {
            gallery.innerHTML = ''; 
            data.catalogues.forEach(cat => {
                if(cat.photos) {
                    cat.photos.forEach(photo => {
                        const item = document.createElement('div');
                        item.className = 'gallery-item fade-in';
                        item.innerHTML = `
                            <img src="${photo}" alt="${cat.category}">
                            <div class="overlay"><h3>${cat.category}</h3></div>
                        `;
                        gallery.appendChild(item);
                        appearOnScroll.observe(item); // Attach engine to images
                    });
                }
            });
        }
    })
    .catch(err => console.log("Waiting for new dashboard data..."));

// 4. AUTO-ANIMATE STATIC ELEMENTS
document.addEventListener("DOMContentLoaded", () => {
    const staticElements = document.querySelectorAll('.hero-content, #catalogue h2');
    staticElements.forEach(el => {
        el.classList.add('fade-in');
        appearOnScroll.observe(el); // Attach engine to text
    });
});
