import {
  RouterStore as BaseRouterStore,
  syncHistoryWithStore,
} from 'mobx-react-router';
import { STATIC_CONTENT } from '../constants';

class RouterStore extends BaseRouterStore {
  constructor(history?: any) {
    super();
    if (history) {
      this.history = syncHistoryWithStore(history, this);
    }
  }

  goToFullList = (type: keyof typeof STATIC_CONTENT) => {
    this.history.push(`/fulllist/${type}`);
  };

  goToOperationalContentSelect = () => {
    this.history.push('/operational-content');
  };

  goToOperationalContent = (id: number) => {
    this.history.push(`/operational-content/${id}`);
  };
}

export default RouterStore;
