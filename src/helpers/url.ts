export const getFileExtensionFromUrl = (url: string) => {
  console.log(url, "url");
  const path = new URL(url).pathname;

  const matches = path.match(/\/([^/]+)$/);

  if (matches && matches[1]) {
    const fileNameWithExtension = matches[1];

    const extensionMatches = fileNameWithExtension.match(/\.([^.]+)$/);

    if (extensionMatches && extensionMatches[1]) {
      return extensionMatches[1];
    }
  }

  return null;
};
