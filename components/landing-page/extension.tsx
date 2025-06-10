import { Download, FolderOpen, Settings, Puzzle, Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Extension() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Install ReadEase Extension</h2>
        <p className="text-muted-foreground text-lg">
          Follow these simple steps to get started
        </p>
      </div>

      {/* Hero/Graphic Space */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-8 text-center border">
        <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
          <Puzzle className="w-16 h-16 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Chrome Extension Ready</h3>
        <p className="text-muted-foreground">
          Your reading companion is just a few clicks away
        </p>
      </div>

      <div className="grid gap-6">
        {/* Step 1 */}
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shrink-0">
                1
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Download className="w-5 h-5 text-blue-500" />
                  <h3 className="text-lg font-semibold">
                    Download the Extension
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Click the button below to download the ReadEase extension file
                </p>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <a
                    href="https://drive.google.com/uc?export=download&id=1T07Qo02ct654bOWOGK_r2ApDz0U3ulyZ"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Extension
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 2 */}
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shrink-0">
                2
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <FolderOpen className="w-5 h-5 text-green-500" />
                  <h3 className="text-lg font-semibold">Unzip the Folder</h3>
                </div>
                <p className="text-muted-foreground">
                  Extract the downloaded ZIP file to a location you can easily
                  find
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 3 */}
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shrink-0">
                3
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Settings className="w-5 h-5 text-orange-500" />
                  <h3 className="text-lg font-semibold">
                    Enable Developer Mode
                  </h3>
                </div>
                <p className="text-muted-foreground mb-2">
                  Open Chrome and navigate to:
                </p>
                <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono">
                  chrome://extensions
                </code>
                <p className="text-muted-foreground mt-2">
                  Then toggle on &quot;Developer mode&quot; in the top right corner
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 4 */}
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shrink-0">
                4
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <FolderOpen className="w-5 h-5 text-purple-500" />
                  <h3 className="text-lg font-semibold">Load the Extension</h3>
                </div>
                <p className="text-muted-foreground">
                  Click &quot;Load unpacked&quot; and select the{" "}
                  <strong>Voice_ext</strong> folder from your extracted files
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 5 */}
        <Card className="border-l-4 border-l-indigo-500">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shrink-0">
                5
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Pin className="w-5 h-5 text-indigo-500" />
                  <h3 className="text-lg font-semibold">Pin the Extension</h3>
                </div>
                <p className="text-muted-foreground">
                  Click the puzzle piece icon in your Chrome toolbar and pin
                  ReadEase for easy access
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Success Message */}
      <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg text-center">
        <div className="text-green-600 mb-2">
          <Puzzle className="w-8 h-8 mx-auto" />
        </div>
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          You&apos;re All Set!
        </h3>
        <p className="text-green-700">
          ReadEase is now installed and ready to enhance your reading experience
        </p>
      </div>
    </div>
  );
}
