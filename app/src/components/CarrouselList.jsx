import Slider from 'react-slick'
import styled from 'styled-components'
import MovieCard from './MovieCard'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const StyledCardListWrapper = styled.div`
  max-width: 90vw;
  .slick-arrow {
    display: none;
  }
  @media (min-width: 600px) {
    max-width: 90%;
    padding: 18px 0;
    margin: auto;
    border-radius: 20px;

    .slick-arrow {
      display: block;
    }
  }
`
const StyledSlider = styled(Slider)`
  .slick-slide {
    filter: blur(1.5px);
    transform: scale(0.6);
    z-index: -1;
  }
  .slick-center {
    filter: blur(0px);
    transform: scale(1);
    z-index: 10;
    position: relative;
  }
`

const CarrouselList = ({ movies }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    lazyLoad: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerPadding: '50px',
    pauseOnHover: true,
    centerMode: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '150px'
        }
      }
    ]
  }

  return (
    <StyledCardListWrapper>
      <StyledSlider {...settings}>
        {movies &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </StyledSlider>
    </StyledCardListWrapper>
  )
}

export default CarrouselList
