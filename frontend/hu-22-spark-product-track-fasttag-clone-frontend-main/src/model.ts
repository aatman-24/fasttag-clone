export interface IRole {
  adminRole?: boolean;
  description?: string;
  roleName?: string;
}

export interface IWallet {
  walletId?: number;
  balance?: number;
}

export interface IVehicle {
  numberPlate?: string;
  vehicleType?: string;
  registrationNo?: string;
  username?: string;
  wallet?: IWallet;
}

export interface IUser {
  admin?: boolean;
  email?: string;
  firstName?: string;
  lastName?: string;
  mobileNumber?: string;
  password?: string;
  roles?: IRole[];
  username?: string;
  vehicles?: IVehicle[];
}

export interface ILogin {
  username: string;
  password: string;
}

export interface ILoginError {
  username?: string;
  password?: string;
}

export interface IPerson {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface IPersonError {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
}

export interface Ilocation {
  locationId?: number;
  state?: string;
  city?: string;
  pincode?: string;
  highway?: string;
}

export interface ITollPrice {
  tollPriceId?: number;
  price?: number;
  type?: string;
  tollStationId?: number;
}

export interface ITollStation {
  tollStationId?: number;
  name?: string;
  location?: Ilocation;
  tollPrices?: ITollPrice[];
}

export interface ITransactionDetail {
  transactionId?: number;
  cardId?: string;
  date: string;
  amount?: number;
  username?: string;
  tollStation?: ITollStation;
}

export interface IWallet {
  walletId?: number;
  balance?: number;
}

export interface IVehicle {
  numberPlate?: string;
  vehicleType?: string;
  registrationNo?: string;
  wallet?: IWallet;
  username?: string;
}

export interface ICard {
  cardId?: string;
  vehicle?: IVehicle;
}

export interface TollStation {
  name: string;
  state: string;
  city: string;
  pincode: string;
  highway: string;
}

export interface TollStationError {
  name?: string;
  state?: string;
  city?: string;
  pincode?: string;
  highway?: string;
}

export interface TollPrice {
  tollStationId: string;
  price: string;
}

export interface TollPriceError {
  tollStationId?: string;
  price?: string;
  type?: string;
}

export interface OrderCard {
  numberPlate: string;
  registrationNo: string;
}

export interface OrderCardError {
  numberPlate?: string;
  registrationNo?: string;
  type?: string;
}


//this is the form in which we are receiving the data from the backend
export interface GetTollStation {
    tollStationId: number,
    name: string,
    location: {
        state: string,
        city: string,
        highway: string,
        pincode: string,
    },
    tollPrices: [{
        type: string,
        price: number
    }]
}
