import styled from 'styled-components'

const FooterWrapper = styled.footer`
  height: 70px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  text-shadow: 0 0 5px #fff, 0 0 20px #49ff18, 0 0 30px #49ff18,
    0 0 40px #49ff18, 0 0 55px #49ff18, 0 0 75px #49ff18,
    2px 2px 2px rgba(206, 89, 55, 0);

  img {
    height: 30px;
  }

  @media screen and (min-width: 660px) and (max-width: 1350px) {
    margin-top: auto;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    margin-top: auto;
  }
`

const Copyright = styled.div`
  p {
    margin: 0;
  }
`

const Linkedin = styled.div`
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  img {
    margin-left: 100px;
  }
`

const Footer = () => (
  <FooterWrapper>
    <Copyright>
      <p>Copyright © Álvaro López</p>
    </Copyright>
    <Linkedin>
      <a
        href="https://www.linkedin.com/in/alvaro-lópez-zarraute"
        target="_blank"
      >
        <img
          src="https://res.cloudinary.com/dbxcsf9hc/image/upload/v1676575054/linkedin-icon-18-256_r1kojb.png"
          alt="LinkedIn"
        />
      </a>
    </Linkedin>
  </FooterWrapper>
)
export default Footer
