import styled from 'styled-components';

const Button = styled.button`
  cursor: pointer;
  line-height: inherit;
  padding: 1rem 2rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #1f2937;
  background: #f0b322;
  border-radius: 6px;
  border: none;

  &:hover {
    background-color: #f0920e;
    outline: none;
  }
`;

export default Button;
