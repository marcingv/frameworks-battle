import { CalcParams } from '@gv-frameworks-battle/investment-calculator-domain';

export function CalcForm({
  params,
  paramsChanged,
}: {
  params: CalcParams | null;
  paramsChanged: ((params: CalcParams) => void) | undefined;
}) {
  const userInput: Partial<CalcParams> = { ...(params ?? {}) };

  function handleInputChange(param: keyof CalcParams, newValue: number): void {
    const newUserInput = {
      ...userInput,
      [param]: newValue,
    };

    const params: CalcParams = newUserInput as CalcParams;
    if (paramsChanged) {
      paramsChanged(params);
    }
  }

  return (
    <div id="user-input">
      <div className="input-group">
        <div>
          <label>Initial Investment</label>
          <input
            type="number"
            min={0}
            required
            value={userInput.initialInvestment ?? ''}
            onChange={(e) => handleInputChange('initialInvestment', +e.target.value)}
          />
        </div>

        <div>
          <label>Annual Investment</label>
          <input
            type="number"
            min={0}
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
            min={0}
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

          {userInput.duration !== undefined && userInput.duration < 1 ? (
            <small>Duration has to be greater than 0.</small>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default CalcForm;
