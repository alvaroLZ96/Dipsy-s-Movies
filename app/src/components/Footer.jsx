import styled from 'styled-components'

const FooterWrapper = styled.footer`
  height: 70px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;

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
    margin-left: 10px;
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
          src="https://res.cloudinary.com/dbxcsf9hc/image/upload/v1672784109/linkedin_black_logo_icon_147114_e1swhq.png"
          alt="LinkedIn"
        />
      </a>
    </Linkedin>
  </FooterWrapper>
)
export default Footer
