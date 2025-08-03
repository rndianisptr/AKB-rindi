import React, { useState } from 'react';
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

// Fungsi untuk menghasilkan daftar gambar
const generateImageList = () => {
  const prefixNIM = '10584110';
  const suffixNIM = '22';
  const baseImage = 'https://simak.unismuh.ac.id/upload/mahasiswa/';
  const imageQuery = '_.jpg?1751871539';
  const altImage =
    'https://uploads-us-west-2.insided.com/figma-en/attachment/7105e9c010b3d1f0ea893ed5ca3bd58e6cec090e.gif';

  const imageList: { main: string; alt: string }[] = [];

  for (let num = 40; num <= 49; num++) {
    const nim = `${prefixNIM}${num}${suffixNIM}`;
    imageList.push({
      main: `${baseImage}${nim}${imageQuery}`,
      alt: altImage,
    });
  }

  return imageList;
};

const imagePairs = generateImageList();

export default function MahasiswaGrid3x3() {
  const [imageStates, setImageStates] = useState(
    imagePairs.map(() => ({ scale: 1, isAlt: false }))
  );

  const handleImagePress = (idx: number) => {
    setImageStates((prevState) =>
      prevState.map((state, i) => {
        if (i !== idx) return state;
        return {
          scale: state.scale < 1.8 ? state.scale * 1.2 : 1.8,
          isAlt: !state.isAlt,
        };
      })
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        {imagePairs.map((item, idx) => (
          <Pressable key={idx} onPress={() => handleImagePress(idx)}>
            <View style={styles.imageWrapper}>
              <Image
                source={{
                  uri: imageStates[idx].isAlt ? item.alt : item.main,
                }}
                style={[
                  styles.image,
                  {
                    transform: [{ scale: imageStates[idx].scale }],
                  },
                ]}
              />
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eef5ff', // biru lembut
    paddingVertical: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  imageWrapper: {
    width: windowWidth / 3 - 10,  // 3 kolom
    height: windowWidth / 3 - 10, // 3 baris per layar penuh
    margin: 5,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#6ab7ff',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
