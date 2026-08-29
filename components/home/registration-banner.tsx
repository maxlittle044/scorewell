import { Button } from "@/components/ui/button";

export function RegistrationBanner() {
  return (
    <section className="relative overflow-hidden bg-linear-to-r from-brand-700 via-brand-600 to-pop-700">
      <div aria-hidden="true" className="absolute inset-0 bg-noise" />
      <div
        data-reveal
        className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-center sm:px-6 md:flex-row md:text-left lg:px-8"
      >
        <div>
          <p className="text-base font-semibold text-white">
            Ready to book your exam?
          </p>
          <p className="mt-1 text-sm text-brand-100">
            We&apos;ll point you to official IELTS registration for your region —
            no account needed.
          </p>
        </div>
        <Button href="/exam-registration" variant="white" className="shrink-0">
          Exam registration
        </Button>
      </div>
    </section>
  );
}
