/**
 * Table of Contents Scroll-Spy Script
 * Client-side JavaScript template for highlighting current section
 * and smooth scrolling behavior
 */

export default `
<script>
(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTOC);
  } else {
    initTOC();
  }

  function initTOC() {
    const tocItems = document.querySelectorAll('.app-toc__item[data-target]');
    const headings = document.querySelectorAll('h2[id], h3[id]');

    if (tocItems.length === 0 || headings.length === 0) {
      return; // No TOC or headings to observe
    }

    // Intersection Observer for scroll-spy
    const observerOptions = {
      // Trigger when heading crosses into top 20% of viewport
      rootMargin: '-80px 0px -80% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id');
        // Need to escape special characters in CSS selector
        const tocItem = document.querySelector(\`.app-toc__item[data-target="\${CSS.escape(id)}"]\`);

        if (entry.isIntersecting) {
          // Remove active class from all items
          document.querySelectorAll('.app-toc__item--active').forEach((item) => {
            item.classList.remove('app-toc__item--active');
          });

          // Add active class to current item
          if (tocItem) {
            tocItem.classList.add('app-toc__item--active');
          }
        }
      });
    }, observerOptions);

    // Observe all headings
    headings.forEach((heading) => {
      observer.observe(heading);
    });

    // Smooth scroll on TOC link click
    document.querySelectorAll('.app-toc__link').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();

        const href = link.getAttribute('href');
        // Remove the # (keep URL-encoded - ids in HTML are encoded)
        const targetId = href.substring(1);
        const target = document.getElementById(targetId);

        if (target) {
          // Smooth scroll to target
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Update URL hash without jumping
          if (history.pushState) {
            history.pushState(null, null, href);
          } else {
            window.location.hash = href;
          }

          // Focus target for accessibility
          target.focus({ preventScroll: true });
        }
      });
    });

    // Highlight TOC item from URL hash on page load
    const currentHash = window.location.hash;
    if (currentHash) {
      const id = currentHash.substring(1);  // Keep URL-encoded
      const tocItem = document.querySelector(\`.app-toc__item[data-target="\${CSS.escape(id)}"]\`);
      if (tocItem) {
        tocItem.classList.add('app-toc__item--active');
      }
    }
  }
})();
</script>
`;
