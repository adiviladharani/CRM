import { useCallback, useEffect, useState } from "react";
import { leadService } from "../services/leadService";

export function useLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLeads = useCallback(async () => {
    try {
      setLoading(true);

      const data =
        await leadService.getAll();

      setLeads(data);
      setError("");
    } catch (error) {
      console.error(error);
      setError("Unable to load leads");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  const addLead = async (data) => {
    await leadService.create(data);
    await loadLeads();
  };

  const updateLead = async (
    id,
    data
  ) => {
    await leadService.update(id, data);
    await loadLeads();
  };

  const deleteLead = async (id) => {
    await leadService.remove(id);
    await loadLeads();
  };

  const convertLead = async (lead) => {
    const customer =
      await leadService.convert(lead);

    await loadLeads();

    return customer;
  };

  return {
    leads,
    loading,
    error,
    addLead,
    updateLead,
    deleteLead,
    convertLead,
    refresh: loadLeads
  };
}