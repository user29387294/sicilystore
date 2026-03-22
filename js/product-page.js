(function () {
  const products = window.catalogProducts || [];
  const detail = document.getElementById('productDetail');
  const notFound = document.getElementById('productNotFound');
  if (!detail) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const product = products.find(item => item.slug === slug);

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  if (!product) {
    notFound.classList.remove('hidden');
    return;
  }

  document.title = `${product.name} | SicilyStore`;
  detail.innerHTML = `
    <div class="product-detail">
      <div class="card product-gallery">
        <div class="product-gallery-box">${escapeHtml(product.brand)}</div>
      </div>
      <div class="card product-panel">
        <div class="product-meta">
          <span class="badge">${escapeHtml(product.category)}</span>
          <span class="badge">${escapeHtml(product.application)}</span>
          <span class="badge">${escapeHtml(product.sector)}</span>
          <span class="badge">${escapeHtml(product.brand)}</span>
        </div>
        <h1>${escapeHtml(product.name)}</h1>
        <p class="lead">${escapeHtml(product.summary)}</p>
        <p>${escapeHtml(product.description)}</p>
        <h3>Caratteristiche principali</h3>
        <ul class="info-list">
          ${product.features.map(feature => `<li>${escapeHtml(feature)}</li>`).join('')}
        </ul>
        <div class="cta-row">
          <a class="btn" href="contatti.html?product=${encodeURIComponent(product.name)}#preventivo">Richiedi preventivo</a>
          <a class="btn btn-secondary" href="prodotti.html?brand=${encodeURIComponent(product.brand)}">Altri prodotti del brand</a>
        </div>
      </div>
    </div>`;
})();
