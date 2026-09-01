interface MetadataInput {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: string;
}

interface StructuredDataInput {
  type: string;
  name: string;
  description?: string;
  url?: string;
  address?: string;
  telephone?: string;
}

export function generateMetadata(input: MetadataInput) {
  const siteName = 'Hospital Management System';
  const baseTitle = input.title ? `${input.title} | ${siteName}` : siteName;
  const baseDescription = input.description || 'Hospital Management System';
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://hospital.example.com';
  const url = input.path ? `${baseUrl}${input.path}` : baseUrl;

  return {
    title: baseTitle,
    description: baseDescription,
    openGraph: {
      title: baseTitle,
      description: baseDescription,
      url,
      siteName,
      type: input.type || 'website',
      ...(input.image && { images: [{ url: input.image, alt: input.title }] }),
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: baseTitle,
      description: baseDescription,
      ...(input.image && { images: [input.image] }),
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateStructuredData(input: StructuredDataInput) {
  return {
    '@context': 'https://schema.org',
    '@type': input.type,
    name: input.name,
    ...(input.description && { description: input.description }),
    ...(input.url && { url: input.url }),
    ...(input.address && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: input.address,
      },
    }),
    ...(input.telephone && { telephone: input.telephone }),
  };
}
