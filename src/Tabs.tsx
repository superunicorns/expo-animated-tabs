import { View, Text, Pressable } from "react-native";
import * as icons from 'lucide-react-native/icons';
import Animated, { FadeInRight, FadeOutRight, LayoutAnimationConfig, LinearTransition } from "react-native-reanimated";
import { MotiProps, MotiView } from "moti";
import { motifySvg } from "moti/svg";

type IconNames = keyof typeof icons;

type TabItem = {
  icon: IconNames;
  label: string;
}

type TabsProps = {
  data: TabItem[];
  selectedIndex: number;
  onChange: (index: number) => void;
  activeColor?: string;
  inactiveColor?: string;
  activeBackgroundColor?: string;
  inactiveBackgroundColor?: string;
}

type IconProp = {
  name: IconNames;
} & MotiProps;

function Icon({ name, ...rest }: IconProp) {
  const IconComponent = motifySvg(icons[name])();

  return <IconComponent size={16} {...rest} />
}

const _spacing = 4;

export function Tabs({ 
  data,
  selectedIndex,
  onChange,
  activeColor = "#fff",
  inactiveColor = "#999",
  activeBackgroundColor = "#111",
  inactiveBackgroundColor = "#ddd"
}: TabsProps) {
  return <View style={{ flexDirection: "row", gap: _spacing }}>
    {data.map((item, index) => {
      const isSelected = selectedIndex === index;

      return <MotiView 
          key={`tab-${index}`}
          animate={{ overflow: "hidden", borderRadius: 8, backgroundColor: isSelected ? activeBackgroundColor : inactiveBackgroundColor}}
          layout={LinearTransition.springify().damping(80).stiffness(200)}
        >
        <Pressable onPress={() => onChange(index)} style={{
          padding: _spacing * 3,
          justifyContent: "center",
          alignItems: "center",
          gap: _spacing,
          flexDirection: "row",
        }}>
          <Icon 
            animate={{ color: isSelected ? activeColor : inactiveColor }}
            name={item.icon} 
          />
          <LayoutAnimationConfig skipEntering>
            { isSelected &&  
            <Animated.Text 
              entering={FadeInRight.springify().damping(80).stiffness(200)}
              exiting={FadeOutRight.springify().damping(80).stiffness(200)}
              style={{
                color: isSelected ? activeColor : inactiveColor,
                fontWeight: isSelected ? "bold" : "normal",
            }}>{item.label}</Animated.Text>}
          </LayoutAnimationConfig>
        </Pressable>
      </MotiView>
    })}
  </View>
}