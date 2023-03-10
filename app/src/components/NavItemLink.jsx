import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const StyleLink = styled(NavLink)`
  &:hover {
    ${(props) => (props['data-hover'] ? `color: ${props['data-hover']}` : '')}
  }
`
export const NavItemLink = ({ name, href, hoverColor }) => {
  return (
    <StyleLink to={href} data-hover={hoverColor}>
      {name}
    </StyleLink>
  )
}
