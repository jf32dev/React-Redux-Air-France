import { createInitials } from '../utils';

describe('create initials test', () => {
  test('with 0 word / null', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(createInitials(null)).toBeFalsy();
  });
  test('with 1 word', () => {
    const name = 'Global Services';
    expect(createInitials(name)).toEqual('GS');
  });

  test('with 3 words', () => {
    const name = 'Global Services Template';
    expect(createInitials(name)).toEqual('GST');
  });
  test('with more than 3 words', () => {
    const name = 'Global Services Home Screen Template';
    expect(createInitials(name)).toEqual('GSHST');
  });
});
