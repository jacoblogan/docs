import references from '@/references/references.json';

export const getApiStaticPath = () => {
  const paths: any = [];

  function traverseJSON(current, platform: string | null = null) {
    const keys = Object.keys(current);

    keys.forEach((key) => {
      if (!platform) {
        traverseJSON(current[key], key);
      } else {
        paths.push({
          params: {
            platform: platform,
            category: key
          }
        });
      }
    });
  }

  traverseJSON(references);
  return {
    paths: paths,
    fallback: false
  };
};
