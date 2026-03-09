import PageContainer from '@/components/layout/PageContainer'

export default function BookDefinitionSection() {
  return (
    <section className="bg-[#141414] py-20 md:py-28">
      <PageContainer width="narrow">
        <div className="flex flex-col gap-10">

          <div className="flex flex-col gap-5">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              What This Book Is
            </h2>
          </div>

          <div className="flex flex-col gap-6 text-base leading-relaxed text-[#9a9590]">
            <p>
              Ignite is not a hype-driven fitness book and it is not another collection of recycled
              motivation. It is a practical guide for working men who need structure, consistency,
              and a clearer path back to physical discipline.
            </p>
            <p>
              The book is built for men whose schedules are full, whose responsibilities are real,
              and whose standards have started slipping underneath the pressure of work, family, and
              daily life. It gives them a way to rebuild without pretending life is simple.
            </p>
            <p>
              At its core, Ignite is about more than training and nutrition. It is about rebuilding
              self-command through habits a man can actually sustain.
            </p>
          </div>

          <div className="border border-[#2e2e2e] p-8">
            <p className="font-display text-sm italic leading-relaxed text-[#9a9590] md:text-base">
              This is not a book for reading and admiring. It is a book for using.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
