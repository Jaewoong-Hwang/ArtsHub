
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = location.pathname.split('/').pop(); // ex: info.html

  const navLinks = document.querySelectorAll('.sidebar li');

  navLinks.forEach((li) => {
    const link = li.querySelector('a');
    if (link && link.getAttribute('href') === currentPage) {
      li.classList.add('active');
    } else {
      li.classList.remove('active');
    }
  });
});