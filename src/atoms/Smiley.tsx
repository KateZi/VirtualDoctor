import { Image } from "react-native";
import styles from "../../style";
import images from "../../assets/images/images";

interface SmileyProps {
  target: boolean;
}

export default function Smiley({ target }: SmileyProps) {
  return (
    <>
      {target ? (
        <Image
          source={images["smileyOutline"]}
          style={{ ...styles.blobStyling }}
        />
      ) : (
        <Image source={images["smiley"]} style={{ ...styles.blobStyling }} />
      )}
    </>
  );
}
