"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TextToSpeechButton } from "@/components/text-to-speech-button";
import { TextSection } from "@/components/text-section";
import {
  Headphones,
  FileText,
  Image,
  MessageSquare,
  Upload,
  ArrowLeft,
  CircleHelp,
} from "lucide-react";
import Link from "next/link";
import TextToSpeech from "@/components/dashboard/TextToSpeech";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer">
            <Link
              href="/"
              className="flex items-center gap-2 group hover:underline underline-offset-4"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Back to Home</span>
              <TextToSpeechButton
                text="Back to Home"
                className="ml-1"
                showOnHover
              />
            </Link>
          </div>
          <div className="flex items-center">
            <Button
              variant="outline"
              size="sm"
              className="group flex items-center justify-center gap-2 cursor-pointer"
            >
              Help
              <CircleHelp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-8">
            <TextSection className="space-y-2">
              <h1 className="text-3xl font-bold tracking-wide">
                ReadEase Tools
              </h1>
              <p className="text-muted-foreground text-spacing">
                Select a tool to get started with your reading and writing
                assistance.
              </p>
            </TextSection>

            <Tabs defaultValue="text-to-speech" className="space-y-6">
              <TabsList className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 h-auto w-full gap-4">
                <TabsTrigger
                  value="text-to-speech"
                  className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground group"
                >
                  <Headphones className="h-5 w-5" />
                  <span>Text to Speech</span>
                  <TextToSpeechButton
                    text="Text to Speech"
                    className="ml-1"
                    showOnHover
                  />
                </TabsTrigger>
                <TabsTrigger
                  value="pdf-reader"
                  className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground group"
                >
                  <FileText className="h-5 w-5" />
                  <span>PDF Reader</span>
                  <TextToSpeechButton
                    text="PDF Reader"
                    className="ml-1"
                    showOnHover
                  />
                </TabsTrigger>
                <TabsTrigger
                  value="image-to-text"
                  className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground group"
                >
                  <Image className="h-5 w-5" />
                  <span>Image to Text</span>
                  <TextToSpeechButton
                    text="Image to Text"
                    className="ml-1"
                    showOnHover
                  />
                </TabsTrigger>
                <TabsTrigger
                  value="spelling-helper"
                  className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground group"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>Spelling Helper</span>
                  <TextToSpeechButton
                    text="Spelling Helper"
                    className="ml-1"
                    showOnHover
                  />
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text-to-speech" className="space-y-6">
                <TextToSpeech />
              </TabsContent>

              <TabsContent value="pdf-reader" className="space-y-6">
                <Card>
                  <CardHeader>
                    <TextSection>
                      <CardTitle className="text-2xl">PDF Reader</CardTitle>
                      <CardDescription className="text-base text-spacing">
                        Upload a PDF file to have it read aloud or converted to
                        audio.
                      </CardDescription>
                    </TextSection>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-dashed rounded-md p-10 text-center group">
                      <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                      <TextSection>
                        <p className="text-lg font-medium mb-2">
                          Drag and drop your PDF here
                        </p>
                        <p className="text-muted-foreground mb-4">or</p>
                      </TextSection>
                      <Button className="group flex items-center">
                        Browse Files
                        <TextToSpeechButton
                          text="Browse Files"
                          className="ml-2"
                          showOnHover
                        />
                      </Button>
                    </div>
                    <div className="flex justify-between">
                      <Button disabled className="group flex items-center">
                        Read PDF Aloud
                        <TextToSpeechButton
                          text="Read PDF Aloud"
                          className="ml-2"
                          showOnHover
                        />
                      </Button>
                      <Button
                        variant="outline"
                        disabled
                        className="group flex items-center"
                      >
                        Download Audio
                        <TextToSpeechButton
                          text="Download Audio"
                          className="ml-2"
                          showOnHover
                        />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="image-to-text" className="space-y-6">
                <Card>
                  <CardHeader>
                    <TextSection>
                      <CardTitle className="text-2xl">Image to Text</CardTitle>
                      <CardDescription className="text-base text-spacing">
                        Upload an image containing text to extract and convert
                        it to readable text.
                      </CardDescription>
                    </TextSection>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-dashed rounded-md p-10 text-center group">
                      <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                      <TextSection>
                        <p className="text-lg font-medium mb-2">
                          Drag and drop your image here
                        </p>
                        <p className="text-muted-foreground mb-4">or</p>
                      </TextSection>
                      <Button className="group flex items-center">
                        Browse Files
                        <TextToSpeechButton
                          text="Browse Files"
                          className="ml-2"
                          showOnHover
                        />
                      </Button>
                    </div>
                    <div className="flex justify-between">
                      <Button disabled className="group flex items-center">
                        Extract Text
                        <TextToSpeechButton
                          text="Extract Text"
                          className="ml-2"
                          showOnHover
                        />
                      </Button>
                      <Button
                        variant="outline"
                        disabled
                        className="group flex items-center"
                      >
                        Read Extracted Text
                        <TextToSpeechButton
                          text="Read Extracted Text"
                          className="ml-2"
                          showOnHover
                        />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="spelling-helper" className="space-y-6">
                <Card>
                  <CardHeader>
                    <TextSection>
                      <CardTitle className="text-2xl">
                        Spelling Helper
                      </CardTitle>
                      <CardDescription className="text-base text-spacing">
                        Enter text to get spelling corrections and improvements.
                      </CardDescription>
                    </TextSection>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <textarea
                      className="w-full min-h-[200px] p-4 rounded-md border text-spacing text-lg"
                      placeholder="Enter your text here for spelling and grammar suggestions..."
                    ></textarea>
                    <div className="flex justify-between">
                      <Button className="group flex items-center">
                        Check Spelling
                        <TextToSpeechButton
                          text="Check Spelling"
                          className="ml-2"
                          showOnHover
                        />
                      </Button>
                      <Button
                        variant="outline"
                        className="group flex items-center"
                      >
                        Improve Text
                        <TextToSpeechButton
                          text="Improve Text"
                          className="ml-2"
                          showOnHover
                        />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
          <p className="text-sm text-muted-foreground text-center md:text-left group relative">
            © {new Date().getFullYear()} ReadEase. All rights reserved.
            <TextToSpeechButton
              text={`© ${new Date().getFullYear()} ReadEase. All rights reserved.`}
              className="ml-1"
              showOnHover
            />
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/help"
              className="text-sm text-muted-foreground hover:text-foreground group flex items-center"
            >
              Help Center
              <TextToSpeechButton
                text="Help Center"
                className="ml-1"
                showOnHover
              />
            </Link>
            <Link
              href="/feedback"
              className="text-sm text-muted-foreground hover:text-foreground group flex items-center"
            >
              Feedback
              <TextToSpeechButton
                text="Feedback"
                className="ml-1"
                showOnHover
              />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
