const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Datos en memoria
let tickets = [];
let technicians = [];

// =============================
// GESTIÓN TÉCNICOS
// =============================

app.post("/technicians", (req, res) => {
  const newTech = {
    id: technicians.length + 1,
    name: req.body.name,
    available: true
  };

  technicians.push(newTech);
  res.json(newTech);
});

app.get("/technicians", (req, res) => {
  res.json(technicians);
});

// =============================
// GESTIÓN INCIDENTES
// =============================

app.post("/tickets", (req, res) => {
  const newTicket = {
    id: tickets.length + 1,
    description: req.body.description,
    status: "OPEN",
    technician: null
  };

  tickets.push(newTicket);
  res.json(newTicket);
});

app.post("/tickets/:id/assign", (req, res) => {
  const ticket = tickets.find(t => t.id == req.params.id);
  const tech = technicians.find(t => t.id == req.body.technicianId);

  if (!ticket || !tech) {
    return res.status(404).json({ message: "No encontrado" });
  }

  ticket.technician = tech.name;
  ticket.status = "ASSIGNED";
  tech.available = false;

  res.json(ticket);
});

app.get("/tickets", (req, res) => {
  res.json(tickets);
});

app.listen(6000, () => {
  --console.log("MSP Support System corriendo en puerto 6000");
  console.log("CI funcionando correctamente");
});