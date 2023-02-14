import styled from 'styled-components'
import { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 100px;
  background-image: url('https://www.transparenttextures.com/patterns/cartographer.png');
  color: #fff;
`
const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`
const Logo = styled.img`
  height: 100px;
`
const Title = styled.h1`
  @import url('https://fonts.googleapis.com/css2?family=Julee&display=swap');
  font-size: 38px;
  text-shadow: 2px 2px 2px #6ece00;
  margin: 0;
  font-family: 'Julee', cursive;
`
const UserDiv = styled.div`
  margin-left: 50px;
`
const UserInfo = styled.p`
  margin-bottom: 0.5rem;
  font-size: 18px;
  text-align: center;
`

const LogoutButton = styled.button`
  height: fit-content;
  padding: 0.5rem 0.8rem;
  font-weight: 700;
  background: rgb(255, 255, 255);
  color: blueviolet;
  border-radius: 0.5rem;
  border-bottom: 2px solid blueviolet;
  border-right: 2px solid blueviolet;
  border-top: 2px solid white;
  border-left: 2px solid white;
  transition-duration: 0.2s;
  transition-property: border-top, border-left, border-bottom, border-right,
    box-shadow;

  :hover {
    border-top: 2px solid blueviolet;
    border-left: 2px solid blueviolet;
    border-bottom: 2px solid rgb(238, 103, 238);
    border-right: 2px solid rgb(238, 103, 238);
    box-shadow: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 8px 8px,
      rgba(240, 46, 170, 0.2) 5px 5px;
  }
`

const Header = () => {
  const { user, logout } = useContext(GlobalContext)
  const navigate = useNavigate()

  return (
    <Container>
      <LogoDiv>
        <Logo
          src="https://res.cloudinary.com/dbxcsf9hc/image/upload/v1676285552/Image-398660_xfalzn.png"
          alt="logo"
        />
        <Title>Dipsy's Movies</Title>
      </LogoDiv>
      <UserDiv>
        <UserInfo>Hola {user?.name}!</UserInfo>
        <LogoutButton onClick={() => logout() & navigate('/login')}>
          Cerrar sesión
        </LogoutButton>
      </UserDiv>
    </Container>
  )
}

export default Header
