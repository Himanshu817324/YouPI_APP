// import { Feather, Ionicons } from '@expo/vector-icons';
// import { useState } from 'react';
// import {
//   Image,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

// // Import all assets
// import iconBurger from '../../../assets/icons/BurgerIcon.png';
// import iconDrink from '../../../assets/icons/DrinkIcon.png';
// import iconPizza from '../../../assets/icons/PizzaIcon.png';
// import iconTaco from '../../../assets/icons/TacoIcon.png';
// import imgBurger1 from '../../../assets/images/Burger1.png';
// import imgBurger2 from '../../../assets/images/Burger2.png';
// import imgBurger3 from '../../../assets/images/Burger3.png';
// import imgBurger4 from '../../../assets/images/Burger4.png';
// import imgHero from '../../../assets/images/hero.png';

// const categories = [
//   { name: 'Burger', icon: iconBurger },
//   { name: 'Taco', icon: iconTaco },
//   { name: 'Drink', icon: iconDrink },
//   { name: 'Pizza', icon: iconPizza },
// ];

// const burgers = [
//   {
//     title: 'Ordinary Burgers',
//     price: '17,230',
//     rating: 4.9,
//     distance: '190m',
//     image: imgBurger1,
//   },
//   {
//     title: 'Burger With Meat',
//     price: '17,230',
//     rating: 4.9,
//     distance: '190m',
//     image: imgBurger2,
//   },
//   {
//     title: 'Veggie Delight',
//     price: '17,230',
//     rating: 4.8,
//     distance: '180m',
//     image: imgBurger3,
//   },
//   {
//     title: 'Double Patty',
//     price: '17,230',
//     rating: 4.7,
//     distance: '200m',
//     image: imgBurger4,
//   },
// ];

// export default function HomeScreen() {
//   const [location] = useState('New York City USA');
//   const [activeCategory, setActiveCategory] = useState('Burger');

//   return (
//     <SafeAreaView style={styles.container}>
//       <Image
//         source={imgHero}
//         style={styles.heroImage}
//         resizeMode="cover"
//       />

//       {/* Header */}
//       <View style={styles.topBar}>
//         <View>
//           <Text style={styles.locationLabel}>Your Location</Text>
//           <View style={styles.locationRow}>
//             <Ionicons name="location-outline" size={scale(16)} color="white" />
//             <Text style={styles.locationText}>{location}</Text>
//           </View>
//         </View>

//         <View style={styles.iconGroup}>
//           <TouchableOpacity>
//             <Feather name="search" size={scale(22)} color="white" />
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Feather name="bell" size={scale(22)} color="white" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Headline */}
//       <View style={styles.headlineWrapper}>
//         <Text style={styles.headlineText}>Provide the best{"\n"}food for you</Text>
//       </View>

//       {/* Category List */}
//       <View style={styles.categoryHeader}>
//         <Text style={styles.categoryTitle}>Find by Category</Text>
//         <Text style={styles.seeAll}>See All</Text>
//       </View>

