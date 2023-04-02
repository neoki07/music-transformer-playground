import { MainLayout } from "../components/Layout";
import { UnconditionalGenerate } from "../components/UnconditionalGenerate";
import { Center, Container, Stack, Title } from "@mantine/core";

export default function Home(): JSX.Element {
  return (
    <MainLayout title="Music Transformer Playground">
      <Container py={80}>
        <Stack spacing={32}>
          <Center>
            <Title size={48} weight={800}>
              Music Transformer Playground
            </Title>
          </Center>
          <UnconditionalGenerate apiUrl={import.meta.env.VITE_API_URL} />
        </Stack>
      </Container>
    </MainLayout>
  );
}
