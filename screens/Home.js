import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  getFamilyMovies,
  getPopularMovies,
  getPopularTv,
  getUpcomingMovies,
  getDocumentaryMovies,
} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import react from 'react';
import List from '../components/List';
import Error from '../components/Error';

const dimentions = Dimensions.get('screen');
const Home = () => {
  //   console.log(dimentions);
  const [movieImages, setMovieImages] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [popularTv, setPopularTv] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [documentaryMovies, setDocumentaryMovies] = useState();
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTv(),
      getFamilyMovies(),
      getDocumentaryMovies(),
    ]);
  };

  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularTvData,
          familyMoviesData,
          DocumentaryMoviesData,
        ]) => {
          const moviesImagesArray = [];
          upcomingMoviesData.forEach(movie => {
            moviesImagesArray.push(
              'https://image.tmdb.org/t/p/w500/' + movie.poster_path,
            );
          });
          setMovieImages(moviesImagesArray);
          setPopularMovies(popularMoviesData);
          setPopularTv(popularTvData);
          setFamilyMovies(familyMoviesData);
          setDocumentaryMovies(DocumentaryMoviesData);
        },
      )
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  return (
    <react.Fragment>
      {loaded && !error && (
        <ScrollView>
          {movieImages && (
            <View style={styles.sliderContainer}>
              <SliderBox
                images={movieImages}
                dotStyle={styles.sliderStyle}
                sliderBoxHeight={dimentions.height / 1.5}
                autoplay={true}
                circleLoop={true}
              />
            </View>
          )}

          {/* {Popular Movies} */}
          {popularMovies && (
            <View style={styles.carousel}>
              <List title={'Popular Movies'} content={popularMovies} />
            </View>
          )}

          {/* {Popular Tv Shows} */}
          {popularTv && (
            <View style={styles.carousel}>
              <List title={'Popular Tv Shows'} content={popularTv} />
            </View>
          )}

          {/* {Family Movies} */}
          {familyMovies && (
            <View style={styles.carousel}>
              <List title={'Family Movies'} content={familyMovies} />
            </View>
          )}

          {/* {Documentary Movies} */}
          {documentaryMovies && (
            <View style={styles.carousel}>
              <List title={'Documentary Movies'} content={documentaryMovies} />
            </View>
          )}
        </ScrollView>
      )}
      {!loaded && <ActivityIndicator size="large" />}
      {error && <Error />}
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
