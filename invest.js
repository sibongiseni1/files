

const Invest = (() => {

  function fmt(n) {
    return 'R\u00a0' + Math.round(n).toLocaleString('en-ZA');
  }

  function calc() {
    const monthly = +document.getElementById('monthly-inv').value;
    const annualRate = +document.getElementById('rate').value;
    const years = +document.getElementById('years').value;

    const r = annualRate / 100 / 12;
    const n = years * 12;
    const fv = monthly * ((Math.pow(1 + r, n) - 1) / r);
    const contributed = monthly * n;

    document.getElementById('v-inv').textContent = fmt(monthly);
    document.getElementById('v-rate').textContent = annualRate + '%';
    document.getElementById('v-years').textContent = years + ' yrs';
    document.getElementById('inv-result').textContent = fmt(fv);
    document.getElementById('inv-contributed').textContent = fmt(contributed) + ' contributed';
  }

 
  function project10yr(monthlyAmount) {
    const r = 0.07 / 12;
    const n = 120;
    return monthlyAmount * ((Math.pow(1 + r, n) - 1) / r);
  }

  return { calc, project10yr };
})();
