import { courseMaterials } from "@/data/dummy-data";
import { AnimatedText } from "../AnimatedText";
import Motion from "../Motion";

export function CourseMaterials() {
  const desktopMaterials = courseMaterials.filter(
    (item) => !item.label.toLowerCase().includes("instructor"),
  );
  const midpoint = Math.ceil(desktopMaterials.length / 2);
  const column1Items = desktopMaterials.slice(0, midpoint);
  const column2Items = desktopMaterials.slice(midpoint);

  return (
    <section
      id="materials"
      className="mt-5 [grid-area:materials] max-md:shadow-[0_12px_32px_rgba(20,28,33,.05)]"
      aria-labelledby="materials-heading"
    >
      <AnimatedText
        as="h2"
        id="materials-heading"
        text="Course Materials"
        className="main-heading max-md:px-5 max-md:pt-6 max-md:mb-0"
      />

      <Motion className="md:shadow-[0_12px_32px_rgba(20,28,33,.05)]">
        <dl className="grid grid-cols-1 rounded-lg bg-card px-5 py-3 md:hidden">
          {courseMaterials.map((item) => (
            <MaterialItem key={item.id} item={item} />
          ))}
        </dl>

        <dl className="hidden grid-cols-2 gap-x-10 rounded-lg bg-card px-7.5 py-4 md:grid">
          <div>
            {column1Items.map((item) => (
              <MaterialItem key={`col1-${item.id}`} item={item} />
            ))}
          </div>
          <div>
            {column2Items.map((item) => (
              <MaterialItem key={`col2-${item.id}`} item={item} />
            ))}
          </div>
        </dl>
      </Motion>
    </section>
  );
}

function MaterialItem({ item }: { item: (typeof courseMaterials)[number] }) {
  const Icon = item.icon;

  return (
    <div className="flex min-h-9 items-center justify-between gap-2.5 border-b border-border last:border-b-0">
      <dt className="flex items-center gap-2.5 text-sm font-normal text-muted-foreground">
        <Icon
          className="size-4.5 shrink-0 text-foreground/90"
          strokeWidth={1.6}
          aria-hidden="true"
        />
        {item.label}
      </dt>
      <dd className="m-0 whitespace-nowrap text-[13px] font-medium text-foreground">
        {item.value}
      </dd>
    </div>
  );
}
