import { parseDocument } from 'htmlparser2';
import { DomUtils } from 'htmlparser2';
import serialize from 'dom-serializer';

export const cleanHtmlForEmail = (html) => {
  const dom = parseDocument(html);

  const cleanNode = (node, parent = null) => {
    if (!node || typeof node !== 'object') return;

    // --- 1. Remove <div role="separator">
    if (node.name === 'div' && node.attribs?.role === 'separator') {
      if (parent) DomUtils.removeElement(node);
      return;
    }

    // --- 2. Remove <div> that only contains multiple <div><svg>...</svg></div> children
    if (
      node.name === 'div' &&
      node.children?.length > 0 &&
      node.children.every(
        child =>
          child.name === 'div' &&
          child.children?.length === 1 &&
          child.children[0].name === 'svg'
      )
    ) {
      if (parent) DomUtils.removeElement(node);
      return;
    }

    // --- 3. Clean attributes
    if (node.attribs) {
      for (const attr of Object.keys(node.attribs)) {
        if (
          attr === 'class' ||
          attr === 'srcset' ||
          attr === 'decoding' ||
          attr === 'loading' ||
          attr.startsWith('data-')
        ) {
          delete node.attribs[attr];
        }

        // Rewrite _next/image URLs
        if (attr === 'src' && node.attribs[attr].includes('/_next/image')) {
          const match = node.attribs[attr].match(/url=([^&]+)&?/);
          if (match && match[1]) {
            node.attribs[attr] = decodeURIComponent(match[1]);
          }
        }
      }
    }

    // --- 4. Recursively clean children
    if (node.children) {
      for (const child of [...node.children]) {
        cleanNode(child, node);
      }
    }
  };

  const nodes = DomUtils.getChildren(dom);
  for (const node of nodes) {
    cleanNode(node);
  }

  return serialize(dom, { encodeEntities: 'utf8' });
};
