import * as FileSystem from "expo-file-system";

export const dirNames = ["transcriptions", "audio"];

export default function MakeDirs() {
  dirNames.map(async (dirName) => {
    const dataDir = await FileSystem.getInfoAsync(
      FileSystem.documentDirectory + dirName,
    );
    const isDir = dataDir.isDirectory;
    if (!isDir) {
      try {
        await FileSystem.makeDirectoryAsync(
          FileSystem.documentDirectory + dirName,
          {
            intermediates: true,
          },
        );
      } catch (e) {
        console.info("ERROR", e);
      }
    }
  });
}
