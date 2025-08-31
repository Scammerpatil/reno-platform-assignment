"use client";
import Navbar from "@/components/Navbar";
import { IconCircleChevronRight } from "@tabler/icons-react";

export default function Home() {
  return (
    <div className="max-h-screen overflow-y-hidden">
      <Navbar />
      <section className="bg-base-300 h-[calc(100vh-4rem)] flex items-center">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl text-base-content font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
              Reno PlatForm Assignment: Portal to manage Schools
            </h1>
            <p className="max-w-2xl mb-6 font-light text-base-content/70 lg:mb-8 md:text-lg lg:text-xl">
              Reno PlatForm is an innovative platform that leverages AI to
              empower schools with real-time management and administrative
              solutions.
            </p>
            <a
              href="/add-school"
              className="btn btn-primary text-base font-medium text-center rounded-lg mr-4"
            >
              Add School
              <IconCircleChevronRight />
            </a>
            <a
              href="/view-schools"
              className="btn btn-outline text-base font-medium text-center rounded-lg mr-4 mt-2 lg:mt-0"
            >
              View Schools
              <IconCircleChevronRight />
            </a>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="/school.png" alt="School image from storyset" />
          </div>
        </div>
      </section>
    </div>
  );
}
