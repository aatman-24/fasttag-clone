import axios from "axios";
import {
  ILogin,
  IPerson,
  IUser,
  OrderCard,
  TollPrice,
  TollStation,
} from "./model";

const config = () => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
};


// const BASE_URL:string = "https://fasttag-clone-backend-urtjok3rza-wl.a.run.app";
const BASE_URL:string = "http://localhost:8080";


export const getUser = async () => {
  try {
    const response = await axios.get(BASE_URL + "/user", config());
    return response.data.body;
  } catch (err) {
    return err;
  }
};

export const login = async (Obj: ILogin) => {
  const body = {
    username: Obj.username,
    password: Obj.password,
  };

  try {
    const response = await axios.post(BASE_URL + "/login", body, {
      headers: {
        "Content-type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const createUser = async (Obj: IPerson) => {
  const body = {
    firstName: Obj.firstName,
    lastName: Obj.lastName,
    email: Obj.email,
    mobileNumber: Obj.phoneNumber,
    role: "User",
    username: Obj.username,
    password: Obj.password,
  };

  try {
    const response = await axios.post(BASE_URL + "/register", body, {
      headers: {
        "Content-type": "application/json",
      },
    });
    return response;
  } catch (err) {
    throw new Error("Unable to access the Server");
  }
};

export const getCardDetails = async (pageNumber:number,pageSize:number) => {
  try {
    const response = await axios.get(BASE_URL + "/user/cards",{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem('token')
      },
      params:{
        pageNumber:pageNumber,
        pageSize:pageSize
      }
    }
    );
    return response.data;
  } catch (err) {
    throw new Error("Unable to access the Server Get Card Details");
  }
};

//this is giving us recent transactions we will also apply pagination here
export const getTransactionDetails = async (pageNumber:number,pageSize:number) => {
    try {
        const response = await axios.get(BASE_URL + "/user/transactions",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem('token')
            },
            params:{
                pageNumber:pageNumber,
                pageSize:pageSize
            }
        });
        return response.data;

    }
    catch (err) {
        throw new Error("Unable to access the Server Transactions");
    }
}

export const loadTollStation = async (tollStationId:string) => {

    try {
        const response = await axios.get(BASE_URL + `/admin/toll-station/${tollStationId}`,config())
        console.log(response.data.body); 
        return response;
    }
    catch (err) {
        return err;
    }
}

export const PlaceOrder = async (value: OrderCard, type: string) => {
  const body = {
    ...value,
    vehicleType: type,
  };
  const token = localStorage.getItem("token");

  try {
    const res = await axios.post(
      BASE_URL + "/purchase-card",
      body,
      config()
    );
    console.log(res.data);
    return res;
  } catch (err) {
    console.log("error while purchasing the order is ", err);
  }
};

export const recharge = async (cardId: string, amount: string) => {
  //cardId will be sent inside the url....
  //this body is notthing but the RechargeDto that we have created at the back-end
  const body = {
    amount: amount,
  };
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      BASE_URL + `/user/recharge-card/${cardId}`,
      body,
      config()
    );
    console.log(response.data);
    return response;
  } catch (err) {
    console.log("Error while recharging the card is ", err);
    return err;
  }
};

export const addTollPrice = async (formvalue: TollPrice, type: String) => {
  //this is basically the toll-price DTO that we have defined
  const body = {
    price: formvalue.price,
    type: type,
    tollStationId: formvalue.tollStationId,
  };

  const token = await localStorage.getItem("token");

  try {
    const response = await axios.post(
      BASE_URL + "/admin/toll-price",
      body,
      config()
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log("error while creating the toll-station is ", err);
    return err;
  }
};

export const createTollStation = async (formvalue: TollStation) => {
  //const history=useHistory(); can be called only inside the body of the functional-component

  //here we are sending the same TollStationDto that is defined at the back-end
  const body = formvalue;
  //in the real scenario we will fetch it from the local-storge
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      BASE_URL + "/admin/toll-station",
      body,
      config()
    );
    console.log(response.data); //here we will have body and status as sent by the backend
    //history.push('/add-toll-price');
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getTollStation = async (tollStationId: any) => {
  try {
    const response = await axios.get(
      BASE_URL + `/admin/toll-station/${tollStationId}`,
      config()
    );
    return response;
  } catch (err) {
    console.log(
      "error while fetching a particular toll-station from the backend ",
      err
    );
  }
};

export const updateTollPrice = async (value: TollPrice, type: string) => {
  const body = {
    ...value,
    type: type,
  };
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(
      BASE_URL + "/admin/toll-price",
      body,
      config()
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log("error while updating the toll-price ", err);
  }
};

export const loadAllTollStations = async (pageNumber:number,pageSize:number) => {
    try {
        const response = await axios.get(BASE_URL + `/admin/toll-stations`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem('token')
            },
            params:{
                pageNumber:pageNumber,
                pageSize:pageSize,
            }
            
        })
        //here we got the list of all the toll-stations
        //console.log(response.data.body);
        return response;

    }
    catch (err) {
        console.log("error in getting all the toll-stations from the backend is ", err);
        return err;
    }
}

// export const loadTollStation = async (tollStationId:string) => {
//     console.log(tollStationId);
//     //here we will make a call to the backend to get the toll-station by id
//     try {
//         const response = await axios.get(BASE_URL + `/admin/toll-station/${tollStationId}`, config())
//         console.log(response.data.body); //we got all the details of the toll-station now we will show it
//         return response;
//     }
//     catch (err) {
//         return err;
//     }
// }

export const updateUser=async (user:IUser)=>{
    //we should not send the password it will be saved againa and then again will be hashed..this is the issue
    const body={
        username:user.username,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        mobileNumber:user.mobileNumber
    }
    try{
        const response=await axios.put(BASE_URL + "/user",body,config())
        return response;
    }
    catch(err){
        return err;
    }
}

//this will be needed to get the page count
export const getTotalNumberofTollStation=async ()=>{
    try{
        const response=await axios.get(BASE_URL + "/admin/total/toll-station",config());
        return response;
    }
    catch(err){
        console.log("error while fetching the total no of toll-station");
        return err;
    }
}

export const getNoofTransactionforUser=async ()=>{
    try{
        const response=await axios.get(BASE_URL + "/user/number/transaction",config())
        return response;
    }
    catch(err){
        console.log("error while loading the number of transaction for the logged user");
        return err;
    }
}

export const noOfCardsForLoggedUser=async ()=>{
   try{
     const response=await axios.get(BASE_URL + "/user/number/card",config());
     return response;
   }
   catch(err){
     console.log("error while fetching the no of cards for the user is ",err);
     return err;

   }
}
