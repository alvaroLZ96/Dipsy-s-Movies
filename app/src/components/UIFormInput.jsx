import styled from 'styled-components'
import { myTheme } from './Theme/Theme'
import { useFormContext, useFormState } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

const ErrorStyled = styled.div`
  color: #ff3300;
  font-size: ${myTheme.fontSizes.xsm};
  margin-top: 5px;
`

const FormControlStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`

const FormLabelStyled = styled.label`
  font-size: ${myTheme.fontSizes.sm};
  color: ${myTheme.colors.label};
  margin-bottom: 0.5rem;
`

const InputStyled = styled.input`
  font-size: ${myTheme.fontSizes.sm};
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid ${myTheme.colors.inputBorder};
`

const UIFormInput = ({
  name,
  label,
  placeholder,
  text,
  validations,
  type,
  defaultValue
}) => {
  const { register } = useFormContext()
  const { errors } = useFormState()

  return (
    <FormControlStyled>
      {label && <FormLabelStyled>{label}</FormLabelStyled>}
      <InputStyled
        {...register(name, validations)}
        placeholder={placeholder}
        value={text}
        type={type}
        defaultValue={defaultValue}
      />
      <ErrorStyled>
        <ErrorMessage errors={errors} name={name} />
      </ErrorStyled>
    </FormControlStyled>
  )
}
export { ErrorStyled }
export default UIFormInput
