import { useEffect, useState } from "react";
import { api } from "../services/api";

function Dashboard() {
  const [cards, setCards] =
    useState([]);

  const [data, setData] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [
          cardsData,
          leads,
          customers,
          inventory
        ] = await Promise.all([
          api.get(
            "dashboardCards"
          ),
          api.get("leads"),
          api.get("customers"),
          api.get("inventory")
        ]);

        setCards(cardsData);

        setData({
          leads,
          customers,
          inventory
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const calculate = (card) => {
    const records =
      data[card.resource] || [];

    if (
      card.calculation ===
      "count"
    ) {
      return records.length;
    }

    if (
      card.calculation ===
      "filter-count"
    ) {
      return records.filter(
        (record) =>
          record[card.field] ===
          card.value
      ).length;
    }

    return 0;
  };

  if (loading) {
    return (
      <div>
        Loading dashboard...
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>
            CRM overview
          </p>
        </div>
      </div>

      <div className="cards">
        {cards.map((card) => (
          <div
            className="card"
            key={card.id}
          >
            <h3>
              {card.label}
            </h3>

            <h2>
              {calculate(card)}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;