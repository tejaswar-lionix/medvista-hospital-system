import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Hash passwords
  const adminPassword = await bcrypt.hash("admin123", 10);
  const userPassword = await bcrypt.hash("password123", 10);

  // Create admin user
  console.log("👤 Creating admin user...");
  const admin = await prisma.user.upsert({
    where: { email: "admin@medvista.com" },
    update: {},
    create: {
      email: "admin@medvista.com",
      password: adminPassword,
      name: "Dr. Rajesh Kumar",
      role: "ADMIN",
      phone: "+91-9876543210",
      isActive: true,
    },
  });
  console.log(`  ✅ Admin created: ${admin.name}`);

  // Create departments
  console.log("🏥 Creating departments...");
  const departments = await Promise.all([
    prisma.department.upsert({
      where: { name: "Cardiology" },
      update: {},
      create: {
        name: "Cardiology",
        description: "Specializes in heart and cardiovascular system disorders",
        floor: "2nd Floor, Wing A",
        phone: "+91-9876543220",
      },
    }),
    prisma.department.upsert({
      where: { name: "Neurology" },
      update: {},
      create: {
        name: "Neurology",
        description: "Specializes in disorders of the nervous system",
        floor: "3rd Floor, Wing B",
        phone: "+91-9876543221",
      },
    }),
    prisma.department.upsert({
      where: { name: "Orthopedics" },
      update: {},
      create: {
        name: "Orthopedics",
        description: "Specializes in musculoskeletal system disorders",
        floor: "1st Floor, Wing A",
        phone: "+91-9876543222",
      },
    }),
    prisma.department.upsert({
      where: { name: "Pediatrics" },
      update: {},
      create: {
        name: "Pediatrics",
        description: "Specializes in medical care for infants, children, and adolescents",
        floor: "4th Floor, Wing C",
        phone: "+91-9876543223",
      },
    }),
    prisma.department.upsert({
      where: { name: "Oncology" },
      update: {},
      create: {
        name: "Oncology",
        description: "Specializes in diagnosis and treatment of cancer",
        floor: "5th Floor, Wing A",
        phone: "+91-9876543224",
      },
    }),
    prisma.department.upsert({
      where: { name: "Dermatology" },
      update: {},
      create: {
        name: "Dermatology",
        description: "Specializes in skin, hair, and nail conditions",
        floor: "2nd Floor, Wing C",
        phone: "+91-9876543225",
      },
    }),
    prisma.department.upsert({
      where: { name: "General Medicine" },
      update: {},
      create: {
        name: "General Medicine",
        description: "Provides comprehensive primary medical care",
        floor: "Ground Floor, Wing A",
        phone: "+91-9876543226",
      },
    }),
    prisma.department.upsert({
      where: { name: "Emergency" },
      update: {},
      create: {
        name: "Emergency",
        description: "Provides immediate medical attention for critical conditions",
        floor: "Ground Floor, Wing D",
        phone: "+91-9876543227",
      },
    }),
  ]);
  console.log(`  ✅ ${departments.length} departments created`);

  // Create doctors
  console.log("👨‍⚕️ Creating doctors...");
  const doctorsData = [
    { name: "Dr. Priya Sharma", department: "Cardiology", specialization: "Interventional Cardiology", experience: 12 },
    { name: "Dr. Amit Patel", department: "Neurology", specialization: "Stroke Medicine", experience: 10 },
    { name: "Dr. Sneha Reddy", department: "Orthopedics", specialization: "Joint Replacement", experience: 15 },
    { name: "Dr. Vikram Singh", department: "Pediatrics", specialization: "Neonatology", experience: 8 },
    { name: "Dr. Meera Iyer", department: "Oncology", specialization: "Medical Oncology", experience: 14 },
    { name: "Dr. Rahul Verma", department: "Dermatology", specialization: "Cosmetic Dermatology", experience: 9 },
    { name: "Dr. Anjali Deshmukh", department: "General Medicine", specialization: "Internal Medicine", experience: 11 },
    { name: "Dr. Suresh Nair", department: "Emergency", specialization: "Trauma Care", experience: 7 },
    { name: "Dr. Kavita Joshi", department: "Cardiology", specialization: "Cardiac Surgery", experience: 16 },
    { name: "Dr. Arjun Mehta", department: "Neurology", specialization: "Epilepsy", experience: 13 },
    { name: "Dr. Pooja Gupta", department: "Orthopedics", specialization: "Spine Surgery", experience: 10 },
    { name: "Dr. Deepak Rao", department: "Pediatrics", specialization: "Pediatric Cardiology", experience: 12 },
    { name: "Dr. Nisha Banerjee", department: "Oncology", specialization: "Radiation Oncology", experience: 8 },
    { name: "Dr. Manish Tiwari", department: "Dermatology", specialization: "Clinical Dermatology", experience: 6 },
    { name: "Dr. Lakshmi Menon", department: "General Medicine", specialization: "Family Medicine", experience: 14 },
  ];

  const doctors = [];
  for (const docData of doctorsData) {
    const email = `${docData.name.toLowerCase().replace(/dr\.\s/g, "").replace(/\s/g, ".")}@medvista.com`;
    const department = departments.find((d) => d.name === docData.department);
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        password: userPassword,
        name: docData.name,
        role: "DOCTOR",
        phone: `+91-98765${String(43300 + doctors.length).padStart(4, "0")}`,
        isActive: true,
        doctor: {
          create: {
            specialization: docData.specialization,
            experience: docData.experience,
            consultationFee: 500 + docData.experience * 50,
            departmentId: department?.id,
          },
        },
      },
      include: { doctor: true },
    });
    doctors.push(user);
    console.log(`  ✅ Doctor created: ${docData.name}`);
  }

  // Create patients
  console.log("🧑‍🧒 Creating patients...");
  const patientsData = [
    { name: "Aarav Mehta", age: 35, gender: "MALE", bloodGroup: "A+" },
    { name: "Ananya Singh", age: 28, gender: "FEMALE", bloodGroup: "B+" },
    { name: "Arjun Kumar", age: 45, gender: "MALE", bloodGroup: "O+" },
    { name: "Diya Patel", age: 32, gender: "FEMALE", bloodGroup: "AB+" },
    { name: "Ishaan Sharma", age: 55, gender: "MALE", bloodGroup: "A-" },
    { name: "Kavya Nair", age: 22, gender: "FEMALE", bloodGroup: "B-" },
    { name: "Kiran Reddy", age: 40, gender: "MALE", bloodGroup: "O-" },
    { name: "Meera Gupta", age: 30, gender: "FEMALE", bloodGroup: "A+" },
    { name: "Nikhil Deshmukh", age: 50, gender: "MALE", bloodGroup: "AB-" },
    { name: "Pooja Joshi", age: 26, gender: "FEMALE", bloodGroup: "B+" },
    { name: "Rahul Tiwari", age: 38, gender: "MALE", bloodGroup: "O+" },
    { name: "Riya Banerjee", age: 24, gender: "FEMALE", bloodGroup: "A+" },
    { name: "Siddharth Menon", age: 60, gender: "MALE", bloodGroup: "B+" },
    { name: "Tanya Verma", age: 29, gender: "FEMALE", bloodGroup: "O+" },
    { name: "Vikrant Rao", age: 42, gender: "MALE", bloodGroup: "AB+" },
    { name: "Zara Khan", age: 33, gender: "FEMALE", bloodGroup: "A+" },
    { name: "Aditya Chopra", age: 48, gender: "MALE", bloodGroup: "O-" },
    { name: "Bhavana Iyer", age: 27, gender: "FEMALE", bloodGroup: "B+" },
    { name: "Chetan Malhotra", age: 52, gender: "MALE", bloodGroup: "A+" },
    { name: "Deepika Pillai", age: 36, gender: "FEMALE", bloodGroup: "O+" },
  ];

  const patients = [];
  for (const pData of patientsData) {
    const email = `${pData.name.toLowerCase().replace(/\s/g, ".")}@email.com`;
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        password: userPassword,
        name: pData.name,
        role: "PATIENT",
        phone: `+91-98765${String(44000 + patients.length).padStart(4, "0")}`,
        isActive: true,
        patient: {
          create: {
            dateOfBirth: new Date(2026 - pData.age, 0, 1).toISOString(),
            gender: pData.gender,
            bloodGroup: pData.bloodGroup,
            address: `${Math.floor(Math.random() * 100) + 1}, Sector ${Math.floor(Math.random() * 50) + 1}, Mumbai, Maharashtra`,
            emergencyContact: `+91-98765${String(45000 + patients.length).padStart(4, "0")}`,
          },
        },
      },
      include: { patient: true },
    });
    patients.push(user);
    console.log(`  ✅ Patient created: ${pData.name}`);
  }

  // Create appointments
  console.log("📅 Creating appointments...");
  const statuses = ["SCHEDULED", "COMPLETED", "CANCELLED", "NO_SHOW"];
  const appointments = [];
  for (let i = 0; i < 25; i++) {
    const patient = patients[i % patients.length];
    const doctor = doctors[i % doctors.length];
    const status = statuses[i % 4];
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    date.setHours(9 + Math.floor(Math.random() * 9), 0, 0, 0);

    const appointment = await prisma.appointment.create({
      data: {
        appointmentDate: date.toISOString(),
        reason: [
          "Routine checkup",
          "Follow-up consultation",
          "Persistent headache",
          "Chest pain evaluation",
          "Back pain assessment",
          "Skin rash examination",
          "Pediatric wellness visit",
          "Blood pressure monitoring",
          "Diabetes management",
          "Post-surgery follow-up",
        ][i % 10],
        status: status as any,
        notes: status === "COMPLETED" ? "Patient responded well to treatment" : undefined,
        patientId: patient.patient!.id,
        doctorId: doctor.doctor!.id,
      },
    });
    appointments.push(appointment);
    console.log(`  ✅ Appointment #${i + 1} created (${status})`);
  }

  // Create medical records for completed appointments
  console.log("📋 Creating medical records...");
  const completedAppointments = appointments.filter((a) => a.status === "COMPLETED");
  for (const appointment of completedAppointments) {
    const symptoms = [
      "Fever, cough, body ache",
      "Headache, dizziness",
      "Chest tightness, shortness of breath",
      "Joint pain, swelling",
      "Skin irritation, redness",
    ];

    const diagnoses = [
      "Viral fever",
      "Tension headache",
      "Mild cardiac arrhythmia",
      "Osteoarthritis",
      "Contact dermatitis",
    ];

    const treatments = [
      "Rest, fluids, paracetamol 500mg",
      "Stress management, ibuprofen 400mg",
      "ECG monitoring, beta-blockers prescribed",
      "Physical therapy, NSAIDs",
      "Topical corticosteroids, antihistamines",
    ];

    const index = completedAppointments.indexOf(appointment) % 5;
    await prisma.medicalRecord.create({
      data: {
        symptoms: symptoms[index],
        diagnosis: diagnoses[index],
        treatment: treatments[index],
        notes: "Patient advised to follow up in 2 weeks",
        appointmentId: appointment.id,
        patientId: appointment.patientId,
        doctorId: appointment.doctorId,
      },
    });
    console.log(`  ✅ Medical record created for appointment`);
  }

  // Create bills
  console.log("💰 Creating bills...");
  const billStatuses = ["PAID", "PENDING", "PARTIAL"];
  for (let i = 0; i < 15; i++) {
    const appointment = appointments[i % appointments.length];
    const totalAmount = 500 + Math.floor(Math.random() * 4500);
    const paidAmount = billStatuses[i % 3] === "PAID" ? totalAmount : billStatuses[i % 3] === "PARTIAL" ? Math.floor(totalAmount / 2) : 0;

    const bill = await prisma.bill.create({
      data: {
        totalAmount,
        paidAmount,
        status: billStatuses[i % 3] as any,
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        patientId: appointment.patientId,
        appointmentId: appointment.id,
        lineItems: {
          create: [
            {
              description: "Consultation Fee",
              amount: 500,
              quantity: 1,
            },
            {
              description: "Lab Tests",
              amount: Math.floor(Math.random() * 2000) + 200,
              quantity: Math.floor(Math.random() * 3) + 1,
            },
            {
              description: "Medications",
              amount: Math.floor(Math.random() * 1000) + 100,
              quantity: 1,
            },
          ],
        },
      },
    });
    console.log(`  ✅ Bill #${i + 1} created (₹${totalAmount})`);
  }

  console.log("\n🎉 Database seed completed successfully!");
  console.log("📊 Summary:");
  console.log(`   - 1 Admin user`);
  console.log(`   - ${departments.length} Departments`);
  console.log(`   - ${doctors.length} Doctors`);
  console.log(`   - ${patients.length} Patients`);
  console.log(`   - ${appointments.length} Appointments`);
  console.log(`   - ${completedAppointments.length} Medical Records`);
  console.log(`   - 15 Bills`);
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
