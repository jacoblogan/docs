import directory from '@/directory/directory.json';
import { PageNode } from 'src/directory/directory';

/**
 * Helper function to be used in `getStaticProps` to get child nodes
 * @param route The route to display childen pages for
 * @returns
 */
export const getChildPageNodes = (route: string) => {
  console.log('ROUTE!!!!');
  console.log(route);
  return traverseDirectory(route, directory as PageNode) || [];
};

function traverseDirectory(route: string, node: PageNode) {
  if (node.route === route) {
    console.log(node.children);
    return node.children;
  }

  if (node.children) {
    for (const childNode of node.children) {
      const foundNode = traverseDirectory(route, childNode);

      if (foundNode) {
        return foundNode;
      }
    }
  }
}
