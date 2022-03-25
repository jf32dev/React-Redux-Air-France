import { decodeEntities, encodeEntities } from '../htmlEntities';

const encodedHTML =
  '&lt;p&gt;&lt;strong&gt;Welcome to our New Partner&copy; &amp; Strategy&trade; Portal!&lt;/strong&gt;&lt;/p&gt;';
const decodedHTML =
  '<p><strong>Welcome to our New Partner© & Strategy™ Portal!</strong></p>';

const encodedNoHTML =
  'Welcome to our New Partner&copy; &amp; Strategy&trade; Portal!';
const decodedNoHTML = 'Welcome to our New Partner© & Strategy™ Portal!';

describe('decode', () => {
  test('decode text from hub', () => {
    expect(decodeEntities(encodedHTML)).toEqual(decodedHTML);
  });
  test('decode message without html', () => {
    expect(decodeEntities(encodedHTML, true)).toEqual(decodedNoHTML);
  });
});

describe('encode', () => {
  test('encode decoded text', () => {
    expect(encodeEntities(decodedNoHTML)).toEqual(encodedNoHTML);
  });

  test('encode decoded HTML', () => {
    expect(encodeEntities(decodedHTML)).toEqual(encodedHTML);
  });
});
