import React, { PureComponent } from 'react'
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import LottieView from 'lottie-react-native';
import axios from 'axios';

class App extends PureComponent {
  
  constructor() {
    super();
    this.state = {
      anime: []
    }
   }

   componentDidMount() {
    axios.get('https://api.jikan.moe/v3/search/anime?q=naruto')
    .then(response => this.setState({anime: response.data.results}))
    .catch(error => {
      this.setState({errorMessage: error.message});
      console.error('There was an error!', message);
    });
   }
   
  render () {
    console.log(this.state.anime)
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerText}>Anime List</Text>
        </View>
        
        <View style = {styles.lottieContainer}>
          <LottieView autoPlay loop style = {styles.headerProps} source = {require('../anime_API/assets/naruto.json')}/>
          <LottieView autoPlay loop style = {styles.headerProps} source = {require('../anime_API/assets/naruto.json')}/>
          <LottieView autoPlay loop style = {styles.headerProps} source = {require('../anime_API/assets/naruto.json')}/>
        </View>

          <FlatList
            data={this.state.anime}
            keyExtractor={item => item.mal_id}
            contentContainerStyle={{paddingBottom: 5}}
            ref={(ref) => { this.flatListRef = ref; }}
            renderItem={({item}) => (
            <View style={styles.item}>
              <View style={styles.imageContainer}>
                <Image style={styles.animeImage} source={{uri: item.image_url}}/>
              </View>
                  <Text style={styles.animeTitle}>{item.title}</Text>
                  <Text style={styles.animeDetails}>Type: {item.type}</Text>
                  <Text style={styles.animeDetails}>Episodes: {item.episodes}</Text>
                  <Text style={styles.animeDetails}>Rated: {item.rated} {'\n'}</Text>
                  <Text style={styles.animeDescription}>{'\t'}  {item.synopsis} {'\n'}</Text> 
                  <Text style={styles.animeDetails}>Start Date: {item.start_date}</Text>
                  <Text style={styles.animeDetails}>End Date: {item.end_date} </Text>
            </View>
            )}
          />
      </View>
    )
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#211f1f',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '97%',
    height: 50,
    borderWidth: 4,
    borderColor: '#f2a30b',
    marginTop: 10,
    borderRadius: 10
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#e3e3e3',
    textAlign: 'center'
  },
  lottieContainer: {
    marginTop: 10,
    flexDirection: 'row',
    borderBottomWidth: 5,
    borderColor: '#f2a30b',
  },
  headerProps: {
    width: 120, 
    height: 120, 
    marginBottom: 10
  },
  item: {
    width: '100%', 
    borderBottomWidth: 3, 
    borderColor: '#f2a30b', 
    padding: 10,
  },
  imageContainer: {
    alignItems: 'center', 
    marginTop: 5, 
    marginBottom: 5,
  },
  animeImage: {
    height: 225, 
    width: 225, 
    borderWidth: 5,
    borderColor: '#e4f0f2', 
    borderRadius: 15
  },
  animeTitle: {
    fontSize: 25, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    textDecorationLine: 'underline', 
    color: 'white' ,
    marginBottom: 5
  },
  animeDetails: {
    fontSize: 15, 
    fontWeight: 'bold', 
    color: 'silver'
  },
  animeDescription: {    
    textAlign: 'justify', 
    fontSize: 15, 
    fontWeight: 'bold', 
    color: 'silver'
  }
})