import * as React from 'react';

const useIsMounted = () => {
  const ref = React.useRef(false);

  React.useEffect(() => {
    ref.current = true;

    return () => {
      ref.current = false;
    };
  }, []);
  return ref.current;
};

export default useIsMounted;
