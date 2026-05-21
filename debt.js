

const Debt = (() => {

  function fmt(n) {
    return 'R\u00a0' + Math.round(n).toLocaleString('en-ZA');
  }

  function amortise(principal, annualRate, monthlyPayment) {
    const r = annualRate / 100 / 12;
    const minPayment = principal * r; 

    if (monthlyPayment <= minPayment) return null;

    let balance = principal;
    let totalInterest = 0;
    let months = 0;

    while (balance > 0 && months < 1200) { 
      const interest = balance * r;
      totalInterest += interest;
      balance = balance + interest - monthlyPayment;
      months++;
    }

    if (balance > 0) return null; 
    return { months, totalInterest };
  }

  function calc() {
    const principal = +document.getElementById('debt-total').value;
    const rate      = +document.getElementById('debt-rate').value;
    const payment   = +document.getElementById('debt-payment').value;

    document.getElementById('v-debt-total').textContent   = fmt(principal);
    document.getElementById('v-debt-rate').textContent    = rate + '%';
    document.getElementById('v-debt-payment').textContent = fmt(payment);

    const result = amortise(principal, rate, payment);

    if (!result) {
      document.getElementById('debt-months').textContent   = '∞ — increase payment';
      document.getElementById('debt-interest').textContent = '—';
      return;
    }

    const yrs = Math.floor(result.months / 12);
    const mos = result.months % 12;
    const timeStr = yrs > 0
      ? `${yrs} yr${yrs > 1 ? 's' : ''} ${mos > 0 ? mos + ' mo' : ''}`
      : `${mos} month${mos > 1 ? 's' : ''}`;

    document.getElementById('debt-months').textContent   = timeStr.trim();
    document.getElementById('debt-interest').textContent = fmt(result.totalInterest);
  }

  return { calc };
})();
