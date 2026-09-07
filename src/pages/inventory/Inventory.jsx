import { useState } from "react";
import DataTable from "../../components/DataTable";
import DynamicForm from "../../components/DynamicForm";
import { entityConfig } from "../../config/entityConfig";
import { useInventory } from "../../hooks/useInventory";

function Inventory() {
  const {
    inventory,
    loading,
    addItem,
    updateItem,
    deleteItem
  } = useInventory();

  const [showForm, setShowForm] =
    useState(false);

  const [editingItem, setEditingItem] =
    useState(null);

  const handleSubmit = async (data) => {
    if (editingItem) {
      await updateItem(
        editingItem.id,
        data
      );
    } else {
      await addItem(data);
    }

    setEditingItem(null);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this inventory item?"
      )
    ) {
      return;
    }

    await deleteItem(id);
  };

  if (loading) {
    return (
      <div>
        Loading inventory...
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Inventory</h1>
          <p>
            Track stock, SKUs, reorder
            levels, and locations.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingItem(null);
            setShowForm(true);
          }}
        >
          + Add Item
        </button>
      </div>

      {showForm ? (
        <div className="form-card">
          <h2>
            {editingItem
              ? "Edit Item"
              : "Add Item"}
          </h2>

          <DynamicForm
            fields={
              entityConfig
                .inventory.fields
            }
            initialData={
              editingItem || {
                lastRestockDate:
                  new Date()
                    .toISOString()
                    .split("T")[0]
              }
            }
            onSubmit={
              handleSubmit
            }
            onCancel={() => {
              setEditingItem(null);
              setShowForm(false);
            }}
            submitLabel={
              editingItem
                ? "Update Item"
                : "Create Item"
            }
          />
        </div>
      ) : (
        <DataTable
          columns={
            entityConfig
              .inventory.columns
          }
          data={inventory}
          onEdit={(item) => {
            setEditingItem(item);
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

export default Inventory;
