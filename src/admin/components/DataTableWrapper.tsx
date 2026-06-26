import { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net-bs5';

interface DataTableWrapperProps {
  data: any[];
  columns: any[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function DataTableWrapper({ data, columns, onEdit, onDelete }: DataTableWrapperProps) {
  const tableRef = useRef<HTMLTableElement>(null);
  const dataTableRef = useRef<any>(null);

  useEffect(() => {
    if (tableRef.current) {
      // Add action columns if onEdit or onDelete is provided
      const finalColumns = [...columns];
      if (onEdit || onDelete) {
        finalColumns.push({
          title: 'Actions',
          data: 'id',
          orderable: false,
          render: (data: string) => {
            return `
              <div class="d-flex gap-2">
                ${onEdit ? `<button class="btn btn-sm btn-primary edit-btn" data-id="${data}"><i class="bi bi-pencil"></i> Edit</button>` : ''}
                ${onDelete ? `<button class="btn btn-sm btn-danger delete-btn text-white" data-id="${data}"><i class="bi bi-trash"></i> Delete</button>` : ''}
              </div>
            `;
          },
        });
      }

      // Initialize DataTable
      dataTableRef.current = $(tableRef.current).DataTable({
        data,
        columns: finalColumns,
        destroy: true,
        responsive: true,
        pageLength: 10,
        language: {
          search: "",
          searchPlaceholder: "Search records...",
        }
      });

      // Handle button clicks since they are rendered via string (bypassing React)
      $(tableRef.current).on('click', '.edit-btn', function() {
        const id = $(this).data('id');
        if (onEdit) onEdit(id);
      });

      $(tableRef.current).on('click', '.delete-btn', function() {
        const id = $(this).data('id');
        if (onDelete) onDelete(id);
      });
    }

    return () => {
      // Cleanup
      if (dataTableRef.current) {
        dataTableRef.current.destroy();
      }
      if (tableRef.current) {
        $(tableRef.current).off('click', '.edit-btn');
        $(tableRef.current).off('click', '.delete-btn');
      }
    };
  }, [data, columns, onEdit, onDelete]);

  return (
    <div className="table-responsive">
      <table ref={tableRef} className="table table-striped table-hover w-100 align-middle">
      </table>
    </div>
  );
}
