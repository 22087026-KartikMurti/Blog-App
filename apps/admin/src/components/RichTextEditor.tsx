"use client";

import { forwardRef, useState, useEffect, useRef } from 'react';
import { marked } from 'marked';

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const QuillEditor = forwardRef<any, QuillEditorProps>(
  ({ value, onChange }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<any>(null);
    const isFirstRender = useRef(true);
    const [isMounted, setIsMounted] = useState(false);

    // First effect: Check if we're on client-side and set mounted state
    useEffect(() => {
      setIsMounted(true);
    }, []);

    // Second effect: Load Quill dynamically once we're client-side
    useEffect(() => {
      if (!isMounted || !containerRef.current || editorRef.current) return;

      const loadQuill = async () => {
        try {
          // Dynamically import Quill
          const Quill = (await import('quill')).default;
          
          if (typeof document !== 'undefined') {
            // Check if the Quill CSS link already exists
            const existingLink = document.getElementById('quill-css');
            if (!existingLink) {
              const link = document.createElement('link');
              link.id = 'quill-css';
              link.rel = 'stylesheet';
              link.href = 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
              document.head.appendChild(link);
            }
          }

          if(containerRef.current) {
            // Clear any existing content in the container
            containerRef.current.innerHTML = '';
          }
          
          // Create editor container
          const editorContainer = document.createElement('div');
          containerRef.current?.appendChild(editorContainer);

          // Initialize Quill
          const quill = new Quill(editorContainer, {
            theme: 'snow',
            modules: {
              toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link', 'image'],
              ]
            },
            placeholder: 'Compose your content...',
          });

          const handleTextChange = () => {
            const html = quill.root.innerHTML;
            if(html !== value) {
              onChange(html);
            }
          }

          quill.on('text-change', handleTextChange);

          // Set initial content
          if (value) {
            const htmlValue = await marked(value);
            quill.clipboard.dangerouslyPasteHTML(htmlValue);
          }

          // Store editor reference
          editorRef.current = quill;
          
        } catch (error) {
          console.error('Error loading Quill:', error);
        }
      };

      loadQuill();

    }, [isMounted, onChange, value]);

    // Update content when value prop changes
    useEffect(() => {
      if (!isFirstRender.current && editorRef.current && value !== editorRef.current.root.innerHTML) {
        editorRef.current.clipboard.dangerouslyPasteHTML(value);
      }
      isFirstRender.current = false;
    }, [value]);

    // Show loading state until mounted and Quill is loaded
    if (!isMounted) {
      return <div className="h-64 border rounded p-4">Loading editor...</div>;
    }

    return (
      <div className="quill-editor w-full">
        <div ref={containerRef} className="h-64 min-h-[300px] max-h-[500px] border rounded overflow-auto"></div>
      </div>
    );
  }
);

QuillEditor.displayName = 'QuillEditor';

export default QuillEditor;