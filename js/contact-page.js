(function () {
  const form = document.getElementById('quoteForm');
  if (!form) return;

  const query = new URLSearchParams(window.location.search);
  const productField = document.getElementById('productName');
  if (productField && query.get('product')) {
    productField.value = query.get('product');
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const companyName = document.getElementById('companyName').value.trim();
    const emailAddress = document.getElementById('emailAddress').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const productName = document.getElementById('productName').value.trim();
    const interestSector = document.getElementById('interestSector').value.trim();
    const messageText = document.getElementById('messageText').value.trim();

    const subject = encodeURIComponent(`Richiesta preventivo${productName ? ` - ${productName}` : ''}`);
    const body = encodeURIComponent(
`Nome: ${fullName}
Azienda: ${companyName}
Email: ${emailAddress}
Telefono: ${phoneNumber}
Prodotto: ${productName}
Settore: ${interestSector}

Messaggio:
${messageText}`);

    window.location.href = `mailto:info@sicilystore.com?subject=${subject}&body=${body}`;
  });
})();
