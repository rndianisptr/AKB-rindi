import React, { useState, useRef } from 'react';
import {
  View,
  Animated,
  Pressable,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

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
  const [isAltList, setIsAltList] = useState(imagePairs.map(() => false));
  const scales = useRef(imagePairs.map(() => new Animated.Value(1))).current;
  const [scaleValues, setScaleValues] = useState(imagePairs.map(() => 1));

  const handleImagePress = (idx: number) => {
    const currentScale = scaleValues[idx];
    // Skala baru, maksimum 2x
    const newScale = Math.min(currentScale + 0.2, 2); // bisa klik beberapa kali sampai 2x

    // Jalankan animasi ke skala baru
    Animated.spring(scales[idx], {
      toValue: newScale,
      friction: 5,
      useNativeDriver: true,
    }).start();

    // Update skala terakhir
    setScaleValues((prev) =>
      prev.map((val, i) => (i === idx ? newScale : val))
    );

    // Toggle gambar alternatif
    setIsAltList((prev) =>
      prev.map((item, i) => (i === idx ? !item : item))
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        {imagePairs.map((item, idx) => (
          <Pressable key={idx} onPress={() => handleImagePress(idx)}>
            <View style={styles.imageWrapper}>
              <Animated.Image
                source={{ uri: isAltList[idx] ? item.alt : item.main }}
                style={[
                  styles.image,
                  {
                    transform: [{ scale: scales[idx] }],
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
    backgroundColor: '#eef5ff',
    paddingVertical: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  imageWrapper: {
    width: windowWidth / 3 - 10,
    height: windowWidth / 3 - 10,
    margin: 5,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6ab7ff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
