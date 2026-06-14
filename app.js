// 1. Setup Smooth Scroll Engine
const appearOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

// 2. Connect to Dashboard Data
fetch('/content.json')
    .then(response => response.json())
    .then(data => {
        // Automatically update text
        if(data.heroTitle) document.querySelector('.hero-content h1').innerText = data.heroTitle;
        if(data.heroSubtitle) document.querySelector('.hero-content p').innerText = data.heroSubtitle;
        if(data.email && data.phone) document.querySelector('footer p').innerText = `Email: ${data.email} | Phone: ${data.phone}`;

        // Automatically build image galleries
        const gallery = document.querySelector('.gallery');
        if(data.catalogues && gallery) {
            gallery.innerHTML = ''; // Clear dummy images
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
                        appearOnScroll.observe(item); // Add the smooth animation to new photos
                    });
                }
            });
        }
    })
    .catch(err => console.log("Waiting for new dashboard data..."));

// Watch static elements
document.querySelectorAll('.fade-in').forEach(fader => appearOnScroll.observe(fader));
