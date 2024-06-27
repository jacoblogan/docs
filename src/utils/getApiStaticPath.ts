import references from '@/references/references.json';
import apiCategories from '@/references/apiCategories.json';

export const getApiStaticPath = (catPath) => {
  const paths: any = [];

  function traverseJSON(current, platform: string | null = null) {
    const keys = Object.keys(current);

    keys.forEach((key) => {
      if (!platform) {
        traverseJSON(current[key], key);
      } else {
        if (apiCategories[catPath].includes(key)) {
          paths.push({
            params: {
              platform: platform,
              category: key
            }
          });
        }
      }
    });
  }

  traverseJSON(references);
  return {
    paths: paths,
    fallback: false
  };
};
