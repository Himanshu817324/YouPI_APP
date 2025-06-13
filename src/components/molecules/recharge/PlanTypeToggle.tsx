import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';

interface PlanTypeToggleProps {
  planType: 'monthly' | '3-month';
  setPlanType: (type: 'monthly' | '3-month') => void;
}

const PlanTypeToggle: React.FC<PlanTypeToggleProps> = ({
  planType,
  setPlanType,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Plan Type</Text>

      <View style={styles.row}>
        {/* Left Text Section */}
        <View>
          <Text style={styles.optionTitle}>Monthly Plans</Text>
          <Text style={styles.optionSubtitle}>Regular recharge plans</Text>
        </View>

        {/* Right Text + Toggle */}
        <View style={styles.toggleContainer}>
          <View style={{ alignItems: 'flex-end', marginRight: 8 }}>
            <Text style={styles.optionTitle}>3-Month Plans</Text>
            <Text style={styles.emiLabel}>EMI available</Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              setPlanType(planType === 'monthly' ? '3-month' : 'monthly')
            }
            activeOpacity={0.8}
            style={styles.switchBase}
          >
            <Animated.View
              style={[
                styles.switchThumb,
                {
                  transform: [
                    {
                      translateX: planType === '3-month' ? 24 : 4,
                    },
                  ],
                },
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e293b', // bg-slate-800
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionTitle: {
    fontWeight: '500',
    fontSize: 16,
    color: '#fff',
  },
  optionSubtitle: {
    fontSize: 13,
    color: '#94a3b8', // text-slate-400
    marginTop: 2,
  },
  emiLabel: {
    fontSize: 13,
    color: '#34d399', // text-emerald-400
    fontWeight: '500',
    marginTop: 2,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchBase: {
    width: 48,
    height: 24,
    borderRadius: 24,
    backgroundColor: '#475569', // bg-slate-600
    justifyContent: 'center',
  },
  switchThumb: {
    position: 'absolute',
    top: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});

export default PlanTypeToggle;
