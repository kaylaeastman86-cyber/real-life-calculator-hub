import {
  calculateCarRepairBudget,
  calculateDebtPayoff,
  calculateEmergencyFund,
  calculateGasCost,
  calculateGroceryBudget,
  calculateHourlyPaycheck,
  calculateMoveOutCost,
  calculateOvertimePay,
  calculateRentAffordability,
  calculateSideHustleProfit
} from "@/lib/calculatorUtils";

export type FieldType = "number";

export type CalculatorField = {
  name: string;
  label: string;
  type: FieldType;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  helperText?: string;
};

export type CalculationResult = {
  summary: string;
  details: string[];
  meaning: string;
};

export type CalculatorDefinition = {
  slug: string;
  title: string;
  category: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  content: string[];
  fields: CalculatorField[];
  calculate: (values: Record<string, number>) => CalculationResult;
  relatedSlugs: string[];
  faqs: { question: string; answer: string }[];
};

export type CalculatorSummary = Pick<
  CalculatorDefinition,
  "slug" | "title" | "category" | "intro"
>;

export const calculators: CalculatorDefinition[] = [
  {
    slug: "hourly-paycheck-calculator",
    title: "Hourly Paycheck Calculator",
    category: "Income",
    metaTitle: "Hourly Paycheck Calculator",
    metaDescription:
      "Estimate weekly, monthly, and annual pay from an hourly wage, hours worked, and a simple tax withholding estimate.",
    intro:
      "Estimate what an hourly wage could look like as weekly take-home pay, monthly pay, and annual gross income.",
    content: [
      "Use this calculator when comparing jobs, planning a budget, or checking whether a schedule gives you enough income for regular bills.",
      "The estimate is intentionally simple. It uses your hourly rate, weekly hours, weeks worked per year, and an estimated withholding percentage."
    ],
    fields: [
      { name: "hourlyRate", label: "Hourly rate", type: "number", min: 0, step: 0.01, prefix: "$", helperText: "Your before-tax hourly wage." },
      { name: "hoursPerWeek", label: "Hours per week", type: "number", min: 0, max: 168, step: 0.25, helperText: "Use your usual weekly schedule." },
      { name: "weeksPerYear", label: "Weeks worked per year", type: "number", min: 1, max: 52, step: 1, helperText: "Use 52 if you work year-round." },
      { name: "estimatedTaxRate", label: "Estimated deductions and withholding", type: "number", min: 0, max: 60, step: 0.5, suffix: "%", helperText: "A rough estimate for taxes and paycheck deductions." }
    ],
    calculate: (values) => calculateHourlyPaycheck({
      hourlyRate: values.hourlyRate,
      hoursPerWeek: values.hoursPerWeek,
      weeksPerYear: values.weeksPerYear,
      estimatedTaxRate: values.estimatedTaxRate
    }),
    relatedSlugs: ["overtime-pay-calculator", "rent-affordability-calculator", "side-hustle-profit-calculator"],
    faqs: [
      { question: "Is this paycheck calculator exact?", answer: "No. It is a planning estimate. Actual paychecks can change because of tax withholding, benefits, unpaid time, overtime, and employer deductions." },
      { question: "What should I enter for deductions and withholding?", answer: "Use a rough percentage for taxes, insurance, retirement contributions, and other paycheck deductions. If you are unsure, try a few percentages to see a range." },
      { question: "Does this include overtime?", answer: "This calculator treats all hours as regular hourly pay. Use the overtime calculator if some hours are paid at a higher rate." }
    ]
  },
  {
    slug: "overtime-pay-calculator",
    title: "Overtime Pay Calculator",
    category: "Income",
    metaTitle: "Overtime Pay Calculator",
    metaDescription:
      "Estimate gross pay from regular hours, overtime hours, hourly rate, and an overtime multiplier.",
    intro:
      "Estimate how extra hours may change gross pay before taxes and paycheck deductions.",
    content: [
      "Overtime can make a big difference in a short-term budget, but it is easier to plan when regular pay and overtime pay are separated.",
      "This tool uses a simple overtime multiplier, such as 1.5x, and does not decide whether overtime rules apply to your job."
    ],
    fields: [
      { name: "hourlyRate", label: "Regular hourly rate", type: "number", min: 0, step: 0.01, prefix: "$", helperText: "Your usual hourly wage before overtime." },
      { name: "regularHours", label: "Regular hours", type: "number", min: 0, max: 168, step: 0.25, helperText: "Hours paid at the regular rate." },
      { name: "overtimeHours", label: "Overtime hours", type: "number", min: 0, max: 168, step: 0.25, helperText: "Hours paid at the overtime rate." },
      { name: "overtimeMultiplier", label: "Overtime multiplier", type: "number", min: 1, max: 3, step: 0.1, suffix: "x", helperText: "Time and a half is 1.5." }
    ],
    calculate: (values) => calculateOvertimePay({
      hourlyRate: values.hourlyRate,
      regularHours: values.regularHours,
      overtimeHours: values.overtimeHours,
      overtimeMultiplier: values.overtimeMultiplier
    }),
    relatedSlugs: ["hourly-paycheck-calculator", "side-hustle-profit-calculator", "debt-payoff-calculator"],
    faqs: [
      { question: "Does this show take-home pay?", answer: "No. It estimates gross pay before taxes, benefits, and other deductions." },
      { question: "What multiplier should I use?", answer: "Many people use 1.5 for time-and-a-half, but your job may use a different rate." },
      { question: "Does this determine legal overtime eligibility?", answer: "No. It is only a math estimate and does not provide legal advice." }
    ]
  },
  {
    slug: "rent-affordability-calculator",
    title: "Rent Affordability Calculator",
    category: "Housing",
    metaTitle: "Rent Affordability Calculator",
    metaDescription:
      "Estimate a monthly rent target based on income, existing debt payments, and the percentage of income you want to spend on rent.",
    intro:
      "Find a practical monthly rent estimate based on your income, debt payments, and comfort level.",
    content: [
      "Rent is often one of the biggest monthly expenses. This calculator gives you a quick target so you can compare apartments before applying.",
      "Many people start with a percentage of monthly income, then adjust downward if debt payments or other fixed bills are high."
    ],
    fields: [
      { name: "monthlyIncome", label: "Monthly take-home income", type: "number", min: 0, step: 0.01, prefix: "$", helperText: "Use income after regular paycheck deductions." },
      { name: "monthlyDebt", label: "Monthly debt payments", type: "number", min: 0, step: 0.01, prefix: "$", helperText: "Include regular loan or credit card minimum payments." },
      { name: "rentRatio", label: "Target rent share of income", type: "number", min: 1, max: 60, step: 1, suffix: "%", helperText: "A common starting point is 25% to 30%." }
    ],
    calculate: (values) => calculateRentAffordability({
      monthlyIncome: values.monthlyIncome,
      monthlyDebt: values.monthlyDebt,
      rentRatio: values.rentRatio
    }),
    relatedSlugs: ["move-out-cost-calculator", "hourly-paycheck-calculator", "emergency-fund-calculator"],
    faqs: [
      { question: "Should I use gross income or take-home income?", answer: "This calculator is designed for take-home income because that is closer to the money available for monthly bills." },
      { question: "Does affordable rent include utilities?", answer: "No. Treat the result as a rent target before utilities unless you know utilities are included in the lease." },
      { question: "Why does debt reduce the rent estimate?", answer: "Debt payments already use part of your monthly cash flow, so the calculator lowers the estimate to leave more room for required payments." }
    ]
  },
  {
    slug: "gas-cost-calculator",
    title: "Gas Cost Calculator",
    category: "Transportation",
    metaTitle: "Gas Cost Calculator",
    metaDescription:
      "Estimate the fuel cost for a trip or commute using miles driven, vehicle MPG, local gas price, parking, and tolls.",
    intro:
      "Estimate what a trip, commute, or weekly drive may cost based on distance, fuel efficiency, and gas price.",
    content: [
      "This calculator is useful for comparing routes, planning a road trip, or understanding how driving fits into your weekly budget.",
      "For the best estimate, use your real-world MPG rather than the highest advertised MPG."
    ],
    fields: [
      { name: "milesDriven", label: "Miles driven", type: "number", min: 0, step: 0.1, helperText: "Enter the total miles for the trip or time period." },
      { name: "mpg", label: "Vehicle miles per gallon", type: "number", min: 1, step: 0.1, suffix: "MPG", helperText: "Use your usual MPG if you know it." },
      { name: "gasPrice", label: "Gas price per gallon", type: "number", min: 0, step: 0.01, prefix: "$", helperText: "Use the current local price." },
      { name: "parkingTolls", label: "Parking and tolls", type: "number", min: 0, step: 0.01, prefix: "$", helperText: "Optional extra driving costs." }
    ],
    calculate: (values) => calculateGasCost({
      milesDriven: values.milesDriven,
      mpg: values.mpg,
      gasPrice: values.gasPrice,
      parkingTolls: values.parkingTolls
    }),
    relatedSlugs: ["car-repair-budget-calculator", "grocery-budget-calculator", "rent-affordability-calculator"],
    faqs: [
      { question: "Can I use this for a commute?", answer: "Yes. Enter your total commute miles for a day, week, or month, then use the matching parking and toll estimate for that same period." },
      { question: "Why does MPG matter so much?", answer: "MPG controls how many gallons you need. Lower MPG means more fuel for the same distance." },
      { question: "Does this include maintenance or insurance?", answer: "No. This calculator estimates fuel plus parking and tolls only. Maintenance, insurance, registration, and depreciation are separate costs." }
    ]
  },
  {
    slug: "grocery-budget-calculator",
    title: "Grocery Budget Calculator",
    category: "Budgeting",
    metaTitle: "Grocery Budget Calculator",
    metaDescription:
      "Compare current weekly grocery spending with a target grocery budget and estimate the monthly difference.",
    intro:
      "Turn weekly grocery spending into a monthly estimate and compare it with a target budget.",
    content: [
      "Grocery costs can creep up because many purchases happen in small trips. A weekly target can make the monthly cost easier to understand.",
      "Use this tool to compare what you usually spend with the amount you want to plan around."
    ],
    fields: [
      { name: "people", label: "People in household", type: "number", min: 1, max: 20, step: 1, helperText: "Count people regularly included in grocery spending." },
      { name: "weeklySpend", label: "Current weekly grocery spend", type: "number", min: 0, step: 0.01, prefix: "$", helperText: "Your current average weekly spending." },
      { name: "targetWeeklySpend", label: "Target weekly grocery spend", type: "number", min: 0, step: 0.01, prefix: "$", helperText: "The weekly amount you want to plan for." }
    ],
    calculate: (values) => calculateGroceryBudget({
      people: values.people,
      weeklySpend: values.weeklySpend,
      targetWeeklySpend: values.targetWeeklySpend
    }),
    relatedSlugs: ["emergency-fund-calculator", "gas-cost-calculator", "debt-payoff-calculator"],
    faqs: [
      { question: "Why convert weekly spending to monthly spending?", answer: "Most bills are monthly, while grocery shopping is often weekly. Converting makes the number easier to compare with the rest of a budget." },
      { question: "Should household items be included?", answer: "Include them if they usually come from the same grocery budget. Exclude them if you track household items separately." },
      { question: "What if my weekly spending changes a lot?", answer: "Use an average from the last few weeks or test a few different weekly amounts." }
    ]
  },
  {
    slug: "emergency-fund-calculator",
    title: "Emergency Fund Calculator",
    category: "Savings",
    metaTitle: "Emergency Fund Calculator",
    metaDescription:
      "Estimate an emergency fund target based on essential monthly expenses, months of coverage, and current savings.",
    intro:
      "Estimate how much you may want saved for essential expenses during an unexpected setback.",
    content: [
      "An emergency fund is meant to cover necessary costs when income drops or a surprise expense appears.",
      "This calculator uses essential monthly expenses and a chosen number of months, then compares that target with your current savings."
    ],
    fields: [
      { name: "monthlyEssentials", label: "Monthly essential expenses", type: "number", min: 0, step: 0.01, prefix: "$", helperText: "Include core bills such as rent, food, utilities, transport, and minimum payments." },
      { name: "monthsCovered", label: "Months to cover", type: "number", min: 1, max: 24, step: 1, helperText: "Choose the number of months you want the fund to cover." },
      { name: "currentSavings", label: "Current emergency savings", type: "number", min: 0, step: 0.01, prefix: "$", helperText: "Savings already set aside for emergencies." }
    ],
    calculate: (values) => calculateEmergencyFund({
      monthlyEssentials: values.monthlyEssentials,
      monthsCovered: values.monthsCovered,
      currentSavings: values.currentSavings
    }),
    relatedSlugs: ["grocery-budget-calculator", "rent-affordability-calculator", "car-repair-budget-calculator"],
    faqs: [
      { question: "What counts as an essential expense?", answer: "Essential expenses usually include housing, food, utilities, transportation, insurance, and required minimum debt payments." },
      { question: "Should I include fun spending?", answer: "Usually no. Emergency fund targets often focus on necessary costs first." },
      { question: "Is this savings advice?", answer: "No. It is a planning estimate, not personal financial advice." }
    ]
  },
  {
    slug: "move-out-cost-calculator",
    title: "Move-Out Cost Calculator",
    category: "Housing",
    metaTitle: "Move-Out Cost Calculator",
    metaDescription:
      "Estimate upfront move-out costs including rent, deposit, moving expenses, utility setup, and basic furniture.",
    intro:
      "Estimate the cash you may need before moving into a new place.",
    content: [
      "Moving out can involve more than the first rent payment. Deposits, movers, utility setup, and basic household items can add up quickly.",
      "Use this calculator to build a simple upfront move-out estimate before choosing a lease or move date."
    ],
    fields: [
      { name: "rent", label: "First month rent", type: "number", min: 0, step: 0.01, prefix: "$", helperText: "Enter expected first month rent." },
      { name: "deposit", label: "Security deposit and fees", type: "number", min: 0, step: 0.01, prefix: "$", helperText: "Include deposit and required move-in fees." },
      { name: "movingCosts", label: "Moving costs", type: "number", min: 0, step: 0.01, prefix: "$", helperText: "Truck, movers, boxes, or supplies." },
      { name: "utilitySetup", label: "Utility setup", type: "number", min: 0, step: 0.01, prefix: "$", helperText: "Deposits or setup fees for power, water, internet, or similar bills." },
      { name: "furnitureBasics", label: "Basic furniture and household items", type: "number", min: 0, step: 0.01, prefix: "$", helperText: "Only include basics you expect to buy right away." }
    ],
    calculate: (values) => calculateMoveOutCost({
      rent: values.rent,
      deposit: values.deposit,
      movingCosts: values.movingCosts,
      utilitySetup: values.utilitySetup,
      furnitureBasics: values.furnitureBasics
    }),
    relatedSlugs: ["rent-affordability-calculator", "emergency-fund-calculator", "hourly-paycheck-calculator"],
    faqs: [
      { question: "Does this include monthly bills after moving?", answer: "No. It estimates upfront move-out cash, not the full monthly budget after the move." },
      { question: "Should I include an emergency cushion?", answer: "It can be smart to plan one separately. The emergency fund calculator can help with that estimate." },
      { question: "What if my deposit is refundable?", answer: "Even refundable deposits still require cash upfront, so include them in the move-out amount." }
    ]
  },
  {
    slug: "debt-payoff-calculator",
    title: "Debt Payoff Calculator",
    category: "Debt",
    metaTitle: "Debt Payoff Calculator",
    metaDescription:
      "Estimate how long it may take to pay off a debt using balance, APR, and monthly payment.",
    intro:
      "Estimate a simple debt payoff timeline from balance, interest rate, and monthly payment.",
    content: [
      "Debt payoff depends heavily on the payment amount and interest rate. A small payment change can shift the timeline.",
      "This calculator uses a basic monthly interest estimate and assumes no new charges are added."
    ],
    fields: [
      { name: "balance", label: "Current balance", type: "number", min: 0, step: 0.01, prefix: "$", helperText: "The amount owed right now." },
      { name: "apr", label: "Annual interest rate", type: "number", min: 0, max: 99, step: 0.01, suffix: "%", helperText: "Use the annual percentage rate." },
      { name: "monthlyPayment", label: "Monthly payment", type: "number", min: 1, step: 0.01, prefix: "$", helperText: "The amount you plan to pay each month." }
    ],
    calculate: (values) => calculateDebtPayoff({
      balance: values.balance,
      apr: values.apr,
      monthlyPayment: values.monthlyPayment
    }),
    relatedSlugs: ["emergency-fund-calculator", "grocery-budget-calculator", "side-hustle-profit-calculator"],
    faqs: [
      { question: "Does this include new purchases?", answer: "No. It assumes no new charges are added to the balance." },
      { question: "Why might the payment be too low?", answer: "If a payment does not cover the interest that accrues, the balance may not decrease." },
      { question: "Is this debt advice?", answer: "No. It is a general estimate. Consider a qualified professional for personal debt guidance." }
    ]
  },
  {
    slug: "side-hustle-profit-calculator",
    title: "Side Hustle Profit Calculator",
    category: "Income",
    metaTitle: "Side Hustle Profit Calculator",
    metaDescription:
      "Estimate side hustle profit after expenses, a basic tax set-aside, and hours worked.",
    intro:
      "Estimate whether a side hustle is producing useful profit after costs and time.",
    content: [
      "Revenue alone does not show whether a side hustle is worthwhile. Expenses, time, and possible tax set-asides matter too.",
      "Use this calculator to compare a simple net profit estimate with the hours you put in."
    ],
    fields: [
      { name: "revenue", label: "Total revenue", type: "number", min: 0, step: 0.01, prefix: "$", helperText: "Money collected before expenses." },
      { name: "expenses", label: "Total expenses", type: "number", min: 0, step: 0.01, prefix: "$", helperText: "Supplies, platforms, mileage, shipping, or other costs." },
      { name: "hoursWorked", label: "Hours worked", type: "number", min: 0.25, step: 0.25, helperText: "Total time spent earning this revenue." },
      { name: "estimatedTaxRate", label: "Estimated tax set-aside", type: "number", min: 0, max: 60, step: 0.5, suffix: "%", helperText: "A planning-only percentage, not tax advice." }
    ],
    calculate: (values) => calculateSideHustleProfit({
      revenue: values.revenue,
      expenses: values.expenses,
      hoursWorked: values.hoursWorked,
      estimatedTaxRate: values.estimatedTaxRate
    }),
    relatedSlugs: ["hourly-paycheck-calculator", "overtime-pay-calculator", "debt-payoff-calculator"],
    faqs: [
      { question: "Is the tax set-aside exact?", answer: "No. It is only a planning estimate and not tax advice." },
      { question: "Why include hours worked?", answer: "Hours help you compare the side hustle with other ways to earn money." },
      { question: "Should I include mileage?", answer: "Include mileage costs if they are real expenses for the work, using an estimate that makes sense for your situation." }
    ]
  },
  {
    slug: "car-repair-budget-calculator",
    title: "Car Repair Budget Calculator",
    category: "Transportation",
    metaTitle: "Car Repair Budget Calculator",
    metaDescription:
      "Estimate how much more you need for a car repair and how long it may take to save at a monthly savings amount.",
    intro:
      "Turn a repair estimate into a simple savings target and timeline.",
    content: [
      "Car repairs can interrupt a budget quickly. This calculator compares a repair estimate with what you already saved.",
      "Use it to plan how much remains and how many months it may take to reach the repair target."
    ],
    fields: [
      { name: "repairEstimate", label: "Repair estimate", type: "number", min: 0, step: 0.01, prefix: "$", helperText: "Use the quote or expected repair amount." },
      { name: "currentSavings", label: "Current repair savings", type: "number", min: 0, step: 0.01, prefix: "$", helperText: "Money already set aside for this repair." },
      { name: "monthlySavings", label: "Monthly amount you can save", type: "number", min: 0, step: 0.01, prefix: "$", helperText: "How much you can add each month." }
    ],
    calculate: (values) => calculateCarRepairBudget({
      repairEstimate: values.repairEstimate,
      currentSavings: values.currentSavings,
      monthlySavings: values.monthlySavings
    }),
    relatedSlugs: ["gas-cost-calculator", "emergency-fund-calculator", "grocery-budget-calculator"],
    faqs: [
      { question: "Does this decide whether a repair is urgent?", answer: "No. Ask a mechanic about safety and timing if the vehicle may be unsafe to drive." },
      { question: "What if I already have enough saved?", answer: "The calculator will show zero still needed if current savings cover the estimate." },
      { question: "Does this include future maintenance?", answer: "No. It estimates one repair target, not ongoing maintenance or insurance costs." }
    ]
  }
];

export function getCalculatorBySlug(slug: string) {
  return calculators.find((calculator) => calculator.slug === slug);
}

export function getCalculatorSummaries(): CalculatorSummary[] {
  return calculators.map(({ slug, title, category, intro }) => ({
    slug,
    title,
    category,
    intro
  }));
}
