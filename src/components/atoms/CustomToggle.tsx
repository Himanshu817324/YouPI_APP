import { TouchableOpacity, View } from 'react-native';

export const ToggleButton = ({
  isOn,
  onToggle,
}: {
  isOn: boolean;
  onToggle: () => void;
}) => (
  <TouchableOpacity
    onPress={onToggle}
    className={`w-[44px] h-[24px] rounded-full px-1 flex-row items-center ${
      isOn ? 'bg-toggle-on justify-end' : 'bg-toggle-off justify-start'
    }`}
    activeOpacity={0.7}
  >
    <View className="w-[18px] h-[18px] rounded-full bg-white shadow" />
  </TouchableOpacity>
);
