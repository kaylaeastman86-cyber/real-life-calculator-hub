import assert from "node:assert/strict";
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
} from "../src/lib/calculatorUtils";

const paycheck = calculateHourlyPaycheck({
  hourlyRate: 20,
  hoursPerWeek: 40,
  weeksPerYear: 52,
  estimatedTaxRate: 20
});

assert.equal(paycheck.summary, "Estimated take-home pay: $640.00 per week");
assert.deepEqual(paycheck.details, [
  "Gross weekly pay: $800.00",
  "Estimated monthly take-home pay: $2,773.33",
  "Estimated annual gross pay: $41,600.00"
]);

const overtime = calculateOvertimePay({
  hourlyRate: 20,
  regularHours: 40,
  overtimeHours: 5,
  overtimeMultiplier: 1.5
});

assert.equal(overtime.summary, "Estimated gross pay: $950.00");

const rent = calculateRentAffordability({
  monthlyIncome: 4000,
  monthlyDebt: 300,
  rentRatio: 30
});

assert.equal(rent.summary, "Estimated affordable rent: $1,050.00 per month");

const gas = calculateGasCost({
  milesDriven: 120,
  mpg: 30,
  gasPrice: 3.5,
  parkingTolls: 10
});

assert.equal(gas.summary, "Estimated trip cost: $24.00");
assert.deepEqual(gas.details, [
  "Estimated fuel needed: 4 gallons",
  "Fuel cost before parking or tolls: $14.00",
  "Parking and tolls added: $10.00"
]);

const grocery = calculateGroceryBudget({
  people: 2,
  weeklySpend: 180,
  targetWeeklySpend: 150
});

assert.equal(grocery.summary, "Target grocery budget: $650.00 per month");

const emergency = calculateEmergencyFund({
  monthlyEssentials: 2500,
  monthsCovered: 3,
  currentSavings: 1000
});

assert.equal(emergency.summary, "Emergency fund target: $7,500.00");

const moveOut = calculateMoveOutCost({
  rent: 1200,
  deposit: 1200,
  movingCosts: 400,
  utilitySetup: 200,
  furnitureBasics: 600
});

assert.equal(moveOut.summary, "Estimated move-out cash needed: $3,600.00");

const debt = calculateDebtPayoff({
  balance: 1000,
  apr: 12,
  monthlyPayment: 100
});

assert.equal(debt.summary, "Estimated payoff time: 11 months");

const sideHustle = calculateSideHustleProfit({
  revenue: 1000,
  expenses: 250,
  hoursWorked: 30,
  estimatedTaxRate: 20
});

assert.equal(sideHustle.summary, "Estimated net profit: $600.00");

const repair = calculateCarRepairBudget({
  repairEstimate: 900,
  currentSavings: 250,
  monthlySavings: 200
});

assert.equal(repair.summary, "Amount still needed: $650.00");

console.log("Calculator formula checks passed.");
