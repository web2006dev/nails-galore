// Nails Galore - Visual & Interactive Application Logic

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Photo gallery filtering
  initPhotoFilters();

  // 3. Image Lightbox
  initLightbox();

  // 4. Booking & Custom Press-On Drawer
  initBookingSystem();

  // 5. Mobile Nav
  initMobileNav();
});

// Category filtering for photos
function initPhotoFilters() {
  const filterBtns = document.querySelectorAll('.tab-filter');
  const cards = document.querySelectorAll('.ai-photo-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');

      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-plum-950', 'text-white');
        b.classList.add('bg-stone-200/60', 'text-stone-700', 'hover:bg-stone-300');
      });

      btn.classList.add('active', 'bg-plum-950', 'text-white');
      btn.classList.remove('bg-stone-200/60', 'text-stone-700', 'hover:bg-stone-300');

      cards.forEach(card => {
        const itemCategories = card.getAttribute('data-category') || '';
        if (category === 'all' || itemCategories.includes(category)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// Lightbox Inspector
function initLightbox() {
  const modal = document.getElementById('image-lightbox');
  const imgEl = document.getElementById('lightbox-img');
  const titleEl = document.getElementById('lightbox-title');
  const metaEl = document.getElementById('lightbox-meta');
  const priceEl = document.getElementById('lightbox-price');
  const bookBtn = document.getElementById('lightbox-action-btn');
  const closeBtn = document.getElementById('close-lightbox');
  const cards = document.querySelectorAll('.ai-photo-card');

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.card-action-trigger')) return;

      const img = card.querySelector('img');
      const title = card.getAttribute('data-title') || 'Nails Galore Set';
      const meta = card.getAttribute('data-meta') || 'Soft Gel Extension';
      const price = card.getAttribute('data-price') || '₹1,599';

      if (modal && imgEl) {
        imgEl.src = img.src;
        if (titleEl) titleEl.textContent = title;
        if (metaEl) metaEl.textContent = meta;
        if (priceEl) priceEl.textContent = price;

        if (bookBtn) {
          bookBtn.onclick = () => {
            closeLightboxModal();
            window.openBookingDrawer(title);
          };
        }

        modal.classList.remove('lightbox-hidden');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightboxModal() {
    if (modal) {
      modal.classList.add('lightbox-hidden');
      document.body.style.overflow = '';
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightboxModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeLightboxModal();
    });
  }
}

// Booking & Press-On Drawer
let selectedShape = 'Almond';

function initBookingSystem() {
  const modal = document.getElementById('booking-drawer');
  const closeBtn = document.getElementById('close-booking-drawer');
  const form = document.getElementById('booking-form');
  const selectEl = document.getElementById('booking-service-select');
  const dateInput = document.getElementById('booking-date-input');

  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  window.openBookingDrawer = function(serviceName = null) {
    if (!modal) return;
    modal.classList.remove('lightbox-hidden');
    document.body.style.overflow = 'hidden';
    if (serviceName && selectEl) {
      selectEl.value = serviceName;
    }
  };

  window.closeBookingDrawer = function() {
    if (!modal) return;
    modal.classList.add('lightbox-hidden');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', window.closeBookingDrawer);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) window.closeBookingDrawer();
    });
  }

  // Nail Shape Selector
  const shapePills = document.querySelectorAll('.shape-pill');
  shapePills.forEach(pill => {
    pill.addEventListener('click', () => {
      shapePills.forEach(p => {
        p.classList.remove('border-stone-900', 'bg-stone-900', 'text-white');
        p.classList.add('border-stone-200', 'bg-white', 'text-stone-700');
      });
      pill.classList.add('border-stone-900', 'bg-stone-900', 'text-white');
      pill.classList.remove('border-stone-200', 'bg-white', 'text-stone-700');
      selectedShape = pill.getAttribute('data-shape');
    });
  });

  // Submit to WhatsApp
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('client-name').value.trim();
      const phone = document.getElementById('client-phone').value.trim();
      const service = selectEl ? selectEl.value : 'Custom Set';
      const date = dateInput ? dateInput.value : 'Today';
      const time = document.getElementById('booking-time').value;

      const message = `*✨ Booking Request - Nails Galore Nagpur*
━━━━━━━━━━━━━━━━━━
👤 *Client Name:* ${name}
📞 *Phone:* ${phone}
💅 *Selected Set:* ${service}
📏 *Shape Preference:* ${selectedShape}
📅 *Date:* ${date}
⏰ *Preferred Time:* ${time}
━━━━━━━━━━━━━━━━━━
_Inquired via Nails Galore Official Visual Portal_`;

      const encoded = encodeURIComponent(message);
      const studioWhatsApp = '917972622695'; // Nails Galore Nagpur Phone
      const waUrl = `https://wa.me/${studioWhatsApp}?text=${encoded}`;

      // Show summary inside drawer
      const formBox = document.getElementById('drawer-form-box');
      const confirmBox = document.getElementById('drawer-confirm-box');

      if (formBox && confirmBox) {
        formBox.classList.add('hidden');
        confirmBox.classList.remove('hidden');

        const summaryBox = document.getElementById('drawer-summary-content');
        if (summaryBox) {
          summaryBox.innerHTML = `
            <div class="bg-stone-100 p-4 rounded-xl text-left text-xs space-y-1.5 border border-stone-200">
              <p><strong>Set/Service:</strong> ${service}</p>
              <p><strong>Shape:</strong> ${selectedShape}</p>
              <p><strong>Slot:</strong> ${date} at ${time}</p>
              <p><strong>Client:</strong> ${name} (${phone})</p>
            </div>
          `;
        }

        const dispatchLink = document.getElementById('btn-confirm-wa');
        if (dispatchLink) dispatchLink.href = waUrl;

        window.open(waUrl, '_blank');
      }
    });
  }

  window.resetBookingDrawer = function() {
    const formBox = document.getElementById('drawer-form-box');
    const confirmBox = document.getElementById('drawer-confirm-box');
    if (formBox && confirmBox) {
      formBox.classList.remove('hidden');
      confirmBox.classList.add('hidden');
    }
  };
}

// Mobile Nav
function initMobileNav() {
  const btn = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const links = document.querySelectorAll('.mobile-link');

  if (btn && drawer) {
    btn.addEventListener('click', () => drawer.classList.toggle('hidden'));
    links.forEach(l => l.addEventListener('click', () => drawer.classList.add('hidden')));
  }
}
