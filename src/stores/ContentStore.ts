import { action, makeObservable, observable, runInAction } from 'mobx';
import bridge from '../services/bridge';
import { Story } from '../services/bridge/type/entities';
import { TStatus } from './type';

interface FeaturedState {
  status: TStatus;
  list: Story[];
  error: string | null;
}
class ContentStore {
  featured: FeaturedState = {
    status: 'idle',
    list: [],
    error: null,
  };

  constructor() {
    makeObservable(this, {
      featured: observable,
      getFeatured: action,
    });
  }

  // getContent
  getFeatured = async () => {
    this.featured.status = 'loading';
    const data = await bridge.getFeaturedList<Story>({ entityName: 'story' });

    if (data.hasError || !data.value) {
      runInAction(() => {
        this.featured.status = 'failed';
        this.featured.error = JSON.stringify(data.error);
      });
    }

    runInAction(() => {
      if (data.value) {
        this.featured.status = 'succeeded';
        this.featured.list = data.value;
        this.featured.error = null;
      }
    });
  };
}

export default ContentStore;
