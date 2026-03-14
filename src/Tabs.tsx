import { View, Text } from "react-native";
import * as icons from 'lucide-react-native/icons';

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
}

function Icon({ name }: IconProp) {
  const IconComponent = icons[name];

  return <IconComponent />
}

export function Tabs({ 
  data,
  selectedIndex,
  onChange
}: TabsProps) {
  return <View>
    {data.map((item, index) => {
      return <View key={index}>
        <Text>{item.label}</Text>
        <Icon name={item.icon} />
      </View>
    })}
  </View>
}