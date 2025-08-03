// app/_layout.tsx
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

// Tahan splash screen sampai font siap
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "IBMPlexSans-Italic": require("../assets/fonts/IBMPlexSans-Italic-VariableFont_wdth,wght.ttf"),
    "Inter-Variable": require("../assets/fonts/Inter-VariableFont_opsz,wght.ttf"),
    "Lato-Bold": require("../assets/fonts/Lato-Bold.ttf"),
    "Montserrat-Italic": require("../assets/fonts/Montserrat-Italic-VariableFont_wght.ttf"),
    "OpenSans-Condensed-Bold": require("../assets/fonts/OpenSans_Condensed-Bold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Raleway-Italic": require("../assets/fonts/Raleway-Italic-VariableFont_wght.ttf"),
    "Roboto-Condensed-Bold": require("../assets/fonts/Roboto_Condensed-Bold.ttf"),
    "Rubik-Italic": require("../assets/fonts/Rubik-Italic-VariableFont_wght.ttf"),
    "Sora-Variable": require("../assets/fonts/Sora-VariableFont_wght.ttf"),
    "SpaceMono-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded && !error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return <Stack />;
}
