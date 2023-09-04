import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "../../assets/components/MKBox";
import MKTypography from "../../assets/components/MKTypography";
import MKInput from "../../assets/components/MKInput";
import MKButton from "../../assets/components/MKButton";

// Material Kit 2 React example components
// import DefaultNavbar from "../../assets/examples/Navbars/DefaultNavbar";
import SimpleFooter from "../../assets/examples/Footers/SimpleFooter";

// Material Kit 2 React page layout routes
// import routes from "routes";

// Images
import bgImage from "../../assets/images/bg-sign-in-basic.jpg";

export default function SignIn() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSignIn = () => {
    // TODO: Handle Sign In
    fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to sign in");
        }
      })
      .then((data) => {
        console.log("Success:", data);
        const user_id = data.user_id;
        //const token = data.token;
        // Redirect to home page or perform other actions here
        navigate(`/wallet/dashboard?user_id=${user_id}`);
      })
      .catch((error) => {
        console.log("Error:", error);
        // Handle errors here, e.g., display an error message to the user
      });
  };

  const handleEmailInput = (event) => {
    setEmailInput(event.target.value);
  };

  const handlePasswordInput = (event) => {
    setPasswordInput(event.target.value);
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
                  Sign In
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">
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
                  <MKBox display="flex" alignItems="center" ml={-1}>
                    <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                    <MKTypography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                      onClick={handleSetRememberMe}
                      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                      &nbsp;&nbsp;Remember me
                    </MKTypography>
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton variant="gradient" color="primary" fullWidth onClick={handleSignIn}>
                      sign in
                    </MKButton>
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      Don&apos;t have an account?{" "}
                      <MKTypography
                        component={Link}
                        to="/authentication/signup"
                        variant="button"
                        color="primary"
                        fontWeight="medium"
                        textGradient
                      >
                        Sign up
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
