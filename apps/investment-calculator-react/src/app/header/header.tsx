import headerImg from '../../assets/investment-calculator-logo.png';

export function Header() {
  return (
    <div id="header">
      <img src={headerImg} alt="Investment Calculator" />

      <h1>React Investment Calculator</h1>
    </div>
  );
}

export default Header;
