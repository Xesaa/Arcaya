document.addEventListener('DOMContentLoaded', function() {
    if (window.navbarLoaded) return;
    window.navbarLoaded = true;

  const navbarContainer = document.getElementById('navbar-container');

  if (navbarContainer) {
    fetch('navbar.html')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        navbarContainer.innerHTML = data;

        // Jalankan highlight link aktif setelah navbar selesai dimuat
        const currentPage = window.location.pathname.split("/").pop().toLowerCase();
        const links = document.querySelectorAll('.nav-links a');

        links.forEach(link => {
          const href = link.getAttribute('href')?.toLowerCase();
          if ((currentPage === '' && href.includes('index')) || currentPage === href) {
            link.classList.add('active');
          }
        });
      })
      .catch(error => console.error('Gagal memuat navbar:', error));
  }
});
