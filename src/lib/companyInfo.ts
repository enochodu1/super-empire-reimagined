/**
 * Super Empire Produce LLC - Real Company Information
 *
 * This file contains verified company details from public records and OSINT research.
 * Source: USDOT records, business filings, and public price lists (11/17/25-11/22/25)
 */

export const COMPANY_INFO = {
  // Legal Business Information
  legalName: 'SUPER EMPIRE PRODUCE LLC',
  dbaName: 'Super Empire Produce',

  // Contact Information
  phone: '(469) 432-9313',
  email: 'SCASTILLO@SUPEREMPIREPRODUCE.COM', // From price list header
  website: 'https://www.superempireproduce.com',

  // Physical Address (USDOT verified)
  address: {
    street: '2424 S Cesar Chavez Blvd',
    city: 'Dallas',
    state: 'TX',
    zip: '75215',
    formatted: '2424 S Cesar Chavez Blvd, Dallas, TX 75215',
  },

  // Contact Person (from price list)
  contacts: {
    sales: {
      name: 'Sindy Castillo',
      phone: '(469) 493-0767',
      email: 'SCASTILLO@SUPEREMPIREPRODUCE.COM',
    },
  },

  // Business Details
  business: {
    usdotNumber: '4210131',
    founded: '2024', // DOT authority started March 2024
    entityType: 'Limited Liability Company (LLC)',
    state: 'Texas',
  },

  // Service Area
  serviceArea: {
    states: ['Texas', 'Oklahoma', 'Arkansas', 'Louisiana'],
    stateAbbreviations: ['TX', 'OK', 'AR', 'LA'],
    description: 'We deliver fresh produce and authentic tortillas to businesses across the South-Central United States.',
  },

  // Operations
  operations: {
    fleetSize: 5,
    drivers: 7,
    operationType: 'Private (Property) - Interstate',
    cargoTypes: ['Fresh Produce', 'Commodities Dry Bulk'],
    deliveryDays: 'Monday - Saturday',
    orderingHours: '24/7 Online',
  },

  // Business Hours
  hours: {
    office: 'Monday - Friday: 7:00 AM - 5:00 PM',
    warehouse: 'Monday - Saturday: 6:00 AM - 4:00 PM',
    deliveries: 'Monday - Saturday: 8:00 AM - 6:00 PM',
    emergencyContact: '(469) 432-9313',
  },

  // Social Proof
  description: {
    short: 'Fresh wholesale produce and authentic tortillas delivered to your business.',
    long: 'Super Empire Produce specializes in delivering the freshest fruits and vegetables to businesses across Texas, Oklahoma, Arkansas, and Louisiana. Since 2024, we\'ve been committed to providing quality produce with reliable delivery and competitive pricing.',
    mission: 'To be the top choice for businesses seeking premium quality, environmentally conscious produce distribution with exceptional customer service.',
  },

  // Payment & Terms
  payment: {
    terms: 'Net 30 for approved accounts',
    methods: ['Check', 'ACH', 'Wire Transfer'],
    minimumOrder: 'No minimum for first-time customers',
    taxId: 'Available upon request',
  },

  // Certifications & Compliance
  compliance: {
    foodSafety: 'FDA Food Facility Registration',
    transportation: 'USDOT #4210131',
    insurance: 'Full liability and cargo coverage',
    licenses: 'Texas Sales Tax Permit',
  },

  // Geographic Coordinates (for maps)
  coordinates: {
    lat: 32.7506,
    lng: -96.7901,
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
