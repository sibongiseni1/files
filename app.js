

const App = (() => {

  function fmt(n) {
    return 'R\u00a0' + Math.round(n).toLocaleString('en-ZA');
  }


  function onBudgetUpdate({ income, total, surplus }) {
    const monthlySavings = Math.max(0, surplus * 0.5);
    const projection     = Invest.project10yr(monthlySavings);
    const emergency      = total * 3;
    const pct            = income > 0 ? Math.round(monthlySavings / income * 100) : 0;

    document.getElementById('s-monthly').textContent = fmt(monthlySavings);
    document.getElementById('s-rate').textContent    = pct + '% of income';
    document.getElementById('s-10yr').textContent    = fmt(projection);
    document.getElementById('s-emerg').textContent   = fmt(emergency);

    Tips.refresh({ income, total, surplus });
  }

  return { onBudgetUpdate };
})();


function switchTab(name) {
  document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.section').forEach(el => el.classList.remove('active'));

  const tabMap = { budget: 0, invest: 1, debt: 2, tips: 3 };
  document.querySelectorAll('.tab')[tabMap[name]].classList.add('active');
  document.getElementById('tab-' + name).classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  Budget.update();
  Invest.calc();
  Debt.calc();
});
