/**
 * Travel options.
 */
export enum TravelOption {
  sleep,
  walk = 1,
  car = 2,
  bus = 4,
  train = 8,
  flight = 16,
  taxi = 32,
  ferry = 64,
  undefined = 128
}

/**
 * Location options.
 */
export enum LocationOption {
  accommodation = 0,
  address = 1,
  destination = 2,
  airport = 4,
  station = 8,
  unknown = 16
}

/**
 * Search data to retrive detail information for a trip.
 */
export interface DetailSearchData {

  /** The key containing the trip id and segment pointer */
  tripKey: string;

  /** Selected alternatives (container - segment - alternative) @pattern k-[0-9]-[0-9]-[0-9] */
  selectedAlternatives?: string;

  /** A session id generated by the back end */
  sessionId: string;

  /** Origin location */
  origin: GeoLocation;

  /** Description of the origin location */
  originDescription?: string;

  /** Destination location */
  destination: GeoLocation;

  /** Description of the destination location */
  destinationDescription?: string;

  /** Timing of the appointment @pattern [2-9][0-9]{3}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2} */
  timing: string;

  /** Optimizing the trip towards a target date or from a start date */
  targetDate: boolean;

  /** The currency code @pattern [A-Z]{3} */
  currency: string;

  /** The currency code @pattern [a-z]{2}-[A-Z]{2} */
  locale: string;

  /** Number of travellers @type integer @min 1 @max 5 */
  numberOfTravelers?: number;

  /** Temporarily overwritten user preferences */
  preferences?: UserPreference[];
}

/**
 * The search data object coming from the client.
 */
export interface SearchData {

  /** Origin location */
  origin: GeoLocation;

  /** Description of the origin location */
  originDescription?: string;

  /** Destination location */
  destination: GeoLocation;

  /** Description of the destination location */
  destinationDescription?: string;

  /** Timing of the appointment @pattern [2-9][0-9]{3}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2} */
  timing: string;

  /** Optimizing the trip towards a target date or from a start date */
  targetDate: boolean;

  /** The currency code @pattern [A-Z]{3} */
  currency: string;

  /** The currency code @pattern [a-z]{2}-[A-Z]{2} */
  locale: string;

  /** Number of travellers @type integer @min 1 @max 5 */
  numberOfTravelers?: number;

  /** Temporarily overwritten user preferences */
  preferences?: UserPreference[];
}

/**
 * The search data object for hotels coming from the client.
 */
export interface HotelSearchData {

  /** The key containing the trip id and segment pointer */
  tripKey: string;

  /** A session id generated by the back end */
  sessionId: string;

  /** Location where to search for hotels */
  location: GeoLocation;

  /** Date of the stay @pattern [2-9][0-9]{3}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2} */
  dateString: string;

  /** Number of days to stay @type integer */
  duration: number;

  /** The currency code @pattern [a-z]{2}-[A-Z]{2} */
  locale: string;

  /** The currency code @pattern [A-Z]{3} */
  currency: string;

  /** IP address of the client */
  ipAddress: string;

  /** The identifier string of the user agent */
  userAgent: string;
}

/**
 * Trip data being returned by the backend for a trip search.
 */
export interface TripData {

  /** The key containing the trip id and segment pointer */
  tripKey: string;

  /** A session id generated by the back end */
  sessionId: string;

  /** The origin identifier */
  origin: {

    /** Description of the _origin_ location */
    description: string;

    /** The origin location */
    location: GeoLocation;

    /** Location type */
      type?: LocationOption;

    /** Timezone e.g. Europe/Berlin */
    timeZone: string;

    /** Address of the location */
    address?: string;

    /** Country name */
    country?: string;
  };

  /** The destination identifier */
  destination: {

    /** Description of the destination location */
    description: string;

    /** The destination location */
    location: GeoLocation;

    /** Location type */
      type: LocationOption;

    /** Timezone e.g. Europe/Berlin */
    timeZone: string;

    /** Address of the location */
    address?: string;

    /** Country name */
    country?: string;
  };

  /** Timing information of the appointment as sent by the client */
  timing: {

    /** Appointment timing @pattern [2-9][0-9]{3}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2} */
    value: string;

    /** Timezone e.g. Europe/Berlin */
    timeZone: string;
  };

  /** Departure time @pattern [2-9][0-9]{3}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2} */
  departureTime: string;

  /** Arrival time @pattern [2-9][0-9]{3}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2} */
  arrivalTime: string;

  /** Distance in km */
  distance: number;

  /** Duration in minutes @type integer */
  duration: number;

  /** Price of the trip */
  price: number;

