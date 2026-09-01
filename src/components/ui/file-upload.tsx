"use client";

import React, { useState, useRef, useCallback } from "react";
import { Upload, File, X, AlertCircle, CheckCircle2 } from "lucide-react";

interface UploadedFile {
  file: File;
  id: string;
  progress?: number;
  status: "pending" | "uploading" | "success" | "error";
  error?: string;
}

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  onFilesChange: (files: File[]) => void;
  className?: string;
  label?: string;
  description?: string;
}

export function FileUpload({
  accept,
  multiple = false,
  maxSize = 10 * 1024 * 1024,
  maxFiles = 5,
  onFilesChange,
  className = "",
  label = "Upload files",
  description,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return `File size exceeds ${formatFileSize(maxSize)}`;
    }
    return null;
  };

  const processFiles = useCallback(
    (fileList: FileList | File[]) => {
      const newFiles = Array.from(fileList);
      const validFiles: UploadedFile[] = [];

      for (const file of newFiles) {
        if (!multiple && uploadedFiles.length + validFiles.length >= 1) {
          break;
        }
        if (uploadedFiles.length + validFiles.length >= maxFiles) {
          break;
        }

        const error = validateFile(file);
        validFiles.push({
          file,
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          status: error ? "error" : "success",
          error: error || undefined,
        });
      }

      const updatedFiles = [...uploadedFiles, ...validFiles];
      setUploadedFiles(updatedFiles);
      onFilesChange(
        updatedFiles.filter((f) => f.status === "success").map((f) => f.file)
      );
    },
    [uploadedFiles, multiple, maxFiles, maxSize, onFilesChange]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      processFiles(e.dataTransfer.files);
    },
    [processFiles]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  const removeFile = (id: string) => {
    const updatedFiles = uploadedFiles.filter((f) => f.id !== id);
    setUploadedFiles(updatedFiles);
    onFilesChange(
      updatedFiles.filter((f) => f.status === "success").map((f) => f.file)
    );
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    const iconColors: Record<string, string> = {
      pdf: "text-red-500",
      doc: "text-blue-500",
      docx: "text-blue-500",
      xls: "text-green-500",
      xlsx: "text-green-500",
      jpg: "text-purple-500",
      jpeg: "text-purple-500",
      png: "text-purple-500",
    };
    return iconColors[ext || ""] || "text-gray-500";
  };

  return (
    <div className={className}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-150 ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
        }`}
      >
        <Upload
          className={`mx-auto h-8 w-8 mb-3 ${
            isDragging ? "text-blue-500" : "text-gray-400"
          }`}
        />
        <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>
        {description && (
          <p className="text-xs text-gray-500 mb-3">{description}</p>
        )}
        <p className="text-xs text-gray-500">
          Max size: {formatFileSize(maxSize)}
          {multiple && ` • Up to ${maxFiles} files`}
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          className="hidden"
        />
      </div>

      {uploadedFiles.length > 0 && (
        <ul className="mt-4 space-y-2">
          {uploadedFiles.map((uploadedFile) => (
            <li
              key={uploadedFile.id}
              className={`flex items-center gap-3 p-3 rounded-lg border ${
                uploadedFile.status === "error"
                  ? "border-red-200 bg-red-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <File
                className={`h-5 w-5 flex-shrink-0 ${getFileIcon(
                  uploadedFile.file.name
                )}`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {uploadedFile.file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(uploadedFile.file.size)}
                </p>
                {uploadedFile.error && (
                  <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" />
                    {uploadedFile.error}
                  </p>
                )}
              </div>
              {uploadedFile.status === "success" && (
                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(uploadedFile.id);
                }}
                className="p-1 hover:bg-gray-100 rounded flex-shrink-0"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
