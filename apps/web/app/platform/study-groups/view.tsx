"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@ui/components/ui/card"

import { Button } from "@ui/components/ui/button"
import { Badge } from "@ui/components/ui/badge"


import {
    CameraIcon,
    ChatBubbleIcon,
} from "@radix-ui/react-icons";

import { Mic } from "lucide-react";

export default function View() {
    return (
        <>
            <main>
                <Card>
                    <CardHeader>

                        <div className="flex justify-between items-center w-full">
                            <div className="flex gap-2">
                                <CameraIcon className="w-5 h-5" />
                                <ChatBubbleIcon className="w-5 h-5" />
                                <Mic className="w-5 h-5" />
                            </div>
                            <Badge className="bg-green-500">Live</Badge>
                        </div>

                        <CardTitle className="text-2xl">MTH 242 Study Session</CardTitle>
                        <CardDescription>Join the MTH 242 study session</CardDescription>
                        <Button>Join</Button>
                    </CardHeader>
                </Card>
            </main>
        </>
    );
}


