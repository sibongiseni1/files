

const Budget = (() => {

  const BAR_COLORS = ['#378ADD', '#1D9E75', '#D85A30', '#888780'];
  const CATEGORIES = ['Housing', 'Food', 'Transport', 'Other'];
  const IDS       = ['housing', 'food', 'transport', 'other'];

  function fmt(n) {
    return 'R\u00a0' + Math.round(n).toLocaleString('en-ZA');
  }

  function update() {
    const income    = +document.getElementById('income').value;
    const expenses  = IDS.map(id => +document.getElementById(id).value);
    const total     = expenses.reduce((a, b) => a + b, 0);
    const surplus   = income - total;

    
    document.getElementById('v-income').textContent = fmt(income);
    IDS.forEach((id, i) => {
      document.getElementById('v-' + id).textContent = fmt(expenses[i]);
    });

  
    const safeSurplus = Math.max(0, surplus);
    document.getElementById('surplus-val').textContent = fmt(safeSurplus);
    const pct = income > 0 ? Math.round(safeSurplus / income * 100) : 0;
    document.getElementById('surplus-pct').textContent = pct + '% of income';

  
    const barsEl = document.getElementById('budget-bars');
    barsEl.innerHTML = CATEGORIES.map((label, i) => {
      const barPct = income > 0 ? Math.min(100, Math.round(expenses[i] / income * 100)) : 0;
      return `
        <div class="budget-row">
          <div class="budget-label">${label}</div>
          <div class="budget-bar-bg">
            <div class="budget-bar" style="width:${barPct}%; background:${BAR_COLORS[i]}"></div>
          </div>
          <div class="budget-amt">${fmt(expenses[i])} (${barPct}%)</div>
        </div>`;
    }).join('');

    App.onBudgetUpdate({ income, total, surplus: safeSurplus });
  }

  return { update };
})();
