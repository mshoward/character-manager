export interface PathItem {
  id: string;
  name: string;
}

export interface PathMap {
  previous: PathItem[];
  current: PathItem;
}

export function PathItemConstructor(_id: string, _name: string) {
  return {
    id: _id,
    name: _name,
  };
}
