/**
 * Grocery Empire - Demo Company Information
 *
 * This file contains demo company details for the wholesale produce marketplace platform.
 * All contact information is fictional and for demonstration purposes only.
 */

export const COMPANY_INFO = {
  // Legal Business Information
  legalName: 'Grocery Empire LLC',
  dbaName: 'Grocery Empire',

  // Contact Information
  phone: '(214) 555-7890',
  email: 'info@groceryempire.com',
  website: 'https://www.groceryempire.com',

  // Physical Address
  address: {
    street: '2500 Commerce Street, Suite 100',
    city: 'Dallas',
    state: 'TX',
    zip: '75201',
    formatted: '2500 Commerce Street, Suite 100, Dallas, TX 75201',
  },

  // Contact Person
  contacts: {
    sales: {
      name: 'Sarah Johnson',
      phone: '(214) 555-7891',
      email: 'orders@groceryempire.com',
    },
  },

  // Business Details
  business: {
    founded: '1999',
    entityType: 'Limited Liability Company (LLC)',
    state: 'Texas',
    experience: '25+ years in wholesale produce distribution',
  },

  // Service Area
  serviceArea: {
    states: ['Texas'],
    stateAbbreviations: ['TX'],
    regions: ['Dallas County', 'Tarrant County', 'Collin County', 'Denton County'],
    description: 'Serving the Dallas-Fort Worth metroplex with fresh produce delivery to restaurants, grocery stores, and institutions.',
  },

  // Operations
  operations: {
    fleetSize: 12,
    drivers: 15,
    operationType: 'Refrigerated Fleet Delivery',
    cargoTypes: ['Fresh Produce', 'Organic Products', 'Specialty Items'],
    deliveryDays: 'Monday - Saturday',
    orderingHours: '24/7 Online',
  },

  // Business Hours
  hours: {
    office: 'Monday - Friday: 5:00 AM - 6:00 PM CST',
    warehouse: 'Monday - Saturday: 5:00 AM - 4:00 PM CST',
    deliveries: 'Monday - Saturday: 6:00 AM - 6:00 PM CST',
    emergencyContact: '(214) 555-7890',
  },

  // Social Proof
  description: {
    short: 'Premium wholesale produce delivered fresh to businesses across the Dallas-Fort Worth metroplex.',
    long: 'Grocery Empire has been the trusted source for fresh, high-quality produce in the Dallas-Fort Worth area since 1999. We specialize in delivering premium fruits, vegetables, and specialty items to restaurants, grocery stores, caterers, and institutions throughout North Texas.',
    mission: 'To be the leading wholesale produce distributor in North Texas, known for exceptional quality, reliable service, and innovative solutions that help our customers succeed.',
  },

  // Payment & Terms
  payment: {
    terms: 'Net 30 for approved accounts',
    methods: ['Check', 'ACH', 'Wire Transfer', 'Credit Card'],
    minimumOrder: '$150 minimum for delivery',
    taxId: 'Available upon request',
  },

  // Certifications & Compliance
  compliance: {
    foodSafety: 'FDA Food Facility Registration',
    certifications: 'HACCP Certified, Food Safety Certified',
    insurance: 'Full liability and cargo insurance coverage',
    licenses: 'Texas Sales Tax Permit, Food Handler Certified',
  },

  // Geographic Coordinates (for maps) - Dallas Commerce Street area
  coordinates: {
    lat: 32.7767,
    lng: -96.7970,
  },

  // Price List Information
  pricing: {
    effectiveDate: '11/17/25 - 11/22/25',
    updateFrequency: 'Weekly',
    disclaimer: 'Thank you for your business, also please note prices are availabilities are subject to change without notice',
  },
} as const;

// Helper functions
export const getFormattedAddress = () => COMPANY_INFO.address.formatted;

export const getFormattedPhone = () => COMPANY_INFO.phone;

export const getServiceAreaText = () =>
  `Serving ${COMPANY_INFO.serviceArea.states.join(', ')}`;

export const getMapUrl = () =>
  `https://www.google.com/maps/search/?api=1&query=${COMPANY_INFO.coordinates.lat},${COMPANY_INFO.coordinates.lng}`;

export const getDirectionsUrl = () =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(COMPANY_INFO.address.formatted)}`;

export const getCallUrl = () =>
  `tel:${COMPANY_INFO.phone.replace(/\D/g, '')}`;

export const getEmailUrl = () =>
  `mailto:${COMPANY_INFO.email}`;

// Service area checker
export const isInServiceArea = (state: string): boolean => {
  return COMPANY_INFO.serviceArea.stateAbbreviations.includes(state.toUpperCase());
};

// Business hours checker
export const isCurrentlyOpen = (): boolean => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  // Closed on Sunday (0)
  if (day === 0) return false;

  // Saturday (6): 6 AM - 4 PM
  if (day === 6) return hour >= 6 && hour < 16;

  // Monday-Friday (1-5): 7 AM - 5 PM
  return hour >= 7 && hour < 17;
};

export default COMPANY_INFO;
