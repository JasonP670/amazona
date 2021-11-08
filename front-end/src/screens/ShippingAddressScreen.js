import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import LoadingBox from "../components/LoadingBox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  saveShippingAddress,
  selectCart,
  selectShippingAddress,
} from "../slices/cartSlice";
import {
  getAddresses,
  selectUserAddress,
  selectUserData,
} from "../slices/userSlice";

export default function ShippingAddressScreen(props) {
  const userInfo = useSelector(selectUserData);
  const userAddresses = useSelector(selectUserAddress);
  const { cart } = useSelector(selectCart);
  if (!userInfo || cart.length === 0) {
    props.history.push("/signin");
  }

  const shippingAddress = useSelector(selectShippingAddress);
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = userInfo.token;
    const userId = userInfo.id;
    dispatch(getAddresses({ token, userId }));
  }, [dispatch, userInfo.token, userInfo.id]);

  const submitHandler = (e) => {
    e.preventDefault();
    // TODO dispatch save shipping address
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({ fullName, address, city, postalCode, country })
    );
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    props.history.push("/payment");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    // TODO dispatch save new address
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>

      <form className="form">
        <div>
          <h1>Shipping Address</h1>
        </div>
        {userAddresses.length < 1 ? (
          <LoadingBox />
        ) : (
          <>
            {userAddresses.map((userAddress) => (
              <div key={userAddress.id} className="card card-body">
                <div className="row start">
                  {console.log(userAddress)}
                  <input
                    type="radio"
                    id={userAddress.id}
                    name="shippingAddress"
                    value={userAddress.id}
                    onChange={(e) => console.log(e.target.value)}
                  />
                  <label htmlFor={userAddress.id}>
                    <strong>{userAddress.full_name}</strong>,{" "}
                    {userAddress.address_line1}, {userAddress.city},{" "}
                    {userAddress.country}
                  </label>
                </div>
              </div>
            ))}
          </>
        )}

        <div className="card card-body">
          <div className="row start">
            <Button onClick={handleClickOpen} className="Button info">
              <i className="fas fa-plus"></i> Add a new address
            </Button>

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add a new address</DialogTitle>

              <DialogContent className="address-dialog">
                <TextField
                  autofocus
                  required
                  label="Full Name"
                  margin="dense"
                  type="text"
                  fullWidth
                  variant="outlined"
                  size="large"
                />
                <TextField
                  required
                  label="Address Line 1"
                  margin="dense"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  label="Address Line 2"
                  margin="dense"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  required
                  label="City"
                  margin="dense"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  required
                  label="Postal Code"
                  margin="dense"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  required
                  label="Country"
                  margin="dense"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
              </DialogContent>
              <div className="row center">
                <DialogActions className="DialogActions" onClick={handleClose}>
                  Cancel
                </DialogActions>
                <DialogActions className="DialogActions" onClick={handleSave}>
                  Save
                </DialogActions>
              </div>
            </Dialog>
          </div>
        </div>
      </form>

      {/* <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Open form dialog
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Subscribe</Button>
          </DialogActions>
        </Dialog>
      </div> */}

      {/* <form className="form" onSubmit={submitHandler}>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>

        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label></label>
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form> */}
    </div>
  );
}
