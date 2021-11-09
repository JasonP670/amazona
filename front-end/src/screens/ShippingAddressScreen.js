import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import LoadingBox from "../components/LoadingBox";
import CustomizedDialogs from "../components/CustomizedDialogs";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import {
  saveShippingAddress,
  selectCart,
  selectShippingAddress,
} from "../slices/cartSlice";
import {
  createAddress,
  getAddresses,
  selectUserAddress,
  selectUserData,
} from "../slices/userSlice";
import RegistrationForm from "../components/RegistrationForm";
import { useHistory } from "react-router-dom";

export default function ShippingAddressScreen(props) {
  const userInfo = useSelector(selectUserData);
  const userAddresses = useSelector(selectUserAddress);
  const { cart } = useSelector(selectCart);
  if (!userInfo || cart.length === 0) {
    props.history.push("/signin");
  }
  const history = useHistory();
  const shippingAddress = useSelector(selectShippingAddress);
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [addressLine1, setAddressLine1] = useState(shippingAddress.address);
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const [selectedAddress, setSelectedAddress] = useState("");
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
    // localStorage.setItem(
    //   "shippingAddress",
    //   JSON.stringify({ fullName, address, city, postalCode, country })
    // );
    dispatch(saveShippingAddress(selectedAddress));
    props.history.push("/payment");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    console.log(fullName);
  };
  const handleSave = () => {
    // TODO dispatch save new address
    const token = userInfo.token;
    // dispatch(createAddress({ token, values }));

    dispatch(
      createAddress({
        token,
        fullName,
        addressLine1,
        addressLine2,
        city,
        postalCode,
        country,
      })
    );
    setOpen(false);
    history.go(0);
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
                  <input
                    type="radio"
                    id={userAddress.id}
                    name="shippingAddress"
                    value={userAddress.id}
                    onChange={(e) => setSelectedAddress(e.target.value)}
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
          </div>
        </div>
        <div>
          <label></label>
          <button
            className="primary block"
            type="submit"
            onClick={submitHandler}
          >
            Continue
          </button>
        </div>
      </form>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle sx={{ fontSize: "2.5rem", ml: 3 }}>
          Add a new address
        </DialogTitle>

        <DialogContent className="address-dialog" sx={{ p: 5 }}>
          <TextField
            autoFocus
            required
            label="Full Name"
            margin="dense"
            type="text"
            fullWidth
            variant="standard"
            size="large"
            InputProps={{ style: { fontSize: "1.8rem" } }}
            InputLabelProps={{ sx: { fontSize: "1.5rem" } }}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextField
            required
            label="Address Line 1"
            margin="dense"
            type="text"
            fullWidth
            variant="standard"
            InputProps={{ style: { fontSize: "1.8rem" } }}
            InputLabelProps={{ sx: { fontSize: "1.5rem" } }}
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
          />
          <TextField
            label="Address Line 2"
            margin="dense"
            type="text"
            fullWidth
            InputProps={{ style: { fontSize: "1.8rem" } }}
            InputLabelProps={{ sx: { fontSize: "1.5rem" } }}
            variant="standard"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
          />
          <TextField
            required
            label="City"
            margin="dense"
            type="text"
            fullWidth
            InputProps={{ style: { fontSize: "1.8rem" } }}
            InputLabelProps={{ sx: { fontSize: "1.5rem" } }}
            variant="standard"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            required
            label="Postal Code"
            margin="dense"
            type="text"
            fullWidth
            InputProps={{ style: { fontSize: "1.8rem" } }}
            InputLabelProps={{ sx: { fontSize: "1.5rem" } }}
            variant="standard"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <TextField
            required
            label="Country"
            margin="dense"
            type="text"
            fullWidth
            InputProps={{ style: { fontSize: "1.8rem" } }}
            InputLabelProps={{ sx: { fontSize: "1.5rem" } }}
            variant="standard"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </DialogContent>
        <div className="row center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            Save
          </Button>
          <DialogActions className="DialogActions" onClick={handleClose}>
            Cancel
          </DialogActions>
          <DialogActions className="DialogActions" onClick={handleSave}>
            Save
          </DialogActions>
        </div>
      </Dialog>

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
