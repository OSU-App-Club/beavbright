import { PutBlobResult } from "@vercel/blob";
import axios, { AxiosProgressEvent } from "axios";

export const uploadImageToVercel = async (
  file: File,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void
) => {
  const response = await axios.post(
    `/api/avatar/upload?filename=${file.name}`,
    file,
    {
      onUploadProgress,
    }
  );
  const newBlob = response.data as PutBlobResult;
  return newBlob;
};
