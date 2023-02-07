import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { API } from '../../services/API'
import Toast from '../../utils/Toast'

const RegisterForm = () => {
  const { handleSubmit, register, errors } = useForm()
  const navigate = useNavigate()

  const onSubmit = (data) => {
    API.post('/users/register', data)
      .then((res) => {
        if (res.data.status === 201 || res.data.status === 200) {
          navigate('/')
          return (
            <Toast title="Usuario registrado correctamente" type="success" />
          )
        }
      })
      .catch(() => {
        return (
          <Toast
            title="No es posible crear la cuenta. Intentalo de nuevo"
            type="error"
          />
        )
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        ref={register({ required: true })}
      />
      {errors.name && <span>Este campo es requerido</span>}

      <input
        type="text"
        name="lastName"
        placeholder="Apellidos"
        ref={register({ required: true })}
      />
      {errors.lastName && <span>Este campo es requerido</span>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        ref={register({ required: true })}
      />
      {errors.email && <span>Este campo es requerido</span>}

      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        ref={register({ required: true })}
      />
      {errors.password && <span>Este campo es requerido</span>}

      <input
        type="date"
        name="birthdate"
        placeholder="Fecha de nacimiento"
        ref={register({ required: true })}
      />
      {errors.birthdate && <span>Este campo es requerido</span>}

      <button type="submit">Registrarse</button>
      <button type="button" onClick={() => navigate('/login')}>
        Ya estoy registrado
      </button>
    </form>
  )
}

export default RegisterForm
