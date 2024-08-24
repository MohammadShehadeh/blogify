'use client';

import React from 'react';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

interface PostEditorProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
}

export const PostEditor = ({ className, value, onChange }: PostEditorProps) => {
  return <ReactQuill className={className} theme="snow" value={value} onChange={onChange} />;
};
