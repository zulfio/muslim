import axios from 'axios';
import { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Button, Pressable, RefreshControl } from 'react-native';
import { useQuery } from 'react-query';
import { useRootStore } from '../../../model/root';
import Loading from '../../loading/Loading';
import Error from '../error/Error';

const Surah = ({ route, navigation }: any) => {

  const { index, nameAr } = route.params;
  const root = useRootStore();

  const { data, isFetching, error } = useQuery("surahDetails", async () => {
    const response = await axios.get(`https://raw.githubusercontent.com/semarketir/quranjson/master/source/surah/surah_${ index }.json`);
    return response?.data
  })

  useEffect((): any => {
    navigation.setOptions({
        title: " سورة" + nameAr ,
        headerTitleStyle:{
          color: '#0B2239',
          fontFamily: 'Amiri',
          fontSize: 24,
          fontWeight: '200',
        },
        headerTintColor: '#0B2239',
        headerLeft: () => (
          <TouchableOpacity style={styles.headerBtn} onPress={ () => navigation.goBack() } >
            <Image style={styles.icon} source={require('../../../assets/back.png')} />
          </TouchableOpacity>
        )
     });
  },[])

  if (isFetching) return <Loading size={70} />
  if (error) return <Error />;

  const ayahs: string[] = Object.values(data?.verse)

  return (
    <View style={ styles.container }>
      <ScrollView style={ styles.surah } >
        <View style={styles.spacer}></View>
        {
          <Text style={[ styles.text , { fontSize: root.fontSize } ]} >
            {
              ayahs.map((item:string) => (
                <Text key={ Math.random() } style={ styles.ayahText } >
                  { item } &nbsp;{ "\u06DD" }&nbsp;
                </Text>
              ))
            }
          </Text>
        }
        <View style={styles.spacer}></View>
      </ScrollView>
      <View style={ styles.bottomBar}>
        <Text style={styles.text}> { data?.name } </Text>
        <Text style={styles.text}> { data?.count } </Text>
        <Text style={styles.text}> { nameAr } </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  surah: {
    backgroundColor: '#0B2239',
    width: '100%',
    height: '85%',
    alignContent: 'center',
    paddingBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 10
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
    color: '#ffffff',
    fontFamily: 'Amiri'
  },
  ayahText: {
    fontFamily: 'Amiri',
    lineHeight: 50
  },
  ayah: {
    fontWeight: 'bold',
    color: '#ffffff',
    borderRadius: 50,
    padding: 2,
    textAlign: 'center',
    marginHorizontal: 130,
    marginVertical: 5
  },
  bottomBar: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#0B2239',
    flexDirection: 'row',
    color: '#0B2239',
    marginTop: 5,
    paddingBottom: 10,
    fontSize: 16,
    borderRadius: 50
  },
  headerBtn: {
    marginRight: 20,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'stretch'
  },
  spacer: {
    height: 30
  },
  play: {
    fontSize: 25,
    color: 'white',
    borderColor: 'white',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 50,
    paddingHorizontal: 7,
    paddingVertical: 3,
    textAlign: 'center',
  }
});

export default Surah