//       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
//         {categories.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             style={[
//               styles.categoryItem,
//               item.name === activeCategory && styles.activeCategory,
//             ]}
//             onPress={() => setActiveCategory(item.name)}
//           >
//             <Image source={item.icon} style={styles.categoryIcon} />
//             <Text
//               style={[
//                 styles.categoryText,
//                 item.name === activeCategory && styles.activeCategoryText,
//               ]}
//             >
//               {item.name}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {/* Products */}
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={styles.grid}>
//           {burgers.map((item, idx) => (
//             <View key={idx} style={styles.card}>
//               <Image source={item.image} style={styles.cardImage} />
//               <TouchableOpacity style={styles.favoriteIcon}>
//                 <Ionicons name="heart-outline" size={scale(18)} color="red" />
//               </TouchableOpacity>
//               <Text style={styles.cardTitle}>{item.title}</Text>
//               <View style={styles.cardRow}>
//                 <Ionicons name="star" size={scale(14)} color="#FFA500" />
//                 <Text style={styles.cardRating}>{item.rating}</Text>
//                 <Ionicons name="location-outline" size={scale(14)} color="gray" style={{ marginLeft: 10 }} />
//                 <Text style={styles.cardDistance}>{item.distance}</Text>
//               </View>
//               <Text style={styles.cardPrice}>${item.price}</Text>
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   heroImage: {
//     position: 'absolute',
//     top: 0,
//     width: '100%',
//     height: verticalScale(230),
//   },
//   topBar: {
//     marginTop: verticalScale(50),
//     paddingHorizontal: scale(20),
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   locationLabel: {
//     color: 'white',
//     fontSize: moderateScale(10),
//   },
//   locationRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: verticalScale(4),
//   },
//   locationText: {
//     color: 'white',
//     fontSize: moderateScale(14),
//     marginLeft: scale(4),
//   },
//   iconGroup: {
//     flexDirection: 'row',
//     gap: scale(16),
//     marginTop: verticalScale(6),
//   },
//   headlineWrapper: {
//     marginTop: verticalScale(80),
//     paddingHorizontal: scale(20),
//   },
//   headlineText: {
//     color: 'white',
//     fontSize: moderateScale(30),
//     fontWeight: 'bold',
//   },
//   categoryHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: verticalScale(20),
//     paddingHorizontal: scale(20),
//   },
//   categoryTitle: {
//     fontSize: moderateScale(16),
//     lineHeight: moderateScale(24),
//     width: scale(135),
//     fontWeight: 'bold',
//   },
//   seeAll: {
//     fontSize: moderateScale(16),
//     lineHeight: moderateScale(24),
//     width: scale(60),
//     textAlign: 'right',
//     fontWeight: 'bold',
//     color: 'orange',
//   },
//   categoryScroll: {
//     flex: 1,
//     gap: scale(64),
//     paddingHorizontal: scale(20),
//     marginTop: verticalScale(10),
//   },
//   categoryItem: {
//     alignItems: 'center',
//     width: scale(50),
//     height: verticalScale(65),
//     marginRight: scale(16),
//     padding: scale(8),
//     borderRadius: scale(12),
//     backgroundColor: '#f0f0f0',
//   },
//   activeCategory: {
//     backgroundColor: '#FFAA00',
//   },
//   categoryIcon: {
//     width: scale(40),
//     height: verticalScale(25),
//     marginBottom: scale(5),
//   },
//   categoryText: {
//     fontSize: moderateScale(12),
//     color: 'black',
//   },
//   activeCategoryText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   grid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-evenly',
//     marginTop: verticalScale(10),
//     paddingBottom: verticalScale(30),
//   },
//   card: {
//     width: scale(150),
//     backgroundColor: 'white',
//     borderRadius: scale(12),
//     padding: scale(10),
//     marginVertical: verticalScale(8),
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   cardImage: {
//     width: '100%',
//     height: verticalScale(90),
//     borderRadius: scale(10),
//   },
//   favoriteIcon: {
//     position: 'absolute',
//     right: scale(10),
//     top: scale(10),
//     backgroundColor: 'white',
//     padding: scale(4),
//     borderRadius: 999,
//   },
//   cardTitle: {
//     fontSize: moderateScale(12),
//     fontWeight: 'bold',
//     marginTop: scale(6),
//   },
//   cardRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: verticalScale(4),
//   },
//   cardRating: {
//     fontSize: moderateScale(10),
//     marginLeft: scale(4),
//   },
//   cardDistance: {
//     fontSize: moderateScale(10),
//     marginLeft: scale(4),
//     color: 'gray',
//   },
//   cardPrice: {
//     fontSize: moderateScale(14),
//     fontWeight: 'bold',
//     color: '#FF8C00',
//   },
// });


import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Home Tab</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24 },
});
