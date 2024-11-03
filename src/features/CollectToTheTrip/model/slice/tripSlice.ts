import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TripFormSchema } from '../types/TripFormSchema';
import { FormData } from '../validations/validation';

const initialState: TripFormSchema = {
    cardNumber: '',          
    expiryDate: '',          
    cvc: '',                  
    amount: 0,               
    name: '',                 
    isLoading: false,
    errors: undefined,
};

export const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setCardNumber: (state, action: PayloadAction<string>) => {
            state.cardNumber = action.payload;
        },
        setExpiryDate: (state, action: PayloadAction<string>) => {
            state.expiryDate = action.payload;
        },
        setCvc: (state, action: PayloadAction<string>) => {
            state.cvc = action.payload;
        },
        setAmount: (state, action: PayloadAction<number>) => {
            state.amount = action.payload >= 10 ? action.payload : 10; 
        },
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload.slice(0, 50); 
        },
        setErrors: (state, action: PayloadAction<FormData>) => {
            state.errors = action.payload;
        },
    },
});

export const { actions: paymentActions } = paymentSlice;
export const { reducer: paymentReducer } = paymentSlice;
