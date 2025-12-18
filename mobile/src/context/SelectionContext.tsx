import React, { createContext, useContext, useState, ReactNode } from "react";
import { UIBus } from "@/src/types/UI/bus";
import { UIRoute } from "@/src/types/UI/route";
import { UIStation } from "@/src/types/UI/station";

export type SelectionType = "bus" | "route" | "station";

export interface SelectedItem {
  id: string;
  type: SelectionType;
  data: UIBus | UIRoute | UIStation;
  timestamp: number;
}

interface SelectionContextType {
  selectedItems: SelectedItem[];
  addItem: (type: SelectionType, data: UIBus | UIRoute | UIStation) => void;
  removeItem: (id: string) => void;
}

const SelectionContext = createContext<SelectionContextType | undefined>(
  undefined,
);

export const SelectionProvider = ({ children }: { children: ReactNode }) => {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const addItem = (type: SelectionType, data: UIBus | UIRoute | UIStation) => {
    const newItem: SelectedItem = {
      id: Date.now().toString(),
      type,
      data,
      timestamp: Date.now(),
    };
    // Add new item to the beginning of the list
    setSelectedItems((prev) => [newItem, ...prev]);
  };

  const removeItem = (id: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <SelectionContext.Provider value={{ selectedItems, addItem, removeItem }}>
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (context === undefined) {
    throw new Error("useSelection must be used within a SelectionProvider");
  }
  return context;
};