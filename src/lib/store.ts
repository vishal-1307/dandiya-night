import { prisma } from "@/lib/db";
import { EVENT_CONFIG } from "@/lib/config";
import { v4 as uuidv4 } from "uuid";

export interface StoredMember {
  id?: string;
  fullName: string;
  age?: number | null;
  gender?: string | null;
  phone?: string | null;
}

export interface StoredRegistration {
  id: string;
  registrationId: string;
  type: string;
  status: string;
  paymentStatus: string;
  paymentAmount: number;
  paymentRef?: string | null;
  checkedIn: boolean;
  checkedInAt?: Date | string | null;
  checkedInBy?: string | null;
  qrCode: string;
  createdAt: Date;
  updatedAt: Date;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  gender?: string | null;
  age?: number | null;
  instagramHandle?: string | null;
  groupName?: string | null;
  totalMembers: number;
  dandiyaParticipation: boolean;
  competitionInterest: boolean;
  costumeTheme?: string | null;
  foodPreference?: string | null;
  emergencyName?: string | null;
  emergencyPhone?: string | null;
  emergencyRelation?: string | null;
  rulesAgreed: boolean;
  communicationConsent: boolean;
  photoVideoConsent: boolean;
  members: StoredMember[];
}

// Initial demo seeds in case DB is uninitialized or in-memory fallback is active
const INITIAL_DEMO_RECORDS: StoredRegistration[] = [
  {
    id: "demo-reg-1",
    registrationId: "DN-DEMO",
    type: "INDIVIDUAL",
    status: "CONFIRMED",
    paymentStatus: "PAID",
    paymentAmount: 199,
    checkedIn: false,
    checkedInAt: null,
    checkedInBy: null,
    qrCode: "DNQR-DEMO-AARAV-001",
    createdAt: new Date("2026-09-28T10:00:00Z"),
    updatedAt: new Date("2026-09-28T10:00:00Z"),
    fullName: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "9876543210",
    city: "Madhubani",
    gender: "Male",
    age: 26,
    instagramHandle: "@aarav_mithila",
    totalMembers: 1,
    dandiyaParticipation: true,
    competitionInterest: true,
    costumeTheme: "Royal Traditional Kurta",
    foodPreference: "Veg",
    emergencyName: "Sanjay Sharma",
    emergencyPhone: "9876500000",
    emergencyRelation: "Parent",
    rulesAgreed: true,
    communicationConsent: true,
    photoVideoConsent: true,
    members: []
  },
  {
    id: "demo-reg-2",
    registrationId: "DN-7A8B",
    type: "COUPLE",
    status: "CONFIRMED",
    paymentStatus: "PAID",
    paymentAmount: 349,
    checkedIn: true,
    checkedInAt: new Date("2026-09-28T17:30:00Z"),
    checkedInBy: "Admin",
    qrCode: "DNQR-DEMO-POOJA-002",
    createdAt: new Date("2026-09-28T12:00:00Z"),
    updatedAt: new Date("2026-09-28T17:30:00Z"),
    fullName: "Pooja Verma",
    email: "pooja.verma@example.com",
    phone: "9812345678",
    city: "Darbhanga",
    gender: "Female",
    age: 24,
    instagramHandle: "@pooja_v",
    totalMembers: 2,
    dandiyaParticipation: true,
    competitionInterest: true,
    costumeTheme: "Chaniya Choli",
    foodPreference: "Veg",
    emergencyName: "Rohan Verma",
    emergencyPhone: "9812345679",
    emergencyRelation: "Spouse",
    rulesAgreed: true,
    communicationConsent: true,
    photoVideoConsent: true,
    members: [
      { id: "mem-1", fullName: "Rohan Verma", phone: "9812345679", gender: "Male", age: 26 }
    ]
  },
  {
    id: "demo-reg-3",
    registrationId: "DN-9K4M",
    type: "GROUP",
    status: "CONFIRMED",
    paymentStatus: "PAID",
    paymentAmount: 799,
    checkedIn: false,
    checkedInAt: null,
    checkedInBy: null,
    qrCode: "DNQR-DEMO-MITHILA-003",
    createdAt: new Date("2026-09-28T15:00:00Z"),
    updatedAt: new Date("2026-09-28T15:00:00Z"),
    fullName: "Kunal Jha",
    email: "kunal.jha@example.com",
    phone: "9823456789",
    city: "Madhubani",
    gender: "Male",
    age: 23,
    groupName: "Mithila Dandiya Squad",
    totalMembers: 5,
    dandiyaParticipation: true,
    competitionInterest: true,
    costumeTheme: "Traditional Mithila Attire",
    foodPreference: "Veg",
    emergencyName: "Ramesh Jha",
    emergencyPhone: "9823400000",
    emergencyRelation: "Parent",
    rulesAgreed: true,
    communicationConsent: true,
    photoVideoConsent: true,
    members: [
      { id: "mem-2", fullName: "Amit Kumar", age: 23 },
      { id: "mem-3", fullName: "Sneha Thakur", age: 22 },
      { id: "mem-4", fullName: "Vikram Roy", age: 24 },
      { id: "mem-5", fullName: "Priya Singh", age: 22 }
    ]
  }
];

