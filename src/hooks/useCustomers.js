import { useCallback, useEffect, useState } from "react";
import { customerService } from "../services/customerService";

export function useCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCustomers = useCallback(async () => {
    try {
      setLoading(true);

      const data =
        await customerService.getAll();

      setCustomers(data);
      setError("");
    } catch (error) {
      console.error(error);
      setError("Unable to load customers");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  const addCustomer = async (data) => {
    await customerService.create(data);
    await loadCustomers();
  };

  const updateCustomer = async (
    id,
    data
  ) => {
    await customerService.update(id, data);
    await loadCustomers();
  };

  const deleteCustomer = async (id) => {
    await customerService.remove(id);
    await loadCustomers();
  };

  return {
    customers,
    loading,
    error,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    refresh: loadCustomers
  };
}