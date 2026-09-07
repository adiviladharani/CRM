import { api } from "./api";

function calculateStatus(quantity, reorderLevel) {
  if (Number(quantity) <= 0) {
    return "out-of-stock";
  }

  if (Number(quantity) <= Number(reorderLevel)) {
    return "low-stock";
  }

  return "in-stock";
}

function withStatus(item) {
  return {
    ...item,
    quantity: Number(item.quantity),
    reorderLevel: Number(item.reorderLevel),
    price: Number(item.price),
    notes: item.notes || "",
    status: calculateStatus(
      item.quantity,
      item.reorderLevel
    )
  };
}

export const inventoryService = {
  getAll() {
    return api.get("inventory");
  },

  getById(id) {
    return api.get(`inventory/${id}`);
  },

  create(item) {
    return api.post(
      "inventory",
      withStatus(item)
    );
  },

  update(id, item) {
    return api.put(
      "inventory",
      id,
      withStatus(item)
    );
  },

  remove(id) {
    return api.delete("inventory", id);
  }
};
