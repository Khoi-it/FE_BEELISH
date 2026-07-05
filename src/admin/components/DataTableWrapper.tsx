import { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net-bs5';

interface DataTableWrapperProps {
  data: any[];
  columns: any[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onManage?: (id: string) => void;
  onRowClick?: (id: string) => void;
  editLabel?: string;
  deleteLabel?: string;
  manageLabel?: string;
}

export default function DataTableWrapper({ data, columns, onEdit, onDelete, onManage, onRowClick, editLabel = 'Edit', deleteLabel = 'Delete', manageLabel = 'Manage' }: DataTableWrapperProps) {
  const tableRef = useRef<HTMLTableElement>(null);
  const dataTableRef = useRef<any>(null);

  useEffect(() => {
    if (tableRef.current) {
      // Add action columns if onEdit or onDelete is provided
      const finalColumns = [...columns];
      if (onEdit || onDelete || onManage) {
        finalColumns.push({
          title: 'Actions',
          data: 'id',
          orderable: false,
          render: (data: string, type: any, row: any) => {
            return `
              <div class="d-flex gap-2">
                ${onManage ? `<button class="btn btn-sm btn-info manage-btn text-white" data-id="${data}"><i class="bi bi-list-ul"></i> ${manageLabel}</button>` : ''}
                ${onEdit ? `<button class="btn btn-sm btn-primary edit-btn" data-id="${data}"><i class="bi bi-pencil"></i> ${editLabel}</button>` : ''}
                ${onDelete ? `<button class="btn btn-sm ${row.delete ? 'btn-success' : 'btn-danger'} delete-btn text-white" data-id="${data}"><i class="bi ${row.delete ? 'bi-unlock' : 'bi-lock'}"></i> ${row.delete ? 'Mở khóa' : deleteLabel}</button>` : ''}
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
      } as any);

      // Handle button clicks since they are rendered via string (bypassing React)
      $(tableRef.current).on('click', '.edit-btn', function() {
        const id = $(this).data('id');
        if (onEdit) onEdit(id);
      });

      $(tableRef.current).on('click', '.manage-btn', function() {
        const id = $(this).data('id');
        if (onManage) onManage(id);
      });

      $(tableRef.current).on('click', '.delete-btn', function() {
        const id = $(this).data('id');
        if (onDelete) onDelete(id);
      });

      if (onRowClick) {
        $(tableRef.current).on('click', 'tbody tr', function(e) {
          // Ignore clicks on action buttons
          if ($(e.target).closest('button').length) return;
          const rowData = dataTableRef.current.row(this).data();
          if (rowData && rowData.id) {
            onRowClick(rowData.id);
          }
        });
      }
    }

    return () => {
      // Cleanup
      if (dataTableRef.current) {
        dataTableRef.current.destroy();
      }
      if (tableRef.current) {
        $(tableRef.current).off('click', '.manage-btn');
        $(tableRef.current).off('click', '.edit-btn');
        $(tableRef.current).off('click', '.delete-btn');
        if (onRowClick) {
          $(tableRef.current).off('click', 'tbody tr');
        }
      }
    };
  }, [data, columns, onEdit, onDelete, onManage, onRowClick]);

  return (
    <div className="table-responsive">
      {onRowClick && (
        <style>
          {`
            .table-clickable tbody tr {
              cursor: pointer;
            }
          `}
        </style>
      )}
      <table ref={tableRef} className={`table table-striped table-hover w-100 align-middle ${onRowClick ? 'table-clickable' : ''}`}>
      </table>
    </div>
  );
}
