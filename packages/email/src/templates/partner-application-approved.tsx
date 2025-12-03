import { useTranslations } from "next-intl";
import { DUB_WORDMARK } from "@dub/utils";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { ReactNode } from "react";
import { Footer } from "../components/footer";

export default function PartnerApplicationApproved({
  program = {
    name: "Acme",
    logo: DUB_WORDMARK,
    slug: "acme",
  },
  partner = {
    name: "John Doe",
    email: "panic@thedis.co",
    payoutsEnabled: false,
  },
  rewardDescription = "Earn 30% for each sale for 12 months.",
}: {
  program: {
    name: string;
    logo: string | null;
    slug: string;
  };
  partner: {
    name: string;
    email: string;
    payoutsEnabled: boolean;
  };
  rewardDescription: ReactNode;
}) {
const t = useTranslations("partner-application-approved-email");

  return (
    <Html>
      <Head />
      <Preview>{t('preview.application-approved', { "programName": program.name })}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[600px] rounded border border-solid border-neutral-200 px-10 py-5">
            <Section className="mt-8">
              <Img
                src={program.logo || "https://assets.dub.co/logo.png"}
                height="32"
                alt={program.name}
              />
            </Section>

            <Heading className="mx-0 my-7 p-0 text-lg font-medium text-black">{t('headings.congratulations', { "partnerName": partner.name })}</Heading>

            <Text className="text-sm leading-6 text-neutral-600">
              {t.rich('messages.application-approved-description', {
                programName: program.name,
                component0: (chunks) => <strong>{chunks}</strong>
              })}
            </Text>

            <Text className="text-sm leading-6 text-neutral-900">
              {rewardDescription}
            </Text>

            <Hr className="my-6 border-neutral-200" />

            <Heading className="mx-0 mb-2 p-0 text-base font-medium text-black">{t('headings.getting-started')}</Heading>

            <Text className="ml-1 text-sm leading-5 text-black">{t.rich('instructions.find-referral-links', {
      component0: (chunks) => <Link
                href={`https://partners.dub.co/programs/${program.slug}/links`}
                className="font-semibold text-black underline"
              >{chunks}</Link>
    })}
              </Text>

            <Text className="ml-1 text-sm leading-5 text-black">{t('instructions.share-referral-links')}</Text>

            <Text className="ml-1 text-sm leading-5 text-black">{t.rich('instructions.track-performance-earnings', {
      component0: (chunks) => <Link
                href={`https://partners.dub.co/programs/${program.slug}`}
                className="font-semibold text-black underline"
              >{chunks}</Link>,
      component1: (chunks) => <Link
                href={`https://partners.dub.co/programs/${program.slug}/earnings`}
                className="font-semibold text-black underline"
              >{chunks}</Link>
    })}
              
              </Text>

            <Text className="ml-1 text-sm leading-5 text-black">{t.rich('instructions.learn-dashboard-navigation', {
      component0: (chunks) => <Link
                href="https://dub.co/help/article/navigating-partner-program"
                className="font-semibold text-black underline"
              >{chunks}</Link>
    })}
              </Text>

            {!partner.payoutsEnabled && (
              <Text className="ml-1 text-sm leading-5 text-black">{t.rich('instructions.connect-stripe-payouts', {
      component0: (chunks) => <Link
                  href="https://dub.co/help/article/receiving-payouts"
                  className="font-semibold text-black underline"
                >{chunks}</Link>
    })}
                </Text>
            )}

            <Hr className="my-6 border-neutral-200" />

            <Section className="mb-8 mt-8">
              <Link
                className="rounded-lg bg-neutral-900 px-6 py-3 text-[13px] font-semibold text-white no-underline"
                href={`https://partners.dub.co/programs/${program.slug}`}
              >{t('buttons.go-to-dashboard')}</Link>
            </Section>

            <Text className="text-sm leading-6 text-neutral-600">
              {t.rich('messages.support-contact', {
                programName: program.name,
                component0: (chunks) => <Link
                  href={`https://partners.dub.co/messages/${program.slug}`}
                  className="font-semibold text-neutral-700 underline underline-offset-2"
                >{chunks}</Link>
              })}
            </Text>
              </Text>

            <Text className="text-sm leading-6 text-neutral-600">{t('messages.excited-partnership')}</Text>

            <Footer
              email={partner.email}
              notificationSettingsUrl="https://partners.dub.co/settings/notifications"
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
