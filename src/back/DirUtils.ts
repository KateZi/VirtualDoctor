import * as FileSystem from "expo-file-system";

export const dirNames = ["transcriptions", "audio"];
export const sessionName = formatDate({ date: new Date() });

interface formatDateProps {
  date: Date;
  full?: boolean;
}
export function formatDate({ date, full }: formatDateProps) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  if (full) {
    const milliseconds = String(date.getMilliseconds()).padStart(2, "0");
    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}-${milliseconds}`;
  }

  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}

export default async function MakeDirs() {
  console.log("Creating session directory");
  await MakeDir({
    dirName: `${FileSystem.documentDirectory}/${sessionName}`,
  });
  dirNames.map(async (dirName) => {
    console.log(`Creating ${dirName} directory`);
    await MakeDir({
      dirName: `${FileSystem.documentDirectory}${sessionName}/${dirName}`,
    });
  });
}

async function MakeDir({ dirName }: { dirName: string }) {
  const dataDir = await FileSystem.getInfoAsync(dirName);
  const isDir = dataDir.isDirectory;
  if (!isDir) {
    try {
      await FileSystem.makeDirectoryAsync(dirName, {
        intermediates: true,
      });
    } catch (e) {
      console.info("ERROR", e);
    }
  }
}
