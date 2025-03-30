/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, DragEvent, ChangeEvent } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Upload, Download, Copy, Check } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import Image from "next/image";

// Define the API response types
interface PDFApiResponse {
  response_dict: {
    pages: PageObject[];
    model: string;
    usage_info: {
      pages_processed: number;
      doc_size_bytes: number;
    };
  };
}

interface PageObject {
  index: number;
  markdown: string;
  images: any;
  dimensions?: {
    dpi: number;
    height: number;
    width: number;
  };
}

interface ImageObject {
  id: string;
  imageBase64?: string;
}

// Type for Markdown custom component props
type MarkdownComponentProps = {
  node?: any;
  children?: React.ReactNode;
  [key: string]: any;
};

export default function PDFMarkdownViewer() {
  const [pdfData, setPdfData] = useState<PDFApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [copyingAll, setCopyingAll] = useState<boolean>(false);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      await uploadFile(file);
      setFileName(file.name);
    } else if (file) {
      toast.error("Invalid file type. Please upload a PDF file.");
    }
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === "application/pdf") {
      await uploadFile(file);
      setFileName(file.name);
    } else if (file) {
      toast.error("Invalid file type. Please upload a PDF file.");
    }
  };

  const uploadFile = async (file: File) => {
    setIsLoading(true);
    setPdfData(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}pdf-to-markdown`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const response: PDFApiResponse = await res.json();
      setPdfData(response);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Conversion failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const preventDefault = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const downloadMarkdown = () => {
    if (!pdfData) return;

    const allMarkdown = pdfData.response_dict.pages
      .map((page) => {
        const pageTitle = `# Page ${page.index + 1}\n\n`;
        return pageTitle + (page.markdown || "");
      })
      .join("\n\n---\n\n");

    const blob = new Blob([allMarkdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName.replace(".pdf", ".md") || "converted.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyMarkdown = (pageIndex?: number) => {
    if (!pdfData) return;

    let textToCopy = "";

    if (pageIndex !== undefined) {
      // Copy single page
      const page = pdfData.response_dict.pages[pageIndex];
      textToCopy = page.markdown || "";
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } else {
      // Copy all pages
      textToCopy = pdfData.response_dict.pages
        .map((page) => {
          const pageTitle = `# Page ${page.index + 1}\n\n`;
          return pageTitle + (page.markdown || "");
        })
        .join("\n\n---\n\n");
      setCopyingAll(true);
      setTimeout(() => setCopyingAll(false), 2000);
    }

    navigator.clipboard.writeText(textToCopy);
    toast.success(
      pageIndex !== undefined ? "Page copied!" : "All pages copied!"
    );
  };

  const navigatePage = (direction: "prev" | "next") => {
    if (!pdfData) return;

    const totalPages = pdfData.response_dict.pages.length;

    if (direction === "prev" && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Get image format from base64 string
  const getImageFormat = (base64String: string): string => {
    if (base64String.startsWith("data:image/")) {
      return base64String;
    }

    // Default to PNG if can't determine format
    return `data:image/png;base64,${base64String}`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">PDF to Markdown Converter</CardTitle>
          <CardDescription className="text-base">
            Upload a PDF file to convert it into markdown for easy reading.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-lg p-10 text-center transition-all ${
              isLoading
                ? "bg-gray-100 cursor-wait"
                : "hover:bg-gray-50 cursor-pointer"
            }`}
            onDrop={handleDrop}
            onDragOver={preventDefault}
            onDragEnter={preventDefault}
          >
            <Upload className="h-10 w-10 mx-auto mb-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
            <p className="text-lg font-medium mb-2">
              {isLoading ? "Converting..." : "Drag & Drop your PDF here"}
            </p>
            <p className="text-gray-500 mb-4">or</p>
            <Button
              disabled={isLoading}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              Browse Files
            </Button>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="application/pdf"
              onChange={handleFileChange}
              disabled={isLoading}
            />
          </div>
        </CardContent>
      </Card>

      {pdfData && (
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle className="text-xl">
                {fileName || "Converted Markdown"}
              </CardTitle>
              <CardDescription>
                Page {currentPage + 1} of {pdfData.response_dict.pages.length}
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => copyMarkdown(currentPage)}
                disabled={isCopied}
              >
                {isCopied ? (
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="mr-2 h-5 w-5" />
                )}
                {isCopied ? "Copied" : "Copy Page"}
              </Button>
              <Button
                variant="outline"
                onClick={() => copyMarkdown()}
                disabled={copyingAll}
              >
                {copyingAll ? (
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="mr-2 h-5 w-5" />
                )}
                {copyingAll ? "Copied All" : "Copy All"}
              </Button>
              <Button variant="outline" onClick={downloadMarkdown}>
                <Download className="mr-2 h-5 w-5" />
                Download
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="markdown-content p-4 bg-gray-50 border rounded-lg font-opendyslexic">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeRaw, rehypeKatex]}
                components={{
                  a: ({ node, children, ...props }: MarkdownComponentProps) => (
                    <a
                      {...props}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {children}
                    </a>
                  ),
                  img: ({
                    node,
                    src,
                    alt,
                    ...props
                  }: MarkdownComponentProps) => {
                    const fileName = src?.split("/").pop() || "";
                    const page = pdfData?.response_dict.pages[currentPage];
                    if (!page) return null;

                    const matchedImage = page.images?.find(
                      (img: any) => img.id === fileName
                    );

                    if (matchedImage?.image_base64) {
                      const base64Src = getImageFormat(
                        matchedImage.image_base64
                      );

                      return (
                        <img
                          src={base64Src}
                          alt={alt || ""}
                          className="max-w-full h-auto rounded shadow-sm my-3 mx-auto block"
                        />
                      );
                    }

                    return (
                      <img
                        src={src || ""}
                        alt={alt || ""}
                        className="max-w-full h-auto rounded shadow-sm my-3 mx-auto block"
                      />
                    );
                  },
                  code: ({
                    node,
                    children,
                    ...props
                  }: MarkdownComponentProps) => (
                    <code {...props} className="bg-gray-200 p-1 rounded">
                      {children}
                    </code>
                  ),
                  pre: ({
                    node,
                    children,
                    ...props
                  }: MarkdownComponentProps) => (
                    <pre
                      {...props}
                      className="bg-gray-200 p-2 rounded overflow-x-auto"
                    >
                      {children}
                    </pre>
                  ),
                  blockquote: ({
                    node,
                    children,
                    ...props
                  }: MarkdownComponentProps) => (
                    <blockquote
                      {...props}
                      className="border-l-4 border-gray-400 pl-4 italic"
                    >
                      {children}
                    </blockquote>
                  ),
                  h1: ({
                    node,
                    children,
                    ...props
                  }: MarkdownComponentProps) => (
                    <h1 {...props} className="text-2xl font-bold mb-2">
                      {children}
                    </h1>
                  ),
                  table: ({
                    node,
                    children,
                    ...props
                  }: MarkdownComponentProps) => (
                    <div className="overflow-x-auto my-4">
                      <table
                        className="min-w-full border border-gray-300"
                        {...props}
                      >
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({
                    node,
                    children,
                    ...props
                  }: MarkdownComponentProps) => (
                    <th
                      className="border border-gray-300 px-4 py-2 bg-gray-100"
                      {...props}
                    >
                      {children}
                    </th>
                  ),
                  td: ({
                    node,
                    children,
                    ...props
                  }: MarkdownComponentProps) => (
                    <td className="border border-gray-300 px-4 py-2" {...props}>
                      {children}
                    </td>
                  ),
                }}
              >
                {pdfData.response_dict.pages[currentPage]?.markdown ||
                  "No content found"}
              </ReactMarkdown>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => navigatePage("prev")}
              disabled={currentPage === 0}
            >
              Previous
            </Button>
            <div className="text-sm text-gray-500">
              Page {currentPage + 1} of {pdfData.response_dict.pages.length}
            </div>
            <Button
              variant="outline"
              onClick={() => navigatePage("next")}
              disabled={currentPage === pdfData.response_dict.pages.length - 1}
            >
              Next
            </Button>
          </CardFooter>
        </Card>
      )}

      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "bg-gray-800 text-white",
          duration: 3000,
          style: {
            borderRadius: "10px",
            padding: "16px",
            color: "#fff",
            backgroundColor: "#333",
          },
        }}
      />
    </div>
  );
}
