import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  company: { type: String, required: true },
  name: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  status: { type: Boolean, default: true },
  birth: { type: Date, required: true },
  rg: { type: String, required: true },
  pis: { type: String, required: true },
  address: { type: String, required: true },
  cep: { type: String, required: true },
});

export default mongoose.model("Employee", EmployeeSchema);
