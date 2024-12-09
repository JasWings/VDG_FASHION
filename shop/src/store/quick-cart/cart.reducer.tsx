import {
  Item,
  UpdateItemInput,
  addItemWithQuantity,
  removeItemOrQuantity,
  addItem,
  updateItem,
  removeItem,
  calculateUniqueItems,
  calculateItemTotals,
  calculateTotalItems,
  calculateTotal,
} from './cart.utils';

interface Metadata {
  [key: string]: any;
}

type Action =
  | { type: 'ADD_ITEMS_WITH_QUANTITY'; items: Item[] }
  | { type: 'ADD_ITEM_WITH_QUANTITY'; item: Item; quantity: number }
  | { type: 'REMOVE_ITEM_OR_QUANTITY'; id: Item['id']; quantity?: number }
  | { type: 'ADD_ITEM'; id: Item['id']; item: Item }
  | { type: 'UPDATE_ITEM'; id: Item['id']; item: UpdateItemInput }
  | { type: 'REMOVE_ITEM'; id: Item['id'] }
  | { type: 'RESET_CART' }
  | { type: 'UPDATE_CART_LANGUAGE'; language: string }
  | { type: 'SET_CART'; cartData: State };

export interface State {
  items: Item[];
  uuid:string,
  price_details:{
    total_actual_price: number | null,
    total_current_price: number | null,
    total_quantity: number | null,
    total_weight_in_grams: number | null
  };
  country:{
    currency_symbol:string;
    max_weight_kg:number;
    max_weight_per_product_kg:number;
  }
  billing_address:{
    id:string,
    uuid:string,            
    first_name: string,
    last_name: string,
    address_type:string,
    phone_number: string,
    address_line_1: string,
    address_line_2: string,
    address_line_3:string,
    landmark: string,
    remarks: string,
    city: string,
    state: string,
    pin_code: number,
    user: number,
    country: number

  },
  shipping_address:{
    id:string,
    uuid:string,            
    first_name: string,
    last_name: string,
    address_type:string,
    phone_number: string,
    address_line_1: string,
    address_line_2: string,
    address_line_3:string,
    landmark: string,
    remarks: string,
    city: string,
    state: string,
    pin_code: number,
    user: number,
    country: number
  }
}

export const initialState: State = {
  items: [],
  price_details:{
    total_actual_price: 0,
    total_current_price: 0,
    total_quantity: 0,
    total_weight_in_grams: 0
},
country:{
  currency_symbol:"$",
  max_weight_kg:50,
  max_weight_per_product_kg:2
},
billing_address:{
    id:"",
    uuid:"",            
    first_name: "",
    last_name: "",
    address_type:"",
    phone_number: "",
    address_line_1: "",
    address_line_2: "",
    address_line_3:"",
    landmark: "",
    remarks: "",
    city: "",
    state: "",
    pin_code: 0,
    user: 0,
    country: 0
},
shipping_address:{
  id:"",
  uuid:"",            
  first_name: "",
  last_name: "",
  address_type:"",
  phone_number: "",
  address_line_1: "",
  address_line_2: "",
  address_line_3:"",
  landmark: "",
  remarks: "",
  city: "",
  state: "",
  pin_code: 0,
  user: 0,
  country: 0
},
uuid:""
};

export function cartReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_CART':{
         const {cartData}=action
        
         return {
          items:cartData.items,
          country:{
             currency_symbol:cartData.country.currency_symbol,
             max_weight_kg:cartData.country.max_weight_kg,
             max_weight_per_product_kg:cartData.country.max_weight_per_product_kg
          },
          price_details:{
            total_actual_price:cartData?.price_details?.total_actual_price,
            total_current_price:cartData?.price_details?.total_current_price,
            total_quantity:cartData?.price_details?.total_quantity,
            total_weight_in_grams:cartData?.price_details?.total_weight_in_grams
          },
          shipping_address:{
            id:cartData?.shipping_address?.id,
            uuid:cartData?.shipping_address?.uuid,
            first_name:cartData?.shipping_address?.first_name,
            last_name:cartData?.shipping_address?.last_name,
            phone_number:cartData?.shipping_address?.phone_number,
            address_type:cartData?.shipping_address?.address_type,
            address_line_1:cartData?.shipping_address?.address_line_1,
            address_line_2:cartData?.shipping_address?.address_line_2,
            address_line_3:cartData?.shipping_address?.address_line_3,
            landmark:cartData?.shipping_address?.landmark,
            remarks:cartData?.shipping_address?.remarks,
            city:cartData?.shipping_address?.city,
            state:cartData?.shipping_address?.state,
            pin_code:cartData?.shipping_address?.pin_code,
            user:cartData?.shipping_address?.user,
            country:cartData?.shipping_address?.country
          },
          billing_address:{
            id:cartData?.billing_address?.id,
            uuid:cartData?.billing_address?.uuid,
            first_name:cartData?.billing_address?.first_name,
            last_name:cartData?.billing_address?.last_name,
            phone_number:cartData?.billing_address?.phone_number,
            address_type:cartData?.billing_address?.address_type,
            address_line_1:cartData?.billing_address?.address_line_1,
            address_line_2:cartData?.billing_address?.address_line_2,
            address_line_3:cartData?.billing_address?.address_line_3,
            landmark:cartData?.billing_address?.landmark,
            remarks:cartData?.billing_address?.remarks,
            city:cartData?.billing_address?.city,
            state:cartData?.billing_address?.state,
            pin_code:cartData?.billing_address?.pin_code,
            user:cartData?.billing_address?.user,
            country:cartData?.billing_address?.country
          },uuid:cartData.uuid
         }
    }
    case 'ADD_ITEMS_WITH_QUANTITY': {
      const items = [...state.items, ...action.items];
      return generateFinalState(state, items);
    }
    case 'ADD_ITEM_WITH_QUANTITY': {
      const items = addItemWithQuantity(
        state.items,
        action.item,
        action.quantity
      );
      return generateFinalState(state, items);
    }
    case 'REMOVE_ITEM_OR_QUANTITY': {
      const items = removeItemOrQuantity(
        state.items,
        action.id,
        action.quantity ?? 1
      );
      return generateFinalState(state, items);
    }
    case 'ADD_ITEM': {
      const items = addItem(state.items, action.item);
      return generateFinalState(state, items);
    }
    case 'REMOVE_ITEM': {
      const items = removeItem(state.items, action.id);
      return generateFinalState(state, items);
    }
    case 'UPDATE_ITEM': {
      const items = updateItem(state.items, action.id, action.item);
      return generateFinalState(state, items);
    }
    case 'UPDATE_CART_LANGUAGE': {
      return {
        ...initialState,
        language: action.language,
      };
    }
    case 'RESET_CART':
      return initialState;
    default:
      return state;
  }
}

const generateFinalState = (state: State, items: Item[]) => {
  const totalUniqueItems = calculateUniqueItems(items);
  return {
    ...state,
    items: calculateItemTotals(items),
    totalItems: calculateTotalItems(items),
    totalUniqueItems,
    total: calculateTotal(items),
    isEmpty: totalUniqueItems === 0,
  };
};
