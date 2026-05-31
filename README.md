# Real Life Calculator Hub

A mobile-first Next.js MVP for simple everyday calculator tools.

## Current MVP

- Home page
- Calculator index page
- Individual calculator route at `/calculators/[slug]`
- About, Contact, Privacy Policy, Terms, and Disclaimer pages
- Working calculators:
  - Hourly Paycheck Calculator
  - Overtime Pay Calculator
  - Rent Affordability Calculator
  - Gas Cost Calculator
  - Grocery Budget Calculator
  - Emergency Fund Calculator
  - Move-Out Cost Calculator
  - Debt Payoff Calculator
  - Side Hustle Profit Calculator
  - Car Repair Budget Calculator

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

Optional checks:

```bash
npm run lint
npm run test:calculators
npm run build
```

## Notes

Calculator formulas live in `src/lib/calculatorUtils.ts`, while calculator page
content and field definitions live in `src/lib/calculators.ts`.
