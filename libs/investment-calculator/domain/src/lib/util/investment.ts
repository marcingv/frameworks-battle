// This function expects a JS object as an argument
// The object should contain the following properties
// - initialInvestment: The initial investment amount
// - annualInvestment: The amount invested every year
// - expectedReturn: The expected (annual) rate of return
// - duration: The investment duration (time frame)
import { CalcParams, InvestmentRecord } from '../types';

export function calculateInvestmentResults({
  initialInvestment,
  annualInvestment,
  expectedReturn,
  duration,
}: CalcParams): InvestmentRecord[] {
  const annualData: InvestmentRecord[] = [];
  let investmentValue = initialInvestment;

  for (let i = 0; i < duration; i++) {
    const interestEarnedInYear = investmentValue * (expectedReturn / 100);
    investmentValue += interestEarnedInYear + annualInvestment;
    annualData.push({
      year: i + 1, // year identifier
      interest: interestEarnedInYear, // the amount of interest earned in this year
      valueEndOfYear: investmentValue, // investment value at end of year
      annualInvestment: annualInvestment, // investment added in this year
    });
  }

  return annualData;
}

export function calculateInitialInvestment(records: InvestmentRecord[]): number {
  if (!records.length) {
    return 0;
  }

  return records[0].valueEndOfYear - records[0].interest - records[0].annualInvestment;
}

export function calculateTotalInterest(data: InvestmentRecord[], currentYear: InvestmentRecord): number {
  return (
    currentYear.valueEndOfYear - currentYear.annualInvestment * currentYear.year - calculateInitialInvestment(data)
  );
}

export function totalCapitalInvestment(data: InvestmentRecord[], currentYear: InvestmentRecord): number {
  return currentYear.valueEndOfYear - calculateTotalInterest(data, currentYear);
}

// The browser-provided Intl API is used to prepare a formatter object
// This object offers a "format()" method that can be used to format numbers as currency
// Example Usage: formatter.format(1000) => yields "$1,000"
export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
