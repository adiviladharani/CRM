function DataTable({
  columns,
  data,
  onEdit,
  onDelete,
  onConvert
}) {
  return (
    <div className="table-container">
      {data.length === 0 ? (
        <div className="empty-state">
          No records found.
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              {columns.map(
                (column) => (
                  <th
                    key={
                      column.field
                    }
                  >
                    {column.label}
                  </th>
                )
              )}

              <th>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((record) => (
              <tr key={record.id}>
                {columns.map(
                  (column) => (
                    <td
                      key={
                        column.field
                      }
                    >
                      {record[
                        column.field
                      ]}
                    </td>
                  )
                )}

                <td className="actions">
                  {onEdit && (
                    <button
                      onClick={() =>
                        onEdit(
                          record
                        )
                      }
                    >
                      Edit
                    </button>
                  )}

                  {onConvert &&
                    record.status !==
                      "converted" && (
                      <button
                        onClick={() =>
                          onConvert(
                            record
                          )
                        }
                      >
                        Convert
                      </button>
                    )}

                  {onDelete && (
                    <button
                      className="delete-button"
                      onClick={() =>
                        onDelete(
                          record.id
                        )
                      }
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DataTable;