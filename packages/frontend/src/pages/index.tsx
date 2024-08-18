import { useCreatePlaceMutation } from "@/features/placeList/mutation";
import { usePlaceList } from "@/features/placeList/store";
import { Place, PlaceInput, User } from "@/graphql/graphql";
import { QueryClient } from "@tanstack/react-query";
import {
  Box,
  Button,
  Dialog,
  FormControl,
  Heading,
  Input,
  Label,
  Link,
  Loading,
  Reorder,
  ReorderItem,
  Textarea,
  useDisclosure,
} from "@yamada-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { title } from "process";
import { FormEvent, useState } from "react";

const Index = () => {
  const { placeList, placeListLoading } = usePlaceList(1);
  const {
    isOpen: isOpenPlaceDetail,
    onOpen: onOpenPlaceDetail,
    onClose: onClosePlaceDetail,
  } = useDisclosure();
  const {
    isOpen: isOpenPlaceCreate,
    onOpen: onOpenPlaceCreate,
    onClose: onClosePlaceCreate,
  } = useDisclosure();
  const [selectedPlace, setSelectedPlace] = useState<User["places"][0]>(null);
  const initNewPlace = { title: "", url: "", memo: "", userId: -1 };
  const [newPlace, setNewPlace] = useState<PlaceInput>(initNewPlace);
  const { mutateAsync: createPlace } = useCreatePlaceMutation();
  const [isInValid, setIsInValid] = useState({ title: false, url: false });
  const { data: session, status } = useSession();

  const onPlaceChange = (
    e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>
  ) => {
    setNewPlace({
      ...newPlace,
      userId: 1,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const onPlaceCreate = () => {
    const isInvalid = { title: false, url: false };

    if (newPlace?.title === "") {
      isInvalid.title = true;
    }
    if (newPlace?.url === "") {
      isInvalid.url = true;
    }
    if (!isInvalid.title && !isInvalid.url) {
      createPlace(newPlace);
      setNewPlace(initNewPlace);
      onClosePlaceCreate();
    }

    setIsInValid(isInvalid);
  };

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
        <Box display="flex" flexDir="column" alignItems="center" height="100%">
          <Heading padding="lg">
            {session?.user?.name} さんの行きたいところリスト
          </Heading>
          <Button
            onClick={onOpenPlaceCreate}
            colorScheme="primary"
            width="85%"
            padding="lg"
          >
            新規作成
          </Button>
          <Reorder padding="lg" layoutScroll>
            {placeList?.places.map((place) => (
              <ReorderItem
                value={place?.id}
                onClick={() => {
                  setSelectedPlace(place);
                  return onOpenPlaceDetail();
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
        isOpen={isOpenPlaceCreate}
        onClose={() => {
          setIsInValid({ title: false, url: false });
          onClosePlaceCreate();
        }}
        header="新規作成"
        success="新規作成"
        onSuccess={onPlaceCreate}
      >
        <FormControl
          label="タイトル"
          isInvalid={isInValid.title}
          errorMessage="タイトルを入力してください"
        >
          <Input
            type="text"
            placeholder="例) 映画館"
            name="title"
            onChange={(e) => onPlaceChange(e)}
          />
        </FormControl>
        <FormControl label="メモ">
          <Textarea
            placeholder="例) コナンを見る"
            name="memo"
            onChange={(e) => onPlaceChange(e)}
          />
        </FormControl>
        <FormControl
          label="リンク"
          isInvalid={isInValid.url}
          errorMessage="リンクを入力してください"
        >
          <Input
            type="url"
            placeholder="例) https://example.com"
            name="url"
            onChange={(e) => onPlaceChange(e)}
          />
        </FormControl>
      </Dialog>

      <Dialog
        isOpen={isOpenPlaceDetail}
        onClose={onClosePlaceDetail}
        header={selectedPlace?.title}
      >
        <Heading as="h2" fontSize="2xl">
          メモ
        </Heading>
        <Box>{selectedPlace?.memo}</Box>
        <Heading as="h2" fontSize="2xl">
          URL
        </Heading>
      </Dialog>
    </Box>
  );
};

export default Index;
