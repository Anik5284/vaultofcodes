document.addEventListener('DOMContentLoaded', () => {

    // --- FILTERING LOGIC ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Set active class on button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;

            // Show/hide portfolio items based on filter
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

    // --- LIGHTBOX LOGIC ---
    const lightbox = document.getElementById('lightbox');
    const lightboxVideo = document.getElementById('lightbox-video');
    const closeBtn = document.querySelector('.close-btn');

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const videoSrc = item.getAttribute('data-video-src');
            // Add autoplay parameter for immediate playback
            lightboxVideo.src = videoSrc + "?autoplay=1"; 
            lightbox.style.display = 'flex';
        });
    });

    // Function to close the lightbox
    const closeLightbox = () => {
        lightbox.style.display = 'none';
        // Important: Stop the video from playing in the background
        lightboxVideo.src = ""; 
    };

    // Close lightbox when clicking the close button
    closeBtn.addEventListener('click', closeLightbox);
    
    // Close lightbox when clicking outside the video content
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

});