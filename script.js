// Aguarda o HTML carregar completamente antes de executar o script
document.addEventListener('DOMContentLoaded', function () {

    // Pega os elementos do HTML pelo id
    const form = document.getElementById('purchaseForm');
    const errorMessage = document.getElementById('errorMessage');
    const requestsSection = document.getElementById('requestsSection');
    const requestsList = document.getElementById('requestsList');

    // Array que guarda todas as solicitações enviadas
    const requests = [];

    // Escuta o evento de envio do formulário
    form.addEventListener('submit', function (event) {
        // Impede o comportamento padrão do formulário (recarregar a página)
        event.preventDefault();

        // Pega os valores digitados nos campos
        const requesterName = document.getElementById('requesterName').value.trim();
        const product = document.getElementById('product').value.trim();
        const value = Number.parseFloat(document.getElementById('value').value);

        // Validação 1: verifica se todos os campos estão preenchidos
        if (!requesterName || !product || !document.getElementById('value').value) {
            showError('Por favor, preencha todos os campos.');
            return;
        }

        // Validação 2: verifica se o valor é maior que zero
        if (Number.isNaN(value) || value <= 0) {
            showError('O valor da compra deve ser maior que zero.');
            return;
        }

        // Esconde a mensagem de erro se tudo estiver ok
        hideError();

        // Define o status baseado no valor
        // Até R$1000 → aprovado automaticamente
        // Acima de R$1000 → aguardando aprovação
        const status = value <= 1000 ? 'Aprovado automaticamente' : 'Aguardando aprovação';
        const statusClass = value <= 1000 ? 'status-approved' : 'status-pending';

        // Cria o objeto da solicitação
        const request = {
            requesterName,
            product,
            value,
            status,
            statusClass
        };

        // Adiciona a solicitação no array
        requests.push(request);

        // Atualiza a lista na tela
        renderRequests();

        // Limpa o formulário após o envio
        form.reset();
    });

    // Função que exibe a mensagem de erro
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }

    // Função que esconde a mensagem de erro
    function hideError() {
        errorMessage.classList.add('hidden');
    }

    // Função que renderiza todas as solicitações na tela
    function renderRequests() {
        // Mostra a seção de solicitações se estiver escondida
        requestsSection.classList.remove('hidden');

        // Limpa a lista atual
        requestsList.innerHTML = '';

        // Para cada solicitação no array, cria um card na tela
        requests.forEach(function (request) {
            const card = document.createElement('div');
            card.classList.add('request-card');

            // Formata o valor em reais
            const formattedValue = request.value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            // Monta o HTML do card
            card.innerHTML = `
                <div class="request-info">
                    <h3>${request.requesterName}</h3>
                    <p>Produto: ${request.product}</p>
                    <p>Valor: ${formattedValue}</p>
                </div>
                <span class="${request.statusClass}">${request.status}</span>
            `;

            // Adiciona o card na lista
            requestsList.appendChild(card);
        });
    }
});