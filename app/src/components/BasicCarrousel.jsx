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
    max-width: 90vw;
    padding-left: 8%;
    border-radius: 20px;
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
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
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
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              height={380}
              fontsize={24}
              width={220}
            />
          ))}
      </StyledSlider>
    </StyledCardListWrapper>
  )
}

export default BasicCarrousel
