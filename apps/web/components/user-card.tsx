"use client";

import Image from "next/image";

import { setUploadedImagePath } from "@/redux/features/imageUploadSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button } from "@ui/components/ui/button";
import { Card, CardContent, CardFooter } from "@ui/components/ui/card";
import { DeleteIcon } from "lucide-react";
import UploadImage from "./image-upload";

export default function UserCard() {
  const dispatch = useAppDispatch();
  const uploadedImagePath = useAppSelector(
    (state) => state.imageUpload.uploadedImagePath
  );

  return (
    <Card className=" px-12 py-10 tablet:min-w-[500px] shadow-md">
      <CardContent className=" px-0 flex items-stretch justify-normal gap-x-6">
        <Image
          width={1000}
          height={1000}
          className=" shadow-md w-24 h-24 border rounded-md object-cover"
          src={
            uploadedImagePath
              ? uploadedImagePath
              : "https://via.placeholder.com/150"
          }
          alt="sample pfp"
        />
        <div className=" space-y-2">
          <h1 className=" font-semibold">Profile Picture</h1>
          <div className=" text-gray-500 text-xs">
            We support PNGs, JPEGs under 10MB
          </div>
          <div className=" flex items-center justify-normal gap-x-3">
            <UploadImage />
            <Button size={"icon"} variant={"outline"}>
              <DeleteIcon size="1.4em" />
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className=" border-t pt-5 pb-0 flex items-center justify-end gap-x-3">
        <Button
          onClick={() => dispatch(setUploadedImagePath(null))}
          variant={"outline"}
        >
          Cancel
        </Button>
        <Button disabled={!uploadedImagePath}>Update</Button>
      </CardFooter>
    </Card>
  );
}
