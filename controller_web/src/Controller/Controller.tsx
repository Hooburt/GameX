import {
  Stack,
  LoadingOverlay,
  Group,
  ActionIcon,
  TextInput,
  Grid,
  Button,
  SegmentedControl,
  Center,
  Title,
} from "@mantine/core";
import {
  IconSettings,
  IconMinimize,
  IconMaximize,
  IconBolt,
  IconBulb,
  IconChevronLeft,
} from "@tabler/icons-react";
import { ReadyState } from "react-use-websocket";
import { ThemedJoystick } from "../Components/ThemedJoystick";
import { ThemedShadow } from "../Components/ThemedShadow";
import { ThemeIndicator } from "../Components/ThemeIndicator";
import { useFullscreen } from "@mantine/hooks";
import { useGameSocket } from "../WebsocketLogic";
import { LoaderContent } from "./Loader";

const THROTTLE = 100; // ms for debounce

interface Props {
  setMenu: () => void;
}

export const Controller = ({ setMenu }: Props) => {
  const { toggle, fullscreen } = useFullscreen();
  const { readyState } = useGameSocket();

  return (
    <Stack
      h="100vh"
      justify="stretch"
      p="0"
      m="0"
      style={{
        overflow: "hidden",
      }}
      pos="relative"
    >
      <LoadingOverlay
        visible={readyState != ReadyState.OPEN}
        loaderProps={{ children: <LoaderContent setMenu={setMenu} /> }}
      />
      <ThemedShadow />
      <Group wrap="nowrap" p="xs" pb="0">
        <ActionIcon variant="subtle" onClick={setMenu}>
          <IconChevronLeft />
        </ActionIcon>
        <ActionIcon variant="subtle">
          <IconSettings />
        </ActionIcon>
        <ActionIcon onClick={toggle} variant="light">
          {fullscreen ? <IconMinimize /> : <IconMaximize />}
        </ActionIcon>
        <TextInput w="100%" placeholder="display name" />
        <ActionIcon variant="subtle">
          <ThemeIndicator />
        </ActionIcon>
      </Group>
      <Grid
        justify="flex-start"
        align="stretch"
        h="100%"
        styles={{
          inner: {
            height: "100%",
          },
        }}
      >
        <Grid.Col span={3} h="100%">
          <Stack h="100%" justify="space-around" align="center" py="md">
            <Button leftSection={<IconBolt />} variant="light">
              Super
            </Button>
            <ThemedJoystick size={100} sticky={false} />
          </Stack>
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack h="100%">
            <SegmentedControl fullWidth data={["Inventory", "Map", "Stats"]} />
            <Center w="100%" h="100%" bg="blue.1" opacity={0.1}>
              <Title> TODO</Title>
            </Center>
          </Stack>
        </Grid.Col>
        <Grid.Col span={3}>
          <Stack h="100%" justify="space-around" align="center" py="md">
            <Button
              leftSection={<IconBulb />}
              variant="subtle"
              onClick={() => {
                const msg = {
                  t: "light",
                };
                // sendMessage(JSON.stringify(msg));
                console.log(msg);
              }}
            >
              Light
            </Button>
            <ThemedJoystick
              size={100}
              stop={() => {
                const msg = {
                  t: "move",
                  x: 0.0,
                  y: 0.0,
                };
                // sendMessage(JSON.stringify(msg));
                console.log(msg);
              }}
              throttle={THROTTLE}
              sticky={false}
              move={(data) => {
                const msg = {
                  t: "move",
                  x: data.x,
                  y: data.y,
                };
                // sendMessage(JSON.stringify(msg));
                console.log(msg);
              }}
            />
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};