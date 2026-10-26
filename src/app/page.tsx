import { AnimatedText } from "@/components/AnimatedText";
import { BreadcrumbItemType, Breadcrumbs } from "@/components/Breadcrumbs";
import { CourseShell } from "@/components/courses/course-shell";

const BREADCRUMB_ITEMS: BreadcrumbItemType[] = [
  { label: "Home", href: "#course" },
  { label: "Courses", href: "#course" },
  { label: "Course Details" },
];

export default function HomePage() {
  return (
    <main>
      <header className="border-b border-border bg-secondary">
        <div className="wrapper py-3 md:py-5">
          <Breadcrumbs items={BREADCRUMB_ITEMS} />

          <AnimatedText
            as="h1"
            id="course"
            text="Starting SEO as your Home"
            className="mt-3 text-xl font-semibold text-foreground sm:text-3xl! md:mt-4 md:text-2xl"
          />
        </div>
      </header>
      <CourseShell />
    </main>
  );
}
