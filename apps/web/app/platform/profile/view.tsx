"use client";

import { Icons } from "@/components/icons";
import { Avatar, AvatarImage } from "@ui/components/ui/avatar";
import { Button } from "@ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/ui/dialog";
import { Input } from "@ui/components/ui/input";
import { Label } from "@ui/components/ui/label";
import { getUserById, updateUser, deleteUser } from "@/app/lib/actions";
import { useMemo, useState } from "react";

function DeleteAccountDialog({ userId }) {
  const [open, setOpen] = useState(false);
  const [deleteText, setDeleteText] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  const handleDeleteTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setDeleteError(false);
    }
    setDeleteText(e.target.value);
  };

  const handleDelete = () => {
    if (deleteText !== "delete") {
      setDeleteError(true);
      return;
    }

    // TODO: Handle deleting user and rerouting to home page
    //deleteUser(userId);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setDeleteError(false);
    }
    setOpen(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          This action is irreversible. Please type 'delete' to confirm.
        </DialogDescription>
        <Input
          type="text"
          placeholder="Type 'delete' to confirm"
          className="mt-4"
          onChange={handleDeleteTextChange}
        />
        {deleteError && (
          <div className="text-red-500 mt-2">
            Please type 'delete' to confirm
          </div>
        )}
        <DialogFooter>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function View({ session }: { session: any }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  );
  const [uploadSuccessful, setUploadSuccessful] = useState<boolean | null>(
    null
  );

  const user = useMemo(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const userData = await getUserById(session.userId);
        setLoading(false);
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        return userData;
      } catch (error) {
        setLoading(false);
        return null;
      }
    }

    return fetchUser();
  }, [session]);

  const handleFirstNameChange = (value: string) => {
    setFirstName(value);
  };

  const handleLastNameChange = (value: string) => {
    setLastName(value);
  };

  const submitUserChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firstName) {
      setNameError("You must at least have a first name!");
      return;
    }

    const updatedData = {
      firstName,
      lastName: lastName === "" ? null : lastName,
      image: null,
    };

    setLoading(true);
    setNameError(null);

    try {
      await updateUser(session.userId, updatedData);
      setUploadSuccessful(true);
    } catch (error) {
      console.error("Failed to update user:", error);
      setUploadSuccessful(false);
    }
    setLoading(false);
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfileImage(file);
    if (file) {
      setImageError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageError("Could not load image");
      setProfileImagePreview(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2">
        <Icons.spinner className="w-6 h-6 animate-spin" />
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 border-b pb-2">Profile</h2>
      <form onSubmit={submitUserChanges}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <Label htmlFor="first-name" className="mb-2">
              First Name
            </Label>
            <Input
              id="first-name"
              type="text"
              value={firstName}
              onChange={(e) => handleFirstNameChange(e.target.value)}
              placeholder="First Name"
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="last-name" className="mb-2">
              Last Name
            </Label>
            <Input
              id="last-name"
              type="text"
              value={lastName}
              onChange={(e) => handleLastNameChange(e.target.value)}
              placeholder="Last Name"
            />
          </div>
        </div>
        {nameError && <div className="text-red-500 mt-2">{nameError}</div>}
        <div className="grid grid-cols-1 gap-4 mt-4 mb-4">
          <div className="flex flex-col w-full">
            <Label htmlFor="profile-image" className="mb-2">
              Profile Image
            </Label>
            <div className="flex items-center">
              {profileImagePreview && (
                <Avatar className="h-12 w-12 mr-2">
                  <AvatarImage src={profileImagePreview} />
                </Avatar>
              )}
              <Input
                id="profile-image"
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
              />
            </div>
            {imageError && (
              <div className="text-red-500 mt-2">{imageError}</div>
            )}
          </div>
        </div>
        {uploadSuccessful === null ? null : uploadSuccessful ? (
          <div className="text-green-500 mt-2">
            User changes uploaded successfully!
          </div>
        ) : (
          <div className="text-red-500 mt-2">Failed to upload user changes</div>
        )}
        <div className="flex justify-end mt-4">
          <Button type="submit" disabled={loading}>
            Update Profile
          </Button>
        </div>
        <h2 className="text-lg text-red-500 font-semibold mb-4 mt-4 border-b pb-2">
          Delete Account
        </h2>
        <DeleteAccountDialog userId={session.userId} />
      </form>
    </div>
  );
}
