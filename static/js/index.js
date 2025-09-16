document.addEventListener("DOMContentLoaded", function() {
    
    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => { preloader.style.display = 'none'; }, 500);
    });

    // --- Initialize Hero Slider ---
    new Swiper('.hero-slider', {
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
    });

    // --- Product Data ---
    const products = {
        locs: [ { name: 'Protective Loc Oil', desc: 'A brilliant, lightweight shine.' }, { name: 'Herbal Locking Gel', desc: 'Nourishing hold without flakes.' }, { name: 'Rosewater Hydrating Mist', desc: 'Daily moisture for thirsty locs.' }, { name: 'Invigorating Scalp Serum', desc: 'Promotes growth and soothes.' }, { name: 'Loc Detox Cleanser', desc: 'Deeply cleanses and removes buildup.' }, { name: 'Shine Finishing Spray', desc: 'Adds a final touch of brilliance.' }, { name: 'Aloe Vera Loc Refresher', desc: 'Soothes scalp and refreshes locs.' }, { name: 'Peppermint Growth Oil', desc: 'Stimulates follicles for growth.' }, { name: 'Coconut Water Mist', desc: 'Lightweight hydration boost.' }, { name: 'Black Castor Oil Sealant', desc: 'Seals in moisture effectively.' } ],
        twists: [ { name: 'Nourishing Twist Cream', desc: 'Maximum definition and moisture.' }, { name: 'Hydrating Leave-In', desc: 'The perfect base for any style.' }, { name: 'Defining Shine Mousse', desc: 'Frizz-free and full of body.' }, { name: 'Shea Butter Curl Smoothie', desc: 'Enhances natural curl patterns.' }, { name: 'Flaxseed Defining Gel', desc: 'Strong hold with natural ingredients.' }, { name: 'Avocado Moisture Butter', desc: 'Deeply moisturizes and softens.' }, { name: 'Twist & Hold Pomade', desc: 'For sleek, long-lasting twists.' }, { name: 'Honey & Ginger Styling Foam', desc: 'Lightweight hold and volume.' }, { name: 'Mango & Lime Twisting Cream', desc: 'Exotic moisture and definition.' }, { name: 'Argan Oil Curl Definer', desc: 'Reduces frizz and adds shine.' } ],
        protective: [ { name: 'Protective Braid Sealer', desc: 'Locks in moisture for braids.' }, { name: 'Sleek Edge Control', desc: 'A firm, non-greasy hold.' }, { name: 'Braid & Scalp Soother', desc: 'Relieves itching and dryness.' }, { name: 'Take-Down Detangling Spray', desc: 'Eases the removal of protective styles.' }, { name: 'Anti-Breakage Growth Oil', desc: 'Strengthens hair under tension.' }, { name: 'Bamboo & Tea Tree Scalp Tonic', desc: 'Keeps scalp clean and fresh.' }, { name: 'Protective Style Refresher', desc: 'Neutralizes odors and adds moisture.' }, { name: 'Jamaican Black Castor Oil', desc: 'Promotes thick, healthy edges.' }, { name: 'Braid Conditioning Spray', desc: 'Keeps braids looking fresh.' }, { name: 'Moringa & Avocado Oil', desc: 'Nourishes hair and scalp deeply.' } ]
    };

    // --- Product Slider & Modal Logic ---
    function generateProductCards(category) { return products[category].map(p => `<div class="swiper-slide"><div class="product-card" data-title="${p.name}" data-desc="${p.desc}" data-img="static/images/imagetest.jpg"><img src="static/images/imagetest.jpg" alt="${p.name}"><h3>${p.name}</h3><p>${p.desc}</p></div></div>`).join(''); }
    function initializeSwiper(selector) { return new Swiper(selector, { slidesPerView: 'auto', spaceBetween: 20, freeMode: true, grabCursor: true }); }
    document.querySelector('#slider-locs .swiper-wrapper').innerHTML = generateProductCards('locs');
    document.querySelector('#slider-twists .swiper-wrapper').innerHTML = generateProductCards('twists');
    document.querySelector('#slider-protective .swiper-wrapper').innerHTML = generateProductCards('protective');
    let activeSwiper = initializeSwiper('#slider-locs');
    
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (activeSwiper) activeSwiper.destroy(true, true);
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filter;
            document.querySelectorAll('.product-slider').forEach(s => s.classList.remove('active'));
            const activeSlider = document.getElementById(`slider-${filter}`);
            activeSlider.classList.add('active');
            activeSwiper = initializeSwiper(activeSlider);
        });
    });

    // --- Modal Controls (Product & Review) ---
    const productModal = document.getElementById('product-modal');
    const reviewModal = document.getElementById('review-modal');
    
    function openModal(modal) { modal.style.display = 'block'; }
    function closeModal(modal) { modal.style.display = 'none'; }

    // Event Delegation for opening Product Modal
    document.addEventListener('click', function(e) {
        if (e.target.closest('.product-card')) {
            const card = e.target.closest('.product-card');
            productModal.querySelector('#modal-title').textContent = card.dataset.title;
            productModal.querySelector('#modal-description').textContent = card.dataset.desc;
            productModal.querySelector('#modal-img').src = card.dataset.img;
            openModal(productModal);
        }
    });

    // Open Review Modal
    document.getElementById('leave-review-btn').addEventListener('click', () => openModal(reviewModal));
    document.getElementById('modal-review-btn').addEventListener('click', () => {
        closeModal(productModal);
        openModal(reviewModal);
    });

    // Close Modals
    document.querySelectorAll('.modal .close-button').forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(productModal);
            closeModal(reviewModal);
        });
    });
    window.addEventListener('click', (e) => {
        if (e.target === productModal) closeModal(productModal);
        if (e.target === reviewModal) closeModal(reviewModal);
    });

    // --- Star Rating Logic ---
    const stars = document.querySelectorAll('.star-rating i');
    const ratingInput = document.getElementById('rating-value');
    let currentRating = 0;

    stars.forEach(star => {
        star.addEventListener('mouseover', () => {
            resetStars();
            const rating = star.dataset.value;
            for (let i = 0; i < rating; i++) {
                stars[i].classList.add('hover');
            }
        });
        star.addEventListener('mouseout', resetStars);
        star.addEventListener('click', () => {
            currentRating = star.dataset.value;
            ratingInput.value = currentRating;
            resetStars();
            for (let i = 0; i < currentRating; i++) {
                stars[i].classList.add('selected');
            }
        });
    });

    function resetStars() {
        stars.forEach(star => {
            star.classList.remove('hover');
            star.classList.remove('selected');
        });
        // Re-apply selection based on clicked rating
        for (let i = 0; i < currentRating; i++) {
            stars[i].classList.add('selected');
        }
    }

    // --- Review Form Submission ---
    document.getElementById('review-form').addEventListener('submit', function(e) {
        e.preventDefault();
        if (ratingInput.value === "0") {
            alert('Please select a star rating.');
            return;
        }
        alert('Thank you for your review!');
        closeModal(reviewModal);
        this.reset();
        currentRating = 0;
        resetStars();
    });

    // --- General Page Logic ---
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) navbar.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
        else navbar.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    });

    const testimonialSlides = document.querySelectorAll(".testimonial-slide");
    let currentTestimonial = 0;
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
        testimonialSlides.forEach((slide, i) => slide.classList.toggle("active", i === currentTestimonial));
    }, 5000);

    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    window.addEventListener("scroll", () => {
        scrollToTopBtn.style.display = (window.scrollY > 100) ? "block" : "none";
    });
    scrollToTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});