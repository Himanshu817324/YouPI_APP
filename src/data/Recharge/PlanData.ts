export interface Plan {
  name: string;
  price: number;
  validity: string;
  data: string;
  calls: string;
  sms: string;
  ott: string[];
  emi?: string;
}

export const operators = ['Airtel', 'Jio', 'Vi', 'BSNL'] as const;

export type Operator = (typeof operators)[number];

export const operatorColors: Record<Operator, string> = {
  Airtel: '#F44336',
  Jio: '#4276fa',
  Vi: '#F44336',
  BSNL: '#4276fa',
};

export type OperatorPlans = {
  [key in Operator]: Plan[];
};

export const allPlans: OperatorPlans = {
  Jio: [
    {
      name: 'Jio Basic',
      price: 349,
      validity: '28 days',
      data: '2GB/day',
      calls: 'Unlimited',
      sms: '100/day',
      ott: ['JioTV', 'JioCinema'],
    },
    {
      name: 'Jio Premium',
      price: 599,
      validity: '28 days',
      data: '3GB/day',
      calls: 'Unlimited',
      sms: '100/day',
      ott: ['JioTV', 'JioCinema', 'Disney+ Hotstar'],
      emi: '₹200/month',
    },
    {
      name: 'Jio Entertainment',
      price: 799,
      validity: '28 days',
      data: '3.5GB/day',
      calls: 'Unlimited',
      sms: '100/day',
      ott: ['JioTV', 'JioCinema', 'Disney+ Hotstar', 'Amazon Prime'],
      emi: '₹267/month',
    },
  ],
  Airtel: [
    {
      name: 'Airtel Basic',
      price: 359,
      validity: '28 days',
      data: '2GB/day',
      calls: 'Unlimited',
      sms: '100/day',
      ott: ['Airtel Xstream'],
    },
    {
      name: 'Airtel Entertainment',
      price: 599,
      validity: '28 days',
      data: '3GB/day',
      calls: 'Unlimited',
      sms: '100/day',
      ott: ['Airtel Xstream', 'Disney+ Hotstar'],
      emi: '₹200/month',
    },
    {
      name: 'Airtel Max',
      price: 849,
      validity: '28 days',
      data: '3.5GB/day',
      calls: 'Unlimited',
      sms: '100/day',
      ott: ['Airtel Xstream', 'Disney+ Hotstar', 'Amazon Prime'],
      emi: '₹283/month',
    },
  ],
  Vi: [
    {
      name: 'Vi Value',
      price: 299,
      validity: '28 days',
      data: '1.5GB/day',
      calls: 'Unlimited',
      sms: '100/day',
      ott: ['Vi Movies & TV'],
    },
    {
      name: 'Vi Entertainment',
      price: 499,
      validity: '28 days',
      data: '2GB/day',
      calls: 'Unlimited',
      sms: '100/day',
      ott: ['Vi Movies & TV', 'Disney+ Hotstar'],
      emi: '₹167/month',
    },
    {
      name: 'Vi Premium',
      price: 699,
      validity: '28 days',
      data: '3GB/day',
      calls: 'Unlimited',
      sms: '100/day',
      ott: ['Vi Movies & TV', 'Disney+ Hotstar', 'Amazon Prime'],
      emi: '₹233/month',
    },
  ],
  BSNL: [
    {
      name: 'BSNL 429',
      price: 429,
      validity: '30 days',
      data: '2GB/day',
      calls: 'Unlimited',
      sms: '100/day',
      ott: [],
    },
    {
      name: 'BSNL Premium',
      price: 599,
      validity: '30 days',
      data: '3GB/day',
      calls: 'Unlimited',
      sms: '100/day',
      ott: ['SonyLIV'],
      emi: '₹200/month',
    },
  ],
};
