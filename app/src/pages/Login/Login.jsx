import { useState, useContext } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import Toast from '../../utils/Toast'
import { API } from '../../services/API'
import GlobalContext from '../../context/GlobalContext'
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

const LogoDiv = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`

const Logo = styled.img`
  width: 100px;
`

const AlignCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0;
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
    top: 22px;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #333;
  }
`

const CheckBox = styled(AlignCenter)`
  display: flex;
  width: 300px;
  justify-content: flex-start;
  align-items: flex-start;

  span {
    margin-left: 10px;
    font-size: 12px;
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

const Login = () => {
  const { setJwt, setUser, setIsLogged } = useContext(GlobalContext)
  const methods = useForm()
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const toggleShow = (ev) => {
    ev.preventDefault()
    setShow(!show)
  }
  const storedEmail = localStorage.getItem('email')

  const onFormSubmit = (data) => {
    const { remember } = methods.watch()
    API.post('/users/login', data)
      .then((res) => {
        if (res.data.status === 200) {
          if (remember) {
            localStorage.setItem('email', data.email)
          }
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('user', JSON.stringify(res.data.user))
          setJwt(res.data.token)
          setUser(res.data.user)
          setIsLogged(true)
          navigate('/')
        }
      })
      .catch(() => {
        return (
          <Toast
            title="No es posible iniciar sesión. Intentalo de nuevo"
            type="error"
          />
        )
      })
  }

  return (
    <FormContainer>
      <MainDiv>
        <LogoDiv>
          <Logo
            src="https://res.cloudinary.com/dbxcsf9hc/image/upload/v1675788468/dipsy_wanq24.png"
            alt="Logo"
          />
        </LogoDiv>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onFormSubmit)}>
            <InputBox>
              <UIFormInput
                name="email"
                placeholder="Email"
                defaultValue={storedEmail || ''}
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
                name="password"
                type={show ? 'text' : 'password'}
                placeholder="******"
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
            <CheckBox>
              <div>
                <UIFormInput name="remember" type="checkbox" />
              </div>
              <span>Remember me</span>
            </CheckBox>
            <SubmitButton type="submit">Iniciar sesión</SubmitButton>
            <ExistingDiv>
              Si no tienes cuenta puedes registrarte{' '}
              <NavItemLink
                name="aquí"
                href="/register"
                hoverColor={myTheme.colors.primary}
              />
            </ExistingDiv>
          </Form>
        </FormProvider>
      </MainDiv>
    </FormContainer>
  )
}

/* return (
    <div className="loginContainer">
      <div className="loginPage">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onFormSubmit)}>
            <div className="LogoDiv">
              <img src="https://res.cloudinary.com/dbxcsf9hc/image/upload/v1675788468/dipsy_wanq24.png" alt="Logo" />
            </div>
            <div className="alignCenter inputBox">
              <UIFormInput
                name="email"
                placeholder="Email"
                defaultValue={storedEmail || ''}
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
            </div>
            <div className="alignCenter password">
              <UIFormInput
                name="password"
                type={show ? 'text' : 'password'}
                placeholder="******"
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
            </div>
            <div className="alignCenter checkBox">
              <div>
                <UIFormInput name="remember" type="checkbox" />
                <span>Remember me</span>
              </div>
              
            </div>
            <div>
              <button className="btn" type="submit">
                Iniciar sesión
              </button>
            </div>
            <div>
              <p>
                Si no tienes cuenta puedes registrarte{' '}
                <NavItemLink
                  name="aquí"
                  href="/register"
                  hoverColor={myTheme.colors.primary}
                />
              </p>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  ) */

export default Login
