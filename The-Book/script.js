document.addEventListener('DOMContentLoaded', function() {
    const loginContainer = document.getElementById('login-container');
    const mainContainer = document.getElementById('main-container');
    const loginForm = document.getElementById('login-form');
    const addRestaurantBtn = document.getElementById('add-restaurant-btn');
    const addRestaurantModal = document.getElementById('add-restaurant-modal');
    const addRestaurantForm = document.getElementById('add-restaurant-form');
    const closeModalBtn = document.getElementById('close-modal');
    const restaurantsList = document.getElementById('restaurants-list');
    const addReviewModal = document.getElementById('add-review-modal');
    const addReviewForm = document.getElementById('add-review-form');
    const closeReviewModalBtn = document.getElementById('close-review-modal');

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        showMainContent();
        loadRestaurants();
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://helya.pylex.xyz:10209/loginbook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password })
            });

            const data = await response.json();
            if (data.success) {
                localStorage.setItem('isLoggedIn', 'true');
                showMainContent();
                loadRestaurants();
            } else {
                alert('Invalid password');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please try again.');
        }
    });

    function showMainContent() {
        loginContainer.classList.add('hidden');
        mainContainer.classList.remove('hidden');
    }

    async function loadRestaurants() {
        try {
            const response = await fetch('http://helya.pylex.xyz:10209/restaurants');
            const restaurants = await response.json();
            displayRestaurants(restaurants);
        } catch (error) {
            console.error('Error loading restaurants:', error);
        }
    }

    async function displayRestaurants(restaurants) {
        restaurantsList.innerHTML = '';
        
        for (const restaurant of restaurants) {
            const reviews = await fetchReviews(restaurant.id);
            const restaurantCard = createRestaurantCard(restaurant, reviews);
            restaurantsList.appendChild(restaurantCard);
        }
    }

    async function fetchReviews(restaurantId) {
        try {
            const response = await fetch(`http://helya.pylex.xyz:10209/reviews?restaurant_id=${restaurantId}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching reviews:', error);
            return [];
        }
    }

    function createRestaurantCard(restaurant, reviews) {
        const card = document.createElement('div');
        card.className = 'restaurant-card';
        
        const reviewsHtml = reviews.map(review => `
            <div class="review">
                <div><strong>${review.product_name}</strong></div>
                <div class="rating">
                    ${createStarRating(review.rating)}
                </div>
                <div>${review.review}</div>
                <div><small>${new Date(review.date).toLocaleDateString()}</small></div>
            </div>
        `).join('');

        card.innerHTML = `
            <div class="restaurant-header">
                <h3>${restaurant.name}</h3>
                <span class="restaurant-type">${restaurant.type}</span>
            </div>
            <button class="btn" onclick="showAddReviewModal('${restaurant.id}')">Add Review</button>
            <div class="reviews-container">
                ${reviewsHtml}
            </div>
        `;

        return card;
    }

    function createStarRating(rating) {
        return Array(5).fill(0).map((_, index) => 
            `<i class="fas fa-star ${index < rating ? 'active' : ''}"></i>`
        ).join('');
    }

    addRestaurantBtn.addEventListener('click', () => {
        addRestaurantModal.classList.add('active');
    });

    closeModalBtn.addEventListener('click', () => {
        addRestaurantModal.classList.remove('active');
    });

    closeReviewModalBtn.addEventListener('click', () => {
        addReviewModal.classList.remove('active');
    });

    document.querySelectorAll('.rating').forEach(ratingContainer => {
        const stars = ratingContainer.querySelectorAll('i');
        stars.forEach(star => {
            star.addEventListener('click', () => {
                const rating = parseInt(star.getAttribute('data-rating'));
                stars.forEach(s => {
                    s.classList.toggle('active', parseInt(s.getAttribute('data-rating')) <= rating);
                });
            });
        });
    });

    addRestaurantForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const restaurantData = {
            name: document.getElementById('restaurant-name').value,
            type: document.getElementById('restaurant-type').value
        };

        try {
            const restaurantResponse = await fetch('http://helya.pylex.xyz:10209/restaurants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(restaurantData)
            });

            const newRestaurant = await restaurantResponse.json();

            const reviewData = {
                restaurant_id: newRestaurant.id,
                product_name: document.getElementById('product-name').value,
                rating: document.querySelector('.rating i.active:last-of-type').getAttribute('data-rating'),
                review: document.getElementById('review-text').value
            };

            await fetch('http://helya.pylex.xyz:10209/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData)
            });

            addRestaurantModal.classList.remove('active');
            addRestaurantForm.reset();
            loadRestaurants();
        } catch (error) {
            console.error('Error adding restaurant:', error);
            alert('Failed to add restaurant. Please try again.');
        }
    });

    addReviewForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const reviewData = {
            restaurant_id: document.getElementById('review-restaurant-id').value,
            product_name: document.getElementById('review-product-name').value,
            rating: document.querySelector('#add-review-modal .rating i.active:last-of-type').getAttribute('data-rating'),
            review: document.getElementById('new-review-text').value
        };

        try {
            await fetch('http://helya.pylex.xyz:10209/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData)
            });

            addReviewModal.classList.remove('active');
            addReviewForm.reset();
            loadRestaurants();
        } catch (error) {
            console.error('Error adding review:', error);
            alert('Failed to add review. Please try again.');
        }
    });
});

window.showAddReviewModal = function(restaurantId) {
    document.getElementById('review-restaurant-id').value = restaurantId;
    document.getElementById('add-review-modal').classList.add('active');
};