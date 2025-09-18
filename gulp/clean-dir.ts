import { deleteAsync } from 'del';

export const clearDir = (paths: string[]) => () => deleteAsync(paths);
