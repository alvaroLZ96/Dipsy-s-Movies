const Login = () => {
  return <div>Login</div>
}

export default Login

/* import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [eye, setEye] = useState(false)
  const navigate = useNavigate()
  const toggleEye = (ev) => {
    ev.preventDefault()
    setEye(!eye)
  }
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm()

  const onFormSubmit = (values) => {
    navigate(`/dashboard/miacademia/estudiantes`)
  }

  return (
    <div className="loginContainer">
      <div className="loginPage">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="ucademyDiv">
            <img src="" alt="Logo" />
          </div>
          <div className="alignCenter ">
            <span className="red">*</span>
            <span>Email</span>
          </div>
          <div className="alignCenter inputBox">
            <label className="userlabel">
              <input
                className="input"
                {...register('username', {
                  required: true,
                  minLength: 2
                })}
                type="text"
              />
              {errors.username ? (
                <p className="error">
                  Este campo es requerido y debe tener al menos 2 caracteres
                </p>
              ) : null}
            </label>
          </div>
          <div className="alignCenter password">
            <label className="passwordDiv">
              <div>
                <span className="red">*</span>
                <span>Contraseña:</span>
              </div>
              <div className="inputBox">
                <label>
                  <button
                    className="passwordBtn"
                    onClick={(ev) => toggleEye(ev)}
                  >
                    {eye ? <BsEyeSlash /> : <BsEye />}
                  </button>
                  <input
                    className="input"
                    {...register('Contraseña', {
                      required: true,
                      minLength: 6,
                      pattern: /^\S*$/,
                      validate: {
                        format: (Contraseña) => {
                          return (
                            /[A-Z]/g.test(Contraseña) &&
                            /[a-z]/g.test(Contraseña) &&
                            /[0-9]/g.test(Contraseña)
                          )
                        }
                      }
                    })}
                    placeholder="*****"
                    type={eye ? 'text' : 'password'}
                  />

                  {errors.Contraseña ? (
                    <p className="error">
                      {errors.Contraseña.type === 'format'
                        ? 'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
                        : 'Este campo es requerido y debe tener al menos 6 caracteres'}
                    </p>
                  ) : null}
                </label>
              </div>
            </label>
          </div>
          <div className="alignCenter checkBox">
            <label>
              <input
                type="checkbox"
                {...register('remember', {
                  validate: true
                })}
              />
              <span>Remember me</span>
            </label>
            <div>
              <a
                href="https://www.figma.com/file/n7HkjhcVD6dZISm9fu5FNG/Prueba-T%C3%A9cnica?node-id=0%3A1"
                style={{ textDecoration: 'none' }}
                className="forget"
              >
                Olvidé mi contraseña
              </a>
            </div>
          </div>

          <button className="btn" type="submit">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
 */
