import * as billService from "../services/BillsService.js";

export const createBill = async (req, res, next) => {
  try {
    const bill = await billService.createBill(
      req.body,
      req.user._id,
      req.user.household
    );
    res.status(201).json({ status: "success", data: bill });
  } catch (error) {
    next(error);
  }
};

export const getBills = async (req, res, next) => {
  try {
    const bills = await billService.getBills(req.user.household);
    res.status(200).json({ status: "success", data: bills });
  } catch (error) {
    next(error);
  }
};

export const deleteBill = async (req, res, next) => {
  try {
    await billService.deleteBill(req.params.id);
    res.status(204).json({ status: "success", data: null });
  } catch (error) {
    next(error);
  }
};
export const updateBill = async (req, res, next) => {
  try {
    const bill = await billService.updateBill(req.params.id, req.body);
    res.status(200).json({ status: "success", data: bill });
  } catch (error) {
    next(error);
  }
};
