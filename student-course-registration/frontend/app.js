/**
 * STUDENT COURSE REGISTRATION PORTAL
 * Features:
 * - Seat Rush Alert: Coloured indicator with progress bar on every card
 *   (Green: >50% left, Orange: 15-50% left, Red: <=15% left with pulsing 🔥, Grey: 0 left Full)
 * - Live Views: "👀 X students viewed this today" tracking per day with base numbers
 * - Waitlist Alert: Join waitlist when full, blue banner notification when seat opens
 * - Live Updates: Auto-refresh seat indicators every 10 seconds and after actions
 * - "Filling Fast" filter button to isolate red/orange courses
 * - Course Details Popup (Syllabus, Faculty, Schedule, Credits, Room)
 * - Degree Progress Ring, GPA Calculator, Google Calendar (.ics) export, and Printable Slip
 */

// 12 Curated Undergraduate Courses with Realistic Images, Syllabus & Metadata
const COURSE_CATALOG = [
  // Computer Science & Engineering
  {
    id: "ENG101",
    code: "ENG101",
    title: "Python Programming & Problem Solving",
    stream: "Engineering",
    department: "Computer Science",
    difficulty: "Easy",
    tag: "Popular",
    credits: 4,
    instructor: "Dr. Arvind Swaminathan",
    slot: "Mon/Wed 09:00 - 10:00 AM (Period 1)",
    room: "Computing Lab 1",
    capacity: 45,
    enrolledCount: 42, // 3 of 45 seats left (6.7% <= 15% -> RED "Filling fast! 🔥")
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    desc: "Hands-on introduction to computational thinking, Python variables, logic loops, algorithms, and practical code labs.",
    syllabus: [
      "Module 1: Computational Thinking & Algorithmic Problem Solving",
      "Module 2: Python Data Types, Conditionals, and Control Flow",
      "Module 3: Functions, Recursion, and File Input/Output Operations",
      "Module 4: Data Structures: Lists, Tuples, Dictionaries & Mini Project"
    ]
  },
  {
    id: "ENG102",
    code: "ENG102",
    title: "Engineering Physics & Mechanics",
    stream: "Engineering",
    department: "Electrical & Mech",
    difficulty: "Hard",
    tag: "Almost Full",
    credits: 4,
    instructor: "Dr. Kavita Nair",
    slot: "Tue/Thu 10:00 - 11:00 AM (Period 2)",
    room: "Physics Lab Hall 2",
    capacity: 45,
    enrolledCount: 45, // 0 of 45 seats left (0% -> GREY "Full - join waitlist")
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=800&q=80",
    desc: "Newtonian mechanics, wave optics, laser applications, electromagnetic principles, and laboratory experiments.",
    syllabus: [
      "Module 1: Oscillations, Waves and Quantum Mechanical Concepts",
      "Module 2: Applied Wave Optics, Interference, and Diffraction",
      "Module 3: Lasers, Fiber Optics and Sensor Technologies",
      "Module 4: Laboratory Practical: Spectrometer & Vernier Experiments"
    ]
  },
  {
    id: "ENG103",
    code: "ENG103",
    title: "Engineering Mathematics & Calculus",
    stream: "Engineering",
    department: "Computer Science",
    difficulty: "Medium",
    tag: "Popular",
    credits: 4,
    instructor: "Prof. S. Ramanathan",
    slot: "Mon/Wed 11:15 - 12:15 PM (Period 3)",
    room: "Math Hall 104",
    capacity: 50,
    enrolledCount: 36, // 14 of 50 seats left (28% -> ORANGE "Seats going")
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
    desc: "Differential calculus, matrices, vector integration, differential equations, and mathematical modeling.",
    syllabus: [
      "Module 1: Matrices, Eigenvalues, and Diagonalization",
      "Module 2: Differential Calculus of Single and Multivariables",
      "Module 3: Multiple Integrals, Green's & Stokes' Theorems",
      "Module 4: First and Second Order Linear Differential Equations"
    ]
  },
  {
    id: "ENG104",
    code: "ENG104",
    title: "Basic Electrical & Electronics Engineering",
    stream: "Engineering",
    department: "Electrical & Mech",
    difficulty: "Medium",
    tag: "New",
    credits: 3,
    instructor: "Dr. Vikram Seth",
    slot: "Tue/Thu 12:15 - 01:15 PM (Period 4)",
    room: "Electrical Lab 1",
    capacity: 40,
    enrolledCount: 16, // 24 of 40 seats left (60% -> GREEN "Seats available")
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    desc: "AC/DC circuit laws, transformers, semiconductors, diodes, transistors, and basic domestic wiring.",
    syllabus: [
      "Module 1: DC Circuits, Ohm's Law, Kirchhoff's Laws & Network Theorems",
      "Module 2: Single Phase and Three Phase AC Circuits",
      "Module 3: PN Junction Diodes, BJT, Rectifiers and Regulated Supplies",
      "Module 4: Basics of Microcontrollers, Sensors and Electrical Safety"
    ]
  },
  {
    id: "ENG105",
    code: "ENG105",
    title: "Engineering Graphics & Digital CAD",
    stream: "Engineering",
    department: "Electrical & Mech",
    difficulty: "Easy",
    tag: "Popular",
    credits: 3,
    instructor: "Ar. Dennis Scott",
    slot: "Fri 02:00 - 03:30 PM (Studio)",
    room: "CAD Studio 3",
    capacity: 35,
    enrolledCount: 32, // 3 of 35 seats left (8.6% -> RED "Filling fast! 🔥")
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    desc: "Orthographic projection, isometric views, 3D solids drafting, and AutoCAD drawing software for engineers.",
    syllabus: [
      "Module 1: Geometric Drafting Principles & Lettering Standards",
      "Module 2: Orthographic Projections of Points, Lines and Planes",
      "Module 3: Isometric Drawings and Sectioning of Regular Solids",
      "Module 4: 2D/3D Modeling on Computer-Aided Design (CAD) Software"
    ]
  },
  {
    id: "ENG106",
    code: "ENG106",
    title: "Environmental Science & Sustainable Tech",
    stream: "Engineering",
    department: "Electrical & Mech",
    difficulty: "Easy",
    tag: "New",
    credits: 2,
    instructor: "Dr. Rachel Green",
    slot: "Tue/Thu 09:00 - 10:00 AM (Period 1)",
    room: "Lecture Hall B",
    capacity: 50,
    enrolledCount: 20, // 30 of 50 seats left (60% -> GREEN "Seats available")
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80",
    desc: "Ecosystems, renewable solar/wind energy, pollution prevention, waste management, and green innovations.",
    syllabus: [
      "Module 1: Natural Ecosystems, Biodiversity, and Conservation",
      "Module 2: Air, Water, and Soil Pollution: Prevention & Remediation",
      "Module 3: Renewable Energy Systems: Solar, Wind, and Bio-fuels",
      "Module 4: Circular Economy, Carbon Footprint & Environmental Law"
    ]
  },

  // Arts & Humanities Courses
  {
    id: "ART101",
    code: "ART101",
    title: "English Communication & Creative Writing",
    stream: "Arts",
    department: "Media & Literature",
    difficulty: "Easy",
    tag: "Popular",
    credits: 3,
    instructor: "Dr. Jonathan Ross",
    slot: "Mon/Wed 09:00 - 10:00 AM (Period 1)",
    room: "Humanities Room 1",
    capacity: 40,
    enrolledCount: 24, // 16 of 40 seats left (40% -> ORANGE "Seats going")
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    desc: "Developing college essay writing, public speaking confidence, literary appreciation, and creative writing.",
    syllabus: [
      "Module 1: Foundations of Academic Reading and Critical Analysis",
      "Module 2: Argumentative Essay Composition and Rhetorical Devices",
      "Module 3: Narrative Craft: Voice, Characterization, and Creative Nonfiction",
      "Module 4: Public Oratory, Debate Skills, and Professional Presentations"
    ]
  },
  {
    id: "ART102",
    code: "ART102",
    title: "Introduction to Psychology & Behavior",
    stream: "Arts",
    department: "Psychology",
    difficulty: "Medium",
    tag: "Popular",
    credits: 4,
    instructor: "Prof. Eleanor Vance",
    slot: "Tue/Thu 10:00 - 11:00 AM (Period 2)",
    room: "Psychology Hall 1",
    capacity: 45,
    enrolledCount: 45, // 0 of 45 seats left (0% -> GREY "Full - join waitlist")
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80",
    desc: "Foundations of human memory, personality types, emotional intelligence, perception, and social psychology.",
    syllabus: [
      "Module 1: Brain Anatomy, Neurotransmitters, and Sensory Perception",
      "Module 2: Conditioning, Memory Encoding, Storage, and Recall",
      "Module 3: Personality Frameworks and Developmental Milestones",
      "Module 4: Social Dynamics, Cognitive Biases, and Mental Wellbeing"
    ]
  },
  {
    id: "ART103",
    code: "ART103",
    title: "Fundamentals of Digital Journalism & Media",
    stream: "Arts",
    department: "Media & Literature",
    difficulty: "Medium",
    tag: "New",
    credits: 3,
    instructor: "Prof. Clara Hughes",
    slot: "Mon/Wed 11:15 - 12:15 PM (Period 3)",
    room: "Media Newsroom 2",
    capacity: 35,
    enrolledCount: 12, // 23 of 35 seats left (65.7% -> GREEN "Seats available")
    image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=800&q=80",
    desc: "News gathering, podcasting, digital storytelling, social media journalism, and ethical news reporting.",
    syllabus: [
      "Module 1: News Sense, Fact-Checking and Verification in the Digital Age",
      "Module 2: Audio Podcasting and Digital Voice Recording Techniques",
      "Module 3: Multimedia Story Publishing & Data Journalism Visuals",
      "Module 4: Media Ethics, Freedom of Expression and Defamation Laws"
    ]
  },
  {
    id: "ART104",
    code: "ART104",
    title: "Visual Arts & Graphic Design Foundations",
    stream: "Arts",
    department: "Visual Arts",
    difficulty: "Easy",
    tag: "Popular",
    credits: 3,
    instructor: "Prof. Maya Lin",
    slot: "Fri 02:00 - 03:30 PM (Studio)",
    room: "Fine Arts Studio",
    capacity: 30,
    enrolledCount: 26, // 4 of 30 seats left (13.3% -> RED "Filling fast! 🔥")
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    desc: "Color harmony, sketching fundamentals, typography layout, poster design, and visual digital art tools.",
    syllabus: [
      "Module 1: Elements of Composition, Perspective, and Gestalt Principles",
      "Module 2: Color Theory, Contrast, and Emotional Palettes",
      "Module 3: Typographic Systems, Grid Hierarchies, and Vector Tools",
      "Module 4: Final Studio Project: Visual Brand Identity & Exhibition"
    ]
  },
  {
    id: "ART105",
    code: "ART105",
    title: "Principles of Economics & Personal Finance",
    stream: "Arts",
    department: "Economics & History",
    difficulty: "Medium",
    tag: "Almost Full",
    credits: 3,
    instructor: "Prof. Kenneth Bradley",
    slot: "Tue/Thu 12:15 - 01:15 PM (Period 4)",
    room: "Economics Room 201",
    capacity: 45,
    enrolledCount: 32, // 13 of 45 seats left (28.8% -> ORANGE "Seats going")
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    desc: "Microeconomic market supply & demand, money banking, personal budgeting, inflation, and financial literacy.",
    syllabus: [
      "Module 1: Scarcity, Opportunity Cost, Supply & Demand Equilibrium",
      "Module 2: Elasticity, Consumer Surplus, and Market Structures",
      "Module 3: Macroeconomic Indicators: GDP, Inflation, and Central Banks",
      "Module 4: Personal Financial Management, Investing, and Tax Basics"
    ]
  },
  {
    id: "ART106",
    code: "ART106",
    title: "World History & International Ideas",
    stream: "Arts",
    department: "Economics & History",
    difficulty: "Easy",
    tag: "New",
    credits: 3,
    instructor: "Amb. S. Mukherjee",
    slot: "Tue/Thu 09:00 - 10:00 AM (Period 1)",
    room: "History Seminar Hall",
    capacity: 40,
    enrolledCount: 15, // 25 of 40 seats left (62.5% -> GREEN "Seats available")
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80",
    desc: "Key turning points in modern world history, civil rights movements, international treaties, and cultural revolutions.",
    syllabus: [
      "Module 1: The Enlightenment, Scientific Revolutions, and Modernity",
      "Module 2: Decolonization, Independence Movements, and Global Shift",
      "Module 3: Post-WWII International Alliances and the United Nations",
      "Module 4: Globalization, Cultural Diffusion, and 21st Century Geopolitics"
    ]
  }
];

