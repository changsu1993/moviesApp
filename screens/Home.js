import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {
  getFamilyMovies,
  getPopularMovies,
  getPopularTv,
  getUpcomingMovies,
  getDocumentary,
} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import react from 'react';
import List from '../components/List';

const dimentions = Dimensions.get('screen');
const Home = () => {
  console.log(dimentions);
  const [popularMovies, setPopularMovies] = useState('');
  const [Documentary, setDocumentary] = useState('');
  const [familyMovies, setFamilyMovies] = useState('');
  const [popularTv, setPopularTv] = useState('');
  const [movieImages, setMovieImages] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getUpcomingMovies()
      .then(movies => {
        const moviesImagesArray = [];
        movies.forEach(movie => {
          moviesImagesArray.push(
            'https://image.tmdb.org/t/p/w500/' + movie.poster_path,
          );
        });
        setMovieImages(moviesImagesArray);
      })
      .catch(err => {
        setError(err);
      });

    getPopularMovies()
      .then(movies => {
        setPopularMovies(movies);
      })
      .catch(err => {
        setError(err);
      });

    getPopularTv()
      .then(movies => {
        setPopularTv(movies);
      })
      .catch(err => {
        setError(err);
      });

    getFamilyMovies()
      .then(movies => {
        setFamilyMovies(movies);
      })
      .catch(err => {
        setError(err);
      });

    getDocumentary()
      .then(movies => {
        setDocumentary(movies);
      })
      .catch(err => {
        setError(err);
      });
  }, []);

  return (
    <react.Fragment>
      <ScrollView>
        <View style={styles.sliderContainer}>
          <SliderBox
            images={movieImages}
            dotStyle={styles.sliderStyle}
            sliderBoxHeight={dimentions.height / 1.5}
            autoplay={true}
            circleLoop={true}
          />
        </View>
        <View style={styles.carousel}>
          <List title={'Popular Movies'} content={popularMovies} />
        </View>
        <View style={styles.carousel}>
          <List title={'Popular Tv Shows'} content={popularTv} />
        </View>
        <View style={styles.carousel}>
          <List title={'Family Movies'} content={familyMovies} />
        </View>
        <View style={styles.carousel}>
          <List title={'Documentary Movies'} content={Documentary} />
        </View>
      </ScrollView>
    </react.Fragment>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    height: 0,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
