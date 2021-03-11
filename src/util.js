export const getSelectedFolder = (folders, folderId) => {
  let selectedFolder = folders.find(folder => folder.name === folderId);
    if(!selectedFolder) {
      selectedFolder = folders[0];
    }
    return selectedFolder
}

// created named { } export function to use dynamically throughout application