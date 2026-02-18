import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Appointment",
  description:
    "Schedule your consultation with Dr. Shivani Singh at Dr. Shivani Medical & Dental Care. Premium dental, skin, and aesthetic treatments in Delhi.",
};

export default function BookAppointmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
