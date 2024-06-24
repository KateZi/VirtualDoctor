import React, { useEffect } from "react";
import { View } from "react-native";

interface TemporalComponentProps {
  children: React.ReactNode;
  delay: number;
  duration: number;
  setShowComponent: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TemporalComponent({
  children,
  delay,
  duration,
  setShowComponent,
}: TemporalComponentProps) {
  useEffect(() => {
    const showTimeoutId = setTimeout(() => {
      setShowComponent(true);
    }, delay * 1000);
    const hideTimeoutId = setTimeout(
      () => {
        setShowComponent(false);
      },
      (delay + duration) * 1000
    );
    return () => {
      clearTimeout(showTimeoutId);
      clearTimeout(hideTimeoutId);
    };
  }, []);

  return <View>{children}</View>;
}
