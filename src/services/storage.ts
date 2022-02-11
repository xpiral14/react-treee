const storage = {
  save(key: string, value: any) {
    localStorage.setItem(
      key,
      value instanceof Object ? JSON.stringify(value) : value
    );
  },
  get<T extends null>(key: string) {
    return JSON.parse(localStorage.getItem(key) || 'null') as T;
  }
};

export default storage;
