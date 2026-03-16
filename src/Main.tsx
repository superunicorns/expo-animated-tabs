import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from "expo-constants";
import { Tabs } from './Tabs';
import { useState } from 'react';
import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated';

const statusBarHeight = Constants.statusBarHeight;

const tabs = ["#FF005C", "#FFBD00", "#00B3E6", "#00CC96", "#8400E0"]

export default function Main() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <View style={[styles.container, { marginTop: statusBarHeight }]}>
        <Tabs data={[
          {icon: "LifeBuoy", label: "Buoy"},
          {icon: "Fish", label: "Fresh fish"},
          {icon: "Sailboat", label: "Sail"},
          {icon: "Ship", label: "Ship it"},
          {icon: "ShipWheel", label: "Manage it"}
        ]} 
        onChange={(index) => setSelectedIndex(index)}
        selectedIndex={selectedIndex}
        />
        <Animated.View 
          key={`tab-content-${selectedIndex}`}
          entering={FadeInRight.springify().damping(80).stiffness(200)}
          exiting={FadeOutRight.springify().damping(80).stiffness(200)}
          style={{ backgroundColor: tabs[selectedIndex], flex: 1, borderRadius: 8 }} 
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    margin: 12,
    gap: 12
  },
});