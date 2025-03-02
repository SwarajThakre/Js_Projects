document.addEventListener('DOMContentLoaded', function () {
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');
  const expenseInput = document.getElementById('expense');
  const amountInput = document.getElementById('amount');
  const totalAmount = document.getElementById('total');

  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

  let totalamount = calculateTotalAmount();

  expenseForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const expense = expenseInput.value;
    const amount = parseFloat(amountInput.value);
    if (expense !== '' && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        expense: expense,
        amount: amount,
      };
      expenses.push(newExpense);
      updateTotalAmount();
      saveExpensesToLocalStorage();
      displayExpenses();
      expenseInput.value = '';
      amountInput.value = '';
    }
  });

  function displayExpenses() {
    expenseList.innerHTML = '';
    expenses.forEach((expense) => {
      const li = document.createElement('li');
      li.innerHTML = `
            <span>${expense.expense}</span>
            <span>$${expense.amount.toFixed(2)}</span>
            <button class="delete-expense" id="${expense.id}">Delete</button>
          `;
      expenseList.appendChild(li);
    });
  }

  function calculateTotalAmount() {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  function saveExpensesToLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }

  function updateTotalAmount() {
    totalamount = calculateTotalAmount();
    document.getElementById('total-amount').textContent =
      totalamount.toFixed(2);
  }

  expenseList.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-expense')) {
      const expenseId = parseInt(event.target.getAttribute('id'));
      expenses = expenses.filter((expense) => expense.id !== expenseId);
      updateTotalAmount();
      saveExpensesToLocalStorage();
      displayExpenses();
    }
  });

  displayExpenses();
  updateTotalAmount();
});
