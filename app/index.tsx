// app/index.tsx
import { Image, ScrollView, Text, View, StyleSheet } from "react-native";

// Data Mahasiswa
const daftarMahasiswa = [
  { nama: "ALVIAN SYAH BURHANI", nim: "105841103522" },
  { nama: "MAJERI", nim: "105841103622" },
  { nama: "HAMDANI", nim: "105841103722" },
  { nama: "MULIANA", nim: "105841103822" },
  { nama: "SULTAN ALWI MAULANA H", nim: "105841103922" },
  { nama: "RINDIANI SAPUTRI", nim: "105841104022" },
  { nama: "SELFIRA AYU SAFITRI", nim: "105841104122" },
  { nama: "ALIF RYANTO RAHMAN", nim: "105841104222" },
  { nama: "ERIKA YANTI", nim: "105841104322" },
  { nama: "ZULKIFLI", nim: "105841104422" },
  { nama: "FIFIANA", nim: "105841104522" },
];

const nimSaya = "105841104022";

// Ambil data sekitar
function ambilDataSekitar(nimTarget: string, data: typeof daftarMahasiswa, jumlah = 5) {
  const index = data.findIndex((item) => item.nim === nimTarget);
  const sebelum = data.slice(Math.max(0, index - jumlah), index);
  const sesudah = data.slice(index + 1, index + 1 + jumlah);
  return [...sebelum, data[index], ...sesudah];
}

const fontList = [
  "IBMPlexSans-Italic",
  "Inter-Variable",
  "Lato-Bold",
  "Montserrat-Italic",
  "OpenSans-Condensed-Bold",
  "Poppins-Bold",
  "Raleway-Italic",
  "Roboto-Condensed-Bold",
  "Rubik-Italic",
  "Sora-Variable",
];

export default function Index() {
  const dataFinal = ambilDataSekitar(nimSaya, daftarMahasiswa, 5);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {dataFinal.map((item, index) => {
        const isMe = item.nim === nimSaya;
        return (
          <View key={item.nim} style={[styles.card, isMe && styles.myCard]}>
            <Image
              source={{
                uri: `https://simak.unismuh.ac.id/upload/mahasiswa/${item.nim}_.jpg`,
              }}
              style={styles.avatar}
            />
            <Text
              style={[
                styles.name,
                styles.nameBorder,
                { fontFamily: fontList[index % fontList.length] },
              ]}
            >
              {item.nama}
            </Text>
            <Text style={styles.nim}>{item.nim}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a8edea",
  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  myCard: {
    borderWidth: 2,
    borderColor: "#4c9aff",
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 38,
    marginBottom: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  nameBorder: {
    borderWidth: 1,
    borderColor: "#4c9aff",
    borderRadius: 12,
    backgroundColor: "#eef5ff",
    overflow: "hidden",
  },
  nim: {
    fontSize: 12,
    color: "#555",
  },
});
