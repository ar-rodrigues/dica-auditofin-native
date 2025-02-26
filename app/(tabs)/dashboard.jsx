import React, { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";

const PowerBIDashboard = () => {
  const [loading, setLoading] = useState(true);
  const powerBIUrl =
    "https://app.powerbi.com/view?r=eyJrIjoiNDM1YzNlOGUtZGExNS00NDkzLWJiNmYtNGVjZWM5ZTcyYjBkIiwidCI6Ijk2NDYyYWMzLTYwMzktNGE1YS1iYWI5LTBjMmY5YjNkYzFiYSJ9";

  const windowWidth = Dimensions.get("window").width * 0.9;
  const webViewHeight = windowWidth * 0.85;

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1 ">
        <View className="p-4 bg-white border-b border-gray-300">
          <Text className="text-xl font-bold text-gray-800">
            Dashboard DICA Xalapa
          </Text>
          <Text className="mt-1 text-gray-500 text-md">
            Visualización de datos actualizada diariamente
          </Text>
        </View>

        <View
          className="w-full px-4 mt-4 overflow-hidden bg-white rounded-lg shadow"
          style={{ height: webViewHeight }}
        >
          {loading && (
            <View className="absolute inset-0 z-10 flex items-center justify-center bg-white">
              <ActivityIndicator size="large" color="#4299E1" />
              <Text className="mt-3 text-gray-600">Cargando dashboard...</Text>
            </View>
          )}
          <WebView
            source={{ uri: powerBIUrl }}
            className="flex-1 "
            javaScriptEnabled
            domStorageEnabled
            startInLoadingState
            scalesPageToFit={true}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
          />
        </View>

        <View className="p-3 mx-4 mt-4 bg-white rounded-lg shadow">
          <Text className="text-base font-bold text-gray-800">Información</Text>
          <Text className="mt-1 text-sm leading-5 text-gray-600">
            Este dashboard muestra datos actualizados sobre los proyectos y
            estados financieros de la administración municipal de Xalapa. Puedes
            interactuar directamente con los gráficos y tablas.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PowerBIDashboard;
