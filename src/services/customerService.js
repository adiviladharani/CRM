import { api } from "./api";

export const customerService = {
  getAll() {
    return api.get("customers");
  },

  getById(id) {
    return api.get(`customers/${id}`);
  },

  create(customer) {
    return api.post("customers", customer);
  },

  update(id, customer) {
    return api.put("customers", id, customer);
  },

  remove(id) {
    return api.delete("customers", id);
  }
};