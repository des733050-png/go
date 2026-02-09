import { SEOHead } from "../SEOHead";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import {
  FlaskConical,
  Cpu,
  Wrench,
  ShieldCheck,
  Rocket,
  FileSearch,
  Workflow,
  CheckCircle2,
  ArrowRight,
  Building2,
  Stethoscope,
  Users,
} from "lucide-react";

export function RAndDPage() {
  const seoData = {
    title: "GONEP: Your Strategic R&D Partner in Healthcare Innovation",
    description:
      "GONEP is a specialized healthcare R&D partner that turns complex clinical and operational challenges into market-ready products, medical devices, and custom solutions—from concept to delivery.",
    keywords: [
      "healthcare R&D partner",
      "medical device R&D services",
      "healthcare innovation consultancy",
      "R&D as a service for healthcare",
      "custom healthcare product development",
      "medical device prototyping",
      "clinical innovation partner",
      "GONEP R&D",
      "gonepharm.com",
      "outsourced healthcare R&D",
    ],
    canonical: "/solutions/r-and-d",
  };

  const coreServices = [
    {
      icon: FlaskConical,
      title: "New Product & Device Development",
      description:
        "End-to-end development of healthcare products and medical devices, from early sketches and functional prototypes to validation-ready designs.",
      bullets: [
        "Concept exploration and feasibility",
        "Rapid prototyping and iteration",
        "Regulatory pathway awareness and planning",
        "Pre-clinical validation support",
      ],
    },
    {
      icon: Wrench,
      title: "Product Upgrades & Optimization",
      description:
        "Systematic enhancements for safety, usability, performance, and connectivity—without disrupting your existing operations.",
      bullets: [
        "User experience and workflow refinement",
        "Hardware and firmware improvements",
        "Connectivity and data integration upgrades",
        "Reliability, robustness, and lifecycle tuning",
      ],
    },
    {
      icon: Cpu,
      title: "Custom-Built Solutions",
      description:
        "Tailor-made software, hardware, or integrated systems that solve very specific operational or clinical problems in your context.",
      bullets: [
        "Custom software tools and dashboards",
        "Specialized hardware modules and accessories",
        "Integrated clinic, lab, or field workflows",
        "Interoperability with your existing stack",
      ],
    },
    {
      icon: Workflow,
      title: "Strategic R&D as a Service",
      description:
        "A flexible, outsourced R&D function that can plug into your roadmap—from initial feasibility right through to deployment.",
      bullets: [
        "R&D roadmap design and prioritization",
        "Feasibility studies and technical discovery",
        "Phased execution with clear milestones",
        "Continuous iteration based on real-world feedback",
      ],
    },
  ];

  const processSteps = [
    {
      step: "1. Discovery & Scoping",
      label: "The \"Interest\" Phase",
      description:
        "A focused, no-obligation workshop where we unpack your problem, context, stakeholders, and success metrics in plain language.",
    },
    {
      step: "2. Requirement Definition & Verification",
      label: "From idea to a clear spec",
      description:
        "We translate your goals into a crystal-clear, testable technical specification, then review it together to ensure alignment.",
    },
    {
      step: "3. Transparent Quotation & Roadmap",
      label: "No surprises",
      description:
        "You receive a fixed-scope or phased proposal with timelines, milestones, dependencies, and investment clearly outlined.",
    },
    {
      step: "4. Kickoff & Agile Implementation",
      label: "Build with visibility",
      description:
        "Our team executes in sprints, sharing regular updates, demos, and checkpoints so you can steer with confidence.",
    },
    {
      step: "5. Delivery & Launch Support",
      label: "From handover to adoption",
      description:
        "We provide complete documentation, source assets, training where needed, and support your transition into production or pilots.",
    },
  ];

  const whyPartner = [
    {
      icon: Building2,
      title: "Deep Dual Expertise",
      description:
        "Seasoned business development strategists work side-by-side with product and engineering leads who have shipped real-world healthcare solutions.",
      detail:
        "We understand the commercial, regulatory, and clinical realities shaping your decisions—not just the technology.",
    },
    {
      icon: ShieldCheck,
      title: "De-Risked Innovation",
      description:
        "Structured R&D frameworks keep each phase explicit, measurable, and testable.",
      detail:
        "You get clear entry and exit criteria at each stage so investments are protected and progress is always traceable.",
    },
    {
      icon: Rocket,
      title: "Speed to Solution",
      description:
        "Skip multi-month hiring cycles and onboarding of in-house R&D teams.",
      detail:
        "Our dedicated specialists begin executing from day one, accelerating your path from problem to validated solution.",
    },
    {
      icon: Users,
      title: "Total Confidentiality & IP Clarity",
      description:
        "Your challenge, data, and final solution remain yours.",
      detail:
        "We operate under strict NDAs, with clear IP assignment so all resulting intellectual property belongs to your organization.",
    },
  ];

  return (
    <div className="bg-background">
      <SEOHead seo={seoData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 section-padding">
        <div className="container max-w-5xl mx-auto">
          <div className="space-y-6 text-center">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary">
              R&amp;D Services
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              GONEP: Your Strategic R&amp;D Partner in Healthcare Innovation
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              At GONEP, we transform your healthcare challenges into{" "}
              <strong>market-ready solutions</strong>. We specialize in building,
              upgrading, and customizing products, medical devices, and services
              that move from concept to real-world deployment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
                size="lg"
                asChild
              >
                <a href="mailto:info@gonepharm.com?subject=R%26D%20Discovery%20Session">
                  Request a Confidential Discovery Session
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8"
                size="lg"
                asChild
              >
                <a href="/contact">Talk to the GONEP Team</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Gap Section */}
      <section className="section-padding bg-muted/30">
        <div className="container max-w-5xl mx-auto grid gap-10 md:grid-cols-[1.7fr,1.3fr] items-start">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              What We Solve: The Innovation Gap
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Many organizations in healthcare face a difficult dilemma:
              <strong> the urgent need to innovate</strong> versus the{" "}
              <strong>cost, time, and risk</strong> of building an in-house
              R&amp;D capability. Whether you are a startup without a technical
              team or an established company facing a niche problem, GONEP fills
              that gap.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              We provide the expertise and structure to move you from a{" "}
              <strong>pressing clinical or operational need</strong> to a{" "}
              <strong>validated, functional solution</strong>—without
              overextending your internal teams.
            </p>
          </div>
          <Card className="border-primary/20 shadow-md">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                Is GONEP R&amp;D a fit for you?
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• You have a clear problem but no internal R&amp;D team.</li>
                <li>
                  • You need to adapt existing products to a new clinical or
                  regional context.
                </li>
                <li>
                  • You want to explore a new product line without building a
                  permanent R&amp;D department.
                </li>
                <li>
                  • You require a partner who understands both{" "}
                  <strong>healthcare realities and technology</strong>.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Core Services */}
      <section className="section-padding">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our Core Services: End-to-End Expertise
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From blank-page ideas to ready-to-launch products, GONEP R&amp;D
              gives you a single, accountable partner across the lifecycle of
              healthcare innovation.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {coreServices.map((service) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.title}
                  className="h-full border-2 border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {service.bullets.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Partner with GONEP */}
      <section className="section-padding bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Why Partner with GONEP?
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {whyPartner.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.title}
                  className="border-2 border-border hover:border-secondary/30 hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-secondary/10 text-secondary p-3 rounded-full">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                    <p className="text-xs text-muted-foreground/90">
                      {item.detail}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our Proven, Client-Centric Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We guide you through a transparent journey from first conversation
              to launch, so you always know where your project stands and what
              comes next.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <Card
                key={step.step}
                className="relative h-full border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-wide uppercase text-primary">
                      Step {index + 1}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {step.label}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {step.step}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container max-w-5xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Build Your Next Healthcare Breakthrough?
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            Don&apos;t let R&amp;D complexity stall your progress. Partner with
            GONEP to turn your critical need into your competitive advantage—with
            a team that understands healthcare, technology, and real-world
            deployment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8"
              asChild
            >
              <a href="mailto:info@gonepharm.com?subject=R%26D%20Discovery%20Session">
                Book a Discovery Session
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8"
              asChild
            >
              <a href="/solutions">Explore Our Solutions</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}


