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
  }
};