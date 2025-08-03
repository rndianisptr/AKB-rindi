import React, { useState, useRef } from 'react';
import {
  View,
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

// Mengambil ukuran layar
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

// Data gambar
const imagePairs = generateImageList();

export default function MahasiswaGrid3x3() {
  // State untuk menyimpan kondisi alternatif tiap gambar
  const [isAltList, setIsAltList] = useState(imagePairs.map(() => false));

  // Animated value untuk setiap gambar
  const scales = useRef(imagePairs.map(() => new Animated.Value(1))).current;

  // Fungsi untuk menangani klik pada gambar
  const handleImagePress = (idx: number) => {
    // Animasi scaling hingga 2x
    Animated.sequence([
      Animated.spring(scales[idx], {
        toValue: 2,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.spring(scales[idx], {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

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
    backgroundColor: '#eef5ff', // Background biru lembut
    paddingVertical: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  imageWrapper: {
    width: windowWidth / 3 - 10, // 3 kolom
    height: windowWidth / 3 - 10, // 3 baris per layar
    margin: 5,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',

    // Efek border & shadow
    borderWidth: 2,
    borderColor: '#6ab7ff', // Border biru
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
