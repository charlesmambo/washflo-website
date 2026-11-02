import { useState } from "react";
import washfloLogo from "./assets/washflo_logo.png";
import "./App.css";

const features = [
  [
    "◉",
    "Monthly Subscription Management",
    "Introduce monthly wash packages and give customers the flexibility to choose subscriptions that suit their needs. Manage subscription information, monitor active packages and keep track of washes included in each customer’s subscription.",
  ],
  [
    "▣",
    "Online Booking Management",
    "Allow customers to schedule their washes online. Receive booking requests, review appointments and details, and manage confirmations based on your business’s availability.",
  ],
  [
    "▦",
    "QR Code Verification",
    "Make customer arrivals easier to manage with QR code booking verification. Staff can scan a customer’s unique booking QR code to verify the appointment and check them in.",
  ],
  [
    "♙",
    "Customer Management",
    "Keep your customer information organised in one place. Access customer profiles, vehicle details, subscription information and booking history without relying entirely on manual records.",
  ],
  [
    "♧",
    "Wash Allowance Tracking",
    "Know how many washes each customer has used and how many they have remaining. Washflo automatically updates subscription allowances when a wash is marked as completed.",
  ],
  [
    "▣",
    "Additional Wash Management",
    "Give customers the option to purchase additional washes when they need more than their subscription includes. Record extra washes paid for online or through cash transactions handled at your car wash.",
  ],
  [
    "⬡",
    "Package Management",
    "Create and manage the monthly wash packages available to your customers. Set package names, prices and included wash allowances according to your business offerings.",
  ],
  [
    "⊞",
    "Business Administration",
    "Manage your car wash activities through a dedicated administration portal. Access the tools needed to oversee bookings, subscriptions, customers and daily washing operations.",
  ],
];

const steps = [
  [
    "⬡",
    "Set Up Your Wash Packages",
    "Create monthly subscription packages that suit your business. Decide how many washes each package includes and set your own package prices.",
  ],
  [
    "♙",
    "Customers Subscribe",
    "Customers access your Washflo customer platform, create an account and explore the available monthly packages.",
  ],
  [
    "▣",
    "Customers Book Their Washes",
    "Customers can log into their account, view their active subscriptions and check how many washes they have remaining.",
  ],
  [
    "▧",
    "Scan and Verify",
    "When the customer arrives at your car wash, they present their booking QR code. Your staff scan the QR code to verify the booking and check the customer in.",
  ],
  [
    "♧",
    "Complete the Wash",
    "Once the vehicle has been washed, staff update the booking status to completed. Washflo automatically updates the customer’s remaining subscription allowance.",
  ],
];

const benefits = [
  [
    "Build a More Predictable Revenue Stream",
    "Monthly subscriptions give your customers the opportunity to pay for their washes in advance through recurring monthly packages.",
  ],
  [
    "Encourage Customer Loyalty",
    "Give customers a reason to make your car wash part of their regular routine. Monthly packages encourage repeat visits and help establish stronger relationships.",
  ],
  [
    "Spend Less Time Managing Bookings Manually",
    "Manage incoming bookings through one central system. Your staff can review appointments, confirm availability and keep track of scheduled washes.",
  ],
  [
    "Know Your Customers Better",
    "Keep customer profiles, vehicle information, subscriptions and booking histories organised in one place.",
  ],
  [
    "Keep Your Team Organised",
    "Give staff a straightforward process for verifying bookings, checking in customers and updating wash statuses.",
  ],
  [
    "Understand Your Business Activity",
    "Keep track of subscriptions, bookings, completed washes and additional wash transactions through your administration portal.",
  ],
];

