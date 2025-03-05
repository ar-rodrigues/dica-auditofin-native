import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAtom } from "jotai";
import { sessionAtom } from "../../atoms/sessionAtom";
import { supabase } from "../../lib/supabase";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import AuditHeader from "../../components/AuditHeader";
import StatusBadge from "../../components/StatusBadge";
import StatCard from "../../components/StatCard";
import RequirementItem from "../../components/RequirementItem";
import { departments, requirements } from "../../data/requirements";

const Requirements = () => {
  const [session] = useAtom(sessionAtom);
  const email = session?.user?.email;

  const [selectedDept, setSelectedDept] = useState("all");
  const [deptModalVisible, setDeptModalVisible] = useState(false);
  const [selectedDeptLabel, setSelectedDeptLabel] = useState(
    "Todos los departamentos"
  );

  const [searchTerm, setSearchTerm] = useState("");

  const [filter, setFilter] = useState("all");
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterLabel, setFilterLabel] = useState("Todos los documentos");

  const filteredRequirements = requirements.filter((req) => {
    const matchesDept =
      selectedDept === "all" || req.dept === departments[selectedDept];
    const matchesSearch = req.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "delivered" && req.delivered) ||
      (filter === "missing" && !req.delivered);
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

  return (
    <SafeAreaView className="h-full bg-gray-50">
      <ScrollView>
        <View className="p-4 bg-gray-50">
          <AuditHeader />

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
          <View className="flex-row mb-6 space-x-3">
            <StatCard
              title="Total"
              value={requirements.length}
              icon="file-text"
              iconColor="#3B82F6"
            />
            <StatCard
              title="Entregados"
              value={requirements.filter((r) => r.delivered).length}
              icon="check-square"
              iconColor="#10B981"
            />
            <StatCard
              title="Faltantes"
              value={requirements.filter((r) => !r.delivered).length}
              icon="x-square"
              iconColor="#EF4444"
            />
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
                <RequirementItem key={req.id} requirement={req} />
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
                onPress={() => handleFilterSelect("delivered", "Entregados")}
              >
                <Text
                  className={
                    filter === "delivered"
                      ? "text-blue-500 font-semibold"
                      : "text-gray-800"
                  }
                >
                  Entregados
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="py-3 border-b border-gray-100"
                onPress={() => handleFilterSelect("missing", "Faltantes")}
              >
                <Text
                  className={
                    filter === "missing"
                      ? "text-blue-500 font-semibold"
                      : "text-gray-800"
                  }
                >
                  Faltantes
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Requirements;
