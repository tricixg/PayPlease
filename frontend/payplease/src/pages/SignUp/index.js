import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKAlert from "../../assets/components/MKAlert";
import MKBox from "../../assets/components/MKBox";
import MKTypography from "../../assets/components/MKTypography";
import MKInput from "../../assets/components/MKInput";
import MKButton from "../../assets/components/MKButton";

// Material Kit 2 React example components
import SimpleFooter from "../../assets/examples/Footers/SimpleFooter";

// Images
import bgImage from "../../assets/images/bg-sign-in-basic.jpg";

export default function SignUp() {
  const [usernameInput, setUsernameInpput] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = () => {
    // TODO: Handle Sign In
    fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usernameInput,
        phone: phoneNumberInput,
        email: emailInput,
        password: passwordInput,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json(); // Parse the JSON response
        } else {
          throw new Error("Failed to sign up");
        }
      })
      .then((data) => {
        console.log("Success:", data);
        // Redirect to home page
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here, e.g., display an error message to the user
        setError(error.message);
        setTimeout(() => setError(null), 10000);
      });
  };

  const handleUsernameInput = (event) => {
    setUsernameInpput(event?.target?.value || "");
  };

  const handlePhoneNumberInput = (event) => {
    setPhoneNumberInput(event?.target?.value || "");
  };

  const handleEmailInput = (event) => {
    setEmailInput(event?.target?.value || "");
  };

  const handlePasswordInput = (event) => {
    setPasswordInput(event?.target?.value || "");
  };

  return (
    <>
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="primary"
                borderRadius="lg"
                coloredShadow="primary"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={4} mb={4}>
                  Sign Up
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">
                  <MKBox mb={2}>
                    <MKInput
                      type="username"
                      label="Username"
                      fullWidth
                      onChange={handleUsernameInput}
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="tel"
                      label="Phone Number"
                      fullWidth
                      onChange={handlePhoneNumberInput}
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput type="email" label="Email" fullWidth onChange={handleEmailInput} />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="password"
                      label="Password"
                      fullWidth
                      onChange={handlePasswordInput}
                    />
                  </MKBox>
                  {error && (
                    <MKBox mt={2}>
                      <MKAlert color="error">{error}</MKAlert>
                    </MKBox>
                  )}
                  <MKBox mt={4} mb={1}>
                    <MKButton variant="gradient" color="primary" fullWidth onClick={handleSignUp}>
                      sign up
                    </MKButton>
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      Already have an account?{" "}
                      <MKTypography
                        component={Link}
                        to="/authentication/signin"
                        variant="button"
                        color="primary"
                        fontWeight="medium"
                        textGradient
                      >
                        Sign In
                      </MKTypography>
                    </MKTypography>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter company={{ href: "/", name: "eigthkeh" }} light />
      </MKBox>
    </>
  );
}
