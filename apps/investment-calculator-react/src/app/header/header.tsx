import logo from '../../../public/investment-calculator-logo.png';

export function Header() {
  return (
    <div id="header">
      <img src={logo} alt="Investment Calculator" />

      <h1>React Investment Calculator</h1>
    </div>
  );
}

export default Header;
