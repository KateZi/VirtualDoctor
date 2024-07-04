import * as FileSystem from "expo-file-system";
import { OPENAI_API_KEY } from "../atoms/OpenAI_API_Key";
import { formatDate } from "./DirUtils";
import { TRANSCRIPTION_PATH } from "./Constants";

interface TranscribeAudioProps {
  body?: FormData;
  filePath?: string;
}

export default async function TranscribeAudio({
  filePath,
}: TranscribeAudioProps) {
  try {
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
          language: "en",
          prompt: "You are transcribing a Parkinson patient",
          response_format: "verbose_json",
          "timestamp_granularities[0]": "word",
        },
      },
    );
    const data = JSON.parse(response["body"]);
    if (response.status === 200) {
      //   console.log("Transcription successful", data["text"]);
      SaveResults(data["text"]);
    } else {
      console.warn("Transcription failed", data);
    }
  } catch (error) {
    console.error("Error fetching the transcription.", error);
  }
}

async function SaveResults(text: string) {
  try {
    const id = formatDate({ date: new Date(), full: true });
    const path = TRANSCRIPTION_PATH + `/transcription_${id}.txt`;
    await FileSystem.writeAsStringAsync(path, text, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    console.log("Transcription saved.");
  } catch (error) {
    console.error("Failed to save transcription", error);
  }
}
