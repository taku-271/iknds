import { Box, Button, Heading, Label } from "@yamada-ui/react";

const Index = () => {
  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box>
        <Label>結婚してくれますか？</Label>
        <Box display="flex" height="5vh">
          <Button width="50%" background="blue" color="white" isRounded={true}>
            Yes
          </Button>
          <Button width="50%" color="white" background="red" isRounded={true}>
            はい
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
