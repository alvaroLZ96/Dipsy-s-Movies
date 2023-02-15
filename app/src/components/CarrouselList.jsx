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
    padding-bottom: 15px;
    margin: auto;
    border-radius: 20px;

    .slick-arrow {
      display: block;
    }
  }
  & .card {
    margin: 10px;
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

const CarrouselList = ({ movies, onLoadMore }) => {
  const settings = {
    infinite: true,
    speed: 500,
    lazyLoad: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: false, ///////quitar al falseeeeeeeeeeeeee
    autoplaySpeed: 2200,
    centerPadding: '50px',
    pauseOnHover: true,
    centerMode: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '150px'
        }
      }
    ]
  }

  const handleAfterChange = (index) => {
    if (movies.length > 0 && index === movies.length - 1) {
      onLoadMore()
    }
  }

  return (
    <StyledCardListWrapper>
      <StyledSlider {...settings} afterChange={handleAfterChange}>
        {movies &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </StyledSlider>
    </StyledCardListWrapper>
  )
}

export default CarrouselList
