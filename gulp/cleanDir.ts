import del from 'del';

export const clearDir = (paths: string[]) => () => del(paths);
