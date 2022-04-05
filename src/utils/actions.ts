export interface BasicAction<T extends string | number = string, M = undefined> {
  type: T;
  meta?: M;
}

export interface PayloadAction<T extends string | number = string, P = unknown, M = undefined>
  extends BasicAction<T, M> {
  payload: P;
}

export class UnsupportedActionError extends Error {
  constructor(action: BasicAction) {
    super(`Unsupported action. Type: ${action?.type}`);
    this.name = 'UnsupportedActionError';
  }
}
