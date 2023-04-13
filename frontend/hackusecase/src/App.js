import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid,
  Typography,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to bottom, #fff, #fabb07)',
  },
  form: {
    border: '1px solid #ccc',
    padding: theme.spacing(4),
    backgroundColor: '#ffffff', // update foreground color here
    borderRadius: theme.spacing(1),
    maxWidth: 400,
    width: '100%',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)', // add box shadow
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  inputLabel: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  success: {
    backgroundColor: '#4caf50 !important',
  },
  error: {
    backgroundColor: '#f44336 !important',
  },
}));


const ClaimForm = () => {
  const classes = useStyles();

  const maxPolicyAmount = {
    Telephone: 1000,
    Internet: 1000,
    Medical: 5000,
    Travel: 25000,
  };

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [receiptDate, setReceiptDate] = useState("");
  const [claimAmount, setClaimAmount] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
  
    if (name === "category") {
      setCategory(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "claimAmount") {
      setClaimAmount(value);
    } else if (name === "receiptDate") {
      setReceiptDate(value);
    }
    
  };

  const today = new Date().toISOString().slice(0, 10); // get current date in ISO format

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!category || !description || !receiptDate || !claimAmount) {
      setErrorMessage("All fields are mandatory");
      setSuccessMessage("");
      setSnackbarOpen(true);
      return;
    }

    if (description.length > 200) {
      setErrorMessage("Description cannot exceed 200 characters");
      setSuccessMessage("");
      setSnackbarOpen(true);
      return;
    }

    const receiptDateObj = new Date(receiptDate);
    const submissionDateObj = new Date();

    const timeDiff = Math.abs(
      submissionDateObj.getTime() - receiptDateObj.getTime()
    );
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (diffDays > 30) {
      setErrorMessage(
        "Difference between the Receipt date and submission date should not be more than 30 days"
      );
      setSuccessMessage("");
      setSnackbarOpen(true);
      return;
    }

    const maxAmount = maxPolicyAmount[category];

    if (claimAmount > maxAmount) {
      setErrorMessage(
        `Claim amount should not be greater than max policy amount for ${category} category`
      );
      setSuccessMessage("");
      setSnackbarOpen(true);
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setSuccessMessage("Successfully submitted");
      setErrorMessage("");
      setSnackbarOpen(true);
      setIsSubmitting(false);
      setShowForm(false);
      setTimeout(() => setShowForm(true), 2000);
      setCategory("");
      setDescription("");
      setReceiptDate("");
      setClaimAmount("");
    }, 2000);
  };

  const handleReset = () => {
    setCategory("");
    setDescription("");
    setReceiptDate("");
    setClaimAmount("");
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={handleSubmit}>
    <Grid container spacing={4}>
    <Grid item xs={12}>
    <Typography variant="h5">Claim Form</Typography>
    </Grid>
    <Grid item xs={12}>
    <FormControl className={classes.formControl}>
    <InputLabel
               className={classes.inputLabel}
               id="category-label"
             >
    Category
    </InputLabel>
    <Select
               labelId="category-label"
               id="category"
               name="category"
               value={category}
               onChange={handleInputChange}
             >
    <MenuItem value="Telephone">Telephone</MenuItem>
    <MenuItem value="Internet">Internet</MenuItem>
    <MenuItem value="Medical">Medical</MenuItem>
    <MenuItem value="Travel">Travel</MenuItem>
    </Select>
    </FormControl>
    </Grid>
    <Grid item xs={12}>
    <TextField
            id="description"
            name="description"
            label="Description"
            multiline
            maxRows={3}
            value={description}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
    </Grid>
    <Grid item xs={12}>
    <TextField
      id="receipt-date"
      name="receiptDate"
      label="Receipt Date"
      type="date"
      InputLabelProps={{
        shrink: true,
      }}
      fullWidth
      value={receiptDate}
      onChange={handleInputChange}
      inputProps={{
        max: today, // set max date to current date
      }}
    />
    </Grid>
    <Grid item xs={12}>
    <TextField
             id="claim-amount"
             name="claimAmount"
             label="Claim Amount"
             type="number"
             fullWidth
             value={claimAmount}
             onChange={handleInputChange}
             inputProps={{ step: 0.01 }}
           />
    </Grid>
    <Grid item xs={12}>
      <Button variant="contained" color="primary" type="submit" disabled={submitted} >
        Submit
      </Button>{" "}
      <Button variant="contained" color="secondary" onClick={handleReset}>
        Reset
      </Button>
    </Grid>
    </Grid>
    <Snackbar
    anchorOrigin={{
    vertical: "bottom",
    horizontal: "left",
    }}
    open={snackbarOpen}
    autoHideDuration={5000}
    onClose={handleSnackbarClose}
    message={successMessage || errorMessage}
    action={
    <IconButton
             size="small"
             aria-label="close"
             color="inherit"
             onClick={handleSnackbarClose}
           >
    <Close fontSize="small" />
    </IconButton>
    }
    className={successMessage ? classes.success : classes.error}
    />
       </form>
    </div>
  );
};
    
    export default ClaimForm;
