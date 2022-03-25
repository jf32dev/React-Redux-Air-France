import { encode, decode } from 'html-entities';

const decodeEntities = (val?: string, textOnly = false) => {
  let string = val || '';
  if (string && string.length > 3) {
    // NOTE:
    // &amp; will be decoded as &amp;amp;
    // &thorn; will be decoded as &amp;thorn;
    // we have to run this once to translate it to the correct format.
    // otherwise &amp;amp; will be translated only into &amp;
    string = string.replace(/&amp;/gi, '&');

    string = decode(string);
    if (textOnly) {
      const htmlRegex = new RegExp(/(<([^>]+)>)/, 'gi');
      string = string.replace(htmlRegex, '');
    }
  }
  return string.normalize();
};

const encodeEntities = (val: string) =>
  encode(val, { mode: 'nonAsciiPrintable' });

export { decodeEntities, encodeEntities };
