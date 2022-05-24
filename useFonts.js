import * as Font from "expo-font";

export default useFonts = async () =>
  await Font.loadAsync({
    "Asap-Bold": require("./assets/fonts/Asap-Bold.ttf"),
    "Asap-Medium": require("./assets/fonts/Asap-Medium.ttf"),
    "Asap-Regular": require("./assets/fonts/Asap-Regular.ttf"),
    "Rajdhani-Bold": require("./assets/fonts/Rajdhani-Bold.ttf"),
    "Rajdhani-Light": require("./assets/fonts/Rajdhani-Light.ttf"),
    "Rajdhani-Medium": require("./assets/fonts/Rajdhani-Medium.ttf"),
    "Rajdhani-Regular": require("./assets/fonts/Rajdhani-Regular.ttf"),
    "Koulen-Regular": require("./assets/fonts/Koulen-Regular.ttf"),
    "Montserrat-Black": require("./assets/fonts/Montserrat-Black.ttf"),
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "SourceSansPro-Bold": require("./assets/fonts/SourceSansPro-Bold.ttf"),
    "SourceSansPro-Light": require("./assets/fonts/SourceSansPro-Light.ttf"),
  });
