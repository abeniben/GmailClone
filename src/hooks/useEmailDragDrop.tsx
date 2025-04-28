
import { useRef } from "react";
import { useGmail } from "@/context/GmailContext";
import type { Email } from "@/data/mockData";

export function useEmailDragDrop() {
  const { state, dispatch } = useGmail();
  const draggedEmailId = useRef<string | null>(null);

  // Used by EmailRow
  function getEmailRowProps(email: Email) {
    return {
      draggable: true,
      onDragStart: (e: React.DragEvent) => {
        draggedEmailId.current = email.id;
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", email.id);
      },
      onDragEnd: () => {
        draggedEmailId.current = null;
      },
    };
  }

  // Used by SidebarLabel as a drop area for category/label change
  function getSidebarDropProps(category: string) {
    return {
      onDragOver: (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      },
      onDrop: (e: React.DragEvent) => {
        e.preventDefault();
        const droppedId = e.dataTransfer.getData("text/plain");
        if (!droppedId) return;
        // Only allow drop if not already in target category
        const email = state.emails.find(e => e.id === droppedId);
        if (email && email.category !== category) {
          // Cast the category to the Email category type before updating
          const typedEmails = state.emails.map(e =>
            e.id === droppedId ? { ...e, category: category as Email["category"] } : e
          );
          
          dispatch({
            type: "SET_EMAILS",
            payload: typedEmails,
          });
        }
        draggedEmailId.current = null;
      },
    };
  }

  return { getEmailRowProps, getSidebarDropProps };
}
