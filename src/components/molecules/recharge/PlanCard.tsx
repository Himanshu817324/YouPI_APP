import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
//   FlatList,
} from 'react-native';

interface Plan {
  name: string;
  price: number;
  validity: string;
  data: string;
  calls: string;
  sms: string;
  ott: string[];
  color: string; // Use for background gradient or solid fallback
  emi?: string;
}

interface PlanCardProps {
  plan: Plan;
  planType: 'monthly' | '3-month';
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, planType }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        {planType === 'monthly' ? 'Monthly Plans' : '3-Month Plans'}
      </Text>

      <View style={[styles.card, { backgroundColor: plan.color }]}>
        {/* Decorative Circle */}
        <View style={styles.decorCircle} />

        <View style={{ zIndex: 10 }}>
          {/* Header Section */}
          <View style={styles.header}>
            <View>
              <Text style={styles.planName}>{plan.name}</Text>
              <Text style={styles.subText}>{plan.validity}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.price}>₹{plan.price}</Text>
              {plan.emi && <Text style={styles.subText}>({plan.emi})</Text>}
            </View>
          </View>

          {/* Details Grid */}
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.subText}>Data</Text>
              <Text style={styles.gridValue}>{plan.data}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.subText}>Calls</Text>
              <Text style={styles.gridValue}>{plan.calls}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.subText}>SMS</Text>
              <Text style={styles.gridValue}>{plan.sms}</Text>
            </View>
          </View>

          {/* OTT Services */}
          <View style={{ marginBottom: 12 }}>
            <View style={styles.ottTitleRow}>
              <Text style={styles.ottIcon}>▷</Text>
              <Text style={styles.ottLabel}>OTT Included:</Text>
            </View>
            <View style={styles.ottContainer}>
              {plan.ott.map((service, index) => (
                <Text key={index} style={styles.ottBadge}>
                  {service}
                </Text>
              ))}
            </View>
          </View>

          {/* EMI Note */}
          {planType === '3-month' && (
            <View style={styles.emiBox}>
              <Text style={styles.emiIcon}>💳</Text>
              <Text style={styles.emiText}>EMI Available</Text>
            </View>
          )}

          {/* Button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Recharge Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 12,
    color: '#fff',
  },
  card: {
    borderRadius: 16,
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  decorCircle: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 120,
    height: 120,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 60,
    zIndex: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  subText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    marginTop: 4,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  gridItem: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  gridValue: {
    fontWeight: '600',
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
  ottTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ottIcon: {
    color: 'rgba(255,255,255,0.8)',
    marginRight: 6,
  },
  ottLabel: {
    color: '#fff',
    fontWeight: '500',
  },
  ottContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  ottBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 12,
    marginRight: 8,
    marginBottom: 6,
  },
  emiBox: {
    backgroundColor: 'rgba(220, 38, 38, 0.9)', // red-600/90
    borderWidth: 1,
    borderColor: '#dc2626',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emiIcon: {
    color: '#fff',
    fontSize: 16,
    marginRight: 8,
  },
  emiText: {
    color: '#fff',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#2563eb', // blue-600
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 16,
  },
});

export default PlanCard;