// In-memory fallback singleton
declare global {
  // eslint-disable-next-line no-var
  var __dandiya_memory_store: StoredRegistration[] | undefined;
  // eslint-disable-next-line no-var
  var __dandiya_contact_store: any[] | undefined;
}

if (!globalThis.__dandiya_memory_store) {
  globalThis.__dandiya_memory_store = [...INITIAL_DEMO_RECORDS];
}
if (!globalThis.__dandiya_contact_store) {
  globalThis.__dandiya_contact_store = [];
}

const memoryStore = globalThis.__dandiya_memory_store;
const contactStore = globalThis.__dandiya_contact_store;

export function generateRegistrationId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `DN-${result}`;
}

export const eventStore = {
  async createRegistration(data: any): Promise<{ registration: StoredRegistration; isWaitlisted: boolean }> {
    // 1. Try Prisma first
    try {
      const totalConfirmed = await prisma.registration.count({
        where: { status: "CONFIRMED" },
      });

      let status = "CONFIRMED";
      if (totalConfirmed >= EVENT_CONFIG.capacity) {
        status = "WAITLISTED";
      }

      const existingRegistration = await prisma.registration.findFirst({
        where: {
          email: data.email,
          phone: data.phone,
        },
      });

      if (existingRegistration) {
        throw new Error("ALREADY_EXISTS");
      }

      const registrationId = generateRegistrationId();
      const qrCode = `DNQR-${uuidv4()}`;

      const registration = await prisma.registration.create({
        data: {
          registrationId,
          type: data.type,
          status,
          qrCode,
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          city: data.city || "",
          gender: data.gender,
          age: data.age ? parseInt(data.age) : null,
          instagramHandle: data.instagramHandle,
          groupName: data.groupName,
          totalMembers: data.totalMembers || 1,
          dandiyaParticipation: data.dandiyaParticipation ?? true,
          competitionInterest: data.competitionInterest ?? false,
          costumeTheme: data.costumeTheme || null,
          foodPreference: data.foodPreference || null,
          emergencyName: data.emergencyName || null,
          emergencyPhone: data.emergencyPhone || null,
          emergencyRelation: data.emergencyRelation || null,
          rulesAgreed: data.rulesAgreed ?? true,
          communicationConsent: data.communicationConsent ?? true,
          photoVideoConsent: data.photoVideoConsent ?? true,
          members: {
            create: data.members?.map((m: any) => ({
              fullName: m.fullName || m.name,
              age: m.age ? parseInt(m.age) : null,
              gender: m.gender || null,
              phone: m.phone || null,
            })) || [],
          },
        },
        include: {
          members: true,
        },
      });

      // Mirror to memory store
      memoryStore.unshift(registration as any);

      return {
        registration: registration as any,
        isWaitlisted: status === "WAITLISTED",
      };
    } catch (err: any) {
      if (err.message === "ALREADY_EXISTS") {
        throw err;
      }

      console.warn("Prisma write encountered error or read-only environment; using reliable memory store fallback:", err?.message || err);

      // 2. Memory Store Fallback
      const existing = memoryStore.find(
        (r) => r.email.toLowerCase() === data.email.toLowerCase() && r.phone === data.phone
      );
      if (existing) {
        throw new Error("ALREADY_EXISTS");
      }

      const totalConfirmed = memoryStore.filter((r) => r.status === "CONFIRMED").length;
      const status = totalConfirmed >= EVENT_CONFIG.capacity ? "WAITLISTED" : "CONFIRMED";
      const registrationId = generateRegistrationId();
      const qrCode = `DNQR-${uuidv4()}`;

      const newRegistration: StoredRegistration = {
        id: `reg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        registrationId,
        type: data.type,
        status,
        paymentStatus: "PENDING",
        paymentAmount: data.type === "GROUP" ? 799 : data.type === "COUPLE" ? 349 : 199,
        paymentRef: null,
        checkedIn: false,
        checkedInAt: null,
        checkedInBy: null,
        qrCode,
        createdAt: new Date(),
        updatedAt: new Date(),
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        city: data.city || "",
        gender: data.gender || null,
        age: data.age ? parseInt(data.age) : null,
        instagramHandle: data.instagramHandle || null,
        groupName: data.groupName || null,
        totalMembers: data.totalMembers || 1,
        dandiyaParticipation: data.dandiyaParticipation ?? true,
        competitionInterest: data.competitionInterest ?? false,
        costumeTheme: data.costumeTheme || null,
        foodPreference: data.foodPreference || null,
        emergencyName: data.emergencyName || null,
        emergencyPhone: data.emergencyPhone || null,
        emergencyRelation: data.emergencyRelation || null,
        rulesAgreed: data.rulesAgreed ?? true,
        communicationConsent: data.communicationConsent ?? true,
        photoVideoConsent: data.photoVideoConsent ?? true,
        members: data.members?.map((m: any, idx: number) => ({
          id: `mem-${Date.now()}-${idx}`,
          fullName: m.fullName || m.name,
          age: m.age ? parseInt(m.age) : null,
          gender: m.gender || null,
          phone: m.phone || null,
        })) || [],
      };

      memoryStore.unshift(newRegistration);
      return {
        registration: newRegistration,
        isWaitlisted: status === "WAITLISTED",
      };
    }
  },

  async lookupRegistration(query: string): Promise<StoredRegistration | null> {
    const qClean = query.trim().toUpperCase();
    const qLower = query.trim().toLowerCase();

    // 1. Try Prisma
    try {
      const registration = await prisma.registration.findFirst({
        where: {
          OR: [
            { registrationId: { equals: qClean } },
            { email: { equals: qLower } },
            { phone: { equals: query.trim() } },
          ],
        },
        include: {
          members: true,
        },
      });

      if (registration) {
        return registration as any;
      }
    } catch (err) {
      console.warn("Prisma lookup failed; checking memory store fallback");
    }

    // 2. Memory store
    const matched = memoryStore.find(
      (r) =>
        r.registrationId.toUpperCase() === qClean ||
        r.email.toLowerCase() === qLower ||
        r.phone === query.trim()
    );

    return matched || null;
  },

  async listRegistrations(params: {
    search?: string;
    type?: string | null;
    status?: string | null;
    page?: number;
    limit?: number;
  }) {
    const { search = "", type, status, page = 1, limit = 50 } = params;
    const skip = (page - 1) * limit;

    // 1. Try Prisma
    try {
      const whereClause: any = {};
      if (search) {
        whereClause.OR = [
          { fullName: { contains: search } },
          { email: { contains: search } },
          { phone: { contains: search } },
          { registrationId: { contains: search } },
        ];
      }
      if (type) whereClause.type = type;
      if (status) whereClause.status = status;

      const [registrations, total] = await Promise.all([
        prisma.registration.findMany({
          where: whereClause,
          include: { members: true },
          orderBy: { createdAt: "desc" },
          skip,
          take: limit,
        }),
        prisma.registration.count({ where: whereClause }),
      ]);

      return {
        registrations,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (err) {
      console.warn("Prisma listRegistrations failed; using memory store");
    }

    // 2. Memory Store
    let filtered = [...memoryStore];
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.fullName.toLowerCase().includes(s) ||
          r.email.toLowerCase().includes(s) ||
          r.phone.includes(s) ||
          r.registrationId.toLowerCase().includes(s)
      );
    }
    if (type) {
      filtered = filtered.filter((r) => r.type.toUpperCase() === type.toUpperCase());
    }
    if (status) {
      filtered = filtered.filter((r) => r.status.toUpperCase() === status.toUpperCase());
    }

    const total = filtered.length;
    const paginated = filtered.slice(skip, skip + limit);

    return {
      registrations: paginated,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getStats() {
    // 1. Try Prisma
    try {
      const totalRegistrations = await prisma.registration.count();
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const todaysRegistrations = await prisma.registration.count({
        where: { createdAt: { gte: today } },
      });

      const totalCheckedIn = await prisma.registration.count({
        where: { checkedIn: true },
      });

      const byTypeRaw = await prisma.registration.groupBy({
        by: ["type"],
        _count: { id: true },
      });

      const byStatusRaw = await prisma.registration.groupBy({
        by: ["status"],
        _count: { id: true },
      });

      const byType: Record<string, number> = {};
      byTypeRaw.forEach((i) => {
        byType[i.type] = i._count.id;
      });

      const byStatus: Record<string, number> = {};
      byStatusRaw.forEach((i) => {
        byStatus[i.status] = i._count.id;
      });

      const totalConfirmed = byStatus["CONFIRMED"] || 0;

      return {
        totalRegistrations,
        todaysRegistrations,
        totalCheckedIn,
        byType,
        byStatus,
        capacity: {
          total: EVENT_CONFIG.capacity,
          filled: totalConfirmed,
          remaining: Math.max(0, EVENT_CONFIG.capacity - totalConfirmed),
        },
      };
    } catch (err) {
      console.warn("Prisma getStats failed; computing from memory store");
    }

    // 2. Memory Store Stats
    const totalRegistrations = memoryStore.length;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysRegistrations = memoryStore.filter((r) => new Date(r.createdAt) >= today).length;
    const totalCheckedIn = memoryStore.filter((r) => r.checkedIn).length;

    const byType: Record<string, number> = {
      INDIVIDUAL: 0,
      COUPLE: 0,
      GROUP: 0,
    };
    const byStatus: Record<string, number> = {
      CONFIRMED: 0,
      WAITLISTED: 0,
      CANCELLED: 0,
    };

    memoryStore.forEach((r) => {
      const t = r.type?.toUpperCase() || "INDIVIDUAL";
      const s = r.status?.toUpperCase() || "CONFIRMED";
      byType[t] = (byType[t] || 0) + 1;
      byStatus[s] = (byStatus[s] || 0) + 1;
    });

    const totalConfirmed = byStatus["CONFIRMED"] || 0;

    return {
      totalRegistrations,
      todaysRegistrations,
      totalCheckedIn,
      byType,
      byStatus,
      capacity: {
        total: EVENT_CONFIG.capacity,
        filled: totalConfirmed,
        remaining: Math.max(0, EVENT_CONFIG.capacity - totalConfirmed),
      },
    };
  },

  async checkInRegistration(code: string) {
    const qClean = code.trim().toUpperCase();

    // 1. Try Prisma
    try {
      const registration = await prisma.registration.findFirst({
        where: {
          OR: [{ qrCode: code }, { registrationId: qClean }],
        },
        include: { members: true },
      });

      if (registration) {
        if (registration.status !== "CONFIRMED") {
          return { error: `Registration status is ${registration.status}`, status: 400 };
        }
        if (registration.checkedIn) {
          return {
            error: `Already checked in at ${new Date(registration.checkedInAt || "").toLocaleTimeString()}`,
            alreadyCheckedIn: true,
            registration,
            status: 400,
          };
        }

        const updated = await prisma.registration.update({
          where: { id: registration.id },
          data: {
            checkedIn: true,
            checkedInAt: new Date(),
            paymentStatus: "PAID",
          },
          include: { members: true },
        });

        return { success: true, registration: updated };
      }
    } catch (err) {
      console.warn("Prisma checkin failed; checking memory store");
    }

    // 2. Memory Store
    const reg = memoryStore.find(
      (r) => r.qrCode === code || r.registrationId.toUpperCase() === qClean
    );

    if (!reg) {
      return { error: "Registration not found with this ID or QR code", status: 404 };
    }

    if (reg.status !== "CONFIRMED") {
      return { error: `Registration status is ${reg.status}`, status: 400 };
    }

    if (reg.checkedIn) {
      return {
        error: `Already checked in at ${new Date(reg.checkedInAt || "").toLocaleTimeString()}`,
        alreadyCheckedIn: true,
        registration: reg,
        status: 400,
      };
    }

    reg.checkedIn = true;
    reg.checkedInAt = new Date();
    reg.paymentStatus = "PAID";
    reg.updatedAt = new Date();

    return { success: true, registration: reg };
  },

  async updateRegistration(id: string, data: any) {
    try {
      const updated = await prisma.registration.update({
        where: { id },
        data,
      });
      return updated;
    } catch (err) {
      console.warn("Prisma update failed; updating memory store");
    }

    const reg = memoryStore.find((r) => r.id === id || r.registrationId === id);
    if (!reg) return null;
    Object.assign(reg, data, { updatedAt: new Date() });
    return reg;
  },

  async cancelRegistration(id: string) {
    return this.updateRegistration(id, { status: "CANCELLED" });
  },

  async getAllForExport() {
    try {
      const records = await prisma.registration.findMany({
        include: { members: true },
        orderBy: { createdAt: "desc" },
      });
      if (records.length > 0) return records;
    } catch (err) {
      console.warn("Prisma export failed; using memory store");
    }
    return memoryStore;
  },

  async addContactSubmission(data: { name: string; email: string; phone?: string; message: string }) {
    try {
      return await prisma.contactSubmission.create({ data });
    } catch (err) {
      console.warn("Prisma contact failed; storing in memory");
      const record = { id: `contact-${Date.now()}`, ...data, createdAt: new Date() };
      contactStore.unshift(record);
      return record;
    }
  }
};
