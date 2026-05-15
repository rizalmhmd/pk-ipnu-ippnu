import { useEffect } from "react";
import { router } from "@inertiajs/react";
const useRealtimeUpdates = (modelType = null, propName = null) => {
  useEffect(() => {
    if (!window.Echo) {
      console.error("Laravel Echo is not initialized.");
      return;
    }
    const channel = window.Echo.channel("public-content");
    channel.listen(".content.updated", (event) => {
      console.log("Real-time update received:", event);
      const targetType = modelType ? modelType.toLowerCase() : null;
      if (targetType && event.type !== targetType) {
        return;
      }
      console.log(`Refreshing data for ${propName || "all props"}...`);
      router.reload({
        only: propName ? [propName] : void 0,
        preserveScroll: true,
        preserveState: true
      });
    });
    return () => {
      window.Echo.leaveChannel("public-content");
    };
  }, [modelType, propName]);
};
export {
  useRealtimeUpdates as u
};
