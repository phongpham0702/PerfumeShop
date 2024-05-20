export type FilterItem = {
  name: string;
  isChecked: boolean;
};

export type FilterCategory = {
  id: string;
  name: string;
  items: FilterItem[];
  showMore: boolean;
};
