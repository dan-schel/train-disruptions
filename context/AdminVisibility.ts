import { createContext, useContext } from "react";

export type AdminVisibilityContent = {
  incrementCount: () => void;
  showToggle: boolean;
  toggleAdminTab: () => void;
  showAdminTab: boolean;
};

export const AdminVisibilityContext = createContext<AdminVisibilityContent>({
  incrementCount() {},
  showToggle: false,
  toggleAdminTab() {},
  showAdminTab: false,
});

export function useAdminVisibilityContext() {
  return useContext<AdminVisibilityContent>(AdminVisibilityContext);
}
