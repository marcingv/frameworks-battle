import styled from 'styled-components';
import { InputHTMLAttributes } from 'react';

const Label = styled.label<{ $invalid?: boolean }>`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $invalid }) => ($invalid ? '#f87171' : '#6b7280')};
`;

const Input = styled.input<{ $invalid?: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  color: ${({ $invalid }) => ($invalid ? '#f73f3f' : '#374151')};
  border: 1px solid ${({ $invalid }) => ($invalid ? '#ef4444' : 'transparent')};
  background-color: ${({ $invalid }) => ($invalid ? '#fed2d2' : '#d1d5db')};
`;

export default function LabeledInput({
  label,
  invalid,
  ...props
}: {
  label: string;
  invalid: boolean;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <p>
      <Label $invalid={invalid}>{label}</Label>
      <Input type="email" $invalid={invalid} {...props} />
    </p>
  );
}
