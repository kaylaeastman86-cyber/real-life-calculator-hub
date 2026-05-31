export type PaycheckInputs = {
  hourlyRate: number;
  hoursPerWeek: number;
  weeksPerYear: number;
  estimatedTaxRate: number;
};

export type OvertimeInputs = {
  hourlyRate: number;
  regularHours: number;
  overtimeHours: number;
  overtimeMultiplier: number;
};

export type RentInputs = {
  monthlyIncome: number;
  monthlyDebt: number;
  rentRatio: number;
};

export type GasInputs = {
  milesDriven: number;
  mpg: number;
  gasPrice: number;
  parkingTolls: number;
};

export type GroceryBudgetInputs = {
  people: number;
  weeklySpend: number;
  targetWeeklySpend: number;
};

export type EmergencyFundInputs = {
  monthlyEssentials: number;
  monthsCovered: number;
  currentSavings: number;
};

export type MoveOutInputs = {
  rent: number;
  deposit: number;
  movingCosts: number;
  utilitySetup: number;
  furnitureBasics: number;
};

export type DebtPayoffInputs = {
  balance: number;
  apr: number;
  monthlyPayment: number;
};

export type SideHustleInputs = {
  revenue: number;
  expenses: number;
  hoursWorked: number;
  estimatedTaxRate: number;
};

export type CarRepairInputs = {
  repairEstimate: number;
  currentSavings: number;
  monthlySavings: number;
};

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(value);
}

export function formatNumber(value: number, digits = 1) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits
  }).format(value);
}

export function calculateHourlyPaycheck(inputs: PaycheckInputs) {
  const weeklyGross = inputs.hourlyRate * inputs.hoursPerWeek;
  const annualGross = weeklyGross * inputs.weeksPerYear;
  const taxMultiplier = 1 - inputs.estimatedTaxRate / 100;
  const weeklyNet = weeklyGross * taxMultiplier;
  const monthlyNet = (annualGross * taxMultiplier) / 12;

  return {
    summary: `Estimated take-home pay: ${formatCurrency(weeklyNet)} per week`,
    details: [
      `Gross weekly pay: ${formatCurrency(weeklyGross)}`,
      `Estimated monthly take-home pay: ${formatCurrency(monthlyNet)}`,
      `Estimated annual gross pay: ${formatCurrency(annualGross)}`
    ],
    meaning:
      "This estimate helps you compare hourly work to monthly bills. Your actual paycheck can change based on deductions, benefits, state rules, tax withholding, and unpaid time off."
  };
}

export function calculateOvertimePay(inputs: OvertimeInputs) {
  const regularPay = inputs.hourlyRate * inputs.regularHours;
  const overtimeRate = inputs.hourlyRate * inputs.overtimeMultiplier;
  const overtimePay = overtimeRate * inputs.overtimeHours;
  const totalPay = regularPay + overtimePay;

  return {
    summary: `Estimated gross pay: ${formatCurrency(totalPay)}`,
    details: [
      `Regular pay: ${formatCurrency(regularPay)}`,
      `Overtime rate: ${formatCurrency(overtimeRate)} per hour`,
      `Overtime pay: ${formatCurrency(overtimePay)}`
    ],
    meaning:
      "This estimate separates regular and overtime earnings so you can see how extra hours affect gross pay before deductions. Actual overtime rules can vary by job, location, and employer policy."
  };
}

export function calculateRentAffordability(inputs: RentInputs) {
  const incomeBasedRent = inputs.monthlyIncome * (inputs.rentRatio / 100);
  // Existing debt reduces flexibility, so this planning estimate nudges rent lower without acting like a formal lending rule.
  const debtAdjustedRent = Math.max(incomeBasedRent - inputs.monthlyDebt * 0.5, 0);
  const yearlyRent = debtAdjustedRent * 12;

  return {
    summary: `Estimated affordable rent: ${formatCurrency(debtAdjustedRent)} per month`,
    details: [
      `Income-only estimate: ${formatCurrency(incomeBasedRent)} per month`,
      `Debt-adjusted estimate: ${formatCurrency(debtAdjustedRent)} per month`,
      `Estimated yearly rent budget: ${formatCurrency(yearlyRent)}`
    ],
    meaning:
      "This gives you a rent target that leaves room for other bills. A lower rent may be safer if utilities, transportation, debt payments, childcare, or savings goals are high."
  };
}

export function calculateGasCost(inputs: GasInputs) {
  // Gallons are estimated from distance and vehicle efficiency, then multiplied by fuel price.
  const gallonsNeeded = inputs.milesDriven / inputs.mpg;
  const fuelCost = gallonsNeeded * inputs.gasPrice;
  const totalCost = fuelCost + inputs.parkingTolls;

  return {
    summary: `Estimated trip cost: ${formatCurrency(totalCost)}`,
    details: [
      `Estimated fuel needed: ${formatNumber(gallonsNeeded, 2)} gallons`,
      `Fuel cost before parking or tolls: ${formatCurrency(fuelCost)}`,
      `Parking and tolls added: ${formatCurrency(inputs.parkingTolls)}`
    ],
    meaning:
      "This estimate can help compare driving with other options or plan a weekly transportation budget. Real costs may change with traffic, route changes, fuel prices, and vehicle condition."
  };
}

