import express from "express";
import Employee from "../models/Employee.js";

const router = express.Router();

// 📌 Rota para listar todos os funcionários
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Rota para cadastrar um novo funcionário
router.post("/", async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 📌 Rota para buscar um funcionário por ID
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Funcionário não encontrado" });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Rota para atualizar um funcionário
router.put("/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEmployee)
      return res.status(404).json({ message: "Funcionário não encontrado" });
    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Rota para deletar um funcionário
router.delete("/:id", async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee)
      return res.status(404).json({ message: "Funcionário não encontrado" });
    res.json({ message: "Funcionário removido com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
