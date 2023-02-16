import Slider from 'react-slick'
import styled from 'styled-components'
import MovieCard from './MovieCard'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const StyledCardListWrapper = styled.div`
  max-width: 90vw;
  padding-right: 10px;

  @media (min-width: 600px) {
    max-width: 90vw;
    padding-bottom: 15px;
    margin: auto;
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
    className: 'center',
    infinite: true,
    speed: 500,
    lazyLoad: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false, ///////quitar al falseeeeeeeeeeeeee
    autoplaySpeed: 2200,
    centerPadding: '100px',
    pauseOnHover: true,
    centerMode: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerPadding: '100px'
        }
      },
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
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              height={330}
              fontsize={14}
              width={200}
            />
          ))}
      </StyledSlider>
    </StyledCardListWrapper>
  )
}

export default CarrouselList
