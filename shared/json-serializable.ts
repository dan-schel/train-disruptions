export type JsonSerializable =
  | undefined
  | string
  | number
  | boolean
  | null
  | { [field: string]: JsonSerializable }
  | readonly JsonSerializable[];
