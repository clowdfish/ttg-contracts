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
 * Public transport vehicle types.
 */
export enum VehicleType {
  tram,
  underground,
  rail,
  bus,
  ferry,
  other
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

  /** The identifier string of the user's browser */
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
  origin: Location;

  /** The destination identifier */
  destination: Location;

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
  isMajor: number;

  /** The available alternatives for the current _TripSegmentContainer_ */
  alternatives:TripSegmentData[][];
}

/**
 * Trip segment data structure.
 */
export interface TripSegmentData {

  /** The start location of the the trip segment */
  start: Location;

  /** The end location of the the trip segment */
  end: Location;

  /** Departure time @pattern [2-9][0-9]{3}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2} */
  departureTime: string;

  /** Arrival time @pattern [2-9][0-9]{3}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2} */
  arrivalTime: string;

  /** Duration in minutes @type integer */
  duration: number;

  /** Transfer duration to get from the current segment's end to the next one's start in minutes */
  transferDuration: number;

  /** Distance of the trip segment in km */
  distance: number;

  /** Segment path in the polyline format */
  path: string;

  /** Means of travel */
  type: TravelOption;

  /** Does the segment cover a major part of the whole trip */
  isMajor:number;

  /** Any additional information for flights, trains, connections, ...*/
  details?:any;

  /** Price for the trip segment */
  price?: Price;

  /** Provider details for the segment */
  provider?:Provider;

  /** Optional timing alternatives for the segment */
  timingAlternatives?:TimingAlternative[];

  /** Optional pricing alternatives from different operators for the segment */
  pricingAlternatives?:PricingOption[];

  /** Some providers might provide a booking link that could be convenient for the user */
  bookingLink?:string;
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

  /** Segments of the timing alternative */
  segments:TripSegmentData[];

  /** The polyline used in Google Maps */
  path?: string;

  price?: Price;

  bookingLink?: string;

  /** Alternative pricing options */
  pricingAlternatives?:PricingOption[];

  /** Detailed information for flight segments */
  flightDetails?:FlightDetails;

  /** Detailed information for public transport segments */
  publicTransportDetails?:PublicTransportDetails;
}

/**
 * Flight carrier information.
 */
export interface Carrier {

  /** Operator code */
  code:string;

  name:string;

  /** Reference url for a logo of the provider */
  imageUrl?:string;

  /** How is the carrier abbreviated on information screens */
  displayCode?:string;
}

/**
 * Flight details
 */
export interface FlightDetails {
  carriers:Carrier[];

  /** Which carrier operates the flight */
  operatingCarriers?:Carrier[];

  flightNumbers?:FlightNumbers[];
}

/**
 * Flight number of the flight connection.
 */
export interface FlightNumbers {
  carrier?:Carrier;

  /** Flight number given by the provider */
  flightNumber:string;
}

/**
 * Price data structure.
 */
export interface Price {
  amount:number;

  /** Three letter currency code @pattern [A-Z]{3} */
  currency:string;

  /** Is the price a concrete offer or just an estimate */
  estimate?:boolean;
}

/**
 * Public transport details.
 */
export interface PublicTransportDetails {
  line: {
    /** Name of the connection / line */
    name: string;

    /** The direction of the connection */
    headSign: string;
  };

  vehicle: VehicleType;
  provider: Provider[];

  /** Interval of the connection in minutes */
  interval?:number;
}

/**
 * Provider information of train, flight or hotel providers.
 */
export interface Provider {

  name:string;

  /** Reference website of the provider */
  url?:string;

  /** Reference url for a logo of the provider */
  imageUrl?:string;

  /** Provider type like TravelAgent or RailOperastor */
  type?:string;
}

/**
 * Hotel data structure.
 */
export interface Hotel {

  /** Identifying the hotel @type integer */
  id:number;

  name:string;
  location:GeoLocation;
  price:Price;

  /** Street and house number */
  address:string;

  city:string;
  postalCode:string;
  imageUrl:string;

  /** star rating e.g. 3.5 stars */
  standard:number;

  /** TripAdvisor rating */
  rating:number;

  /** Distance from the target location */
  distance:number;

  /** Distance unit (MI or KM) @pattern [I-M]{2} */
  distanceUnit:string;

  /** Reference url to the hotel website */
  deepLink:string;
}

/**
 * Full stack location information.
 */
export interface Location {

  /** Description of the destination location */
  description: string;

  /** The destination location */
  location: GeoLocation;

  /** Location type */
  type?: LocationOption;

  /** Timezone e.g. Europe/Berlin */
  timeZone?: string;

  /** Address of the location */
  address?: string;

  /** Country name */
  country?: string;

  /** Country code */
  countryCode?: string;
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
 * An alternative pricing for a given segment.
 */
export interface PricingOption {
  provider: Provider[];
  quoteAgeInMinutes?: number;
  price: Price;

  /** The reference to the concrete pricing */
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

  /** If only the origin is given it is a location favorite */
  origin: Location;

  /** The destination is arbitrary and defines a connection favorite */
  destination?: Location;

  /** Position of the favorite in the overall list of favorites */
  position?: number;

  /** The user can add a preferred transport fo a favorite */
  transport?: TravelOption;
}
