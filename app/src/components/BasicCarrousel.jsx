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

    .slick-slider {
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .slick-arrow {
      display: block;
    }
  }
`
const StyledSlider = styled(Slider)`
  .slick-slide {
    transform: scale(0.6);
  }
`
const BasicCarrousel = ({ movies, onLoadMore }) => {
  const settings = {
    infinite: true,
    lazyLoad: true,
    slidesToShow: 6,
    speed: 500,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          arrows: false,
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
  }
  const handleAfterChange = (index) => {
    if (index + settings.slidesToShow >= movies.length) {
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

export default BasicCarrousel
