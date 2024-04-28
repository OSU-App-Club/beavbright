import { Bird, CornerDownLeft, Mic, Paperclip, Rabbit } from "lucide-react";

import { Button } from "@ui/components/ui/button";
import { Input } from "@ui/components/ui/input";
import { Label } from "@ui/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/components/ui/select";
import { Card } from "@ui/components/ui/card";

export default function Dashboard() {
  return (
    <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold">Quick Access</h2>
        <div className="grid gap-2 mt-2">
          <Button variant="ghost" className="flex items-center gap-2">
            <Bird className="w-5 h-5" />
            <span>View Courses</span>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <Rabbit className="w-5 h-5" />
            <span>View Study Groups</span>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <Mic className="w-5 h-5" />
            <span>View Discussions</span>
          </Button>
        </div>
      </Card>
      <Card className="rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold">Create</h2>
        <div className="grid gap-2 mt-2">
          <Button variant="ghost" className="flex items-center gap-2">
            <Paperclip className="w-5 h-5" />
            <span>Create Course</span>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <CornerDownLeft className="w-5 h-5" />
            <span>Create Study Group</span>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <Mic className="w-5 h-5" />
            <span>Create Discussion</span>
          </Button>
        </div>
      </Card>
      <Card className=" rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold">Search</h2>
        <div className="grid gap-2 mt-2">
          <Label htmlFor="search">Search</Label>
          <Input id="search" placeholder="Search" />
          <Label htmlFor="category">Category</Label>
          <Select>
            <SelectTrigger>
              <SelectValue>Category</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">Category 1</SelectItem>
              <SelectItem value="2">Category 2</SelectItem>
              <SelectItem value="2">Category 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>
    </main>
  );
}
