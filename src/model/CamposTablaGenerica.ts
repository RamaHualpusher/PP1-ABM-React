export interface Column<T> {
  title: string;
  field: keyof T;
  width?: number;
  render?: (row: T) => JSX.Element | null;
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
  customSearch?: (searchText: string) => Promise<T[]>;
}