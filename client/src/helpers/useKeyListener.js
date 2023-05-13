// custom react hook to detect if a key is pressed
import {useEffect, useRef} from "react";

const useKeyListener = (key, callback) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handle = (e) => {
      if (e.code === key) {
        callbackRef.current(e);
      }
    }
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [key])
}

export default useKeyListener;