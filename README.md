# Wealth Builder

A personal money dashboard for saving and investing, built for South Africans.

## Running it

No build tools needed. Just open `index.html` in any browser.

```bash
# Optional: serve locally with Python
python3 -m http.server 8080
# Then open http://localhost:8080
```

## Project structure

```
wealth-builder/
├── index.html          ← All HTML markup and tab structure
├── styles/
│   └── main.css        ← Global styles, CSS variables, responsive layout
├── js/
│   ├── budget.js       ← Budget sliders, bar chart, surplus calculation
│   ├── invest.js       ← Compound interest calculator + 10-yr projection
│   ├── debt.js         ← Debt amortisation calculator
│   ├── tips.js         ← Tips tab (static + hook for dynamic tips)
│   └── app.js          ← Tab routing, summary cards, init
└── README.md
```

## How the modules connect

```
Budget.update()
  └─► App.onBudgetUpdate({ income, total, surplus })
        ├─► Invest.project10yr(monthlySavings)  → updates "10-year projection" card
        ├─► Updates "Monthly savings" card
        ├─► Updates "Emergency fund goal" card
        └─► Tips.refresh({ income, total, surplus })

Invest.calc()    — standalone, updates invest tab only
Debt.calc()      — standalone, updates debt tab only
switchTab(name)  — global, called from onclick in HTML
```

## Extending the app

### Add a Goals tracker tab
1. Add a new `<button class="tab">` and `<section id="tab-goals">` in `index.html`
2. Create `js/goals.js` with a `Goals` module
3. Add `goals: 4` to the `tabMap` in `app.js`
4. Use `localStorage` to persist goals between sessions

### Add a chart to the invest tab
Use Chart.js (already available on cdnjs):
```html
<canvas id="growth-chart"></canvas>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js"></script>
```
Then in `invest.js`, build a line chart of `balance[month]` over time.

### Connect live ETF prices
- Free option: [Yahoo Finance unofficial API](https://finance.yahoo.com) via a CORS proxy
- SA option: JSE data from [Sharenet](https://www.sharenet.co.za) or [EasyEquities API](https://www.easyequities.co.za)

### Deploy
Drop the folder into [Netlify Drop](https://app.netlify.com/drop) for instant hosting.
No build step, no config — it just works.
