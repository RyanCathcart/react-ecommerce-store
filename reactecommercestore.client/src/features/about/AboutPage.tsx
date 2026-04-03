import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, Typography } from "@mui/material";
import { useState } from "react";
import { useLazyGet400ErrorQuery, useLazyGet401ErrorQuery, useLazyGet404ErrorQuery, useLazyGet500ErrorQuery, useLazyGetValidationErrorQuery } from "./errorApi";

export default function AboutPage() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const [trigger400Error] = useLazyGet400ErrorQuery();
  const [trigger401Error] = useLazyGet401ErrorQuery();
  const [trigger404Error] = useLazyGet404ErrorQuery();
  const [trigger500Error] = useLazyGet500ErrorQuery();
  const [triggerValidationError] = useLazyGetValidationErrorQuery();

  const getValidationError = async () => {
    try {
      await triggerValidationError().unwrap();
    } catch (error: unknown) {
      if (error && typeof error === "object" && "message" in error              // Check if error is not null, check if error is an object, check if the property "message" exists in error
          && typeof (error as { message: unknown; }).message === "string") {    // Check if error.message is a string
        const errorArray = (error as { message: string }).message.split(", ");
        setValidationErrors(errorArray);
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography gutterBottom variant="h3">Errors for testing</Typography>
      <ButtonGroup fullWidth>
        <Button variant="contained" onClick={() =>
            trigger400Error().catch(error => console.log(error))
        }>
          Test 400 Error
        </Button>
        <Button variant="contained" onClick={() =>
            trigger401Error().catch(error => console.log(error))
        }>
          Test 401 Error
        </Button>
        <Button variant="contained" onClick={() =>
            trigger404Error().catch(error => console.log(error))
        }>
          Test 404 Error
        </Button>
        <Button variant="contained" onClick={() =>
            trigger500Error().catch(error => console.log(error))
        }>
          Test 500 Error
        </Button>
        <Button variant="contained" onClick={getValidationError}>
          Test Validation Error
        </Button>
      </ButtonGroup>
      {validationErrors.length > 0 && (
        <Alert severity="error">
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map((error) => (
              <ListItem key={error}>{ error }</ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  );
}
