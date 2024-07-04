import { useContext, useEffect, useState } from "react";
import { SpeakingContext } from "../contexts/AppContext";
import { FlatList, Text, View } from "react-native";
import styles from "../../style";
import { TRANSCRIPTION_PATH } from "../back/Constants";
import * as FileSystem from "expo-file-system";

async function readTranscriptions({
  directory,
  type = "user",
}: {
  directory: string;
  type?: string;
}): Promise<{ id: string; content: string; type: string }[]> {
  const files = await FileSystem.readDirectoryAsync(directory);
  files.sort((a, b) => {
    const aDate = a.split("_").pop().split(".")[0];
    const bDate = b.split("_").pop().split(".")[0];
    if (aDate < bDate) {
      return -1;
    } else {
      return 1;
    }
  });
  console.log(files);
  const transcriptions = await Promise.all(
    files.map(async (file, index) => {
      const content = await FileSystem.readAsStringAsync(
        `${directory}/${file}`,
      );
      const id = `user_${index}`;
      return { id, content, type };
    }),
  );
  return transcriptions;
}

function mergeTranscriptions({
  transcriptions1,
  transcriptions2,
}: {
  transcriptions1: { id: string; content: string; type: string }[];
  transcriptions2: { id: string; content: string; type: string }[];
}): { id: string; content: string; type: string }[] {
  const mergedTranscriptions = [];

  let iter1 = 0;
  let iter2 = 0;
  while (iter1 < transcriptions1.length || iter2 < transcriptions2.length) {
    if (iter1 < transcriptions1.length) {
      mergedTranscriptions.push(transcriptions1[iter1]);
      iter1++;
    }
    if (
      transcriptions1[iter1 - 1].id !== "agent_2" &&
      iter2 < transcriptions2.length
    ) {
      mergedTranscriptions.push(transcriptions2[iter2]);
      iter2++;
    }
  }
  console.log(mergedTranscriptions);

  return mergedTranscriptions;
}

export default function TranscriptionPage() {
  const { end } = useContext(SpeakingContext);
  const [transcriptions, setTranscriptions] =
    useState<{ id: string; content: string; type: string }[]>();

  useEffect(() => {
    if (end) {
      const getDialogue = async () => {
        const userTranscriptions = await readTranscriptions({
          directory: TRANSCRIPTION_PATH,
        });

        setTranscriptions(
          mergeTranscriptions({
            transcriptions1: agentTranscriptions,
            transcriptions2: userTranscriptions,
          }),
        );
      };
      getDialogue();
    }

    return () => {};
  }, [end]);

  return (
    end && (
      <>
        {console.log("Rendered TranscriptionPage")}
        <FlatList
          style={styles.transcriptionContainerStyling}
          data={transcriptions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.transcriptionStyling}>
              <Text
                style={
                  item.type === "agent"
                    ? styles.agentTranscriptionStyling
                    : styles.userTranscriptionStyling
                }
              >
                {item.content}
              </Text>
            </View>
          )}
          contentContainerStyle={styles.transcriptionContainerStyling}
        />
      </>
    )
  );
}

const agentTranscriptions = [
  {
    id: "agent_0",
    content: "Hi Ben! How are you feeling today?",
    type: "agent",
  },
  {
    id: "agent_1",
    content: "When did you take your medication last time?",
    type: "agent",
  },
  {
    id: "agent_2",
    content: "Do you mind filling up this bar up to how well you feel?",
    type: "agent",
  },
  {
    id: "agent_3",
    content:
      "Thanks! What about your sleep? I remember earlier this week you mentioned you had trouble falling asleep. Was it better yesterday?",
    type: "agent",
  },
  {
    id: "agent_4",
    content:
      "I'll see what I can do for your sleep. Is there anything else you would like to tell me?",
    type: "agent",
  },
  {
    id: "agent_5",
    content:
      "Alright. Don't forget your speech therapy today at 5. Talk to you later!",
    type: "agent",
  },
];
