document.addEventListener("DOMContentLoaded", function () {
  if (window.navbarLoaded) return;
  window.navbarLoaded = true;

  const navbarContainer = document.getElementById("navbar-container");
  if (!navbarContainer) return;

  let navbarPath = "navbar.html";
  if (window.location.pathname.includes("/items/")) {
    navbarPath = "../navbar.html";
  }

  fetch(navbarPath)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.text();
    })
    .then((data) => {
      navbarContainer.innerHTML = data;

      const currentPage = window.location.pathname
        .split("/")
        .pop()
        .replace(".html", "")
        .toLowerCase();

      const links = document.querySelectorAll(".nav-links a");

      links.forEach((link) => {
        let href = link.getAttribute("href");
        if (!href) return;

        href = href.split("/").pop().replace(".html", "").toLowerCase();

        if (
          (currentPage === "" && href === "index") ||
          (currentPage === "index" && href === "index") ||
          currentPage === href
        ) {
          link.classList.add("active");
        }
      });
    })
    .catch((err) => console.error("Gagal memuat navbar:", err));
});