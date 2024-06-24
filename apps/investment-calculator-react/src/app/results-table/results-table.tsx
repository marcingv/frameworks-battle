import { formatter, InvestmentRecord } from '@gv-frameworks-battle/investment-calculator-domain';

export function ResultsTable({ data }: { data: InvestmentRecord[] }) {
  function calculateCumulativeInterest(index: number): number {
    if (index < 0) {
      return 0;
    }

    return data.reduce((prev: number, current: InvestmentRecord, currentIndex: number) => {
      if (currentIndex > index) {
        return prev;
      }

      return prev + current.interest;
    }, 0);
  }

  return (
    <table id="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Interest Capital</th>
        </tr>
      </thead>
      <tbody>
        {data.map((record, index) => (
          <tr key={index}>
            <td>{record.year}</td>
            <td>{formatter.format(record.valueEndOfYear)}</td>
            <td>{formatter.format(record.interest)}</td>
            <td>{formatter.format(calculateCumulativeInterest(index))}</td>
            <td>{formatter.format(record.valueEndOfYear - calculateCumulativeInterest(index))}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ResultsTable;