const FRESHMAN_COURSES = COURSE_CATALOG; // Backwards compatibility alias

// Helper: Calculate Seat Status & Progress
function getSeatStatus(course) {
  const seatsLeft = Math.max(0, course.capacity - course.enrolledCount);
  const pctLeft = (seatsLeft / course.capacity) * 100;
  const pctFull = Math.min(100, Math.max(0, Math.round(((course.capacity - seatsLeft) / course.capacity) * 100)));

  if (seatsLeft === 0) {
    return {
      category: "grey",
      label: "Full - join waitlist",
      icon: "fa-solid fa-ban",
      seatsLeft: 0,
      pctLeft: 0,
      pctFull: 100
    };
  } else if (pctLeft <= 15) {
    return {
      category: "red",
      label: "Filling fast!",
      icon: "fa-solid fa-fire",
      seatsLeft,
      pctLeft,
      pctFull
    };
  } else if (pctLeft <= 50) {
    return {
      category: "orange",
      label: "Seats going",
      icon: "fa-solid fa-hourglass-half",
      seatsLeft,
      pctLeft,
      pctFull
    };
  } else {
    return {
      category: "green",
      label: "Seats available",
      icon: "fa-solid fa-check",
      seatsLeft,
      pctLeft,
      pctFull
    };
  }
}

class PortalStore {
  constructor() {
    this.cleanLegacyData();
    this.load();
  }

  // Clear past placeholder profiles from localStorage
  cleanLegacyData() {
    const legacyKeys = ["nm_student_data", "edureg_student", "edu_student", "freshman_student"];
    legacyKeys.forEach(key => {
      const val = localStorage.getItem(key);
      if (val && val.includes("Priya")) {
        localStorage.removeItem(key);
      }
    });
  }

  load() {
    const rawStudent = localStorage.getItem("fresh_portal_student");
    this.student = rawStudent ? JSON.parse(rawStudent) : {
      isRegistered: false,
      name: "",
      rollNo: "",
      phone: "",
      stream: "Engineering",
      major: "B.Tech Computer Science & Engineering",
      avatar: "ST",
      password: "Student2026!",
      enrolledIds: []
    };

    // Seat Rush V2 initialization (guarantees sample full & nearly full courses)
    const rushV2Key = localStorage.getItem("seat_rush_data_v2");
    if (!rushV2Key) {
      this.courses = JSON.parse(JSON.stringify(COURSE_CATALOG));
      localStorage.setItem("seat_rush_data_v2", "true");
      localStorage.setItem("fresh_portal_courses", JSON.stringify(this.courses));
    } else {
      const rawCourses = localStorage.getItem("fresh_portal_courses");
      if (rawCourses) {
        try {
          const parsed = JSON.parse(rawCourses);
          this.courses = COURSE_CATALOG.map(cc => {
            const found = parsed.find(p => p.id === cc.id);
            return found ? { ...cc, enrolledCount: found.enrolledCount } : cc;
          });
        } catch (e) {
          this.courses = JSON.parse(JSON.stringify(COURSE_CATALOG));
        }
      } else {
        this.courses = JSON.parse(JSON.stringify(COURSE_CATALOG));
      }
    }

    // Recently viewed courses
    const rawRecent = localStorage.getItem("fresh_recently_viewed");
    this.recentlyViewed = rawRecent ? JSON.parse(rawRecent) : [];

    // Daily Live Views (resets per calendar day)
    this.views = this.loadDailyViews();

    // Course Waitlists (ordered queue per course)
    const rawWaitlist = localStorage.getItem("course_waitlists_data");
    this.waitlists = rawWaitlist ? JSON.parse(rawWaitlist) : {};

    this.currentStreamFilter = "ALL";
    this.currentDeptFilter = "ALL";
    this.currentSort = "name_asc";
    this.currentDifficulty = "ALL";
    this.rushFilterActive = false; // "Filling Fast" filter
    this.searchQuery = "";
    this.pendingDropCourseId = null;
  }

