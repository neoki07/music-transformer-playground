import { MainLayout } from "../components/Layout";
import { UnconditionalGenerate } from "../components/UnconditionalGenerate";
import { Center, Container, Stack, Title } from "@mantine/core";

export default function Home(): JSX.Element {
  console.log("test:", import.meta.env.VITE_API_URL);
  console.log("test2:", import.meta.env.API_URL);
  console.log("test3:", import.meta.env.VITE_TEST);
  console.log("test4:", import.meta.env.TEST);
  console.log("test4:", import.meta.env);
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
