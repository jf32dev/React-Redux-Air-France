import * as React from 'react';
import UserStore from './UserStore';
import ContentStore from './ContentStore';
import RouterStore from './RouterStore';
import MediaStore from './MediaStore';

/**
 * Primary Global Store
 * NOTE:
 * if stores need to know each other, change below implementation and follow below for best practices
 * https://mobx.js.org/defining-data-stores.html#combining-multiple-stores
 */
export const store = Object.freeze({
  route: new RouterStore(),
  user: new UserStore(),
  content: new ContentStore(),
  media: new MediaStore(),
});

/**
 * Store Context
 */
const MobxStoreContext = React.createContext<typeof store | null>(null);
export const StoreProvider = MobxStoreContext.Provider;

/**
 * Custom Hook to access mobx store.
 * Example Usage: useStoreSelector(store => store.route)
 */

const useStoreSelector = <TSelected = unknown>(
  selector: (state: typeof store) => TSelected
): TSelected => {
  const context = React.useContext(MobxStoreContext);
  if (!context) {
    throw new Error('No Store Context Available');
  }
  return selector(context);
};

/**
 * WARNING: DEPRECATED, Not suggesting to use it, kept for migration
 * will soon to be deleted.
 */
export const useStores = () => React.useContext(MobxStoreContext);
export default useStoreSelector;
