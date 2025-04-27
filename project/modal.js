// Function to open modal
function openModal(type) {
    document.getElementById(`${type}-modal`).style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open

    // Add animation effect
    const modal = document.getElementById(`${type}-modal`);
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.3s ease';

    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

// Function to close modal
function closeModal(type) {
    const modal = document.getElementById(`${type}-modal`);
    modal.style.opacity = '0';

    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }, 300);
}

// Close modal when clicking outside of modal content
window.onclick = function (event) {
    const modals = document.getElementsByClassName('modal');
    for (let i = 0; i < modals.length; i++) {
        if (event.target === modals[i]) {
            const modalId = modals[i].id.split('-')[0];
            closeModal(modalId);
        }
    }
}
