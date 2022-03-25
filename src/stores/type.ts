export type TStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type TStoreState = {
  status: TStatus;
  error: string | null;
};
