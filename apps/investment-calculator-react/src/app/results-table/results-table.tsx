import {
  calculateTotalInterest,
  formatter,
  InvestmentRecord,
  totalCapitalInvestment,
} from '@gv-frameworks-battle/investment-calculator-domain';

export function ResultsTable({ data }: { data: InvestmentRecord[] }) {
  return (
    <table id="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {data.map((record) => (
          <tr key={record.year}>
            <td>{record.year}</td>
            <td>{formatter.format(record.valueEndOfYear)}</td>
            <td>{formatter.format(record.interest)}</td>
            <td>{formatter.format(calculateTotalInterest(data, record))}</td>
            <td>{formatter.format(totalCapitalInvestment(data, record))}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ResultsTable;
