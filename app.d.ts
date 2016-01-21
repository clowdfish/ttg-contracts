/**
 * Data structure of the available countries.
 */
interface Country {
  /** Two-character country code */
  code: string;

  /** Name of the country in English */
  name: string;
}

/**
 * Data structure that holds the information for different currencies.
 */
interface Currency {

  /** Three letter currency code e.g. USD */
  code: string;

  /** Currency symbol e.g. $ */
  symbol: string;

  /** Thousands separator e.g. ',' */
  thousandsSeparator: string;

  /** Thousands separator e.g. '.' */
  decimalSeparator: string;

  /** Is the currency symbol on the left */
  symbolOnLeft: boolean;

  /** Is there a space between the currency symbol and the amount */
  spaceBetweenAmountAndSymbol: boolean;

  /** How many decimal digits does the currency imply */
  decimalDigits: number;
}

/**
 * Data structure of the available locales.
 */
interface Locale {

  /** Two-character language code (ISO 639‑1) */
  code: string;

  /** Name of the language in the language itself */
  name: string;

  /** The locale as a combination of language and country */
  locale: string;

  /** Default currency for that locale */
  defaultCurrency: string;

  /** Date format as used by Moment.js */
  dateFormat: string;

  /** 0 = Sunday, 1 = Monday */
  startingDay: number;

  /** Is the locale used as default language */
  isDefault?: boolean;
}

/**
 * The translation object for a specific language.
 */
interface Translation {

}

/**
 * The user object being attached to the response.
 */
interface User {
  id: number;
  email: string;
  twitter?: string;
  token?: string;
}
