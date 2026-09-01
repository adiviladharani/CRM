import { useState } from "react";
import DataTable from "../../components/DataTable";
import DynamicForm from "../../components/DynamicForm";
import { entityConfig } from "../../config/entityConfig";
import { useCustomers } from "../../hooks/useCustomers";

function Customers() {
  const {
    customers,
    loading,
    addCustomer,
    updateCustomer,
    deleteCustomer
  } = useCustomers();

  const [showForm, setShowForm] =
    useState(false);

  const [editingCustomer, setEditingCustomer] =
    useState(null);

  const handleSubmit = async (data) => {
    if (editingCustomer) {
      await updateCustomer(
        editingCustomer.id,
        data
      );
    } else {
      await addCustomer(data);
    }

    setEditingCustomer(null);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this customer?"
      )
    ) {
      return;
    }

    await deleteCustomer(id);
  };

  if (loading) {
    return (
      <div>
        Loading customers...
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Customers</h1>
          <p>
            Manage your customers.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingCustomer(null);
            setShowForm(true);
          }}
        >
          + Add Customer
        </button>
      </div>

      {showForm ? (
        <div className="form-card">
          <h2>
            {editingCustomer
              ? "Edit Customer"
              : "Add Customer"}
          </h2>

          <DynamicForm
            fields={
              entityConfig
                .customers.fields
            }
            initialData={
              editingCustomer || {}
            }
            onSubmit={
              handleSubmit
            }
            onCancel={() => {
              setEditingCustomer(null);
              setShowForm(false);
            }}
            submitLabel={
              editingCustomer
                ? "Update Customer"
                : "Create Customer"
            }
          />
        </div>
      ) : (
        <DataTable
          columns={
            entityConfig
              .customers.columns
          }
          data={customers}
          onEdit={(customer) => {
            setEditingCustomer(
              customer
            );
            setShowForm(true);
          }}
          onDelete={
            handleDelete
          }
        />
      )}
    </div>
  );
}

export default Customers;