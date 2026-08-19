export function Newsletter() {
  return (
    <section className="mb-16 mt-2 max-w-[1450px] overflow-hidden lg:px-24 mx-auto">
      <div className="grid gap-4 px-4 py-10 md:grid-cols-2 md:px-8 md:py-12">
        <div className="space-y-4">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">
            Never miss a GTA 6 drop
          </h2>
          <p className="max-w-sm text-muted-foreground">
            News, database updates, and leak verifications — one short email when
            something actually matters.
          </p>
          <form className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
            <input
              type="email"
              required
              placeholder="you@email.com"
              className="h-11 w-full max-w-md rounded-lg border border-border bg-white px-3 text-sm outline-none ring-primary focus:ring-2"
            />
            <button
              type="submit"
              className="h-11 w-full max-w-[140px] rounded-lg bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-hover sm:w-32"
            >
              Subscribe
            </button>
          </form>
        </div>
        <div
          className="hidden min-h-[160px] rounded-xl md:block"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #0f172a 0%, #1896fe 50%, #ff2d6a 100%)",
          }}
          aria-hidden
        />
      </div>
    </section>
  );
}
