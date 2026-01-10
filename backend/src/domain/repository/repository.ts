export interface Repository<E> {
  getById(id: string): Promise<E | undefined>;
  getAll(): Promise<E[]>;
  save(e: E) : void; // -> Devuelve el objeto guardado de la base de datos.
  put(e: E, eM: E) : void; // -> Devuelve el objeto modificao de la base de datos.  
  delete(e: E | string) : void; // -> Acepta el objeto o el id en formato string.
}