  /** The currency code @pattern [A-Z]{3} */
  currency: string;

  /** A data structure containing the trip segments */
  segmentsContainer:TripSegmentContainer[];

  /** Messages for the user regarding the trip. */
  messages?: string[];
}

/**
 * A data structure defining segments of the trip.
 */
export interface TripSegmentContainer {

  /** Is it a major segment container */
  isMajor: boolean;

  /** The available alternatives for the current _TripSegmentContainer_ */
  alternatives:TripSegmentData[][];
}

/**
 * Trip segment data structure.
 */
export interface TripSegmentData {

  start:{
    type: number;
    description: string;
    location: GeoLocation;
    timeZone: string;
    address?: string;
    country?: string;
  };

  end:{
    type:number;
    description:string;
    location: GeoLocation;
    timeZone:string;
    address?:string;
    country?:string;
  };

  /** Departure time @pattern [2-9][0-9]{3}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2} */
  departureTime: string;

  /** Arrival time @pattern [2-9][0-9]{3}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2} */
  arrivalTime: string;

  /** Duration in minutes @type integer */
  duration: number;

  transferDuration: number; // minutes
  distance: number; // km
  path: string; // polyline format
  type: TravelOption;
  isMajor:number;
  information?:string; // includes information for flights, connections, ...
  details?:any; // could be flight details, train details, ...
  price?:{
    amount:number;
    currency:string;
    estimate:boolean;
  };
  provider?:Provider;
  pricingOptions?:PricingOption[];
  bookingLink?:string;
  alternatives?:TimingAlternative[];
}

/**
 * Timing alternatives data structure.
 */
export interface TimingAlternative {

  /** Departure time @pattern [2-9][0-9]{3}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2} */
  departureTime: string;

  /** Arrival time @pattern [2-9][0-9]{3}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2} */
  arrivalTime: string;

  /** Duration in minutes @type integer */
  duration: number;

  /** Transfer duration in minutes @type integer */
  transferDuration?: number;

  /** Number of stops @type integer */
  stops: number;


  segments:TripSegmentData[];

  /** The polyline used in Google Maps */
  path?: string;

  /** Pricing information */
  price?: {
    amount:number;
    currency:string;
    estimate?:boolean;
  }


  pricingOptions?:PricingOption[];


  flightDetails?:FlightDetails;


  publicTransportDetails?:PublicTransportDetails;


  information?:string;
}

export interface Carrier {
  code:string;
  name:string;
  imageUrl?:string;
  displayCode?:string;
}

export interface FlightDetails {
  carriers:Carrier[];
  operatingCarriers?:Carrier[];
  flightNumbers?:{
    carrier:Carrier;
    flightNumber:string;
  }[];
}

export interface PublicTransportDetails {
  line:{
    name:string;
    headSign:string;
  };
  vehicle:{
    type:string;
  };
  agencies:{
    name:string;
    url:string;
    imageUrl?:string;
  }[];
  interval?:number; // minutes
}

export interface Provider {
  name:string;
  imageUrl?:string;
  url?:string;
}

/**
 * Hotel data structure.
 */
export interface Hotel {

  /** Identifying the hotel @type integer */
  id:number;

  name:string;
  address:string;
  city:string;
  postalCode:string;
  imageUrl:string;
  standard:number; // star rating as float
  rating:number; // TripAdvisor rating as float
  distance:number;

  /** Distance unit (MI or KM) @pattern [I-M]{2} */
  distanceUnit:string;

  location:GeoLocation;
  price:number;
  currency:string;
  deepLink:string;
}

/**
 * Geo location data structure.
 */
export interface GeoLocation {

  /** Latitude */
  latitude:number;

  /** Longitude */
  longitude:number;
}

/**
 *
 */
export interface PricingOption {
  agents:{
    name:string;
    imageUrl:string;
    type?:string; // e.g. "TravelAgent"
  }[];
  quoteAgeInMinutes?:number;
  price:{
    amount:number;
    currency:string;
  };
  deeplinkUrl:string;
}

/**
 * User preference data structure.
 */
export interface UserPreference {

  /** User preference key */
  key: string;

  /** User preference value */
  value: string;

  /** User preference category */
  category?: string;

  /** User preference description */
  description?: string;
}

/**
 * A user favorite that can be either a place or a route.
 */
export interface Favorite {

  id?: number;

  origin: {
    description: string
    location: GeoLocation;
    type?: LocationOption;
  };

  destination?: {
    description: string
    location: GeoLocation;
    type?: LocationOption;
  };

  position?: number;

  transport?: TravelOption;
}