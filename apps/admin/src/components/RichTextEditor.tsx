"use client";

import { forwardRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { marked } from 'marked';

// Import ReactQuill with a clean dynamic import
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div className="h-64 border rounded p-4">Loading editor...</div>
});

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const QuillEditor = forwardRef<any, QuillEditorProps>(
  ({ value, onChange }, ref) => {
    const [isMounted, setIsMounted] = useState(false);
    const [editorValue, setEditorValue] = useState(value);

    // Track mounted state
    useEffect(() => {
      setIsMounted(true);

      // Load Quill CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
      document.head.appendChild(link);
      
      return () => {
        // Clean up CSS when component unmounts
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    }, []);

    // Keep local state in sync with props
    useEffect(() => {
      const valueFill = async () => {
        if(value) {
          // Convert markdown to HTML if value is provided
          const htmlValue = await marked(value);
          setEditorValue(htmlValue);
        }
      }

      valueFill();
    }, [value]);

    // Handle editor changes
    const handleChange = (content: string) => {
      setEditorValue(content);
      onChange(content);
    };

    const modules = {
      toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ]
    };

    // Show loading state until mounted
    if (!isMounted) {
      return <div className="h-64 border rounded p-4">Loading editor...</div>;
    }

    return (
      <div className="quill-editor w-full mb-8">
        <ReactQuill
          theme="snow"
          value={editorValue}
          onChange={handleChange}
          modules={modules}
          placeholder="Compose your content..."
          className="h-64 min-h-[300px] max-h-[500px]"
        />
      </div>
    );
  }
);

QuillEditor.displayName = 'QuillEditor';

export default QuillEditor;