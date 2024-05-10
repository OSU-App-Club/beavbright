"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/ui/dialog";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import {
  setSelectedImage,
  setUploadedImagePath,
} from "@/redux/features/imageUploadSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";

import { uploadImageToVercel } from "@/app/lib/api";
import { Button } from "@ui/components/ui/button";
import { Input } from "@ui/components/ui/input";
import { RadialProgress } from "@ui/components/ui/progress-bar";
import { File, UploadIcon } from "lucide-react";

export default function ImageUpload() {
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);

  const dispatch = useAppDispatch();
  const selectedImage = useAppSelector(
    (state) => state.imageUpload.selectedFile
  );
  const uploadedImagePath = useAppSelector(
    (state) => state.imageUpload.uploadedImagePath
  );

  const onUploadProgress = (progressEvent: any) => {
    const percentage = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setProgress(percentage);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      dispatch(setSelectedImage(file));
      handleImageUpload(file);
    }
  };

  const removeSelectedImage = () => {
    setLoading(false);
    dispatch(setUploadedImagePath(null));
    dispatch(setSelectedImage(null));
  };

  const handleImageUpload = async (image: File) => {
    if (!image) return;
    setLoading(true);
    const res = await uploadImageToVercel(image, onUploadProgress);
    console.log({ res });
    if (res.url) {
      setLoading(false);
      dispatch(setUploadedImagePath(res.url));
    }

    return res;
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      dispatch(setSelectedImage(file));
      handleImageUpload(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <UploadIcon size="1.2em" />
          <span className=" ml-2 text-sm">Upload</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className=" mb-3">Upload Profile Picture</DialogTitle>

          <div
            {...getRootProps()}
            className=" flex items-center justify-center w-full"
          >
            <label
              htmlFor="dropzone-file"
              className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-secondary hover:border-primary border-dashed rounded-lg cursor-pointer bg-background dark:bg-background hover:bg-neutral-100 dark:border-neutral-600 dark:hover:border-orange-700"
            >
              {loading && (
                <div className=" text-center max-w-md  ">
                  <RadialProgress progress={progress} />
                  <p className=" text-sm font-semibold">Uploading Picture</p>
                  <p className=" text-xs text-gray-400">
                    Do not refresh or perform any other action while the picture
                    is being upload
                  </p>
                </div>
              )}

              {!loading && !uploadedImagePath && (
                <div className="text-center">
                  <div className="border p-2 rounded-md max-w-min mx-auto">
                    <File size="1.6em" />
                  </div>

                  <p className="mt-2 text-sm">
                    <span className="font-semibold">
                      Drag and drop your file here{" "}
                    </span>
                  </p>
                  <p className="text-xs">
                    Click to upload &#40; image should be 500x500 px & under 10
                    MB &#41;
                  </p>
                </div>
              )}

              {uploadedImagePath && !loading && (
                <div className="text-center">
                  <Image
                    width={1000}
                    height={1000}
                    src={uploadedImagePath}
                    className=" w-full object-contain max-h-16 mx-auto mt-2 mb-3 opacity-70"
                    alt="uploaded image"
                  />
                  <p className=" text-sm font-semibold">Picture Uploaded</p>
                  <p className=" text-xs text-gray-400">
                    Click submit to upload the picture
                  </p>
                </div>
              )}
            </label>

            <Input
              {...getInputProps()}
              id="dropzone-file"
              accept="image/png, image/jpeg"
              type="file"
              className="hidden"
              disabled={loading || uploadedImagePath !== null}
              onChange={handleImageChange}
            />
          </div>
        </DialogHeader>

        <DialogFooter className=" flex items-center justify-end gap-x-2">
          <DialogClose asChild>
            <Button
              onClick={removeSelectedImage}
              type="button"
              variant="secondary"
            >
              Close
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              // onClick={}
              disabled={!selectedImage || loading}
              size={"sm"}
              className=" text-sm"
            >
              {loading ? "Uploading..." : "Submit"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
