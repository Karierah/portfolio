document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = Array.from(document.querySelectorAll('.filter-btn'));
  const cards = Array.from(document.querySelectorAll('.gallery .card'));

  const normalize = s => String(s || '').toLowerCase().trim();

  // helpers to animate hide/show
  function showCard(card) {
    // ensure element participates in layout first
    card.style.display = '';
    // let layout settle, then remove hidden class to animate in
    requestAnimationFrame(() => {
      card.classList.remove('is-hidden');
    });
  }

  function hideCard(card) {
    // add class to animate out
    card.classList.add('is-hidden');

    // when opacity transition finishes, remove from flow
    const onTransitionEnd = (e) => {
      if (e.propertyName === 'opacity') {
        card.style.display = 'none';
        card.removeEventListener('transitionend', onTransitionEnd);
      }
    };
    card.addEventListener('transitionend', onTransitionEnd);
  }

  // click handler
  function applyFilter(filterValue) {
    const f = normalize(filterValue);
    cards.forEach(card => {
      const cat = normalize(card.dataset.category);
      if (f === 'all' || cat === f) {
        showCard(card);
      } else {
        // if it's already display none, skip
        if (getComputedStyle(card).display === 'none') return;
        hideCard(card);
      }
    });
  }

  // wire buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // toggle active state (only one active at a time)
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter || 'all';
      applyFilter(filter);
    });
  });

  // initialise (show all)
  applyFilter('all');
});
