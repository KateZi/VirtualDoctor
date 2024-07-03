import { useRef } from "react";
import MakeDirs from "../back/DirUtils";
import RequestPermissions from "../back/RequestPermissions";
import NoPermissionPage from "./NoPermissionsPage";
import { View } from "react-native";
import styles from "../../style";
import Button from "../atoms/Button";

export default function LoadingPage({
  setInit,
}: {
  setInit: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const success = useRef(RequestPermissions());

  function onPress() {
    const init = async () => {
      await MakeDirs();
      setInit(true);
    };
    init();
  }

  return (
    <>
      {success.current ? (
        <View style={styles.containerStyling}>
          <Button
            style={styles.loadingButtonStyling}
            onPress={onPress}
            title="Start session!"
          />
        </View>
      ) : (
        <NoPermissionPage permissionName={"Mic"} />
      )}
    </>
  );
}
