import { render } from '@testing-library/react';

import ResultsTable from './results-table';

describe('ResultsTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ResultsTable />);
    expect(baseElement).toBeTruthy();
  });
});
