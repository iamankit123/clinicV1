/* Clinic data constants — single source of truth */

export const CLINIC = {
  name: "Dr. Shivani Medical & Dental Care",
  shortName: "Dr. Shivani Clinic",
  tagline: "Where Science Meets Elegance",
  description:
    "Premium dental, skin, and aesthetic treatments delivered with precision and care by Dr. Shivani Singh in the heart of Delhi.",
  address: "Khasra No. 391, Main Kushak Road, Block J, Swaroop Nagar, Bhalswa, Delhi - 110042",
  phones: ["+91 82873 72644", "+91 89792 63949"],
  email: "drshivanicare@gmail.com",
  timing: "10:00 AM — 9:00 PM",
  days: "Monday — Saturday",
  mapUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.624!2d77.1472938!3d28.7597276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d01201e0578a9%3A0xe59c61302f7f2551!2sDr.+Shivani+Medical+And+Dental+Care!5e0!3m2!1sen!2sin!4v1714316544000!5m2!1sen!2sin",
} as const;

export const DOCTOR = {
  name: "Dr. Shivani Singh",
  qualifications: "B.D.S, PGDCC, MIDA",
  title: "Founder & Lead Clinician",
  bio: [
    "Dr. Shivani Singh is a distinguished dental surgeon and aesthetic medicine specialist with years of dedicated practice in advanced dental care, cosmetology, and skin treatments.",
    "With qualifications including B.D.S (Bachelor of Dental Surgery), PGDCC (Post Graduate Diploma in Clinical Cosmetology), and MIDA certification, she brings a rare combination of surgical precision and aesthetic artistry to every treatment.",
    "Her philosophy centres on delivering transformative results through minimally invasive techniques, personalised treatment plans, and an unwavering commitment to patient comfort and safety.",
  ],
  specializations: [
    "Advanced Cosmetic Dentistry",
    "Smile Design & Makeovers",
    "Clinical Cosmetology",
    "Aesthetic Skin Treatments",
    "Hair Restoration Therapies",
    "Laser Treatments",
  ],
} as const;

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  gradient: string;
  services: Service[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "dental",
    title: "Dental Excellence",
    subtitle: "Advanced Dental Care",
    description:
      "State-of-the-art dental treatments combining cutting-edge technology with artistic precision for your perfect smile.",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z",
    gradient: "from-burgundy-500 to-burgundy-700",
    services: [
      {
        title: "Braces — Metal & Ceramic",
        description:
          "Premium orthodontic solutions with both traditional metal and discreet ceramic options for perfectly aligned teeth.",
        icon: "braces",
      },
      {
        title: "Root Canal Treatment",
        description:
          "Painless, precision root canal therapy using advanced rotary endodontics to save and restore damaged teeth.",
        icon: "rct",
      },
      {
        title: "Smile Design",
        description:
          "Complete smile makeover combining veneers, whitening, and contouring for a Hollywood-worthy smile.",
        icon: "smile",
      },
      {
        title: "Dental Implants",
        description:
          "Permanent, natural-looking tooth replacement using premium titanium implants with lifetime durability.",
        icon: "implant",
      },
      {
        title: "Crown & Bridge",
        description:
          "Custom-crafted porcelain crowns and bridges that seamlessly blend with your natural teeth.",
        icon: "crown",
      },
      {
        title: "Teeth Whitening & Bleaching",
        description:
          "Professional-grade whitening treatments for a brilliantly bright, confident smile.",
        icon: "whitening",
      },
      {
        title: "Cosmetic Filling",
        description:
          "Tooth-coloured composite fillings that restore both function and aesthetics invisibly.",
        icon: "filling",
      },
      {
        title: "Gum & Bone Surgery",
        description:
          "Advanced periodontal procedures for healthy gums and strong dental foundations.",
        icon: "surgery",
      },
      {
        title: "Impaction & Extraction",
        description:
          "Expert surgical extraction of wisdom teeth and impacted teeth with minimal discomfort.",
        icon: "extraction",
      },
      {
        title: "Swollen Gum Treatment",
        description:
          "Comprehensive treatment for gum disease, inflammation, and periodontal conditions.",
        icon: "gum",
      },
      {
        title: "Laser Dental Surgery",
        description:
          "Minimally invasive laser procedures for faster healing and superior precision.",
        icon: "laser",
      },
      {
        title: "Oral Infection Treatment",
        description:
          "Expert diagnosis and treatment of all types of oral infections and dental emergencies.",
        icon: "infection",
      },
    ],
  },
  {
    id: "skin",
    title: "Skin & Aesthetics",
    subtitle: "Clinical Cosmetology",
    description:
      "Luxurious skin treatments powered by medical-grade technology to reveal your most radiant, youthful self.",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z",
    gradient: "from-gold-400 to-gold-600",
    services: [
      {
        title: "PRP Treatment",
        description:
          "Platelet-Rich Plasma therapy harnessing your body's own healing power for skin rejuvenation and hair restoration.",
        icon: "prp",
      },
      {
        title: "Skin Whitening & Brightening",
        description:
          "Medical-grade skin lightening treatments for an even-toned, luminous complexion.",
        icon: "brightening",
      },
      {
        title: "Glutathione Therapy",
        description:
          "Advanced glutathione injections — the master antioxidant — for whole-body skin brightening from within.",
        icon: "glutathione",
      },
      {
        title: "Chemical Peels",
        description:
          "Customised chemical peel treatments for acne scars, pigmentation, fine lines, and overall skin renewal.",
        icon: "peel",
      },
      {
        title: "Under Eye Treatment",
        description:
          "Targeted treatments for dark circles, puffiness, and fine lines to restore a refreshed, youthful eye area.",
        icon: "undereye",
      },
      {
        title: "Pigmentation Treatment",
        description:
          "Advanced depigmentation protocols for melasma, dark spots, and uneven skin tone.",
        icon: "pigmentation",
      },
      {
        title: "Microdermabrasion & Needling",
        description:
          "Precision skin resurfacing for collagen stimulation, scar reduction, and pore refinement.",
        icon: "microderm",
      },
      {
        title: "BB Glow Facial",
        description:
          "Semi-permanent foundation treatment for a flawless, naturally glowing complexion.",
        icon: "bbglow",
      },
      {
        title: "Permanent Makeup",
        description:
          "Expert micropigmentation for defined brows, lip colour, and eyeliner that lasts beautifully.",
        icon: "makeup",
      },
      {
        title: "Wart & Mole Removal",
        description:
          "Safe, precise removal of warts, moles, and skin tags using advanced electrocautery and laser techniques.",
        icon: "removal",
      },
      {
        title: "Scar Removal",
        description:
          "Multi-modal scar treatment combining laser, microneedling, and peels for significantly smoother skin.",
        icon: "scar",
      },
    ],
  },
  {
    id: "hair",
    title: "Hair Restoration",
    subtitle: "Hair & Body Treatments",
    description:
      "Scientifically-backed hair and body treatments to restore confidence and reveal your best self.",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z",
    gradient: "from-burgundy-400 to-gold-500",
    services: [
      {
        title: "Laser Hair Removal",
        description:
          "FDA-approved laser technology for permanent hair reduction — smooth, hair-free skin with lasting results.",
        icon: "laserhair",
      },
      {
        title: "Hair Regrowth Treatment",
        description:
          "Comprehensive hair restoration combining PRP, mesotherapy, and advanced growth serums to combat hair loss.",
        icon: "regrowth",
      },
      {
        title: "Double Chin Removal",
        description:
          "Non-surgical fat dissolution for a sculpted, defined jawline without downtime.",
        icon: "doublechin",
      },
      {
        title: "Liposuction",
        description:
          "Targeted body contouring and fat removal for a slimmer, more refined silhouette.",
        icon: "lipo",
      },
    ],
  },
];

