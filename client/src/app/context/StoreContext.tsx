import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface StoreContextValue {
  basket: Basket | null;
  setBasket: (basket: Basket | null) => void;
  removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function useStoreContext() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStoreContext must be used within a StoreContextProvider");
  }
  return context;
}

export function StoreProvider({children}: PropsWithChildren<any>) {
  const [basket, setBasket] = useState<Basket | null>(null);

  const removeItem = (productId: number, quantity: number) => {
    if (!basket) return;
    const items = [...basket.items];
    const itemFindex = items.findIndex(x => x.productId === productId);
    if (itemFindex >= 0) {
      items[itemFindex].quantity -= quantity;
      if (items[itemFindex].quantity === 0) items.splice(itemFindex, 1);
      setBasket(prevState => {
        return {...prevState!, items};
      })
    }
  }

  return (
    <StoreContext.Provider value={{basket, setBasket, removeItem}}>
      {children}
    </StoreContext.Provider>
  )
}