export const entityConfig = {
  customers: {
    title: "Customers",
    description: "Manage customers",

    fields: [
      {
        name: "name",
        label: "Name",
        type: "text",
        required: true
      },
      {
        name: "company",
        label: "Company",
        type: "text",
        required: true
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        required: true
      },
      {
        name: "phone",
        label: "Phone",
        type: "text",
        required: true
      },
      {
        name: "type",
        label: "Customer Type",
        type: "select",
        optionsSource: "customerTypes",
        required: true
      }
    ],

    columns: [
      {
        field: "name",
        label: "Name"
      },
      {
        field: "company",
        label: "Company"
      },
      {
        field: "email",
        label: "Email"
      },
      {
        field: "phone",
        label: "Phone"
      },
      {
        field: "type",
        label: "Type"
      }
    ]
  },

  leads: {
    title: "Leads",
    description: "Manage leads",

    fields: [
      {
        name: "name",
        label: "Name",
        type: "text",
        required: true
      },
      {
        name: "company",
        label: "Company",
        type: "text",
        required: true
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        required: true
      },
      {
        name: "phone",
        label: "Phone",
        type: "text",
        required: true
      },
      {
        name: "source",
        label: "Source",
        type: "select",
        optionsSource: "leadSources",
        required: true
      },
      {
        name: "status",
        label: "Status",
        type: "select",
        optionsSource: "leadStatuses",
        required: true
      }
    ],

    columns: [
      {
        field: "name",
        label: "Name"
      },
      {
        field: "company",
        label: "Company"
      },
      {
        field: "email",
        label: "Email"
      },
      {
        field: "phone",
        label: "Phone"
      },
      {
        field: "source",
        label: "Source"
      },
      {
        field: "status",
        label: "Status"
      }
    ]
  },

  inventory: {
    title: "Inventory",
    description: "Manage inventory",

    fields: [
      {
        name: "name",
        label: "Item Name",
        type: "text",
        required: true
      },
      {
        name: "sku",
        label: "SKU",
        type: "text",
        required: true
      },
      {
        name: "category",
        label: "Category",
        type: "select",
        optionsSource: "inventoryCategories",
        required: true
      },
      {
        name: "quantity",
        label: "Quantity",
        type: "number",
        required: true
      },
      {
        name: "reorderLevel",
        label: "Reorder Level",
        type: "number",
        required: true
      },
      {
        name: "price",
        label: "Price",
        type: "number",
        required: true
      },
      {
        name: "location",
        label: "Location",
        type: "text",
        required: true
      },
      {
        name: "lastRestockDate",
        label: "Last Restock Date",
        type: "date",
        required: false
      },
      {
        name: "notes",
        label: "Notes",
        type: "textarea",
        required: false
      }
    ],

    columns: [
      {
        field: "name",
        label: "Item Name"
      },
      {
        field: "sku",
        label: "SKU"
      },
      {
        field: "category",
        label: "Category"
      },
      {
        field: "quantity",
        label: "Quantity"
      },
      {
        field: "reorderLevel",
        label: "Reorder Level"
      },
      {
        field: "price",
        label: "Price"
      },
      {
        field: "status",
        label: "Status"
      },
      {
        field: "location",
        label: "Location"
      }
    ]
  }
};