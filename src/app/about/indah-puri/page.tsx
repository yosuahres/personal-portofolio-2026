import type { Metadata } from "next";

import { createMetadata } from "@/lib/metadata";

import { Heading, MediaPlaceholder, Paragraph, Subheading, WorkArticle } from "../ArticleParts";

export const metadata: Metadata = createMetadata({
  title: "Indah Puri Golf Resort",
  description:
    "An internal finance, HR and payroll system built freelance for Indah Puri Golf Resort in Batam.",
  path: "/about/indah-puri",
});

export default function IndahPuriPage() {
  return (
    <WorkArticle slug="indah-puri" title="Indah Puri Golf Resort">
      <Paragraph>
        Indah Puri Golf Resort is an 18-hole championship course on the northwest coast of Batam. As
        a freelancer, I built the resort an internal web app to replace spreadsheets for its
        finances, and it grew from a cash flow tracker into one system that also runs HR and
        payroll.
      </Paragraph>
      <Paragraph>
        It&apos;s built with Next.js, React and TypeScript, with Supabase for the Postgres database,
        authentication and row-level security. Every change goes through lint, type checking and a
        production build in GitHub Actions before it ships.
      </Paragraph>
      <MediaPlaceholder label="App launcher" />

      <Heading>Finance</Heading>
      <Paragraph>
        The first version was a cash flow app. Staff record income and expenses against accounts and
        categories, and each category knows whether money flows in or out, so an entry can&apos;t be
        filed the wrong way round.
      </Paragraph>

      <Subheading>Paid and unpaid</Subheading>
      <Paragraph>
        Expenses and income carry a payment status. Reports can count only what has actually
        settled, so a bill that&apos;s been recorded but not yet paid doesn&apos;t make the cash
        position look worse than it is.
      </Paragraph>

      <Subheading>Budgets</Subheading>
      <Paragraph>
        Budgets can be set per month or per year, for each account, in an editable grid. Every line
        shows the plan next to what was actually spent, so it&apos;s clear where the resort is over
        or under.
      </Paragraph>
      <MediaPlaceholder label="Budget grid with plan vs actual" />

      <Subheading>Financial report</Subheading>
      <Paragraph>
        The financial report puts budget and actual figures side by side with an opening balance,
        and exports to Excel in the format the finance team already works with. A detailed
        transaction view lists every entry with the party involved, for when a number needs
        explaining.
      </Paragraph>
      <MediaPlaceholder label="Financial report" />

      <Heading>HR</Heading>
      <Paragraph>
        Once finance was running, the resort wanted its people in the same place. The HRIS keeps
        employee records with photos and departments, and asks for a contract end date on fixed-term
        (PKWT) staff so renewals don&apos;t slip.
      </Paragraph>
      <Paragraph>
        Attendance runs on configurable shifts, and leave supports custom leave types with
        per-person entitlements. The HR dashboard charts headcount by department, employment status,
        length of service, age and gender, plus hiring by year.
      </Paragraph>
      <MediaPlaceholder label="HR dashboard" />

      <Heading>Payroll</Heading>
      <Paragraph>
        Payroll works in monthly runs. It calculates BPJS Kesehatan and BPJS Ketenagakerjaan
        contributions for both employee and employer, including the wage cap, produces a payslip for
        each person, and exports the run to Excel. A payroll dashboard summarizes each month.
      </Paragraph>
      <MediaPlaceholder label="Payslip" />

      <Heading>Access and Trust</Heading>
      <Paragraph>
        Finance and payroll data is sensitive, so access is tight. There&apos;s no public sign-up;
        admins create accounts and assign roles, and custom roles control exactly which modules and
        actions each person can use, down to which kinds of transactions they may enter or edit.
      </Paragraph>
      <Paragraph>
        Every change and every sign-in is written to an audit log. When someone leaves, their
        account can be removed while the records they created stay intact.
      </Paragraph>

      <Heading>Shared Foundations</Heading>
      <Paragraph>
        After signing in, people land on a launcher and pick an app, and each app has its own
        sidebar. Every list in the system shares one toolbar for search, filters, sorting and
        choosing columns, so finance, HR and settings all behave the same way. There&apos;s also a
        dark mode.
      </Paragraph>
    </WorkArticle>
  );
}
