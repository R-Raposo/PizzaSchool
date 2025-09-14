// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission
document.getElementById('interestForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);

    // Send email using EmailJS
    emailjs.send("segredo_da_massa","template_contacto",{
                name: formData.get('name'),
                contact_email: formData.get('email'),
                contact_phone: formData.get('phone'),
                message: formData.get('message'),
            }).then(
                (response) => {
                    document.getElementById('successMessage').style.display = 'block';
                    this.reset();
                    setTimeout(() => {
                        document.getElementById('successMessage').style.display = 'none';
                    }, 5000);
                },
                (error) => {
                    alert(error || 'Erro ao enviar o formulário.');
                },
            );
});

// Add some interactive animations on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    if (parallax) {
        // parallax.style.backgroundPositionY = speed + 'px';
    }
});

// Add animation class when elements come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe workshop cards
document.querySelectorAll('.workshop-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});


const scrollBtn = document.querySelector('.scroll-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollBtn.style.opacity = '1';
        scrollBtn.style.pointerEvents = 'auto';
    } else {
        scrollBtn.style.opacity = '0';
        scrollBtn.style.pointerEvents = 'none';
    }
});
scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
