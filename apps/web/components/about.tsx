import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/components/card";

import { Book, MessageCircle, Users } from "lucide-react";
import Image from "next/image";

interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const serviceList: ServiceProps[] = [
  {
    title: "Study Resources",
    description:
      "Need help with an assignment? Want to see an old exam? We have you covered.",
    icon: <Book />,
  },
  {
    title: "Discussion Forums",
    description:
      "Discuss with other students about the classes you are taking and get help from other students.",
    icon: <MessageCircle />,
  },
  {
    title: "Class-Specific Groups",
    description:
      "Tell us the classes you are taking and we will pair you with other students in the same section.",
    icon: <Users />,
  },
];

export const About = () => {
  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">
            By Students, For Students
          </h2>

          <p className="text-muted-foreground text-xl mt-4 mb-8 ">
            The App Development Club is building BeavBright to help students and
            fill the gap in the current study platforms.
          </p>

          <div className="flex flex-col gap-8">
            {serviceList.map(({ icon, title, description }: ServiceProps) => (
              <Card key={title}>
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                  <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                    {icon}
                  </div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-md mt-2">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
        <Image
          src={"/students.svg"}
          width={600}
          height={600}
          className="w-[300px] md:w-[500px] lg:w-[600px] object-contain"
          alt="Students"
        />
      </div>
    </section>
  );
};
