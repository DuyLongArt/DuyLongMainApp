import { configureStore } from '@reduxjs/toolkit'                                                                          
import counterReducer from './slice/CounterSlice'                                                                          
import authReducer from './slice/AuthSlice'                                                                                
                                                                                                                        
export const Store = configureStore({                                                                                      
reducer: {                                                                                                               
  counter: counterReducer,                                                                                               
  auth: authReducer,                                                                                                     
},                                                                                                                       
})        
export type RootState = ReturnType<typeof Store.getState>;
// Inferred type: {auth: AuthState, products: ProductsState, ...}

export type AppDispatch = typeof Store.dispatch;