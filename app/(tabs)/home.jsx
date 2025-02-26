import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAtom } from "jotai";
import { sessionAtom } from "../../atoms/sessionAtom";
import { supabase } from "../../lib/supabase";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";

const departments = {
  "SECRETARÍA DEL AYUNTAMIENTO": 1,
  TESORERÍA: 2,
  "DIRECCIÓN DE RECURSOS HUMANOS": 3,
  "DIRECCIÓN DE ADMINISTRACIÓN": 4,
  "DIRECCIÓN DE OBRAS PÚBLICAS": 5,
  "DIRECCIÓN DE ASUNTOS JURÍDICOS": 6,
  CONTRALORÍA: 7,
  "GOBIERNO ABIERTO": 8,
};

const requirements = [
  {
    id: "1.1",
    dept: 1,
    name: "Relación de actas de Sesión de Cabildo",
    format: "Excel",
    certified: false,
    original: true,
  },
  {
    id: "2.1",
    dept: 2,
    name: "Presupuesto de egresos para el ejercicio 2024",
    format: "PDF",
    certified: true,
  },
  {
    id: "2.2",
    dept: 2,
    name: "Estados financieros mensuales y cortes de caja",
    format: "Excel, PDF",
    certified: true,
  },
  {
    id: "3.1",
    dept: 3,
    name: "Plantilla de personal autorizada 2024",
    format: "Excel, PDF",
    certified: true,
  },
  {
    id: "4.1",
    dept: 4,
    name: "Programa anual de adquisiciones",
    format: "Excel, PDF",
    certified: true,
  },
  {
    id: "5.1",
    dept: 5,
    name: "Expedientes unitarios de obras y acciones",
    format: "PDF",
    certified: false,
    original: true,
  },
  {
    id: "6.1",
    dept: 6,
    name: "Relación de litigios",
    format: "Excel, PDF",
    certified: false,
    original: true,
  },
  {
    id: "7.1",
    dept: 7,
    name: "Programa de trabajo 2024",
    format: "PDF",
    certified: true,
  },
  {
    id: "8.1",
    dept: 8,
    name: "Reportes de evaluación trimestral",
    format: "PDF",
    certified: true,
  },
];

