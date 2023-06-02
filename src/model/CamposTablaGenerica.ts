export interface Column<T> {
  title: string;
  field: string;
  width?: number;
  render?: (row: T) => JSX.Element;
}

export interface Action {
  create?: boolean;
  update?: boolean;
  delete?: boolean;
  view?: boolean; // Nueva propiedad para la acción "Ver"
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions: Action;
  onAdd?: () => void;
  onUpdate?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void; // Nueva función para la acción "Ver"
  customSearch?: (item: T, search: string) => boolean;
}