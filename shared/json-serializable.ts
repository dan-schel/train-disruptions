export type JsonSerializable =
  | undefined
  | string
  | number
  | boolean
  | Date // Didn't think this was JSON serializable, but it seems to work.
  | null
  | { [field: string]: JsonSerializable }
  | readonly JsonSerializable[];