  // Load daily views & reset on a new day
  loadDailyViews() {
    const todayKey = new Date().toISOString().slice(0, 10);
    const raw = localStorage.getItem("course_views_data");
    let data = raw ? JSON.parse(raw) : null;

    if (!data || data.date !== todayKey) {
      data = {
        date: todayKey,
        views: {}
      };
      COURSE_CATALOG.forEach(c => {
        data.views[c.id] = Math.floor(Math.random() * 6) + 2; // base 2 to 7
      });
      localStorage.setItem("course_views_data", JSON.stringify(data));
    } else {
      COURSE_CATALOG.forEach(c => {
        if (!data.views[c.id]) {
          data.views[c.id] = Math.floor(Math.random() * 6) + 2;
        }
      });
    }
    return data;
  }

  getViewCount(courseId) {
    return this.views.views[courseId] || 3;
  }

  recordView(courseId) {
    if (!this.views.views[courseId]) this.views.views[courseId] = 2;
    this.views.views[courseId] += 1;
    localStorage.setItem("course_views_data", JSON.stringify(this.views));

    // Update DOM chip live without destroying whole page
    const el = document.getElementById(`liveViewsCount-${courseId}`);
    if (el) {
      el.innerHTML = `<i class="fa-solid fa-eye"></i> ${this.views.views[courseId]} students viewed today`;
    }
  }

  save() {
    localStorage.setItem("fresh_portal_student", JSON.stringify(this.student));
    localStorage.setItem("fresh_portal_courses", JSON.stringify(this.courses));
    localStorage.setItem("fresh_recently_viewed", JSON.stringify(this.recentlyViewed));
    localStorage.setItem("course_waitlists_data", JSON.stringify(this.waitlists));
  }

  addRecentlyViewed(courseId) {
    if (!this.recentlyViewed.includes(courseId)) {
      this.recentlyViewed.unshift(courseId);
      if (this.recentlyViewed.length > 6) {
        this.recentlyViewed.pop();
      }
      this.save();
    }
  }

  getEnrolledCourses() {
    return this.courses.filter(c => this.student.enrolledIds.includes(c.id));
  }

  getTotalCredits() {
    return this.getEnrolledCourses().reduce((sum, c) => sum + c.credits, 0);
  }

  isEnrolled(courseId) {
    return this.student.enrolledIds.includes(courseId);
  }

  isWaitlisted(courseId, rollNo = this.student.rollNo) {
    if (!rollNo || !this.waitlists[courseId]) return false;
    return this.waitlists[courseId].some(item => item.rollNo === rollNo);
  }

  getWaitlistPosition(courseId, rollNo = this.student.rollNo) {
    if (!rollNo || !this.waitlists[courseId]) return 0;
    const idx = this.waitlists[courseId].findIndex(item => item.rollNo === rollNo);
    return idx >= 0 ? idx + 1 : 0;
  }

  joinWaitlist(courseId) {
    if (!this.student.isRegistered || !this.student.name) {
      return { success: false, message: "Please register your profile first before joining a waitlist!" };
    }
    if (!this.waitlists[courseId]) {
      this.waitlists[courseId] = [];
    }
    if (this.isWaitlisted(courseId)) {
      return { success: false, message: "You are already in the waitlist queue for this course." };
    }

    this.waitlists[courseId].push({
      name: this.student.name,
      rollNo: this.student.rollNo,
      timestamp: Date.now()
    });
    this.save();

    const pos = this.waitlists[courseId].length;
    const course = this.courses.find(c => c.id === courseId);
    return {
      success: true,
      position: pos,
      message: `Added to waitlist for ${course ? course.title : courseId}! Your queue position is #${pos}.`
    };
  }

  leaveWaitlist(courseId) {
    if (!this.waitlists[courseId]) return { success: false };
    this.waitlists[courseId] = this.waitlists[courseId].filter(item => item.rollNo !== this.student.rollNo);
    this.save();
    const course = this.courses.find(c => c.id === courseId);
    return { success: true, message: `Removed from waitlist for ${course ? course.title : courseId}.` };
  }

  registerStudent(name, rollNo, phone, stream, major) {
    this.student.isRegistered = true;
    this.student.name = name;
    this.student.rollNo = rollNo;
    this.student.phone = phone || "";
    this.student.stream = stream;
    this.student.major = major;
    if (name && (!this.student.avatar || this.student.avatar === "ST")) {
      const parts = name.trim().split(" ");
      this.student.avatar = (parts[0][0] + (parts[1] ? parts[1][0] : "")).toUpperCase();
    }
    this.save();
  }

  updateProfile(name, rollNo, phone, major) {
    this.student.name = name;
    this.student.rollNo = rollNo;
    this.student.phone = phone || "";
    this.student.major = major;
    this.student.isRegistered = true;
    this.save();
  }

  setAvatar(avatar) {
    this.student.avatar = avatar;
    this.save();
  }

  setPassword(pwd) {
    this.student.password = pwd;
    this.save();
  }

  resetStudent() {
    this.student = {
      isRegistered: false,
      name: "",
      rollNo: "",
      phone: "",
      stream: "Engineering",
      major: "B.Tech Computer Science & Engineering",
      avatar: "ST",
      password: "Student2026!",
      enrolledIds: []
    };
    this.save();
  }

  enroll(courseId) {
    const course = this.courses.find(c => c.id === courseId);
    if (!course) return { success: false, message: "Course not found" };

    if (this.isEnrolled(courseId)) {
      return { success: false, message: `Already enrolled in ${course.code}!` };
    }

    const cur = this.getTotalCredits();
    if (cur + course.credits > 22) {
      return { success: false, message: "Maximum semester credit limit (22 credits) reached!" };
    }

    if (course.enrolledCount >= course.capacity) {
      return { success: false, message: `Sorry, ${course.code} is completely full! Join the waitlist.` };
    }

    this.student.enrolledIds.push(courseId);
    course.enrolledCount += 1;

    // If student was on waitlist, remove them
    this.leaveWaitlist(courseId);

    this.save();
    return { success: true, message: `Successfully enrolled in ${course.code}: ${course.title}!` };
  }

  drop(courseId) {
    const course = this.courses.find(c => c.id === courseId);
    if (!course) return { success: false, message: "Course not found" };

    this.student.enrolledIds = this.student.enrolledIds.filter(id => id !== courseId);
    if (course.enrolledCount > 0) course.enrolledCount -= 1;
    this.save();

    // Check if waitlist needs notification
    checkWaitlistAlertBanner();

    return { success: true, message: `Successfully dropped ${course.code} from your courses.` };
  }
}

const store = new PortalStore();
const FreshStudentStore = PortalStore; // Alias

// ==========================================
// DOM READY & LIFECYCLE
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavigation();
  initDropModalListener();
  renderApp();
  renderQrCode();

  // Live Update: Refresh all seat indicators every 10 seconds
  setInterval(refreshLiveSeatIndicators, 10000);
});

function initTheme() {
  const saved = localStorage.getItem("fresh_theme") || "dark";
  document.documentElement.setAttribute("data-theme", saved);
  updateThemeIcon(saved);
}

function toggleTheme() {
  const cur = document.documentElement.getAttribute("data-theme") || "dark";
  const next = cur === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("fresh_theme", next);
  updateThemeIcon(next);
}

function updateThemeIcon(t) {
  const icon = document.querySelector("#themeToggle .theme-icon");
  if (icon) icon.className = t === "dark" ? "fa-solid fa-moon theme-icon" : "fa-solid fa-sun theme-icon";
}

function initNavigation() {
  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.getAttribute("data-tab");
      if (tab) switchTab(tab);
    });
  });

  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
}

function initDropModalListener() {
  const btn = document.getElementById("confirmDropBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      if (store.pendingDropCourseId) {
        const res = store.drop(store.pendingDropCourseId);
        closeDropConfirmModal();
        if (res.success) {
          showToast(res.message, "success");
          renderApp();
          refreshLiveSeatIndicators();
        } else {
          showToast(res.message, "error");
        }
      }
    });
  }
}

window.switchTab = function(tabId) {
  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.toggle("active", item.getAttribute("data-tab") === tabId);
  });

  document.querySelectorAll(".tab-pane").forEach(pane => {
    pane.classList.remove("active");
  });

  const activePane = document.getElementById(`tab-${tabId}`);
  if (activePane) activePane.classList.add("active");

  if (tabId === "timetable") renderTimetable();
  if (tabId === "slip") renderSlip();
  if (tabId === "my-courses") renderMyCourses();
  if (tabId === "profile") populateProfileForm();
  if (tabId === "tools") {
    renderProgressRing();
    renderGpaCalculator();
  }
  if (tabId === "catalog") {
    checkWaitlistAlertBanner();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
};

// ==========================================
// FILTERS & SORT HANDLERS
// ==========================================
window.filterByStream = function(stream) {
  store.currentStreamFilter = stream;
  document.querySelectorAll(".stream-btn:not(.rush-filter-btn)").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-stream") === stream);
  });
  renderCatalog();
};

