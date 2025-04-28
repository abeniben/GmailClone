
import { faker } from "@faker-js/faker";

// Email Types
export interface EmailAttachment {
  id: string;
  name: string;
  type: string;
  size: string;
}

export interface Email {
  id: string;
  subject: string;
  sender: {
    name: string;
    email: string;
    avatar?: string;
  };
  recipients: {
    name: string;
    email: string;
  }[];
  cc: {
    name: string;
    email: string;
  }[];
  bcc: {
    name: string;
    email: string;
  }[];
  body: string;
  snippet: string;
  timestamp: Date;
  isRead: boolean;
  isStarred: boolean;
  isImportant: boolean;
  labels: string[];
  category: "primary" | "social" | "promotions" | "updates" | "forums";
  attachments: EmailAttachment[];
  draft?: boolean;
}

export interface Label {
  id: string;
  name: string;
  color: string;
  type: "system" | "user";
  unread?: number;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  frequent: boolean;
}

export interface Settings {
  density: "comfortable" | "cozy" | "compact";
  theme: "light" | "dark";
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  settings: Settings;
}

// Generate random emails
const generateRandomEmails = (count: number): Email[] => {
  const emails: Email[] = [];
  const categories: ("primary" | "social" | "promotions" | "updates" | "forums")[] = [
    "primary", "social", "promotions", "updates", "forums"
  ];
  
  for (let i = 0; i < count; i++) {
    const isRead = Math.random() > 0.3;
    const sender = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
    };
    
    const subject = faker.lorem.sentence();
    const body = faker.lorem.paragraphs(5);
    
    const randomAttachmentCount = Math.floor(Math.random() * 3);
    const attachments: EmailAttachment[] = [];
    
    for (let j = 0; j < randomAttachmentCount; j++) {
      attachments.push({
        id: faker.string.uuid(),
        name: faker.system.fileName(),
        type: faker.system.fileType(),
        size: Math.floor(Math.random() * 10240) + "KB",
      });
    }
    
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    
    emails.push({
      id: faker.string.uuid(),
      subject,
      sender,
      recipients: [
        {
          name: "Me",
          email: "user@example.com",
        },
      ],
      cc: [],
      bcc: [],
      body,
      snippet: body.substring(0, 120) + "...",
      timestamp: faker.date.recent({ days: 30 }),
      isRead,
      isStarred: Math.random() > 0.8,
      isImportant: Math.random() > 0.7,
      labels: [],
      category: randomCategory,
      attachments,
      draft: Math.random() > 0.9,
    });
  }
  
  // Sort emails by timestamp (newest first)
  return emails.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// System and user defined labels
export const mockLabels: Label[] = [
  { id: "inbox", name: "Inbox", color: "#1A73E8", type: "system", unread: 12 },
  { id: "starred", name: "Starred", color: "#FBBC04", type: "system" },
  { id: "snoozed", name: "Snoozed", color: "#5F6368", type: "system" },
  { id: "sent", name: "Sent", color: "#5F6368", type: "system" },
  { id: "drafts", name: "Drafts", color: "#5F6368", type: "system", unread: 3 },
  { id: "spam", name: "Spam", color: "#5F6368", type: "system" },
  { id: "trash", name: "Trash", color: "#5F6368", type: "system" },
  { id: "work", name: "Work", color: "#4285F4", type: "user", unread: 5 },
  { id: "personal", name: "Personal", color: "#34A853", type: "user", unread: 2 },
  { id: "travel", name: "Travel", color: "#EA4335", type: "user" },
  { id: "finance", name: "Finance", color: "#FBBC04", type: "user" },
  { id: "social", name: "Social", color: "#4285F4", type: "user" },
  { id: "updates", name: "Updates", color: "#34A853", type: "user" },
  { id: "forums", name: "Forums", color: "#EA4335", type: "user" },
];

// Mock contacts
export const mockContacts: Contact[] = Array(20)
  .fill(null)
  .map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    frequent: Math.random() > 0.7,
  }));

// User profile
export const mockUserProfile: UserProfile = {
  name: "John Smith",
  email: "john.smith@example.com",
  avatar: faker.image.avatar(),
  settings: {
    density: "comfortable",
    theme: "light",
  },
};

// Generate emails
export const mockEmails = generateRandomEmails(100);

// Generate drafts
export const mockDrafts = generateRandomEmails(5).map(email => ({
  ...email,
  draft: true,
}));
