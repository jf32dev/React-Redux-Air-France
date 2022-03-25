import * as React from 'react';
import { Story } from '../services/bridge/type/entities';
import { TStatus } from '../stores/type';
import bridge from '../services/bridge/bridge';

type THookType = [Story[], TStatus, string | null];

const useFeaturedContent = (): THookType => {
  const [featured, setFeatured] = React.useState<Story[]>([]);
  const [status, setStatus] = React.useState<TStatus>('idle');
  const [error, setError] = React.useState<string | null>(null);

  const getFeaturedContent = async () => {
    setStatus('loading');
    const data = await bridge.getFeaturedList<Story>({ entityName: 'story' });

    if (data.hasError) {
      setStatus('failed');
      setError(data.error);
    }
    if (data.value) {
      setFeatured(data.value);
    }
    setStatus('succeeded');
  };

  React.useEffect(() => {
    getFeaturedContent();
  }, []);

  return [featured, status, error];
};

export default useFeaturedContent;
