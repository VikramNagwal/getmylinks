"use client";

import { useState, ChangeEvent } from "react";
import { Upload, Camera, Link } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Label } from "../../components/ui/label";

type ImageType = "avatar" | "cover";

interface ImageState {
  url: string | null;
  file: File | null;
}

export function ProfileImageUploaderClient() {
  const [images, setImages] = useState<Record<ImageType, ImageState>>({
    avatar: { url: null, file: null },
    cover: { url: null, file: null },
  });
  const [activeTab, setActiveTab] = useState<ImageType>("avatar");
  const [error, setError] = useState<string | null>(null);

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImages((prev) => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], url: e.target.value },
    }));
    setError(null);
  };

  const handleUrlSubmit = () => {
    const url = images[activeTab].url;
    if (url && isValidUrl(url)) {
      setImages((prev) => ({
        ...prev,
        [activeTab]: { ...prev[activeTab], file: null },
      }));
      setError(null);
    } else {
      setError("Please enter a valid image URL");
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setImages((prev) => ({
          ...prev,
          [activeTab]: { url: URL.createObjectURL(file), file },
        }));
        setError(null);
      } else {
        setError("Please upload a valid image file");
      }
    }
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-background rounded-lg shadow-sm">
      <Tabs
        value={activeTab}
        onValueChange={(value: string) => setActiveTab(value as ImageType)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="avatar">Avatar</TabsTrigger>
          <TabsTrigger value="cover">Cover Image</TabsTrigger>
        </TabsList>
        <div className="mt-6">
          <div className="flex justify-center mb-4">
            {activeTab === "avatar" ? (
              <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100">
                {images.avatar.url ? (
                  <img
                    src={images.avatar.url}
                    alt="Avatar"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <Camera className="w-12 h-12 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                )}
              </div>
            ) : (
              <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-200">
                {images.cover.url ? (
                  <img
                    src={images.cover.url}
                    alt="Cover"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <Camera className="w-12 h-12 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                )}
              </div>
            )}
          </div>
          <TabsContent value="avatar">
            <ImageUploadContent
              type="avatar"
              image={images.avatar}
              onFileUpload={handleFileUpload}
              onUrlChange={handleUrlChange}
              onUrlSubmit={handleUrlSubmit}
            />
          </TabsContent>
          <TabsContent value="cover">
            <ImageUploadContent
              type="cover"
              image={images.cover}
              onFileUpload={handleFileUpload}
              onUrlChange={handleUrlChange}
              onUrlSubmit={handleUrlSubmit}
            />
          </TabsContent>
        </div>
      </Tabs>

      {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
    </div>
  );
}

interface ImageUploadContentProps {
  type: ImageType;
  image: ImageState;
  onFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  onUrlChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onUrlSubmit: () => void;
}

function ImageUploadContent({
  type,
  image,
  onFileUpload,
  onUrlChange,
  onUrlSubmit,
}: ImageUploadContentProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor={`${type}-upload`} className="cursor-pointer block">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              {type === "avatar"
                ? "Square image recommended"
                : "Recommended size: 1500x500"}
            </p>
          </div>
        </Label>
        <Input
          id={`${type}-upload`}
          type="file"
          accept="image/*"
          onChange={onFileUpload}
          className="hidden"
        />
      </div>
      <div className="flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-400 text-sm">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${type}-url`}>Image URL</Label>
        <div className="flex gap-2">
          <Input
            id={`${type}-url`}
            type="url"
            placeholder="https://example.com/image.jpg"
            value={image.url || ""}
            onChange={onUrlChange}
          />
          <Button onClick={onUrlSubmit} type="button">
            <Link className="mr-2 h-4 w-4" />
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
