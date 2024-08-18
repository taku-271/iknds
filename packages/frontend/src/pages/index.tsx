import { usePlaceList } from "@/features/placeList/store";
import { User } from "@/graphql/graphql";
import {
  Box,
  Button,
  Dialog,
  Heading,
  Label,
  Link,
  Loading,
  Reorder,
  ReorderItem,
  useDisclosure,
} from "@yamada-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Index = () => {
  const { placeList, placeListLoading } = usePlaceList(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPlace, setSelectedPlace] = useState<User["places"][0] | null>(
    null
  );
  const { data: session, status } = useSession();

  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
    >
      {placeListLoading && status === "loading" ? (
        <Loading size="9xl" color="blue.500" variant="puff" />
      ) : (
        <Box>
          <Heading padding="lg">
            {session?.user?.name} さんの行きたいところリスト
          </Heading>
          <Reorder padding="lg">
            {placeList?.places.map((place) => (
              <ReorderItem
                value={place?.id}
                onClick={() => {
                  setSelectedPlace(place);
                  return onOpen();
                }}
                key={place?.id}
              >
                {place?.title}
              </ReorderItem>
            ))}
          </Reorder>
        </Box>
      )}
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        header={selectedPlace?.title}
        cancel="閉じる"
        onCancel={onClose}
      >
        <Heading as="h2" fontSize="2xl">
          メモ
        </Heading>
        <Box>{selectedPlace?.memo}</Box>
        <Heading as="h2" fontSize="2xl">
          URL
        </Heading>
        <Box>
          <Link href={selectedPlace?.url} target="_blank">
            {selectedPlace?.url}
          </Link>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Index;
