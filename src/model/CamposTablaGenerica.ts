export interface Column {
    title: string;
    field: string;
    width?: number;
    render?: (row: any) => JSX.Element;
  }
  
  export interface Action {
    create?: boolean;
    update?: boolean;
    delete?: boolean;
    view?: boolean; // Nueva propiedad para la acción "Ver"
  }
  
  export interface TableProps {
    data: any[];
    columns: Column[];
    actions: Action;
    onAdd?: () => void;
    onUpdate?: (item: any) => void;
    onDelete?: (item: any) => void;
    onView?: (item: any) => void; // Nueva función para la acción "Ver"
  }
  