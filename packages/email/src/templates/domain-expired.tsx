import { useTranslations } from "next-intl";
import { DUB_WORDMARK, formatDate, pluralize } from "@dub/utils";
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { Footer } from "../components/footer";

export default function DomainExpired({
  email = "panic@thedis.co",
  workspace = {
    name: "Acme, Inc",
    slug: "acme",
  },
  domains = [
    {
      slug: "getacme.link",
      expiresAt: new Date("2025-07-29"),
    },
    {
      slug: "example.link",
      expiresAt: new Date("2025-07-29"),
    },
  ],
}: {
  email: string;
  workspace: {
    name: string;
    slug: string;
  };
  domains: {
    slug: string;
    expiresAt: Date;
  }[];
}) {
const t = useTranslations("domain-expired-email");

  return (
    <Html>
      <Head />
      <Preview>{t('preview.text')}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[600px] px-5 py-5">
            <Section className="mt-8">
              <Img src={DUB_WORDMARK} height="32" alt={t('brand.name')} />
            </Section>

            <Heading className="mx-0 mb-5 mt-10 p-0 text-lg font-semibold text-neutral-800">{t('headings.main-title')}</Heading>

            <Text className="text-sm leading-6 text-neutral-600">{t('messages.expiration-intro')}{pluralize("domain", domains.length)}{t.rich('messages.expiration-details', {
      component0: (chunks) => <span className="font-semibold text-black">{workspace.name}</span>
    })}
              </Text>

            <Section>
              <Row className="pb-2">
                <Column align="left" className="text-sm text-neutral-500">{t('table.headers.domain')}</Column>
                <Column align="right" className="text-sm text-neutral-500">{t('table.headers.expired-date')}</Column>
              </Row>

              {domains.map((domain, index) => (
                <div key={index}>
                  <Row>
                    <Column align="left" className="text-sm font-medium">
                      <Link
                        href={`https://${domain.slug}`}
                        className="font-semibold text-black underline"
                      >
                        {domain.slug}
                      </Link>
                    </Column>
                    <Column
                      align="right"
                      className="text-sm text-neutral-600"
                      suppressHydrationWarning
                    >
                      {formatDate(domain.expiresAt)}
                    </Column>
                  </Row>

                  {index !== domains.length - 1 && (
                    <div className="my-2 w-full" />
                  )}
                </div>
              ))}
            </Section>

            <Text className="text-sm leading-6 text-neutral-600">{t('messages.recovery-intro')}{pluralize("domain", domains.length)}{t.rich('messages.recovery-instructions', {
      component0: (chunks) => <Link
                href={`https://app.dub.co/${workspace.slug}/links/domains`}
                className="font-semibold text-black underline"
              >{chunks}</Link>
    })}
              </Text>

            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
