import { useEffect, useState } from "react";
import { api } from "../services/api";

function DynamicForm({
  fields,
  initialData = {},
  onSubmit,
  onCancel,
  submitLabel = "Save"
}) {
  const [form, setForm] =
    useState(initialData);

  const [options, setOptions] =
    useState({});

  useEffect(() => {
    setForm(initialData || {});
  }, [initialData]);

  useEffect(() => {
    async function loadOptions() {
      const sources = [
        ...new Set(
          fields
            .filter(
              (field) =>
                field.optionsSource
            )
            .map(
              (field) =>
                field.optionsSource
            )
        )
      ];

      const result = {};

      await Promise.all(
        sources.map(async (source) => {
          result[source] =
            await api.get(source);
        })
      );

      setOptions(result);
    }

    loadOptions();
  }, [fields]);

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(form);
  };

  return (
    <form
      className="dynamic-form"
      onSubmit={handleSubmit}
    >
      {fields.map((field) => (
        <div
          className="form-group"
          key={field.name}
        >
          <label>
            {field.label}
          </label>

          {field.type === "select" ? (
            <select
              name={field.name}
              value={
                form[field.name] || ""
              }
              onChange={handleChange}
              required={field.required}
            >
              <option value="">
                Select {field.label}
              </option>

              {(
                options[
                  field.optionsSource
                ] || []
              ).map((option) => (
                <option
                  key={option.id}
                  value={option.id}
                >
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === "textarea" ? (
            <textarea
              name={field.name}
              value={
                form[field.name] ?? ""
              }
              onChange={handleChange}
              required={field.required}
              rows={4}
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={
                form[field.name] ?? ""
              }
              onChange={handleChange}
              required={field.required}
            />
          )}
        </div>
      ))}

      <div className="form-actions">
        <button type="submit">
          {submitLabel}
        </button>

        <button
          type="button"
          className="secondary-button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default DynamicForm;