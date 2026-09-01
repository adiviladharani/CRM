import { useState } from "react";
import DataTable from "../../components/DataTable";
import DynamicForm from "../../components/DynamicForm";
import { entityConfig } from "../../config/entityConfig";
import { useLeads } from "../../hooks/useLeads";

function Leads() {
  const {
    leads,
    loading,
    addLead,
    updateLead,
    deleteLead,
    convertLead
  } = useLeads();

  const [showForm, setShowForm] =
    useState(false);

  const [editingLead, setEditingLead] =
    useState(null);

  const handleAdd = () => {
    setEditingLead(null);
    setShowForm(true);
  };

  const handleEdit = (lead) => {
    setEditingLead(lead);
    setShowForm(true);
  };

  const handleSubmit = async (data) => {
    if (editingLead) {
      await updateLead(
        editingLead.id,
        data
      );
    } else {
      await addLead({
        ...data,
        status: data.status || "new"
      });
    }

    setEditingLead(null);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this lead?"
      )
    ) {
      return;
    }

    await deleteLead(id);
  };

  const handleConvert = async (lead) => {
    if (
      !window.confirm(
        `Convert ${lead.name} to a customer?`
      )
    ) {
      return;
    }

    try {
      const customer =
        await convertLead(lead);

      alert(
        `Lead converted successfully. Customer ID: ${customer.id}`
      );
    } catch (error) {
      console.error(error);
      alert(
        error.message ||
          "Unable to convert lead"
      );
    }
  };

  if (loading) {
    return <div>Loading leads...</div>;
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Leads</h1>
          <p>
            Manage and convert your
            sales leads.
          </p>
        </div>

        <button
          onClick={handleAdd}
        >
          + Add Lead
        </button>
      </div>

      {showForm ? (
        <div className="form-card">
          <h2>
            {editingLead
              ? "Edit Lead"
              : "Add Lead"}
          </h2>

          <DynamicForm
            fields={
              entityConfig.leads
                .fields
            }
            initialData={
              editingLead || {}
            }
            onSubmit={
              handleSubmit
            }
            onCancel={() => {
              setShowForm(false);
              setEditingLead(null);
            }}
            submitLabel={
              editingLead
                ? "Update Lead"
                : "Create Lead"
            }
          />
        </div>
      ) : (
        <DataTable
          columns={
            entityConfig.leads
              .columns
          }
          data={leads}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onConvert={
            handleConvert
          }
        />
      )}
    </div>
  );
}

export default Leads;