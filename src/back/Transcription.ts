import * as FileSystem from "expo-file-system";
import { OPENAI_API_KEY } from "../atoms/OpenAI_API_Key";

interface TranscribeAudioProps {
  body?: FormData;
  filePath?: string;
}

export default async function TranscribeAudio({
  filePath,
}: TranscribeAudioProps) {
  try {
    console.log("Appealing to OpenAI");
    const response = await FileSystem.uploadAsync(
      "https://api.openai.com/v1/audio/transcriptions",
      filePath,
      {
        // Optional: Additional HTTP headers to send with the request.
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          // any other headers your endpoint requires
        },
        // Options specifying how to upload the file.
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: "file", // Name of the field for the uploaded file
        mimeType: "audio/mp4", // MIME type of the uploading file
        parameters: {
          // Optional: Any additional parameters you want to send with the file upload
          model: "whisper-1", // For example, if you're using OpenAI's model parameter
        },
      },
    );
    console.log("Got response");
    const data = await response["body"];
    console.log(data);
  } catch (error) {
    console.error("Error fetching the transcription.", error);
  }
}
