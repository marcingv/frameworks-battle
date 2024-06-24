export function CalcForm() {
  return (
    <div id="user-input">
      <div className="input-group">
        <div>
          <label>Initial Investment</label>
          <input type="number" required />
        </div>

        <div>
          <label>Annual Investment</label>
          <input type="number" required />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label>Expected Return</label>
          <input type="number" required />
        </div>

        <div>
          <label>Duration</label>
          <input type="number" required />
        </div>
      </div>
    </div>
  );
}

export default CalcForm;
