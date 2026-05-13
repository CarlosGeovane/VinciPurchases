// Aguarda o HTML carregar completamente antes de executar o script
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("purchaseForm");
  const errorMessage = document.getElementById("errorMessage");
  const requestsSection = document.getElementById("requestsSection");
  const requestsList = document.getElementById("requestsList");

  const requests = [];

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const requesterName = document.getElementById("requesterName").value.trim();
    const product = document.getElementById("product").value.trim();
    const value = Number.parseFloat(document.getElementById("value").value);

    if (!requesterName || !product || !document.getElementById("value").value) {
      showError("Por favor, preencha todos os campos.");
      return;
    }

    if (Number.isNaN(value) || value <= 0) {
      showError("O valor da compra deve ser maior que zero.");
      return;
    }

    hideError();

    const status =
      value <= 1000 ? "Aprovado automaticamente" : "Aguardando aprovação";
    const statusClass = value <= 1000 ? "status-approved" : "status-pending";

    const request = {
      requesterName,
      product,
      value,
      status,
      statusClass,
    };

    requests.push(request);

    renderRequests();

    form.reset();
  });

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
  }

  function hideError() {
    errorMessage.classList.add("hidden");
  }

  function renderRequests() {
    requestsSection.classList.remove("hidden");

    requestsList.innerHTML = "";

    requests.forEach(function (request) {
      const card = document.createElement("div");
      card.classList.add("request-card");

      const formattedValue = request.value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      card.innerHTML = `
                <div class="request-info">
                    <h3>${request.requesterName}</h3>
                    <p>Produto: ${request.product}</p>
                    <p>Valor: ${formattedValue}</p>
                </div>
                <span class="${request.statusClass}">${request.status}</span>
            `;

      requestsList.appendChild(card);
    });
  }
});
