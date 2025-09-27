import { useTranslations } from "next-intl";
import AddEditIntegrationForm from "@/ui/oauth-apps/add-edit-integration-form";
import { BackLink } from "@/ui/shared/back-link";
import { MaxWidthWrapper } from "@dub/ui";
import { redirect } from "next/navigation";

export default function NewIntegrationsPage({
  params,
}: {
  params: { slug: string };
}) {
const t = useTranslations("new-integration-page");

  // this is only available for Dub workspace for now
  // we might open this up to other workspaces in the future
  if (params.slug !== "dub") {
    redirect(`/${params.slug}/settings/integrations`);
  }
  return (
    <MaxWidthWrapper className="grid max-w-screen-lg gap-8">
      <BackLink href={`/${params.slug}/settings/integrations`}>{t('navigation.back-to-integrations')}</BackLink>

      <AddEditIntegrationForm
        integration={{
          name: "",
          slug: "",
          description: "",
          readme: "",
          developer: "",
          website: "",
          logo: null,
          projectId: "",
          screenshots: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        }}
      />
    </MaxWidthWrapper>
  );
}
