import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button, buttonVariants } from "@ui/components/ui/button";

export const Hero = () => {
  return (
    <section
      id="home"
      className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10"
    >
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#ff6827]  to-[#DD622F] text-transparent bg-clip-text">
              Community Driven
            </span>{" "}
            Study Platform
          </h1>{" "}
          for{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#ff6827] to-[#DD622F] text-transparent bg-clip-text">
              Oregon State
            </span>{" "}
            Students
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Discover a vibrant community of OSU students, share resources, and
          collaborate on your academic journey.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button className="w-full md:w-1/3">Get Started</Button>

          <a
            href="https://github.com/OSU-App-Club/beavbright"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Github Repository
            <GitHubLogoIcon className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
      <div className="z-10 mt-12 lg:mt-0">
        <img
          src="/study.svg"
          alt="hero"
          className="w-full object-cover scale-150"
        />
      </div>
      <div className="shadow"></div>
    </section>
  );
};

/*
    Alternate Hero Section - I like the 2 column more but tbd.

    <section className="container grid lg:grid-cols-1 place-items-center py-12 lg:py-14 gap-14">
        <div>
          <img
            src="/study.svg"
            alt="hero"
            className="absolute top-0 right-0 w-1/2 lg:w-1/3"
          />
        </div>
        <div className="text-center space-y-8">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold font-sans text-neutral-800 dark:text-neutral-200">
            Community Driven
            <br />
            Study Platform for <br />{" "}
            <span className="text-orange-500">
              {" "}
              Oregon State University{" "}
            </span>{" "}
          </h1>

          <p className="text-muted-foreground max-w-sm md:max-w-xl font-normal mx-auto mt-6 md:text-xl">
            Discover a vibrant community of OSU students, share resources, and
            collaborate on your academic journey.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/register"
              className={`w-fit ${buttonVariants({
                variant: "outline",
              })}`}
            >
              Get Started
            </a>
            <a
              href="/login"
              className={`w-fit ${buttonVariants({
                variant: "outline",
              })}`}
            >
              Features
            </a>
          </div>
        </div>
      </section> */
