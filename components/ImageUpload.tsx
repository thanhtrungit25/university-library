"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import config from "@/lib/config";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";

const {
  env: {
    imagekit: { urlEndpoint, publicKey }
  }
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();

    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

interface Props {
  onFileChange: (filePath: string) => void;
}

const ImageUpload = ({
  onFileChange
}: Props) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null)
  
  const [progress, setProgress] = useState(0);
  
  const onError = (error: any) => {
    console.log(error);

    toast({
      title: "Image upload failed",
      description: `Your image could not be uploaded. Please try again.`,
      variant: "destructive"
    });
  }

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast({
      title: "Image upload successfully",
      description: `${res.filePath} uploaded successfully`,
    });
  }
  const onValidate = (file: File) => {}

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-upload.png"
      />

      <button
        className={cn("flex min-h-14 w-full items-center justify-center gap-1.5 rounded-md bg-gray-500")}
        onClick={(e) => {
          e.preventDefault();

          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className="text-base text-light-100">Upload a file</p>

        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>

      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      )}

    </ImageKitProvider>
  )
}

export default ImageUpload