const customerSteps = [
  [
    "⬡",
    "Choose Your Preferred Package",
    "Explore the monthly packages offered by your car wash and select the option that suits your washing needs.",
  ],
  [
    "◴",
    "Manage Your Subscription",
    "Access your account to view your active subscription, package details and remaining washes.",
  ],
  [
    "▣",
    "Book Whenever You’re Ready",
    "Choose an available date and time to book your next car wash appointment.",
  ],
  [
    "▦",
    "Enjoy Easy QR Code Check ins",
    "Receive a unique QR code for your booking and present it when you arrive at the car wash.",
  ],
  [
    "♧",
    "Keep Track of Your Washes",
    "See how many washes you have used and how many remain in your monthly allowance.",
  ],
  [
    "✧",
    "Need an Extra Wash?",
    "Request an additional wash and pay separately whenever you need one.",
  ],
];

const faqs = [
  [
    "What is Washflo?",
    "Washflo is a car wash subscription and management platform that helps car wash businesses offer monthly wash packages, manage customer bookings and organise daily operations.",
  ],
  [
    "How does Washflo benefit my car wash business?",
    "Washflo helps you introduce subscription packages, organise bookings and customers, and track washes through a central management platform.",
  ],
  [
    "How do monthly subscriptions work?",
    "You create the monthly packages and set the prices and number of washes included. Customers choose a package and use the included washes during their subscription.",
  ],
  [
    "Who receives the money customers pay?",
    "Your business sets its package prices and receives subscription payments through its configured payment arrangements.",
  ],
  [
    "How do customers book their washes?",
    "Customers use the online platform to view available appointment times and book a wash using their active subscription.",
  ],
  [
    "How do staff verify bookings?",
    "Customers present a unique QR code at the car wash. Staff scan the code to verify the booking and check the customer in.",
  ],
  [
    "What happens when a customer has used all their subscription washes?",
    "Customers can see their remaining allowance in their account and request an additional wash if they need one.",
  ],
  [
    "Can I decide how much to charge for my packages?",
    "Yes. Your business chooses the package prices and the number of washes included in each package.",
  ],
  [
    "Do I need technical experience to use Washflo?",
    "No. Washflo is designed to make subscription and booking management straightforward for car wash teams.",
  ],
  [
    "Can my employees use Washflo?",
    "Your team can use the administration tools to review bookings, verify customers and update wash statuses.",
  ],
  [
    "How can I introduce Washflo into my car wash?",
    "Book a demo and our team can walk you through how Washflo can support your car wash business.",
  ],
];

function Brand({ light = false }) {
  return (
    <a
      className={`brand ${light ? "brand-light" : ""}`}
      href="/#home"
      aria-label="Washflo home"
    >
      <img src={washfloLogo} alt="Washflo" />
    </a>
  );
}

function Footer({ className = "" }) {
  return (
    <footer className={`site-footer ${className}`.trim()}>
      <div className="footer-inner">
        <div className="footer-about">
          <Brand light />
          <h3>Smarter Car Wash Management.</h3>
          <p>
            Washflo helps car wash businesses introduce monthly wash
            subscriptions, manage customer bookings and simplify everyday
            operations through one connected platform.
          </p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="/#home">Home</a>
          <a href="/#how-it-works">How It Works</a>
          <a href="/#features">Features</a>
          <a href="/#owners">For Car Wash Owners</a>
          <a href="/#drivers">For Drivers</a>
          <a href="/#faqs">FAQs</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="footer-links">
          <h4>Get in Touch</h4>
          <a href="mailto:hello@washflo.co.za">charles@washflo.co.za</a>
          <a href="https://wa.me/27000000000">WhatsApp</a>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Washflo. All rights reserved.</span>
          <span>Subscriptions. Bookings. Better Business.</span>
        </div>
      </div>
    </footer>
  );
}

