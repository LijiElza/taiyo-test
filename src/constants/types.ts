export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  status: string;
};

export type ContactFormState = {
  firstName: string;
  lastName: string;
  status: string;
};

export type StateType = { contacts: Contact[] | [] };

export type CountryData = {
  country: string;
  countryInfo: {
    lat: number;
    long: number;
  };
  cases: number;
  recovered: number;
  deaths: number;
};

export type WorldData = {
  cases: number;
  recovered: number;
  deaths: number;
};
