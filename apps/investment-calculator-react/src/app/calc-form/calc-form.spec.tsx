import { render } from '@testing-library/react';

import CalcForm from './calc-form';

describe('CalcForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CalcForm />);
    expect(baseElement).toBeTruthy();
  });
});
