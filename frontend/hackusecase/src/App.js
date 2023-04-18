import React, { Component } from "react";
import "./css/ClaimForm.css";
import logo from "./incedo-logo.png";

class ClaimForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
      description: "",
      receiptDate: "",
      claimAmount: "",
      successMessage: "",
      errorMessage: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  
    const maxPolicyAmount = {
      Telephone: 1000,
      Internet: 1000,
      Medical: 5000,
      Travel: 25000,
    };
  
    const { category, description, receiptDate, claimAmount } = this.state;
  
    if (!category || !description || !receiptDate || !claimAmount) {
      this.setState({
        errorMessage: "All fields are mandatory.",
        successMessage: "",
      });
      return;
    }
  
    const receiptDateObj = new Date(receiptDate);
    const submissionDateObj = new Date();
  
    const timeDiff = Math.abs(
      submissionDateObj.getTime() - receiptDateObj.getTime()
    );
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
    if (diffDays > 30) {
      this.setState({
        errorMessage:
          "Difference between the Receipt date and submission date should not be more than 30 days.",
        successMessage: "",
      });
      return;
    }
  
    const maxAmount = maxPolicyAmount[category];
  
    if (claimAmount > maxAmount) {
      this.setState({
        errorMessage: `Claim amount should not be greater than max policy amount for ${category} category.`,
        successMessage: "",
      });
      return;
    }
  
    this.setState({
      successMessage: "Successfully submitted",
      errorMessage: "",
    });
  
    setTimeout(() => {
      this.handleReset();
    }, 7000);
  }
  

  handleReset() {
    this.setState({
      category: "",
      description: "",
      receiptDate: "",
      claimAmount: "",
      successMessage: "",
      errorMessage: "",
    });
  }

  render() {
    const {
      category,
      description,
      receiptDate,
      claimAmount,
      successMessage,
      errorMessage,
    } = this.state;

    return (
      <div>
      <header className="claim-form-header">
      <img src={logo} alt="My Insurance Company" className="logo" />
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/claims">Claims</a></li>
              <li><a href="/about">About Us</a></li>
            </ul>
          </nav>
      </header>
      <div className="claim-form-container">
        <form onSubmit={this.handleSubmit}>
          <h1>Claim Form</h1>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              value={category}
              onChange={this.handleInputChange}
            >
              <option value="">Select a category</option>
              <option value="Telephone">Telephone</option>
              <option value="Internet">Internet</option>
              <option value="Medical">Medical</option>
              <option value="Travel">Travel</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Claim Description</label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="5"
              maxLength="200"
              value={description}
              onChange={this.handleInputChange}
                      className="form-control"
          placeholder="Enter claim description (max 200 characters)"
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="receiptDate">Receipt Date</label>
        <input
          type="date"
          name="receiptDate"
          id="receiptDate"
          value={receiptDate}
          onChange={this.handleInputChange}
          className="form-control"
          max={new Date().toISOString().split("T")[0]}
        />
      </div>
      <div className="form-group">
        <label htmlFor="claimAmount">Claim Amount</label>
        <div className="input-group">
          <span className="input-group-addon">
            <select name="currency" className="form-select">
              <option value="INR">&#8377;</option>
              <option value="USD">$</option>
              <option value="EUR">&#8364;</option>
              <option value="GBP">&#163;</option>
            </select>
          </span>
          <input
            type="number"
            step="0.01"
            min="0"
            name="claimAmount"
            id="claimAmount"
            value={claimAmount}
            onChange={this.handleInputChange}
            className="form-control"
            placeholder="Enter claim amount"
          />
        </div>
      </div>

      <div className="form-group" style={{ textAlign: "center" }}>
        <button type="submit" className="btn btn-primary">Submit</button>
        <button type="button" onClick={this.handleReset} className="btn btn-secondary">
          Reset
        </button>
      </div>
    </form>
  </div>
  <footer>
  <p>Copyright © chatGPT Hackathon</p>
</footer>
  </div>
);
}
}

export default ClaimForm;    