window.filterByDept = function(dept) {
  store.currentDeptFilter = dept;
  document.querySelectorAll(".dept-tab").forEach(tab => {
    tab.classList.toggle("active", tab.getAttribute("data-dept") === dept);
  });
  renderCatalog();
};

window.handleSortChange = function(sortKey) {
  store.currentSort = sortKey;
  renderCatalog();
};

window.handleDifficultyFilter = function(diff) {
  store.currentDifficulty = diff;
  renderCatalog();
};

window.handleSearchCourses = function(val) {
  store.searchQuery = val.trim().toLowerCase();
  renderCatalog();
};

// "Filling Fast" Filter Toggle
window.toggleRushFilter = function() {
  store.rushFilterActive = !store.rushFilterActive;
  const btn = document.getElementById("rushFilterBtn");
  if (btn) btn.classList.toggle("active", store.rushFilterActive);

  if (store.rushFilterActive) {
    showToast("Showing only 'Filling Fast' (red) and 'Seats Going' (orange) courses.", "info");
  } else {
    showToast("Showing all course seat statuses.", "info");
  }
  renderCatalog();
};

// ==========================================
// RENDER MASTER
// ==========================================
function renderApp() {
  updateHeaderAndSidebar();
  renderCatalog();
  renderRecentlyViewed();
  renderMyCourses();
  renderTimetable();
  renderSlip();
  renderProgressRing();
  renderGpaCalculator();
  checkWaitlistAlertBanner();
}

function updateHeaderAndSidebar() {
  const isReg = store.student.isRegistered && store.student.name && store.student.name.trim() !== "";
  const avatarText = store.student.avatar || "ST";

  const headerAv = document.getElementById("headerAvatar");
  if (headerAv) headerAv.innerText = avatarText;

  const sidebarAv = document.getElementById("sidebarAvatarCircle");
  if (sidebarAv) {
    if (avatarText.length <= 2) {
      sidebarAv.innerText = avatarText;
    } else {
      sidebarAv.innerHTML = avatarText;
    }
  }

  if (isReg) {
    document.getElementById("sidebarStudentName").innerText = store.student.name;
    document.getElementById("sidebarStudentMajor").innerText = store.student.major;
    document.getElementById("heroStudentGreeting").innerText = `Welcome, ${store.student.name}!`;
    document.getElementById("headerStudentName").innerText = store.student.name;
    document.getElementById("headerRollDisplay").innerText = `Roll: ${store.student.rollNo || 'Student'}`;
    document.getElementById("regStatusBadge").innerText = "Registered ✓";
    document.getElementById("regStatusBadge").className = "nav-badge success";
  } else {
    document.getElementById("sidebarStudentName").innerText = "Student Account";
    document.getElementById("sidebarStudentMajor").innerText = "Click to Setup Profile";
    document.getElementById("heroStudentGreeting").innerText = "Welcome!";
    document.getElementById("headerStudentName").innerText = "Student Profile";
    document.getElementById("headerRollDisplay").innerText = "Click to Edit Profile";
    document.getElementById("regStatusBadge").innerText = "Start Here";
    document.getElementById("regStatusBadge").className = "nav-badge hot";
  }

  const enrolled = store.getEnrolledCourses();
  const totalCredits = store.getTotalCredits();

  document.getElementById("heroEnrolledCount").innerText = `${enrolled.length} Courses`;
  document.getElementById("heroTotalCredits").innerText = `${totalCredits} Credits`;
  document.getElementById("catalogBadgeCount").innerText = store.courses.length;
  document.getElementById("myCoursesBadgeCount").innerText = enrolled.length;
  document.getElementById("creditMeterNumber").innerText = `${totalCredits} / 20 Credits`;

  // Count red rush courses
  const rushCourses = store.courses.filter(c => {
    const s = getSeatStatus(c);
    return s.category === "red";
  });
  const rushChip = document.getElementById("heroRushCount");
  if (rushChip) rushChip.innerText = `${rushCourses.length} Courses Filling Fast 🔥`;

  const pct = Math.min(100, Math.round((totalCredits / 20) * 100));
  document.getElementById("creditMeterBar").style.width = `${pct}%`;

  const hint = totalCredits === 0 
    ? "Click 'Enroll Now' on any course below" 
    : totalCredits < 12 
    ? `Enrolled ${totalCredits} credits (Pick 1 or 2 more to reach minimum 12)` 
    : totalCredits <= 20
    ? "Excellent! Full semester credits selected."
    : "Maximum allowed limit reached!";
  document.getElementById("creditMeterHint").innerText = hint;
}

