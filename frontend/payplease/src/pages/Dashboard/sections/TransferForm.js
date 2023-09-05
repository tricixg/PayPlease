// PropTypes
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";

// @mui icons
import { BackspaceRounded, SearchRounded } from "@mui/icons-material";

// Material Kit 2 React components
import MKBox from "../../../assets/components/MKBox";
import MKButton from "../../../assets/components/MKButton";
import MKInput from "../../../assets/components/MKInput";
import MKTypography from "../../../assets/components/MKTypography";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function TransferForm({
  amount,
  setAmount,
  factor,
  setFactor,
  recipient,
  setRecipient,
}) {
  TransferForm.propTypes = {
    amount: PropTypes.number.isRequired,
    setAmount: PropTypes.func.isRequired,
    factor: PropTypes.number.isRequired,
    setFactor: PropTypes.func.isRequired,
    recipient: PropTypes.string.isRequired,
    setRecipient: PropTypes.func.isRequired,
  };

  const handleNumberPadInput = (number) => {
    if (number === "BACKSPACE") {
      setAmount(Math.floor(amount / 10));
      setFactor(factor / 10);
    } else if (number === "CLEAR") {
      setAmount(0);
      setFactor(1);
    } else {
      setAmount(amount * 10 + number);
      setFactor(factor * 10);
    }
  };

  const handleRecipientInput = (event) => {
    setRecipient(event.target.value);
  };

  const makeNumberPadRow = (one, two, three) => {
    return (
      <Grid container item xs={12} py={1} flexDirection="row" alignItems="center" mx="auto">
        <Grid item xs={4} px={1}>
          <MKButton
            sx={{ width: "100%", border: 1, borderRadius: 2 }}
            onClick={() => handleNumberPadInput(one)}
          >
            {one}
          </MKButton>
        </Grid>
        <Grid item xs={4} px={1}>
          <MKButton
            sx={{ width: "100%", border: 1, borderRadius: 2 }}
            onClick={() => handleNumberPadInput(two)}
          >
            {two}
          </MKButton>
        </Grid>
        <Grid item xs={4} px={1}>
          <MKButton
            sx={{ width: "100%", border: 1, borderRadius: 2 }}
            onClick={() => handleNumberPadInput(three)}
          >
            {three}
          </MKButton>
        </Grid>
      </Grid>
    );
  };

  return (
    <MKBox component="section" py={2} px={8}>
      <Container>
        <Grid container item xs={12} lg={12} py={1} alignItems="center" mx="auto">
          <MKTypography variant="h5">Transfer Amount: ${numberWithCommas(amount)}</MKTypography>
        </Grid>
        <Grid
          container
          item
          xs={12}
          py={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          mx="auto"
        >
          {makeNumberPadRow(1, 2, 3)}
          {makeNumberPadRow(4, 5, 6)}
          {makeNumberPadRow(7, 8, 9)}
          {/* Number Pad final row */}
          <Grid container item xs={12} py={1} flexDirection="row" alignItems="center" mx="auto">
            <Grid item xs={4} px={1}>
              <MKButton
                sx={{ width: "100%", border: 1, borderRadius: 2 }}
                onClick={() => handleNumberPadInput("CLEAR")}
              >
                Clear
              </MKButton>
            </Grid>
            <Grid item xs={4} px={1}>
              <MKButton
                sx={{ width: "100%", border: 1, borderRadius: 2 }}
                onClick={() => handleNumberPadInput(0)}
              >
                0
              </MKButton>
            </Grid>
            <Grid item xs={4} px={1}>
              <MKButton
                sx={{ width: "100%", border: 1, borderRadius: 2 }}
                onClick={() => handleNumberPadInput("BACKSPACE")}
              >
                <BackspaceRounded />
              </MKButton>
            </Grid>
          </Grid>
          {/* To User */}
          <Grid container item xs={12} py={1} flexDirection="row" alignItems="center" mx="auto">
            <Grid item xs={12} pt={2} flexWrap={true}>
              <MKTypography variant="h5">To User: {recipient}</MKTypography>
            </Grid>
            <Grid item xs={12} p={1}>
              <MKInput
                variant="standard"
                placeholder="Search (TO IMPLEMENT)"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchRounded fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                onChange={handleRecipientInput}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}
