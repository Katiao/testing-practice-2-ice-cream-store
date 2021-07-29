import Alert from "react-bootstrap/Alert";

export default function AlertBanner({ message, variant }) {
  //if message is truthy message will show otherwise default text:
  const alertMessage =
    message || "An unexpected error occured. Please try again later.";

  const alertVariant = variant || "danger";

  return (
    <Alert variant={alertVariant} style={{ backgroundColor: "red" }}>
      {alertMessage}
    </Alert>
  );
}
