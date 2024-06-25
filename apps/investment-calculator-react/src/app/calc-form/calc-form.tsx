import { CalcParams } from '@gv-frameworks-battle/investment-calculator-domain';

export function CalcForm({
  userInput = {},
  onUserInputChange,
}: {
  userInput: Partial<CalcParams>;
  onUserInputChange?: (params: Partial<CalcParams>) => void;
}) {
  function handleInputChange(param: keyof CalcParams, newValue: number): void {
    const newUserInput = {
      ...userInput,
      [param]: newValue,
    };

    if (onUserInputChange) {
      onUserInputChange(newUserInput);
    }
  }

  return (
    <div id="user-input">
      <div className="input-group">
        <div>
          <label>Initial Investment</label>
          <input
            type="number"
            required
            value={userInput.initialInvestment ?? ''}
            onChange={(e) => handleInputChange('initialInvestment', +e.target.value)}
          />
        </div>

        <div>
          <label>Annual Investment</label>
          <input
            type="number"
            required
            value={userInput.annualInvestment ?? ''}
            onChange={(e) => handleInputChange('annualInvestment', +e.target.value)}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label>Expected Return</label>
          <input
            type="number"
            required
            value={userInput.expectedReturn ?? ''}
            onChange={(e) => handleInputChange('expectedReturn', +e.target.value)}
          />
        </div>

        <div>
          <label>Duration</label>
          <input
            type="number"
            min={0}
            required
            value={userInput.duration ?? ''}
            onChange={(e) => handleInputChange('duration', +e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default CalcForm;
