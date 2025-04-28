import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { Email, Label, Settings, mockEmails, mockLabels, mockUserProfile } from "../data/mockData";

// Define the state type
interface GmailState {
  emails: Email[];
  labels: Label[];
  selectedEmails: string[];
  activeCategory: string;
  activeFilter: string;
  searchQuery: string;
  composeOpen: boolean;
  currentEmail: Email | null;
  isReading: boolean;
  sidebarCollapsed: boolean;
  settings: Settings;
}

// Define action types
type ActionType =
  | { type: "SET_EMAILS"; payload: Email[] }
  | { type: "SELECT_EMAIL"; payload: string }
  | { type: "DESELECT_EMAIL"; payload: string }
  | { type: "SELECT_ALL_EMAILS" }
  | { type: "DESELECT_ALL_EMAILS" }
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "SET_FILTER"; payload: string }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "TOGGLE_COMPOSE" }
  | { type: "SET_CURRENT_EMAIL"; payload: Email | null }
  | { type: "TOGGLE_READING"; payload: boolean }
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "MARK_AS_READ"; payload: string[] }
  | { type: "MARK_AS_UNREAD"; payload: string[] }
  | { type: "STAR_EMAIL"; payload: string }
  | { type: "UNSTAR_EMAIL"; payload: string }
  | { type: "DELETE_EMAILS"; payload: string[] }
  | { type: "ARCHIVE_EMAILS"; payload: string[] }
  | { type: "ADD_LABEL"; payload: { emailIds: string[]; labelId: string } }
  | { type: "REMOVE_LABEL"; payload: { emailIds: string[]; labelId: string } }
  | { type: "UPDATE_SETTINGS"; payload: Partial<Settings> };

// Create the initial state
const initialState: GmailState = {
  emails: mockEmails,
  labels: mockLabels,
  selectedEmails: [],
  activeCategory: "primary",
  activeFilter: "",
  searchQuery: "",
  composeOpen: false,
  currentEmail: null,
  isReading: false,
  sidebarCollapsed: false,
  settings: mockUserProfile.settings,
};

// Create the reducer function
const gmailReducer = (state: GmailState, action: ActionType): GmailState => {
  switch (action.type) {
    case "SET_EMAILS":
      return { ...state, emails: action.payload };
    
    case "SELECT_EMAIL":
      return {
        ...state,
        selectedEmails: [...state.selectedEmails, action.payload],
      };
    
    case "DESELECT_EMAIL":
      return {
        ...state,
        selectedEmails: state.selectedEmails.filter(id => id !== action.payload),
      };
    
    case "SELECT_ALL_EMAILS":
      return {
        ...state,
        selectedEmails: state.emails
          .filter(email => email.category === state.activeCategory)
          .map(email => email.id),
      };
    
    case "DESELECT_ALL_EMAILS":
      return {
        ...state,
        selectedEmails: [],
      };
    
    case "SET_CATEGORY":
      return {
        ...state,
        activeCategory: action.payload,
        activeFilter: "",
        selectedEmails: [],
      };
    
    case "SET_FILTER":
      return {
        ...state,
        activeFilter: action.payload,
        selectedEmails: [],
      };
    
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
      };
    
    case "TOGGLE_COMPOSE":
      return {
        ...state,
        composeOpen: !state.composeOpen,
      };
    
    case "SET_CURRENT_EMAIL":
      return {
        ...state,
        currentEmail: action.payload,
      };
    
    case "TOGGLE_READING":
      return {
        ...state,
        isReading: action.payload,
      };
    
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        sidebarCollapsed: !state.sidebarCollapsed,
      };
    
    case "MARK_AS_READ":
      return {
        ...state,
        emails: state.emails.map(email =>
          action.payload.includes(email.id) ? { ...email, isRead: true } : email
        ),
      };
    
    case "MARK_AS_UNREAD":
      return {
        ...state,
        emails: state.emails.map(email =>
          action.payload.includes(email.id) ? { ...email, isRead: false } : email
        ),
      };
    
    case "STAR_EMAIL":
      return {
        ...state,
        emails: state.emails.map(email =>
          email.id === action.payload ? { ...email, isStarred: true } : email
        ),
      };
    
    case "UNSTAR_EMAIL":
      return {
        ...state,
        emails: state.emails.map(email =>
          email.id === action.payload ? { ...email, isStarred: false } : email
        ),
      };
    
    case "DELETE_EMAILS":
      return {
        ...state,
        emails: state.emails.filter(email => !action.payload.includes(email.id)),
        selectedEmails: state.selectedEmails.filter(
          id => !action.payload.includes(id)
        ),
      };
    
    case "ARCHIVE_EMAILS":
      return {
        ...state,
        emails: state.emails.map(email =>
          action.payload.includes(email.id)
            ? { ...email, labels: [...email.labels, "archived"] }
            : email
        ),
        selectedEmails: state.selectedEmails.filter(
          id => !action.payload.includes(id)
        ),
      };
    
    case "ADD_LABEL":
      return {
        ...state,
        emails: state.emails.map(email =>
          action.payload.emailIds.includes(email.id)
            ? {
                ...email,
                labels: email.labels.includes(action.payload.labelId)
                  ? email.labels
                  : [...email.labels, action.payload.labelId],
              }
            : email
        ),
      };
    
    case "REMOVE_LABEL":
      return {
        ...state,
        emails: state.emails.map(email =>
          action.payload.emailIds.includes(email.id)
            ? {
                ...email,
                labels: email.labels.filter(
                  labelId => labelId !== action.payload.labelId
                ),
              }
            : email
        ),
      };
    
    case "UPDATE_SETTINGS":
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };
    
    default:
      return state;
  }
};

// Create the context
interface GmailContextType {
  state: GmailState;
  dispatch: React.Dispatch<ActionType>;
}

const GmailContext = createContext<GmailContextType | undefined>(undefined);

// Create the provider component
interface GmailProviderProps {
  children: ReactNode;
}

export const GmailProvider: React.FC<GmailProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gmailReducer, initialState);

  return (
    <GmailContext.Provider value={{ state, dispatch }}>
      {children}
    </GmailContext.Provider>
  );
};

// Create a custom hook for using the context
export const useGmail = (): GmailContextType => {
  const context = useContext(GmailContext);
  if (context === undefined) {
    throw new Error("useGmail must be used within a GmailProvider");
  }
  return context;
};
