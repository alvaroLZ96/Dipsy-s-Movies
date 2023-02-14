import { useState, useContext } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import Toast from '../../utils/Toast'
import { API } from '../../services/API'
import UIFormInput from '../../components/UIFormInput'
import { NavItemLink } from '../../components/NavItemLink'
import { myTheme } from '../../components/Theme/Theme'
import styled from 'styled-components'

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const MainDiv = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

const AlignCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const InputBox = styled(AlignCenter)`
  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 300px;
  }
`

const Password = styled(AlignCenter)`
  position: relative;

  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 300px;
  }

  button {
    position: absolute;
    right: 10px;
    top: 50px;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #333;
  }
`
const SubmitButton = styled.button`
  margin-bottom: 2rem;
  padding: 1rem 2rem;
  font-weight: 700;
  background: rgb(255, 255, 255);
  color: blueviolet;
  border-radius: 0.5rem;
  border-bottom: 2px solid blueviolet;
  border-right: 2px solid blueviolet;
  border-top: 2px solid white;
  border-left: 2px solid white;
  transition-duration: 0.3s;
  transition-property: border-top, border-left, border-bottom, border-right,
    box-shadow;

  :hover {
    border-top: 2px solid blueviolet;
    border-left: 2px solid blueviolet;
    border-bottom: 2px solid rgb(238, 103, 238);
    border-right: 2px solid rgb(238, 103, 238);
    box-shadow: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 8px 8px,
      rgba(240, 46, 170, 0.2) 10px 10px;
  }
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ExistingDiv = styled.div`
  font-size: 12px;
`

const Register = () => {
  const navigate = useNavigate()
  const methods = useForm()
  const [show, setShow] = useState(false)
  const toggleShow = (ev) => {
    ev.preventDefault()
    setShow(!show)
  }

  const [toast, setToast] = useState(null)

  const onSubmit = (data) => {
    API.post('/users/register', data)
      .then((res) => {
        if (res.data.status === 201 || res.data.status === 200) {
          navigate('/login')
          setToast(
            <Toast title="Usuario registrado correctamente" type="success" />
          )
        }
      })
      .catch(() => {
        setToast(
          <Toast
            title="No es posible crear la cuenta. Intentalo de nuevo"
            type="error"
          />
        )
      })
  }

  return (
    <FormContainer>
      {toast}
      <MainDiv>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            <InputBox>
              <UIFormInput
                label="Nombre"
                name="name"
                validations={{
                  required: 'Este campo es requerido'
                }}
              />
            </InputBox>
            <InputBox>
              <UIFormInput
                label="Apellidos"
                name="surname"
                validations={{
                  required: 'Este campo es requerido'
                }}
              />
            </InputBox>
            <InputBox>
              <UIFormInput
                label="Email"
                name="email"
                validations={{
                  required: 'Este campo es requerido',
                  minLength: {
                    value: 2,
                    message: 'Necesita un minimo de 2 caracteres'
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Dirección de e-mail incorrecta'
                  }
                }}
              />
            </InputBox>
            <Password>
              <UIFormInput
                label="Contraseña"
                name="password"
                type={show ? 'text' : 'password'}
                validations={{
                  required: 'Este campo es requerido',
                  minLength: {
                    value: 6,
                    message: 'Este campo debe tener al menos 6 caracteres'
                  },
                  pattern: {
                    value: /^\S*$/,
                    message: 'El formato no es correcto'
                  },
                  validate: {
                    format: (password) => {
                      return (
                        (/[A-Z]/g.test(password) &&
                          /[a-z]/g.test(password) &&
                          /[0-9]/g.test(password)) ||
                        'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
                      )
                    }
                  }
                }}
              />
              <button className="passwordBtn" onClick={(ev) => toggleShow(ev)}>
                {show ? <BsEyeSlash /> : <BsEye />}
              </button>
            </Password>
            <InputBox>
              <UIFormInput
                label="Feacha de nacimiento"
                name="birthdate"
                type="date"
                validations={{
                  required: 'Este campo es requerido'
                }}
              />
            </InputBox>
            <SubmitButton type="submit">Registrarse</SubmitButton>
            <ExistingDiv>
              Si ya tienes cuenta puedes entrar{' '}
              <NavItemLink
                name="aquí"
                href="/login"
                hoverColor={myTheme.colors.primary}
              />
            </ExistingDiv>
          </Form>
        </FormProvider>
      </MainDiv>
    </FormContainer>
  )
}

export default Register
