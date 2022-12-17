export default interface Http {
  get<T>(): Promise<T[]>;
}
