# VinciPurchases

Sistema de solicitações organizadas de compras internas, desenvolvido como parte do processo seletivo da Vinci Energies.

## 🚀 Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (puro, sem frameworks)

## 📁 Estrutura do Projeto

```
VinciPurchases/
├── index.html   # Estrutura da página
├── style.css    # Estilização visual
└── script.js    # Lógica e validações
```

## ⚙️ Como Rodar o Projeto

Não é necessário instalar nada. Basta abrir o arquivo `index.html` no navegador.

## 📌 Funcionalidades

- Formulário com Nome do Solicitante, Produto e Valor
- Validação de campos obrigatórios
- Validação de valor maior que zero
- Aprovação automática para valores até R$ 1.000,00
- Aguardando aprovação para valores acima de R$ 1.000,00
- Lista de múltiplas solicitações com status visual
- Formulário limpo automaticamente após envio

## ✅ Regras de Negócio

- Todos os campos são obrigatórios
- O valor deve ser maior que zero
- Valor até R$ 1.000,00 → **Aprovado automaticamente**
- Valor acima de R$ 1.000,00 → **Aguardando aprovação**