export const TESTIMONIALS = [
  {
    name: "Priya Mehta",
    treatment: "Smile Design",
    rating: 5,
    text: "Dr. Shivani completely transformed my smile. The attention to detail and the final result exceeded all my expectations. I finally feel confident smiling in photos.",
  },
  {
    name: "Rahul Kapoor",
    treatment: "Dental Implants",
    rating: 5,
    text: "After years of hesitation, I got implants done here. The entire process was painless and professional. Dr. Shivani's expertise is truly world-class.",
  },
  {
    name: "Ananya Sharma",
    treatment: "Skin Brightening & BB Glow",
    rating: 5,
    text: "My skin has never looked this radiant. The BB Glow facial combined with the brightening treatment gave me a natural, lit-from-within glow. Absolutely love this clinic.",
  },
  {
    name: "Vikram Reddy",
    treatment: "Hair Regrowth & PRP",
    rating: 5,
    text: "I was losing confidence along with my hair. The PRP sessions and Dr. Shivani's personalised treatment plan have shown remarkable results in just three months.",
  },
  {
    name: "Meera Joshi",
    treatment: "Braces & Teeth Whitening",
    rating: 5,
    text: "From the first consultation to the final result — pure luxury experience. The ceramic braces were so discreet, and the whitening made my teeth brilliantly white.",
  },
  {
    name: "Amit Verma",
    treatment: "Root Canal Treatment",
    rating: 5,
    text: "I was terrified of RCT but Dr. Shivani made it completely painless. Her gentle approach and advanced equipment made the experience surprisingly comfortable.",
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Prescription", href: "/prescription" },
  { label: "Contact", href: "/contact" },
] as const;
