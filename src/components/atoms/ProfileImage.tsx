import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface ProfileImageProps {
  imageUrl?: string;
  fullName?: string;
  size?: number;
  onPress?: () => void;
  showEditIcon?: boolean;
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  imageUrl,
  fullName = '',
  size = 80,
  onPress,
  showEditIcon = false,
}) => {
  const getInitials = (name: string) => {
    if (!name) return 'U';
    
    const names = name.trim().split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  const containerStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  const textStyle = {
    fontSize: size * 0.4,
    fontWeight: 'bold' as const,
  };

  const renderImage = () => {
    if (imageUrl) {
      return (
        <Image
          source={{ uri: imageUrl }}
          style={[styles.image, containerStyle]}
          resizeMode="cover"
        />
      );
    }

    return (
      <View style={[styles.placeholder, containerStyle, { backgroundColor: '#3ED3A3' }]}>
        <Text style={[styles.placeholderText, textStyle, { color: 'white' }]}>
          {getInitials(fullName)}
        </Text>
      </View>
    );
  };

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        {renderImage()}
        {showEditIcon && (
          <View style={[styles.editIcon, { bottom: -2, right: -2 }]}>
            <Text style={styles.editIconText}>✏️</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      {renderImage()}
      {showEditIcon && (
        <View style={[styles.editIcon, { bottom: -2, right: -2 }]}>
          <Text style={styles.editIconText}>✏️</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    borderWidth: 2,
    borderColor: '#3ED3A3',
  },
  placeholder: {
    borderWidth: 2,
    borderColor: '#3ED3A3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontWeight: 'bold',
  },
  editIcon: {
    position: 'absolute',
    backgroundColor: '#3ED3A3',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  editIconText: {
    fontSize: 12,
  },
});

export default ProfileImage;
