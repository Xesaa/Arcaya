document.addEventListener('DOMContentLoaded', function () {
  if (window.navbarLoaded) return;
  window.navbarLoaded = true;

  const navbarContainer = document.getElementById('navbar-container');
  if (!navbarContainer) return;

  // Tentukan path file navbar (kalau di dalam /items/, naik satu folder)
  let navbarPath = 'navbar.html';
  if (window.location.pathname.includes('/items/')) {
    navbarPath = '../navbar.html';
  }

  fetch(navbarPath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      navbarContainer.innerHTML = data;

      // Ambil path URL saat ini tanpa domain dan ekstensi
      const currentPath = window.location.pathname.split('/').pop().replace('.html', '').toLowerCase();

      const links = document.querySelectorAll('.nav-links a');
      links.forEach(link => {
        const href = link.getAttribute('href')?.replace('.html', '').toLowerCase();

        // Match juga untuk index.html atau halaman utama
        if (
          (currentPath === '' && href.includes('index')) ||
          currentPath === href
        ) {
          link.classList.add('active');
        }
      });
    })
    .catch(error => console.error('Gagal memuat navbar:', error));
});