const Home = () => {
  const [session] = useAtom(sessionAtom);
  const email = session?.user?.email;
  console.log(session);

  const [selectedDept, setSelectedDept] = useState("all");
  const [deptModalVisible, setDeptModalVisible] = useState(false);
  const [selectedDeptLabel, setSelectedDeptLabel] = useState(
    "Todos los departamentos"
  );

  const [searchTerm, setSearchTerm] = useState("");

  const [filter, setFilter] = useState("all");
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterLabel, setFilterLabel] = useState("Todos los documentos");

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/"); // Redirect to login on logout
  };

  const filteredRequirements = requirements.filter((req) => {
    const matchesDept =
      selectedDept === "all" || req.dept === departments[selectedDept];
    const matchesSearch = req.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "certified" && req.certified) ||
      (filter === "original" && req.original);
    return matchesDept && matchesSearch && matchesFilter;
  });

  const handleDeptSelect = (dept, label) => {
    setSelectedDept(dept);
    setSelectedDeptLabel(label);
    setDeptModalVisible(false);
  };

  const handleFilterSelect = (filterValue, label) => {
    setFilter(filterValue);
    setFilterLabel(label);
    setFilterModalVisible(false);
  };

  const renderStatusBadge = (certified, original) => {
    let backgroundColor = "#E5E7EB"; // gray for default
    let textColor = "#1F2937";
    let text = "Copia Simple";

    if (certified) {
      backgroundColor = "#D1FAE5"; // green
      textColor = "#065F46";
      text = "Copia Certificada";
    } else if (original) {
      backgroundColor = "#FEF3C7"; // yellow
      textColor = "#92400E";
      text = "Original Requerido";
    }

    return (
      <View
        style={{
          backgroundColor,
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 12,
          alignSelf: "flex-start",
        }}
      >
        <Text style={{ fontSize: 12, fontWeight: "500", color: textColor }}>
          {text}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="h-full bg-gray-50">
      <ScrollView>
        <View className="p-4 bg-gray-50">
          {/* Header */}
          <View className="mb-6">
            <Text className="mb-1 text-2xl font-bold text-gray-900">
              Auditoría Xalapa 2024
            </Text>
            <Text className="mb-2 text-gray-600">
              Requerimientos de documentación
            </Text>
            <Text className="text-gray-900">Usuario: {email}</Text>
            <TouchableOpacity
              className="self-start px-4 py-2 mt-4 bg-red-500 rounded-md"
              onPress={logout}
            >
              <Text className="font-semibold text-white">Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>

          {/* Search */}
          <View className="relative mb-4">
            <View className="flex-row items-center px-2 py-1 bg-white border rounded-lg">
              <Feather name="search" size={20} color="#9CA3AF" />
              <TextInput
                placeholder="Buscar requerimiento..."
                className="flex-1 py-2 ml-2"
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
            </View>
          </View>

          {/* Custom Dropdown Selectors */}
          <View className="mb-6 space-y-4">
            {/* Department Selector */}
            <TouchableOpacity
              className="flex-row items-center justify-between px-4 py-3 overflow-hidden bg-white border border-gray-200 rounded-lg"
              onPress={() => setDeptModalVisible(true)}
            >
              <Text>{selectedDeptLabel}</Text>
              <Feather name="chevron-down" size={20} color="#6B7280" />
            </TouchableOpacity>

            {/* Filter Selector */}
            <TouchableOpacity
              className="flex-row items-center justify-between px-4 py-3 overflow-hidden bg-white border border-gray-200 rounded-lg"
              onPress={() => setFilterModalVisible(true)}
            >
              <Text>{filterLabel}</Text>
              <Feather name="chevron-down" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View className="flex-row mb-6 space-x-2">
            <View className="flex-1 p-4 bg-white rounded-lg shadow">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="font-semibold">Total</Text>
                <Feather name="file-text" size={20} color="#3B82F6" />
              </View>
              <Text className="text-2xl font-bold">{requirements.length}</Text>
            </View>
            <View className="flex-1 p-4 bg-white rounded-lg shadow">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="font-semibold">Certificadas</Text>
                <Feather name="check-square" size={20} color="#10B981" />
              </View>
              <Text className="text-2xl font-bold">
                {requirements.filter((r) => r.certified).length}
              </Text>
            </View>
            <View className="flex-1 p-4 bg-white rounded-lg shadow">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="font-semibold">Originales</Text>
                <Feather name="clock" size={20} color="#F59E0B" />
              </View>
              <Text className="text-2xl font-bold">
                {requirements.filter((r) => r.original).length}
              </Text>
            </View>
          </View>

          {/* Requirements List */}
          <View className="overflow-hidden bg-gray-100 rounded-lg shadow-sm">
            <View className="flex-row px-4 py-3 border-b border-gray-200 bg-gray-50">
              <Text className="w-12 text-xs font-medium text-gray-500">ID</Text>
              <Text className="flex-1 text-xs font-medium text-gray-500">
                REQUERIMIENTO
              </Text>
              <Text className="w-24 text-xs font-medium text-gray-500">
                ESTADO
              </Text>
            </View>

            {filteredRequirements.length === 0 ? (
              <View className="items-center py-4">
                <Text className="text-gray-500">
                  No se encontraron resultados
                </Text>
              </View>
            ) : (
              filteredRequirements.map((req) => (
                <View
                  key={req.id}
                  className="flex-row items-center px-4 py-4 border-b border-gray-100"
                >
                  <Text className="w-12 font-medium text-gray-900">
                    {req.id}
                  </Text>
                  <View className="flex-1 mr-2">
                    <Text className="mb-1 text-gray-800">{req.name}</Text>
                    <Text className="text-xs text-gray-500">
                      Formato: {req.format}
                    </Text>
                  </View>
                  <View className="w-24">
                    {renderStatusBadge(req.certified, req.original)}
                  </View>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>

      {/* Department Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={deptModalVisible}
        onRequestClose={() => setDeptModalVisible(false)}
      >
        <View className="justify-end flex-1 bg-black bg-opacity-50">
          <View className="p-4 bg-white rounded-t-lg h-1/2">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-semibold">
                Seleccionar Departamento
              </Text>
              <TouchableOpacity onPress={() => setDeptModalVisible(false)}>
                <Feather name="x" size={24} color="#4B5563" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              <TouchableOpacity
                className="py-3 border-b border-gray-100"
                onPress={() =>
                  handleDeptSelect("all", "Todos los departamentos")
                }
              >
                <Text
                  className={
                    selectedDept === "all"
                      ? "text-blue-500 font-semibold"
                      : "text-gray-800"
                  }
                >
                  Todos los departamentos
                </Text>
              </TouchableOpacity>
              {Object.keys(departments).map((dept) => (
                <TouchableOpacity
                  key={dept}
                  className="py-3 border-b border-gray-100"
                  onPress={() => handleDeptSelect(dept, dept)}
                >
                  <Text
                    className={
                      selectedDept === dept
                        ? "text-blue-500 font-semibold"
                        : "text-gray-800"
                    }
                  >
                    {dept}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Filter Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View className="justify-end flex-1 bg-black bg-opacity-50">
          <View className="p-4 bg-white rounded-t-lg h-1/3">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-semibold">Seleccionar Filtro</Text>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Feather name="x" size={24} color="#4B5563" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              <TouchableOpacity
                className="py-3 border-b border-gray-100"
                onPress={() =>
                  handleFilterSelect("all", "Todos los documentos")
                }
              >
                <Text
                  className={
                    filter === "all"
                      ? "text-blue-500 font-semibold"
                      : "text-gray-800"
                  }
                >
                  Todos los documentos
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="py-3 border-b border-gray-100"
                onPress={() =>
                  handleFilterSelect("certified", "Copia certificada")
                }
              >
                <Text
                  className={
                    filter === "certified"
                      ? "text-blue-500 font-semibold"
                      : "text-gray-800"
                  }
                >
                  Copia certificada
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="py-3 border-b border-gray-100"
                onPress={() =>
                  handleFilterSelect("original", "Original requerido")
                }
              >
                <Text
                  className={
                    filter === "original"
                      ? "text-blue-500 font-semibold"
                      : "text-gray-800"
                  }
                >
                  Original requerido
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;
