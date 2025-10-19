import Address from "./../model/Address.js";

// Add Address : api/address/add
export const addAddress = async (req, res) => {
  try {
    const { address, userId } = req.body;
    await Address.create({ ...address, userId });
    return res.json({
      success: true,
      message: " Address updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};

// Get Address : api/address/get
export const getAddress = async (req, res) => {
  try {
    const { userId } = req.query;
    const addresses = await Address.find({ userId });
    return res.json({ success: true, addresses });
  } catch (error) {
    console.log(error.message);
    res.json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};
