import React from 'react';

export const forEachChild = <P = any>(
  children: any,
  func: (el: React.ReactElement<P>, index: number) => void
) => {
  let index = 0;
  React.Children.forEach(children, (child) => {
    // eslint-disable-next-line no-plusplus
    if (React.isValidElement<P>(child)) func(child, index++);
  });
};

export const mapValidChildren = <P = any, R = any>(
  children: any,
  func: (el: React.ReactElement<P>, index: number) => R
): Array<R> => {
  let index = 0;

  return React.Children.map(children, (child) =>
    // eslint-disable-next-line no-plusplus
    React.isValidElement<P>(child) ? func(child, index++) : null
  );
};

export const getSpecificChildren = ({
  children,
  displayName,
  negate = false,
}: {
  children: any;
  displayName: string;
  negate?: boolean;
}) =>
  mapValidChildren(children, (child) => {
    if (negate) {
      if ((child.type as any).displayName !== displayName) {
        return child;
      }
    } else if ((child.type as any).displayName === displayName) {
      return child;
    }

    return null;
  }).filter(Boolean);
