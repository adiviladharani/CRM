import { useEffect, useState } from "react";
import { api } from "../services/api";

export function useSettings() {
  const [settings, setSettings] = useState({
    appConfig: {},
    navigation: [],
    dashboardCards: [],
    leadStatuses: [],
    leadSources: [],
    customerTypes: []
  });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [
          appConfig,
          navigation,
          dashboardCards,
          leadStatuses,
          leadSources,
          customerTypes
        ] = await Promise.all([
          api.get("appConfig"),
          api.get("navigation"),
          api.get("dashboardCards"),
          api.get("leadStatuses"),
          api.get("leadSources"),
          api.get("customerTypes")
        ]);

        setSettings({
          appConfig,
          navigation,
          dashboardCards,
          leadStatuses,
          leadSources,
          customerTypes
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    settings,
    loading
  };
}