// ==========================================
// COURSE CATALOG WITH SEAT RUSH STATUS & LIVE VIEWS
// ==========================================
function renderCatalog() {
  const container = document.getElementById("coursesGridContainer");
  if (!container) return;
  container.innerHTML = "";

  let filtered = store.courses.filter(c => {
    // Stream filter
    if (store.currentStreamFilter !== "ALL" && c.stream !== store.currentStreamFilter) return false;
    // Dept filter
    if (store.currentDeptFilter !== "ALL" && c.department !== store.currentDeptFilter) return false;
    // Difficulty filter
    if (store.currentDifficulty !== "ALL" && c.difficulty !== store.currentDifficulty) return false;
    // Rush filter
    if (store.rushFilterActive) {
      const s = getSeatStatus(c);
      if (s.category !== "red" && s.category !== "orange") return false;
    }
    // Search query
    if (store.searchQuery) {
      const match = c.title.toLowerCase().includes(store.searchQuery) ||
                    c.code.toLowerCase().includes(store.searchQuery) ||
                    c.instructor.toLowerCase().includes(store.searchQuery) ||
                    c.department.toLowerCase().includes(store.searchQuery);
      if (!match) return false;
    }
    return true;
  });

  // Sorting logic
  filtered.sort((a, b) => {
    const seatsA = a.capacity - a.enrolledCount;
    const seatsB = b.capacity - b.enrolledCount;

    switch (store.currentSort) {
      case "name_asc":
        return a.title.localeCompare(b.title);
      case "name_desc":
        return b.title.localeCompare(a.title);
      case "credits_desc":
        return b.credits - a.credits;
      case "credits_asc":
        return a.credits - b.credits;
      case "seats_desc":
        return seatsB - seatsA;
      case "seats_asc":
        return seatsA - seatsB;
      default:
        return 0;
    }
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-dim);">
        <i class="fa-solid fa-book-open" style="font-size: 2.5rem; opacity: 0.3; margin-bottom: 1rem;"></i>
        <h3>No courses match your filter</h3>
        <p style="font-size: 0.85rem; margin-top: 0.4rem;">Try resetting the department tabs or the 'Filling Fast' toggle.</p>
        <button class="btn btn-outline btn-sm mt-3" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  filtered.forEach(c => {
    const isEnrolled = store.isEnrolled(c.id);
    const isWaitlisted = store.isWaitlisted(c.id);
    const waitlistPos = store.getWaitlistPosition(c.id);
    const seatStatus = getSeatStatus(c);
    const viewCount = store.getViewCount(c.id);

    // Badges on image
    let badgeHtml = "";
    if (c.tag === "Popular") {
      badgeHtml = `<span class="tag-badge popular"><i class="fa-solid fa-fire"></i> Popular</span>`;
    } else if (c.tag === "Almost Full" || seatStatus.category === "red") {
      badgeHtml = `<span class="tag-badge almost-full"><i class="fa-solid fa-triangle-exclamation"></i> Almost Full</span>`;
    } else if (c.tag === "New") {
      badgeHtml = `<span class="tag-badge new"><i class="fa-solid fa-sparkles"></i> New</span>`;
    }

    // Determine Action Button
    let actionBtnHtml = "";
    if (isEnrolled) {
      actionBtnHtml = `
        <span class="text-success" style="font-weight:700; font-size:0.85rem;">
          <i class="fa-solid fa-circle-check"></i> Enrolled
        </span>
        <button class="btn btn-danger btn-sm" onclick="openDropConfirmModal('${c.id}')">
          <i class="fa-solid fa-trash-can"></i> Drop
        </button>
      `;
    } else if (seatStatus.seatsLeft === 0) {
      if (isWaitlisted) {
        actionBtnHtml = `
          <span style="font-size:0.75rem; color:#f59e0b; font-weight:700;">
            <i class="fa-solid fa-clock"></i> On Waitlist (#${waitlistPos})
          </span>
          <button class="btn btn-sm btn-outline" onclick="handleLeaveWaitlist('${c.id}')" title="Leave queue">
            <i class="fa-solid fa-xmark"></i> Leave
          </button>
        `;
      } else {
        actionBtnHtml = `
          <span style="font-size:0.75rem; color:var(--text-dim);">
            <i class="fa-solid fa-ban"></i> Course Full
          </span>
          <button class="btn btn-waitlist btn-sm" onclick="handleJoinWaitlist('${c.id}')">
            <i class="fa-solid fa-bell"></i> Join Waitlist
          </button>
        `;
      }
    } else {
      actionBtnHtml = `
        <span style="font-size:0.75rem; color:var(--text-muted);">
          <i class="fa-solid fa-bolt text-accent"></i> 1-Click Enrollment
        </span>
        <button class="btn btn-primary" onclick="handleEnroll('${c.id}')">
          <i class="fa-solid fa-plus-circle"></i> Enroll Now
        </button>
      `;
    }

    const card = document.createElement("div");
    card.className = `course-card ${isEnrolled ? 'enrolled-card' : ''}`;
    card.innerHTML = `
      <div class="course-card-img-wrap" onclick="openCourseDetailsModal('${c.id}')" style="cursor: pointer;" title="Click to view course syllabus & details">
        <img src="${c.image}" alt="${c.title}" loading="lazy" />
        <div class="course-img-tags">
          <div style="display:flex; gap:0.4rem; align-items:center;">
            <span class="stream-pill ${c.stream.toLowerCase()}">${c.stream}</span>
            ${badgeHtml}
          </div>
          <span class="course-code-pill">${c.code}</span>
        </div>
      </div>

      <div class="course-card-body">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.4rem;">
          <h3 class="course-title" onclick="openCourseDetailsModal('${c.id}')" style="cursor: pointer;" title="View Syllabus">${c.title}</h3>
          <span class="difficulty-pill ${c.difficulty.toLowerCase()}">${c.difficulty}</span>
        </div>

        <p class="course-desc">${c.desc}</p>

        <div class="course-meta-row">
          <div><span>Faculty:</span> <strong>${c.instructor}</strong></div>
          <div><span>Credits:</span> <strong>${c.credits} Credits</strong></div>
        </div>

        <div class="course-meta-row">
          <div><span>Class Schedule:</span> <strong>${c.slot}</strong></div>
          <div><span>Hall:</span> <strong>${c.room}</strong></div>
        </div>

        <!-- LIVE VIEWS -->
        <div class="live-views-row">
          <span class="live-views-chip" id="liveViewsCount-${c.id}">
            <i class="fa-solid fa-eye"></i> ${viewCount} students viewed today
          </span>
          <button type="button" class="course-card-details-btn" onclick="openCourseDetailsModal('${c.id}')">
            <i class="fa-solid fa-circle-info"></i> Syllabus & Details
          </button>
        </div>

        <!-- SEAT RUSH STATUS & PROGRESS BAR -->
        <div class="seat-rush-box">
          <div class="seat-rush-header">
            <span class="seat-rush-count" id="seatCount-${c.id}">
              <i class="fa-solid fa-users"></i> ${seatStatus.seatsLeft} of ${c.capacity} seats left
            </span>
            <span class="seat-rush-pill ${seatStatus.category}" id="seatPill-${c.id}">
              <i class="${seatStatus.icon}"></i> ${seatStatus.label}
            </span>
          </div>
          <div class="seat-rush-bar-track">
            <div class="seat-rush-bar-fill ${seatStatus.category}" id="seatBar-${c.id}" style="width: ${seatStatus.pctFull}%;"></div>
          </div>
        </div>
      </div>

      <div class="course-card-actions">
        ${actionBtnHtml}
      </div>
    `;
    container.appendChild(card);
  });
}

// ==========================================
// LIVE UPDATE: REFRESH ALL SEAT INDICATORS (10s)
// ==========================================
function refreshLiveSeatIndicators() {
  store.courses.forEach(c => {
    const status = getSeatStatus(c);

    // Update Seat Count text
    const countEl = document.getElementById(`seatCount-${c.id}`);
    if (countEl) countEl.innerHTML = `<i class="fa-solid fa-users"></i> ${status.seatsLeft} of ${c.capacity} seats left`;

    // Update Pill Badge
    const pillEl = document.getElementById(`seatPill-${c.id}`);
    if (pillEl) {
      pillEl.className = `seat-rush-pill ${status.category}`;
      pillEl.innerHTML = `<i class="${status.icon}"></i> ${status.label}`;
    }

    // Update Progress Bar
    const barEl = document.getElementById(`seatBar-${c.id}`);
    if (barEl) {
      barEl.style.width = `${status.pctFull}%`;
      barEl.className = `seat-rush-bar-fill ${status.category}`;
    }
  });

  // Update modal if currently opened
  updateModalSeatCounter();
  checkWaitlistAlertBanner();
}

function updateModalSeatCounter() {
  const modal = document.getElementById("courseDetailsModal");
  if (!modal || modal.classList.contains("hidden")) return;

  const codeEl = document.getElementById("modalCourseCode");
  if (!codeEl) return;
  const courseCode = codeEl.innerText.trim();
  const c = store.courses.find(item => item.code === courseCode);
  if (!c) return;

  const status = getSeatStatus(c);
  const seatsEl = document.getElementById("modalCourseSeats");
  if (seatsEl) {
    seatsEl.innerHTML = `
      <span class="seat-rush-pill ${status.category}" style="margin-right:6px;"><i class="${status.icon}"></i> ${status.label}</span>
      ${status.seatsLeft} of ${c.capacity} seats left
    `;
  }
}

// ==========================================
// WAITLIST ALERT BANNER & ACTIONS
// ==========================================
window.checkWaitlistAlertBanner = function() {
  const banner = document.getElementById("waitlistAlertBanner");
  if (!banner) return;
  if (!store.student.isRegistered || !store.student.rollNo) {
    banner.classList.add("hidden");
    return;
  }

  // Check if current student is #1 in queue for a course that now has open seats (> 0)
  let eligibleCourse = null;
  for (const c of store.courses) {
    const seatsLeft = Math.max(0, c.capacity - c.enrolledCount);
    const queue = store.waitlists[c.id];
    if (seatsLeft > 0 && queue && queue.length > 0) {
      if (queue[0].rollNo === store.student.rollNo) {
        eligibleCourse = c;
        break;
      }
    }
  }

  if (eligibleCourse) {
    const titleEl = document.getElementById("waitlistAlertTitle");
    if (titleEl) {
      titleEl.innerText = `🎉 A seat is now open in ${eligibleCourse.code}: ${eligibleCourse.title}!`;
    }
    const enrolBtn = document.getElementById("waitlistAlertEnrolBtn");
    if (enrolBtn) {
      enrolBtn.onclick = () => claimWaitlistSeat(eligibleCourse.id);
    }
    banner.classList.remove("hidden");
  } else {
    banner.classList.add("hidden");
  }
};

window.dismissWaitlistBanner = function() {
  const banner = document.getElementById("waitlistAlertBanner");
  if (banner) banner.classList.add("hidden");
};

window.claimWaitlistSeat = function(courseId) {
  const res = store.enroll(courseId);
  if (res.success) {
    store.leaveWaitlist(courseId);
    dismissWaitlistBanner();
    showToast(`🎉 Enrolled! You claimed your reserved seat in ${courseId}.`, "success");
    renderApp();
    refreshLiveSeatIndicators();
  } else {
    showToast(res.message, "error");
  }
};

window.handleJoinWaitlist = function(courseId) {
  if (!store.student.isRegistered || !store.student.name) {
    showToast("Please register your student profile first before joining a waitlist!", "info");
    switchTab("student-register");
    return;
  }

  const res = store.joinWaitlist(courseId);
  if (res.success) {
    showToast(res.message, "success");
    renderCatalog();
    checkWaitlistAlertBanner();
  } else {
    showToast(res.message, "error");
  }
};

window.handleLeaveWaitlist = function(courseId) {
  const res = store.leaveWaitlist(courseId);
  if (res.success) {
    showToast(res.message, "info");
    renderCatalog();
    checkWaitlistAlertBanner();
  }
};

window.resetFilters = function() {
  store.currentStreamFilter = "ALL";
  store.currentDeptFilter = "ALL";
  store.currentDifficulty = "ALL";
  store.currentSort = "name_asc";
  store.rushFilterActive = false;
  store.searchQuery = "";

  document.querySelectorAll(".stream-btn").forEach(b => b.classList.toggle("active", b.getAttribute("data-stream") === "ALL"));
  document.querySelectorAll(".dept-tab").forEach(t => t.classList.toggle("active", t.getAttribute("data-dept") === "ALL"));
  
  const rushBtn = document.getElementById("rushFilterBtn");
  if (rushBtn) rushBtn.classList.remove("active");

  const sortSelect = document.getElementById("courseSortSelect");
  if (sortSelect) sortSelect.value = "name_asc";
  
  const diffSelect = document.getElementById("difficultyFilterSelect");
  if (diffSelect) diffSelect.value = "ALL";

  const searchInput = document.getElementById("globalCourseSearch");
  if (searchInput) searchInput.value = "";

  renderCatalog();
  showToast("Filters reset to default view.", "info");
};

// ==========================================
// COURSE DETAILS POPUP (SYLLABUS, FACULTY, SCHEDULE & CREDITS)
// ==========================================
window.openCourseDetailsModal = function(courseId) {
  const c = store.courses.find(item => item.id === courseId);
  if (!c) return;

  // Track live views & recently viewed
  store.recordView(courseId);
  store.addRecentlyViewed(courseId);
  renderRecentlyViewed();

  const isEnrolled = store.isEnrolled(c.id);
  const isWaitlisted = store.isWaitlisted(c.id);
  const waitlistPos = store.getWaitlistPosition(c.id);
  const status = getSeatStatus(c);

  // Populate modal data
  document.getElementById("modalCourseTitle").innerText = c.title;
  document.getElementById("modalCourseCode").innerText = c.code;
  document.getElementById("modalCourseCredits").innerText = `${c.credits} Academic Credits`;
  document.getElementById("modalCourseFaculty").innerText = c.instructor;
  document.getElementById("modalCourseSchedule").innerText = c.slot;
  document.getElementById("modalCourseRoom").innerText = c.room;
  document.getElementById("modalCourseDifficulty").innerText = `${c.difficulty} Level`;

  const seatsEl = document.getElementById("modalCourseSeats");
  if (seatsEl) {
    seatsEl.innerHTML = `
      <span class="seat-rush-pill ${status.category}" style="margin-right:6px;"><i class="${status.icon}"></i> ${status.label}</span>
      ${status.seatsLeft} of ${c.capacity} seats left
    `;
  }

  const banner = document.getElementById("modalCourseImgBanner");
  if (banner) banner.style.backgroundImage = `url('${c.image}')`;

  const streamBadge = document.getElementById("modalCourseStreamBadge");
  if (streamBadge) {
    streamBadge.innerText = c.stream;
    streamBadge.className = `badge-category ${c.stream.toLowerCase()}`;
  }

  const diffBadge = document.getElementById("modalCourseDiffBadge");
  if (diffBadge) {
    diffBadge.innerText = c.difficulty;
    diffBadge.className = `difficulty-pill ${c.difficulty.toLowerCase()}`;
  }

  // Populate syllabus list
  const syllabusList = document.getElementById("modalCourseSyllabusList");
  syllabusList.innerHTML = "";
  if (c.syllabus && c.syllabus.length > 0) {
    c.syllabus.forEach(mod => {
      const li = document.createElement("li");
      li.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${mod}</span>`;
      syllabusList.appendChild(li);
    });
  } else {
    syllabusList.innerHTML = `<li><i class="fa-solid fa-circle-info"></i> Standard university syllabus modules approved for this course.</li>`;
  }

  // Modal enroll / waitlist / drop button
  const enrollBtn = document.getElementById("modalCourseEnrollBtn");
  if (isEnrolled) {
    enrollBtn.className = "btn btn-danger";
    enrollBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i> Drop This Course`;
    enrollBtn.onclick = () => {
      closeCourseDetailsModal();
      openDropConfirmModal(c.id);
    };
  } else if (status.seatsLeft === 0) {
    if (isWaitlisted) {
      enrollBtn.className = "btn btn-outline";
      enrollBtn.innerHTML = `<i class="fa-solid fa-clock"></i> Leave Waitlist (Queue #${waitlistPos})`;
      enrollBtn.onclick = () => {
        handleLeaveWaitlist(c.id);
        closeCourseDetailsModal();
      };
    } else {
      enrollBtn.className = "btn btn-waitlist";
      enrollBtn.innerHTML = `<i class="fa-solid fa-bell"></i> Join Waitlist`;
      enrollBtn.onclick = () => {
        handleJoinWaitlist(c.id);
        closeCourseDetailsModal();
      };
    }
  } else {
    enrollBtn.className = "btn btn-primary";
    enrollBtn.innerHTML = `<i class="fa-solid fa-plus-circle"></i> Enroll Now`;
    enrollBtn.onclick = () => {
      handleEnroll(c.id);
      closeCourseDetailsModal();
    };
  }

  document.getElementById("courseDetailsModal").classList.remove("hidden");
};

window.closeCourseDetailsModal = function() {
  document.getElementById("courseDetailsModal").classList.add("hidden");
};

// ==========================================
// RECENTLY VIEWED COURSES LIST
// ==========================================
function renderRecentlyViewed() {
  const listContainer = document.getElementById("recentlyViewedList");
  if (!listContainer) return;

  if (store.recentlyViewed.length === 0) {
    listContainer.innerHTML = `<p style="color: var(--text-dim); font-size: 0.85rem; padding: 0.5rem 0;">No courses viewed yet. Click on any course card to inspect syllabus details.</p>`;
    return;
  }

  listContainer.innerHTML = "";
  store.recentlyViewed.forEach(id => {
    const c = store.courses.find(item => item.id === id);
    if (!c) return;

    const card = document.createElement("div");
    card.className = "recent-course-card";
    card.onclick = () => openCourseDetailsModal(c.id);
    card.innerHTML = `
      <img src="${c.image}" class="recent-course-thumb" alt="${c.title}" />
      <div class="recent-course-info">
        <span class="recent-course-code">${c.code} • ${c.credits} cr</span>
        <strong class="recent-course-title">${c.title}</strong>
        <span class="recent-course-meta">${c.instructor}</span>
      </div>
    `;
    listContainer.appendChild(card);
  });
}

// ==========================================
// DROP CONFIRMATION POPUP ("ARE YOU SURE?")
// ==========================================
window.openDropConfirmModal = function(courseId) {
  const c = store.courses.find(item => item.id === courseId);
  if (!c) return;

  store.pendingDropCourseId = courseId;
  document.getElementById("dropConfirmCourseName").innerText = `${c.code}: ${c.title}`;
  document.getElementById("dropConfirmModal").classList.remove("hidden");
};

window.closeDropConfirmModal = function() {
  store.pendingDropCourseId = null;
  document.getElementById("dropConfirmModal").classList.add("hidden");
};

// 1-Click Enrollment Handling
window.handleEnroll = function(courseId) {
  if (!store.student.isRegistered || !store.student.name) {
    showToast("Please complete your student profile first!", "info");
    switchTab("student-register");
    return;
  }

  const res = store.enroll(courseId);
  if (res.success) {
    showToast(res.message, "success");
    renderApp();
    refreshLiveSeatIndicators();
  } else {
    showToast(res.message, "error");
  }
};

// ==========================================
// STUDENT REGISTRATION & PROFILE EDITING
// ==========================================
window.handleStreamDropdownChange = function(stream) {
  const majorSelect = document.getElementById("regMajor");
  majorSelect.innerHTML = "";

  if (stream === "Arts") {
    majorSelect.innerHTML = `
      <option value="B.A. English & Media Communication">B.A. English & Media Communication</option>
      <option value="B.Sc. Cognitive Psychology & Human Behavior">B.Sc. Cognitive Psychology & Human Behavior</option>
      <option value="B.Des. Visual Arts & Graphic Design">B.Des. Visual Arts & Graphic Design</option>
      <option value="B.A. Economics & Personal Finance">B.A. Economics & Personal Finance</option>
      <option value="B.A. World History & International Relations">B.A. World History & International Relations</option>
    `;
  } else {
    majorSelect.innerHTML = `
      <option value="B.Tech Computer Science & Engineering">B.Tech Computer Science & Engineering</option>
      <option value="B.E. Robotics & Artificial Intelligence">B.E. Robotics & Artificial Intelligence</option>
      <option value="B.Tech Cloud Computing & DevOps">B.Tech Cloud Computing & DevOps</option>
      <option value="B.E. Mechanical & Electrical Engineering">B.E. Mechanical & Electrical Engineering</option>
      <option value="B.E. Environmental & Sustainable Tech">B.E. Environmental & Sustainable Tech</option>
    `;
  }
};

window.handleFreshStudentRegistration = function(e) {
  e.preventDefault();
  const name = document.getElementById("regFullName").value.trim();
  const rollNo = document.getElementById("regRollNo").value.trim().toUpperCase();
  const phone = document.getElementById("regPhone").value.trim();
  const stream = document.getElementById("regStream").value;
  const major = document.getElementById("regMajor").value;

  if (!name || !rollNo) {
    showToast("Please enter both your full name and roll number.", "error");
    return;
  }

  store.registerStudent(name, rollNo, phone, stream, major);
  showToast(`Welcome, ${name}! Registration complete. Now pick your courses.`, "success");
  renderApp();
  switchTab("catalog");
};

window.resetRegistrationForm = function() {
  document.getElementById("regFullName").value = "";
  document.getElementById("regRollNo").value = "";
  document.getElementById("regPhone").value = "";
  store.resetStudent();
  renderApp();
  showToast("Registration form cleared.", "info");
};

// Profile Page Management
function populateProfileForm() {
  const isReg = store.student.isRegistered && store.student.name;
  const nameInput = document.getElementById("profNameInput");
  const rollInput = document.getElementById("profRollInput");
  const phoneInput = document.getElementById("profPhoneInput");
  const majorInput = document.getElementById("profMajorInput");
  const passInput = document.getElementById("studentPasswordInput");

  if (nameInput) nameInput.value = store.student.name || "";
  if (rollInput) rollInput.value = store.student.rollNo || "";
  if (phoneInput) phoneInput.value = store.student.phone || "";
  if (majorInput) majorInput.value = store.student.major || "";
  if (passInput) passInput.value = store.student.password || "Student2026!";

  const profAv = document.getElementById("profilePageAvatar");
  if (profAv) profAv.innerText = store.student.avatar || "ST";

  const profName = document.getElementById("profilePageName");
  if (profName) profName.innerText = store.student.name || "Student Account";

  const profMajor = document.getElementById("profilePageMajor");
  if (profMajor) profMajor.innerText = store.student.major || "Not Registered";

  document.querySelectorAll(".avatar-pick-btn").forEach(btn => {
    btn.classList.toggle("active", btn.innerText === (store.student.avatar || "ST"));
  });
}

window.handleSaveProfile = function(e) {
  e.preventDefault();
  const name = document.getElementById("profNameInput").value.trim();
  const roll = document.getElementById("profRollInput").value.trim().toUpperCase();
  const phone = document.getElementById("profPhoneInput").value.trim();
  const major = document.getElementById("profMajorInput").value.trim();
  const pass = document.getElementById("studentPasswordInput").value.trim();

  if (!name || !roll) {
    showToast("Name and Roll Number are required.", "error");
    return;
  }

  store.updateProfile(name, roll, phone, major);
  if (pass) store.setPassword(pass);

  showToast("Profile information updated successfully!", "success");
  renderApp();
  populateProfileForm();
};

window.pickAvatar = function(av) {
  store.setAvatar(av);
  document.querySelectorAll(".avatar-pick-btn").forEach(btn => {
    btn.classList.toggle("active", btn.innerText === av);
  });
  const profAv = document.getElementById("profilePageAvatar");
  if (profAv) profAv.innerText = av;
  updateHeaderAndSidebar();
  showToast(`Avatar updated to "${av}"`, "success");
};

// Password Show/Hide Toggle
window.togglePasswordVisibility = function(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const icon = btn.querySelector("i");
  if (input.type === "password") {
    input.type = "text";
    if (icon) {
      icon.className = "fa-solid fa-eye-slash";
      btn.title = "Hide password";
    }
  } else {
    input.type = "password";
    if (icon) {
      icon.className = "fa-solid fa-eye";
      btn.title = "Show password";
    }
  }
};

window.openForgotPasswordModal = function() {
  document.getElementById("forgotPasswordModal").classList.remove("hidden");
};

window.closeForgotPasswordModal = function() {
  document.getElementById("forgotPasswordModal").classList.add("hidden");
};

window.handleResetPassword = function(e) {
  e.preventDefault();
  const roll = document.getElementById("forgotRollInput").value.trim();
  closeForgotPasswordModal();
  showToast(`Password reset link dispatched for roll ID ${roll || 'student'}. Check campus mailbox!`, "success");
};

// ==========================================
// MY ENROLLED COURSES TABLE
// ==========================================
function renderMyCourses() {
  const enrolled = store.getEnrolledCourses();
  const tbody = document.getElementById("myEnrolledCoursesTable");
  if (!tbody) return;
  tbody.innerHTML = "";

  if (enrolled.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center" style="padding: 3rem; color: var(--text-dim);">No courses enrolled yet. Go to "Course Catalog" and click "Enroll Now"!</td></tr>`;
    return;
  }

  enrolled.forEach(c => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><img src="${c.image}" class="table-img" alt="${c.title}" style="cursor:pointer;" onclick="openCourseDetailsModal('${c.id}')" /></td>
      <td>
        <strong style="cursor:pointer; color:var(--primary);" onclick="openCourseDetailsModal('${c.id}')">${c.code}</strong> - ${c.title}
        <br><span style="font-size:0.75rem; color:var(--text-dim);">Room: ${c.room}</span>
      </td>
      <td><span class="stream-pill ${c.stream.toLowerCase()}">${c.stream}</span></td>
      <td><span class="difficulty-pill ${c.difficulty.toLowerCase()}">${c.difficulty}</span></td>
      <td>${c.slot}</td>
      <td>${c.instructor}</td>
      <td><strong>${c.credits} Credits</strong></td>
      <td class="text-right">
        <button class="btn btn-danger btn-sm" onclick="openDropConfirmModal('${c.id}')">
          <i class="fa-solid fa-xmark"></i> Drop
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ==========================================
// TIMETABLE VIEW
// ==========================================
function renderTimetable() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const tbody = document.getElementById("timetableBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  const enrolled = store.getEnrolledCourses();
  const slotMap = {
    "Monday": { 1: "ENG101", 3: "ENG103" },
    "Tuesday": { 1: "ENG106", 2: "ENG102", 4: "ENG104" },
    "Wednesday": { 1: "ENG101", 3: "ENG103" },
    "Thursday": { 1: "ENG106", 2: "ENG102", 4: "ENG104" },
    "Friday": { 5: "ENG105" }
  };

  days.forEach(day => {
    const tr = document.createElement("tr");
    let html = `<td class="day-header">${day}</td>`;

    for (let slot = 1; slot <= 5; slot++) {
      if (slot === 3) html += `<td class="break-cell">TEA</td>`;
      if (slot === 5) html += `<td class="break-cell">LUNCH</td>`;

      const courseId = slotMap[day]?.[slot];
      const matched = courseId ? enrolled.find(c => c.id === courseId) : null;

      if (matched) {
        html += `
          <td class="time-slot-cell has-course" onclick="openCourseDetailsModal('${matched.id}')" style="cursor:pointer;" title="Click to view course details">
            <span class="slot-code">${matched.code}</span>
            <div class="slot-name">${matched.title}</div>
            <span class="slot-room">${matched.room}</span>
          </td>
        `;
      } else {
        html += `<td class="time-slot-cell"><span style="color:var(--text-dim); font-size:0.75rem;">-</span></td>`;
      }
    }

    tr.innerHTML = html;
    tbody.appendChild(tr);
  });
}

// ==========================================
// GOOGLE CALENDAR (.ICS) FILE GENERATOR
// ==========================================
window.downloadGoogleCalendarICS = function() {
  const enrolled = store.getEnrolledCourses();
  if (enrolled.length === 0) {
    showToast("Please enroll in at least one course before exporting calendar!", "error");
    return;
  }

  let icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CourseHub//Student Course Registration//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Collegiate Academic Schedule",
    "X-WR-TIMEZONE:Asia/Kolkata"
  ];

  const now = new Date();
  const dtStamp = now.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const scheduleTimeMap = {
    "ENG101": { dayCode: "MO,WE", start: "090000", end: "100000" },
    "ENG102": { dayCode: "TU,TH", start: "100000", end: "110000" },
    "ENG103": { dayCode: "MO,WE", start: "111500", end: "121500" },
    "ENG104": { dayCode: "TU,TH", start: "121500", end: "131500" },
    "ENG105": { dayCode: "FR", start: "140000", end: "153000" },
    "ENG106": { dayCode: "TU,TH", start: "090000", end: "100000" },
    "ART101": { dayCode: "MO,WE", start: "090000", end: "100000" },
    "ART102": { dayCode: "TU,TH", start: "100000", end: "110000" },
    "ART103": { dayCode: "MO,WE", start: "111500", end: "121500" },
    "ART104": { dayCode: "FR", start: "140000", end: "153000" },
    "ART105": { dayCode: "TU,TH", start: "121500", end: "131500" },
    "ART106": { dayCode: "TU,TH", start: "090000", end: "100000" }
  };

  enrolled.forEach(c => {
    const slotInfo = scheduleTimeMap[c.id] || { dayCode: "MO,WE", start: "090000", end: "100000" };
    const dtStart = `20261103T${slotInfo.start}`;
    const dtEnd = `20261103T${slotInfo.end}`;

    icsLines.push("BEGIN:VEVENT");
    icsLines.push(`UID:course-${c.id}-${Date.now()}@metropolitan.edu`);
    icsLines.push(`DTSTAMP:${dtStamp}`);
    icsLines.push(`DTSTART:${dtStart}`);
    icsLines.push(`DTEND:${dtEnd}`);
    icsLines.push(`RRULE:FREQ=WEEKLY;BYDAY=${slotInfo.dayCode};UNTIL=20270131T235959Z`);
    icsLines.push(`SUMMARY:${c.code}: ${c.title}`);
    icsLines.push(`DESCRIPTION:Faculty: ${c.instructor} | Credits: ${c.credits} cr | ${c.desc.replace(/,/g, '\\,')}`);
    icsLines.push(`LOCATION:${c.room}, Metropolitan University Campus`);
    icsLines.push("STATUS:CONFIRMED");
    icsLines.push("END:VEVENT");
  });

  icsLines.push("END:VCALENDAR");

  const icsData = icsLines.join("\r\n");
  const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Class_Schedule.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showToast("Class_Schedule.ics generated! Open it to import all classes into Google Calendar.", "success");
};

// ==========================================
// OFFICIAL PRINTABLE SLIP
// ==========================================
function renderSlip() {
  const enrolled = store.getEnrolledCourses();
  const total = store.getTotalCredits();

  document.getElementById("slipStudentName").innerText = store.student.name || "Not Registered";
  document.getElementById("slipRollNo").innerText = store.student.rollNo || "--";
  document.getElementById("slipStream").innerText = store.student.stream || "Engineering & Technology";
  document.getElementById("slipMajor").innerText = store.student.major || "--";
  document.getElementById("slipTotalCredits").innerText = `${total} Credits`;
  document.getElementById("slipSigStudentName").innerText = store.student.name ? `Signature of (${store.student.name})` : "Signature of Student";

  const tbody = document.getElementById("slipTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  if (enrolled.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center" style="padding:2rem;">No courses enrolled yet.</td></tr>`;
    return;
  }

  enrolled.forEach((c, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td><strong>${c.code}</strong></td>
      <td>${c.title}</td>
      <td>${c.stream}</td>
      <td>${c.credits}</td>
      <td>${c.slot}</td>
      <td>${c.instructor}</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderQrCode() {
  const box = document.getElementById("slipQrCodeBox");
  if (!box) return;
  box.innerHTML = `
    <svg viewBox="0 0 100 100" fill="#111827">
      <rect x="5" y="5" width="28" height="28" fill="none" stroke="#111827" stroke-width="4"/>
      <rect x="11" y="11" width="16" height="16"/>
      <rect x="67" y="5" width="28" height="28" fill="none" stroke="#111827" stroke-width="4"/>
      <rect x="73" y="11" width="16" height="16"/>
      <rect x="5" y="67" width="28" height="28" fill="none" stroke="#111827" stroke-width="4"/>
      <rect x="11" y="73" width="16" height="16"/>
      <rect x="42" y="10" width="6" height="6"/>
      <rect x="52" y="16" width="6" height="6"/>
      <rect x="45" y="45" width="12" height="12"/>
      <rect x="65" y="45" width="6" height="14"/>
      <rect x="80" y="65" width="12" height="6"/>
      <rect x="70" y="80" width="14" height="8"/>
      <rect x="42" y="70" width="8" height="16"/>
      <rect x="15" y="42" width="18" height="6"/>
    </svg>
  `;
}

// ==========================================
// DEGREE PROGRESS TRACKER RING
// ==========================================
function renderProgressRing() {
  const totalCredits = store.getTotalCredits();
  const circle = document.getElementById("degreeProgressCircle");
  const pctDisplay = document.getElementById("degreeProgressPct");
  const creditsDisplay = document.getElementById("degreeProgressCredits");
  const semCreditsDisplay = document.getElementById("trackerSemCredits");

  const degreeTotal = 120;
  const pct = Math.min(100, Math.round((totalCredits / degreeTotal) * 100));

  if (pctDisplay) pctDisplay.innerText = `${pct}%`;
  if (creditsDisplay) creditsDisplay.innerText = `${totalCredits} / ${degreeTotal} Total`;
  if (semCreditsDisplay) semCreditsDisplay.innerText = `${totalCredits} Credits`;

  if (circle) {
    const circumference = 440;
    circle.style.strokeDasharray = `${circumference}`;
    const offset = circumference - (circumference * (pct / 100));
    circle.style.strokeDashoffset = `${offset}`;
  }
}

// ==========================================
// GPA CALCULATOR
// ==========================================
function renderGpaCalculator() {
  const listContainer = document.getElementById("gpaCalcCoursesList");
  if (!listContainer) return;

  const enrolled = store.getEnrolledCourses();
  if (enrolled.length === 0) {
    listContainer.innerHTML = `<p style="font-size:0.8rem; color:var(--text-dim); padding:1rem 0;">No enrolled courses yet. Enroll in courses to estimate your GPA!</p>`;
    const display = document.getElementById("projectedGpaDisplay");
    if (display) display.innerText = "0.00 / 4.00";
    return;
  }

  listContainer.innerHTML = "";
  enrolled.forEach(c => {
    const row = document.createElement("div");
    row.className = "gpa-calc-row";
    row.innerHTML = `
      <div class="gpa-calc-info">
        <span class="gpa-calc-code">${c.code} (${c.credits} cr)</span>
        <strong class="gpa-calc-title">${c.title}</strong>
      </div>
      <select class="gpa-calc-grade-select" data-course-id="${c.id}" data-credits="${c.credits}" onchange="calculateGPA()">
        <option value="4.0" selected>A+ (4.00)</option>
        <option value="4.0">A (4.00)</option>
        <option value="3.7">A- (3.70)</option>
        <option value="3.3">B+ (3.30)</option>
        <option value="3.0">B (3.00)</option>
        <option value="2.7">B- (2.70)</option>
        <option value="2.3">C+ (2.30)</option>
        <option value="2.0">C (2.00)</option>
      </select>
    `;
    listContainer.appendChild(row);
  });

  calculateGPA();
}

window.calculateGPA = function() {
  const selects = document.querySelectorAll(".gpa-calc-grade-select");
  const display = document.getElementById("projectedGpaDisplay");
  if (!display) return;

  if (selects.length === 0) {
    display.innerText = "0.00 / 4.00";
    return;
  }

  let totalPoints = 0;
  let totalCredits = 0;

  selects.forEach(sel => {
    const grade = parseFloat(sel.value) || 4.0;
    const creds = parseFloat(sel.getAttribute("data-credits")) || 3;
    totalPoints += grade * creds;
    totalCredits += creds;
  });

  const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "4.00";
  display.innerText = `${gpa} / 4.00`;
};

// ==========================================
// FAQ ACCORDION & FEEDBACK HANDLER
// ==========================================
window.toggleFaq = function(btn) {
  const item = btn.closest(".faq-item");
  if (!item) return;
  const isActive = item.classList.contains("active");

  document.querySelectorAll(".faq-item").forEach(fi => fi.classList.remove("active"));

  if (!isActive) {
    item.classList.add("active");
  }
};

window.handleSendFeedback = function(e) {
  e.preventDefault();
  const name = document.getElementById("feedbackName").value.trim();
  const cat = document.getElementById("feedbackCategory").value;
  const msg = document.getElementById("feedbackMessage").value.trim();

  document.getElementById("feedbackMessage").value = "";
  showToast(`Thank you, ${name}! Your inquiry (${cat}) has been submitted to the Academic Registrar desk.`, "success");
};

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================
window.showToast = function(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  const iconMap = {
    success: "fa-circle-check text-success",
    error: "fa-triangle-exclamation text-hot",
    info: "fa-circle-info text-accent"
  };

  toast.innerHTML = `
    <i class="fa-solid ${iconMap[type] || 'fa-bell'}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(20px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};