function Dashboard({ compact = false }) {
  return (
    <div className={`dashboard ${compact ? "dashboard-compact" : ""}`}>
      <div className="window-bar">
        <i />
        <i />
        <i />
        <span>app.washflo.co.za</span>
        <b>•••</b>
      </div>
      <div className="dash-content">
        <aside className="dash-side">
          <Brand />
          <span className="active">▧ &nbsp; Overview</span>
          <span>▣ &nbsp; Bookings</span>
          <span>♙ &nbsp; Customers</span>
          <span>⬡ &nbsp; Packages</span>
          <span>▤ &nbsp; Payments</span>
        </aside>
        <div className="dash-main">
          <div className="dash-greeting">
            <div>
              <small>MONDAY, 14 JULY</small>
              <h3>Good morning, Peter</h3>
            </div>
            <b>PD</b>
          </div>
          <div className="stats">
            <div>
              <small>Active subscriptions</small>
              <strong>248</strong>
              <em>+12 this month</em>
            </div>
            <div>
              <small>Today’s bookings</small>
              <strong>18</strong>
              <em>6 remaining</em>
            </div>
            <div>
              <small>Monthly sales</small>
              <strong>R96,472</strong>
              <em>↑ 12.5%</em>
            </div>
          </div>
          <div className="dash-widgets">
            <div className="chart">
              <div className="widget-title">
                Subscription activity <small>Last 8 months</small>
              </div>
              <div className="bars">
                {[28, 43, 38, 59, 52, 71, 65, 89].map((v, i) => (
                  <i key={i} style={{ height: `${v}%` }} />
                ))}
              </div>
              <div className="chart-months">
                <span>Jan</span>
                <span>Mar</span>
                <span>May</span>
                <span>Jul</span>
              </div>
            </div>
            <div className="upcoming">
              <div className="widget-title">Upcoming bookings</div>
              {["Thabo Mokoena", "S. van der Merwe", "Lebo Nkosi"].map(
                (name, i) => (
                  <div className="booking" key={name}>
                    <span className="booking-avatar">
                      {["TM", "SV", "LN"][i]}
                    </span>
                    <span>
                      {name}
                      <small>
                        {["09:30", "10:15", "11:00"][i]} · Premium wash
                      </small>
                    </span>
                    <b>•</b>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="float-tag">
        <span>✓</span>
        <div>
          <b>{compact ? "Customer growth" : "Booking confirmed"}</b>
          <small>
            {compact ? "Your business is growing" : "Ready for check in"}
          </small>
        </div>
      </div>
    </div>
  );
}

function Phone({ type = "plan" }) {
  return (
    <div className={`phone phone-${type}`}>
      <div className="phone-island" />
      <div className="phone-screen">
        <div className="phone-brand">
          <span>♦</span> WashFlo <i>•••</i>
        </div>
        {type === "plan" ? (
          <>
            <small className="phone-kicker">Good morning, John</small>
            <h4>Your wash plan</h4>
            <div className="plan-card">
              <small>PREMIUM PLAN</small>
              <strong>4 Washes</strong>
              <span>
                Remaining <b>75%</b>
              </span>
              <i>
                <b />
              </i>
            </div>
            <button>Book a wash</button>
            <small className="recent-label">Recent activity</small>
            <div className="phone-recent">
              ✓ &nbsp; Premium wash <small>Completed · 12 Jul</small>
            </div>
          </>
        ) : type === "qr" ? (
          <>
            <h4>You’re all set!</h4>
            <p>Your booking QR code</p>
            <div className="qr">
              ▦ ▣ ▦<br />▣ ▦ ▣<br />▦ ▣ ▦
            </div>
            <button>View booking</button>
          </>
        ) : (
          <>
            <h4>Choose a time</h4>
            <div className="time-grid">
              {["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"].map(
                (t) => (
                  <span key={t}>{t}</span>
                ),
              )}
            </div>
            <button>Continue booking</button>
          </>
        )}
      </div>
    </div>
  );
}

function Devices() {
  return (
    <div className="devices">
      <Phone type="time" />
      <Phone />
      <Phone type="qr" />
    </div>
  );
}

function SectionHeading({ eyebrow, title, copy, left = false }) {
  return (
    <div className={`section-heading ${left ? "heading-left" : ""}`}>
      <div className="eyebrow">
        <i />
        {eyebrow}
      </div>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function App() {
  const [openFaq, setOpenFaq] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  if (window.location.pathname === "/contact") {
    return (
      <div className="contact-page">
        <header className="site-header">
          <div className="nav-wrap">
            <Brand />
            <nav className="contact-nav">
              <a href="/#home">Home</a>
              <a href="/#how-it-works">How It Works</a>
              <a href="/#features">Features</a>
              <a href="/#owners">For Owners</a>
              <a href="/#drivers">For Drivers</a>
              <a href="/#faqs">FAQs</a>
              <a href="/contact" aria-current="page">
                Contact
              </a>
            </nav>
            <a className="button button-primary header-cta" href="/contact">
              Book a Demo <span>↗</span>
            </a>
          </div>
        </header>
        <main className="contact-page-main">
          <div className="contact-page-copy">
            <div className="eyebrow">
              <i />
              Get in touch
            </div>
            <h1>Let’s talk about your car wash.</h1>
            <p>
              Tell us a little about your business and how we can help. The
              Washflo team will be in touch soon.
            </p>
            <div className="contact-details">
              <a href="mailto:hello@washflo.co.za">
                <span>✉</span>
                <div>
                  <small>Email us</small>
                  <b>charles@washflo.co.za</b>
                </div>
              </a>
              <a href="https://wa.me/27000000000">
                <span>↗</span>
                <div>
                  <small>Message us</small>
                  <b>WhatsApp</b>
                </div>
              </a>
            </div>
          </div>
          <form
            className="contact-form"
            action="mailto:hello@washflo.co.za"
            method="post"
            encType="text/plain"
          >
            <label>
              Your name
              <input
                name="name"
                autoComplete="name"
                placeholder="e.g. Alex Smith"
                required
              />
            </label>
            <label>
              Work email
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@yourcarwash.co.za"
                required
              />
            </label>
            <label>
              Car wash business
              <input
                name="business"
                autoComplete="organization"
                placeholder="Your business name"
              />
            </label>
            <label>
              How can we help?
              <textarea
                name="message"
                rows="5"
                placeholder="Tell us what you’re looking for..."
                required
              />
            </label>
            <button className="button button-primary" type="submit">
              Send message <span>↗</span>
            </button>
          </form>
        </main>
        <Footer className="contact-page-footer" />
      </div>
    );
  }

  return (
    <>
      <header className="site-header">
        <div className="nav-wrap">
          <Brand />
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            ☰
          </button>
          <nav className={menuOpen ? "nav-open" : ""}>
            <a href="#home">Home</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#features">Features</a>
            <a href="#owners">For Owners</a>
            <a href="#drivers">For Drivers</a>
            <a href="#faqs">FAQs</a>
            <a href="/contact">Contact</a>
          </nav>
          <a className="button button-primary header-cta" href="/contact">
            Book a Demo <span>↗</span>
          </a>
        </div>
      </header>
      <main>
        <section className="hero" id="home">
          <div className="hero-orb hero-orb-left" />
          <div className="hero-orb hero-orb-right" />
          <div className="hero-ring" />
          <div className="hero-inner">
            <div className="hero-copy">
              <div className="eyebrow">
                <i />
                Smarter car wash management starts here
              </div>
              <h1>
                Turn Your Car Wash Into a <span>Subscription Business.</span>
              </h1>
              <p>
                Washflo helps car wash businesses introduce monthly wash
                subscriptions, manage customer bookings and simplify daily
                operations through one connected platform.
              </p>
              <p>
                Give your customers a convenient way to subscribe to their
                favourite car wash, book their visits and track their washes,
                while your business gets the tools to manage everything in one
                place.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact">
                  Book a Demo <span>↗</span>
                </a>
                <a className="button button-outline" href="#how-it-works">
                  Explore How It Works <span>↗</span>
                </a>
              </div>
              <div className="trust-row">
                <div className="avatar-stack">
                  <span>TM</span>
                  <span>SK</span>
                  <span>LN</span>
                </div>
                <div>
                  <b>One connected platform</b>
                  <small>Subscriptions · Bookings · Operations</small>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <Dashboard />
              <Phone />
            </div>
          </div>
        </section>

        <section className="intro section-shell" id="owners">
          <div className="intro-copy">
            <div className="eyebrow">
              <i />
              Introducing Washflo
            </div>
            <h2>Everything Your Car Wash Needs, Connected in One Platform.</h2>
            <p>
              Washflo is a digital car wash subscription and management platform
              designed to help car wash businesses modernise the way they serve
              customers and manage their operations.
            </p>
            <p>
              Traditionally, customers visit a car wash, pay for an individual
              wash and return whenever they need another one. Washflo introduces
              a more convenient approach by allowing your business to offer
              monthly wash packages.
            </p>
            <p>
              Customers can subscribe to a package, make their payments online
              and book their washes whenever they need them.
            </p>
            <p>
              Meanwhile, your business gets access to an administration portal
              where you can manage customers, subscriptions, bookings, wash
              activity and additional services.
            </p>
            <p>
              From the moment a customer subscribes to the moment their vehicle
              is washed, Washflo helps keep everything organised.
            </p>
            <div className="highlight-note">
              More than just bookings. A smarter way to manage your entire car
              wash subscription experience.
            </div>
          </div>
          <div className="intro-visual">
            <div className="visual-backdrop" />
            <Dashboard compact />
          </div>
        </section>

        <section className="steps-section" id="how-it-works">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Simple from start to finish"
              title={
                <>
                  From Subscription to
                  <br />
                  Completed Wash.
                </>
              }
              copy="Washflo connects your car wash business with your customers through a simple digital process. Customers manage their subscriptions and bookings, while your staff manage daily washing activities through the administration portal."
            />
            <div className="steps-grid">
              {steps.map(([icon, title, text], i) => (
                <article className="step-card" key={title}>
                  <div className="card-top">
                    <small>{String(i + 1).padStart(2, "0")}</small>
                    <span className="icon-bubble">{icon}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="features-section" id="features">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Built for your daily operations"
              title={
                <>
                  Powerful Tools to Keep Your
                  <br />
                  Car Wash Running Smoothly.
                </>
              }
              copy="Managing a car wash involves more than washing vehicles. From handling bookings and managing customers to keeping track of subscriptions and payments, there are many activities that need attention. Washflo brings these essential activities together in one central platform."
            />
            <div className="features-grid">
              {features.map(([icon, title, text], i) => (
                <article className="feature-card" key={title}>
                  <div className="feature-card-top">
                    <span className="icon-bubble">{icon}</span>
                    <small>{String(i + 1).padStart(2, "0")}</small>
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="benefits-section section-shell">
          <div className="benefits-heading">
            <div className="eyebrow">
              <i />
              Built with your business in mind
            </div>
            <h2>
              More Returning Customers. More Organised Operations. More
              Opportunities to Grow.
            </h2>
            <p>
              Your car wash business deserves tools that make managing customers
              and daily operations easier. Washflo helps you introduce a
              subscription-based service that encourages customers to return
              regularly while giving you greater visibility over your business
              activities.
            </p>
          </div>
          <div className="benefits-layout">
            <div className="benefits-art">
              <div className="art-blob" />
              <Dashboard compact />
            </div>
            <div className="benefit-list">
              {benefits.map(([title, text], i) => (
                <article key={title}>
                  <small>{String(i + 1).padStart(2, "0")}</small>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="dark-note benefits-note">
            <p>
              Washflo gives your business the digital tools to introduce monthly
              subscriptions and manage the customer experience from beginning to
              end.
            </p>
          </div>
        </section>

        <section className="drivers-section" id="drivers">
          <div className="section-shell">
            <SectionHeading
              eyebrow="A better way to enjoy your car wash"
              title={
                <>
                  Your Favourite Car Wash, Now
                  <br />
                  More Convenient.
                </>
              }
              copy="Getting your vehicle cleaned should be simple. With Washflo, customers can subscribe to monthly wash packages offered by participating car washes and manage their visits through one convenient online platform. No complicated arrangements. Just a simpler way to manage your car wash experience."
            />
            <div className="drivers-layout">
              <Devices />
              <div className="driver-list">
                {customerSteps.map(([icon, title, text]) => (
                  <article key={title}>
                    <span className="icon-bubble">{icon}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <p className="drivers-tagline">
              Your subscription. Your bookings. Your washes.{" "}
              <b>All in one place.</b>
            </p>
          </div>
        </section>

        <section className="revenue-section section-shell">
          <div className="revenue-copy">
            <div className="eyebrow">
              <i />A different way to grow
            </div>
            <h2>Turn Monthly Packages Into Repeat Business.</h2>
            <p>
              Imagine introducing a monthly package that gives customers four
              car washes for R389.
            </p>
            <p>
              Instead of paying separately every time they visit, customers
              subscribe to your package and use their included washes throughout
              the month.
            </p>
            <p>
              Now imagine building a community of customers who choose to
              subscribe to your car wash.
            </p>
            <p>
              That’s R19,450 in monthly subscription sales from just 50
              subscribers on this package.
            </p>
            <p>
              And that’s before considering individual wash customers and
              additional wash purchases.
            </p>
            <div className="highlight-note">
              Washflo helps you manage the subscriptions, bookings and customer
              activity that make this business model possible.
            </div>
            <small className="disclaimer">
              Illustrative example. Actual revenue depends on the number of
              paying subscribers, pricing, customer retention, operating costs,
              payment fees and applicable taxes.
            </small>
          </div>
          <div className="revenue-card">
            <div className="revenue-label">
              <span>✧</span> Monthly package example
            </div>
            <div className="price">
              <small>R</small>389 <i>/ month</i>
            </div>
            <b className="package-desc">4 washes monthly</b>
            <hr />
            <div className="metric">
              <span>Package</span>
              <b>4 washes monthly</b>
            </div>
            <div className="metric">
              <span>Package price</span>
              <b>R389</b>
            </div>
            <div className="metric">
              <span>Subscribers</span>
              <b>50</b>
            </div>
            <div className="sales-total">
              <span>
                Monthly subscription
                <br />
                sales
              </span>
              <b>R19,450</b>
            </div>
            <div className="trend-line">
              ╱──── &nbsp; Predictable monthly potential
            </div>
          </div>
        </section>

        <section className="faq-section" id="faqs">
          <div className="section-shell faq-layout">
            <div className="faq-intro">
              <div className="eyebrow">
                <i />
                Frequently asked questions
              </div>
              <h2>Everything You Need to Know.</h2>
              <p>
                Have a question about subscriptions, payments or daily
                operations? Start here.
              </p>
              <a className="button button-primary" href="/contact">
                Book a Demo <span>↗</span>
              </a>
            </div>
            <div className="faq-list">
              {faqs.map(([q, a], i) => (
                <article
                  className={`faq-item ${openFaq === i ? "faq-open" : ""}`}
                  key={q}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span>{q}</span>
                    <i>{openFaq === i ? "−" : "+"}</i>
                  </button>
                  {openFaq === i && <p>{a}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section section-shell" id="contact">
          <div className="contact-card">
            <div className="contact-copy">
              <div className="eyebrow">
                <i />
                Let’s move your car wash business forward
              </div>
              <h2>
                Ready to Experience a Smarter Way to Manage Your Car Wash?
              </h2>
              <p>
                Whether you’re looking to introduce monthly wash subscriptions,
                simplify customer bookings or organise your daily operations,
                Washflo gives your business the tools to take the next step.
              </p>
              <p>
                Discover how Washflo can help your car wash business create a
                more convenient experience for customers and a more organised
                way to operate.
              </p>
              <div className="contact-actions">
                <a className="button button-white" href="/contact">
                  Book a Demo <span>↗</span>
                </a>
                <a className="button button-translucent" href="/contact">
                  Contact Us <span>↗</span>
                </a>
              </div>
              <small>
                Have questions? We’d love to show you what Washflo can do for
                your business.
              </small>
            </div>
            <div className="contact-art">
              <div className="contact-ring" />
              <Phone type="qr" />
              <Phone />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
