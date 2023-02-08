const axios = require('axios');

const getNow = async (req, res, next) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}&language=es-ES`
    );
    const nowMovies = response.data.results;
    res.json({
      success: true,
      status: 200,
      data: nowMovies,
    });
  } catch (err) {
    return next(setError(500, 'Fail to recover movies'));
  }
};
const getPopular = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=es-ES`
    );
    const popularMovies = response.data.results;
    res.json({
      success: true,
      status: 200,
      data: popularMovies,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Fail to recover movies' });
  }
};

const getCredits = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${req.params.movie_id}/credits?api_key=${process.env.API_KEY}&language=es-ES`
    );

    return res.json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Fail to recover movie' });
  }
};

module.exports = {
  getNow,
  getPopular,
  getCredits,
};
