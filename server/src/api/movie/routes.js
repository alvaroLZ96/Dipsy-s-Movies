const MoviesRoutes = require('express').Router();

const { getPopular, getNow, getCredits } = require('./controller');
const { isAuth } = require('../../middlewares/auth');

MoviesRoutes.get('/now-playing', [isAuth], getNow);
MoviesRoutes.get('/popular', [isAuth], getPopular);
MoviesRoutes.get('/:movie_id', [isAuth], getCredits);

module.exports = MoviesRoutes;
