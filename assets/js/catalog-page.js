(function () {
  const products = window.catalogProducts || [];
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  const els = {
    search: document.getElementById('searchInput'),
    category: document.getElementById('categoryFilter'),
    application: document.getElementById('applicationFilter'),
    sector: document.getElementById('sectorFilter'),
    brand: document.getElementById('brandFilter'),
    count: document.getElementById('resultsCount'),
    noResults: document.getElementById('noResults'),
    reset: document.getElementById('resetFilters')
  };

  const params = new URLSearchParams(window.location.search);
  const initialMap = {
    category: params.get('categoria') || '',
    application: params.get('applicazione') || '',
    sector: params.get('settore') || '',
    brand: params.get('brand') || '',
    search: params.get('q') || ''
  };

  function fillSelect(select, values, label) {
    const options = [`<option value="">Tutti ${label}</option>`]
      .concat(values.map(v => `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`));
    select.innerHTML = options.join('');
  }

  function uniqueValues(key) {
    return [...new Set(products.map(p => p[key]).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'it'));
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  fillSelect(els.category, uniqueValues('category'), 'le categorie');
  fillSelect(els.application, uniqueValues('application'), 'le applicazioni');
  fillSelect(els.sector, uniqueValues('sector'), 'i settori');
  fillSelect(els.brand, uniqueValues('brand'), 'i brand');

  els.category.value = initialMap.category;
  els.application.value = initialMap.application;
  els.sector.value = initialMap.sector;
  els.brand.value = initialMap.brand;
  els.search.value = initialMap.search;

  function productCard(product) {
    return `
      <article class="card product-card">
        <div class="product-media">${escapeHtml(product.brand)}</div>
        <div class="product-body">
          <div class="product-meta">
            <span class="badge">${escapeHtml(product.category)}</span>
            <span class="badge">${escapeHtml(product.sector)}</span>
          </div>
          <h3>${escapeHtml(product.name)}</h3>
          <p>${escapeHtml(product.summary)}</p>
          <div class="product-actions">
            <a class="btn btn-sm" href="prodotto.html?slug=${encodeURIComponent(product.slug)}">Scheda prodotto</a>
            <a class="btn btn-secondary btn-sm" href="contatti.html?product=${encodeURIComponent(product.name)}#preventivo">Richiedi preventivo</a>
          </div>
        </div>
      </article>`;
  }

  function match(product, term) {
    const blob = [product.name, product.summary, product.category, product.application, product.sector, product.brand].join(' ').toLowerCase();
    return blob.includes(term.toLowerCase());
  }

  function updateUrl(state) {
    const next = new URLSearchParams();
    if (state.category) next.set('categoria', state.category);
    if (state.application) next.set('applicazione', state.application);
    if (state.sector) next.set('settore', state.sector);
    if (state.brand) next.set('brand', state.brand);
    if (state.search) next.set('q', state.search);
    const query = next.toString();
    const newUrl = `${window.location.pathname}${query ? `?${query}` : ''}`;
    history.replaceState({}, '', newUrl);
  }

  function render() {
    const state = {
      search: els.search.value.trim(),
      category: els.category.value,
      application: els.application.value,
      sector: els.sector.value,
      brand: els.brand.value
    };

    let filtered = products.filter(product => {
      return (!state.search || match(product, state.search)) &&
        (!state.category || product.category === state.category) &&
        (!state.application || product.application === state.application) &&
        (!state.sector || product.sector === state.sector) &&
        (!state.brand || product.brand === state.brand);
    });

    grid.innerHTML = filtered.map(productCard).join('');
    els.count.textContent = `${filtered.length} prodotti`;
    els.noResults.classList.toggle('hidden', filtered.length !== 0);
    updateUrl(state);
  }

  Object.values(els).forEach(el => {
    if (el && ['INPUT', 'SELECT'].includes(el.tagName)) el.addEventListener('input', render);
    if (el && el.tagName === 'SELECT') el.addEventListener('change', render);
  });

  els.reset.addEventListener('click', () => {
    els.search.value = '';
    els.category.value = '';
    els.application.value = '';
    els.sector.value = '';
    els.brand.value = '';
    render();
  });

  render();
})();
