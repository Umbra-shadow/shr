document.addEventListener("DOMContentLoaded", function() {

    /**
     * --- Preloader ---
     * Fades out the preloader once the window is fully loaded.
     */
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500); // Match this duration with the CSS transition
        }
    });

    /**
     * --- Hero Section Slider ---
     * Initializes the main carousel at the top of the page.
     */
    new Swiper('.hero-slider', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
    });

    /**
     * --- Product Data ---
     * A centralized object holding all product information.
     * This makes it easy to add, remove, or edit products without touching the HTML.
     */
    const products = {
        locs: [{ name: 'Protective Loc Oil', desc: 'A brilliant, lightweight shine for lasting protection.' }, { name: 'Herbal Locking Gel', desc: 'Nourishing hold without flakes or residue.' }, { name: 'Rosewater Hydrating Mist', desc: 'Daily moisture for thirsty locs, keeping them soft.' }, { name: 'Invigorating Scalp Serum', desc: 'Promotes healthy growth and soothes the scalp.' }, { name: 'Loc Detox Cleanser', desc: 'Deeply cleanses and effectively removes buildup.' }, { name: 'Shine Finishing Spray', desc: 'Adds a final touch of brilliance and glamour.' }, { name: 'Aloe Vera Loc Refresher', desc: 'Soothes the scalp and instantly refreshes your locs.' }, { name: 'Peppermint Growth Oil', desc: 'Stimulates follicles to encourage robust growth.' }, { name: 'Coconut Water Mist', desc: 'A lightweight hydration boost for daily freshness.' }, { name: 'Black Castor Oil Sealant', desc: 'Seals in essential moisture for hair health.' } ],
        twists: [{ name: 'Nourishing Twist Cream', desc: 'Maximum definition and moisture for perfect twists.' }, { name: 'Hydrating Leave-In', desc: 'The perfect, nourishing base for any hairstyle.' }, { name: 'Defining Shine Mousse', desc: 'Provides a frizz-free finish and is full of body.' }, { name: 'Shea Butter Curl Smoothie', desc: 'Enhances and defines your natural curl patterns.' }, { name: 'Flaxseed Defining Gel', desc: 'A strong hold derived from natural ingredients.' }, { name: 'Avocado Moisture Butter', desc: 'Deeply moisturizes, leaving hair incredibly soft.' }, { name: 'Twist & Hold Pomade', desc: 'For creating sleek, elegant, and long-lasting twists.' }, { name: 'Honey & Ginger Styling Foam', desc: 'Lightweight hold that provides impressive volume.' }, { name: 'Mango & Lime Twisting Cream', desc: 'Exotic moisture and superior definition for your hair.' }, { name: 'Argan Oil Curl Definer', desc: 'Effectively reduces frizz while adding a beautiful shine.' } ],
        protective: [{ name: 'Protective Braid Sealer', desc: 'Locks in essential moisture for long-lasting braids.' }, { name: 'Sleek Edge Control', desc: 'A firm, non-greasy hold for perfectly styled edges.' }, { name: 'Braid & Scalp Soother', desc: 'Instantly relieves itching and dryness for scalp comfort.' }, { name: 'Take-Down Detangling Spray', desc: 'Eases the removal process of protective styles.' }, { name: 'Anti-Breakage Growth Oil', desc: 'Strengthens hair when it is under tension.' }, { name: 'Bamboo & Tea Tree Scalp Tonic', desc: 'Keeps the scalp feeling clean and refreshingly fresh.' }, { name: 'Protective Style Refresher', desc: 'Neutralizes odors and adds a touch of moisture.' }, { name: 'Jamaican Black Castor Oil', desc: 'Promotes thick, healthy edges and hair growth.' }, { name: 'Braid Conditioning Spray', desc: 'Keeps your braids looking fresh and well-maintained.' }, { name: 'Moringa & Avocado Oil', desc: 'Nourishes both the hair and scalp deeply.' } ]
    };

    /**
     * --- Product Sliders & Filtering ---
     * This section handles the dynamic creation and management of the product carousels.
     */
    function generateProductCards(category) {
        return products[category].map(p => `
            <div class="swiper-slide">
                <div class="product-card" data-title="${p.name}" data-desc="${p.desc}" data-img="static/images/imagetest.jpg">
                    <img src="static/images/imagetest.jpg" alt="${p.name}">
                    <h3>${p.name}</h3>
                    <p>${p.desc}</p>
                </div>
            </div>`).join('');
    }

    function initializeSwiper(selector) {
        return new Swiper(selector, {
            slidesPerView: 'auto',
            spaceBetween: 20,
            freeMode: true,
            grabCursor: true,
        });
    }

    // Populate all sliders initially
    document.querySelector('#slider-locs .swiper-wrapper').innerHTML = generateProductCards('locs');
    document.querySelector('#slider-twists .swiper-wrapper').innerHTML = generateProductCards('twists');
    document.querySelector('#slider-protective .swiper-wrapper').innerHTML = generateProductCards('protective');
    let activeSwiper = initializeSwiper('#slider-locs'); // Initialize the default slider

    // Filtering Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (activeSwiper) activeSwiper.destroy(true, true); // Destroy old swiper instance

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;
            document.querySelectorAll('.product-slider').forEach(s => s.classList.remove('active'));
            const activeSlider = document.getElementById(`slider-${filter}`);
            activeSlider.classList.add('active');

            activeSwiper = initializeSwiper(activeSlider); // Initialize the new active swiper
        });
    });

    /**
     * --- Modal Functionality (Product & Review) ---
     * Manages the opening, closing, and content of all pop-up modals.
     */
    const productModal = document.getElementById('product-modal');
    const reviewModal = document.getElementById('review-modal');
    
    function openModal(modal) {
        if(modal) modal.classList.add('active');
    }

    function closeModal(modal) {
        if(modal) modal.classList.remove('active');
    }

    // Event Delegation to open Product Modal
    document.addEventListener('click', function(e) {
        const card = e.target.closest('.product-card');
        if (card) {
            productModal.querySelector('#modal-title').textContent = card.dataset.title;
            productModal.querySelector('#modal-description').textContent = card.dataset.desc;
            productModal.querySelector('#modal-img').src = card.dataset.img;
            openModal(productModal);
        }
    });

    // Event listeners to open the Review Modal
    document.getElementById('leave-review-btn').addEventListener('click', () => openModal(reviewModal));
    document.getElementById('modal-review-btn').addEventListener('click', () => {
        closeModal(productModal);
        openModal(reviewModal);
    });

    // Event listeners to close any active modal
    document.querySelectorAll('.modal .close-button').forEach(btn => {
        btn.addEventListener('click', () => closeModal(btn.closest('.modal')));
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) { // Only close if the overlay is clicked, not the content inside
                closeModal(modal);
            }
        });
    });

    // "Inquire About Product" button functionality
    document.getElementById('modal-contact-btn').addEventListener('click', () => {
        const productName = productModal.querySelector('#modal-title').textContent;
        const messageTextarea = document.getElementById('message');
        
        messageTextarea.value = `I'm interested in learning more about: ${productName}.`;
        closeModal(productModal);
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        messageTextarea.focus(); // Set focus to the textarea for immediate typing
    });

    /**
     * --- Interactive Star Rating for Review Modal ---
     */
    const stars = document.querySelectorAll('.star-rating i');
    const ratingInput = document.getElementById('rating-value');
    let currentRating = 0;

    function resetStars() {
        stars.forEach(star => {
            star.classList.remove('hover', 'selected');
        });
        // Re-apply selection based on the clicked rating
        for (let i = 0; i < currentRating; i++) {
            stars[i].classList.add('selected');
        }
    }

    stars.forEach(star => {
        star.addEventListener('mouseover', () => {
            resetStars();
            for (let i = 0; i < star.dataset.value; i++) {
                stars[i].classList.add('hover');
            }
        });
        star.addEventListener('mouseout', resetStars);
        star.addEventListener('click', () => {
            currentRating = star.dataset.value;
            ratingInput.value = currentRating;
            resetStars(); // This will apply the 'selected' class
        });
    });

    /**
     * --- Review Form Submission ---
     */
    document.getElementById('review-form').addEventListener('submit', function(e) {
        e.preventDefault();
        if (ratingInput.value === "0") {
            alert('Please select a star rating.');
            return;
        }
        // Here, you would typically send the form data to a server.
        alert('Thank you for your review!');
        closeModal(reviewModal);
        this.reset();
        currentRating = 0; // Reset rating for the next review
        resetStars();
    });

    /**
     * --- General Page Functionality ---
     */
    // Sticky Navbar
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) navbar.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
        else navbar.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    });

    // Automatic Testimonial Carousel
    const testimonialSlides = document.querySelectorAll(".testimonial-slide");
    let currentTestimonial = 0;
    if (testimonialSlides.length > 0) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
            testimonialSlides.forEach((slide, i) => slide.classList.toggle("active", i === currentTestimonial));
        }, 5000);
    }

    // Scroll to Top Button
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    window.addEventListener("scroll", () => {
        scrollToTopBtn.style.display = (window.scrollY > 200) ? "block" : "none";
    });
    scrollToTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});