import { useEffect, useRef, useMemo } from "react"

export default function useEventListener(
    eventType: keyof WindowEventMap,
    callback: (event: Event) => void,
    element: EventTarget = window
) {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    const handler = useMemo(() => (e: Event) => callbackRef.current(e), []);

    useEffect(() => {
        if (element == null) return;

        element.addEventListener(eventType, handler);

        return () => {
            element.removeEventListener(eventType, handler);
        };
    }, [eventType, element, handler]);
}
