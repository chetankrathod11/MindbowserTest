import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import AppStyles from '../utils/AppStyles';

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      indicator: false,
      isfavorite: false,
      selectedOptionIndex: false,
      serachFieldVisible: false,
    };
  }

  componentDidMount() {
    this.apiCall();
  }

  apiCall = async () => {
    this.setState({indicator: true});
    let response = await fetch('https://www.breakingbadapi.com/api/characters');
    let responseJson = await response.json();
    console.log('data: ', responseJson);
    this.setState({data: responseJson, indicator: false});
  };

  searchItem = () => {
    return (
      <View>
        <TextInput placeholder="Search Character.." style={styles.input} />
      </View>
    );
  };

  // matchIndex(index, itemId) {
  //   if (index + 1 == itemId) {
  //     this.setState({selectedOptionIndex: true});
  //   }
  // }

  renderItem = (item, index) => {
    // console.log('char ID: ', item.item.char_id);
    return (
      <View style={{margin: 13, top: 25}}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() =>
            this.props.navigation.navigate('Details', {
              image: item.item.img,
              name: item.item.name,
              nickname: item.item.nickname,
              birthday: item.item.birthday,
              occupation: item.item.occupation,
              portrayed: item.item.portrayed,
              appearance: item.item.appearance,
            })
          }>
          <Image
            source={{uri: item.item.img}}
            style={{width: 180, height: 240, borderRadius: 6}}
          />
        </TouchableOpacity>

        <View style={styles.subTextView}>
          <Text style={styles.name}>{item.item.name}</Text>
          <TouchableOpacity
            onPress={() => {
              // this.matchIndex(index, item.item.char_id);
              this.setState({isfavorite: !this.state.isfavorite});
            }}>
            <Image
              source={require('../images/heart.png')}
              style={[
                AppStyles.headerIcons,
                {
                  tintColor: this.state.isfavorite ? 'crimson' : '#707070',
                },
              ]}
            />
          </TouchableOpacity>
        </View>
        <Text style={{fontSize: 14, color: '#fff'}}>{item.item.nickname}</Text>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={AppStyles.container}>
        <StatusBar barStyle="light-content" />

        {/* Header */}
        <View style={AppStyles.headerView}>
          <Text style={AppStyles.headingText}>The Breaking bad</Text>
          <TouchableOpacity
            style={AppStyles.iconsView}
            onPress={() =>
              this.setState({
                serachFieldVisible: !this.state.serachFieldVisible,
              })
            }>
            <Image
              source={require('../images/search.png')}
              style={AppStyles.headerIcons}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Favorites')}
            style={[AppStyles.iconsView, {marginLeft: '5%'}]}>
            <Image
              source={require('../images/heart.png')}
              style={[AppStyles.headerIcons, {tintColor: 'crimson'}]}
            />
          </TouchableOpacity>
        </View>

        {this.state.serachFieldVisible ? this.searchItem() : null}

        {/* Body */}
        {this.state.indicator ? (
          <View style={{marginTop: 300}}>
            <ActivityIndicator size={30} color="crimson" />
          </View>
        ) : (
          <FlatList
            data={this.state.data}
            keyExtractor={(item, index) => item.char_id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={(item, index) => this.renderItem(item, index)}
          />
        )}
      </SafeAreaView>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  subTextView: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    width: 160,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    backgroundColor: 'lightgrey',
    color: '#0B0B0B',
    height: 60,
  },
});
