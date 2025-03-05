import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { supabase } from "../lib/supabase";
import { router } from "expo-router";

export default function AuditHeader() {
  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/"); // Redirect to login on logout
  };

  return (
    <View className="p-6 mb-6 bg-white rounded-lg shadow-sm">
      <View className="flex-col items-start gap-4">
        <View>
          <Text className="text-2xl font-bold text-gray-900">
            Auditoría de Cuenta Pública
          </Text>
        </View>
        <TouchableOpacity
          className="px-4 py-2 bg-red-500 rounded-md"
          onPress={logout}
        >
          <Text className="font-semibold text-white">Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      <View className="h-[1px] bg-gray-200 my-4" />

      <View className="mb-4">
        <Text className="text-gray-500">Periodo Auditado</Text>
        <Text className="font-medium text-gray-900">
          Octubre 2024 - Diciembre 2024
        </Text>
      </View>

      <View className="h-[1px] bg-gray-200 my-4" />

      <View className="flex-col gap-4">
        <View className="flex-1">
          <Text className="mb-1 text-gray-500">Ente Auditado</Text>
          <Text className="font-medium text-gray-900">
            Organismo Operador del Servicio de Limpia del Municipio de Puebla
          </Text>
        </View>
        <View className="flex-1">
          <Text className="mb-1 text-gray-500">Tipo de Auditoría</Text>
          <Text className="font-medium text-gray-900">
            Auditoría de Cuenta Pública
          </Text>
        </View>
      </View>
    </View>
  );
}