export function calculateGroceryBudget(inputs: GroceryBudgetInputs) {
  const currentMonthly = inputs.weeklySpend * 52 / 12;
  const targetMonthly = inputs.targetWeeklySpend * 52 / 12;
  const monthlyDifference = currentMonthly - targetMonthly;
  const targetPerPerson = inputs.targetWeeklySpend / inputs.people;

  return {
    summary: `Target grocery budget: ${formatCurrency(targetMonthly)} per month`,
    details: [
      `Current estimated monthly spend: ${formatCurrency(currentMonthly)}`,
      `Monthly change needed: ${formatCurrency(monthlyDifference)}`,
      `Target weekly spend per person: ${formatCurrency(targetPerPerson)}`
    ],
    meaning:
      "This estimate turns weekly grocery spending into a monthly target. If the target feels too tight, adjust it before relying on it for meal planning."
  };
}

export function calculateEmergencyFund(inputs: EmergencyFundInputs) {
  const targetSavings = inputs.monthlyEssentials * inputs.monthsCovered;
  const remaining = Math.max(targetSavings - inputs.currentSavings, 0);
  const percentFunded = targetSavings > 0 ? inputs.currentSavings / targetSavings * 100 : 0;

  return {
    summary: `Emergency fund target: ${formatCurrency(targetSavings)}`,
    details: [
      `Current savings counted toward target: ${formatCurrency(inputs.currentSavings)}`,
      `Amount still needed: ${formatCurrency(remaining)}`,
      `Progress toward target: ${formatNumber(Math.min(percentFunded, 100), 1)}%`
    ],
    meaning:
      "This estimate focuses on essential monthly costs, not every possible expense. A smaller starter fund can still help while you build toward the full target."
  };
}

export function calculateMoveOutCost(inputs: MoveOutInputs) {
  const firstMonthAndDeposit = inputs.rent + inputs.deposit;
  const totalCost =
    firstMonthAndDeposit +
    inputs.movingCosts +
    inputs.utilitySetup +
    inputs.furnitureBasics;

  return {
    summary: `Estimated move-out cash needed: ${formatCurrency(totalCost)}`,
    details: [
      `First month rent plus deposit: ${formatCurrency(firstMonthAndDeposit)}`,
      `Moving costs: ${formatCurrency(inputs.movingCosts)}`,
      `Utilities and basic setup: ${formatCurrency(inputs.utilitySetup + inputs.furnitureBasics)}`
    ],
    meaning:
      "This estimate helps you plan the cash needed before moving. It does not include every possible lease fee, application cost, or emergency cushion."
  };
}

export function calculateDebtPayoff(inputs: DebtPayoffInputs) {
  const monthlyRate = inputs.apr / 100 / 12;
  let months = 0;
  let balance = inputs.balance;
  let interestPaid = 0;

  if (monthlyRate > 0 && inputs.monthlyPayment <= balance * monthlyRate) {
    return {
      summary: "Monthly payment may be too low to pay off this debt",
      details: [
        `Estimated first-month interest: ${formatCurrency(balance * monthlyRate)}`,
        `Entered monthly payment: ${formatCurrency(inputs.monthlyPayment)}`,
        "Try a higher payment to estimate a payoff timeline."
      ],
      meaning:
        "When the payment does not cover monthly interest, the balance may not go down. Increase the payment or review the debt terms before making a plan."
    };
  }

  while (balance > 0 && months < 1200) {
    const interest = balance * monthlyRate;
    const principal = Math.min(inputs.monthlyPayment - interest, balance);
    interestPaid += interest;
    balance -= principal;
    months += 1;
  }

  return {
    summary: `Estimated payoff time: ${months} months`,
    details: [
      `Estimated total paid: ${formatCurrency(inputs.balance + interestPaid)}`,
      `Estimated interest paid: ${formatCurrency(interestPaid)}`,
      `Monthly payment used: ${formatCurrency(inputs.monthlyPayment)}`
    ],
    meaning:
      "This estimate shows how payment size and interest rate can affect payoff time. Actual balances may change with new charges, fees, variable rates, or payment timing."
  };
}

export function calculateSideHustleProfit(inputs: SideHustleInputs) {
  const grossProfit = inputs.revenue - inputs.expenses;
  const estimatedTaxes = Math.max(grossProfit, 0) * (inputs.estimatedTaxRate / 100);
  const netProfit = grossProfit - estimatedTaxes;
  const hourlyProfit = inputs.hoursWorked > 0 ? netProfit / inputs.hoursWorked : 0;

  return {
    summary: `Estimated net profit: ${formatCurrency(netProfit)}`,
    details: [
      `Profit before estimated taxes: ${formatCurrency(grossProfit)}`,
      `Estimated tax set-aside: ${formatCurrency(estimatedTaxes)}`,
      `Estimated profit per hour: ${formatCurrency(hourlyProfit)}`
    ],
    meaning:
      "This estimate helps compare a side hustle with the time and costs it takes. It is not tax advice, and real tax treatment can vary."
  };
}

export function calculateCarRepairBudget(inputs: CarRepairInputs) {
  const remaining = Math.max(inputs.repairEstimate - inputs.currentSavings, 0);
  const monthsNeeded =
    remaining === 0 ? 0 : Math.ceil(remaining / Math.max(inputs.monthlySavings, 1));

  return {
    summary: `Amount still needed: ${formatCurrency(remaining)}`,
    details: [
      `Repair estimate: ${formatCurrency(inputs.repairEstimate)}`,
      `Current repair savings: ${formatCurrency(inputs.currentSavings)}`,
      `Estimated months to save: ${monthsNeeded}`
    ],
    meaning:
      "This estimate turns a repair quote into a savings target. If the repair is urgent, ask the shop about timing, safety, and payment options before waiting."
  };
}
