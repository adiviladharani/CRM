import { useCallback, useEffect, useState } from "react";
import { inventoryService } from "../services/inventoryService";

export function useInventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadInventory = useCallback(async () => {
    try {
      setLoading(true);

      const data =
        await inventoryService.getAll();

      setInventory(data);
      setError("");
    } catch (error) {
      console.error(error);
      setError("Unable to load inventory");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInventory();
  }, [loadInventory]);

  const addItem = async (data) => {
    await inventoryService.create(data);
    await loadInventory();
  };

  const updateItem = async (
    id,
    data
  ) => {
    await inventoryService.update(id, data);
    await loadInventory();
  };

  const deleteItem = async (id) => {
    await inventoryService.remove(id);
    await loadInventory();
  };

  return {
    inventory,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    refresh: loadInventory
  };
}
