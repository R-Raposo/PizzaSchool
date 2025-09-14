document.addEventListener('DOMContentLoaded', () => {
    // Profile gallery modal logic
    const profileModal = document.getElementById('profile-modal');
    const profileModalImg = document.getElementById('profile-modal-img');
    const profileModalClose = document.querySelector('.profile-modal-close');
    
    // Secondary profile images click event
    document.querySelectorAll('.profile-secondary').forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.getAttribute('data-img');
            if (imgSrc) {
                profileModalImg.src = imgSrc;
                profileModal.classList.add('active');
            }
        });
    });

    // Main profile image click event
    const mainProfileImg = document.querySelector('.profile-main-img[data-img]');
    if (mainProfileImg) {
        mainProfileImg.addEventListener('click', () => {
            const imgSrc = mainProfileImg.getAttribute('data-img');
            if (imgSrc) {
                profileModalImg.src = imgSrc;
                profileModal.classList.add('active');
            }
        });
    }

    profileModalClose.addEventListener('click', () => {
        profileModal.classList.remove('active');
        profileModalImg.src = '';
    });
    profileModal.addEventListener('click', (e) => {
        if (e.target === profileModal) {
            profileModal.classList.remove('active');
            profileModalImg.src = '';
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