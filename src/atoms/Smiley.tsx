import { Image } from "react-native";
import styles from "../../style";
import images from "../../assets/images/images";

export default function Smiley({ target }: { target: boolean }) {
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
