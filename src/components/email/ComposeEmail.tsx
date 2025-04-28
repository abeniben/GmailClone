
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { useGmail } from "@/context/GmailContext";
import { 
  X, Minimize, Maximize, Minus, Paperclip, 
  Image, Clock, Delete, MoreVertical, Send
} from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { Image as TiptapImage } from "@tiptap/extension-image";

const ComposeEmail: React.FC = () => {
  const { state, dispatch } = useGmail();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [subject, setSubject] = useState("");
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);

  // Drag functionality
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const composeRef = useRef<HTMLDivElement>(null);

  // Text editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Compose email...',
      }),
      Link.configure({
        openOnClick: false,
      }),
      TiptapImage.configure({
        allowBase64: true,
      }),
    ],
    content: '',
    autofocus: true,
  });

  // Reset position when maximized
  useEffect(() => {
    if (isMaximized) {
      x.set(0);
      y.set(0);
    }
  }, [isMaximized, x, y]);

  const handleClose = () => {
    dispatch({ type: "TOGGLE_COMPOSE" });
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    setIsMaximized(false);
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    setIsMinimized(false);
  };

  const handleAttachFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        setAttachments((prev) => [...prev, ...Array.from(files)]);
      }
    };
    input.click();
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <AnimatePresence>
      {state.composeOpen && (
        <motion.div
          ref={composeRef}
          className={`gmail-compose-modal ${isMaximized ? 'fixed inset-0 rounded-none' : ''} ${
            isMinimized ? 'h-12 overflow-hidden' : ''
          }`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ 
            y: isMinimized ? window.innerHeight - 48 : 0, 
            opacity: 1,
            width: isMaximized ? '100%' : '500px',
            height: isMaximized ? '100%' : (isMinimized ? '48px' : 'auto'),
          }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          drag={!isMaximized && !isMinimized}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.1}
          dragMomentum={false}
          style={{ x, y }}
        >
          {/* Compose Header */}
          <div 
            className="bg-gmail-blue text-white p-2 flex items-center justify-between cursor-move"
          >
            <div className="text-sm font-medium">
              {isMinimized ? "New Message" : "Compose Email"}
            </div>
            <div className="flex items-center space-x-1">
              <button className="p-1 hover:bg-blue-700 rounded" onClick={handleMinimize}>
                {isMinimized ? <Maximize className="h-4 w-4" /> : <Minimize className="h-4 w-4" />}
              </button>
              <button className="p-1 hover:bg-blue-700 rounded" onClick={handleMaximize}>
                {isMaximized ? <Minus className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              </button>
              <button className="p-1 hover:bg-blue-700 rounded" onClick={handleClose}>
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Compose Body */}
          {!isMinimized && (
            <div className="p-4 flex flex-col">
              <div className="mb-2 flex items-center">
                <span className="text-sm text-gmail-gray w-12">To</span>
                <input
                  type="text"
                  className="flex-grow border-none outline-none text-sm"
                  placeholder="Recipients"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
                <div className="flex items-center space-x-2 text-gmail-gray text-sm">
                  <button 
                    onClick={() => setShowCc(!showCc)}
                    className="hover:text-gmail-blue"
                  >
                    Cc
                  </button>
                  <button 
                    onClick={() => setShowBcc(!showBcc)}
                    className="hover:text-gmail-blue"
                  >
                    Bcc
                  </button>
                </div>
              </div>

              {showCc && (
                <div className="mb-2 flex items-center">
                  <span className="text-sm text-gmail-gray w-12">Cc</span>
                  <input
                    type="text"
                    className="flex-grow border-none outline-none text-sm"
                    placeholder="Carbon copy"
                    value={cc}
                    onChange={(e) => setCc(e.target.value)}
                  />
                </div>
              )}

              {showBcc && (
                <div className="mb-2 flex items-center">
                  <span className="text-sm text-gmail-gray w-12">Bcc</span>
                  <input
                    type="text"
                    className="flex-grow border-none outline-none text-sm"
                    placeholder="Blind carbon copy"
                    value={bcc}
                    onChange={(e) => setBcc(e.target.value)}
                  />
                </div>
              )}

              <div className="mb-2 flex items-center border-t border-b border-gmail-border py-2">
                <input
                  type="text"
                  className="flex-grow border-none outline-none text-sm"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              {/* Rich Text Editor */}
              <div className="min-h-[200px] max-h-[50vh] overflow-y-auto mb-4">
                <EditorContent editor={editor} className="prose prose-sm max-w-none focus:outline-none" />
              </div>

              {/* Attachments */}
              {attachments.length > 0 && (
                <div className="mb-4 border-t border-gmail-border pt-2">
                  <div className="text-sm font-medium mb-2">
                    Attachments ({attachments.length})
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-gmail-lightGray rounded px-2 py-1 text-xs"
                      >
                        <Paperclip className="h-3 w-3 mr-1 text-gmail-gray" />
                        <span className="max-w-[150px] truncate">{file.name}</span>
                        <button
                          className="ml-1 text-gmail-gray hover:text-red-500"
                          onClick={() => removeAttachment(index)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Toolbar */}
              <div className="flex items-center justify-between mt-auto border-t border-gmail-border pt-2">
                <div className="flex items-center space-x-1">
                  <button 
                    className="bg-gmail-blue text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Send className="h-4 w-4 mr-2 inline-block" />
                    Send
                  </button>
                  
                  <button className="gmail-icon-button" onClick={handleAttachFile}>
                    <Paperclip className="h-5 w-5" />
                  </button>
                  
                  <button className="gmail-icon-button">
                    <Image className="h-5 w-5" />
                  </button>
                  
                  <button className="gmail-icon-button">
                    <Clock className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-1">
                  <button className="gmail-icon-button">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                  
                  <button className="gmail-icon-button">
                    <Delete className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ComposeEmail;
