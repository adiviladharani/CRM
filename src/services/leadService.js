import { api } from "./api";

export const leadService = {
  getAll() {
    return api.get("leads");
  },

  getById(id) {
    return api.get(`leads/${id}`);
  },

  create(lead) {
    return api.post("leads", lead);
  },

  update(id, lead) {
    return api.put("leads", id, lead);
  },

  remove(id) {
    return api.delete("leads", id);
  },

  async convert(lead) {
    if (lead.status === "converted") {
      throw new Error("Lead is already converted");
    }

    const customers = await api.get("customers");

    const existingCustomer = customers.find(
      (customer) =>
        customer.email?.toLowerCase() ===
        lead.email?.toLowerCase()
    );

    if (existingCustomer) {
      await api.patch("leads", lead.id, {
        status: "converted",
        convertedCustomerId: existingCustomer.id
      });

      return existingCustomer;
    }

    const customer = await api.post("customers", {
      name: lead.name,
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      type: "business",
      convertedFromLeadId: lead.id
    });

    await api.patch("leads", lead.id, {
      status: "converted",
      convertedCustomerId: customer.id
    });

    return customer;
  }
};